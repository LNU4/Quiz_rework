import mysql from 'mysql2/promise';

const db = mysql.createConnection({
    host: "localhost",
	user: "root",
	password: "root",
	database: "quiz_rework",
});

export default db;
