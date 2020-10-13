var crypto = require("crypto");
var multer = require("multer");
var fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/");
  },
  filename: (req, file, cb) => {
    cb(null, crypto.randomBytes(20).toString("hex") + "." + file.mimetype.split("/")[1]);
  },
});

class ImageService {
  static _baseImageRepo = "./images";
  static _baseAuthUrl = process.env.BASE_API_URL;

  static GenerateImageURL = (name) => {
    return ImageService._baseAuthUrl + "/imager/" + name;
  };

  static Upload = multer({ storage: storage });

  static RemoveImage = (imageName) => {
    try {
      fs.unlinkSync(ImageService._baseImageRepo + "/" + imageName);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = ImageService;
