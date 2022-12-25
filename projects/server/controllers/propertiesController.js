const { Op } = require("sequelize")
const db = require("../models")
const Properties = db.Property
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
        // where: {
        //   cities_name: {
        //     [Op.like]: `%${req.query.cities_name || ""}%`,
        //   },
        // },
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
          // include: [
          //   {
          //     model: Images,
          //
          //
          //   },
          // ],
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
}
