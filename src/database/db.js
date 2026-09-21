let database = new Map(); 

function getDb(){
    if(database) {
        return database
    }

    return new Map();

}

module.exports = { getDb }