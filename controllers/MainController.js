const path = require('path');
var parentDir = path.normalize(__dirname+"/..");

module.exports = {
    async index(req, res){
        res.sendFile(parentDir + '/public/index.html');
    }
}