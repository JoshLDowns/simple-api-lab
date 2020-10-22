const faker = require("faker");
const path = require("path")

const appRouter = (app) => {
  app.get("/", (req, res) => {
    res.status(200).send("It's the Cute animal API!");
  });

  app.get("/users", (req, res) => {
    res.status(200).sendFile(path.resolve("api/users.json"))
  })

  app.get("/user/:name", (req, res) => {
    let name = req.params.name
    res.status(200).sendFile(path.resolve(`api/${name}.json`))
  })

  app.get("/animal", (req, res) => {
    let animal = {
      name: faker.name.firstName(),
      birthday: faker.date.past(),
      img: faker.image.animals(),
    };
    res.status(200).send(animal);
  });

  app.get("/animal/:count", (req, res) => {
    let count = req.params.count;
    let animals = [];

    if (isFinite(count) && parseInt(count) > 0 && parseInt(count) <= 10) {
      for (let i = 0; i < count; i++) {
        animals.push({
          name: faker.name.firstName(),
          birthday: faker.date.past(),
          img: faker.image.animals(),
        });
      }
      res.status(200).send(animals);
    } else if (parseInt(count) > 10) {
      res.status(400).send({
        message:
          "Holy cow, that's way to many animals, you can't have that many!",
      });
    } else {
      res.status(400).send({ message: "Invalid number of Animals!!" });
    }
  });
};

module.exports = appRouter;
