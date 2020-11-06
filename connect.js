const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()
const option = {
  host: 'localhost',
  user: 'root',
  password: '',
  port: '3306',
  database: 'shangcheng',
  connectTimeout: 5000,//连接超时
  multipleStatements: false,//是否允许一个query中包含多条sql语句
}
app.use(cors());
app.use(bodyParser.json());//json请求
app.use(bodyParser.urlencoded({ extended: false }));//表单请求

let pool
reconn()

function Result({code = 0, msg = '', data = {}}) {
  this.code = code
  this.msg = msg
  this.data = data
}

function reconn() {
  pool = mysql.createPool({
    ...option,
    connectionLimit: 10,
    waitForConnections:true,
    queueLimit:0
  })
  pool.on('error',err=>err.code==='PROTOCOL_CONNECTION_LOST'&&setTimeout(reconn,2000))
}

module.exports = {
  pool,
  Result,
  router,
  app
}
