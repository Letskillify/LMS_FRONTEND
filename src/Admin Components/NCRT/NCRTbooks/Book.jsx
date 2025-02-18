import React, { useState } from "react";
import Class from "./Class";
import Subjects from "./Subjects";
import Chapters from "./Chapter";

const Book = () => {
  const [view, setView] = useState("classes");

  return (
    <div>
      {view === "classes" && <Class setView={setView} />}
      {view === "subjects" && <Subjects setView={setView} />}
      {view === "chapters" && <Chapters />}
    </div>
  );
};

export default Book;
