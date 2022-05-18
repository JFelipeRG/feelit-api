const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (_, _, cb) {
      cb(null, './storage/imgs/profile')
    },
    filename: function (_, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${file.fieldname}-${uniqueSuffix}.png`)
    }
  })
  
  const upload = multer({ storage })

  module.exports = upload