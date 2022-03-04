const sales = (sequelize, DataTypes) => {
  const sale = sequelize.define('sales', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true,
    },
    userId: { 
      type: DataTypes.INTEGER,
      foreignKey: true 
    },
    sellerId: { 
      type: DataTypes.INTEGER,
      foreignKey: true 
    },
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.INTEGER,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING
  }, { timestamps: false });

  sale.associate = (models) => {
    sale.belongsTo(models.users, { as: 'user', foreignKey: 'userId' });
  };

  sale.associate = (models) => {
    sale.belongsTo(models.users, { as: 'user', foreignKey: 'sellerId'})
  };

  return sale;
};

module.exports = sales;