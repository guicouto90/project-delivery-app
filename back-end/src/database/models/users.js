const users = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true, 
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  },
  { timestamps: false });

  /*User.associate = (models) => {
    User.hasOne(models.BlogPosts, { as: 'sales', foreignKey: 'id' });
   };*/

  return user;
};

module.exports = users;