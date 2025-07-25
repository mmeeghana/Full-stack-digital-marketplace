const express = require("express");
const router = express.Router();
const multer = require("multer");
const { authMiddleware } = require("../middlewares/AuthMiddleware");
const My_dirName = "C:\\Users\\Meghana\\OneDrive\\Desktop\\vscode\\Gumroad\\frontend"


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/fileUploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post("/upload",authMiddleware,upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const { path, filename } = req.file;
        res.json({
            message: "File uploaded successfully",
            filePath: path,
            fileName: filename,
        });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({
            error: "An error occurred while processing the request",
        });
    }
});

module.exports = router;