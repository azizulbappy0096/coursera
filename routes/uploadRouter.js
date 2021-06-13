// --- modules
const express = require("express");
const multer = require("multer")
const authenticate = require("../authenticate")
const cors = require("./cors")

const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const filterImageFile = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|png|jpeg|gif|webp)$/)) {
        let err = new Error("You can upload only image files!")
        cb(err, false)
    }else {
        cb(null, true)
    }
}

const upload = multer({
    storage,
    fileFilter: filterImageFile
})

// at endpoint "/"
uploadRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res, next) => res.sendStatus(200))
  .get(cors.cors, authenticate.verifyToken, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end("GET operation not supported on /imageUpload");
  })
  .post(cors.corsWithOptions, authenticate.verifyToken, authenticate.verifyAdmin, upload.single("imageFile"), (req, res, next) => {
    res.setHeader("Content-Type", "application/json")
    res.status(200).json(req.file)
  })
  .put(cors.corsWithOptions, authenticate.verifyToken, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /imageUpload");
  })
  .delete(cors.corsWithOptions, authenticate.verifyToken, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /imageUpload");
  })

module.exports = uploadRouter  