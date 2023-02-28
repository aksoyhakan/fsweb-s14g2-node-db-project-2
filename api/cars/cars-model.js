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

const updateById = (id, car) => {
  return db("cars")
    .where({ id })
    .update(car, ["id", "vin", "make", "model", "mileage"]);
};

const remove = (id) => {
  return db("cars")
    .where({ id })
    .del()
    .then((res) => {
      return id;
    });
};

module.exports = { getAll, getById, getByVin, create, updateById, remove };
