import csv from 'csvtojson'
import { addNewVariant } from '../services/variant.service'
import { TVariant } from '../types/variant'
import { logger } from "../config/logger"

const validateCsvPath = (path: string) => {
    if (!path) {
        throw new Error("Please supply csv path")
    }

    if (path.split(".")[1] !== "csv") {
        throw new Error("Supplied path must be a valid csv")
    }

    return path
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

    logger.info("variants imported successfully")
}

export async function startVariantImport(path: string) {
    const csvPath = validateCsvPath(path)
    const jsonArray = await csv().fromFile(csvPath);
    const variants = buildVariantData(jsonArray)
    return await importVariantCSVData(variants)
}

(async () => {
    try {
        await startVariantImport(process.argv.slice(2)[0])
    } catch (err) {
        console.log(err)
    }
})()
