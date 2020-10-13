var express = require("express");
var ImageService = require("./ImageService");

var { getConnection } = require("typeorm");

const ImageController = express.Router();

ImageController.post("/", ImageService.Upload.single("productImage"), async (req, res) => {
  let generatedName = await ImageService.GenerateImageURL(req.file.filename);

  var productImage = {
    productId: req.body.productId,
    image: generatedName,
  };

  try {
    await getConnection().createQueryBuilder().insert().into("Productimage").values(productImage).execute();
  } catch (err) {
    console.log(err);
  }

  res.json(generatedName);
});

ImageController.delete("/:productImage", async (req, res) => {
  try {
    await ImageService.RemoveImage(req.params.productImage);
    res.json(true);
  } catch (err) {
    res.json(false);
  }
});

module.exports = ImageController;
