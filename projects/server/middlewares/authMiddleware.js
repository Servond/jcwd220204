const { validateToken } = require("../lib/jwt")

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization

  if (!token) {
    return res.status(401).json({
      message: "User unauthorized",
    })
  }

  try {
    token = token.split(" ")[1]

    const verifiedUser = validateToken(token)

    if (!verifiedUser) {
      return res.status(401).json({
        message: "Unauthorized request",
      })
    }

    req.user = verifiedUser

    next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({
      message: "Invalid token",
    })
  }
}

const tenant = async (req, res) => {
  try {
    const findTenantRole = await db.User.findOne({
      where: {
        id: req.User,
      },
    })

    if (findTenantRole.role !== "tenant") {
      throw new Error("forbident access")
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: "server error",
    })
  }
}

module.exports = {
  verifyToken,
  tenant,
}
