const db = require("../models")
const fs = require("fs")
const { Op } = require("sequelize")
const Properties = db.Property
const Room = db.PropertyItem
const Images = db.Images

module.exports = {
  getAllRoom: async (req, res) => {
    try {
      const findAllRoom = await db.Images.findAll()

      return res.status(200).json({
        message: "Get all user",
        data: findAllRoom,
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
      const findRoomById = await Properties.findByPk(req.params.id, {
        include: {
          model: db.PropertyItem,
          include: [{ model: db.Images }, { model: db.Calendar }],
        },
      })
      res.status(200).json({
        message: "Find Room By Id",
        data: findRoomById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  createRoom: async (req, res) => {
    try {
      const createNewRoom = await Room.create({
        item_name: req.body.item_name,
        description: req.body.description,
        capacity: req.body.capacity,
        price: req.body.price,
        PropertyId: req.body.PropertyId,
      })

      //================================Post Image
      const files = req.files
      let img_path = []

      img_path = files.map((item) => item.filename)

      const roomId = createNewRoom.id
      const newRoomImg = img_path.map((item) => {
        return {
          picture_url: item,
          PropertyItemId: roomId,
        }
      })

      await db.Images.bulkCreate(newRoomImg)

      //================================

      const foundRoomById = await Room.findByPk(createNewRoom.id, {
        include: [db.Property, db.Images],
      })

      return res.status(201).json({
        message: "Post new room",
        data: foundRoomById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  deleteRoom: async (req, res) => {
    try {
      await Room.destroy({
        where: {
          id: req.params.id,
        },
      })
      return res.status(200).json({
        message: "property deleted",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  editRoomInfo: async (req, res) => {
    try {
      await Room.findOne({
        where: {
          id: req.params.id,
        },
      })
      await Room.update(
        { ...req.body },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      return res.status(200).json({
        message: "Room updated",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  deleteImageRoom: async (req, res) => {
    const path = "public"
    const fileName = await db.Images.findOne({
      where: {
        id: req.params.id,
      },
    })

    try {
      await db.Images.destroy({
        where: {
          id: req.params.id,
        },
      })
      fs.unlinkSync(path + fileName.picture_url)
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
  postImageRoom: async (req, res) => {
    try {
      await Room.findOne({
        where: {
          id: req.params.id,
        },
      })
      const newImgRoom = await db.Images.create({
        picture_url: req.file.filename,
        PropertyItemId: req.params.id,
      })
      console.log(req.file.filename)
      return res.status(200).json({
        message: "Room images has been added",
        data: newImgRoom,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}
