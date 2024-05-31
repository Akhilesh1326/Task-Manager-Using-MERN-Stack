const express = require("express");
const app = express();
// const cors = require("cors")
const bodyParser = require("body-parser");
const db = require("./Models/mysql")

const port = 3000;
// db.dbConnect(); 
// db.dbCreate();
db.dbUse();
// db.demo();
// db.todoTableCreate();
// db.eventTableCreate();
// db.userTableCreate();
// db.journalTableCreate();
// db.userLoginTableCreate();
// app.use(cors);
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));



// Register and Login Data Insertion
//Register checker for repetion
app.post("/data/get/register",async(req,res)=>{
  
  const resDataRegister =  req.body;
  console.log(resDataRegister)
  try{
    db.dbUse();

    const message = await db.getDataRegiter(resDataRegister.name,resDataRegister.password,resDataRegister.email,resDataRegister.gender);
    
    console.log("messsage from Database = ",message)
    
    if(message){
      console.log("Data Repeatation")
      res.json({msg:"Data Repeatation"})
      // res.json({msg:"Data Repeatation", sqlMsg:message})
    }
    else 
    {
      console.log("No Repeatation")
      const retrievedUser = await db.retrieveIdLastEntry();
      
      if (retrievedUser) {
        console.log("Got the Id:", retrievedUser);
        res.json({userId:retrievedUser})
        const id = retrievedUser.id;
        putLoginData(id, resDataRegister.name, resDataRegister.password)
        } 
      else {
        console.log("User id not found .");
      }
      res.json({msg:"Data has been collect = ",resDataRegister})
    }

    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
})

async function putLoginData(id, name, password){
  await db.getDataLogin(id,name,password);

}

 
// Here I am getting the data from the login page and check if user is present
app.post("/data/get/login",async(req,res)=>{
  const resDataLogin  = req.body;
  const msg = await db.checkLogin(resDataLogin.username, resDataLogin.password)

  if(msg){
    console.log("User Found")
    res.json({msg:"present", id:msg.id})
  }else{
    console.log("User Not Found")
    res.json({msg:"Ubsent"})
  }
})

// get data from sql and putting to frontend
app.get("/data/todo/:userId",async(req,res)=>{
  const userId = (req.params.userId);
  console.log("backend = ",userId)

  const todoData = await db.todoTableGetData(userId)
  console.log("Data from Database",todoData)

  res.send([todoData])
})

//Getting data from frontend and putting to mysql
app.post("/data/get/todo",async(req,res)=>{
  const resDataTodo = req.body;
  console.log(resDataTodo)
  db.todoTableInsert(resDataTodo.id, resDataTodo.userId, resDataTodo.eventText)

  res.json({msg:"Got the Data = ",resDataTodo})
})

app.delete('/data/get/todo/delete/:userId/:eventId', (req, res) => {
  const userId = req.params.userId;
  const eventId = req.params.eventId;
  console.log(userId)
  console.log(eventId)
  db.todoTableDeleteData(userId, eventId)
  res.json({msg:"We got the data as", eId:eventId, uId: userId})
});

//Here Journal Code 

//Putting to Frontend 
// Here I am providing the journal data from sql
app.get("/data/journal/:userId",async(req,res)=>{
  const uId = req.params.userId;
  console.log("UID + ",uId)

  const journalData = await db.journalTableGetData(uId);
  console.log("journal data = ",journalData)
  res.send([journalData])
})

app.post("/data/get/journal",(req,res)=>{
  const resDataJournal = req.body;
  console.log(resDataJournal.maintaintId, resDataJournal.journalId, resDataJournal.title, resDataJournal.date, resDataJournal.content)
  db.journalTableInsert(resDataJournal.journalId,resDataJournal.maintaintId, resDataJournal.title, resDataJournal.date, resDataJournal.content)
  res.json({msg:"Got the Data = ",resDataJournal})
})

app.delete('/data/get/journal/delete/:userId/:eventId', (req, res) => {
  const userId = req.params.userId;
  const eventId = req.params.eventId;
  console.log(userId)
  console.log(eventId)
  db.journalTableDeleteData(userId, eventId)
  res.json({msg:"We got the data as", eId:eventId, uId: userId})
});

//From here Event Operations 
// Here I am providing the event data from sql

app.get("/data/event/:userId",async(req,res)=>{
  console.log("User id from event = ",req.params.userId)
  const eventData = await db.eventTableGetData(req.params.userId);
  console.log("date = ",eventData.date)
  console.log(eventData)
  res.send(eventData)
})

//Post method in use
app.post("/data/get/event",(req,res)=>{
  const resDataEvent = req.body;
  console.log(resDataEvent)

  db.eventTableInsert(resDataEvent.Id, resDataEvent.maintaintId, resDataEvent.eventText, resDataEvent.eventDate);
  res.json({msg:"Got the Data = ",resDataEvent})
})

app.delete('/data/get/event/delete/:userId/:eventId', (req, res) => {
  const userId = req.params.userId;
  const eventId = req.params.eventId;
  console.log("User id = ",userId)

  console.log("Event Id = ",eventId)
  db.eventTableDeleteData(userId, eventId)
  res.json({msg:"We got the data as", eId:eventId, uId: userId})
});

// Management Data
app.get("/data/all/event/:userId",async(req,res)=>{
  console.log("User id from event = ",req.params.userId)
  const getAllTodo = await db.eventTableGetDataForProfile(req.params.userId)
  console.log("Data from event = ",getAllTodo[0]['count(userId)'])
  const data = getAllTodo[0]['count(userId)'];
  res.send({count:data})
})
app.get("/data/all/todo/:userId",async(req,res)=>{
  console.log("User id from event = ",req.params.userId)
  const getAllTodo = await db.todoCount(req.params.userId)
  console.log("Data from event = ",getAllTodo[0]['count(userId)'])
  const data = getAllTodo[0]['count(userId)'];
  res.send({count:data})
})
app.get("/data/all/journal/:userId",async(req,res)=>{
  console.log("User id from event = ",req.params.userId)
  const getAllTodo = await db.journalCount(req.params.userId)
  console.log("Data from event = ",getAllTodo[0]['count(userId)'])
  const data = getAllTodo[0]['count(userId)'];
  res.send({count:data})
})
app.get("/data/name/:userId",async(req,res)=>{
  console.log("User id from event = ",req.params.userId)
  // const getAllTodo = await db.eventTableGetDataForProfile(req.params.userId)
  const name = await db.nameRetriver(req.params.userId)
  res.send(name)
})


app.listen(port,()=>{
    console.log("Listning on Port = ",port);
})