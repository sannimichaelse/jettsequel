import 'mocha';
import { expect } from 'chai';
import { startVariantImport } from "../../src/scripts/import-csv"

describe('Sequelize script', () => {
  it('should check valid csv', async () => {
    try {
      await startVariantImport("variants.cs")
    } catch (err) {
      expect(err.toString()).to.equal("Error: Supplied path must be a valid csv")
    }
  });

  it('should ensure csv is supplied', async () => {
    try {
      await startVariantImport("")
    } catch (err) {
      expect(err.toString()).to.equal("Error: Please supply csv path")
    }
  });
});