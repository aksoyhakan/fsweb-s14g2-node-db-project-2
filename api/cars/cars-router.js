// HOKUS POKUS
const express = require("express");
const CarModels = require("./cars-model");
const md = require("./cars-middleware");

const router = express.Router();
router.use(express.json());

router.use(md.logger);

router.get("/", (req, res, next) => {
  CarModels.getAll()
    .then((response) => res.status(200).json(response))
    .catch((err) => next({ code: 500, message: "database problem" }));
});

router.get("/:id", md.checkCarId, (req, res, next) => {
  CarModels.getById(req.params.id)
    .then((response) => res.status(200).json(response))
    .catch((err) => next({ code: 500, message: "database problem" }));
});

router.post(
  "/",
  md.checkCarPayload,
  md.checkVinNumberValid,
  md.checkVinNumberUnique,
  (req, res, next) => {
    CarModels.create(req.body)
      .then((response) => res.status(201).json(response))
      .catch((err) => next({ code: 500, message: "database problem" }));
  }
);

router.put(
  "/:id",
  md.checkCarId,
  md.checkCarPayload,
  md.checkVinNumberValid,

  (req, res, next) => {
    CarModels.updateById(req.params.id, req.body)
      .then((response) => res.status(201).json(response))
      .catch((err) => next({ code: 500, message: "database problem" }));
  }
);

router.delete("/:id", md.checkCarId, (req, res, next) => {
  CarModels.remove(req.params.id)
    .then((response) =>
      res.status(201).json({ message: `id ${response} car is deleted` })
    )
    .catch((err) => next({ code: 500, message: "database problem" }));
});

router.use((err, req, res, next) => {
  res.status(err.code).json({ message: err.message });
});
module.exports = router;
