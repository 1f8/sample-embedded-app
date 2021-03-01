const createSubscription = async ({accessToken, shop, returnUrl = process.env.HOST, subscriptionName='test subscription', usagePriceDetails, recurringPriceDetails, isTest="true"}) => {

    const query = JSON.stringify({
      query: `mutation {
        appSubscriptionCreate(
          test: ${isTest},
          name: "${subscriptionName}",
          returnUrl: "${returnUrl}",
          lineItems: [{
            plan: {
              ${usagePriceDetails}
            }
          },
          {
            plan: {
              ${recurringPriceDetails}
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

    return {
      subscriptionUrl: responseJson.data.appSubscriptionCreate.confirmationUrl,
      subscriptionLineItemId: responseJson.data.appSubscriptionCreate.appSubscription.lineItems[0].id
    }
  }
  
  module.exports = createSubscription