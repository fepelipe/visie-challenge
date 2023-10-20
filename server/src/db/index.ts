import mysql from "mysql2";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export const sqlQuery = (query: string, values: Array<any>, callback: Function) => {
  pool.execute(query, values, function (err, result, fields) {
    if (err) throw err;
    console.log("here");
    callback(result);
  });
};
