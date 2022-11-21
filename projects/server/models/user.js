'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //User.belongsTo(models.Role)
    }
  }
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    phone_number: DataTypes.STRING,
    profile_picture: DataTypes.STRING,
    is_verified: DataTypes.BOOLEAN,
    ktp: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      defaultValue: "user"
    }

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};