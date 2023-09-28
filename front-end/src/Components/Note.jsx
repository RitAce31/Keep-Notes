import React, { useEffect, useState } from "react";
import "./style.css";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";

const Note = (props) => {
  const delData = (e) => {
    props.delData(e);
  };
  const updateData = (e) => {
    props.updateData(e.target.id);
  };
  return (
    <>
      {props.data.map((i, index) => {
        return (
          <>
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
                  onClick={updateData}
                  id={i.note_id}
                />
              </button>
            </div>
          </>
        );
      })}
    </>
  );
};
export default Note;
