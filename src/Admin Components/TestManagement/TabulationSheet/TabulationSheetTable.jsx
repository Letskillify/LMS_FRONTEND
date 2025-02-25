import React, { useState } from 'react'
import useGlobalToast from '../../../GlobalComponents/GlobalToast'
import TabulationSheet from './TabulationSheet';
import GlobalTable from '../../../GlobalComponents/GlobalTable';

const TabulationSheetTable = () => {
    const showToast = useGlobalToast();
    const [TabulationSheetData, setTabulationSheetData] = useState([
        {
            studentCode: "STU-1001",
            name: "Aarav Sharma",
            parent: "Rajesh Sharma",
            subject: "English",
            rank: 1,
            percentage: 95,
            grade: "A+",
          },
          {
            studentCode: "STU-1002",
            name: "Rohan Verma",
            parent: "Sandeep Verma",
            subject: "Hindi",
            rank: 3,
            percentage: 78,
            grade: "B+",
          },
          {
            studentCode: "STU-1003",
            name: "Vihan Patel",
            parent: "Amit Patel",
            subject: "Mathematics",
            rank: 2,
            percentage: 88,
            grade: "A",
          },
          {
            studentCode: "STU-1004",
            name: "Ishita Mehta",
            parent: "Pankaj Mehta",
            subject: "Science",
            rank: 4,
            percentage: 72,
            grade: "B",
          },
          {
            studentCode: "STU-1005",
            name: "Kabir Singh",
            parent: "Anil Singh",
            subject: "Social Studies",
            rank: 5,
            percentage: 65,
            grade: "C+",
          },
          {
            studentCode: "STU-1006",
            name: "Sanya Kapoor",
            parent: "Vikram Kapoor",
            subject: "Computer Science",
            rank: 6,
            percentage: 59,
            grade: "C",
          },
    ]);
    
    const headers = ["StudentCode","Name","Parent","Subject","Rank","Percentage","Grade"];

    const tableData = 
    TabulationSheetData?.map((TabulationSheet,index) => ({
        StudentCode:TabulationSheet?.studentCode || "N/A",
        Name:TabulationSheet?.name || "N/A",
        Parent:TabulationSheet?.parent || "N/A",
        Subject:TabulationSheet?.subject || "N/A",
        Rank:TabulationSheet?.rank || "N/A",
        Percentage:TabulationSheet?.percentage || "N/A",
        Grade:TabulationSheet?.grade || "N/A",
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
     noDataMessage="No Test List found"
    />
    </>
  )
}

export default TabulationSheetTable