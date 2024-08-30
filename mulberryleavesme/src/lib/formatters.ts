const CURRENCY_FORMATTER = new Intl.NumberFormat("en-AU", {
    currency: "AUD",
    style: "currency",
    minimumFractionDigits: 0
})

export function formatCurrency(amount: number) {
    return CURRENCY_FORMATTER.format(amount)
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-AU")

export function formatNumber(number: number) {
    return NUMBER_FORMATTER.format(number)
}