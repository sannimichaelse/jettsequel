import 'mocha';
import { expect } from 'chai';
import sinon from "sinon"
import { agent as request } from 'supertest';
import { app } from '../../src/index';
import TestUtils from "../../src/utils/test-utils"
import * as CommissionRateService from "../../src/services/commission-rate.service"

describe('POST api/v1/rates', () => {
    beforeEach(async function () {
        sinon.restore()
        sinon.stub(CommissionRateService, 'getCustomerInfoBySaleId').returns(Promise.resolve(TestUtils.getSampleCustomerInfoForSale()))
    })
    after(async function () {
        sinon.restore()
    })
    it('should try to get rates without commission rate', async () => {
        const commissionRateRequest = { ...TestUtils.getSampleCommissionRateRequest() }
        delete commissionRateRequest.commissionRate
        const res = await request(app).post('/api/v1/rates').send(commissionRateRequest);
        expect(res.status).to.equal(400);
        expect(res.body.errorType).to.equal('Validation');
        expect(res.body.errorMessage).to.equal('Commission rate validation error');
        expect(res.body.errorsValidation[0].commissionRate).to.equal('commissionRate is required')
    });

    it('should try to get rates without saleItem property', async () => {
        const commissionRateRequest = { ...TestUtils.getSampleCommissionRateRequest() }
        delete commissionRateRequest.saleItem
        const res = await request(app).post('/api/v1/rates').send(commissionRateRequest);
        expect(res.status).to.equal(400);
        expect(res.body.errorType).to.equal('Validation');
        expect(res.body.errorMessage).to.equal('Commission rate validation error');
        expect(res.body.errorsValidation[0].saleItem).to.equal('saleItem is required')
    });

    it('should try to get rates with empty saleId in saleItem property', async () => {
        const commissionRateRequest = { ...TestUtils.getSampleCommissionRateRequest() }
        delete commissionRateRequest.saleItem.saleId
        const res = await request(app).post('/api/v1/rates').send(commissionRateRequest);
        expect(res.status).to.equal(400);
        expect(res.body.errorType).to.equal('Validation');
        expect(res.body.errorMessage).to.equal('Commission rate validation error');
        expect(res.body.errorsValidation[0].saleId).to.equal('saleId is required to get customers country and sale date')
    });

    it('should try to get rates', async () => {
        const commissionRateRequest = TestUtils.getSampleCommissionRateRequest()
        const res = await request(app).post('/api/v1/rates').send(commissionRateRequest);
        expect(res.status).to.equal(200);
        expect(res.body.commissionRate).to.equal('45');
        expect(res.body.price).to.equal(9);
    });
});