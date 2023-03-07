const dotenv = require('dotenv').config();
const database = require('../db.config');

const TABLENAME = process.env.TABLENAME;

exports.createUser = async (req, res) => {
    const {Username, Email, Password} = req;
    const CreatedAt = Date.now();
    const UpdatedAt = Date.now();
    console.log('Username is ' + Username);

    // let query = "INSERT INTO " + TABLENAME + "(Username, Email, Password, CreatedAt, UpdatedAt)
    // VALUES('" + Username + "', '" + Email + "', '" + '" + Password + "', '"+ CreatedAt, ${UpdatedAt})`;

    try{
        const data = database.db.query(query);
        console.log(data.rows);
        }
        catch(err){
            console.log(err);
        }
    }