import csv from 'csvtojson'
import { addNewVariant } from '../services/variant.service'
import { TVariant } from '../types/variant'

const getCSVPath = () => {
    return process.argv.slice(2)[0]
}

const buildVariantData = (variantData: any) => {
    const variants: TVariant[] = []
    for (const variant of variantData) {
        variants.push({
            companyId: variant.company_id,
            handle: variant.handle,
            description: variant.description,
            vendor: variant.vendor,
            productType: variant.product_type,
            tags: variant.tags,
            sku: variant.sku
        })
    }

    return variants
}

const importVariantCSVData = async (variants: TVariant[]) => {
    await Promise.all(variants.map(async (variant) => {
        await addNewVariant(variant)
    }))

    console.log("Variants imported successfully")
}

const startVariantImport = async () => {
    const filePath = getCSVPath()
    const jsonArray = await csv().fromFile(filePath);
    const variants = buildVariantData(jsonArray)
    return importVariantCSVData(variants)
}

(async () => {
    await startVariantImport()
})()