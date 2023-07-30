const express = require("express");
const app = express();
var morgan=require("morgan");

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

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
  console.log("All requested");
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  console.log("Individual detail");
  id=Number(request.params.id)
  detail=persons.filter(person => person.id===id)
  response.json(detail);
});

app.get("/info", (request, response) => {
  console.log("Info Request");
  response.send(
    `<h1>
    <p>Phone book has ${persons.length}</p>
    <p>${date.toLocaleTimeString("en-us", options)}</p>
    </h1>`
  );
});

app.delete("/api/persons/:id", (request, response) => {
  console.log("Individual detail");
  id=Number(request.params.id)
  persons=persons.filter(person => person.id!==id)
  response.json(persons);
});

app.post("/api/persons",(req,res)=>{
  randID=Math.floor(Math.random() * 29999)

  if (!req.body.name || !req.body.number){
    return res.status(400).json({error: 'content missing'})
  }

  data=req.body
  console.log(data)
  data.id=randID
  console.log(data);
  persons=persons.concat(data);
  res.json(data);
})



const PORT = 3001;
app.listen(PORT);
console.log(`App running on ${PORT}`);
