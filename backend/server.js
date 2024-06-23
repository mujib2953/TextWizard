const express = require("express");
const path = require("node:path");
const fs = require("node:fs");

const app = express();

// --- for json handling
app.use(express.json());
const filesDirectoryPath = path.join(__dirname, "files");

app.get("/api/v1/files", (req, res) => {
    fs.readdir(filesDirectoryPath, (err, files) => {
        if (err) {
            return res.status(500).send("Error reading files");
        }

        res.send(files);
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

app.listen(process.env.PORT || 9002, () => {
    console.log("Server running on port " + process.env.PORT || 9002);
});
