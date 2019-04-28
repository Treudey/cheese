const orm = require('../config/orm');

const cheese = {
    selectAllCheeses: function() {
        return new Promise((resolve, reject) => {
            orm.selectAll('cheeses')
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    },
    insertCheese: function(col, val) {
        return new Promise((resolve, reject) => {
            orm.insertOne('cheeses', col, val)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    },
    updateCheese: function(objColVals, condition) {
        return new Promise((resolve, reject) => {
            orm.updateOne('cheeses', objColVals, condition)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
}

module.exports = cheese;