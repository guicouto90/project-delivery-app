const sales = (sequelize, DataTypes) => {
  const sale = sequelize.define('sales', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: { 
      type: DataTypes.INTEGER,
      foreignKey: true 
    },
    seller_id: { 
      type: DataTypes.INTEGER,
      foreignKey: true 
    },
    total_price: DataTypes.DECIMAL(9,2),
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.INTEGER,
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING
  }, { timestamps: false });

  sale.associate = (models) => {
    sale.belongsTo(models.users, { as: 'user', foreignKey: 'user_id' });
  };

  sale.associate = (models) => {
    sale.belongsTo(models.users, { as: 'user', foreignKey: 'seller_id'})
  };

  return sale;
};

module.exports = sales;