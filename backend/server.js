const express = require("express");
const path = require("node:path");
const fs = require("node:fs");
const multer = require("multer");

const app = express();

// --- for json handling
app.use(express.json());
const filesDirectoryPath = path.join(__dirname, "files");
const uploadDirPath = path.join(filesDirectoryPath, "uploads");

// --- file upload on local file-system
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, uploadDirPath);
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage });

app.get("/api/v1/files", (req, res) => {
    fs.readdir(filesDirectoryPath, (err, files) => {
        if (err) {
            return res.status(500).send("Error reading files");
        }

        // --- filtering upload folder
        // --- TODO: search for better approach
        res.send(files.filter(f => f !== "uploads"));
    });
});

app.get("/api/v1/files/:filename", (req, res) => {
    const { params: { filename } } = req;
    const filePath = path.join(filesDirectoryPath, filename);

    // --- TODO: change this to stream reading
    fs.readFile(filePath, (err, data) => {
       if (err) {
           return res.status(500).send("Error reading file.");
       }

       res.send(data);
    });
});

app.put("/api/v1/files/:filename", (req, res) => {
   const { params: { filename }, body: { content } } = req;
   const filePath = path.join(filesDirectoryPath, filename);

   // --- TODO: change this to stream writing
   // --- TODO: Add validation for file creation if same name of file is already exist
   fs.writeFile(filePath, content, (err) => {
       if (err) {
           return res.status(500).send("Error writing file.");
       }

       res.send("File Saved");
   });
});

app.post("/api/v1/upload", upload.array("files"), (req, res) => {
    res.send("Upload file successfully.");
});

app.get("/api/v1/upload", (req, res) => {
   fs.readdir(uploadDirPath, (err, files) => {
       if (err) {
           console.log(err)
           res.status(500).send("Error reading file.");
       }

       res.send(files);
   });
});

app.get("/api/v1/download/:filename", (req, res) => {
    const { params: { filename } } = req;
    const filePath = path.join(uploadDirPath, filename);

    res.download(filePath, filename);
});

app.listen(process.env.PORT || 9002, () => {
    console.log("Server running on port " + (process.env.PORT || 9092));
});
