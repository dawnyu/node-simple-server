  var dbm = require('./dbm'),
      _ = require("lodash");
  module.exports = function(req, res, next) {
      let data = [],
          params = {},
          url = req.originalUrl,
          db = new dbm(`./db/${url.slice(url.lastIndexOf('/') + 1, url.length)}.json`).read()
      data = _filter(db, req.body)
      res.json({ timestamp: new Date().getTime(), msg: "查询成功", isSuccess: 0, data: data })
  }
  const _filter = (db, obj) => {
      if (!obj) return
      return _.filter(db, o => { return obj.dateTime == o.dateTime })
  }