const express = require("express");
// const cors = require("cors");
const multipart = require("connect-multiparty");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const corsOptions = {
//   origin: "*",
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

const multipartMiddleware = multipart({ uploadDir: "./uploads" });
app.post("/upload", multipartMiddleware, (red, res) => {
  const files = req.files;
  console.log(files);
  res.json({ message: files });
});

app.get("/downloadExcel", (req, res) => {
  res.download("./uploads/report.xlsx");
});

app.get("/downloadPDF", (req, res) => {
  res.download("./uploads/report.pdf");
});

app.use((err, req, res, next) => res.json({ error: err.message }));

app.listen(8000, () => {
  console.log("Servidor porta 8000");
});
