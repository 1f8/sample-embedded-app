# Sample Embedded Shopify App with Node and React
[Build a shopify app with node and react tutorial](https://shopify.dev/tutorials/build-a-shopify-app-with-node-and-react)

Updating the code with react-hooks and using our linter as much as possible

# Things to Note
- If it's your first time create an app and a development store, shopify app would ask you to add shopify ID so you could log in to all the stores and partner account at once using one username and password. You could separate stores which you don't want to connect as well.
- the tutorial will tell you that you can't use functional style due to polaris needing `state`, but you can use react-hooks with functions instead of classes.
- make sure to update both `APP URL` and  `Allowed redirection URL` in the App setup when ngrok url expires.
- When you get an error `Error: Cannot find module 'webpack'` , delete node_modules, `npm install` again, and install (webpack v4)[https://github.com/webpack/webpack/releases/tag/v4.45.0] `npm i --save webpack@4.45.0` instead of v5
- While developing, make sure to clear the local storage data otherwise you get a warning like `Warning: Text content did not match`

- There are [mandatory webhooks](https://shopify.dev/tutorials/add-gdpr-webhooks-to-your-app#mandatory-webhooks) need to be setup for your app due to GDPR. In Shopify, GDPR is applied to all user data not just EU.

Example of webhook request and response
REQUEST
```
    router.post('/webhooks/products/create', webhook, (ctx) => {
        console.log('received webhook: ', ctx.state.webhook)
    })
```

REQPONSE
```
    received webhook:  {
        topic: 'PRODUCTS_CREATE',
        domain: 'YOURSHOPNAME.myshopify.com',
        payload: {
            id: 6111111711111,
            title: 'Special color jeans',
            body_html: 'Fun color jeans',
            vendor: 'Your Shop Name',
            product_type: '',
            created_at: '2021-02-18T10:45:15+09:00',
            handle: 'special-color-jeans',
            updated_at: '2021-02-18T10:45:16+09:00',
            published_at: null,
            template_suffix: '',
            status: 'draft',
            published_scope: 'web',
            tags: '',
            admin_graphql_api_id: 'gid://shopify/Product/6111111711111',
            variants: [ [Object] ],
            options: [ [Object] ],
            images: [],
            image: null
        }
    }
```
