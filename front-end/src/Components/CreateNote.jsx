import React, { useEffect } from "react";
import { useState } from "react";
import "./style.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import { addNote } from "./Services/DataService";

const CreateNote = (props) => {
  const defaultContent = {
    note_id: 0,
    note_title: "",
    note_desc: "",
  };
  const [content, setContent] = useState(defaultContent);
  const [open, setOpen] = useState(false);

  // POST METHOD

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
            props.passNote();
            setContent(defaultContent);
            alert("Note added successfully");
          }
        })
        .catch((ex) => console.log(ex));
    } else {
      alert("error while saving data.");
    }
  };

  useEffect(() => {
    props.updateData(content);
  }, []);

  return (
    <>
      <div className="main_note">
        <form>
          <input
            type="text"
            placeholder="Title"
            value={content.note_title}
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
              <Button onClick={addData}>
                <AddIcon className="plus-sign" />
              </Button>
            </>
          ) : null}
        </form>
      </div>
    </>
  );
};
export default CreateNote;
