const dotenv = require('dotenv').config();
const database = require('../db.config');

const TABLENAME = process.env.TABLENAME;

exports.createUser = async (id, username, email, password) => {
    
    console.log('Username is ' + username);

    try{
        const data = await database.db.query("INSERT INTO " + TABLENAME + "(id, username, email, password, createdAt, updatedAt) VALUES (?, ?, ? , ?, NOW(), NOW())", [id, username, email, password]);
        console.log('User created successfully');
        }
        catch(err){
            console.log(err);
        }
    }