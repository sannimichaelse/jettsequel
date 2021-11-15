import sinon from "sinon"
import { expect } from "chai"
import TestUtils from "../../src/utils/test-utils";
import { TOrderSubmission, TPurchaseItem, TVendorParams } from "../../src/types/vendor-submission"
import * as VendorSubmissionService from "../../src/services/vendor-submission.service"


describe('Vendor Submission unit tests', () => {

    beforeEach(async function () {
        sinon.restore()
        sinon.stub(VendorSubmissionService, 'getCustomerUUID').returns(Promise.resolve(TestUtils.getSampleCustomerUUID()))
    })

    after(async function () {
        sinon.restore()
    })
    it('should getCustomerUUID', async () => {
        const response = await VendorSubmissionService.getCustomerUUID("jack@jetti.io")
        expect(response.uuid).to.equal('40c094d0-fbb0-3493-98a4-63ba9ead346d');
    });

    it('should getProductCode', async () => {
        const purchaseItems: TPurchaseItem[] = []
        purchaseItems.push({
            name: "Doc Black Camo Sandal",
            quantity: 1,
            price: 0,
            variant: {
                vendorSku: null,
                sku: "DB5-CAM-9",
            }
        })

        const productCode = await VendorSubmissionService.getProductCode(purchaseItems)
        expect(productCode).to.equal("DB5-CAM-9");
    });

    it('should buildVendorOrderSubmissionRequest', async () => {
        const purchaseItems: TPurchaseItem[] = []
        purchaseItems.push({
            name: "Doc Black Camo Sandal",
            quantity: 1,
            price: 0,
            variant: {
                vendorSku: null,
                sku: "DB5-CAM-9",
            }
        })

        const orderSubmission: TOrderSubmission = {
            sale: {
                customer: {
                    phone: "+447824449752",
                    lastName: "Smith",
                    firstName: "Jack",
                    email: "jack@jetti.io"
                },
            },
            purchase: {
                shippingZip: "94105",
                shippingCountry: "US",
                shippingCity: "San Francisco",
                shippingAddressLineTwo: null,
                shippingAddressLineOne: "181 Fremont St",
                shippingLastName: null,
                shippingFirstName: null,
                billingZip: "94105",
                billingLastName: null,
                billingFirstName: null,
                billingAddressLineTwo: null,
                billingAddressLineOne: "181 Fremont St",
                billingCity: "San Francisco",
                billingCountry: "US",
                reference: "10234-01",
                dateOrdered: "2018-03-05T23:05:12.000Z"
            },
            purchaseItems
        }

        const response = await VendorSubmissionService.buildVendorOrderSubmissionRequest(orderSubmission, "40c094d0-fbb0-3493-98a4-63ba9ead346d")
        const { order } = response
        expect(order.orderDate).to.equal("2018-03-05T23:05:12.000Z")
        expect(order.reference).to.equal("10234-01")
        const { billing, shipping, emailAddress, uuid, items } = order
        expect(billing.zip).to.equal("94105")
        expect(billing.country).to.equal("US")
        expect(billing.city).to.equal("San Francisco")
        expect(billing.addressLineOne).to.equal("181 Fremont St")

        expect(shipping.zip).to.equal("94105")
        expect(shipping.country).to.equal("US")
        expect(shipping.city).to.equal("San Francisco")
        expect(shipping.addressLineOne).to.equal("181 Fremont St")

        expect(emailAddress).to.equal("jack@jetti.io")
        expect(uuid).to.equal("40c094d0-fbb0-3493-98a4-63ba9ead346d")
        expect(items[0].productCode).to.equal("DB5-CAM-9")
        expect(items[0].quantity).to.equal(1)
    });

    it('should getProductCode', async () => {
        const vendorSubmissionParams: TVendorParams = {
            order: {
                orderDate: '2018-03-05T23:05:12.000Z',
                reference: '10234-01',
                billing: {
                    firstName: null,
                    lastName: null,
                    zip: '94105',
                    country: 'US',
                    city: 'San Francisco',
                    addressLineOne: '181 Fremont St',
                    addressLineTwo: null
                },
                shipping: {
                    firstName: null,
                    lastName: null,
                    zip: '94105',
                    country: 'US',
                    city: 'San Francisco',
                    addressLineOne: '181 Fremont St',
                    addressLineTwo: null
                },
                emailAddress: 'jack@jetti.io',
                uuid: '40c094d0-fbb0-3493-98a4-63ba9ead346d',
                items: [{ productCode: 'DB5-CAM-9', quantity: 1 }]
            }
        }

        const response = await VendorSubmissionService.submitVendorOrder(vendorSubmissionParams)
        expect(response.status).to.equal(true);
        expect(response.id).to.equal("5f3927b5-c304-3186-bd4c-e52d5d56808b");
    });
});