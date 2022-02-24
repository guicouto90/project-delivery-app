const Products = (sequelize, DataTypes) => {
  const product = sequelize.define('Products', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true, 
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4, 2),
    url_image: DataTypes.STRING,
  },
  { timestamps: false });

  return product;
};

module.exports = Products;
