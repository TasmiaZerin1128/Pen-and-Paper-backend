module.exports = {
    createUsers : `CREATE TABLE IF NOT EXISTS Users 
    (Id INT AUTO_INCREMENT PRIMARY KEY, 
    Username VARCHAR(255) UNIQUE, 
    Email VARCHAR(255),
    Password VARCHAR(255),
    CreatedAt DATE,
    UpdatedAt DATE)`
}