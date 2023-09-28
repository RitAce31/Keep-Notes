import React, { useState, useEffect } from "react";
import { addNote, delNote, getNote, updateNote } from "./Services/DataService";
import "../style.css";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
export default function MainPage(props) {
  //#region add
  const defaultContent = {
    note_id: 0,
    note_title: "",
    note_desc: "",
  };
  const [content, setContent] = useState(defaultContent);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  // POST METHOD
  const onPlus = () => {
    if (content.note_id == 0) {
      addData();
    } else {
      updateData();
    }
  };
  const isValid = () => {
    let isvalid = true;
    if (content.note_desc.trim().length === 0) {
      isvalid = false;
    }
    if (content.note_title.trim().length === 0) {
      isvalid = false;
    }
    return isvalid;
  };

  const addData = () => {
    let isvalid = isValid();
    if (isvalid) {
      addNote(content)
        .then((res) => {
          if (res.status == 201) {
            alert("data is not valid");
          } else {
            setContent(defaultContent);
            alert("Note added successfully");
            refreshNote();
            setOpen(false);
          }
        })
        .catch((ex) => console.log(ex));
    } else {
      alert("error while saving data.");
    }
  };
  //#endregion

  //#region list
  // GET METHOD

  const fillData = () => {
    getNote()
      .then((res) => {
        if (res.status == 202) {
          console.log("data found", res.data);
          setData(res.data);
        } else {
          alert("there is some error in data");
        }
      })
      .catch((ex) => console.log(ex));
  };

  // DELETE METHOD

  const delData = (e) => {
    const confirmBox = window.confirm("Do you want to delete the note?");
    if (confirmBox == true) {
      delNote(e.target.id)
        .then((res) => {
          if (res.status == "204") {
            alert("There is some error deleting the data");
          } else {
            refreshNote();
            alert("Note deleted successfully.");
          }
        })
        .catch((ex) => console.log(ex));
    }
  };
  // TO EDIT THE DATA AND DISPLAY UPDATED DATA
  const updateData = () => {
    if (isValid()) {
      console.log(content);
      updateNote(content.note_id, content)
        .then((d) => {
          let temp = JSON.parse(d.data);
          console.log(temp);
          if (temp.CODE == 200) {
            alert("Details updated successfully.");
            setContent(defaultContent);
            refreshNote();
            setOpen(false);
          }
        })
        .catch((ex) => {
          alert("Error while updating details.");
          console.log(ex);
        });
    } else {
      alert("error while updating the data");
    }
  };
  // TO SELECT THE NOTE TO EDIT

  const refreshNote = () => {
    fillData();
  };

  const onEditButtonClick = (e) => {
    for (let i = 0; i < data.length; i++) {
      console.log("id", e.target.id, data[i]);
      if (data[i].note_id === parseInt(e.target.id)) {
        console.log("obj found");
        setOpen(true);
        setContent(data[i]);
      }
    }
  };

  useEffect(() => {
    fillData();
  }, []);
  //#endregion

  return (
    <>
      <div className="main_note">
        <form>
          <input
            type="text"
            placeholder="Title"
            value={content.note_title}
            onFocus={() => {
              setOpen(true);
            }}
            onChange={(e) => {
              setContent((prev) => {
                return {
                  ...prev,
                  note_title: e.target.value,
                };
              });
            }}
            onClick={() => {
              setOpen(true);
            }}
          />
          {open ? (
            <>
              <textarea
                row=""
                column=""
                value={content.note_desc}
                placeholder="Write a note"
                onChange={(e) => {
                  setContent((prev) => {
                    return {
                      ...prev,
                      note_desc: e.target.value,
                    };
                  });
                }}
              />
              <Button onClick={onPlus}>
                <AddIcon className="plus-sign" />
              </Button>
            </>
          ) : null}
        </form>
      </div>
      {data.map((i, index) => {
        return (
          <div key={index}>
            <div className="note">
              <h1>{i.note_id}. </h1>
              <h1>{i.note_title}</h1>
              <br />
              <p>{i.note_desc}</p>
              <button className="btn">
                <RemoveCircleOutlineIcon
                  id={i.note_id}
                  onClick={delData}
                  className="deleteIcon"
                />
              </button>
              <button className="btn">
                <EditNoteRoundedIcon
                  className="deleteIcon"
                  onClick={onEditButtonClick}
                  id={i.note_id}
                />
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
