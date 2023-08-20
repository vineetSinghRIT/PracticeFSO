const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config()
const Phno = require("./models/phone");

var morgan = require("morgan");

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("Params:  ", request.params);
  console.log("---");
  next();
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }
  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(requestLogger);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  {
    id: 5,
    name: "Vineet Poppendieck",
    number: "39-23-6423122",
  },
];
const date = new Date();
const options = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

app.get("/api/persons", (request, response) => {
  Phno.find({}).then((phone) => {
    response.json(phone);
  });
});

app.get("/api/persons/:id", (request, response,next) => {
  const id=request.params.id
  Phno.findById(id).then((phone) => {
    response.json(phone);
  }).catch((error) => next(error));

});

app.get("/info", (request, response) => {
  console.log("Info Request");
  Phno.find({}).then((result) => {
    response.send(
      `<h1>
      <p>Phone book has ${result.length}</p>
      <p>${date.toLocaleTimeString("en-us", options)}</p>
      </h1>`
    );
  }).catch((error) => next(error));
  
});

app.delete("/api/persons/:id", (request, response) => {
  console.log("Individual detail");
  //id=Number(request.params.id)
  id = request.params.id;

  Phno.findByIdAndDelete(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res,next) => {
  const body = req.body;
  console.log(req.params.id)

  const phoneUpdate = {
    name: body.name,
    phno: body.number,
  };

  console.log(phoneUpdate)

  Phno.findByIdAndUpdate(req.params.id, phoneUpdate, { new: true ,runValidators: true})
    .then(updatedPhone => {
      res.json(updatedPhone)
    })
    .catch(error => next(error))

});



app.post("/api/persons", (req, res,next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "content missing" });
  }

  const phoneNo = new Phno({
    name: body.name,
    phno: body.number,
  });

  phoneNo.save().then((savedNote) => {
    res.json(savedNote);
  }).catch(error => next(error));
});



// handler of requests with unknown endpoint
app.use(unknownEndpoint);

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
