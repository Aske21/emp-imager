//#region Globals

let cors = require("cors");
let express = require("express");
let bodyParser = require("body-parser");
let { createConnection } = require("typeorm");

require("dotenv").config();

//#endregion

//#region Imports

let ImagerController = require("./ImageController");

//#endregion

//#region Configuration

createConnection()
  .then(async (connection) => {
    const app = express();
    const port = process.env.PORT || 5001;

    app.use(bodyParser.json());
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));

    //#endregion

    //#region Controllers

    app.use("/imager", ImagerController);

    //#endregion

    app.use("/imager", express.static("./images"));

    //#region Listener

    app.listen(port, () => {
      console.log("Server running and listening on port: ", port);
    });

    //#endregion
  })
  .catch((error) => console.log(error));
