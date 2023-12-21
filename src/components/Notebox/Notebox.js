import React, { useState, useEffect } from "react";
import "./Notebox.css";
import AddIcon from "@mui/icons-material/Add";
import Notelist from "../Notelist/Notelist";

const Notebox = () => {
  const [noteList, setNoteList] = useState(() => {
    // Load notes from localStorage
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [note, setNote] = useState({
    title: "",
    content: "",
    color: "#ffffff", // Set a default color
  });

  const deleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setNoteList((oldItem) => {
        return oldItem.filter((item, index) => index !== id);
      });
    }
    // Save notes to localStorage after deleting a note
    localStorage.setItem("notes", JSON.stringify(noteList));
  };

  const handleEvent = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return { ...prevNote, [name]: value };
    });
  };

  const handleColorChange = (newColor, index) => {
    setNoteList((prevList) => {
      const updatedList = [...prevList];
      updatedList[index] = { ...updatedList[index], color: newColor };
      return updatedList;
    });
  };

  const addNote = () => {
    if (isEditing) {
      // If editing, update the note at the specified index
      setNoteList((oldData) => {
        const updatedList = [...oldData];
        updatedList[editIndex] = note;
        return updatedList;
      });
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setNoteList((oldData) => {
        return [note, ...oldData];
      });
    }
    // Save notes to localStorage after adding/editing a note
    localStorage.setItem("notes", JSON.stringify(noteList));
  };

  useEffect(() => {
    // Reset the note state to an empty note after the noteList is updated
    setNote({
      title: "",
      content: "",
      color: "#ffffff",
    });
    // Save notes to localStorage after updating noteList
    localStorage.setItem("notes", JSON.stringify(noteList));
  }, [noteList]);

  const startEditing = (id) => {
    setIsEditing(true);
    setEditIndex(id);
    setNote(noteList[id]);
  };

  // Filter the noteList based on the search term
  const filteredNotes = noteList.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="wrapper">
        <div className="input">
          <input
            onChange={handleEvent}
            type="text"
            placeholder="Title..."
            name="title"
            autoComplete="off"
            value={note.title}
          />
          <textarea
            onChange={handleEvent}
            placeholder="Enter Your Note..."
            name="content"
            value={note.content}
          ></textarea>

          <button onClick={addNote} type="button">
            <AddIcon fontSize="large" />
          </button>
        </div>
      </div>

      <div className="searchbar">
        <input
          className="search"
          type="text"
          placeholder="Search notes....."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="notelist">
        {filteredNotes.map((item, index) => {
          return (
            <Notelist
              title={item.title}
              content={item.content}
              color={item.color}
              key={index}
              id={index}
              onSelect={deleteItem}
              onEdit={startEditing}
              onColorChange={(newColor) => {
                handleColorChange(newColor, index); 
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Notebox;
