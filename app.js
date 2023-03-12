require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morganBody = require("morgan-body");
const loggerStream = require("./utils/handleLogger");
const dbConnectNoSql = require("./config/mongo");
const { dbConnectMysql } = require("./config/mysql");
const app = express();
//Data base
const ENGINE_DB = process.env.ENGINE_DB;

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

// morganBody(app, {
//   noColors: true,
//   stream: loggerStream,
//   skip: function (req, res) {
//     return res.statusCode < 400;
//   },
// });
morganBody(app, {
  skip: function (req, res) {
    return (
      [403, 404, 409, 401].includes(res.statusCode) || res.statusCode < 400
    );
  },
  stream: loggerStream,
});

const port = process.env.PORT || 3000;

/**
 * Aqui invocamos a las rutas!👨‍💻👨‍💻
 */

app.use("/api", require("./routes"));

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`App listening on port ${port}!🛸🛸`));
(ENGINE_DB === "nosql") ? dbConnectNoSql() : dbConnectMysql();
