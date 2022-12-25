const { Op } = require("sequelize")
const db = require("../models")
const Properties = db.Property
const fs = require("fs")

const Room = db.PropertyItem
const Cities = db.Cities

module.exports = {
  getAllProperties: async (req, res) => {
    try {
      const {
        _limit = 5,
        _page = 1,
        _sortBy = "id",
        _sortDir = "ASC",
      } = req.query
      const findAllProperties = await Properties.findAndCountAll({
        include: [
          {
            model: db.Cities,
            where: {
              cities_name: {
                [Op.like]: `%${req.query.cities_name || ""}%`,
              },
            },
          },
          { model: db.PropertyImage },
          { model: db.User },
          { model: db.Categories },
        ],
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        order: [[_sortBy, _sortDir]],
        distinct: true,
      })
      return res.status(200).json({
        message: "Find all properties",
        data: findAllProperties.rows,
        dataCount: findAllProperties.count,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getPropertyById: async (req, res) => {
    try {
      const findPropertyById = await Properties.findByPk(req.params.id, {
        include: [
          { model: db.User },
          { model: db.Categories },
          { model: db.PropertyImage },
          { model: db.Cities },
          { model: db.PropertyItem },
        ],
      })

      res.status(200).json({
        message: "Find property by ID",
        data: findPropertyById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getCityId: async (req, res) => {
    try {
      const findCity = await Cities.findByPk(req.params.id, {
        include: {
          model: db.Properties,
        },
      })
      res.status(200).json({
        message: "Find city  name",
        data: findCity,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },

  getRoom: async (req, res) => {
    try {
      const findRoomById = await Properties.findAll({
        include: {
          model: db.PropertyItem,
          include: {
            model: db.Images,
          },
        },
      })
      res.status(200).json({
        message: "Find Room By Id",
        data: findRoomById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  propertyPost: async (req, res) => {
    try {
      const foundCityById = await db.Cities.findByPk(req.body.cityId)
      const foundCategoryById = await db.Categories.findByPk(
        req.body.categoryId
      )
      const foundUserById = await db.User.findByPk(req.user.id)

      if (!foundCityById || !foundCategoryById) {
        throw new Error("cities and category is not found")
      }

      const createdNewProperty = await db.Property.create({
        name: req.body.name,
        address: req.body.address,
        rules: req.body.rules,
        description: req.body.description,
        CityId: foundCityById.id,
        CategoryId: foundCategoryById.id,
        UserId: foundUserById.id,
      })

      // ========================BUlkCreate===========================================================
      const files = req.files
      let img_path = []

      img_path = files.map((item) => item.filename)
      // console.log(files)
      const propId = createdNewProperty.id
      const newPropImg = img_path.map((item) => {
        return {
          image_url: item,
          PropertyId: propId,
        }
      })
      await db.PropertyImage.bulkCreate(newPropImg)

      const foundPropertyById = await db.Property.findByPk(
        createdNewProperty.id,
        {
          include: [db.PropertyImage, db.User],
        }
      )

      return res.status(201).json({
        message: "Post new product",
        data: foundPropertyById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  propertyUpdate: async (req, res) => {
    try {
      await db.Property.findOne({
        where: {
          id: req.params.id,
        },
      })

      await db.Property.update(
        { ...req.body },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      // })

      return res.status(200).json({
        message: "Property update",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  propertyDelete: async (req, res) => {
    // ======================== hapus file public==========================
    const pathProp = "public/propImg/"

    const fileName = await db.PropertyImage.findAll({
      where: {
        PropertyId: req.params.id,
      },
    })
    console.log(fileName)
    // ========================================================================
    try {
      await db.Property.destroy({
        where: {
          id: req.params.id,
        },
      })
      for (let i = 0; i < fileName.length; i++) {
        fs.unlinkSync(pathProp + fileName[i].image_url)
      }

      return res.status(200).json({
        message: "Property deleted",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  propertyImageDelete: async (req, res) => {
    const path = "public/propImg/"

    const fileName = await db.PropertyImage.findOne({
      where: {
        id: req.params.id,
      },
    })

    try {
      await db.PropertyImage.destroy({
        where: {
          id: req.params.id,
        },
      })
      fs.unlinkSync(path + fileName.image_url)

      return res.status(200).json({
        message: "Image deleted",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  propertyImagePost: async (req, res) => {
    try {
      await db.Property.findOne({
        where: {
          id: req.params.id,
        },
      })

      const newImgProp = await db.PropertyImage.create({
        // image_url: `public/propImg/${req.file.filename}`,
        image_url: req.file.filename,
        PropertyId: req.params.id,
      })

      console.log(req.file.filename)
      return res.status(201).json({
        message: "Post new Image Property",
        data: newImgProp,
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: req.message,
      })
    }
  },
}
