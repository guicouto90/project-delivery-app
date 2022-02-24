const products = (sequelize, DataTypes) => {
  const product = sequelize.define('products', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    url_image: DataTypes.STRING
  }, { timestamps: false });

  /*product.associate = (models) => {
    product.belongsTo(models.salesProcuts, { as: 'user', foreignKey: 'userId' });
  };*/

  return product;
};

module.exports = products;

/*'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     
    static associate(models) {
      // define association here
    }
  };
  products.init({
    
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};*/

