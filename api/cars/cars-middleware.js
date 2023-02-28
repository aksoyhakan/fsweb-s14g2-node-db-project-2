const CarModels = require("./cars-model");
const vinValidator = require("vin-validator");

const logger = (req, res, next) => {
  // HOKUS POKUS
  console.log(
    `${req.method}--${req.originalUrl}--${new Date().toLocaleTimeString()}`
  );
  next();
};

const checkCarId = (req, res, next) => {
  // HOKUS POKUS
  CarModels.getById(req.params.id)
    .then((response) => {
      response
        ? next()
        : next({
            code: 404,
            message: `${req.params.id} kimliğine sahip araba bulunamadı`,
          });
    })
    .catch((err) => next({ code: 500, message: "database problem" }));
};

const checkCarPayload = (req, res, next) => {
  // HOKUS POKUS
  const { vin, make, model, mileage } = req.body;
  !vin &&
    next({
      code: 400,
      message: `vin is missing`,
    });
  !make &&
    next({
      code: 400,
      message: `make is missing`,
    });
  !model &&
    next({
      code: 400,
      message: `model is missing`,
    });
  !mileage &&
    next({
      code: 400,
      message: `mileage is missing`,
    });

  next();
};

const checkVinNumberValid = (req, res, next) => {
  // HOKUS POKUS
  let vinCheck = vinValidator.validate(req.body.vin);
  vinCheck
    ? next()
    : next({
        code: 400,
        message: `vin ${req.body.vin} is invalid`,
      });
};

const checkVinNumberUnique = (req, res, next) => {
  // HOKUS POKUS
  CarModels.getByVin(req.body.vin)
    .then((response) =>
      response
        ? next({
            code: 400,
            message: `vin ${req.body.vin} already exists`,
          })
        : next()
    )
    .catch((err) => next({ code: 500, message: "database problem" }));
};

module.exports = {
  logger,
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
