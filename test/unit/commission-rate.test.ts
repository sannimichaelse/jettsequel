import sinon from "sinon"
import { expect } from "chai"
import TestUtils from "../../src/utils/test-utils";
import { TCommissionRateParams } from "../../src/types/commission-rate"
import * as CommissionRateService from "../../src/services/commission-rate.service"


describe('POST api/v1/rates', () => {

    beforeEach(async function () {
        sinon.restore()
        sinon.stub(CommissionRateService, 'getCustomerInfoBySaleId').returns(Promise.resolve(TestUtils.getSampleCustomerInfoForSale()))
    })

    after(async function () {
        sinon.restore()
    })
    it('should getCustomerInfoBySaleId', async () => {
        const response = await CommissionRateService.getCustomerInfoBySaleId(12433)
        expect(response.billingCountry).to.equal('IT');
        expect(response.dateOrdered).to.equal('2021-10-03T23:04:18.738Z');
        expect(response.billingFullName).to.equal('Test Customer');
        expect(response.shippingFullName).to.equal('Test Customer');
    });

    it('should getRateBasedOnLocation', async () => {
        const commissionRateParams : TCommissionRateParams = {
            saleItem: {
                price: 20.0,
                saleId: 3213320,
                properties: [{
                    name: 'Gift Note',
                    value: 'Hello from UK'
                }]
            },
            commissionRate: "20.0"
        }
        const response = await CommissionRateService.getRateBasedOnLocation(commissionRateParams)
        expect(response.price).to.equal(9);
        expect(response.commissionRate).to.equal('45');
    });
});