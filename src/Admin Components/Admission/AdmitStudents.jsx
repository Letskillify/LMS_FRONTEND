import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Formik, Form, Field, useFormikContext } from 'formik';
// import * as Yup from 'yup';
import { Link, Navigate, useNavigate } from 'react-router-dom';
// import LMSTable from '../Students/LMSTable';
import * as Yup from "yup";
import { DeleteApi, PutApi } from '../../Custom Hooks/CustomeHook';
import { getCommonCredentials } from '../../GlobalHelper/CommonCredentials';
import { useAddAllStudentsToTrashMutation, useAddStudentMutation } from '../../Redux/Api/studentSlice';
import useGlobalToast from '../../GlobalComponents/GlobalToast';
import StudentTable from './components/AdmitStudentTable';
const validationSchema = Yup.object({
    personalDetails: Yup.object({
        profilePhoto: Yup.mixed().nullable(),
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        dateOfBirth: Yup.date().required("Date of birth is required")
            .nullable()
            .max(new Date(), "Date of birth cannot be in the future"),
        gender: Yup.string().required("Gender is required"),
        bloodGroup: Yup.string().nullable(),
        aadharNo: Yup.string()
            .required("Aadhar number is required")
            .matches(/^\d{12}$/, "Aadhar number must be 12 digits"),
        maritalStatus: Yup.string().nullable(),
        nationality: Yup.string().required("Nationality is required"),
        religion: Yup.string().required("Religion is required"),
        category: Yup.string().required("Category is required"),
        caste: Yup.string().nullable(),
    }),
    contactInfo: Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        mobile: Yup.string()
            .matches(/^\d{10}$/, "Mobile number must be 10 digits")
            .required("Mobile number is required"),
        whatsapp: Yup.string()
            .nullable()
            .matches(/^\d{10}$/, "WhatsApp number must be 10 digits"),
        alternateContact: Yup.string().nullable().matches(/^\d{10}$/, "Alternative must be 10 digits"),
        address: Yup.object({
            houseNo: Yup.string().required("House number is required"),
            streetName: Yup.string().required("Street name is required"),
            city: Yup.string().required("City is required"),
            pincode: Yup.string()
                .required("Pincode is required")
                .matches(/^\d{6}$/, "Pincode must be 6 digits"),
            state: Yup.string().required("State is required"),
            country: Yup.string().required("Country is required"),
        }),
    }),
    parentDetails: Yup.object({
        Father: Yup.object({
            name: Yup.string().required("Name is required"),
            qualification: Yup.string().nullable(),
            residentialAddress: Yup.string().nullable(),
            occupation: Yup.string().nullable(),
            officialAddress: Yup.string().nullable(),
            annualIncome: Yup.string().nullable(),
            contactNumber: Yup.string()
                .nullable()
                .matches(/^\d{10}$/, "Contact number must be 10 digits"),
            email: Yup.string()
                .nullable()
                .email("Invalid email address"),
        }),
        Mother: Yup.object({
            name: Yup.string().required("Name is required"),
            qualification: Yup.string().nullable(),
            residentialAddress: Yup.string().nullable(),
            occupation: Yup.string().nullable(),
            officialAddress: Yup.string().nullable(),
            annualIncome: Yup.string().nullable(),
            contactNumber: Yup.string()
                .nullable()
                .matches(/^\d{10}$/, "Contact number must be 10 digits"),
            email: Yup.string()
                .nullable()
                .email("Invalid email address"),
        }),
        Guardian: Yup.object({
            name: Yup.string().nullable(),
            qualification: Yup.string().nullable(),
            residentialAddress: Yup.string().nullable(),
            occupation: Yup.string().nullable(),
            officialAddress: Yup.string().nullable(),
            annualIncome: Yup.string().nullable(),
            contactNumber: Yup.string()
                .nullable()
                .matches(/^\d{10}$/, "Contact number must be 10 digits"),
            email: Yup.string()
                .nullable()
                .email("Invalid email address"),
            relation: Yup.string().nullable(),
        }),
    }),
    academicDetails: Yup.object({
        previous: Yup.object({
            rollNo: Yup.string().nullable(),
            class: Yup.string().nullable(),
            section: Yup.string().nullable(),
            stream: Yup.string().nullable(),
            session: Yup.string().nullable(),
            schoolName: Yup.string().nullable(),
            location: Yup.string().nullable(),
            affilatedTo: Yup.string().nullable(),
            dropout: Yup.string().nullable(),
            medium: Yup.string().nullable(),
            TCno: Yup.string().nullable(),
            TCissueDate: Yup.date().nullable(),
            passOutYear: Yup.string()
                .nullable()
                .matches(/^\d{4}$/, "Invalid year format"),
            enrollmentNo: Yup.string().nullable(),
            percentage: Yup.string()
                .nullable()
                .matches(/^\d+(\.\d+)?$/, "Percentage must be a valid number"),
            marks: Yup.string().nullable(),
            subjects: Yup.string().nullable(),
        }),
    }),
    enrollmentDetails: Yup.object({
            ssionType: Yup.string().required("Admission type is required"),
        admissionCategory: Yup.string().required("Admission category is required"),
        admissionDate: Yup.date().required("Admission date is required"),
        enrollmentNO: Yup.string().nullable(),
        enrollmentStatus: Yup.string().required("Enrollment status is required"),
        admissionNO: Yup.string().required("Admission number is required"),
        class: Yup.string().required("Class is required"),
        rollNo: Yup.string().nullable(),
    }),
    scholarDetails: Yup.object({
        scholarID: Yup.string().nullable(),
        scholarshipType: Yup.string().nullable(),
        scholarpassword: Yup.string()
            .nullable()
            .min(8, "Password must be at least 8 characters"),
        amountApprovalDate: Yup.date().nullable(),
        govermentStudentPortalID: Yup.string().nullable(),
        govermentFamilyPortalID: Yup.string().nullable(),
    }),
    bankDetails: Yup.object({
        accountHolderName: Yup.string().nullable(),
        bankName: Yup.string().nullable(),
        branchName: Yup.string().nullable(),
        accountNumber: Yup.string().nullable(),
        ifscCode: Yup.string()
            .nullable()
            .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),
        upiID: Yup.string().nullable(),
        panNo: Yup.string()
            .nullable()
            .matches(/^[A-Z]{5}\d{4}[A-Z]$/, "Invalid PAN number"),
    }),
    documents: Yup.object({
        marksheet: Yup.mixed().nullable(),
        transferCertificate: Yup.mixed().nullable(),
        migrationCertificate: Yup.mixed().nullable(),
        aadharCard: Yup.object({
            front: Yup.mixed().nullable(),
            back: Yup.mixed().nullable(),
        }),
        PANcard: Yup.object({
            front: Yup.mixed().nullable(),
            back: Yup.mixed().nullable(),
        }),
        birthCertificate: Yup.mixed().nullable(),
        scholarship: Yup.mixed().nullable(),
        casteCertificate: Yup.mixed().nullable(),
        bankPassbook: Yup.mixed().nullable(),
        otherCertificate: Yup.array().of(Yup.mixed().nullable()),
    }),
    loginPassword: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
});



const AdmitStudents = () => {
    const showToast = useGlobalToast();
    const [step, setStep] = useState(1);
    const [message, setmessage] = useState('');
    const [StudentDataShow, setStudentDataShow] = useState(10)
    const Navigate = useNavigate();


    const { userId, Institute, Class, StudentData } = getCommonCredentials(); 

    const [addStudent] = useAddStudentMutation();
    const [addAllStudentsToTrash] = useAddAllStudentsToTrashMutation();
    
    const [dataImg, setDataImg] = useState({
        documents: {
            marksheet: null,
            transferCertificate: null,
            migrationCertificate: null,
            aadharCard: { front: null, back: null },
            PANcard: { front: null, back: null },
            birthCertificate: null,
            scholarship: null,
            casteCertificate: null,
            bankPassbook: null,
            otherCertificate: null,
        },
        personalDetails: {
            profilePhoto: null,
        }

    });
    const submitImage = (image, fieldName) => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "uglykgfd");
        data.append("cloud_name", "duzwys877");

        fetch('https://api.cloudinary.com/v1_1/duzwys877/image/upload', {
            method: "POST",
            body: data,
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error("Upload failed:", data.error.message);
                } else {
                    console.log("Upload successful!", data?.url);

                    // Update the `dataImg` state
                    setDataImg(prevState => {
                        const keys = fieldName.split(".");
                        let updatedState = { ...prevState };

                        const rootKey = keys[0];
                        if (!updatedState[rootKey]) {
                            console.error(`Invalid root key: ${rootKey}`);
                            return prevState;
                        }

                        // Traverse the correct branch
                        let nestedObject = updatedState[rootKey];
                        for (let i = 1; i < keys.length - 1; i++) {
                            const key = keys[i];
                            nestedObject[key] = nestedObject[key] || {};
                            nestedObject = nestedObject[key];
                        }

                        // Set the final value
                        nestedObject[keys[keys.length - 1]] = data?.url;

                        return updatedState;
                    });
                }
            })
            .catch(error => {
                console.error("Error uploading file:", error);
            });
    };



    const handleNext = () => setStep((prev) => prev + 1);
    const handlePrevious = () => setStep((prev) => prev - 1);

    const initialValues = {
        instituteId: userId,
        personalDetails: {
            profilePhoto: null,
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            gender: null,
            bloodGroup: null,
            aadharNo: null,
            maritalStatus: false,
            nationality: null,
            religion: null,
            category: null,
            caste: null,
        },
        contactInfo: {
            email: "",
            mobile: "",
            whatsapp: "",
            alternateContact: "",
            address: {
                houseNo: null,
                streetName: null,
                city: null,
                pincode: null,
                state: null,
                country: null,
            },
        },
        parentDetails: {
            Father: {
                name: null,
                qualification: null,
                residentialAddress: null,
                occupation: null,
                officialAddress: null,
                annualIncome: null,
                contactNumber: null,
                email: null,
            },
            Mother: {
                name: null,
                qualification: null,
                residentialAddress: null,
                occupation: null,
                officialAddress: null,
                annualIncome: null,
                contactNumber: null,
                email: null,
            },
            Guardian: {
                name: null,
                qualification: null,
                residentialAddress: null,
                occupation: null,
                officialAddress: null,
                annualIncome: null,
                contactNumber: null,
                email: null,
                relation: null,
            },
        },
        academicDetails: {
            previous: {
                rollNo: null,
                class: null,
                section: null,
                stream: null,
                session: null,
                schoolName: null,
                location: null,
                affilatedTo: null,
                dropout: null,
                medium: null,
                TCno: null,
                TCissueDate: null,
                passOutYear: null,
                enrollmentNo: null,
                percentage: null,
                marks: null,
                subjects: null,
            },
        },
        enrollmentDetails: {
            admissionType: null,
            admissionCategory: null,
            admissionDate: "",
            enrollmentNO: null,
            rollNo: null,
            class: null,
            enrollmentStatus: null,
            admissionNO: null,
        },
        scholarDetails: {
            scholarID: null,
            scholarshipType: null,
            scholarpassword: null,
            amountApprovalDate: null,
            govermentStudentPortalID: null,
            govermentFamilyPortalID: null,
        },
        bankDetails: {
            accountHolderName: null,
            bankName: null,
            branchName: null,
            accountNumber: null,
            ifscCode: null,
            upiID: null,
            panNo: null,
        },
        documents: {
            marksheet: null,
            transferCertificate: null,
            migrationCertificate: null,
            aadharCard: {
                front: null,
                back: null,
            },
            PANcard: {
                front: null,
                back: null,
            },
            birthCertificate: null,
            scholarship: null,
            casteCertificate: null,
            bankPassbook: null,
            otherCertificate: [],
        },
        loginPassword: "",
    };








    const handleSubmit = async (values) => {
        const data = {
            ...values,
            documents: dataImg?.documents,
            personalDetails: {
                ...values.personalDetails,
                profilePhoto: dataImg?.personalDetails?.profilePhoto
            }
        };
        console.log(data);

        try {
            const response = await addStudent(data);
            if (response.data.status === 200 && response.data.status === 201) {
                showToast("Student Added Successfully", "success");
                const modal = document.getElementById("modalCenter1");
                if (modal) {
                    const modalInstance = bootstrap.Modal.getInstance(modal);
                    if (modalInstance) {
                        modalInstance.hide();
                    }
                }

            }
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                showToast(error.response.data.message, "error");
            } else {
                console.error('Error:', error.message);
                showToast(error.message, "error");
            }
        }
    };

    // Delete ALL Data function
    const handleDeleteAll = async () => {
        await addAllStudentsToTrash({ instituteId: userId });
    };

    const handleDeleteone = async (id) => {
        await DeleteApi(`/api/student/add-trash/${id}`, 'Student Deleted successfully');
        // fetchStudentData();
        // fetchTrashData();
    };


    const [editedData, setEditedData] = useState({});
    const handleEdit = (studentId, student) => {
        setEditedData({
            ...editedData,
            [studentId]: {
                ...student,
            },
        });
        Navigate("/editstudents", { state: { studentId, student } });
    };


    return (
        <>
            <div>
                {/* <LMSTable/> */}
                <div className="card m-4">
                    <div className="card-body">
                        <div className="row justify-content-between">
                            <div className="col-1">
                                <select className="form-select" onClick={(e) => setStudentDataShow(e.target.value)}>
                                    <option selected="" value={10}>10</option>
                                    <option value={20} >20</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                    <option value={500}>500</option>
                                    <option value={1000}>1000</option>
                                </select>
                            </div>
                            <div className="col-auto">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteAll}>
                                        <i className='tf-icons bx bx-trash me-1'></i>
                                        Delete All
                                    </button>
                                    <button type="button" className="btn btn-success">
                                        <i className='tf-icons bx bxs-file me-1'></i>
                                        Excel
                                    </button>
                                    <button type="button" className="btn btn-warning">
                                        <i className='tf-icons bx bxs-file-doc me-1'></i>
                                        CSV
                                    </button>
                                    <button type="button" className="btn btn-info" >
                                        <i className='tf-icons bx bxs-printer me-1'></i>
                                        Print
                                    </button>
                                    <Link to={"/studenttrash"} className="btn btn-warning">
                                        <i className='tf-icons bx bxs-trash me-1'></i>
                                        Trash
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card m-4">
                    <div className="d-flex justify-content-between text-center">
                        <h5 className="card-header">Students Information</h5>
                        <p className="btn btn-success m-3" data-bs-toggle="modal" data-bs-target="#modalCenter1">
                            <i className="tf-icons bx bx-pencil me-1" ></i>
                            Add Student
                        </p>
                    </div>
                    <StudentTable
                        StudentData={StudentData}
                        StudentDataShow={StudentDataShow}
                        handleEdit={handleEdit}
                        handleDeleteone={handleDeleteone}
                    />
                </div>
            </div>
            <div className="modal fade " id="modalCenter1" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered manage-xll manage-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalCenterTitle">Admission Form</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"

                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="nav-align-top mb-4">

                                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                                    {({ values, handleChange, handleBlur, errors, touched }) => (
                                        <Form className="border p-4 shadow rounded bg-white">
                                            {step === 1 && (
                                                <div>
                                                    <h4 className="mb-4">Enrollment Details</h4>
                                                    <div className="row">
                                                        <div className="col-md-4 mb-3">
                                                            <label>Admission Type  <span className='text-danger'>*</span></label>
                                                            <Field name="enrollmentDetails.admissionType" as="select" className="form-select">
                                                                <option value="">Select</option>
                                                                <option value="General">General</option>
                                                                <option value="Sports">Sports</option>
                                                                <option value="Management">Management</option>
                                                                <option value="Sports">Regular</option>
                                                                <option value="Management">Non Regular</option>
                                                            </Field>
                                                            {touched?.enrollmentDetails?.admissionType && errors?.enrollmentDetails?.admissionType && <div className="text-danger">{errors?.enrollmentDetails?.admissionType}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Admission Category  <span className='text-danger'>*</span></label>
                                                            <Field name="enrollmentDetails.admissionCategory" as="select" className="form-select">
                                                                <option value="">Select</option>
                                                                <option value="Regular Admission">Regular Admission</option>
                                                                <option value="Rolling Admission">Rolling Admission</option>
                                                                <option value="Open Admission">Open Admission</option>
                                                            </Field>
                                                            {touched?.enrollmentDetails?.admissionCategory && errors?.enrollmentDetails?.admissionCategory && <div className="text-danger">{errors?.enrollmentDetails?.admissionCategory}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Admission Date <span className='text-danger'>*</span></label>
                                                            <Field name="enrollmentDetails.admissionDate" type="date" placeholder="Enter admission date" className="form-control" />
                                                            {touched?.enrollmentDetails?.admissionDate && errors?.enrollmentDetails?.admissionDate && <div className="text-danger">{errors?.enrollmentDetails?.admissionDate}</div>}
                                                        </div>
                                                        {/* <div className="col-md-4 mb-3">
                                                            <label>Institute type<span className='text-danger'>*</span></label>
                                                            <Field as="select" name="enrollmentDetails.instituteType" className="form-control">
                                                                <option value="" label="Select institute type" />
                                                                <option value="Institute" label="Institute" />
                                                                <option value="College" label="College" />
                                                                <option value="School" label="School" />
                                                            </Field>
                                                            {touched?.enrollmentDetails?.instituteType && errors?.enrollmentDetails?.instituteType && <div className="text-danger">{errors?.enrollmentDetails?.instituteType}</div>}
                                                        </div> */}
                                                        {Institute?.instituteType === "College" || Institute?.instituteType === "University" ? (

                                                            <>
                                                                <div className="col-md-4 mb-3">
                                                                    <label>Enrollment No.</label>
                                                                    <Field name="enrollmentDetails.enrollmentNO" type="text" placeholder="Enter enrollment no." className="form-control" />
                                                                    {touched?.enrollmentDetails?.enrollmentNO && errors?.enrollmentDetails?.enrollmentNO && <div className="text-danger">{errors?.enrollmentDetails?.enrollmentNO}</div>}
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="col-md-4 mb-3">
                                                                    <label>Roll No.</label>
                                                                    <Field name="enrollmentDetails.rollNo" type="text" placeholder="Enter roll no." className="form-control" />
                                                                    {touched?.enrollmentDetails?.rollNo && errors?.enrollmentDetails?.rollNo && <div className="text-danger">{errors?.enrollmentDetails?.rollNo}</div>}
                                                                </div>
                                                            </>

                                                        )}
                                                        <div className="col-md-4 mb-3">
                                                            <label>Class<span className='text-danger'>*</span></label>
                                                            <Field name="enrollmentDetails.class" as="select" className="form-select">
                                                                <option value="">Select Class</option>
                                                                {Class?.map((cls, index) => <option key={index} value={cls._id}>{cls.className}</option>)}
                                                            </Field>
                                                            {touched?.enrollmentDetails?.class && errors?.enrollmentDetails?.class && <div className="text-danger">{errors?.enrollmentDetails?.class}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Enrollment Status <span className='text-danger'>*</span></label>
                                                            <Field name="enrollmentDetails.enrollmentStatus" as="select" className="form-select">
                                                                <option value="">Select Status</option>
                                                                <option value="Active">Active</option>
                                                                <option value="Deactive">Deactive</option>
                                                            </Field>
                                                            {touched?.enrollmentDetails?.enrollmentStatus && errors?.enrollmentDetails?.enrollmentStatus && <div className="text-danger">{errors?.enrollmentDetails?.enrollmentStatus}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Admission No. <span className='text-danger'>*</span></label>
                                                            <Field name="enrollmentDetails.admissionNO" type="text" placeholder="Enter admission no." className="form-control" />
                                                            {touched?.enrollmentDetails?.admissionNO && errors?.enrollmentDetails?.admissionNO && <div className="text-danger">{errors?.enrollmentDetails?.admissionNO}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {step === 2 && (
                                                <div>
                                                    <h4 className="mb-4">Personal Details</h4>
                                                    <div className="row">

                                                        <div className="col-md-4 mb-3">
                                                            <label>Profile Photo</label>
                                                            <Field name="personalDetails.profilePhoto" type="file" accept=".jpg,.jpeg,.png" placeholder="Enter profile photo URL" className="form-control" onChange={(e) => submitImage(e.target.files[0], "personalDetails.profilePhoto")} />
                                                            {errors?.personalDetails?.profilePhoto && touched?.personalDetails?.profilePhoto && <div className="text-danger">{errors?.personalDetails?.profilePhoto}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>First Name <span className='text-danger'>*</span></label>
                                                            <Field name="personalDetails.firstName" type="text" placeholder="Enter first name" className="form-control" />
                                                            {errors?.personalDetails?.firstName && touched?.personalDetails?.firstName && <div className="text-danger">{errors?.personalDetails?.firstName}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Last Name <span className='text-danger'>*</span></label>
                                                            <Field name="personalDetails.lastName" type="text" placeholder="Enter last name" className="form-control" />
                                                            {errors?.personalDetails?.lastName && touched?.personalDetails?.lastName && <div className="text-danger">{errors?.personalDetails?.lastName}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Date of Birth <span className='text-danger'>*</span></label>
                                                            <Field name="personalDetails.dateOfBirth" placeholder="Enter date of birth" type="date" className="form-control" />
                                                            {errors?.personalDetails?.dateOfBirth && touched?.personalDetails?.dateOfBirth && <div className="text-danger">{errors?.personalDetails?.dateOfBirth}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Gender <span className='text-danger'>*</span></label>
                                                            <Field as="select" name="personalDetails.gender" placeholder="Select gender" className="form-select">
                                                                <option>Select Gender</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                                <option value="Other">Other</option>
                                                            </Field>
                                                            {errors?.personalDetails?.gender && touched?.personalDetails?.gender && <div className="text-danger">{errors?.personalDetails?.gender}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Mother's Name <span className='text-danger'>*</span></label>
                                                            <div className="d-grid">
                                                                <Field type="text" className='form-control' name="parentDetails.Mother.name" />
                                                                {errors?.parentDetails?.Mother?.name && <div className="text-danger">{errors?.parentDetails?.Mother?.name}</div>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Father's Name <span className='text-danger'>*</span></label>
                                                            <div className="d-grid">
                                                                <Field type="text" className='form-control' name="parentDetails.Father.name" />
                                                                {errors?.parentDetails?.Father?.name && <div className="text-danger">{errors?.parentDetails?.Father?.name}</div>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Guardian's Name (Optional)</label>
                                                            <div className="d-grid">
                                                                <Field type="text" className='form-control' name="parentDetails.Guardian.name" />
                                                                {errors?.parentDetails?.Guardian?.name && <div className="text-danger">{errors.parentDetails?.Guardian?.name}</div>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Blood Group</label>
                                                            <Field name="personalDetails.bloodGroup" placeholder='Enter blood group' type="text" className="form-control" />
                                                            {errors?.personalDetails?.bloodGroup && touched?.personalDetails?.bloodGroup && <div className="text-danger">{errors?.personalDetails?.bloodGroup}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Aadhar No <span className='text-danger'>*</span></label>
                                                            <Field name="personalDetails.aadharNo" placeholder='Enter aadhar no' type="text" className="form-control" />
                                                            {errors?.personalDetails?.aadharNo && touched?.personalDetails?.aadharNo && <div className="text-danger">{errors?.personalDetails?.aadharNo}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Aadhar Card Front <span className='text-danger'>*</span></label>
                                                            <Field name="documents.aadharCard.front" type="file" accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter aadhar card front" className="form-control" onChange={(e) => submitImage(e.target.files[0], "documents.aadharCard.front")} />
                                                            {errors.documents?.aadharCard?.front && touched.documents?.aadharCard?.front && <div className="text-danger">{errors.documents?.aadharCard?.front}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Aadhar Card Back <span className='text-danger'>*</span></label>
                                                            <Field name="documents.aadharCard.back" type="file" accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter aadhar card back" className="form-control" onChange={(e) => submitImage(e.target.files[0], "documents.aadharCard.back")} />
                                                            {errors.documents?.aadharCard?.back && touched.documents?.aadharCard?.back && <div className="text-danger">{errors.documents?.aadharCard?.back}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Marital Status</label>
                                                            <Field name="personalDetails.maritalStatus" as="select" className="form-select">
                                                                <option value="">Select Marital Status</option>
                                                                <option value="true">Yes</option>
                                                                <option value="false">No</option>
                                                            </Field>
                                                            {errors?.personalDetails?.maritalStatus && touched?.personalDetails?.maritalStatus && <div className="text-danger">{errors?.personalDetails?.maritalStatus}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Nationality <span className='text-danger'>*</span></label>
                                                            <Field name="personalDetails.nationality" as="select" className="form-select">
                                                                <option value="">Select Nationality</option>
                                                                <option value="Indian">Indian</option>
                                                                <option value="NRI">NRI</option>
                                                                <option value="Foreigner">Foreigner</option>
                                                            </Field>
                                                            {errors?.personalDetails?.nationality && touched?.personalDetails?.nationality && <div className="text-danger">{errors?.personalDetails?.nationality}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Religion <span className='text-danger'>*</span></label>
                                                            <Field as="select" name="personalDetails.religion" className="form-select">
                                                                <option value="">Select Religion</option>
                                                                <option value="Hindu">Hindu</option>
                                                                <option value="Muslim">Muslim</option>
                                                                <option value="Christian">Christian</option>
                                                                <option value="Sikh">Sikh</option>
                                                                <option value="Buddhist">Buddhist</option>
                                                                <option value="Jain">Jain</option>
                                                                <option value="Other">Other</option>
                                                            </Field>
                                                            {errors?.personalDetails?.religion && touched?.personalDetails?.religion && <div className="text-danger">{errors?.personalDetails?.religion}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Category <span className='text-danger'>*</span></label>
                                                            <Field as="select" name="personalDetails.category" className="form-select">
                                                                <option value="">Select Category</option>
                                                                <option value="General">General</option>
                                                                <option value="SC">SC</option>
                                                                <option value="ST">ST</option>
                                                                <option value="OBC">OBC</option>
                                                                <option value="EWS">EWS</option>
                                                                <option value="Other">Other</option>
                                                            </Field>
                                                            {errors?.personalDetails?.category && touched?.personalDetails?.category && <div className="text-danger">{errors?.personalDetails?.category}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Caste</label>
                                                            <Field name="personalDetails.caste" placeholder='Enter caste' type="text" className="form-control" />
                                                            {errors?.personalDetails?.caste && touched?.personalDetails?.caste && <div className="text-danger">{errors?.personalDetails?.caste}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Login Password <span className='text-danger'>*</span></label>
                                                            <Field name="loginPassword" type="text" placeholder="Enter login password" className="form-control" />
                                                            {errors.loginPassword && touched.loginPassword && <div className="text-danger">{errors.loginPassword}</div>}
                                                        </div>
                                                    </div>
                                                </div>)}
                                            {step === 3 && (
                                                <div>
                                                    <h4 className="mb-4">Contact Information </h4>
                                                    <div className="row">
                                                        <div className="col-md-4 mb-3">
                                                            <label>Email <span className='text-danger'>*</span></label>
                                                            <Field name="contactInfo.email" type="email" placeholder="Enter your email" className="form-control" />
                                                            {errors?.contactInfo?.email && touched?.contactInfo?.email && <div className="text-danger">{errors?.contactInfo?.email}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Mobile <span className='text-danger'>*</span></label>
                                                            <Field name="contactInfo.mobile" type="number" placeholder="Enter your mobile number " className="form-control" />
                                                            {errors?.contactInfo?.mobile && touched?.contactInfo?.mobile && <div className="text-danger">{errors?.contactInfo?.mobile}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Parent's Mobile <span className='text-danger'>*</span></label>
                                                            <Field type="number" className="form-control" placeholder="Enter your Parent mobile number " value={values.parentDetails.Father.contactNumber} name="parentDetails.Father.contactNumber" />
                                                            {errors?.parentDetails?.Father?.contactNumber && touched?.parentDetails?.Father?.contactNumber && <div className="text-danger">{errors?.parentDetails?.Father?.contactNumber}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Whatsapp Contact</label>
                                                            <Field name="contactInfo.whatsapp" type="number" placeholder="Enter whatsapp contact no." className="form-control" />
                                                            {errors?.contactInfo?.whatsapp && touched?.contactInfo?.whatsapp && <div className="text-danger">{errors?.contactInfo?.whatsapp}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Alternate Contact</label>
                                                            <Field name="contactInfo.alternateContact" type="number" placeholder="Enter alternateContact no." className="form-control" />
                                                            {errors?.contactInfo?.alternateContact && touched?.contactInfo?.alternateContact && <div className="text-danger">{errors?.contactInfo?.alternateContact}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>House No <span className='text-danger'>*</span></label>
                                                            <Field name="contactInfo.address.houseNo" type="text" placeholder="Enter your house no." className="form-control" />
                                                            {errors?.contactInfo?.address?.houseNo && touched?.contactInfo?.address?.houseNo && <div className="text-danger">{errors?.contactInfo?.address?.houseNo}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Street Name <span className='text-danger'>*</span></label>
                                                            <Field name="contactInfo.address.streetName" type="text" placeholder="Enter your street name" className="form-control" />
                                                            {errors?.contactInfo?.address?.streetName && touched?.contactInfo?.address?.streetName && <div className="text-danger">{errors?.contactInfo?.address?.streetName}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>City <span className='text-danger'>*</span></label>
                                                            <Field name="contactInfo.address.city" type="text" placeholder="Enter your city" className="form-control" />
                                                            {errors?.contactInfo?.address?.city && touched?.contactInfo?.address?.city && <div className="text-danger">{errors?.contactInfo?.address?.city}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Pincode <span className='text-danger'>*</span></label>
                                                            <Field name="contactInfo.address.pincode" type="number" placeholder="Enter your pincode" className="form-control" />
                                                            {errors?.contactInfo?.address?.pincode && touched?.contactInfo?.address?.pincode && <div className="text-danger">{errors?.contactInfo?.address?.pincode}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>State <span className='text-danger'>*</span></label>
                                                            <Field name="contactInfo.address.state" type="text" placeholder="Enter your state" className="form-control" />
                                                            {errors?.contactInfo?.address?.state && touched?.contactInfo?.address?.state && <div className="text-danger">{errors?.contactInfo?.address?.state}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Country <span className='text-danger'>*</span></label>
                                                            <Field name="contactInfo.address.country" type="text" placeholder="Enter your country" className="form-control" />
                                                            {errors?.contactInfo?.address?.country && touched?.contactInfo?.address?.country && <div className="text-danger">{errors?.contactInfo?.address?.country}</div>}
                                                        </div>
                                                    </div>
                                                </div>)}

                                            {step === 4 && (
                                                <div>
                                                    <h4 className="mb-4">Parents Detail (Optional)</h4>
                                                    <div className="table-responsive">
                                                        <table className="table table-bordered table-33 no-white-space">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ maxWidth: "100px", width: "100px" }}>Details</th>
                                                                    <th style={{ maxWidth: "150px", width: "150px" }}>Mother</th>
                                                                    <th style={{ maxWidth: "150px", width: "150px" }}>Father</th>
                                                                    <th style={{ maxWidth: "150px", width: "150px" }}>Guardian</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th>Qualification</th>
                                                                    <td>
                                                                        <div className="d-grid">
                                                                            <select className="form-select select2" name="parentDetails.Mother.qualification" value={values.parentDetails.Mother.qualification}
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}>
                                                                                <option>Select</option>
                                                                                {/* Add options here */}
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-grid">
                                                                            <select className="form-select select2" name="parentDetails.Father.qualification" value={values.parentDetails.Father.qualification}
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}>
                                                                                <option>Select</option>
                                                                                {/* Add options here */}
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-grid">
                                                                            <select className="form-select select2" name="parentDetails.Guardian.qualification" value={values.parentDetails.Guardian.qualification}
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}>
                                                                                <option>Select</option>
                                                                                {/* Add options here */}
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Residential Address</th>
                                                                    <td>
                                                                        <div className="d-grid">
                                                                            <Field type="text" className='form-control' name="parentDetails.Mother.residentialAddress" />
                                                                            {errors.parentDetails?.Mother?.residentialAddress && touched.parentDetails?.Mother?.residentialAddress && <div className="text-danger">{errors.parentDetails?.Mother?.residentialAddress}</div>}
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-grid">
                                                                            <Field type="text" className='form-control' name="parentDetails.Father.residentialAddress" />
                                                                            {errors.parentDetails?.Father?.residentialAddress && touched.parentDetails?.Father?.residentialAddress && <div className="text-danger">{errors.parentDetails?.Father?.residentialAddress}</div>}
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-grid">
                                                                            <Field type="text" className='form-control' name="parentDetails.Guardian.residentialAddress" />
                                                                            {errors?.parentDetails?.Guardian?.residentialAddress && touched?.parentDetails?.Guardian?.residentialAddress && <div className="text-danger">{errors.parentDetails?.Guardian.residentialAddress}</div>}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Occupation</th>
                                                                    <td>
                                                                        <div className="d-grid">
                                                                            <Field type="text" className='form-control' name="parentDetails.Mother.occupation" />
                                                                            {errors?.parentDetails?.Mother?.occupation && touched.parentDetails?.Mother?.occupation && <div className="text-danger">{errors?.parentDetails?.Mother?.occupation}</div>}
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-grid">
                                                                            <Field type="text" className='form-control' name="parentDetails.Father.occupation" />
                                                                            {errors?.parentDetails?.Father?.occupation && touched?.parentDetails?.Father?.occupation && <div className="text-danger">{errors?.parentDetails?.Father?.occupation}</div>}
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-grid">
                                                                            <Field type="text" className='form-control' name="parentDetails.Guardian.occupation" />
                                                                            {errors?.parentDetails?.Guardian?.occupation && touched.parentDetails?.Guardian?.occupation && <div className="text-danger">{errors.parentDetails?.Guardian?.occupation}</div>}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Official Address</th>
                                                                    <td>
                                                                        <div className="d-grid">
                                                                            <Field type="text" className='form-control' name="parentDetails.Mother.officialAddress" />
                                                                            {errors?.parentDetails?.Mother?.officialAddress && touched?.parentDetails?.Mother?.officialAddress && <div className="text-danger">{errors?.parentDetails?.Mother?.officialAddress}</div>}
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-grid">
                                                                            <Field type="text" className='form-control' name="parentDetails.Father.officialAddress" />
                                                                            {errors?.parentDetails?.Father?.officialAddress && touched?.parentDetails?.Father?.officialAddress && <div className="text-danger">{errors?.parentDetails?.Father?.officialAddress}</div>}
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-grid">
                                                                            <Field type="text" className='form-control' name="parentDetails.Guardian.officialAddress" />
                                                                            {errors?.parentDetails?.Guardian?.officialAddress && touched?.parentDetails?.Guardian?.officialAddress && <div className="text-danger">{errors?.parentDetails?.Guardian?.officialAddress}</div>}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Annual Income</th>
                                                                    <td>
                                                                        <div className="d-grid">
                                                                            <Field type="text" className='form-control' name="parentDetails.Mother.annualIncome" />
                                                                            {errors?.parentDetails?.Mother?.annualIncome && touched?.parentDetails?.Mother?.annualIncome && <div className="text-danger">{errors?.parentDetails?.Mother?.annualIncome}</div>}
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-grid">
                                                                            <Field type="text" className='form-control' name="parentDetails.Father.annualIncome" />
                                                                            {errors?.parentDetails?.Father?.annualIncome && touched?.parentDetails?.Father?.annualIncome && <div className="text-danger">{errors.parentDetails?.Father?.annualIncome}</div>}
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-grid">
                                                                            <Field type="text" className='form-control' name="parentDetails.Guardian.annualIncome" />
                                                                            {errors.parentDetails?.Guardian?.annualIncome && touched?.parentDetails?.Guardian?.annualIncome && <div className="text-danger">{errors.parentDetails?.Guardian?.annualIncome}</div>}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Email Address</th>
                                                                    <td>
                                                                        <div className="d-grid">
                                                                            <Field type="email" className="form-control" name="parentDetails.Mother.email" />
                                                                            {errors?.parentDetails?.Mother?.email && touched?.parentDetails?.Mother?.email && <div className="text-danger">{errors?.parentDetails?.Mother?.email}</div>}
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-grid">
                                                                            <Field type="email" className="form-control" name="parentDetails.Father.email" />
                                                                            {errors?.parentDetails?.Father?.email && touched?.parentDetails?.Father?.email && <div className="text-danger">{errors?.parentDetails?.Father?.email}</div>}
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-grid">
                                                                            <Field type="email" className="form-control" name="parentDetails.Guardian.email" />
                                                                            {errors?.parentDetails?.Guardian?.email && touched?.parentDetails?.Guardian?.email && <div className="text-danger">{errors?.parentDetails?.Guardian?.email}</div>}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Contact No.</th>
                                                                    <td>
                                                                        <div className="d-grid">
                                                                            <Field type="number" className="form-control" name="parentDetails.Mother.contactNumber" />
                                                                            {errors?.parentDetails?.Mother?.contactNumber && touched?.parentDetails?.Mother?.contactNumber && <div className="text-danger">{errors?.parentDetails?.Mother?.contactNumber}</div>}
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-grid">
                                                                            <Field type="number" className="form-control" value={values.parentDetails.Father.contactNumber} name="parentDetails.Father.contactNumber" />
                                                                            {errors?.parentDetails?.Father?.contactNumber && touched?.parentDetails?.Father?.contactNumber && <div className="text-danger">{errors?.parentDetails?.Father?.contactNumber}</div>}
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-grid">
                                                                            <Field type="number" className="form-control" name="parentDetails.Guardian.contactNumber" />
                                                                            {errors?.parentDetails?.Guardian?.contactNumber && touched?.parentDetails?.Guardian?.contactNumber && <div className="text-danger">{errors?.parentDetails?.Guardian?.contactNumber}</div>}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            )}
                                            {step === 5 && (
                                                <div>
                                                    <h4 className="mb-4">Academic Details (Optional)</h4>
                                                    <div className="row">
                                                        {values.enrollmentDetails.instituteType === "College" ? (
                                                            <>
                                                                <div className="col-md-4 mb-3">
                                                                    <label>Previous Enrollment No</label>
                                                                    <Field name="academicDetails.previous.enrollmentNo" type="text" placeholder="Enter enrollment no" className="form-control" />
                                                                    {errors.academicDetails?.previous?.enrollmentNo && touched.academicDetails?.previous?.enrollmentNo && <div className="text-danger">{errors.academicDetails?.previous?.enrollmentNo}</div>}
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="col-md-4 mb-3">
                                                                    <label>Previous Roll No</label>
                                                                    <Field name="academicDetails.previous.rollNo" type="text" placeholder="Enter roll no" className="form-control" />
                                                                    {errors.academicDetails?.previous?.rollNo && touched.academicDetails?.previous?.rollNo && <div className="text-danger">{errors.academicDetails.previous.rollNo}</div>}
                                                                </div>
                                                                <div className="col-md-4 mb-3">
                                                                    <label>Previous Section</label>
                                                                    <Field name="academicDetails.section" type="text" placeholder="Enter section" className="form-control" />
                                                                    {errors.academicDetails?.previous?.section && touched.academicDetails?.previous?.section && <div className="text-danger">{errors.academicDetails?.previous?.section}</div>}
                                                                </div>
                                                                <div className="col-md-4 mb-3">
                                                                    <label>Previous Class</label>
                                                                    <Field name="academicDetails.previous.class" type="text" placeholder="Enter class" className="form-control" />
                                                                    {errors.academicDetails?.previous?.class && touched.academicDetails?.previous?.class && <div className="text-danger">{errors.academicDetails?.previous?.class}</div>}
                                                                </div>
                                                                <div className="col-md-4 mb-3">
                                                                    <label>TC No</label>
                                                                    <Field name="academicDetails.previous.TCno" type="text" placeholder="Enter TC no" className="form-control" />
                                                                    {errors.academicDetails?.previous?.TCno && touched.academicDetails?.previous?.TCno && <div className="text-danger">{errors.academicDetails.previous.TCno}</div>}
                                                                </div>
                                                                <div className="col-md-4 mb-3">
                                                                    <label>TC Issue Date</label>
                                                                    <Field name="academicDetails.previous.TCissueDate" type="date" className="form-control" />
                                                                    {errors.academicDetails?.previous?.TCissueDate && touched.academicDetails?.previous?.TCissueDate && <div className="text-danger">{errors.academicDetails.previous.TCissueDate}</div>}
                                                                </div>
                                                            </>

                                                        )}
                                                        <div className="col-md-4 mb-3">
                                                            <label>Previous Stream</label>
                                                            <Field name="academicDetails.previous.stream" type="text" placeholder="Enter stream" className="form-control" />
                                                            {errors.academicDetails?.previous?.stream && touched.academicDetails?.previous?.stream && <div className="text-danger">{errors.academicDetails?.previous?.stream}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Previous Session</label>
                                                            <Field name="academicDetails.previous.session" type="text" placeholder="Enter session" className="form-control" />
                                                            {errors.academicDetails?.previous?.session && touched.academicDetails?.previous?.session && <div className="text-danger">{errors.academicDetails.previous.session}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Previous School/College Name</label>
                                                            <Field name="academicDetails.previous.schoolName" type="text" placeholder="Enter school name" className="form-control" />
                                                            {errors.academicDetails?.previous?.schoolName && touched.academicDetails?.previous?.schoolName && <div className="text-danger">{errors.academicDetails.previous.schoolName}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Previous college/school Location</label>
                                                            <Field name="academicDetails.previous.location" type="text" placeholder="Enter location" className="form-control" />
                                                            {errors.academicDetails?.previous?.location && touched.academicDetails?.previous?.location && <div className="text-danger">{errors.academicDetails.previous.location}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Affiliated To</label>
                                                            <Field name="academicDetails.affilatedTo" type="text" placeholder="Enter affiliated to" className="form-control" />
                                                            {errors.academicDetails?.previous?.affilatedTo && touched.academicDetails?.previous?.affilatedTo && <div className="text-danger">{errors.academicDetails.previous.affilatedTo}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Dropout</label>
                                                            <Field as="select" name="academicDetails.previous.dropout" className="form-select">
                                                                <option value="" disabled>Select dropout status</option>
                                                                <option value="Yes">Yes</option>
                                                                <option value="No">No</option>
                                                            </Field>
                                                            {errors.academicDetails?.previous?.dropout && touched.academicDetails?.previous?.dropout && <div className="text-danger">{errors.academicDetails.previous.dropout}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Previous Medium</label>
                                                            <Field as="select" name="academicDetails.previous.medium" className="form-select">
                                                                <option value="" disabled>Select medium</option>
                                                                <option value="English">English</option>
                                                                <option value="Hindi">Hindi</option>
                                                                <option value="Punjabi">Punjabi</option>
                                                            </Field>
                                                            {errors.academicDetails?.previous?.medium && touched.academicDetails?.previous?.medium && <div className="text-danger">{errors.academicDetails.previous.medium}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Pass Out Year</label>
                                                            <Field name="academicDetails.previous.passOutYear" type="text" placeholder="Enter pass out year" className="form-control" />
                                                            {errors.academicDetails?.previous?.passOutYear && touched.academicDetails?.previous?.passOutYear && <div className="text-danger">{errors.academicDetails.previous.passOutYear}</div>}
                                                        </div>

                                                        <div className="col-md-4 mb-3">
                                                            <label>Previous Percentage</label>
                                                            <Field name="academicDetails.previous.percentage" type="text" placeholder="Enter percentage" className="form-control" />
                                                            {errors.academicDetails?.previous?.percentage && touched.academicDetails?.previous?.percentage && <div className="text-danger">{errors.academicDetails.previous.percentage}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Marks</label>
                                                            <Field name="academicDetails.previous.marks" type="text" placeholder="Enter marks" className="form-control" />
                                                            {errors.academicDetails?.previous?.marks && touched.academicDetails?.previous?.marks && <div className="text-danger">{errors.academicDetails.previous.marks}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Previous Subjects</label>
                                                            <Field name="academicDetails.subjects" type="text" placeholder="Enter subjects" className="form-control" />
                                                            {errors.academicDetails?.previous?.subjects && touched.academicDetails?.previous?.subjects && <div className="text-danger">{errors.academicDetails.previous.subjects}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {step === 6 && (
                                                <div>
                                                    <h4 className="mb-4">Scholar Details (Optional)</h4>
                                                    <div className="row">
                                                        <div className="col-md-4 mb-3">
                                                            <label>Scholar ID</label>
                                                            <Field name="scholarDetails.scholarID" type="text" placeholder="Enter Scholar ID" className="form-control" />
                                                            {errors.scholarDetails?.scholarID && touched.scholarDetails?.scholarID && <div className="text-danger">{errors.scholarDetails?.scholarID}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Scholarship Type</label>
                                                            <Field name="scholarDetails.scholarshipType" as="select" className="form-select">
                                                                <option value="">Select Scholarship Type</option>
                                                                <option value="Merit">Merit</option>
                                                                <option value="SC/ST">SC/ST</option>
                                                                <option value="OBC">OBC</option>
                                                                <option value="EWS">EWS</option>
                                                                <option value="Other">Other</option>
                                                            </Field>
                                                            {errors.scholarDetails?.scholarshipType && touched.scholarDetails?.scholarshipType && <div className="text-danger">{errors.scholarDetails?.scholarshipType}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Scholar Password</label>
                                                            <Field name="scholarDetails.scholarpassword" type="password" placeholder="Enter Scholar Password" className="form-control" />
                                                            {errors.scholarDetails?.scholarpassword && touched.scholarDetails?.scholarpassword && <div className="text-danger">{errors.scholarDetails?.scholarpassword}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Amount Approval Date</label>
                                                            <Field name="scholarDetails.amountApprovalDate" type="date" className="form-control" />
                                                            {errors.scholarDetails?.amountApprovalDate && touched.scholarDetails?.amountApprovalDate && <div className="text-danger">{errors.scholarDetails?.amountApprovalDate}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Goverment Student Portal ID</label>
                                                            <Field name="scholarDetails.govermentStudentPortalID" type="text" placeholder="Enter Goverment Student Portal ID" className="form-control" />
                                                            {errors.scholarDetails?.govermentStudentPortalID && touched.scholarDetails?.govermentStudentPortalID && <div className="text-danger">{errors.scholarDetails?.govermentStudentPortalID}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Goverment Family Portal ID</label>
                                                            <Field name="scholarDetails.govermentFamilyPortalID" type="text" placeholder="Enter Goverment Family Portal ID" className="form-control" />
                                                            {errors.scholarDetails?.govermentFamilyPortalID && touched.scholarDetails?.govermentFamilyPortalID && <div className="text-danger">{errors.scholarDetails?.govermentFamilyPortalID}</div>}
                                                        </div>
                                                    </div>
                                                    <h4 className="mb-4">Bank Details (Optional)</h4>
                                                    <div className="row">
                                                        <div className="col-md-4 mb-3">
                                                            <label>Account Holder Name</label>
                                                            <Field name="bankDetails.accountHolderName" type="text" placeholder="Enter account holder name" className="form-control" />
                                                            {errors.bankDetails?.accountHolderName && touched.bankDetails?.accountHolderName && <div className="text-danger">{errors.bankDetails?.accountHolderName}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Bank Name</label>
                                                            <Field name="bankDetails.bankName" type="text" placeholder="Enter bank name" className="form-control" />
                                                            {errors.bankDetails?.bankName && touched.bankDetails?.bankName && <div className="text-danger">{errors.bankDetails?.bankName}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Branch Name</label>
                                                            <Field name="bankDetails.branchName" type="text" placeholder="Enter branch name" className="form-control" />
                                                            {errors.bankDetails?.branchName && touched.bankDetails?.branchName && <div className="text-danger">{errors.bankDetails?.branchName}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Account Number</label>
                                                            <Field name="bankDetails.accountNumber" type="text" placeholder="Enter account number" className="form-control" />
                                                            {errors.bankDetails?.accountNumber && touched.bankDetails?.accountNumber && <div className="text-danger">{errors.bankDetails?.accountNumber}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>IFSC Code</label>
                                                            <Field name="bankDetails.ifscCode" type="text" placeholder="Enter ifsc code" className="form-control" />
                                                            {errors.bankDetails?.ifscCode && touched.bankDetails?.ifscCode && <div className="text-danger">{errors.bankDetails?.ifscCode}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>UPI ID</label>
                                                            <Field name="bankDetails.upiID" type="text" placeholder="Enter upi id" className="form-control" />
                                                            {errors.bankDetails?.upiID && touched.bankDetails?.upiID && <div className="text-danger">{errors.bankDetails?.upiID}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>PAN No</label>
                                                            <Field name="bankDetails.panNo" type="text" placeholder="Enter pan no" className="form-control" />
                                                            {errors.bankDetails?.panNo && touched.bankDetails?.panNo && <div className="text-danger">{errors.bankDetails?.panNo}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {step === 7 && (
                                                <div>
                                                    <h4 className="mb-4">Documents (Optional)</h4>
                                                    <div className="row">
                                                        <div className="col-md-4 mb-3">
                                                            <label>Marksheet</label>
                                                            <Field name="documents.marksheet" type="file" accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter marksheet" className="form-control" onChange={(e) => submitImage(e.target.files[0], "documents.marksheet")} />
                                                            {errors.documents?.marksheet && touched.documents?.marksheet && <div className="text-danger">{errors.documents?.marksheet}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Transfer Certificate</label>
                                                            <Field name="documents.transferCertificate" type="file" accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter transferCertificate" className="form-control" onChange={(e) => submitImage(e.target.files[0], "documents.transferCertificate")} />
                                                            {errors.documents?.transferCertificate && touched.documents?.transferCertificate && <div className="text-danger">{errors.documents?.transferCertificate}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Migration Certificate</label>
                                                            <Field name="documents.migrationCertificate" type="file" accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter migration certificate" className="form-control" onChange={(e) => submitImage(e.target.files[0], "documents.migrationCertificate")} />
                                                            {errors.documents?.migrationCertificate && touched.documents?.migrationCertificate && <div className="text-danger">{errors.documents?.migrationCertificate}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>PAN Card Front</label>
                                                            <Field name="documents.PANcard.front" type="file" accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter pan card front" className="form-control" onChange={(e) => submitImage(e.target.files[0], "documents.PANcard.front")} />
                                                            {errors.documents?.PANcard?.front && touched.documents?.PANcard?.front && <div className="text-danger">{errors.documents?.PANcard?.front}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>PAN Card Back</label>
                                                            <Field name="documents.PANcard.back" type="file" accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter pan card back" className="form-control" onChange={(e) => submitImage(e.target.files[0], "documents.PANcard.back")} />
                                                            {errors.documents?.PANcard?.back && touched.documents?.PANcard?.back && <div className="text-danger">{errors.documents?.PANcard?.back}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Birth Certificate</label>
                                                            <Field name="documents.birthCertificate" type="file" accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter birth certificate" className="form-control" onChange={(e) => submitImage(e.target.files[0], "documents.birthCertificate")} />
                                                            {errors.documents?.birthCertificate && touched.documents?.birthCertificate && <div className="text-danger">{errors.documents?.birthCertificate}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Scholarship</label>
                                                            <Field name="documents.scholarship" type="file" accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter scholarship" className="form-control" onChange={(e) => submitImage(e.target.files[0], "scholarship")} />
                                                            {errors.documents?.scholarship && touched.documents?.scholarship && <div className="text-danger">{errors.documents?.scholarship}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Caste Certificate</label>
                                                            <Field name="documents.casteCertificate" type="file" accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter caste certificate" className="form-control" onChange={(e) => submitImage(e.target.files[0], "documents.casteCertificate")} />
                                                            {errors.documents?.casteCertificate && touched.documents?.casteCertificate && <div className="text-danger">{errors.documents?.casteCertificate}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Bank Passbook</label>
                                                            <Field name="documents.bankPassbook" type="file" accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter bank passbook" className="form-control" onChange={(e) => submitImage(e.target.files[0], "documents.bankPassbook")} />
                                                            {errors.documents?.bankPassbook && touched.documents?.bankPassbook && <div className="text-danger">{errors.documents?.bankPassbook}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Other Certificate</label>
                                                            <Field name="documents.otherCertificate" type="file" accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter other certificate" className="form-control" onChange={(e) => submitImage(e.target.files[0], "documents.otherCertificate")} />
                                                            {errors.documents?.otherCertificate && touched.documents?.otherCertificate && <div className="text-danger">{errors.documents?.otherCertificate}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="d-flex justify-content-between mt-4">
                                                {step > 1 && (
                                                    <button type="button" className="btn btn-outline-secondary" onClick={handlePrevious}>
                                                        Previous
                                                    </button>
                                                )}


                                                {step <= 6 && (
                                                    <>
                                                        <div>
                                                            {step >= 4 && step <= 6 && (
                                                                <button
                                                                    className="btn btn-success me-2"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        setStep(7);
                                                                    }}
                                                                >
                                                                    Skip
                                                                </button>
                                                            )}
                                                            <button
                                                                className="btn btn-primary ms-2"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleNext();
                                                                }}
                                                            >
                                                                Next
                                                            </button>
                                                        </div>
                                                    </>
                                                )}

                                                {step === 7 && (
                                                    <button type="submit" className="btn btn-success" >
                                                        Submit
                                                    </button>
                                                )}
                                            </div>

                                        </Form>
                                    )}
                                </Formik>
                                {message && <div className="alert mt-3">{message}</div>}

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default AdmitStudents
