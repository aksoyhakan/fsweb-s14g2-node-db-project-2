// ESNEK
exports.seed = function (knex, Promise) {
  return knex("cars")
    .truncate()
    .then(function () {
      return knex("cars").insert([
        {
          vin: "125sads158453131",
          make: "Ford",
          model: "Mustang",
          mileage: "258500",
          title: "Go west",
          transmission: "automatic",
        },
        {
          vin: "1sadasddff8453131",
          make: "Lexus",
          model: "GX 6000",
          mileage: "58933",
        },
      ]);
    });
};
