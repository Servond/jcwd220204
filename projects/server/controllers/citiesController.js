const { Op } = require("sequelize")
const db = require("../models")

const Cities = db.Cities

const citiesController = {
  getCityOfProperty: async (req, res) => {
    try {
      const {
        _limit = 10,
        _page = 1,
        _sortBy = "id",
        _sortDir = "ASC",
      } = req.query
      const getAllCityOfProperty = await Cities.findAndCountAll({
        where: {
          cities_name: {
            [Op.like]: `%${req.query.cities_name || ""}`,
          },
        },
        include: [{ model: db.Property }],
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        order: [[_sortBy, _sortDir]],
      })
      return res.status(200).json({
        message: "Get cities of Property",
        data: getAllCityOfProperty.rows,
        dataCount: getAllCityOfProperty.count,
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = citiesController
