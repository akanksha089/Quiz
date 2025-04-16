// const mysql = require("mysql2/promise");
// const dotenv = require("dotenv");
// dotenv.config({ path: "backend/config/config.env" });

// const mysqlPool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "nodejs2",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });
// module.exports = mysqlPool;


const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });

const mysqlPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // Default port if not specified
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the connection when the pool is created
mysqlPool.getConnection()
  .then(() => {
    console.log("Successfully connected to MySQL");
  })
  .catch((err) => {
    console.error("Error connecting to MySQL:", err);
    process.exit(1); // Exit if connection fails
  });

module.exports = mysqlPool;


