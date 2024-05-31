import React, { useState } from "react";
import plus from "../../src/plus.svg";

// import Mainjournal from "./Mainjournal";
const Sidebar = () => {
  // const [idCheck, setIdCheck] = useState(0)
  const [journalList, setJournalList] = useState([]);
  const [paraContext, setParaContext] = useState([]);

  const [isTrue, setIsTrue] = useState(false);
  const [ButtonTrue, setButtonTrue] = useState(false);
  const [parahDesignTrue, setParaDesignTrue] = useState(true);
  const [getId, setGetId] = useState(1);
  const [Id, setId] = useState(0);

  const [listText, setListText] = useState("");
  const [paraText, setParaText] = useState("");
  const [paraTitle, setParaTitle] = useState("");
  const [paraDate, setParaDate] = useState("");

  const handleParaChange = (e) => {
    setParaText(e.target.value);
    console.log("handling para");
  };
  const handleParaTitle = (e) => {
    setParaTitle(e.target.value);
    console.log("handling title");
  };
  const handleParaDate = (e) => {
    setParaDate(e.target.value);
    console.log("handling date");
  };

  const handleChange = (e) => {
    setListText(e.target.value);
    console.log("handling change");
  };

  const handleGetId = (e) =>{
    
  }

  const handleAdd = (e) => {
    setId(Id + 1);
    console.log("handling add = ", listText);
    let text = listText;
    setJournalList([...journalList, { id: Id, text }]);
    setListText("");
    setIsTrue(isTrue==false)
  };

  const handleParaAdd = (e) => {
    let para = paraText;
    let title = paraTitle;
    let date = paraDate;
    console.log("hello = ", para, title, date);
    setParaContext([...paraContext, { id: Id, title, date, para }]);
    setParaText("");
    setParaTitle("");
    setParaDate("");
  };



  return (
    <> 
      <div className="grid grid-cols-12 bg-violet-950">
        <div className="bg-indigo-400 col-span-2" style={{ height: "91.5vh" }}> 
          <div className="mx-14 text-white text-2xl mt-2">Journals</div>

          <img
            src={plus}
            alt=""
            className="h-10 ml-20"
            onClick={() => {
              setIsTrue(isTrue === true ? false : true), console.log(isTrue);
            }}
          />

          <input
            type="text"
            className="ml-4"
            disabled={isTrue === false ? true : false}
            onChange={handleChange}
            value={listText}
          />

          <button
            className="text-white py-1 px-2 ml-16 mt-4 bg-indigo-950 rounded-lg items-center "
            onClick={handleAdd}
            disabled={isTrue==false}
          >
            Submit it
          </button>
          {journalList.map((item) => {
            
            return (
              <div
                onClick={() => {
                  setButtonTrue(ButtonTrue == false ? true : false),console.log("iddd = ",item.id), setGetId(getId===item.id)
                }}
                key={item.id}
                className="mx-4 py-4 my-4 bg-indigo-300 px-3 rounded-lg font-semibold text-slate-900">
                {item.text}
                {item.id}
              </div>
            );
          })}
        </div>

        <div
          className=" bg-indigo-800 col-span-10"
          style={{ height: "91.5vh" }}
        >
          {/* { parahDesignTrue?(
            <div>it's true</div>
          ):(
            <div>it's false</div>
          )
          } */}

          <input
            type="text"
            className="mx-10 text-violet-900 pl-4 text-3xl pt-1 pb-1 font-bold mt-10 rounded-sm"
            placeholder="Title here"
            onChange={handleParaTitle}
            value={paraTitle}
          ></input>

          <input
            type="date"
            className="text-violet-900 font-semibold mx-10 mt-2 mb-10 text-x border-sky-700 border-2"
            placeholder="Date here"
            onChange={handleParaDate}
            value={paraDate}
          ></input>
          <div className="max-h-96 ml-10">
            <input
              type="textarea"
              className="text-black px-2 py-2 rounded-sm"
              placeholder="Write Journal.."
              onChange={handleParaChange}
              value={paraText}
            ></input>
            <button
              className="text-white py-2 px-4 bg-indigo-950 rounded-lg items-center ml-96 disabled:bg-indigo-600"
              disabled={ButtonTrue === false}
              onClick={handleParaAdd}
            >
              Submit{" "}
            </button>
          </div>
          {paraContext.map((item)=>{
            
            paraContext.find(Id)?(

              
                <div  key={item.val} className="overflow-y-scroll max-h-96 ml-10 bg-white my-10 mx-10 ">
                <div className="bg-white mx-10 h-48 my-10">{item.val} {item.title} {getId}</div>
               </div>
              
            ):(
              
                <div  key={item.val} className="overflow-y-scroll max-h-96 ml-10 bg-white my-10 mx-10 ">
                <div className="bg-white mx-10 h-48 my-10">Not found</div>
               </div>
            )
            }

          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
