const db = require("../../data/db-config.js");

const getAll = () => {
  return db("cars");
};

const getById = (id) => {
  // HOKUS POKUS
  return db("cars").where({ id }).first();
};

const getByVin = (vin) => {
  // HOKUS POKUS
  return db("cars").where({ vin }).first();
};

const create = (car) => {
  // HOKUS POKUS

  return db("cars")
    .insert(car)
    .then((response) => {
      return getById(response[0]);
    });
};

module.exports = { getAll, getById, getByVin, create };
