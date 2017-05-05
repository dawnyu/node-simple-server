var fs = require('fs'),
    path = require('path');

function dbm(relativePath) {
    this.db = path.resolve(__dirname, relativePath);
}

dbm.prototype._isAvailable = function() {
    return fs.existsSync(this.db);
};

dbm.prototype.read = function() {
    if (!this._isAvailable()) return null;

    var contentInStr = fs.readFileSync(this.db, 'utf-8'),
        content;

    try {
        content = JSON.parse(contentInStr);
    } catch (e) {
        //this.delDb();
        console.error('[ERR] JSON.parse failed, deleted ' + this.db);
    }

    return content || null;
};

dbm.prototype.save = function(data) {
    var stringToSave = JSON.stringify(data);

    if (!stringToSave) return;
    fs.writeFileSync(this.db, stringToSave, 'utf-8');
};

dbm.prototype.delDb = function() {
    try {
        fs.unlinkSync(this.db);
    } catch (e) {
        console.error('DB file does not exist');
    }
};

module.exports = dbm;