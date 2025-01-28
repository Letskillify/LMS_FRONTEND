import React, { useState } from 'react';
import jsPDF from 'jspdf';
import logo from "../../assets/img/avatars/5.png"
const StudentTransfer = () => {
    const [studentInfo, setStudentInfo] = useState({
        srNo: '',
        grNo: '',
        studentName: '',
        casteReligion: '',
        placeOfBirth: '',
        dob: '',
        dobInWords: '',
        admissionDate: '',
        class: '',
        lastSchool: '',
        progress: '',
        conduct: '',
        remarks: '',
        reason: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudentInfo({ ...studentInfo, [name]: value });
    };

    // Example of Base64 image (school logo)

    const generateSLC = () => {
        const doc = new jsPDF();

        // Adding image (logo)
        doc.addImage(logo, 'JPEG', 85, 10, 40, 40); // Position: (x, y), Size: (width, height)

        // Adding school header
        doc.setFontSize(16);
        doc.text('DEMO SCHOOL', 80, 60);
        doc.setFontSize(12);
        doc.text('Lahore xyz address | +92000', 75, 70);

        // Title
        doc.setFontSize(14);
        doc.text('SCHOOL LEAVING CERTIFICATE', 70, 80);

        // Student information fields
        doc.setFontSize(12);
        doc.text(`Sr.No: ${studentInfo.srNo}`, 20, 90);
        doc.text(`GR.No: ${studentInfo.grNo}`, 150, 90);

        doc.text(`01. Name of Student: ${studentInfo.studentName}`, 20, 100);
        doc.text(`02. Caste / Religion: ${studentInfo.casteReligion}`, 20, 110);
        doc.text(`03. Place of Birth: ${studentInfo.placeOfBirth}`, 20, 120);
        doc.text(`04. Date of Birth: ${studentInfo.dob}`, 20, 130);
        doc.text(`(in words): ${studentInfo.dobInWords}`, 20, 140);
        doc.text(`05. Date of Admission: ${studentInfo.admissionDate}`, 20, 150);
        doc.text(`06. Class: ${studentInfo.class}`, 20, 160);
        doc.text(`07. Last School Attended: ${studentInfo.lastSchool}`, 20, 170);
        doc.text(`09. Progress: ${studentInfo.progress}`, 20, 180);
        doc.text(`10. Conduct: ${studentInfo.conduct}`, 20, 190);
        doc.text(`11. Remarks: ${studentInfo.remarks}`, 20, 200);
        doc.text(`12. Reason: ${studentInfo.reason}`, 20, 210);

        doc.text('Principal Signature:', 20, 230);
        doc.text('____________________', 20, 235);

        doc.save('SLC_Certificate.pdf');
    };

    return (
        <div>
            <div>
                <div className="card m-4">
                    <h5 className="card-header">Transfer Certificate</h5>
                    <div className="card-body">
                        <form action="">
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">Main Campus</label>
                                    <select className="form-select">
                                        <option selected="">Main Campus</option>
                                        <option value="1">Campus One</option>
                                        <option value="2">Campus Two</option>
                                        <option value="3">Campus Three</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label className="form-label">Class</label>
                                    <select className="form-select">
                                        <option selected=""></option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>

                                <div className="col">
                                    <label className="form-label">Section</label>
                                    <select className="form-select">
                                        <option selected="">A</option>
                                        <option value="1">B</option>
                                        <option value="2">C</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label className="form-label">Roll Number</label>
                                    <select className="form-select">
                                        <option selected=""></option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label className="form-label">Generate</label>
                                    <button type="button" onClick={generateSLC} className="btn btn-success w-100">Generate Certificate</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
           
        </div>
    );
};

export default StudentTransfer;
