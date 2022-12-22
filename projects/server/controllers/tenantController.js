const db = require("../models")
const Properties = db.Property
const User = db.User

module.exports = {
  getTenant: async (req, res) => {
    try {
      const findTenant = await User.findByPk(req.params.id, {
        include: {
          model: db.Property,
          include: [
            { model: db.Categories },
            { model: db.PropertyImage },
            { model: db.Cities },
          ],
          // include: {
          //   model: db.PropertyImage,
          // },
        },
      })
      res.status(200).json({
        message: "Find Room By Id",
        data: findTenant,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}
