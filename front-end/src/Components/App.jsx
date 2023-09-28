import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../style.css";
import MainPage from "./main-page";

const App = () => {
  return (
    <>
      <Header />
      <Footer />
      <MainPage />
      {/* <CreateNote passNote={addNote} updateData={updateData} setObj = {setObj}/>
      {show ? (
        <Note data={data} delData={delData} updateData={updateData} setValue = {setValue} />
      ) : null} */}
    </>
  );
};
export default App;
