import React ,{useState} from 'react'
import { Link } from "react-router-dom";
import GlobalTable from "../../../GlobalComponents/GlobalTable";
import useGlobalToast from "../../../GlobalComponents/GlobalToast";

const GradeTable = ({AssignGrade ,handleGrade,handleGradeEdit}) => {
    const showToast = useGlobalToast();
    const [GradeData , setGradeData] = useState([

    ]);
    const handleGradeDelete = async (id) => {
        try {
          const res = await deleteTest(id);
          if (res.data.status === 200) {
            showToast("Grade  Deleted Successfully", "success");
          }
        } catch (error) {
          console.error("Error deleting the Garde:", error);
          showToast(`Error deleting the Garde ${error}`, "error");
        }
      };

      const headers = [
        "Name",
        "Form %",
        "To %",
        "For Test",
        "Class",
        "Section",
        "Session",
        "Action"
      ];

      const tabledata =
      GradeData?.map((grade) => ({
        Name:grade?.name,
        "Form %":grade?.form,
        "To %":grade?.to,
        "For Test":grade?.fortest,
        Class:grade?.class,
        Section:grade?.section,
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
        data={tabledata}
        actions={actions}
        loading={false}
        noDataMessage="No Test Lsit found"
      />
    </>
  )
}

export default GradeTable