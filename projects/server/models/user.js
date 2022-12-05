"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      gender: { type: DataTypes.STRING, defaultValue: "your gender" },
      birthdate: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
      profile_picture: { type: DataTypes.STRING, defaultValue: "your name" },
      is_verified: {
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      ktp: DataTypes.STRING,
      role: { type: DataTypes.STRING, defaultValue: "user" },
      phone_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  )
  return User
}
