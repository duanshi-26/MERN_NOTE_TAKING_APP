import "./App.css";
import { useState, useEffect } from "react";

function App() {
	const [title, setTitle] = useState("");
	const [des, setDes] = useState("");
	const [notes, setNotes] = useState(data);
	const [count, setCount] = useState(4);
  const [isRecording, setisRecording] = useState(false);
  const [note, setNote] = useState(null);
  const [notesStore, setnotesStore] = useState([]);
  const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const microphone = new SpeechRecognition();

microphone.continuous = true;
microphone.interimResults = true;
microphone.lang = "en-US";
const storeNote = () => {
setnotesStore([...notesStore, note]);
setNote("");
};
	function remove(id) {
		setNotes(notes.filter((e) => e.key !== id));
	}

	function handle() {
		if (!title || !des) {
			window.alert("Incomplete input");
			return;
		}
		setNotes([...notes, { key: count, title: title, des: des }]);
		setCount(count + 1);
		setTitle("");
		setDes("");
		console.log(notes);
	}
  const startRecordController = () => {
    if (isRecording) {
      microphone.start();
      microphone.onend = () => {
        console.log("continue..");
        microphone.start();
      };
    } else {
      microphone.stop();
      microphone.onend = () => {
        console.log("Stopped microphone on Click");
      };
    }
    microphone.onstart = () => {
      console.log("microphones on");
    };
  
    microphone.onresult = (event) => {
      const recordingResult = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(recordingResult);
      setNote(recordingResult);
      microphone.onerror = (event) => {
        console.log(event.error);
      };
    };
  };
  useEffect(() => {
    startRecordController();
  }, [isRecording]);
	return (
    <>
    		<div className="App">
			<div className="card">
				<div className="head">
					<h1>Coding Blocks Placement Notes</h1>
				</div>
				<div className="notes">
					{notes.map((e) => (
						<div className="notes-item">
							<div style={{ width: "90%" }}>
								<h4>Title: {e.title}</h4>
								<p>Note: {e.des}</p>
							</div>
							<button
								type="input"
								style={{
									fontSize: "20px",
									width: "8%",
									height: "35px",
									padding: "0 2% 0 2%",
									color: "black",
								}}
								onClick={() => remove(e.key)}
							>
								X
							</button>
						</div>
					))}
					<div className="add">
						<h3>Add Notes</h3>
						<input
							type="text"
							id="title"
							placeHolder="Add title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						></input>
						<input
							type="text"
							id="description"
							placeholder="Notes"
							value={des}
							onChange={(e) => {
								setDes(e.target.value);
							}}
						></input>
						<button type="submit" onClick={handle}>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
    <h1>Record Voice Notes</h1>
      <div>
        <div className="noteContainer">
          <h2>Record Note Here</h2>
          {isRecording ? <span>Recording... </span> : <span>Stopped </span>}
          <button className="button" onClick={storeNote} disabled={!note}>
            Save
          </button>
          <button onClick={() => setisRecording((prevState) => !prevState)}>
            Start/Stop
          </button>
          <p>{note}</p>
        </div>
        <div className="noteContainer">
          <h2>Notes Store</h2>
          **{notesStore.map((note) => (
            <p key={note}>{note}</p>
          ))}**
        </div>
      </div>
    </>
	);
}

// Dummy data
const data = [
	{
		key: 0,
		title: "Trie",
		des: "Best for string matching, it is advance data structure",
	},
	{
		key: 1,
		title: "Tree",
		des: "mirror tree ask in microsoft",
	},
	{
		key: 2,
		title: "Graph",
		des: "Kosaraju we learned today",
	},
];

export default App;
