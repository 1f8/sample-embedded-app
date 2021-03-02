const AppUsagePricingDetails = ({ terms, amount, currencyCode }) => (`
    appUsagePricingDetails: {
        terms: "${terms}",
        cappedAmount: ${MoneyInput({ amount, currencyCode })}
    }
`)
/** isMonthly set to false = ANNUAL */
const AppRecurringPricingDetails = ({ isMonthly=true, amount, currencyCode }) => (`
    appRecurringPricingDetails: {
        price: ${MoneyInput({ amount, currencyCode })},
        interval: ${isMonthly ? 'EVERY_30_DAYS' : 'ANNUAL'}
    }
`)

const MoneyInput = ({ amount, currencyCode }) => (`
    { amount: "${amount}", currencyCode: ${currencyCode || 'USD'} }
`)


module.exports = { AppUsagePricingDetails, AppRecurringPricingDetails, MoneyInput }