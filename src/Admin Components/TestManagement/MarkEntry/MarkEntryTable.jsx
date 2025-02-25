import React ,{useState} from 'react'
import { Link } from "react-router-dom";
import GlobalTable from "../../../GlobalComponents/GlobalTable";
import useGlobalToast from "../../../GlobalComponents/GlobalToast";

const MarkEntryTable = ({MarkEntry ,handleMarkEntry,handleMarkEntryEdit}) => {
    const showToast = useGlobalToast();
    const [MarkData, setMarkData] = useState([
        {
          rollNo: "ST-1001",
          name: "Ayat Shabir",
          parent: "Shabir Ahmed",
          marksObtained: 85,
          totalMarks: 100,
          passingMarks: 33,
        },
        {
          rollNo: "ST-1002",
          name: "Muhammad Anas",
          parent: "Shamas Dnn",
          marksObtained: 72,
          totalMarks: 100,
          passingMarks: 33,
        },
        {
          rollNo: "ST-1003",
          name: "Muhammad Ibrahim Agha",
          parent: "Ishfque Ali",
          marksObtained: 90,
          totalMarks: 100,
          passingMarks: 33,
        },
        {
          rollNo: "ST-1004",
          name: "Simrat Kumar",
          parent: "Jaipal",
          marksObtained: 60,
          totalMarks: 100,
          passingMarks: 33,
        },
      ]);
      
    const handleGradeDelete = async (id) => {
        try {
          const res = await deleteTest(id);
          if (res.data.status === 200) {
            showToast("Mark Entry  Deleted Successfully", "success");
          }
        } catch (error) {
          console.error("Error deleting the Mark Entry:", error);
          showToast(`Error deleting the Mark Entry ${error}`, "error");
        }
      };

      const headers = [
        "#",
        "Roll No",
        "Name",
        "Parents",
        "Mark Obtained",
        "Total Mark",
        "Passing Mark",
      ];

      const tableData = MarkData?.map((Mark, index) => ({
        "#": index + 1,
        "Roll No": Mark?.rollNo || `ST-${1000 + index}`, 
        Name: Mark?.name,
        Parents: Mark?.parent || "N/A",
        "Mark Obtained": Mark?.marksObtained || 0,
        "Total Mark": Mark?.totalMarks || 100, 
        "Passing Mark": Mark?.passingMarks || 33, 
      })) || [];
      const actions = [
        {
            label: "Edit",
            className: "btn-primary",
            icon: "fa fa-edit",
            onClick: (row) => handlerecoverid(row._id),
          },
          {
            label: "Move To Trash",
            className: "btn-danger ms-2",
            icon: "fa fa-trash",
            onClick: (row) => handledelete(row._id),
          },
      ]

  return (
    <>
     <GlobalTable
        headers={headers}
        data={tableData}
        actions={actions}
        loading={false}
        noDataMessage="No Test Lsit found"
      />
    </>
  )
}

export default MarkEntryTable;