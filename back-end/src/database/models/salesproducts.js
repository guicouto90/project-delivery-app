const salesProducts = (sequelize, DataTypes) => {
  const salesProduct = sequelize.define('salesProducts', 
  {
    saleId: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true
      
    },
    productId: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true
    },
    quantity: DataTypes.INTEGER,
  }, 
  { timestamps: false });

  salesProduct.associate = (models) => {
    models.products.belongsToMany(models.sales, {
      as: 'sales',
      through: salesProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });

    models.sales.belongsToMany(models.products, {
      as: 'products',
      through: salesProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
  };

  return salesProduct;
};

module.exports = salesProducts;