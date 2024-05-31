const mysql = require("mysql")

//DataBase Creation 
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mysqlispassword@26"
});

//Connection establishment
function dbConnect(){
    con.connect(function(err){
        if(err) throw (err);
        console.log("DB Connected")
    });
}

//DB Creation 
function dbCreate(){
    con.query(`CREATE DATABASE project_todo`, function(err,res){
        if(err) throw err;
        console.log("DB Created")
  })
}

//DB get in use
function dbUse(){
    con.query(`USE project_todo`, function(err,res){
        if(err) throw err;
        console.log("DB In Business (laughing Emoji)")
    })
}

//User Account Query Creation
function userTableCreate(){
    con.query("CREATE TABLE user_table (userId INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL , password VARCHAR(14) NOT NULL, gender VARCHAR(10));",function(err,res){
        if (err) throw err;
        console.log("User table created Table is created");
    })
}
//User Login table 
function userLoginTableCreate(){
  con.query("CREATE TABLE user_login_table (userLoginId INT PRIMARY KEY, name VARCHAR(255) NOT NULL, password VARCHAR(14) NOT NULL);",function(err,res){
      if (err) throw err;
      console.log("User Login table created Table is created");
  })
}

// Insert data into Register and Checking for data repetation
async function getDataRegiter(name, pass, email, gender) {

  const sql1 = `select * from user_table where name = '${name}';`

  // const sql = `select userId from user_table order by userId desc limit 1;`;
    const [data] = await new Promise((resolve, reject) => {
      con.query(sql1, function (err, res) {
        if (err) throw err;
        else resolve(res);
      });
    });

    if(data){
      console.log("Data Repeatation happened")
      return true;
    } 
    
    else{
      console.log("Good To go")
      const sql = `INSERT INTO user_table(name, email, password, gender) VALUES (?, ?, ?, ?)`;
      con.query(sql, [name, email, pass, gender], function (err, res) {
        if (err) throw err;
        console.log("Data in  Register inserted Successfully");
        return false
      });
    } 
}


// insert data into Login
function getDataLogin(id, name, password) {
    const sql = `INSERT INTO user_login_table(userLoginId, name, password) VALUES (?, ?, ?)`;
    con.query(sql, [id, name, password], function (err, res) {
      if (err) throw err;
      console.log("Data in Login inserted Successfully");
    });
}

// Login info check into database 
async function checkLogin(name, password){
  console.log("name - ",name)
  console.log("pass - ",password)
  const sql = `SELECT * FROM user_login_table where name = '${name}' AND password = '${password}'`;
  const [LoginInfo] = await new Promise((resolve, reject) => {
    con.query(sql, function (err, res) {
      if (err) throw err;
      else resolve(res);
    });
  });
  
  if(LoginInfo){
    console.log("User Registered = ",LoginInfo)
    return {present:true, id:LoginInfo.userLoginId};
  }
  else{
    console.log("User not Registered",LoginInfo)
    return false;
  }
}

// Id Retriving from last user registeration
async function retrieveIdLastEntry() {

    const sql = `select userId from user_table order by userId desc limit 1;`;
  
    const [GetId] = await new Promise((resolve, reject) => {
      con.query(sql, function (err, res) {
        if (err) throw err;
        else resolve(res);
      });
    });
  
    if (!GetId) {
      console.log("Can't be retrived");
      return null;
    }
    const IdObj = {
      id: GetId.userId
    }
    return GetId ? IdObj : null;
  }


  //retrive data using ID
async function retrieveDataUsingId(id) {
    const int_id = parseInt(id);
    const sql = "SELECT * FROM user_table WHERE userId = ?";
  
    return new Promise((resolve, reject) => {
      con.query(sql, [id], (err, res) => {
  
        if (err) reject(err);
        else resolve(res); 
  
      });
    });
  }

// PersonID int,
//     PRIMARY KEY (OrderID),
//     FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)

function todoTableCreate(){
  con.query("CREATE TABLE todo (todoId INT AUTO_INCREMENT, userId INT, todoText TEXT(255) NOT NULL,PRIMARY KEY (todoId, userId), FOREIGN KEY (userId) REFERENCES user_login_table(userLoginId));",function(err,res){
    if (err) throw err;
    console.log("Todo Table is created");
})
}

async function todoTableInsert(todoId, userId, todoText){
  const sql = `INSERT INTO todo(todoId, userId, todoText) VALUES (?, ?, ?)`;
    con.query(sql, [todoId,userId,todoText ], function (err, res) {
      if (err) throw err;
      console.log("Data in Todo inserted Successfully");
    });
}

async function todoTableGetData(userId){
  console.log("userId from mysql = ", userId);
  const sql = `SELECT * FROM todo WHERE userId = ${userId}`;
  return new Promise((resolve, reject) => {
    con.query(sql, function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function todoTableDeleteData(userId, todoId){
  console.log("User Id from Delete = ",userId);

  const sql = `DELETE FROM todo WHERE userId = ${userId} and todoId = ${todoId}`;
  con.query(sql,function (err, res) {
    if (err) throw err;
    console.log("Data in Todo Deleted Successfully");
  });
}

async function journalTableCreate() {
  con.query("CREATE TABLE journal (journalId INT , userId INT, title VARCHAR(255) NOT NULL, date VARCHAR(14) NOT NULL, content VARCHAR(255) NOT NULL,PRIMARY KEY (journalId, userId), FOREIGN KEY (userId) REFERENCES user_login_table(userLoginId));", function(err, res) {
    if (err) throw err;
    console.log("journal Table is created");
  });
}

async function journalTableInsert(journalId, userId, title, date, content){
  const sql = `INSERT INTO journal(journalId, userId, title, date, content) VALUES (?, ?, ?, ?, ?)`;
    con.query(sql, [journalId, userId, title, date, content], function (err, res) {
      if (err) throw err;
      console.log("Data in Journal inserted Successfully");
    });
}

async function journalTableGetData(userId){
  console.log("userId from mysql for ournal = ", userId);
  const sql = `SELECT * FROM journal WHERE userId = ${userId}`;
  return new Promise((resolve, reject) => {
    con.query(sql, function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function journalTableDeleteData(userId, journalId){
  console.log("User Id from Delete for Journal = ",userId);

  const sql = `DELETE FROM journal WHERE userId = ${userId} and journalId = ${journalId}`;
  con.query(sql,function (err, res) {
    if (err) throw err;
    console.log("Data in journal Deleted Successfully");
  });
}

// Event Table Creation 
async function eventTableCreate(){
  con.query("CREATE TABLE event (eventId INT, userId INT, title TEXT(255) NOT NULL, date VARCHAR(15) NOT NULL,PRIMARY KEY (eventId, userId), FOREIGN KEY (userId) REFERENCES user_login_table(userLoginId));", function(err, res) {
    if (err) throw err;
    console.log("Event Table is created");
  });
}

async function eventTableInsert(eventId, userId, title, date){
  const sql = `INSERT INTO event(eventId, userId, title, date) VALUES (?, ?, ?, ?)`;
    con.query(sql, [eventId, userId, title, date], function (err, res) {
      if (err) throw err;
      console.log("Data in Event inserted Successfully");
    });
}

async function eventTableGetData(userId){
  console.log("userId from mysql for event = ", userId);
  const sql = `SELECT * FROM event WHERE userId = ${userId}`;
  return new Promise((resolve, reject) => {
    con.query(sql, function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function eventTableDeleteData(userId, eventId){
  console.log("User Id from Delete for Journal = ",userId);

  const sql = `DELETE FROM event WHERE userId = ${userId} and eventId = ${eventId}`;
  con.query(sql,function (err, res) {
    if (err) throw err;
    console.log("Data in event Deleted Successfully");
  });
}
//Agregate function COUNT 
async function eventTableGetDataForProfile(userId){
  console.log("userId from mysql for event = ", userId);
  const sql = `select count(userId) from event where userId = ${userId}`;
  return new Promise((resolve, reject) => {
    con.query(sql, function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
async function todoCount(userId){
  console.log("userId from mysql for todo = ", userId);
  const sql = `select count(userId) from todo where userId = ${userId}`;
  return new Promise((resolve, reject) => {
    con.query(sql, function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
async function journalCount(userId){
  console.log("userId from mysql for journal = ", userId);
  const sql = `select count(userId) from journal where userId = ${userId}`;
  return new Promise((resolve, reject) => {
    con.query(sql, function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
async function nameRetriver(userId){
  console.log("userId from mysql for event = ", userId);
  const sql = `SELECT name FROM user_login_table WHERE userLoginId = ${userId}`;
  return new Promise((resolve, reject) => {
    con.query(sql, function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}



//Check if registration copied or not
  module.exports = { dbConnect,
    todoCount,
    journalCount,
    nameRetriver,
    eventTableGetDataForProfile,
    eventTableDeleteData,
    eventTableGetData,
    eventTableInsert,
    eventTableCreate,
    journalTableDeleteData,
    journalTableGetData,
    journalTableInsert,
    todoTableDeleteData,
    todoTableGetData,
    todoTableInsert, 
    todoTableCreate,
    dbCreate,  
    userLoginTableCreate,
    getDataRegiter, 
    getDataLogin,
    dbUse,
    checkLogin,
    userTableCreate,
    retrieveIdLastEntry,
    retrieveDataUsingId,
  journalTableCreate }
   