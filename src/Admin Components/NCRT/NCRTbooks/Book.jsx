import React, { useState, useEffect } from "react";
import { useGetAllNcertClassesQuery } from "../../../Redux/Api/NCERT/NCERTclassSlice";
import { useGetNCERTBooksByClassQuery } from "../../../Redux/Api/NCERT/NCERTbookSlice";
import ClassList from "./Class";
import Chapters from "./Chapter";
import Subjects from "./Subjects";
import Loader from "../../../GlobalComponents/GlobalLoader";

const Book = () => {
  const [view, setView] = useState("classes");
  const [classData, setClassData] = useState(null);
  const [subjectData, setSubjectData] = useState(null);
  const [bookData, setBookData] = useState(null);

  const { data: NCERTClasses, isLoading: classesLoading } =
    useGetAllNcertClassesQuery();

  const classId = classData?._id;
  const { data: NCERTBook, isLoading: booksLoading, isFetching } =
    useGetNCERTBooksByClassQuery(classId, {
      skip: !classId,
      refetchOnMountOrArgChange: true,
    });

  useEffect(() => {
    if (NCERTBook?.items.length > 0) {
      setBookData(NCERTBook.items[0]);
    }
  }, [NCERTBook]);

  if (classesLoading || booksLoading) {
    return (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container h-100">
      {view === "classes" && (
        <ClassList
          classes={NCERTClasses?.items}
          isLoading={classesLoading}
          setClassData={setClassData}
          setView={setView}
        />
      )}
      {view === "subjects" && (
        <Subjects
          subjects={bookData?.subjects || []}
          classData={classData}
          isFetching={isFetching}
          isLoading = {booksLoading}
          setSubjectData={setSubjectData}
          setView={setView}
        />
      )}
      {view === "chapters" && (
        <Chapters subjectData={subjectData} setView={setView} />
      )}
    </div>
  );
};

export default Book;
