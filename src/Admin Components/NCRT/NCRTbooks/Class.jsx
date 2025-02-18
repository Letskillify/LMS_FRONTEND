import { useEffect, useState } from "react";
import { useGetAllNcertClassesQuery } from "../../../Redux/Api/NCERT/NCERTclassSlice";
import { useNavigate } from "react-router-dom";

export default function ClassList() {
  const [classes, setClass] = useState([]);

  //   const initialValues = {
  //     ofClass: "",
  //     subject: "",
  //     bookTitle: "",
  //     bookName: "",
  //     coverImage: "",
  //     totalChapters: 12,
  //     chapters: [
  //       {
  //         chapterNo: "",
  //         name: "",
  //         title: "",
  //         description: "",
  //         downloadLink: "",
  //       },
  //     ],
  //   };

  const { data: NCERTClass } = useGetAllNcertClassesQuery();

  useEffect(() => {
    if (NCERTClass) {
      setClass(NCERTClass);
    }
  }, [NCERTClass]);

  const navigate = useNavigate();

  const handlesubject = (cls) => {
    navigate("/NCRT-subject", { state: { cls } });
  };
  return (
    <div className="container">
      <h4 className="fs-1 fw-bold  mt-3 text-center">Classes</h4>
      <div className="row container">
        {classes?.items?.map((cls) => (
          <div
            key={cls.id}
            className="col-4 p-3 cursor-pointer"
            onClick={() => handlesubject(cls)}
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
              <div className="flex items-center">
                <span
                  className={`bg-${cls.available ? "green" : "red"}-100 text-${
                    cls.available ? "green" : "red"
                  }-600 text-xs font-semibold px-2 py-1 rounded-lg`}
                >
                  {cls.available ? "Available" : "Not Available"}
                </span>
                <span className="ml-3 text-gray-400">&gt;</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

