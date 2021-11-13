import envConfig from "../config"
import { TOrderSubmission, TPurchaseItem, TVendorParams } from "types/order-submission";
import { get, post } from "utils/request";

const getCustomerUUID = async (email: string): Promise<string> => {
    const url = envConfig.JETTI_CUSTOMER_UUID_URL
    return get(`${url}/jtt-hr-customer?where[${email}]=emailaddress@domain.com`)
}

const buildVendorOrderSubmissionRequest = (orderSubmissionParams: TOrderSubmission, uuid: string) => {
    const { sale, purchase, purchaseItems } = orderSubmissionParams
    const { email } = sale.customer
    const {
        dateOrdered,
        reference,
        billingFirstName,
        billingLastName,
        billingZip,
        billingCountry,
        billingAddressLineOne,
        billingAddressLineTwo,
        billingCity,
        shippingAddressLineOne,
        shippingAddressLineTwo,
        shippingCity,
        shippingCountry,
        shippingFirstName,
        shippingLastName,
        shippingZip,
    } = purchase
    const productCode = getProductCode(purchaseItems)
    const vendorParams: TVendorParams = {
        order: {
            orderDate: dateOrdered,
            reference,
            billing: {
                firstName: billingFirstName,
                lastName: billingLastName,
                zip: billingZip,
                country: billingCountry,
                city: billingCity,
                addressLineOne: billingAddressLineOne,
                addressLineTwo: billingAddressLineTwo
            },
            shipping: {
                firstName: shippingFirstName,
                lastName: shippingLastName,
                zip: shippingZip,
                country: shippingCountry,
                city: shippingCity,
                addressLineOne: shippingAddressLineOne,
                addressLineTwo: shippingAddressLineTwo
            },
            emailAddress: email,
            uuid,
            items: [{
                productCode,
                quantity: purchaseItems[0].quantity
            }]
        }
    }

    return vendorParams
}

const submitVendorOrder = async (vendorOrderRequest: TVendorParams): Promise<any> => {
    const url = envConfig.JETTI_VENDOR_SUBMISSION_URL
    return post(url, vendorOrderRequest)
}

const getProductCode = (purchaseItems: TPurchaseItem[]) => {
    const productCode = !purchaseItems[0].variant.vendorSku ? purchaseItems[0].variant.sku : purchaseItems[0].variant.vendorSku
    return productCode
}

export const vendorOrderSubmission = async (orderSubmissionParams: TOrderSubmission) => {
    const { sale } = orderSubmissionParams
    const { email } = sale.customer
    const uuid = await getCustomerUUID(email)

    const vendorOrderSubmissionRequest = buildVendorOrderSubmissionRequest(orderSubmissionParams, uuid)
    const response = await submitVendorOrder(vendorOrderSubmissionRequest)
    return response
};

