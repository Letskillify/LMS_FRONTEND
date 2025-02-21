import React from "react";
import { Button } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Loader from "../../../GlobalComponents/GlobalLoader";

const SubjectCard = ({ item, handleClick }) => (
  <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2 text-center">
    <div
      className="card shadow subject-card"
      style={{
        width: "100%",
        maxWidth: "200px",
        borderRadius: "1rem",
        overflow: "hidden",
        cursor: "pointer",
      }}
      onClick={() => handleClick(item)}
    >
      <img
        src={item?.coverImage || "imgs"}
        alt={item?.bookName}
        className="img-fluid"
        style={{ width: "100%", height: "250px", objectFit: "cover" }}
      />
    </div>
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>{item?.bookTitle}</Tooltip>}
    >
      <h5
        className="mt-2 book-name text-center text-truncate"
        style={{ width: "200px" }}
      >
        {item?.bookTitle}
      </h5>
    </OverlayTrigger>
  </div>
);

const Subjects = ({
  subjects,
  classData,
  setSubjectData,
  setView,
  isFetching,
  isLoading,
}) => {
  if (!subjects || subjects.length === 0)
    return <p className="text-center">No subjects available</p>;

  if (isLoading || isFetching ) {
    return (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="container text-center pb-5 my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{classData?.classname} Subjects</h2>
        <Button onClick={() => setView("classes")}>Back to Classes</Button>
      </div>
      <div className="row g-2">
        {subjects.map((item, index) => (
          <SubjectCard
            key={index}
            handleClick={() => setSubjectData(item) || setView("chapters")}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Subjects;
