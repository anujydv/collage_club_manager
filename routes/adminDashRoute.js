const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    res.render('admin/index');
});

module.exports = route;