import Variant from "../db/models/Variant";
import { TVariant } from "../types/variant";

export async function addNewVariant(variant: TVariant){
    const { companyId, handle, description, vendor, productType, tags, sku } = variant
    await Variant.create({
        company_id: companyId,
        handle,
        description,
        vendor,
        product_type: productType,
        tags,
        sku
    })
}

export async function getAllVariants(){
    const variants = await Variant.findAll()
    return variants
}