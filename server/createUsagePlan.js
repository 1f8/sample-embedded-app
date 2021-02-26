const createUsagePlan = async (accessToken, shop, subscriptionLineItemId) => {
    console.log('subscriptionLineItemId', subscriptionLineItemId)
    const query = JSON.stringify({
      query: `mutation {
        appUsageRecordCreate(
          subscriptionLineItemId: "${subscriptionLineItemId}"
          description: "Super Mega Plan 100 emails",
          price:{ amount: 0, currencyCode: USD}
        ) {
          userErrors {
            field
            message
          }
          appUsageRecord {
            id
            description
            price {
                amount
                currencyCode
            }
            subscriptionLineItem {
                id
                usageRecords(first: 3) {
                    edges {
                        node {
                            id
                            price {
                                amount
                                currencyCode
                            }
                        }
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
    console.log('responseJson!!', responseJson)
    return responseJson.data
  }
  
  module.exports = createUsagePlan