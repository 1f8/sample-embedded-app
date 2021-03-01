const createUsagePlan = async ({accessToken, shop, subscriptionLineItemId, description="Super Mega Plan 100 emails", moneyInput}) => {
    const query = JSON.stringify({
      query: `mutation {
        appUsageRecordCreate(
          subscriptionLineItemId: "${subscriptionLineItemId}"
          description: "${description}",
          price:${moneyInput}
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
    console.log(responseJson)
    return responseJson.data
  }
  
  module.exports = createUsagePlan