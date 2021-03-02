require('isomorphic-fetch')
const { logger } = require('./utils/logger')
const Koa = require('koa')
const next = require('next')
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth')
const dotenv = require('dotenv')
const { verifyRequest } = require('@shopify/koa-shopify-auth')
const session = require('koa-session')

dotenv.config()
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy')
const Router = require('koa-router')
const { receiveWebhook, registerWebhook } = require('@shopify/koa-shopify-webhooks')

const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy')
const createSubscription = require('./mutations/createSubscription')
const createUsagePlan = require('./mutations/createUsagePlan')

const port = parseInt(process.env.PORT, 10) || 3000
const isDev = process.env.NODE_ENV !== 'production'
const app = next({ isDev })
const handle = app.getRequestHandler()
const { AppUsagePricingDetails, AppRecurringPricingDetails, MoneyInput } = require('./mutations/Inputs/inputObjects')

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY, HOST } = process.env

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()
  server.use(session({ sameSite: 'none', secure: true }, server))
  server.keys = [SHOPIFY_API_SECRET_KEY]

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: [ 'read_products', 'write_products' ],
      async afterAuth(ctx) {
        new URLSearchParams(ctx.request.url)
        const { shop, accessToken } = ctx.state.shopify
        // ctx.session.save(shop)
        ctx.cookies.set('shopOrigin', shop, {
          httpOnly: false,
          secure  : true,
          sameSite: 'none'
        })
      //   ctx.cookies.set('shopOrigin', shop, {
      //     httpOnly : true,
      //     secure   : true,
      //     signed   : true,
      //     overwrite: true,
      //     sameSite : 'none',
      // })
      const registration = await registerWebhook({
        address   : `${HOST}/webhooks/products/create`,
        topic     : 'PRODUCTS_CREATE',
        accessToken,
        shop,
        apiVersion: ApiVersion.October19
      })
   
      if (registration.success) {
        logger.log('info', 'Successfully registered webhook!')
      } else {
        logger.log('info', 'Failed to register webhook %s', registration.result)
      }
        ctx.redirect(`/?shop=${shop}`)
        const returnUrl = `${HOST}?shop=${shop}`

        /** creates appUsagePricingDetails objejct */
        const usagePriceDetails = AppUsagePricingDetails({ terms: 'Free up to 100 email!', amount: '0.01', currencyCode: 'USD' })
        // creates appRecurringPricingDetails object
        const recurringPriceDetails = AppRecurringPricingDetails({ amount: '0' })

        /** Mutation - appSubscriptionCreate. Adds both recurring and usage price details */
        const { subscriptionUrl, subscriptionLineItemId } = await createSubscription({ accessToken, shop, returnUrl, recurringPriceDetails, usagePriceDetails })

        /** Mutation - appUsageRecordCreate. Adds usage record for a subscriptionLineItemId */
        await createUsagePlan({ accessToken, shop, subscriptionLineItemId, description: 'super good deal plan', moneyInput: MoneyInput({ amount: '0' }) })

        ctx.redirect(subscriptionUrl)
      },
    })
  )

  const webhook = receiveWebhook({ secret: SHOPIFY_API_SECRET_KEY })

/** TIP from shopify - In a production app, you would need to store the webhook in a database to access the response on the frontend. */
 router.post('/webhooks/products/create', webhook, (ctx) => {
   logger.log('info', 'received webhook %s', ctx.state.webhook)
 })

  server.use(graphQLProxy({ version: ApiVersion.October19 }))
  router.get('(.*)', verifyRequest(), async (ctx) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
    ctx.res.statusCode = 200
   })
   server.use(router.allowedMethods())
   server.use(router.routes())

  server.listen(port, () => {
    logger.log('info', '> Ready on http://localhost:%s', port)
  })
})