import React, { useEffect, useState } from "react";
import { useGetAllNCERTSubjectsQuery } from "../../../Redux/Api/NCERT/NCERTsubject";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetNCERTBookByIdQuery } from "../../../Redux/Api/NCERT/NCERTbookSlice";

const Subjects = ({ setView }) => {
  const [subject, setSubject] = useState([]);
  const [bookId, setBookId] = useState(null);
  const [Book, setBook] = useState([]);
  // const navigate = useNavigate();
  const location = useLocation();
  const { cls } = location.state || {};
  console.log("cls", cls);
  
  // const { data: NCERTsubject } = useGetAllNCERTSubjectsQuery();
  const { data: NCERTBook } = useGetNCERTBookByIdQuery(bookId,{
    skip: !bookId
  });
  console.log(NCERTBook, "NCERTBook");

  useEffect(() => {
    if (NCERTBook) {
      setBook(NCERTBook);
    }
  }, [NCERTBook]);

  useEffect(() => {
   if(cls){
    setBookId(cls._id)
   }
  }, [cls]);

  // console.log(NCERTBook,"NCERTBook")
  //   useEffect(() => {
  //     if (NCERTsubject) {
  //       setSubject(NCERTsubject);
  //     }
  //   }, [NCERTsubject]);

  return (
    <div className="container text-center my-4">
      <h2>{cls?.classname} Subjects</h2>
      <div className="row">
        {Book?.items?.map((item) => (
          <div  className="col-md-4">
            <div className="card p-3 shadow">
              <img
                src={item.coverImage || "imgs"}
                alt={item.bookName}
                className="img-fluid"
              />
              <h5>{item.bookName}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subjects;
