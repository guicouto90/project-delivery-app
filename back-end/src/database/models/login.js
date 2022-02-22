const Login = (sequelize, DataTypes) => {
  const login = sequelize.define('Login', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true, 
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING
  },
  { timestamps: false });

  return login;
};

module.exports = Login;


/*'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Login extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *
    static associate(models) {
      // define association here
    }
  };
  Login.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Login',
  });
  return Login;
};*/