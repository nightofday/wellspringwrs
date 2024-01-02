import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import cors from "cors";
import fileUpload from "express-fileupload";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static("public"));

// Create connection to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "wellspringwrs",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

// API endpoint to file upload
app.post("/api/upload", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: "No files were uploaded." });
  }

  const uploadedFile = req.files.photo;
  const allowedFileTypes = ["image/jpeg", "image/png"];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  if (
    !allowedFileTypes.includes(uploadedFile.mimetype) ||
    uploadedFile.size > maxFileSize
  ) {
    return res
      .status(400)
      .json({ error: "Invalid file type or size exceeds the limit." });
  }

  const uploadDir = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "public",
    "media",
    "uploads"
  );

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  let uploadPath = path.join(uploadDir, uploadedFile.name);
  let uploadFilename = uploadedFile.name;
  let counter = 1;

  while (fs.existsSync(uploadPath)) {
    const fileExtension = path.extname(uploadedFile.name);
    const fileNameWithoutExtension = path.basename(
      uploadedFile.name,
      fileExtension
    );
    uploadFilename = `${fileNameWithoutExtension}_${counter}${fileExtension}`;
    uploadPath = path.join(uploadDir, uploadFilename);
    counter++;
  }

  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ error: "Error moving the file." });
    }
    res.json({ path: `uploads/${uploadFilename}` });
  });
});

// API endpoint to get customers
app.get("/api/customers", (req, res) => {
  if (req.query.name) {
    const sql = "SELECT * FROM customers WHERE Name = ?";
    db.query(sql, [req.query.name], (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  } else {
    const sql = "SELECT * FROM customers order by Name";
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  }
});

// API endpoint to post customers
app.post("/api/customers", (req, res) => {
  const sql = "INSERT INTO customers SET ?";
  const customer = {
    Name: req.body.name,
    Email: req.body.email,
    Address: req.body.address,
    Phone: req.body.phone,
    Points: 0,
    BorrowedContainers: 0,
    IsActive: 0,
    Notes: req.body.notes,
    CustomerType: req.body.customerType,
  };
  if (req.body.photo) {
    customer.Photo = req.body.photo;
  }

  db.query(sql, customer, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
