import { Field, Form, Formik } from 'formik';
import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import { EditApi } from '../../Custom Hooks/CustomeHook';
import { MainContext } from '../../Controller/MainProvider';



const EditStudentData = () => {
    const [editDocument, setEditDocument] = useState()
    const Navigate = useNavigate();
    const location = useLocation();
    const { studentId, student, path } = location.state || {};

    if (!student || !studentId) {
        return <div>No student data available</div>;
    }


    const { fetchStudentData, Class, institute } = useContext(MainContext)

    const initialValues = {
        personalDetails: {
            profilePhoto: null,
            firstName: student?.personalDetails?.firstName,
            lastName: student?.personalDetails?.lastName,
            dateOfBirth: student?.personalDetails?.dateOfBirth
                ? new Date(student?.personalDetails?.dateOfBirth).toISOString().split('T')[0]
                : '',
            gender: student?.personalDetails?.gender,
            bloodGroup: student?.personalDetails?.bloodGroup,
            aadharNo: student?.personalDetails?.aadharNo,
            maritalStatus: student?.personalDetails?.maritalStatus,
            nationality: student?.personalDetails?.nationality,
            religion: student?.personalDetails?.religion,
            category: student?.personalDetails?.category,
            caste: student?.personalDetails?.caste,
        },
        contactInfo: {
            email: student?.contactInfo?.email,
            mobile: student?.contactInfo?.mobile,
            whatsapp: student?.contactInfo?.whatsapp,
            alternateContact: student?.contactInfo?.alternateContact,
            address: {
                houseNo: student?.contactInfo?.address?.houseNo,
                streetName: student?.contactInfo?.address?.streetName,
                city: student?.contactInfo?.address?.city,
                pincode: student?.contactInfo?.address?.pincode,
                state: student?.contactInfo?.address?.state,
                country: student?.contactInfo?.address?.country,
            },
        },
        parentDetails: {
            Father: {
                name: student?.parentDetails?.Father?.name,
                qualification: student?.parentDetails?.Father?.qualification,
                residentialAddress: student?.parentDetails?.Father?.residentialAddress,
                occupation: student?.parentDetails?.Father?.occupation,
                officialAddress: student?.parentDetails?.Father?.officialAddress,
                annualIncome: student?.parentDetails?.Father?.annualIncome,
                contactNumber: student?.parentDetails?.Father?.contactNumber,
                email: student?.parentDetails?.Father?.email,
            },
            Mother: {
                name: student?.parentDetails?.Mother?.name,
                qualification: student?.parentDetails?.Mother?.qualification,
                residentialAddress: student?.parentDetails?.Mother?.residentialAddress,
                occupation: student?.parentDetails?.Mother?.occupation,
                officialAddress: student?.parentDetails?.Mother?.officialAddress,
                annualIncome: student?.parentDetails?.Mother?.annualIncome,
                contactNumber: student?.parentDetails?.Mother?.contactNumber,
                email: student?.parentDetails?.Mother?.email,
            },
            Guardian: {
                name: student?.parentDetails?.Guardian?.name,
                qualification: student?.parentDetails?.Guardian?.qualification,
                residentialAddress: student?.parentDetails?.Guardian?.residentialAddress,
                occupation: student?.parentDetails?.Guardian?.occupation,
                officialAddress: student?.parentDetails?.Guardian?.officialAddress,
                annualIncome: student?.parentDetails?.Guardian?.annualIncome,
                contactNumber: student?.parentDetails?.Guardian?.contactNumber,
                email: student?.parentDetails?.Guardian?.email,
                relation: student?.parentDetails?.Guardian?.relation,
            },
        },
        academicDetails: {
            previous: {
                rollNo: student?.academicDetails?.previous?.rollNo,
                class: student?.academicDetails?.previous?.class,
                section: student?.academicDetails?.previous?.section,
                stream: student?.academicDetails?.previous?.stream,
                session: student?.academicDetails?.previous?.session,
                schoolName: student?.academicDetails?.previous?.schoolName,
                location: student?.academicDetails?.previous?.location,
                affilatedTo: student?.academicDetails?.previous?.affilatedTo,
                dropout: student?.academicDetails?.previous?.dropout,
                medium: student?.academicDetails?.previous?.medium,
                TCno: student?.academicDetails?.previous?.TCno,
                TCissueDate: student?.academicDetails?.previous?.TCissueDate,
                passOutYear: student?.academicDetails?.previous?.passOutYear,
                enrollmentNo: student?.academicDetails?.previous?.enrollmentNo,
                percentage: student?.academicDetails?.previous?.percentage || '',
                marks: student?.academicDetails?.previous?.marks,
                subjects: student?.academicDetails?.previous?.subjects,
            },
        },
        enrollmentDetails: {
            admissionType: student?.enrollmentDetails?.admissionType || '',
            admissionCategory: student?.enrollmentDetails?.admissionCategory,
            admissionDate: student?.enrollmentDetails?.admissionDate ? new Date(student?.enrollmentDetails?.admissionDate).toISOString().split('T')[0]
                : '',
            enrollmentNO: student?.enrollmentDetails?.enrollmentNO,
            rollNo: student?.enrollmentDetails?.rollNo,
            instituteType: student?.enrollmentDetails?.instituteType,
            class: student?.enrollmentDetails?.class,
            enrollmentStatus: student?.enrollmentDetails?.enrollmentStatus,
            admissionNO: student?.enrollmentDetails?.admissionNO,
        },
        scholarDetails: {
            scholarID: student?.scholarDetails?.scholarID,
            scholarshipType: student?.scholarDetails?.scholarshipType,
            scholarpassword: student?.scholarDetails?.scholarpassword,
            amountApprovalDate: student?.scholarDetails?.amountApprovalDate,
            govermentStudentPortalID: student?.scholarDetails?.govermentStudentPortalID,
            govermentFamilyPortalID: student?.scholarDetails?.govermentFamilyPortalID,
        },
        bankDetails: {
            accountHolderName: student?.bankDetails?.accountHolderName,
            bankName: student?.bankDetails?.bankName,
            branchName: student?.bankDetails?.branchName,
            accountNumber: student?.bankDetails?.accountNumber,
            ifscCode: student?.bankDetails?.ifscCode,
            upiID: student?.bankDetails?.upiID,
            panNo: student?.bankDetails?.panNo,
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
            otherCertificate: null,
        },
    };



    // image upload
    console.log(initialValues);


    const [dataImg, setDataImg] = useState({
        documents: {
            marksheet: student?.documents?.marksheet,
            transferCertificate: student?.documents?.transferCertificate,
            migrationCertificate: student?.documents?.migrationCertificate,
            aadharCard: { front: student?.documents?.aadharCard?.front, back: student?.documents?.aadharCard?.back },
            PANcard: { front: student?.documents?.PANcard?.front, back: student?.documents?.PANcard?.back },
            birthCertificate: student?.documents?.birthCertificate,
            scholarship: student?.documents?.scholarship,
            casteCertificate: student?.documents?.casteCertificate,
            bankPassbook: student?.documents?.bankPassbook,
            otherCertificate: student?.documents?.otherCertificate,
        },
        personalDetails: {
            profilePhoto: student?.personalDetails?.profilePhoto,
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
                        const keys = fieldName.split("."); // Split the field name by "."
                        let updatedState = { ...prevState };

                        // Determine the root key (e.g., "documents" or "personalDetails")
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





    // form Submite
    const handleEditdata = async (values) => {
        const data = {
            ...values,
            documents: dataImg?.documents,
            personalDetails: {
                ...values.personalDetails,
                profilePhoto: dataImg?.personalDetails?.profilePhoto
            }
        };
        await EditApi("/api/student/update/" + studentId, data, "Student updated successfully");
        Navigate(path == "student-info" ? "/student-info" : "/admit-students");
        fetchStudentData();
        window.scrollTo({ top: 200, behavior: 'smooth' })
    }


    return (
        <>
            <div className="modal-body">
                <div className="nav-align-top mb-4">
                    <Formik initialValues={initialValues} onSubmit={handleEditdata} >
                        {({ values, handleChange, handleBlur, errors, touched }) => (
                            <Form className="border p-4 shadow rounded bg-white container">

                                <div>
                                    <h4 className="mb-4">Enrollment Details</h4>
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <label>
                                                Admission Type
                                            </label>
                                            <Field
                                                name="enrollmentDetails.admissionType"
                                                as="select"
                                                className="form-select"

                                            >
                                                <option value={values?.enrollmentDetails?.admissionType}>{values?.enrollmentDetails?.admissionType}</option>
                                                <option value="General">General</option>
                                                <option value="Sports">Sports</option>
                                                <option value="Management">Management</option>
                                                <option value="Sports">Regular</option>
                                                <option value="Management">Non Regular</option>
                                            </Field>
                                            {touched?.enrollmentDetails?.admissionType &&
                                                errors?.enrollmentDetails?.admissionType && (
                                                    <div className="text-danger">
                                                        {errors?.enrollmentDetails?.admissionType}
                                                    </div>
                                                )}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Admission Category </label>
                                            <Field name="enrollmentDetails.admissionCategory" as="select" className="form-select">
                                                <option value={values?.enrollmentDetails?.admissionCategory}>{values?.enrollmentDetails?.admissionCategory}</option>
                                                <option value="Regular Admission">Regular Admission</option>
                                                <option value="Rolling Admission">Rolling Admission</option>
                                                <option value="Open Admission">Open Admission</option>
                                            </Field>
                                            {touched?.enrollmentDetails?.admissionCategory && errors?.enrollmentDetails?.admissionCategory && <div className="text-danger">{errors?.enrollmentDetails?.admissionCategory}</div>}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Admission Date</label>
                                            <Field name="enrollmentDetails.admissionDate" type="date" placeholder="Enter admission date" className="form-control" />
                                            {touched?.enrollmentDetails?.admissionDate && errors?.enrollmentDetails?.admissionDate && <div className="text-danger">{errors?.enrollmentDetails?.admissionDate}</div>}
                                        </div>
                                        {institute?.instituteType === "College" || institute?.instituteType === "University" ? (
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
                                            <Field name="enrollmentDetails.class" as="select" value={values?.enrollmentDetails?.class.className} className="form-select">
                                                <option >{values?.enrollmentDetails?.class.className}</option>
                                                {Class?.map((cls, index) => <option key={index} value={cls._id}>{cls.className}</option>)}
                                            </Field>
                                            {touched?.enrollmentDetails?.class && errors?.enrollmentDetails?.class && <div className="text-danger">{errors?.enrollmentDetails?.class}</div>}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Enrollment Status</label>
                                            <Field name="enrollmentDetails.enrollmentStatus" as="select" className="form-select">
                                                <option value={values?.enrollmentDetails?.enrollmentStatus}>{values?.enrollmentDetails?.enrollmentStatus}</option>
                                                <option value="Active">Active</option>
                                                <option value="Deactive">Deactive</option>
                                            </Field>
                                            {touched?.enrollmentDetails?.enrollmentStatus && errors?.enrollmentDetails?.enrollmentStatus && <div className="text-danger">{errors?.enrollmentDetails?.enrollmentStatus}</div>}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Admission No.</label>
                                            <Field name="enrollmentDetails.admissionNO" type="text" placeholder="Enter admission no." className="form-control" />
                                            {touched?.enrollmentDetails?.admissionNO && errors?.enrollmentDetails?.admissionNO && <div className="text-danger">{errors?.enrollmentDetails?.admissionNO}</div>}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="mb-4">Personal Details</h4>
                                    <div className="row">

                                        <div className="col-md-4 mb-3">
                                            <label>Profile Photo</label>
                                            {student?.personalDetails?.profilePhoto ? (
                                                <div>
                                                    {editDocument !== "profilePhoto" ? (
                                                        <>
                                                            {student.personalDetails.profilePhoto ? (
                                                                <a
                                                                    href={student.personalDetails.profilePhoto}
                                                                    download="profilePhoto"
                                                                    className="w-50 btn btn-primary mt-2 me-2"
                                                                >
                                                                    Download
                                                                </a>
                                                            ) : (
                                                                "(No Image Found)"
                                                            )}
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger mt-2 w-25"
                                                                onClick={() => setEditDocument("profilePhoto")}
                                                            >
                                                                Edit
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Field
                                                                name="personalDetails.profilePhoto"
                                                                type="file"
                                                                accept=".jpg,.jpeg,.png"
                                                                placeholder="Enter profile photo"
                                                                className="form-control mt-2"
                                                                // value={student.personalDetails.profilePhoto}
                                                                onChange={(e) =>
                                                                    submitImage(e.target.files[0], "personalDetails.profilePhoto")
                                                                }
                                                            />
                                                            {errors.personalDetails?.profilePhoto &&
                                                                touched.personalDetails?.profilePhoto && (
                                                                    <div className="text-danger">
                                                                        {errors.personalDetails?.profilePhoto}
                                                                    </div>
                                                                )}
                                                        </>
                                                    )}
                                                </div>
                                            ) : (
                                                <>
                                                    <Field
                                                        name="personalDetails.profilePhoto"
                                                        type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png"
                                                        placeholder="Enter profile photo"
                                                        className="form-control mt-2"
                                                        onChange={(e) =>
                                                            submitImage(e.target.files[0], "personalDetails.profilePhoto")
                                                        }
                                                    />
                                                    {errors.personalDetails?.profilePhoto &&
                                                        touched.personalDetails?.profilePhoto && (
                                                            <div className="text-danger">{errors.personalDetails?.profilePhoto}</div>
                                                        )}
                                                </>
                                            )}
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <label>First Name</label>
                                            <Field name="personalDetails.firstName" type="text" placeholder="Enter first name" className="form-control" />
                                            {errors?.personalDetails?.firstName && touched?.personalDetails?.firstName && <div className="text-danger">{errors?.personalDetails?.firstName}</div>}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Last Name</label>
                                            <Field name="personalDetails.lastName" type="text" placeholder="Enter last name" className="form-control" />
                                            {errors?.personalDetails?.lastName && touched?.personalDetails?.lastName && <div className="text-danger">{errors?.personalDetails?.lastName}</div>}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Date of Birth</label>
                                            <Field name="personalDetails.dateOfBirth" placeholder="Enter date of birth" type="date" className="form-control" />
                                            {errors?.personalDetails?.dateOfBirth && touched?.personalDetails?.dateOfBirth && (
                                                <div className="text-danger">{errors?.personalDetails?.dateOfBirth}</div>
                                            )}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Gender</label>
                                            <Field as="select" name="personalDetails.gender" placeholder="Select gender" className="form-control">
                                                <option>Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </Field>
                                            {errors?.personalDetails?.gender && touched?.personalDetails?.gender && <div className="text-danger">{errors?.personalDetails?.gender}</div>}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Blood Group</label>
                                            <Field name="personalDetails.bloodGroup" placeholder='Enter blood group' type="text" className="form-control" />
                                            {errors?.personalDetails?.bloodGroup && touched?.personalDetails?.bloodGroup && <div className="text-danger">{errors?.personalDetails?.bloodGroup}</div>}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Aadhar No</label>
                                            <Field name="personalDetails.aadharNo" placeholder='Enter aadhar no' type="text" className="form-control" />
                                            {errors?.personalDetails?.aadharNo && touched?.personalDetails?.aadharNo && <div className="text-danger">{errors?.personalDetails?.aadharNo}</div>}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Marital Status</label>
                                            <Field name="personalDetails.maritalStatus" as="select" className="form-select">
                                                <option value={values?.personalDetails?.maritalStatus}>{values?.personalDetails?.maritalStatus}</option>
                                                <option value="Single">Single</option>
                                                <option value="Married">Married</option>
                                                <option value="Divorced">Divorced</option>
                                                <option value="Separated">Separated</option>
                                                <option value="Widowed">Widowed</option>
                                            </Field>
                                            {errors?.personalDetails?.maritalStatus && touched?.personalDetails?.maritalStatus && <div className="text-danger">{errors?.personalDetails?.maritalStatus}</div>}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Nationality</label>
                                            <Field name="personalDetails.nationality" as="select" className="form-select">
                                                <option value={values?.personalDetails?.nationality}>{values?.personalDetails?.nationality}</option>
                                                <option value="Indian">Indian</option>
                                                <option value="NRI">NRI</option>
                                                <option value="Foreigner">Foreigner</option>
                                            </Field>
                                            {errors?.personalDetails?.nationality && touched?.personalDetails?.nationality && <div className="text-danger">{errors?.personalDetails?.nationality}</div>}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Religion</label>
                                            <Field as="select" name="personalDetails.religion" className="form-select">
                                                <option value={values?.personalDetails?.religion}>{values?.personalDetails?.religion}</option>
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
                                            <label>Category</label>
                                            <Field as="select" name="personalDetails.category" className="form-select">
                                                <option value={values?.personalDetails?.category}>{values?.personalDetails?.category}</option>
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
                                    </div>
                                </div>

                                <div>
                                    <h4 className="mb-4">Contact Information </h4>
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <label>Email</label>
                                            <Field name="contactInfo.email" type="email" placeholder="Enter your email" className="form-control" />
                                            {errors?.contactInfo?.email && touched?.contactInfo?.email && <div className="text-danger">{errors?.contactInfo?.email}</div>}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Mobile</label>
                                            <Field name="contactInfo.mobile" type="number" placeholder="Enter your mobile number " className="form-control" />
                                            {errors?.contactInfo?.mobile && touched?.contactInfo?.mobile && <div className="text-danger">{errors?.contactInfo?.mobile}</div>}
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
                                            <label>House No</label>
                                            <Field name="contactInfo.address.houseNo" type="text" placeholder="Enter your house no." className="form-control" />
                                            {errors?.contactInfo?.address?.houseNo && touched?.contactInfo?.address?.houseNo && <div className="text-danger">{errors?.contactInfo?.address?.houseNo}</div>}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Street Name</label>
                                            <Field name="contactInfo.address.streetName" type="text" placeholder="Enter your street name" className="form-control" />
                                            {errors?.contactInfo?.address?.streetName && touched?.contactInfo?.address?.streetName && <div className="text-danger">{errors?.contactInfo?.address?.streetName}</div>}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>City</label>
                                            <Field name="contactInfo.address.city" type="text" placeholder="Enter your city" className="form-control" />
                                            {errors?.contactInfo?.address?.city && touched?.contactInfo?.address?.city && <div className="text-danger">{errors?.contactInfo?.address?.city}</div>}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Pincode</label>
                                            <Field name="contactInfo.address.pincode" type="number" placeholder="Enter your pincode" className="form-control" />
                                            {errors?.contactInfo?.address?.pincode && touched?.contactInfo?.address?.pincode && <div className="text-danger">{errors?.contactInfo?.address?.pincode}</div>}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>State</label>
                                            <Field name="contactInfo.address.state" type="text" placeholder="Enter your state" className="form-control" />
                                            {errors?.contactInfo?.address?.state && touched?.contactInfo?.address?.state && <div className="text-danger">{errors?.contactInfo?.address?.state}</div>}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Country</label>
                                            <Field name="contactInfo.address.country" type="text" placeholder="Enter your country" className="form-control" />
                                            {errors?.contactInfo?.address?.country && touched?.contactInfo?.address?.country && <div className="text-danger">{errors?.contactInfo?.address?.country}</div>}
                                        </div>
                                    </div>
                                </div>


                                <div>
                                    <h4 className="mb-4">Parents Detail</h4>
                                    <div>
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
                                                    <th>Name</th>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="text" className='form-control' name="parentDetails.Mother.name" />
                                                            {errors?.parentDetails?.Mother?.name && <div className="text-danger">{errors?.parentDetails?.Mother?.name}</div>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="text" className='form-control' name="parentDetails.Father.name" />
                                                            {errors?.parentDetails?.Father?.name && <div className="text-danger">{errors?.parentDetails?.Father?.name}</div>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="text" className='form-control' name="parentDetails.Guardian.name" />
                                                            {errors?.parentDetails?.Guardian?.name && <div className="text-danger">{errors.parentDetails?.Guardian?.name}</div>}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Qualification</th>
                                                    <td>
                                                        <div className="d-grid">
                                                            <select className="form-select select2 select2-hidden-accessible" data-placeholder="" name="parentDetails.Mother.qualification" data-select2-id="select2-data-63-a6ku" tabIndex="-1" aria-hidden="true" value={values.parentDetails.Mother.qualification}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}>
                                                                <option value={values?.parentDetails?.Mother?.qualification}>{values?.parentDetails?.Mother?.qualification}</option>
                                                                <option data-select2-id="select2-data-65-5837">Select</option>
                                                                <option value="10th - high school">10th - High School</option>
                                                                <option value="12th - intermediate">12th - Intermediate</option>
                                                                <option value="advanced program (advanced program)">Advanced Program (Advanced Program)</option>
                                                                <option value="animation, graphics and multimedia">Animation, Graphics and Multimedia</option>
                                                                <option value="aviation courses">Aviation Courses</option>
                                                                <option value="b.arch- bachelor of architecture">B.Arch- Bachelor of Architecture</option>
                                                                <option value="b.com (hons.)">B.Com (Hons.)</option>
                                                                <option value="b.com ll.b. - integrated law program">B.Com LL.B. - Integrated Law Program</option>
                                                                <option value="b.com- bachelor of commerce">B.Com- Bachelor of Commerce</option>
                                                                <option value="b.ed - bachelor of education">B.Ed - Bachelor of Education</option>
                                                                <option value="b.pharma- bachelor of pharmacy">B.Pharma- Bachelor of Pharmacy</option>
                                                                <option value="b.sc- applied geology">B.Sc- Applied Geology</option>
                                                                <option value="b.sc- interior design">B.Sc- Interior Design</option>
                                                                <option value="b.sc- interior design">B.Sc- Interior Design</option>
                                                                <option value="b.sc- nursing">B.Sc- Nursing</option>
                                                                <option value="b.sc. – nutrition &amp; dietetics">B.Sc. – Nutrition &amp; Dietetics</option>
                                                                <option value="b.sc. chemistry">B.Sc. Chemistry</option>
                                                                <option value="b.sc. mathematics">B.Sc. Mathematics</option>
                                                                <option value="b.sc.- hospitality and hotel administration">B.Sc.- Hospitality and Hotel Administration</option>
                                                                <option value="b.sc.- information technology">B.Sc.- Information Technology</option>
                                                                <option value="b.sc.- physics">B.Sc.- Physics</option>
                                                                <option value="b.tech - bachelor of technology">B.Tech - Bachelor of Technology</option>
                                                                <option value="ba - bachelor of arts">BA - Bachelor of Arts</option>
                                                                <option value="ba (hons.) in economics">BA (Hons.) in Economics</option>
                                                                <option value="ba + ll.b - integrated law course">BA + LL.B - Integrated Law Course</option>
                                                                <option value="ba/b.sc. liberal arts">BA/B.Sc. Liberal Arts</option>
                                                                <option value="bachelor in aeronautical engineering">Bachelor in Aeronautical Engineering</option>
                                                                <option value="bachelor in automation and robotics">Bachelor in Automation and Robotics</option>
                                                                <option value="bachelor in automobile engineering">Bachelor in Automobile Engineering</option>
                                                                <option value="bachelor in biotechnology engineering">Bachelor in Biotechnology Engineering</option>
                                                                <option value="bachelor in ceramic engineering">Bachelor in Ceramic Engineering</option>
                                                                <option value="bachelor in chemical engineering">Bachelor in Chemical Engineering</option>
                                                                <option value="bachelor in civil engineering">Bachelor in Civil Engineering</option>
                                                                <option value="bachelor in computer science and engineering">Bachelor in Computer Science and Engineering</option>
                                                                <option value="bachelor in construction engineering">Bachelor in Construction Engineering</option>
                                                                <option value="bachelor in electrical and electronics engineering">Bachelor in Electrical and Electronics Engineering</option>
                                                                <option value="bachelor in electronics and communication engineering">Bachelor in Electronics and Communication Engineering</option>
                                                                <option value="bachelor in foreign language">Bachelor in Foreign Language</option>
                                                                <option value="bachelor in instrumentation engineering">Bachelor in Instrumentation Engineering</option>
                                                                <option value="bachelor in petroleum engineering">Bachelor in Petroleum Engineering</option>
                                                                <option value="bachelor in power engineering">Bachelor in Power Engineering</option>
                                                                <option value="bachelor in robotics engineering">Bachelor in Robotics Engineering</option>
                                                                <option value="bachelor in smart manufacturing &amp; automation">Bachelor in Smart Manufacturing &amp; Automation</option>
                                                                <option value="bachelor in structural engineering">Bachelor in Structural Engineering</option>
                                                                <option value="bachelor in textile engineering">Bachelor in Textile Engineering</option>
                                                                <option value="bachelor in transportation engineering">Bachelor in Transportation Engineering</option>
                                                                <option value="bachelor of design (b. design)">Bachelor of Design (B. Design)</option>
                                                                <option value="bachelor of design in accessory design">Bachelor of Design in Accessory Design</option>
                                                                <option value="bachelor of design in ceramic design">Bachelor of Design in Ceramic Design</option>
                                                                <option value="bachelor of design in fashion design">Bachelor of Design in fashion Design</option>
                                                                <option value="bachelor of design in graphic design">Bachelor of Design in Graphic Design</option>
                                                                <option value="bachelor of design in industrial design">Bachelor of Design in Industrial Design</option>
                                                                <option value="bachelor of design in jewellery design">Bachelor of Design in Jewellery Design</option>
                                                                <option value="bachelor of design in leather design">Bachelor of Design in Leather Design</option>
                                                                <option value="bachelor of performing arts">Bachelor of Performing Arts</option>
                                                                <option value="bachelor of physical education (b.p.ed)">Bachelor Of Physical Education (B.P.Ed)</option>
                                                                <option value="bba - bachelor of business administration">BBA - Bachelor of Business Administration</option>
                                                                <option value="bba ll.b - integarted law program">BBA LL.B - Integarted Law Program</option>
                                                                <option value="bbs- bachelor of business studies">BBS- Bachelor of Business Studies</option>
                                                                <option value="bca">BCA</option>
                                                                <option value="bca- bachelor of computer applications">BCA- Bachelor of Computer Applications</option>
                                                                <option value="bds- bachelor of dental surgery">BDS- Bachelor of Dental Surgery</option>
                                                                <option value="be or beng - bachelor of engineering">BE or BEng - Bachelor of Engineering</option>
                                                                <option value="bem- bachelor of event management">BEM- Bachelor of Event Management</option>
                                                                <option value="bfa- bachelor of fine arts">BFA- Bachelor of Fine Arts</option>
                                                                <option value="bfd- bachelor of fashion designing">BFD- Bachelor of Fashion Designing</option>
                                                                <option value="bjmc- bachelor of journalism and mass communication">BJMC- Bachelor of Journalism and Mass Communication</option>
                                                                <option value="bms- bachelor of management science">BMS- Bachelor of Management Science</option>
                                                                <option value="bpt- bachelor of physiotherapy">BPT- Bachelor of Physiotherapy</option>
                                                                <option value="bsw- bachelor of social work">BSW- Bachelor of Social Work</option>
                                                                <option value="bte - bachelor of technical education">BTE - Bachelor of Technical Education</option>
                                                                <option value="bttm- bachelor of travel and tourism management">BTTM- Bachelor of Travel and Tourism Management</option>
                                                                <option value="ca- chartered accountancy">CA- Chartered Accountancy</option>
                                                                <option value="cs- company secretary">CS- Company Secretary</option>
                                                                <option value="ctet - central teacher eligibility test">CTET - Central Teacher Eligibility Test</option>
                                                                <option value="d.ed (diploma in education)">D.Ed (Diploma in Education)</option>
                                                                <option value="d.pharma - diploma in pharmacy">D.Pharma - Diploma in Pharmacy</option>
                                                                <option value="e.f.p.m - executive fellow program in management">E.F.P.M - Executive Fellow Program In Management</option>
                                                                <option value="e.m.p - executive management programme">E.M.P - Executive Management Programme</option>
                                                                <option value="ecced">ECCed</option>
                                                                <option value="executive post graduate certificate (executive pg certificate)">Executive Post Graduate Certificate (Executive PG Certificate)</option>
                                                                <option value="executive post graduate programme (executive pg programme)">Executive Post Graduate Programme (Executive PG Programme)</option>
                                                                <option value="fellow programme (fellow programme)">Fellow Programme (Fellow Programme)</option>
                                                                <option value="graduation">GRADUATION</option>
                                                                <option value="htet - haryana teacher eligibility test">HTET - Haryana Teacher Eligibility Test</option>
                                                                <option value="international programme (international programme)">International Programme (International Programme)</option>
                                                                <option value="ix">IX</option>
                                                                <option value="jbt - junior basic training">JBT - Junior Basic Training</option>
                                                                <option value="junior high school">Junior High School</option>
                                                                <option value="ll.m - master of law">LL.M - Master of Law</option>
                                                                <option value="llb - bachelor of legislative law">LLB - Bachelor of Legislative Law</option>
                                                                <option value="m.com - master of commerce">M.Com - Master of Commerce</option>
                                                                <option value="m.d - doctor of medicine">M.D - Doctor of Medicine</option>
                                                                <option value="m.d.s - master of dental surgery">M.D.S - Master of Dental Surgery</option>
                                                                <option value="m.e - master of engineering">M.E - Master of Engineering</option>
                                                                <option value="m.ed - master of education">M.Ed - Master of Education</option>
                                                                <option value="m.ed - masters in education">M.Ed - Masters in Education</option>
                                                                <option value="m.ed ai -  artificial intelligence">M.Ed AI -  Artificial Intelligence</option>
                                                                <option value="m.f.a - master of fine arts">M.F.A - Master of Fine Arts</option>
                                                                <option value="m.f.c - master of finance and control">M.F.C - Master of Finance And Control</option>
                                                                <option value="m.pharma - master of pharmacy">M.Pharma - Master of Pharmacy</option>
                                                                <option value="m.phil - master of philosophy">M.Phil - Master of Philosophy</option>
                                                                <option value="m.s - master of science">M.S - Master of Science</option>
                                                                <option value="m.sc - master of science">M.Sc - Master of Science</option>
                                                                <option value="m.tech - master of technology">M.Tech - Master of Technology</option>
                                                                <option value="m.voc - master of vocational">M.Voc - Master of Vocational</option>
                                                                <option value="ma - master of arts">MA - Master of Arts</option>
                                                                <option value="management development programme (m.d.p)">Management Development Programme (M.D.P)</option>
                                                                <option value="master of architecture (m.arch)">Master of Architecture (M.Arch)</option>
                                                                <option value="master of arts in management (m.a.m)">Master of Arts in Management (M.A.M)</option>
                                                                <option value="master of arts in personal management (m.a.p.m)">Master of Arts in Personal Management (M.A.P.M)</option>
                                                                <option value="master of business economics (m.b.e)">Master of Business Economics (M.B.E)</option>
                                                                <option value="master of business laws (m.b.l)">Master of Business Laws (M.B.L)</option>
                                                                <option value="master of business management (m.b.m)">Master of Business Management (M.B.M)</option>
                                                                <option value="master of business studies (m.b.s)">Master of Business Studies (M.B.S)</option>
                                                                <option value="master of chirurgical (m.ch)">Master of Chirurgical (M.Ch)</option>
                                                                <option value="master of communication and journalism (m.c.j)">Master Of Communication And Journalism (M.C.J)</option>
                                                                <option value="master of comparative laws (m.c.l)">Master of Comparative Laws (M.C.L)</option>
                                                                <option value="master of computer management (m.c.m)">Master of Computer Management (M.C.M)</option>
                                                                <option value="master of corporate secretaryship (m.c.s)">Master of Corporate Secretaryship (M.C.S)</option>
                                                                <option value="master of film management (m.f.m)">Master of Film Management (M.F.M)</option>
                                                                <option value="master of financial services (m.f.s)">Master of Financial Services (M.F.S)</option>
                                                                <option value="master of fishery sciences (m.f.sc)">Master of Fishery Sciences (M.F.Sc)</option>
                                                                <option value="master of foreign trade (m.f.t)">Master of Foreign Trade (M.F.T)</option>
                                                                <option value="master of health science (m.h.sc)">Master Of Health Science (M.H.Sc)</option>
                                                                <option value="master of hospital administration (m.h.a)">Master of Hospital Administration (M.H.A)</option>
                                                                <option value="master of hospitality and hotel management (m.h.h.m)">Master of Hospitality And Hotel Management (M.H.H.M)</option>
                                                                <option value="master of hospitality management (m.h.m)">Master of Hospitality Management (M.H.M)</option>
                                                                <option value="master of human resource management (m.h.r.m)">Master of Human Resource Management (M.H.R.M)</option>
                                                                <option value="master of industrial relation and personal management (mir and pm)">Master of Industrial Relation and Personal Management (MIR and PM)</option>
                                                                <option value="master of international business (m.i.b)">Master of International Business (M.I.B)</option>
                                                                <option value="master of journalism (m.j)">Master of Journalism (M.J)</option>
                                                                <option value="master of labour management (m.l.m)">Master of Labour Management (M.L.M)</option>
                                                                <option value="master of laws (m.l)">Master of Laws (M.L)</option>
                                                                <option value="master of library and information science (m.l.i.sc)">Master of Library and Information Science (M.L.I.Sc)</option>
                                                                <option value="master of library science (m.l.sc)">Master of Library Science (M.L.Sc)</option>
                                                                <option value="master of management program (m.m.p)">Master of Management Program (M.M.P)</option>
                                                                <option value="master of management studies (m.m.s)">Master of Management Studies (M.M.S)</option>
                                                                <option value="master of marketing management (m.m.m)">Master of Marketing Management (M.M.M)</option>
                                                                <option value="master of occupational theraphy (m.o.t)">Master of Occupational Theraphy (M.O.T)</option>
                                                                <option value="master of performance management (m.p.m)">Master of Performance Management (M.P.M)</option>
                                                                <option value="master of performing arts (m.p.a)">Master of Performing Arts (M.P.A)</option>
                                                                <option value="master of personal management and industrial relation (mpm and ir)">Master of Personal Management and Industrial Relation (MPM and IR)</option>
                                                                <option value="master of personnel management (mpm)">Master of Personnel Management (MPM)</option>
                                                                <option value="master of physical education (m.p.ed)">Master Of Physical Education (M.P.Ed)</option>
                                                                <option value="master of physiotheraphy (m.p.t)">Master of Physiotheraphy (M.P.T)</option>
                                                                <option value="master of psychiatric epidemiology (m.p.e)">Master of Psychiatric Epidemiology (M.P.E)</option>
                                                                <option value="master of public health (m.p.h)">Master of Public Health (M.P.H)</option>
                                                                <option value="master of social dynamics (m.s.d)">Master of Social Dynamics (M.S.D)</option>
                                                                <option value="master of social work (m.s.w)">Master of Social Work (M.S.W)</option>
                                                                <option value="master of theology (m.th)">Master of Theology (M.Th)</option>
                                                                <option value="master of tourism administrations (m.t.a)">Master of Tourism Administrations (M.T.A)</option>
                                                                <option value="master of tourism management (m.t.m)">Master of Tourism Management (M.T.M)</option>
                                                                <option value="master of veterinary science (m.v.sc)">Master of Veterinary Science (M.V.Sc)</option>
                                                                <option value="master of visual arts (m.v.a)">Master of Visual Arts (M.V.A)</option>
                                                                <option value="masters in design (m.des)">Masters in Design (M.Des)</option>
                                                                <option value="masters in international management (m.i.m)">Masters in International Management (M.I.M)</option>
                                                                <option value="masters in public systems management (m.p.s.m)">Masters in Public Systems Management (M.P.S.M)</option>
                                                                <option value="masters of hospitality and tourism management (m.h.t.m)">Masters of Hospitality and Tourism Management (M.H.T.M)</option>
                                                                <option value="masters programme in international business (m.p.i.b)">Masters Programme in International Business (M.P.I.B)</option>
                                                                <option value="mba - master of business administration">MBA - Master of Business Administration</option>
                                                                <option value="mca">MCA</option>
                                                                <option value="mca - master of computer applications">MCA - Master of Computer Applications</option>
                                                                <option value="montessory">Montessory</option>
                                                                <option value="mscit">MSCIT</option>
                                                                <option value="net - national eligibility test">NET - National Eligibility Test</option>
                                                                <option value="no education">No Education</option>
                                                                <option value="ntt - nursery teacher training">NTT - Nursery Teacher Training</option>
                                                                <option value="pgdm - post graduate diploma in management">PGDM - Post Graduate Diploma in Management</option>
                                                                <option value="ph.d - doctor of philosophy">Ph.D - Doctor of Philosophy</option>
                                                                <option value="post graduation">Post Graduation</option>
                                                                <option value="primary">Primary</option>
                                                                <option value="stc mp">STC MP</option>
                                                            </select><span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-64-gr3o" style={{ width: "224px" }}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="0" aria-disabled="false" aria-labelledby="select2-mother_qualification-hm-container" aria-controls="select2-mother_qualification-hm-container"><span className="select2-selection__rendered" id="select2-mother_qualification-hm-container" role="textbox" aria-readonly="true" title=""><span className="select2-selection__placeholder"></span></span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-grid">
                                                            <select className="form-select select2 select2-hidden-accessible" data-placeholder="" name="parentDetails.Father.qualification" data-select2-id="select2-data-66-t6b6" tabIndex="-1" aria-hidden="true" value={values.parentDetails.Father.qualification}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}>
                                                                <option value={values.parentDetails.Father.qualification} data-select2-id="select2-data-68-tue4">{values.parentDetails.Father.qualification}</option><option value="1st - primary">1st - Primary</option>
                                                                <option value="10th - high school">10th - High School</option>
                                                                <option value="12th - intermediate">12th - Intermediate</option>
                                                                <option value="advanced program (advanced program)">Advanced Program (Advanced Program)</option>
                                                                <option value="animation, graphics and multimedia">Animation, Graphics and Multimedia</option>
                                                                <option value="aviation courses">Aviation Courses</option>
                                                                <option value="b.arch- bachelor of architecture">B.Arch- Bachelor of Architecture</option>
                                                                <option value="b.com (hons.)">B.Com (Hons.)</option>
                                                                <option value="b.com ll.b. - integrated law program">B.Com LL.B. - Integrated Law Program</option>
                                                                <option value="b.com- bachelor of commerce">B.Com- Bachelor of Commerce</option>
                                                                <option value="b.ed - bachelor of education">B.Ed - Bachelor of Education</option>
                                                                <option value="b.pharma- bachelor of pharmacy">B.Pharma- Bachelor of Pharmacy</option>
                                                                <option value="b.sc- applied geology">B.Sc- Applied Geology</option>
                                                                <option value="b.sc- interior design">B.Sc- Interior Design</option>
                                                                <option value="b.sc- interior design">B.Sc- Interior Design</option>
                                                                <option value="b.sc- nursing">B.Sc- Nursing</option>
                                                                <option value="b.sc. – nutrition &amp; dietetics">B.Sc. – Nutrition &amp; Dietetics</option>
                                                                <option value="b.sc. chemistry">B.Sc. Chemistry</option>
                                                                <option value="b.sc. mathematics">B.Sc. Mathematics</option>
                                                                <option value="b.sc.- hospitality and hotel administration">B.Sc.- Hospitality and Hotel Administration</option>
                                                                <option value="b.sc.- information technology">B.Sc.- Information Technology</option>
                                                                <option value="b.sc.- physics">B.Sc.- Physics</option>
                                                                <option value="b.tech - bachelor of technology">B.Tech - Bachelor of Technology</option>
                                                                <option value="ba - bachelor of arts">BA - Bachelor of Arts</option>
                                                                <option value="ba (hons.) in economics">BA (Hons.) in Economics</option>
                                                                <option value="ba + ll.b - integrated law course">BA + LL.B - Integrated Law Course</option>
                                                                <option value="ba/b.sc. liberal arts">BA/B.Sc. Liberal Arts</option>
                                                                <option value="bachelor in aeronautical engineering">Bachelor in Aeronautical Engineering</option>
                                                                <option value="bachelor in automation and robotics">Bachelor in Automation and Robotics</option>
                                                                <option value="bachelor in automobile engineering">Bachelor in Automobile Engineering</option>
                                                                <option value="bachelor in biotechnology engineering">Bachelor in Biotechnology Engineering</option>
                                                                <option value="bachelor in ceramic engineering">Bachelor in Ceramic Engineering</option>
                                                                <option value="bachelor in chemical engineering">Bachelor in Chemical Engineering</option>
                                                                <option value="bachelor in civil engineering">Bachelor in Civil Engineering</option>
                                                                <option value="bachelor in computer science and engineering">Bachelor in Computer Science and Engineering</option>
                                                                <option value="bachelor in construction engineering">Bachelor in Construction Engineering</option>
                                                                <option value="bachelor in electrical and electronics engineering">Bachelor in Electrical and Electronics Engineering</option>
                                                                <option value="bachelor in electronics and communication engineering">Bachelor in Electronics and Communication Engineering</option>
                                                                <option value="bachelor in foreign language">Bachelor in Foreign Language</option>
                                                                <option value="bachelor in instrumentation engineering">Bachelor in Instrumentation Engineering</option>
                                                                <option value="bachelor in petroleum engineering">Bachelor in Petroleum Engineering</option>
                                                                <option value="bachelor in power engineering">Bachelor in Power Engineering</option>
                                                                <option value="bachelor in robotics engineering">Bachelor in Robotics Engineering</option>
                                                                <option value="bachelor in smart manufacturing &amp; automation">Bachelor in Smart Manufacturing &amp; Automation</option>
                                                                <option value="bachelor in structural engineering">Bachelor in Structural Engineering</option>
                                                                <option value="bachelor in textile engineering">Bachelor in Textile Engineering</option>
                                                                <option value="bachelor in transportation engineering">Bachelor in Transportation Engineering</option>
                                                                <option value="bachelor of design (b. design)">Bachelor of Design (B. Design)</option>
                                                                <option value="bachelor of design in accessory design">Bachelor of Design in Accessory Design</option>
                                                                <option value="bachelor of design in ceramic design">Bachelor of Design in Ceramic Design</option>
                                                                <option value="bachelor of design in fashion design">Bachelor of Design in fashion Design</option>
                                                                <option value="bachelor of design in graphic design">Bachelor of Design in Graphic Design</option>
                                                                <option value="bachelor of design in industrial design">Bachelor of Design in Industrial Design</option>
                                                                <option value="bachelor of design in jewellery design">Bachelor of Design in Jewellery Design</option>
                                                                <option value="bachelor of design in leather design">Bachelor of Design in Leather Design</option>
                                                                <option value="bachelor of performing arts">Bachelor of Performing Arts</option>
                                                                <option value="bachelor of physical education (b.p.ed)">Bachelor Of Physical Education (B.P.Ed)</option>
                                                                <option value="bba - bachelor of business administration">BBA - Bachelor of Business Administration</option>
                                                                <option value="bba ll.b - integarted law program">BBA LL.B - Integarted Law Program</option>
                                                                <option value="bbs- bachelor of business studies">BBS- Bachelor of Business Studies</option>
                                                                <option value="bca">BCA</option>
                                                                <option value="bca- bachelor of computer applications">BCA- Bachelor of Computer Applications</option>
                                                                <option value="bds- bachelor of dental surgery">BDS- Bachelor of Dental Surgery</option>
                                                                <option value="be or beng - bachelor of engineering">BE or BEng - Bachelor of Engineering</option>
                                                                <option value="bem- bachelor of event management">BEM- Bachelor of Event Management</option>
                                                                <option value="bfa- bachelor of fine arts">BFA- Bachelor of Fine Arts</option>
                                                                <option value="bfd- bachelor of fashion designing">BFD- Bachelor of Fashion Designing</option>
                                                                <option value="bjmc- bachelor of journalism and mass communication">BJMC- Bachelor of Journalism and Mass Communication</option>
                                                                <option value="bms- bachelor of management science">BMS- Bachelor of Management Science</option>
                                                                <option value="bpt- bachelor of physiotherapy">BPT- Bachelor of Physiotherapy</option>
                                                                <option value="bsw- bachelor of social work">BSW- Bachelor of Social Work</option>
                                                                <option value="bte - bachelor of technical education">BTE - Bachelor of Technical Education</option>
                                                                <option value="bttm- bachelor of travel and tourism management">BTTM- Bachelor of Travel and Tourism Management</option>
                                                                <option value="ca- chartered accountancy">CA- Chartered Accountancy</option>
                                                                <option value="cs- company secretary">CS- Company Secretary</option>
                                                                <option value="ctet - central teacher eligibility test">CTET - Central Teacher Eligibility Test</option>
                                                                <option value="d.ed (diploma in education)">D.Ed (Diploma in Education)</option>
                                                                <option value="d.pharma - diploma in pharmacy">D.Pharma - Diploma in Pharmacy</option>
                                                                <option value="e.f.p.m - executive fellow program in management">E.F.P.M - Executive Fellow Program In Management</option>
                                                                <option value="e.m.p - executive management programme">E.M.P - Executive Management Programme</option>
                                                                <option value="ecced">ECCed</option>
                                                                <option value="executive post graduate certificate (executive pg certificate)">Executive Post Graduate Certificate (Executive PG Certificate)</option>
                                                                <option value="executive post graduate programme (executive pg programme)">Executive Post Graduate Programme (Executive PG Programme)</option>
                                                                <option value="fellow programme (fellow programme)">Fellow Programme (Fellow Programme)</option>
                                                                <option value="graduation">GRADUATION</option>
                                                                <option value="htet - haryana teacher eligibility test">HTET - Haryana Teacher Eligibility Test</option>
                                                                <option value="international programme (international programme)">International Programme (International Programme)</option>
                                                                <option value="ix">IX</option>
                                                                <option value="jbt - junior basic training">JBT - Junior Basic Training</option>
                                                                <option value="junior high school">Junior High School</option>
                                                                <option value="ll.m - master of law">LL.M - Master of Law</option>
                                                                <option value="llb - bachelor of legislative law">LLB - Bachelor of Legislative Law</option>
                                                                <option value="m.com - master of commerce">M.Com - Master of Commerce</option>
                                                                <option value="m.d - doctor of medicine">M.D - Doctor of Medicine</option>
                                                                <option value="m.d.s - master of dental surgery">M.D.S - Master of Dental Surgery</option>
                                                                <option value="m.e - master of engineering">M.E - Master of Engineering</option>
                                                                <option value="m.ed - master of education">M.Ed - Master of Education</option>
                                                                <option value="m.ed - masters in education">M.Ed - Masters in Education</option>
                                                                <option value="m.ed ai -  artificial intelligence">M.Ed AI -  Artificial Intelligence</option>
                                                                <option value="m.f.a - master of fine arts">M.F.A - Master of Fine Arts</option>
                                                                <option value="m.f.c - master of finance and control">M.F.C - Master of Finance And Control</option>
                                                                <option value="m.pharma - master of pharmacy">M.Pharma - Master of Pharmacy</option>
                                                                <option value="m.phil - master of philosophy">M.Phil - Master of Philosophy</option>
                                                                <option value="m.s - master of science">M.S - Master of Science</option>
                                                                <option value="m.sc - master of science">M.Sc - Master of Science</option>
                                                                <option value="m.tech - master of technology">M.Tech - Master of Technology</option>
                                                                <option value="m.voc - master of vocational">M.Voc - Master of Vocational</option>
                                                                <option value="ma - master of arts">MA - Master of Arts</option>
                                                                <option value="management development programme (m.d.p)">Management Development Programme (M.D.P)</option>
                                                                <option value="master of architecture (m.arch)">Master of Architecture (M.Arch)</option>
                                                                <option value="master of arts in management (m.a.m)">Master of Arts in Management (M.A.M)</option>
                                                                <option value="master of arts in personal management (m.a.p.m)">Master of Arts in Personal Management (M.A.P.M)</option>
                                                                <option value="master of business economics (m.b.e)">Master of Business Economics (M.B.E)</option>
                                                                <option value="master of business laws (m.b.l)">Master of Business Laws (M.B.L)</option>
                                                                <option value="master of business management (m.b.m)">Master of Business Management (M.B.M)</option>
                                                                <option value="master of business studies (m.b.s)">Master of Business Studies (M.B.S)</option>
                                                                <option value="master of chirurgical (m.ch)">Master of Chirurgical (M.Ch)</option>
                                                                <option value="master of communication and journalism (m.c.j)">Master Of Communication And Journalism (M.C.J)</option>
                                                                <option value="master of comparative laws (m.c.l)">Master of Comparative Laws (M.C.L)</option>
                                                                <option value="master of computer management (m.c.m)">Master of Computer Management (M.C.M)</option>
                                                                <option value="master of corporate secretaryship (m.c.s)">Master of Corporate Secretaryship (M.C.S)</option>
                                                                <option value="master of film management (m.f.m)">Master of Film Management (M.F.M)</option>
                                                                <option value="master of financial services (m.f.s)">Master of Financial Services (M.F.S)</option>
                                                                <option value="master of fishery sciences (m.f.sc)">Master of Fishery Sciences (M.F.Sc)</option>
                                                                <option value="master of foreign trade (m.f.t)">Master of Foreign Trade (M.F.T)</option>
                                                                <option value="master of health science (m.h.sc)">Master Of Health Science (M.H.Sc)</option>
                                                                <option value="master of hospital administration (m.h.a)">Master of Hospital Administration (M.H.A)</option>
                                                                <option value="master of hospitality and hotel management (m.h.h.m)">Master of Hospitality And Hotel Management (M.H.H.M)</option>
                                                                <option value="master of hospitality management (m.h.m)">Master of Hospitality Management (M.H.M)</option>
                                                                <option value="master of human resource management (m.h.r.m)">Master of Human Resource Management (M.H.R.M)</option>
                                                                <option value="master of industrial relation and personal management (mir and pm)">Master of Industrial Relation and Personal Management (MIR and PM)</option>
                                                                <option value="master of international business (m.i.b)">Master of International Business (M.I.B)</option>
                                                                <option value="master of journalism (m.j)">Master of Journalism (M.J)</option>
                                                                <option value="master of labour management (m.l.m)">Master of Labour Management (M.L.M)</option>
                                                                <option value="master of laws (m.l)">Master of Laws (M.L)</option>
                                                                <option value="master of library and information science (m.l.i.sc)">Master of Library and Information Science (M.L.I.Sc)</option>
                                                                <option value="master of library science (m.l.sc)">Master of Library Science (M.L.Sc)</option>
                                                                <option value="master of management program (m.m.p)">Master of Management Program (M.M.P)</option>
                                                                <option value="master of management studies (m.m.s)">Master of Management Studies (M.M.S)</option>
                                                                <option value="master of marketing management (m.m.m)">Master of Marketing Management (M.M.M)</option>
                                                                <option value="master of occupational theraphy (m.o.t)">Master of Occupational Theraphy (M.O.T)</option>
                                                                <option value="master of performance management (m.p.m)">Master of Performance Management (M.P.M)</option>
                                                                <option value="master of performing arts (m.p.a)">Master of Performing Arts (M.P.A)</option>
                                                                <option value="master of personal management and industrial relation (mpm and ir)">Master of Personal Management and Industrial Relation (MPM and IR)</option>
                                                                <option value="master of personnel management (mpm)">Master of Personnel Management (MPM)</option>
                                                                <option value="master of physical education (m.p.ed)">Master Of Physical Education (M.P.Ed)</option>
                                                                <option value="master of physiotheraphy (m.p.t)">Master of Physiotheraphy (M.P.T)</option>
                                                                <option value="master of psychiatric epidemiology (m.p.e)">Master of Psychiatric Epidemiology (M.P.E)</option>
                                                                <option value="master of public health (m.p.h)">Master of Public Health (M.P.H)</option>
                                                                <option value="master of social dynamics (m.s.d)">Master of Social Dynamics (M.S.D)</option>
                                                                <option value="master of social work (m.s.w)">Master of Social Work (M.S.W)</option>
                                                                <option value="master of theology (m.th)">Master of Theology (M.Th)</option>
                                                                <option value="master of tourism administrations (m.t.a)">Master of Tourism Administrations (M.T.A)</option>
                                                                <option value="master of tourism management (m.t.m)">Master of Tourism Management (M.T.M)</option>
                                                                <option value="master of veterinary science (m.v.sc)">Master of Veterinary Science (M.V.Sc)</option>
                                                                <option value="master of visual arts (m.v.a)">Master of Visual Arts (M.V.A)</option>
                                                                <option value="masters in design (m.des)">Masters in Design (M.Des)</option>
                                                                <option value="masters in international management (m.i.m)">Masters in International Management (M.I.M)</option>
                                                                <option value="masters in public systems management (m.p.s.m)">Masters in Public Systems Management (M.P.S.M)</option>
                                                                <option value="masters of hospitality and tourism management (m.h.t.m)">Masters of Hospitality and Tourism Management (M.H.T.M)</option>
                                                                <option value="masters programme in international business (m.p.i.b)">Masters Programme in International Business (M.P.I.B)</option>
                                                                <option value="mba - master of business administration">MBA - Master of Business Administration</option>
                                                                <option value="mca">MCA</option>
                                                                <option value="mca - master of computer applications">MCA - Master of Computer Applications</option>
                                                                <option value="montessory">Montessory</option>
                                                                <option value="mscit">MSCIT</option>
                                                                <option value="net - national eligibility test">NET - National Eligibility Test</option>
                                                                <option value="no education">No Education</option>
                                                                <option value="ntt - nursery teacher training">NTT - Nursery Teacher Training</option>
                                                                <option value="pgdm - post graduate diploma in management">PGDM - Post Graduate Diploma in Management</option>
                                                                <option value="ph.d - doctor of philosophy">Ph.D - Doctor of Philosophy</option>
                                                                <option value="post graduation">Post Graduation</option>
                                                                <option value="primary">Primary</option>
                                                                <option value="stc mp">STC MP</option>
                                                            </select><span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-67-7tdt" style={{ width: "224px" }}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="0" aria-disabled="false" aria-labelledby="select2-father_qualification-ja-container" aria-controls="select2-father_qualification-ja-container"><span className="select2-selection__rendered" id="select2-father_qualification-ja-container" role="textbox" aria-readonly="true" title=""><span className="select2-selection__placeholder"></span></span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-grid">
                                                            <select className="form-select select2 select2-hidden-accessible" data-placeholder="" name="parentDetails.Guardian.qualification" data-select2-id="select2-data-69-5dkg" tabIndex="-1" aria-hidden="true" value={values.parentDetails.Guardian.qualification}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}>
                                                                <option value={values.parentDetails.Guardian.qualification} data-select2-id="select2-data-71-0sbx">{values.parentDetails.Guardian.qualification}</option>
                                                                <option value="10th - high school">10th - High School</option>
                                                                <option value="12th - intermediate">12th - Intermediate</option>
                                                                <option value="advanced program (advanced program)">Advanced Program (Advanced Program)</option>
                                                                <option value="animation, graphics and multimedia">Animation, Graphics and Multimedia</option>
                                                                <option value="aviation courses">Aviation Courses</option>
                                                                <option value="b.arch- bachelor of architecture">B.Arch- Bachelor of Architecture</option>
                                                                <option value="b.com (hons.)">B.Com (Hons.)</option>
                                                                <option value="b.com ll.b. - integrated law program">B.Com LL.B. - Integrated Law Program</option>
                                                                <option value="b.com- bachelor of commerce">B.Com- Bachelor of Commerce</option>
                                                                <option value="b.ed - bachelor of education">B.Ed - Bachelor of Education</option>
                                                                <option value="b.pharma- bachelor of pharmacy">B.Pharma- Bachelor of Pharmacy</option>
                                                                <option value="b.sc- applied geology">B.Sc- Applied Geology</option>
                                                                <option value="b.sc- interior design">B.Sc- Interior Design</option>
                                                                <option value="b.sc- interior design">B.Sc- Interior Design</option>
                                                                <option value="b.sc- nursing">B.Sc- Nursing</option>
                                                                <option value="b.sc. – nutrition &amp; dietetics">B.Sc. – Nutrition &amp; Dietetics</option>
                                                                <option value="b.sc. chemistry">B.Sc. Chemistry</option>
                                                                <option value="b.sc. mathematics">B.Sc. Mathematics</option>
                                                                <option value="b.sc.- hospitality and hotel administration">B.Sc.- Hospitality and Hotel Administration</option>
                                                                <option value="b.sc.- information technology">B.Sc.- Information Technology</option>
                                                                <option value="b.sc.- physics">B.Sc.- Physics</option>
                                                                <option value="b.tech - bachelor of technology">B.Tech - Bachelor of Technology</option>
                                                                <option value="ba - bachelor of arts">BA - Bachelor of Arts</option>
                                                                <option value="ba (hons.) in economics">BA (Hons.) in Economics</option>
                                                                <option value="ba + ll.b - integrated law course">BA + LL.B - Integrated Law Course</option>
                                                                <option value="ba/b.sc. liberal arts">BA/B.Sc. Liberal Arts</option>
                                                                <option value="bachelor in aeronautical engineering">Bachelor in Aeronautical Engineering</option>
                                                                <option value="bachelor in automation and robotics">Bachelor in Automation and Robotics</option>
                                                                <option value="bachelor in automobile engineering">Bachelor in Automobile Engineering</option>
                                                                <option value="bachelor in biotechnology engineering">Bachelor in Biotechnology Engineering</option>
                                                                <option value="bachelor in ceramic engineering">Bachelor in Ceramic Engineering</option>
                                                                <option value="bachelor in chemical engineering">Bachelor in Chemical Engineering</option>
                                                                <option value="bachelor in civil engineering">Bachelor in Civil Engineering</option>
                                                                <option value="bachelor in computer science and engineering">Bachelor in Computer Science and Engineering</option>
                                                                <option value="bachelor in construction engineering">Bachelor in Construction Engineering</option>
                                                                <option value="bachelor in electrical and electronics engineering">Bachelor in Electrical and Electronics Engineering</option>
                                                                <option value="bachelor in electronics and communication engineering">Bachelor in Electronics and Communication Engineering</option>
                                                                <option value="bachelor in foreign language">Bachelor in Foreign Language</option>
                                                                <option value="bachelor in instrumentation engineering">Bachelor in Instrumentation Engineering</option>
                                                                <option value="bachelor in petroleum engineering">Bachelor in Petroleum Engineering</option>
                                                                <option value="bachelor in power engineering">Bachelor in Power Engineering</option>
                                                                <option value="bachelor in robotics engineering">Bachelor in Robotics Engineering</option>
                                                                <option value="bachelor in smart manufacturing &amp; automation">Bachelor in Smart Manufacturing &amp; Automation</option>
                                                                <option value="bachelor in structural engineering">Bachelor in Structural Engineering</option>
                                                                <option value="bachelor in textile engineering">Bachelor in Textile Engineering</option>
                                                                <option value="bachelor in transportation engineering">Bachelor in Transportation Engineering</option>
                                                                <option value="bachelor of design (b. design)">Bachelor of Design (B. Design)</option>
                                                                <option value="bachelor of design in accessory design">Bachelor of Design in Accessory Design</option>
                                                                <option value="bachelor of design in ceramic design">Bachelor of Design in Ceramic Design</option>
                                                                <option value="bachelor of design in fashion design">Bachelor of Design in fashion Design</option>
                                                                <option value="bachelor of design in graphic design">Bachelor of Design in Graphic Design</option>
                                                                <option value="bachelor of design in industrial design">Bachelor of Design in Industrial Design</option>
                                                                <option value="bachelor of design in jewellery design">Bachelor of Design in Jewellery Design</option>
                                                                <option value="bachelor of design in leather design">Bachelor of Design in Leather Design</option>
                                                                <option value="bachelor of performing arts">Bachelor of Performing Arts</option>
                                                                <option value="bachelor of physical education (b.p.ed)">Bachelor Of Physical Education (B.P.Ed)</option>
                                                                <option value="bba - bachelor of business administration">BBA - Bachelor of Business Administration</option>
                                                                <option value="bba ll.b - integarted law program">BBA LL.B - Integarted Law Program</option>
                                                                <option value="bbs- bachelor of business studies">BBS- Bachelor of Business Studies</option>
                                                                <option value="bca">BCA</option>
                                                                <option value="bca- bachelor of computer applications">BCA- Bachelor of Computer Applications</option>
                                                                <option value="bds- bachelor of dental surgery">BDS- Bachelor of Dental Surgery</option>
                                                                <option value="be or beng - bachelor of engineering">BE or BEng - Bachelor of Engineering</option>
                                                                <option value="bem- bachelor of event management">BEM- Bachelor of Event Management</option>
                                                                <option value="bfa- bachelor of fine arts">BFA- Bachelor of Fine Arts</option>
                                                                <option value="bfd- bachelor of fashion designing">BFD- Bachelor of Fashion Designing</option>
                                                                <option value="bjmc- bachelor of journalism and mass communication">BJMC- Bachelor of Journalism and Mass Communication</option>
                                                                <option value="bms- bachelor of management science">BMS- Bachelor of Management Science</option>
                                                                <option value="bpt- bachelor of physiotherapy">BPT- Bachelor of Physiotherapy</option>
                                                                <option value="bsw- bachelor of social work">BSW- Bachelor of Social Work</option>
                                                                <option value="bte - bachelor of technical education">BTE - Bachelor of Technical Education</option>
                                                                <option value="bttm- bachelor of travel and tourism management">BTTM- Bachelor of Travel and Tourism Management</option>
                                                                <option value="ca- chartered accountancy">CA- Chartered Accountancy</option>
                                                                <option value="cs- company secretary">CS- Company Secretary</option>
                                                                <option value="ctet - central teacher eligibility test">CTET - Central Teacher Eligibility Test</option>
                                                                <option value="d.ed (diploma in education)">D.Ed (Diploma in Education)</option>
                                                                <option value="d.pharma - diploma in pharmacy">D.Pharma - Diploma in Pharmacy</option>
                                                                <option value="e.f.p.m - executive fellow program in management">E.F.P.M - Executive Fellow Program In Management</option>
                                                                <option value="e.m.p - executive management programme">E.M.P - Executive Management Programme</option>
                                                                <option value="ecced">ECCed</option>
                                                                <option value="executive post graduate certificate (executive pg certificate)">Executive Post Graduate Certificate (Executive PG Certificate)</option>
                                                                <option value="executive post graduate programme (executive pg programme)">Executive Post Graduate Programme (Executive PG Programme)</option>
                                                                <option value="fellow programme (fellow programme)">Fellow Programme (Fellow Programme)</option>
                                                                <option value="graduation">GRADUATION</option>
                                                                <option value="htet - haryana teacher eligibility test">HTET - Haryana Teacher Eligibility Test</option>
                                                                <option value="international programme (international programme)">International Programme (International Programme)</option>
                                                                <option value="ix">IX</option>
                                                                <option value="jbt - junior basic training">JBT - Junior Basic Training</option>
                                                                <option value="junior high school">Junior High School</option>
                                                                <option value="ll.m - master of law">LL.M - Master of Law</option>
                                                                <option value="llb - bachelor of legislative law">LLB - Bachelor of Legislative Law</option>
                                                                <option value="m.com - master of commerce">M.Com - Master of Commerce</option>
                                                                <option value="m.d - doctor of medicine">M.D - Doctor of Medicine</option>
                                                                <option value="m.d.s - master of dental surgery">M.D.S - Master of Dental Surgery</option>
                                                                <option value="m.e - master of engineering">M.E - Master of Engineering</option>
                                                                <option value="m.ed - master of education">M.Ed - Master of Education</option>
                                                                <option value="m.ed - masters in education">M.Ed - Masters in Education</option>
                                                                <option value="m.ed ai -  artificial intelligence">M.Ed AI -  Artificial Intelligence</option>
                                                                <option value="m.f.a - master of fine arts">M.F.A - Master of Fine Arts</option>
                                                                <option value="m.f.c - master of finance and control">M.F.C - Master of Finance And Control</option>
                                                                <option value="m.pharma - master of pharmacy">M.Pharma - Master of Pharmacy</option>
                                                                <option value="m.phil - master of philosophy">M.Phil - Master of Philosophy</option>
                                                                <option value="m.s - master of science">M.S - Master of Science</option>
                                                                <option value="m.sc - master of science">M.Sc - Master of Science</option>
                                                                <option value="m.tech - master of technology">M.Tech - Master of Technology</option>
                                                                <option value="m.voc - master of vocational">M.Voc - Master of Vocational</option>
                                                                <option value="ma - master of arts">MA - Master of Arts</option>
                                                                <option value="management development programme (m.d.p)">Management Development Programme (M.D.P)</option>
                                                                <option value="master of architecture (m.arch)">Master of Architecture (M.Arch)</option>
                                                                <option value="master of arts in management (m.a.m)">Master of Arts in Management (M.A.M)</option>
                                                                <option value="master of arts in personal management (m.a.p.m)">Master of Arts in Personal Management (M.A.P.M)</option>
                                                                <option value="master of business economics (m.b.e)">Master of Business Economics (M.B.E)</option>
                                                                <option value="master of business laws (m.b.l)">Master of Business Laws (M.B.L)</option>
                                                                <option value="master of business management (m.b.m)">Master of Business Management (M.B.M)</option>
                                                                <option value="master of business studies (m.b.s)">Master of Business Studies (M.B.S)</option>
                                                                <option value="master of chirurgical (m.ch)">Master of Chirurgical (M.Ch)</option>
                                                                <option value="master of communication and journalism (m.c.j)">Master Of Communication And Journalism (M.C.J)</option>
                                                                <option value="master of comparative laws (m.c.l)">Master of Comparative Laws (M.C.L)</option>
                                                                <option value="master of computer management (m.c.m)">Master of Computer Management (M.C.M)</option>
                                                                <option value="master of corporate secretaryship (m.c.s)">Master of Corporate Secretaryship (M.C.S)</option>
                                                                <option value="master of film management (m.f.m)">Master of Film Management (M.F.M)</option>
                                                                <option value="master of financial services (m.f.s)">Master of Financial Services (M.F.S)</option>
                                                                <option value="master of fishery sciences (m.f.sc)">Master of Fishery Sciences (M.F.Sc)</option>
                                                                <option value="master of foreign trade (m.f.t)">Master of Foreign Trade (M.F.T)</option>
                                                                <option value="master of health science (m.h.sc)">Master Of Health Science (M.H.Sc)</option>
                                                                <option value="master of hospital administration (m.h.a)">Master of Hospital Administration (M.H.A)</option>
                                                                <option value="master of hospitality and hotel management (m.h.h.m)">Master of Hospitality And Hotel Management (M.H.H.M)</option>
                                                                <option value="master of hospitality management (m.h.m)">Master of Hospitality Management (M.H.M)</option>
                                                                <option value="master of human resource management (m.h.r.m)">Master of Human Resource Management (M.H.R.M)</option>
                                                                <option value="master of industrial relation and personal management (mir and pm)">Master of Industrial Relation and Personal Management (MIR and PM)</option>
                                                                <option value="master of international business (m.i.b)">Master of International Business (M.I.B)</option>
                                                                <option value="master of journalism (m.j)">Master of Journalism (M.J)</option>
                                                                <option value="master of labour management (m.l.m)">Master of Labour Management (M.L.M)</option>
                                                                <option value="master of laws (m.l)">Master of Laws (M.L)</option>
                                                                <option value="master of library and information science (m.l.i.sc)">Master of Library and Information Science (M.L.I.Sc)</option>
                                                                <option value="master of library science (m.l.sc)">Master of Library Science (M.L.Sc)</option>
                                                                <option value="master of management program (m.m.p)">Master of Management Program (M.M.P)</option>
                                                                <option value="master of management studies (m.m.s)">Master of Management Studies (M.M.S)</option>
                                                                <option value="master of marketing management (m.m.m)">Master of Marketing Management (M.M.M)</option>
                                                                <option value="master of occupational theraphy (m.o.t)">Master of Occupational Theraphy (M.O.T)</option>
                                                                <option value="master of performance management (m.p.m)">Master of Performance Management (M.P.M)</option>
                                                                <option value="master of performing arts (m.p.a)">Master of Performing Arts (M.P.A)</option>
                                                                <option value="master of personal management and industrial relation (mpm and ir)">Master of Personal Management and Industrial Relation (MPM and IR)</option>
                                                                <option value="master of personnel management (mpm)">Master of Personnel Management (MPM)</option>
                                                                <option value="master of physical education (m.p.ed)">Master Of Physical Education (M.P.Ed)</option>
                                                                <option value="master of physiotheraphy (m.p.t)">Master of Physiotheraphy (M.P.T)</option>
                                                                <option value="master of psychiatric epidemiology (m.p.e)">Master of Psychiatric Epidemiology (M.P.E)</option>
                                                                <option value="master of public health (m.p.h)">Master of Public Health (M.P.H)</option>
                                                                <option value="master of social dynamics (m.s.d)">Master of Social Dynamics (M.S.D)</option>
                                                                <option value="master of social work (m.s.w)">Master of Social Work (M.S.W)</option>
                                                                <option value="master of theology (m.th)">Master of Theology (M.Th)</option>
                                                                <option value="master of tourism administrations (m.t.a)">Master of Tourism Administrations (M.T.A)</option>
                                                                <option value="master of tourism management (m.t.m)">Master of Tourism Management (M.T.M)</option>
                                                                <option value="master of veterinary science (m.v.sc)">Master of Veterinary Science (M.V.Sc)</option>
                                                                <option value="master of visual arts (m.v.a)">Master of Visual Arts (M.V.A)</option>
                                                                <option value="masters in design (m.des)">Masters in Design (M.Des)</option>
                                                                <option value="masters in international management (m.i.m)">Masters in International Management (M.I.M)</option>
                                                                <option value="masters in public systems management (m.p.s.m)">Masters in Public Systems Management (M.P.S.M)</option>
                                                                <option value="masters of hospitality and tourism management (m.h.t.m)">Masters of Hospitality and Tourism Management (M.H.T.M)</option>
                                                                <option value="masters programme in international business (m.p.i.b)">Masters Programme in International Business (M.P.I.B)</option>
                                                                <option value="mba - master of business administration">MBA - Master of Business Administration</option>
                                                                <option value="mca">MCA</option>
                                                                <option value="mca - master of computer applications">MCA - Master of Computer Applications</option>
                                                                <option value="montessory">Montessory</option>
                                                                <option value="mscit">MSCIT</option>
                                                                <option value="net - national eligibility test">NET - National Eligibility Test</option>
                                                                <option value="no education">No Education</option>
                                                                <option value="ntt - nursery teacher training">NTT - Nursery Teacher Training</option>
                                                                <option value="pgdm - post graduate diploma in management">PGDM - Post Graduate Diploma in Management</option>
                                                                <option value="ph.d - doctor of philosophy">Ph.D - Doctor of Philosophy</option>
                                                                <option value="post graduation">Post Graduation</option>
                                                                <option value="primary">Primary</option>
                                                                <option value="stc mp">STC MP</option>
                                                            </select><span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-70-euw1" style={{ width: "224px" }}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="0" aria-disabled="false" aria-labelledby="select2-guardian_qualification-bh-container" aria-controls="select2-guardian_qualification-bh-container"><span className="select2-selection__rendered" id="select2-guardian_qualification-bh-container" role="textbox" aria-readonly="true" title=""><span className="select2-selection__placeholder"></span></span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
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
                                                            <Field type="number" className="form-control" name="parentDetails.Mother.contactNumber" placeholder="Enter mother's contact number" />
                                                            {errors?.parentDetails?.Mother?.contactNumber && touched?.parentDetails?.Mother?.contactNumber && <div className="text-danger">{errors?.parentDetails?.Mother?.contactNumber}</div>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="number" className="form-control" name="parentDetails.Father.contactNumber" placeholder="Enter father's contact number" />
                                                            {errors?.parentDetails?.Father?.contactNumber && touched?.parentDetails?.Father?.contactNumber && <div className="text-danger">{errors?.parentDetails?.Father?.contactNumber}</div>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="number" className="form-control" name="parentDetails.Guardian.contactNumber" placeholder="Enter guardian's contact number" />
                                                            {errors?.parentDetails?.Guardian?.contactNumber && touched?.parentDetails?.Guardian?.contactNumber && <div className="text-danger">{errors?.parentDetails?.Guardian?.contactNumber}</div>}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="mb-4">Academic Details</h4>
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
                                                <option value={values.academicDetails.previous.dropout} disabled>{values.academicDetails.previous.dropout ? "Yes" : "No"}</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </Field>
                                            {errors.academicDetails?.previous?.dropout && touched.academicDetails?.previous?.dropout && <div className="text-danger">{errors.academicDetails.previous.dropout}</div>}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Previous Medium</label>
                                            <Field as="select" name="academicDetails.previous.medium" className="form-select">
                                                <option value={values?.academicDetails?.previous?.medium} disabled>{values?.academicDetails?.previous?.medium}</option>
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
                                <div>
                                    <h4 className="mb-4">Scholar Details</h4>
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <label>Scholar ID</label>
                                            <Field name="scholarDetails.scholarID" type="text" placeholder="Enter Scholar ID" className="form-control" />
                                            {errors.scholarDetails?.scholarID && touched.scholarDetails?.scholarID && <div className="text-danger">{errors.scholarDetails?.scholarID}</div>}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Scholarship Type</label>
                                            <Field name="scholarDetails.scholarshipType" as="select" className="form-select">
                                                <option value={values?.scholarDetails?.scholarshipType} disabled>
                                                    {values?.scholarDetails?.scholarshipType || "Select Scholarship Type"}
                                                </option>
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
                                    <h4 className="mb-4">Bank Details</h4>
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

                                <div>
                                    <h4 className="mb-4">Documents</h4>
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <label>Marksheet</label>
                                            {student?.documents?.marksheet ? (
                                                <div>
                                                    {editDocument !== "marksheet" ? (
                                                        <>
                                                            {student.documents?.marksheet ? <a href={student.documents.marksheet} download="marksheet" className='w-50 btn btn-primary mt-2 me-2'>Download</a> : "(No Image Found)"}
                                                            <button type="button" className="btn btn-danger mt-2 w-25" onClick={() => setEditDocument("marksheet")}>Edit</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Field name="documents.marksheet" type="file"
                                                                accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter marksheet" className="form-control mt-2" onChange={(e) => submitImage(e.target.files[0], "documents.marksheet")} />
                                                            {errors.documents?.marksheet && touched.documents?.marksheet && <div className="text-danger">{errors.documents?.marksheet}</div>}
                                                        </>
                                                    )}
                                                </div>
                                            ) : (
                                                <>
                                                    <Field name="documents.marksheet" type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter marksheet" className="form-control mt-2" onChange={(e) => submitImage(e.target.files[0], "documents.marksheet")} />
                                                    {errors.documents?.marksheet && touched.documents?.marksheet && <div className="text-danger">{errors.documents?.marksheet}</div>}
                                                </>
                                            )}
                                        </div>

                                        {/* Transfer Certificate */}
                                        <div className="col-md-4 mb-3">
                                            <label>Transfer Certificate</label>
                                            {student?.documents?.transferCertificate ? (
                                                <div>
                                                    {editDocument !== "transferCertificate" ? (
                                                        <>
                                                            {student.documents?.transferCertificate ? <a href={student.documents.transferCertificate} download="transferCertificate" className='w-50 btn btn-primary mt-2 me-2'>Download</a> : "(No Image Found)"}
                                                            <button type="button" className="btn btn-danger mt-2 w-25" onClick={() => setEditDocument("transferCertificate")}>Edit</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Field name="documents.transferCertificate" type="file"
                                                                accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter transferCertificate" className="form-control mt-2" onChange={(e) => submitImage(e.target.files[0], "documents.transferCertificate")} />
                                                            {errors.documents?.transferCertificate && touched.documents?.transferCertificate && <div className="text-danger">{errors.documents?.transferCertificate}</div>}
                                                        </>
                                                    )}
                                                </div>
                                            ) : (
                                                <>
                                                    <Field name="documents.transferCertificate" type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter transferCertificate" className="form-control mt-2" onChange={(e) => submitImage(e.target.files[0], "documents.transferCertificate")} />
                                                    {errors.documents?.transferCertificate && touched.documents?.transferCertificate && <div className="text-danger">{errors.documents?.transferCertificate}</div>}
                                                </>
                                            )}
                                        </div>

                                        {/* Migration Certificate */}
                                        <div className="col-md-4 mb-3">
                                            <label>Migration Certificate</label>
                                            {student?.documents?.migrationCertificate ? (
                                                <div>
                                                    {editDocument !== "migrationCertificate" ? (
                                                        <>
                                                            {student.documents?.migrationCertificate ? <a href={student.documents.migrationCertificate} download="migrationCertificate" className='w-50 btn btn-primary mt-2 me-2'>Download</a> : "(No Image Found)"}
                                                            <button type="button" className="btn btn-danger mt-2 w-25" onClick={() => setEditDocument("migrationCertificate")}>Edit</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Field name="documents.migrationCertificate" type="file"
                                                                accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter migration certificate" className="form-control" onChange={(e) => submitImage(e.target.files[0], "documents.migrationCertificate")} />
                                                            {errors.documents?.migrationCertificate && touched.documents?.migrationCertificate && <div className="text-danger">{errors.documents?.migrationCertificate}</div>}
                                                        </>
                                                    )}
                                                </div>
                                            ) : (
                                                <>
                                                    <Field name="documents.migrationCertificate" type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter migration certificate" className="form-control" onChange={(e) => submitImage(e.target.files[0], "documents.migrationCertificate")} />
                                                    {errors.documents?.migrationCertificate && touched.documents?.migrationCertificate && <div className="text-danger">{errors.documents?.migrationCertificate}</div>}
                                                </>
                                            )}
                                        </div>

                                        {/* Aadhar Card Front */}
                                        <div className="col-md-4 mb-3">
                                            <label>Aadhar Card Front</label>
                                            {student?.documents?.aadharCard?.front ? (
                                                <div>
                                                    {editDocument !== "aadharCardFront" ? (
                                                        <>
                                                            {student.documents.aadharCard.front ? <a href={student.documents.aadharCard.front} download="aadharCardFront" className='w-50 btn btn-primary mt-2 me-2'>Download</a> : "(No Image Found)"}
                                                            <button type="button" className="btn btn-danger mt-2 w-25" onClick={() => setEditDocument("aadharCardFront")}>Edit</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Field name="documents.aadharCard.front" type="file"
                                                                accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter aadhar card front" className="form-control" onChange={(e) => submitImage(e.target.files[0], "documents.aadharCard.front")} />
                                                            {errors.documents?.aadharCard?.front && touched.documents?.aadharCard?.front && <div className="text-danger">{errors.documents?.aadharCard?.front}</div>}
                                                        </>
                                                    )}
                                                </div>
                                            ) : (
                                                <>
                                                    <Field name="documents.aadharCard.front" type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter aadhar card front" className="form-control" onChange={(e) => submitImage(e.target.files[0], "documents.aadharCard.front")} />
                                                    {errors.documents?.aadharCard?.front && touched.documents?.aadharCard?.front && <div className="text-danger">{errors.documents?.aadharCard?.front}</div>}
                                                </>
                                            )}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Aadhar Card Back</label>
                                            {student?.documents?.aadharCard?.back ? (
                                                <div>
                                                    {editDocument !== "aadharCardBack" ? (
                                                        <>
                                                            {student.documents.aadharCard.back ? <a href={student.documents.aadharCard.back} download="aadharCardBack" className='w-50 btn btn-primary mt-2 me-2'>Download</a> : "(No Image Found)"}
                                                            <button type="button" className="btn btn-danger mt-2 w-25" onClick={() => setEditDocument("aadharCardBack")}>Edit</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Field name="documents.aadharCard.back" type="file"
                                                                accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter aadhar card back" className="form-control" onChange={(e) => submitImage(e.target.files[0], "documents.aadharCard.back")} />
                                                            {errors.documents?.aadharCard?.back && touched.documents?.aadharCard?.back && <div className="text-danger">{errors.documents?.aadharCard?.back}</div>}
                                                        </>
                                                    )}
                                                </div>
                                            ) : (
                                                <>
                                                    <Field name="documents.aadharCard.back" type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter aadhar card back" className="form-control" onChange={(e) => submitImage(e.target.files[0], "documents.aadharCard.back")} />
                                                    {errors.documents?.aadharCard?.back && touched.documents?.aadharCard?.back && <div className="text-danger">{errors.documents?.aadharCard?.back}</div>}
                                                </>
                                            )}
                                        </div>

                                        {/* PAN Card Front */}
                                        <div className="col-md-4 mb-3">
                                            <label>PAN Card Front</label>
                                            {student?.documents?.PANcard?.front ? (
                                                <div>
                                                    {editDocument !== "PANCardFront" ? (
                                                        <>
                                                            {student.documents.PANcard.front ? <a href={student.documents.PANcard.front} download="PANCardFront" className='w-50 btn btn-primary mt-2 me-2'>Download</a> : "(No Image Found)"}
                                                            <button type="button" className="btn btn-danger mt-2 w-25" onClick={() => setEditDocument("PANCardFront")}>Edit</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Field name="documents.PANcard.front" type="file"
                                                                accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter PAN card front" className="form-control" onChange={(e) => submitImage(e.target.files[0], "documents.PANcard.front")} />
                                                            {errors.documents?.PANcard?.front && touched.documents?.PANcard?.front && <div className="text-danger">{errors.documents?.PANcard?.front}</div>}
                                                        </>
                                                    )}
                                                </div>
                                            ) : (
                                                <>
                                                    <Field name="documents.PANcard.front" type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter PAN card front" className="form-control" onChange={(e) => submitImage(e.target.files[0], "documents.PANcard.front")} />
                                                    {errors.documents?.PANcard?.front && touched.documents?.PANcard?.front && <div className="text-danger">{errors.documents?.PANcard?.front}</div>}
                                                </>
                                            )}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>PAN Card Back</label>
                                            {student?.documents?.PANcard?.back ? (
                                                <div>
                                                    {editDocument !== "PANcard.back" ? (
                                                        <>
                                                            {student.documents.PANcard?.back ? (
                                                                <a
                                                                    href={student.documents.PANcard?.back}
                                                                    download="PANCardBack"
                                                                    className="w-50 btn btn-primary mt-2 me-2"
                                                                >
                                                                    Download
                                                                </a>
                                                            ) : (
                                                                "(No Image Found)"
                                                            )}
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger mt-2 w-25"
                                                                onClick={() => setEditDocument("PANcard.back")}
                                                            >
                                                                Edit
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Field
                                                                name="documents.PANcard.back"
                                                                type="file"
                                                                accept=".pdf,.jpg,.jpeg,.png"
                                                                placeholder="Enter pan card back"
                                                                className="form-control"
                                                                onChange={(e) => submitImage(e.target.files[0], "documents.PANcard.back")}
                                                            />
                                                            {errors.documents?.PANcard?.back && touched.documents?.PANcard?.back && (
                                                                <div className="text-danger">{errors.documents?.PANcard?.back}</div>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            ) : (
                                                <>
                                                    <Field
                                                        name="documents.PANcard.back"
                                                        type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png"
                                                        placeholder="Enter pan card back"
                                                        className="form-control"
                                                        onChange={(e) => submitImage(e.target.files[0], "documents.PANcard.back")}
                                                    />
                                                    {errors.documents?.PANcard?.back && touched.documents?.PANcard?.back && (
                                                        <div className="text-danger">{errors.documents?.PANcard?.back}</div>
                                                    )}
                                                </>
                                            )}
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <label>Birth Certificate</label>
                                            {student?.documents?.birthCertificate ? (
                                                <div>
                                                    {editDocument !== "birthCertificate" ? (
                                                        <>
                                                            {student.documents.birthCertificate ? <a href={student.documents.birthCertificate} download="Birth Certificate" className='w-50 btn btn-primary mt-2 me-2'>Download</a> : "(No Image Found)"}
                                                            <button type="button" className="btn btn-danger mt-2 w-25" onClick={() => setEditDocument("birthCertificate")}>Edit</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Field name="documents.birthCertificate" type="file"
                                                                accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter birth certificate" className="form-control" onChange={(e) => submitImage(e.target.files[0], "documents.birthCertificate")} />
                                                            {errors.documents?.birthCertificate && touched.documents?.birthCertificate && <div className="text-danger">{errors.documents?.birthCertificate}</div>}
                                                        </>
                                                    )}
                                                </div>
                                            ) : (
                                                <>
                                                    <Field name="documents.birthCertificate" type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter birth certificate" className="form-control" onChange={(e) => submitImage(e.target.files[0], "documents.birthCertificate")} />
                                                    {errors.documents?.birthCertificate && touched.documents?.birthCertificate && <div className="text-danger">{errors.documents?.birthCertificate}</div>}
                                                </>
                                            )}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Scholarship</label>
                                            {student?.documents?.scholarship ? (
                                                <div>
                                                    {editDocument !== "scholarship" ? (
                                                        <>
                                                            {student.documents.scholarship ? <a href={student.documents.scholarship} download="Scholarship" className='w-50 btn btn-primary mt-2 me-2'>Download</a> : "(No Image Found)"}
                                                            <button type="button" className="btn btn-danger mt-2 w-25" onClick={() => setEditDocument("scholarship")}>Edit</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Field name="documents.scholarship" type="file"
                                                                accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter scholarship" className="form-control" onChange={(e) => submitImage(e.target.files[0], "documents.scholarship")} />
                                                            {errors.documents?.scholarship && touched.documents?.scholarship && <div className="text-danger">{errors.documents?.scholarship}</div>}
                                                        </>
                                                    )}
                                                </div>
                                            ) : (
                                                <>
                                                    <Field name="documents.scholarship" type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png" placeholder="Enter scholarship" className="form-control" onChange={(e) => submitImage(e.target.files[0], "documents.scholarship")} />
                                                    {errors.documents?.scholarship && touched.documents?.scholarship && <div className="text-danger">{errors.documents?.scholarship}</div>}
                                                </>
                                            )}
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Caste Certificate</label>
                                            {student?.documents?.casteCertificate ? (
                                                <div>
                                                    {editDocument !== "casteCertificate" ? (
                                                        <>
                                                            {student.documents.casteCertificate ? (
                                                                <a href={student.documents.casteCertificate} download="CasteCertificate" className="w-50 btn btn-primary mt-2 me-2">
                                                                    Download
                                                                </a>
                                                            ) : (
                                                                "(No Image Found)"
                                                            )}
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger mt-2 w-25"
                                                                onClick={() => setEditDocument("casteCertificate")}
                                                            >
                                                                Edit
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Field
                                                                name="documents.casteCertificate"
                                                                type="file"
                                                                accept=".pdf,.jpg,.jpeg,.png"
                                                                placeholder="Enter caste certificate"
                                                                className="form-control"
                                                                onChange={(e) => submitImage(e.target.files[0], "documents.casteCertificate")}
                                                            />
                                                            {errors.documents?.casteCertificate && touched.documents?.casteCertificate && (
                                                                <div className="text-danger">{errors.documents?.casteCertificate}</div>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            ) : (
                                                <>
                                                    <Field
                                                        name="documents.casteCertificate"
                                                        type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png"
                                                        placeholder="Enter caste certificate"
                                                        className="form-control"
                                                        onChange={(e) => submitImage(e.target.files[0], "documents.casteCertificate")}
                                                    />
                                                    {errors.documents?.casteCertificate && touched.documents?.casteCertificate && (
                                                        <div className="text-danger">{errors.documents?.casteCertificate}</div>
                                                    )}
                                                </>
                                            )}
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <label>Bank Passbook</label>
                                            {student?.documents?.bankPassbook ? (
                                                <div>
                                                    {editDocument !== "bankPassbook" ? (
                                                        <>
                                                            {student.documents.bankPassbook ? (
                                                                <a href={student.documents.bankPassbook} download="BankPassbook" className="w-50 btn btn-primary mt-2 me-2">
                                                                    Download
                                                                </a>
                                                            ) : (
                                                                "(No Image Found)"
                                                            )}
                                                            <button type="button" className="btn btn-danger mt-2 w-25" onClick={() => setEditDocument("bankPassbook")}>
                                                                Edit
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Field
                                                                name="documents.bankPassbook"
                                                                type="file"
                                                                accept=".pdf,.jpg,.jpeg,.png"
                                                                placeholder="Enter bank passbook"
                                                                className="form-control"
                                                                onChange={(e) => submitImage(e.target.files[0], "documents.bankPassbook")}
                                                            />
                                                            {errors.documents?.bankPassbook && touched.documents?.bankPassbook && (
                                                                <div className="text-danger">{errors.documents?.bankPassbook}</div>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            ) : (
                                                <>
                                                    <Field
                                                        name="documents.bankPassbook"
                                                        type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png"
                                                        placeholder="Enter bank passbook"
                                                        className="form-control"
                                                        onChange={(e) => submitImage(e.target.files[0], "documents.bankPassbook")}
                                                    />
                                                    {errors.documents?.bankPassbook && touched.documents?.bankPassbook && (
                                                        <div className="text-danger">{errors.documents?.bankPassbook}</div>
                                                    )}
                                                </>
                                            )}
                                        </div>

                                        {/* Other Certificate */}
                                        <div className="col-md-4 mb-3">
                                            <label>Other Certificate</label>
                                            {student?.documents?.otherCertificate ? (
                                                <div>
                                                    {editDocument !== "otherCertificate" ? (
                                                        <>
                                                            {student.documents.otherCertificate ? (
                                                                <a href={student.documents.otherCertificate} download="OtherCertificate" className="w-50 btn btn-primary mt-2 me-2">
                                                                    Download
                                                                </a>
                                                            ) : (
                                                                "(No Image Found)"
                                                            )}
                                                            <button type="button" className="btn btn-danger mt-2 w-25" onClick={() => setEditDocument("otherCertificate")}>
                                                                Edit
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Field
                                                                name="documents.otherCertificate"
                                                                type="file"
                                                                accept=".pdf,.jpg,.jpeg,.png"
                                                                placeholder="Enter other certificate"
                                                                className="form-control"
                                                                onChange={(e) => submitImage(e.target.files[0], "documents.otherCertificate")}
                                                            />
                                                            {errors.documents?.otherCertificate && touched.documents?.otherCertificate && (
                                                                <div className="text-danger">{errors.documents?.otherCertificate}</div>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            ) : (
                                                <>
                                                    <Field
                                                        name="documents.otherCertificate"
                                                        type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png"
                                                        placeholder="Enter other certificate"
                                                        className="form-control"
                                                        onChange={(e) => submitImage(e.target.files[0], "documents.otherCertificate")}
                                                    />
                                                    {errors.documents?.otherCertificate && touched.documents?.otherCertificate && (
                                                        <div className="text-danger">{errors.documents?.otherCertificate}</div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end mt-4">
                                    <button type="reset" className="btn btn-danger w-25 me-3" onClick={() => { path === "student-info" ? Navigate('/' + path) : Navigate("/admit-students"); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-success w-25 ms-3" >
                                        Submit
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default EditStudentData
