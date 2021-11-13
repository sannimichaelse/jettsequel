import envConfig from "../config"
import { EUROPEAN_UNION } from "utils/eu";
import { TCommissionRateParams, TCustomerInfo } from "types/commission-rate";
import { get } from "utils/request";


const dateInLastWeekOfMonth = (dateString: string) => {
    const date = dateString.substring(0, 10)
    const [year, month, day] = date.split("-")

    const dateObject = new Date(+year, +month, 0);
    const daysDifference = dateObject.getDate() - (+day)
    return daysDifference <= 7 ? true : false
}

const getCustomerInfoBySaleId = async (saleId: number): Promise<TCustomerInfo> => {
    const url = envConfig.JETTI_SALES_URL
    return get(`${url}/${saleId}.json`)
}

const updateCommissionRate = (oldRate: number, newRate: number) => {
    return `${oldRate + newRate}`
}

export const getRateBasedOnLocation = async (commissionRateParams: TCommissionRateParams) => {
    let { saleItem, commissionRate } = commissionRateParams;
    const saleId = saleItem.saleId

    const { billingCountry, dateOrdered } = await getCustomerInfoBySaleId(saleId)

    if (billingCountry.toLowerCase() in EUROPEAN_UNION) {
        console.log("Customer country in EU")
        commissionRate = updateCommissionRate(+commissionRate, 20)
    }

    if (dateInLastWeekOfMonth(dateOrdered)) {
        console.log("Sale date in last week of month")
        commissionRate = updateCommissionRate(+commissionRate, 10)
    }

    if (saleItem.properties.length > 0) {
        const giftNote = saleItem.properties.find((saleItemProperty) => saleItemProperty.name === "Gift Note")
        if (giftNote) {
            console.log("Gift note exists in sale properties ")
            commissionRate = updateCommissionRate(+commissionRate, 5)
        }
    }

    const price = saleItem.price * (+commissionRate / 100)

    return { commissionRate, price }

};

