
export type TSaleItemProperty = {
    name: string
    value: string
}

export type TCustomerInfo = {
    billingFullName: string
    shippingFullName: string
    billingCountry: string
    dateOrdered: string
}

export type TSaleItem = {
    price: number
    saleId: number
    properties: TSaleItemProperty[]
}

export type TCommissionRateParams = {
    saleItem: TSaleItem
    commissionRate: string
}