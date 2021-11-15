import 'mocha';
import { expect } from 'chai';
import sinon from "sinon"
import { agent as request } from 'supertest';
import { app } from '../../src/index';
import TestUtils from "../../src/utils/test-utils"
import * as CommissionRateService from "../../src/services/commission-rate.service"

describe('POST api/v1/gateway', () => {
    beforeEach(async function () {
        sinon.restore()
        sinon.stub(CommissionRateService, 'getCustomerInfoBySaleId').returns(Promise.resolve(TestUtils.getSampleCustomerInfoForSale()))
    })
    after(async function () {
        sinon.restore()
    })
    it('should try to submit vendor order without sale', async () => {
        const vendorOrderRequest = { ...TestUtils.getSampleVendorSubmissionRequest() }
        delete vendorOrderRequest.sale
        const res = await request(app).post('/api/v1/gateway').send(vendorOrderRequest);
        expect(res.status).to.equal(400);
        expect(res.body.errorType).to.equal('Validation');
        expect(res.body.errorMessage).to.equal('Vendor order submission validation error');
        expect(res.body.errorsValidation[0].sale).to.equal('sale is required')
    });

    it('should try to submit vendor order without sale customer', async () => {
        const vendorOrderRequest = { ...TestUtils.getSampleVendorSubmissionRequest() }
        delete vendorOrderRequest.sale.customer
        const res = await request(app).post('/api/v1/gateway').send(vendorOrderRequest);
        expect(res.status).to.equal(400);
        expect(res.body.errorType).to.equal('Validation');
        expect(res.body.errorMessage).to.equal('Vendor order submission validation error');
        expect(res.body.errorsValidation[0].saleCustomer).to.equal('saleCustomer is required')
    });

    it('should try to submit vendor order without sale customer email', async () => {
        const vendorOrderRequest = { ...TestUtils.getSampleVendorSubmissionRequest() }
        vendorOrderRequest.sale.customer.email = "dddddjdjdjdjdddd"
        const res = await request(app).post('/api/v1/gateway').send(vendorOrderRequest);
        expect(res.status).to.equal(400);
        expect(res.body.errorType).to.equal('Validation');
        expect(res.body.errorMessage).to.equal('Vendor order submission validation error');
        expect(res.body.errorsValidation[0].saleCustomerEmail).to.equal('saleCustomerEmail is invalid')
    });
});