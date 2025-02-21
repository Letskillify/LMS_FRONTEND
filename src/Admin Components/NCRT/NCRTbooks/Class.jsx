import React from "react";
import Loader from "../../../GlobalComponents/GlobalLoader";

export default function ClassList({
  classes,
  isLoading,
  setClassData,
  setView,
}) {
  const handleSubject = (cls) => {
    setClassData(cls);
    setView("subjects");
  };

  if (isLoading) {
    return (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container pb-5">
      <h4 style={{ color: "#01376d" }} className="fs-1 fw-bold mt-3 text-center">Classes</h4>
      <div className="row">
        {classes?.map((cls) => (
          <div key={cls.id} className="col-lg-4 col-md-6 col-sm-12 p-3 ">
            <div
              style={{ borderRadius: "1rem" }}
              className="rounded-lg card px-4 position-relative py-4 main-card-hover transition hover:border-gray-500 cursor-pointer"
              onClick={() => handleSubject(cls)}
            >
              <div className="position-relative">
                <h4 className="text-blue-600 main-card-text mb-0 font-semibold text-lg">
                  {cls.classname}
                </h4>
                <p className="text-gray-600 main-card-text mb-0 text-sm">
                  Access all subjects and chapters
                </p>
              </div>
              <i
                style={{ fontSize: "30px" }}
                className="fa fa-arrow-circle-right right-accordion-icon position-absolute p-2 text-white"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
