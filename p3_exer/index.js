
require('dotenv').config()
const express = require("express");
const app = express();
var morgan=require("morgan");
const cors=require("cors");


const Phno = require('./models/phone')
app.use(cors());
app.use(express.static('build'))
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
  Phno.find({}).then(phone => {
    response.json(phone)
  })
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
  const body=req.body

  if (!body.name || !body.number){
    return res.status(400).json({error: 'content missing'})
  }

  const phoneNo = new Phno({
    name: body.name,
    phno: body.number
  })

  phoneNo.save().then(savedNote => {
    res.json(savedNote)
  })
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})