const { Op } = require("sequelize")
const db = require("../models")
const Property = db.Property
const Room = db.PropertyItem

module.exports = {
    getAllProperties: async (req, res) => {
        try {
          
          const findAllProperties = await Property.findAll({ include: { all: true }})
    
          res.status(200).json({
            message: "Find all properties",
            data: findAllProperties
          })
        } catch (err) {
          console.log(err)
          return res.status(500).json({
            message: "Server error",
          })
        }
      },

      getPropertyById: async (req, res) => {
        try {
          const findPropertybyId = await Property.findOne({
            where: {
              id: req.params.id
            },
            include: {all: true}
          })
    
          res.status(200).json({
            message: "Find Property by ID",
            data: findPropertybyId,
          })
        } catch (err) {
          console.log(err)
          return res.status(500).json({
            message: "Server error",
          })
        }
      },

      getRoomById: async (req, res) => {
        try {
          const findRoombyId = await Room.findOne({
            where: {
              id: req.params.id
            },
            include: {all: true}
          })
    
          res.status(200).json({
            message: "Find Room by ID",
            data: findRoombyId,
          })
        } catch (err) {
          console.log(err)
          return res.status(500).json({
            message: "Server error",
          })
        }
      },



    }