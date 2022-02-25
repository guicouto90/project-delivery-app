const products = (sequelize, DataTypes) => {
  const product = sequelize.define('products', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4,2),
    url_image: DataTypes.STRING
  }, { timestamps: false });

  /*product.associate = (models) => {
    product.belongsTo(models.salesProcuts, { as: 'user', foreignKey: 'userId' });
  };*/

  return product;
};

module.exports = products;