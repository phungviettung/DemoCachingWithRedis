const express = require('express')
const redis = require('redis')
const app = express()
const mysql = require('mysql')

//sửa kết nối mysql database  ở đây
const con = mysql.createConnection({
    host: "localhost",
    user: "tung",
    password: "xxxxxxxx",
    database: "test"
})

const redisClient = redis.createClient(6379)

const set = (key, value) => {
    redisClient.set(key, JSON.stringify(value))
    redisClient.expire(key, 2 * 60)
}

const get = (req, res, next) => {
    let key = 'product_' + req.query.id
    redisClient.get(key, (error, data) => {
        if (error) res.status(400).send(error)
        if (data !== null) res.status(200).send(JSON.parse(data))
        else next()
    })
}

app.get('/product', get, (req, res) => {
    var sql = 'SELECT * FROM product WHERE id = ' + req.query.id
    con.query(sql, function (err, results) {
        if (err) throw err
        let key = 'product_' + req.query.id
        set(key, results);
        res.send(results)
    })
})

app.listen(3000, function () {
    console.log('Node server running http://localhost:3000')
})