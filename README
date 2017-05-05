
使用
---
```
git clone https://github.com/dawnyu/node-simple-server.git
npm install 
npm start
```
技术栈
---
+ express
+ lodash

注意
---
程序简易模拟服务端接口为前端提供json数据，把需要的模拟数据放到db文件夹下面即可,通过lodash可以模拟真实场景的增删改查功能，可以为前端开发节省不少时间

```
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
```