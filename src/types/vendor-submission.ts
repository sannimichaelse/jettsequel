type TCustomer = {
    phone: string
    lastName: string
    firstName: string
    email: string
}

type TBillingInfo = {
    zip: string
    lastName: string
    firstName: string
    addressLineTwo: string
    addressLineOne: string
    city: string
    country: string
}

type TOrder = {
    orderDate: string
    reference: string
    billing: TBillingInfo
    shipping: TBillingInfo
    emailAddress: string
    uuid: string
    items: TOrderItem[]
}

type TSale = {
    customer: TCustomer
}

type TPurchase = {
    shippingZip: string
    shippingCountry: string
    shippingCity: string
    shippingAddressLineTwo: string
    shippingAddressLineOne: string
    shippingLastName: string
    shippingFirstName: string
    billingZip: string
    billingLastName: string
    billingFirstName: string
    billingAddressLineTwo: string
    billingAddressLineOne: string
    billingCity: string
    billingCountry: string
    reference: string
    dateOrdered: string
}

type TPurchaseItemVariant = {
    vendorSku: string
    sku: string
}

export type TPurchaseItem = {
    variant: TPurchaseItemVariant,
    name: string
    quantity: number
    price: number
}

export type TOrderItem = {
    productCode: string
    quantity: number
}

export type TOrderSubmission = {
    sale: TSale
    purchase: TPurchase
    purchaseItems: TPurchaseItem[]
}

export type TVendorParams = {
    order: TOrder
}

export type TCustomerUUID = {
    uuid: string
}