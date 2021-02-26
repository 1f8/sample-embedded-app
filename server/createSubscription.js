const createSubscription = async (accessToken, shop, returnUrl = process.env.HOST) => {
    const query = JSON.stringify({
      query: `mutation {
        appSubscriptionCreate(
          test: true,
          name: "Super Duper Capped Pricing Plan",
          returnUrl: "${returnUrl}",
          lineItems: [{
            plan: {
              appUsagePricingDetails: {
                terms: "Free up to 100 emails"
                cappedAmount: { amount: 20.00, currencyCode: USD }
              }
            }
          },
          {
            plan: {
              appRecurringPricingDetails: {
                price: { amount: 0, currencyCode: USD },
                interval: EVERY_30_DAYS
              }
            }
          }]
        ){
          userErrors {
            field
            message
          }
          confirmationUrl
          appSubscription {
            id
            lineItems {
              id
              usageRecords(first: 5) {
                edges {
                  node {
                    id
                    description
                    createdAt
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
              plan {
                pricingDetails {
                  __typename
                }
              }
            }
          }
        }
      }`
    })
  
    const response = await fetch(`https://${shop}/admin/api/2020-10/graphql.json`, {
      method : 'POST',
      headers: {
        'Content-Type'          : 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
      body: query
    })
  
    const responseJson = await response.json()
    console.log('responseJson', responseJson)
    console.log('appSubscriptionCreate??', responseJson.data.appSubscriptionCreate)
    console.log('appSubscriptionCreate.lineItems??', responseJson.data.appSubscriptionCreate.appSubscription.lineItems[0].id)
    return {
      subscriptionUrl: responseJson.data.appSubscriptionCreate.confirmationUrl,
      appSubscriptionCreateLineItemId: responseJson.data.appSubscriptionCreate.appSubscription.lineItems[0].id
    }
  }
  
  module.exports = createSubscription