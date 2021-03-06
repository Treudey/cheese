const connection = require('./connection');

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    let arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (let key in ob) {
      let value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

// Main ORM object
////////////////////////////////////////////////
const orm = {
    selectAll: function(tableInput) {
        return new Promise((resolve, reject) => {
            let queryString = "SELECT * FROM " + tableInput + ";";
            connection.query(queryString, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    },
    insertOne: function(table, col, val) {
        return new Promise((resolve, reject) => {
            const queryString = `INSERT INTO ${table} (${col}) VALUES ("${val}");`;

            console.log(queryString);

            connection.query(queryString, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    },
    updateOne: function(table, objColVals, condition) {
        return new Promise((resolve, reject) => {
            let queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition};`;

            console.log(queryString);
            connection.query(queryString, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }
}

module.exports = orm;