import { DataTypes } from 'sequelize';

import sequelize from '../../db';

const Variant = sequelize.define('Variant', {
  company_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  handle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vendor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  product_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  // Other model options go here
  tableName: "variants",
  timestamps: false
});

export default Variant