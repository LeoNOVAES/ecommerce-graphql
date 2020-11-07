const path = require('path')
require('dotenv').config({ path: path.resolve('.env') })
module.exports = {
    jwtSecret: process.env.JWT_SECRET
}