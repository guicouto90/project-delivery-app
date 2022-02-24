const salesProducts = (sequelize, _DataTypes) => {
  const salesproducts = sequelize.define('salesProducts', {}, { timestamps: false });

  salesproducts.associate = (models) => {
    models.products.belongsToMany(models.sales, {
      as: 'sales',
      through: salesproducts,
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });

    models.sales.belongsToMany(models.products, {
      as: 'products',
      through: salesproducts,
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });
  };

  return salesproducts;
};

module.exports = salesProducts;
