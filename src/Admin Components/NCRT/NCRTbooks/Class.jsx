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
      <h4 className="fs-1 fw-bold mt-3 text-center">Classes</h4>
      <div className="row">
        {classes?.map((cls) => (
          <div
            key={cls.id}
            className="col-lg-4 col-md-6 col-sm-12 p-3 cursor-pointer"
            onClick={() => handleSubject(cls)}
          >
            <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center shadow-sm hover:shadow-md transition">
              <div>
                <h2 className="text-blue-600 font-semibold text-lg">
                  {cls.classname}
                </h2>
                <p className="text-gray-600 text-sm">
                  Access all subjects and chapters
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
