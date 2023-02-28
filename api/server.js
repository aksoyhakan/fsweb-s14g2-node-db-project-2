const express = require("express");
const carRoutes = require("./cars/cars-router");

const server = express();

server.use("/api/cars", carRoutes);

// SİHRİNİZİ GÖSTERİN

module.exports = server;
