// import mysql from "mysql2";

// export const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "paubra",
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Database connection failed: ", err);
//   } else {
//     console.log("Connected to MySQL database");
//   }
// });

import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "bo0sfsji2we2qrqkksic-mysql.services.clever-cloud.com",
  user: "uql7haeksl3v4s9a",
  password: "vha8w0DxyJiNEXnKTrtj",
  database: "bo0sfsji2we2qrqkksic",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err);
  } else {
    console.log("Connected to MySQL database");
  }
});
