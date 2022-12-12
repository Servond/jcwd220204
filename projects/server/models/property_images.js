"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class PropertyImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PropertyImage.belongsTo(models.Property, { onDelete: "CASCADE" })
    }
  }
  PropertyImage.init(
    {
      image_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PropertyImage",
    }
  )
  return PropertyImage
}
