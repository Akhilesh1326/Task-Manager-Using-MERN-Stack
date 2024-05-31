import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from 'axios';
import { userIdContext } from "../context/context";



const JournalPage = () => {
  const userIdMain = useContext(userIdContext);
  const userId = userIdMain.setC;
  const [maintaintId, setMaintainId] = useState(userId);

  const [journalList, setJournalList] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [journalId, setJournalId] = useState(1);

  useEffect(() => {
    fetchJournals();
  }, [maintaintId]); // Include maintaintId in dependencies array

  const fetchJournals = async () => {
    try {
      const response = await axios.get(`/data/journal/${maintaintId}`);
      setJournalList(response.data); // Assuming response.data is an array of journal objects

      // setJournalId(response.data[0])

      const getLenght = response.data[0].length;
      console.log("Lenghg = ",getLenght)
      console.log(response.data[0][getLenght-1].journalId+1);
      setJournalId(response.data[0][getLenght-1].journalId+1)

      console.log("response data = ",response.data)
    } catch (error) {
      console.error('Error fetching journal data:', error);
    }
  };

  const handleJournalSelect = (journal) => {
    // console.log("Journal Id for here = ",journal.journalId)
    // console.log("SelectJourla = ",selectedJournal)
    setSelectedJournal(journal);
    setTitle(journal.title);
    setDate(journal.date);
    setContent(journal.content);
  };

const handleJournalSubmit = async (e) =>{
  e.preventDefault();
  console.log("jounrla = ", journalId)
  try{
    const response = await axios.post('/data/get/journal',{
      maintaintId,
      journalId,
      title,
      date,
      content
    })
    console.log("Response from Backend for journal = ",response)
  }catch (error){
    console.log("Error while send data to backend in journal = ",error)
  }
  setTitle("");
  setDate("");
  setContent("");
  fetchJournals();
}

  const handleDelete = async () => {
    try {
      if (selectedJournal) {
        console.log("from delete button",selectedJournal.journalId);
        const response = await axios.delete(`/data/get/journal/delete/${maintaintId}/${selectedJournal.journalId}`);
        setSelectedJournal(null);
        setTitle("");
        setDate("");
        setContent("");
        fetchJournals(); // Refresh journal list after deleting
        console.log("Delte journal backend response = ",response)
      }
    } catch (error) {
      console.error('Error deleting journal:', error);
    }
  };

  const handleNewJournal = () => {
    setSelectedJournal(null);
    setTitle("");
    setDate("");
    setContent("");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
<div className="bg-gray-800 text-white w-1/4 py-8 px-6">
  <h2 className="text-2xl font-bold mb-4">Journals</h2>
  <ul>
    {journalList.map((outer, outerIndex) => (
      <div key={outerIndex}>
        {outer.map((journal, innerIndex) => (
          <li key={innerIndex} onClick={() => handleJournalSelect(journal)} className="cursor-pointer py-2 px-4 hover:bg-gray-700 font-bold bg-gray-900 rounded-md shadow-md shadow-blue-600 mb-2">
            {journal.title}
          </li>
        ))}
      </div>
    ))}
  </ul>
  <button className="bg-green-500 text-white px-6 py-2 rounded mt-4 hover:bg-green-600" onClick={handleNewJournal}>
    New Journal
  </button>
</div>






      {/* Main Content */}
      <div className="bg-gray-100 flex-1 p-8">
        {selectedJournal ? (
          <div>
            <h2 className="text-3xl font-bold mb-4">{selectedJournal.title}</h2>
            <p className="text-gray-600 mb-4">{selectedJournal.date}</p>
            <textarea
              placeholder="Write your journal here..."
              className="w-full border border-gray-300 rounded p-4 mb-4"
              rows="10"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                onClick={handleJournalSubmit}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div>
              <input
                type="text"
                placeholder="Title"
                className="border border-gray-300 rounded p-2 mb-4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="date"
                className="border border-gray-300 rounded p-2 mb-4"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <textarea
                placeholder="Write your journal here..."
                className="w-full border border-gray-300 rounded p-4 mb-4"
                rows="10"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                  onClick={handleJournalSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalPage;
