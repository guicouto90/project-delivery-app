const salesProducts = (sequelize, DataTypes) => {
  const salesProduct = sequelize.define('salesProducts', 
  {
    sale_id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true
      
    },
    product_id: { 
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
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });

    models.sales.belongsToMany(models.products, {
      as: 'products',
      through: salesProduct,
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });
  };

  return salesProduct;
};

module.exports = salesProducts;