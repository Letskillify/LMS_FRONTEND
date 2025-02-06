import { Field, Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../../Controller/MainProvider';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { EditApi, useImageUploader } from '../../Custom Hooks/CustomeHook';

function EditProfile() {

    const [initialValues, setinitialValues] = useState()
    const [isInput, setisInput] = useState()
    const { userId } = useContext(MainContext)
    const Navigate = useNavigate()
    const location = useLocation();
    const { institute} = location.state || {};
    const { uploadedData, handleImageUpload } = useImageUploader();
    const { fetchInstitute } = useContext(MainContext);


    useEffect(() => {
        if (institute) {
            setinitialValues({
                instituteId: institute?.instituteId || "",
                name: institute?.name || "",
                contactInfo: {
                    email: institute?.contactInfo?.email || "",
                    mobile: institute?.contactInfo?.mobile || "",
                    whatsapp: institute?.contactInfo?.whatsapp || "",
                    landline: institute?.contactInfo?.landline || "",
                    website: institute?.contactInfo?.website || "",
                },
                address: {
                    line1: institute?.address?.line1 || "",
                    line2: institute?.address?.line2 || "",
                    city: institute?.address?.city || "",
                    state: institute?.address?.state || "",
                    country: institute?.address?.country || "",
                    postalCode: institute?.address?.postalCode || "",
                    MapLocationUrl: institute?.address?.MapLocationUrl || "",
                },
                establishedYear: institute?.establishedYear || 0,
                NoOfCoursesOffered: institute?.NoOfCoursesOffered || 0,
                NoOfStaffsEnrolled: institute?.NoOfStaffsEnrolled || 0,
                NoOfStudentsEnrolled: institute?.NoOfStudentsEnrolled || 0,
                disableStudentAdmission: institute?.disableStudentAdmission || false,
                acceptScholarshipAdmission: institute?.acceptScholarshipAdmission || false,
                libraryFacilities: institute?.libraryFacilities || false,
                cafeteriaFacilities: institute?.cafeteriaFacilities || false,
                hostelFacilities: institute?.hostelFacilities || false,
                accreditation: institute?.accreditation || "",
                instituteType: institute?.instituteType || "",
                logo: null,
                aboutInstitute: institute?.aboutInstitute || "",
                affiliationNo: institute?.affiliationNo || "",
                affiliationYear: institute?.affiliationYear || "",
                affiliationName: institute?.affiliationName || "",
                AuthorizedPerson: {
                    name: institute?.AuthorizedPerson?.name || "",
                    designation: institute?.AuthorizedPerson?.designation || "",
                    IDproof: institute?.AuthorizedPerson?.IDproof || "",
                    contactInfo: {
                        email: institute?.AuthorizedPerson?.contactInfo?.email || "",
                        mobile: institute?.AuthorizedPerson?.contactInfo?.mobile || "",
                        whatsapp: institute?.AuthorizedPerson?.contactInfo?.whatsapp || "",
                        alternateContact: institute?.AuthorizedPerson?.contactInfo?.alternateContact || "",
                        address: {
                            houseNo: institute?.AuthorizedPerson?.contactInfo?.address?.houseNo || "",
                            streetName: institute?.AuthorizedPerson?.contactInfo?.address?.streetName || "",
                            city: institute?.AuthorizedPerson?.contactInfo?.address?.city || "",
                            pincode: institute?.AuthorizedPerson?.contactInfo?.address?.pincode || "",
                            state: institute?.AuthorizedPerson?.contactInfo?.address?.state || "",
                            country: institute?.AuthorizedPerson?.contactInfo?.address?.country || "",
                        },
                        signature: institute?.AuthorizedPerson?.contactInfo?.signature || "",
                    },
                },
                bankDetails: {
                    accountHolderName: institute?.bankDetails?.accountHolderName || "",
                    bankName: institute?.bankDetails?.bankName || "",
                    branchName: institute?.bankDetails?.branchName || "",
                    accountNumber: institute?.bankDetails?.accountNumber || "",
                    ifscCode: institute?.bankDetails?.ifscCode || "",
                    upiID: institute?.bankDetails?.upiID || "",
                    panNo: institute?.bankDetails?.panNo || "",
                },
                document: {
                    ISOcertificate: null,
                    GSTcertificate: null,
                    AffiliationCertificate: null,
                    PANcard: null,
                    MSME: null,
                    TIN: null,
                    NAAC: null,
                    UGCapprovedLetter: null,
                },
                coursesOffered: institute?.coursesOffered || [],
                status: institute?.status || "Pending Verification",
                feedback: {
                    review: institute?.feedback?.review || "",
                    rating: institute?.feedback?.rating || "",
                },
                loginPassword: institute?.loginPassword || "",
                passwordResetToken: institute?.passwordResetToken || "",
                passwordResetExpires: institute?.passwordResetExpires || "",
            });
        }
    }, [institute]);
    if (!initialValues) {
        return <div>Loading...</div>; // Or any placeholder if data isn't loaded yet
    }


    const HandleSubmit = (values) => {
        const data = {
            ...values,
            logo: uploadedData?.logo || institute?.logo,
            AuthorizedPerson: {
                ...values.AuthorizedPerson,
                contactInfo: {
                    ...values.AuthorizedPerson.contactInfo,
                    signature: uploadedData?.signature || institute?.AuthorizedPerson?.contactInfo?.signature,
                },
            },
            document: {
                ISOcertificate: uploadedData?.ISOcertificate || institute?.document?.ISOcertificate,
                GSTcertificate: uploadedData?.GSTcertificate || institute?.document?.GSTcertificate,
                AffiliationCertificate: uploadedData?.AffiliationCertificate || institute?.document?.AffiliationCertificate,
                PANcard: uploadedData?.PANcard || institute?.document?.PANcard,
                MSME: uploadedData?.MSME || institute?.document?.MSME,
                TIN: uploadedData?.TIN || institute?.document?.TIN,
                NAAC: uploadedData?.NAAC || institute?.document?.NAAC,
                UGCapprovedLetter: uploadedData?.UGCapprovedLetter || institute?.document?.UGCapprovedLetter,
            },
        };
        console.log(data);
        EditApi(`/api/institute/update/${userId}`, data, "User updated Successfully")
        Navigate("/instituteprofile")
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    console.log(institute);

    return (
        <>
            <div className="modal-body">
                <div className="nav-align-top mb-4">

                    <Formik initialValues={initialValues} onSubmit={HandleSubmit}>
                        {({ values, errors, touched, resetForm }) => (
                            <Form className="border p-4 shadow rounded bg-white">
                                <h3 className='text-center'>Institute Profile Edit</h3>
                                <h6 className='text-center text-muted'>ID:- {institute?._id}</h6>
                                <hr />
                                <div className='mt-2'>
                                    <h4 className="mb-4">Contact :-</h4>
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <label>Name <span className='text-danger'>*</span></label>
                                            <Field name="name" type="text" className="form-control" placeholder="Enter Your Name">

                                            </Field>
                                            < div className="text-danger">{errors?.name}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Contact No. <span className='text-danger'>*</span></label>
                                            <Field name="contactInfo.mobile" type="number" className="form-control" placeholder="Enter Your Mobile Number">

                                            </Field>
                                            < div className="text-danger">{errors?.contact?.mobile}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Contact Email <span className='text-danger'>*</span></label>
                                            <Field name="contactInfo.email" type="email" className="form-control" placeholder="Enter Your Mobile email" readOnly>

                                            </Field>
                                            < div className="text-danger">{errors?.contact?.email}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>WhatsApp No. <span className='text-danger'>*</span></label>
                                            <Field name="contactInfo.whatsapp" type="number" className="form-control" placeholder="Enter Your WhatsApp No.">

                                            </Field>
                                            < div className="text-danger">{errors?.contact?.whatsapp}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Landline No. <span className='text-danger'>*</span></label>
                                            <Field name="contactInfo.landline" type="number" className="form-control" placeholder="Enter Your Landline No.">

                                            </Field>
                                            < div className="text-danger">{errors?.contact?.landline}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Website <span className='text-danger'>*</span></label>
                                            <Field name="contactInfo.website" type="text" className="form-control" placeholder="Enter Your Website">

                                            </Field>
                                            < div className="text-danger">{errors?.contact?.website}</div>
                                        </div>
                                        {/* <div className="col-md-4 mb-3">
                                            <label>Admission Date <span className='text-danger'>*</span></label>
                                            <Field name="enrollmentDetails.admissionDate" type="date" placeholder="Enter admission date" className="form-control" />

                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Institute type<span className='text-danger'>*</span></label>
                                            <Field as="select" name="enrollmentDetails.instituteType" className="form-control">
                                                <option value="" label="Select institute type" />
                                                <option value="Institute" label="Institute" />
                                                <option value="College" label="College" />
                                                <option value="School" label="School" />
                                            </Field>

                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <label>Course/Class/Degree <span className='text-danger'>*</span></label>
                                            <Field name="enrollmentDetails.course" type="text" placeholder="Enter Course/Class/Degree " className="form-control" />

                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>School/College/Institute Name <span className='text-danger'>*</span></label>
                                            <Field name="enrollmentDetails.instituteName" type="text" placeholder="Enter instituteName" className="form-control" />

                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>School/College/Intituite Location <span className='text-danger'>*</span></label>
                                            <Field name="enrollmentDetails.instituteLocation" type="text" placeholder="Enter institute Location" className="form-control" />

                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>School/College/Institute Medium <span className='text-danger'>*</span></label>
                                            <Field name="enrollmentDetails.instituteMedium" as="select" className="form-select">
                                                <option value="">Select</option>
                                                <option value="English">English</option>
                                                <option value="Hindi">Hindi</option>
                                                <option value="Other">Other</option>
                                            </Field>

                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>School/College/Intituite Session</label>
                                            <Field name="enrollmentDetails.instituteSession" type="text" placeholder="Enter institute Session" className="form-control" />

                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Board/University Name <span className='text-danger'>*</span></label>
                                            <Field name="enrollmentDetails.boardName" type="text" placeholder="Enter institute board Name" className="form-control" />

                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Course Stream <span className='text-danger'>*</span></label>
                                            <Field name="enrollmentDetails.courseStream" type="text" placeholder="Enter institute course Stream" className="form-control" />

                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Enrollment Status <span className='text-danger'>*</span></label>
                                            <Field name="enrollmentDetails.enrollmentStatus" as="select" className="form-select">
                                                <option value="">Select</option>
                                                <option value="Active">Active</option>
                                                <option value="Deactive">Deactive</option>
                                            </Field>

                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Admission No. <span className='text-danger'>*</span></label>
                                            <Field name="enrollmentDetails.admissionNO" type="text" placeholder="Enter admission no." className="form-control" />

                                        </div> */}
                                    </div>
                                </div>
                                {/* Adress  */}
                                <div>
                                    <h4 className="mb-4">Address :-</h4>
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <label>Line1 <span className='text-danger'>*</span></label>
                                            <Field name="address.line1" type="text" className="form-control" placeholder="Enter Your Line1">

                                            </Field>
                                            < div className="text-danger">{errors?.address?.line1}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Line2 <span className='text-danger'>*</span></label>
                                            <Field name="address.line2" type="text" className="form-control" placeholder="Enter Your Line2">

                                            </Field>
                                            < div className="text-danger">{errors?.address?.line2}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>City <span className='text-danger'>*</span></label>
                                            <Field name="address.city" type="text" className="form-control" placeholder="Enter Your City">

                                            </Field>
                                            < div className="text-danger">{errors?.address?.city}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>State <span className='text-danger'>*</span></label>
                                            <Field name="address.state" type="text" className="form-control" placeholder="Enter Your State">

                                            </Field>
                                            < div className="text-danger">{errors?.address?.state}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Country <span className='text-danger'>*</span></label>
                                            <Field name="address.country" type="text" className="form-control" placeholder="Enter Your Country">

                                            </Field>
                                            < div className="text-danger">{errors?.address?.country}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>PostalCode <span className='text-danger'>*</span></label>
                                            <Field name="address.postalCode" type="number" className="form-control" placeholder="Enter Your PostalCode">

                                            </Field>
                                            < div className="text-danger">{errors?.address?.postalCode}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>MapLocationURL <span className='text-danger'>*</span></label>
                                            <Field name="address.MapLocationUrl" type="url" className="form-control" placeholder="Enter Your MapLocationURL">

                                            </Field>
                                            < div className="text-danger">{errors?.address?.city}</div>
                                        </div>
                                    </div>
                                </div>
                                {/* other detail */}
                                <div>
                                    <h4 className="mb-4">Other Information :-</h4>
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <label>Established Year <span className='text-danger'>*</span></label>
                                            <Field name="establishedYear" type="number" className="form-control" placeholder="Enter Your Established Year">

                                            </Field>
                                            < div className="text-danger">{errors?.establishedYear}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>No. Of Courses Offered <span className='text-danger'>*</span></label>
                                            <Field name="NoOfCoursesOffered" type="number" className="form-control" placeholder="Enter Your No.Of Courses Offered">

                                            </Field>
                                            < div className="text-danger">{errors?.NoOfCoursesOffered}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>No. Of Staffs Enrolled <span className='text-danger'>*</span></label>
                                            <Field name="NoOfStaffsEnrolled" type="number" className="form-control" placeholder="Enter Your No. Of Staffs Enrolled  ">

                                            </Field>
                                            < div className="text-danger">{errors?.NoOfStaffsEnrolled}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>No. Of Students Enrolled<span className='text-danger'>*</span></label>
                                            <Field name="NoOfStudentsEnrolled" type="number" className="form-control" placeholder="Enter Your No. Of Students Enrolled">

                                            </Field>
                                            < div className="text-danger">{errors?.NoOfStudentsEnrolled}</div>
                                        </div>

                                        <div className="col-md-4 mb-3 ">
                                            <label>Accreditation <span className='text-danger'>*</span></label>
                                            <Field name="accreditation" type="text" className="form-control" placeholder="Enter Your Accreditation">

                                            </Field>

                                            < div className="text-danger">{errors?.accreditation}</div>
                                        </div>
                                        <div className="col-md-4 mb-3 ">
                                            <label>Institute Type <span className='text-danger'>*</span></label>
                                            <Field name="instituteType" type="text" className="form-select" as="select" placeholder="Enter Your Institute Type">
                                                <option value="">Select</option>
                                                <option value="School">School</option>
                                                <option value="Collage">Collage</option>
                                                <option value="University">University</option>
                                                <option value="Coaching Center">Coaching Center</option>
                                            </Field>
                                            < div className="text-danger">{errors?.instituteType}</div>
                                        </div>
                                        <div className="col-md-4 mb-3 ">
                                            <label>Logo <span className='text-danger'>*</span></label>
                                            {institute?.logo ? (
                                                <div>
                                                    {isInput === "logo" ? (
                                                        <Field
                                                            name="logo"
                                                            type="file"
                                                            className="form-control"
                                                            placeholder="Enter Your Logo"
                                                            onChange={(e) => handleImageUpload(e, "logo")}
                                                        />
                                                    ) : (
                                                        <div>
                                                            <a href={values.logo} target="_blank" rel="noopener noreferrer" className="btn btn-primary me-2 w-50 text-white">Download</a>
                                                            <button type="button" className="btn btn-success w-25" onClick={() => setisInput("logo")}>Edit</button>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <Field name="logo" type="file" onChange={(e) => handleImageUpload(e, "logo")} className="form-control">
                                                </Field>
                                            )}
                                            < div className="text-danger">{errors?.logo}</div>
                                        </div>
                                        <div className="col-md-4 mb-3 ">
                                            <label>Affiliation No <span className='text-danger'>*</span></label>
                                            <Field name="affiliationNo" type="text" className="form-control" placeholder="Affiliation No">

                                            </Field>
                                            < div className="text-danger">{errors?.affiliationNo}</div>
                                        </div>
                                        <div className="col-md-4 mb-3 ">
                                            <label> Affiliation Year <span className='text-danger'>*</span></label>
                                            <Field name="affiliationYear" type="text" className="form-control" placeholder="Affiliation Year">

                                            </Field>
                                            < div className="text-danger">{errors?.affiliationYear}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Affiliation Name <span className='text-danger'>*</span></label>
                                            <Field name="affiliationName" type="text" className="form-control" placeholder="Affiliation Name">

                                            </Field>
                                            < div className="text-danger">{errors?.affiliationName}</div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="aboutInstitute" className="form-label">
                                                About Institute <span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                name="aboutInstitute"
                                                as="textarea"
                                                id="aboutInstitute"
                                                className="form-control shadow-sm rounded-3"
                                                rows="4"
                                                placeholder="Write about the institute here..."
                                                style={{
                                                    resize: "none",
                                                    border: "1px solid #ccc",
                                                    fontFamily: "Arial, sans-serif",
                                                    fontSize: "14px",
                                                    padding: "10px 15px",
                                                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                                    backgroundColor: "white",
                                                    borderRadius: "5px",
                                                }}
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                {errors?.aboutInstitute}
                                            </div>
                                        </div>
                                        <div className='mb-3'>
                                            <div className="col-md-4">
                                                <Field
                                                    name="disableStudentAdmission"
                                                    type="checkbox"
                                                    className="form-check-input me-2"
                                                >
                                                </Field>
                                                <label>
                                                    Accept Disable Student Admission ? <span className="text-danger">*</span>
                                                </label>
                                                < div className="text-danger">{errors?.disableStudentAdmission}</div>

                                            </div>
                                            <div className="col-md-4">
                                                <Field
                                                    name="acceptScholarshipAdmission"
                                                    type="checkbox"
                                                    className="form-check-input me-2"
                                                >
                                                </Field>
                                                <label>
                                                    Accept Scholarship Admission ?  <span className="text-danger">*</span>
                                                </label>
                                                < div className="text-danger">{errors?.acceptScholarshipAdmission}</div>
                                            </div>
                                            <div className="col-md-4 ">
                                                <Field
                                                    name="libraryFacilities"
                                                    type="checkbox"
                                                    className="form-check-input me-2"
                                                >
                                                </Field>
                                                <label>
                                                    Provide Library Facilities ?  <span className="text-danger">*</span>
                                                </label>
                                                < div className="text-danger">{errors?.libraryFacilities}</div>

                                            </div>
                                            <div className="col-md-4 ">
                                                <Field
                                                    name="cafeteriaFacilities"
                                                    type="checkbox"
                                                    className="form-check-input me-2"
                                                >
                                                </Field>
                                                <label>
                                                    Provide Cafeteria Facilities ?  <span className="text-danger">*</span>
                                                </label>
                                                < div className="text-danger">{errors?.cafeteriaFacilities}</div>

                                            </div>
                                            <div className="col-md-4 ">
                                                <Field
                                                    name="hostelFacilities"
                                                    type="checkbox"
                                                    className="form-check-input me-2"
                                                >
                                                </Field>
                                                <label>
                                                    Provide Hostel Facilities ?  <span className="text-danger">*</span>
                                                </label>
                                                < div className="text-danger">{errors?.hostelFacilities}</div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Authorized person */}
                                <div>
                                    <h4 className="mb-4">Authorized Person:</h4>
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <label>Name <span className="text-danger">*</span></label>
                                            <Field
                                                name="AuthorizedPerson.name"
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Your Name"
                                            />
                                            <div className="text-danger">{errors?.AuthorizedPerson?.name}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Designation <span className="text-danger">*</span></label>
                                            <Field
                                                name="AuthorizedPerson.designation"
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Your Designation"
                                            />
                                            <div className="text-danger">{errors?.AuthorizedPerson?.designation}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>ID Proof <span className="text-danger">*</span></label>
                                            <Field
                                                name="AuthorizedPerson.IDproof"
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Your ID proof"
                                            />
                                            <div className="text-danger">{errors?.AuthorizedPerson?.IDproof}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Email <span className="text-danger">*</span></label>
                                            <Field
                                                name="AuthorizedPerson.contactInfo.email"
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter Your Email"
                                            />
                                            <div className="text-danger">{errors?.AuthorizedPerson?.contactInfo?.email}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Mobile <span className="text-danger">*</span></label>
                                            <Field
                                                name="AuthorizedPerson.contactInfo.mobile"
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Your Mobile No."
                                            />
                                            <div className="text-danger">{errors?.AuthorizedPerson?.contactInfo?.mobile}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>WhatsApp No. <span className="text-danger">*</span></label>
                                            <Field
                                                name="AuthorizedPerson.contactInfo.whatsapp"
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Your WhatsApp No."
                                            />
                                            <div className="text-danger">{errors?.AuthorizedPerson?.contactInfo?.whatsapp}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Alternate Contact <span className="text-danger">*</span></label>
                                            <Field
                                                name="AuthorizedPerson.contactInfo.alternateContact"
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Your Alternate Contact No."
                                            />
                                            <div className="text-danger">{errors?.AuthorizedPerson?.contactInfo?.alternateContact}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>House No. <span className="text-danger">*</span></label>
                                            <Field
                                                name="AuthorizedPerson.contactInfo.address.houseNo"
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Your House No."
                                            />
                                            <div className="text-danger">{errors?.AuthorizedPerson?.contactInfo?.address?.houseNo}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Street Name <span className="text-danger">*</span></label>
                                            <Field
                                                name="AuthorizedPerson.contactInfo.address.streetName"
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Your Street Name"
                                            />
                                            <div className="text-danger">{errors?.AuthorizedPerson?.contactInfo?.address?.streetName}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>City <span className="text-danger">*</span></label>
                                            <Field
                                                name="AuthorizedPerson.contactInfo.address.city"
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Your City"
                                            />
                                            <div className="text-danger">{errors?.AuthorizedPerson?.contactInfo?.address?.city}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Pin Code <span className="text-danger">*</span></label>
                                            <Field
                                                name="AuthorizedPerson.contactInfo.address.pincode"
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Your Pin Code"
                                            />
                                            <div className="text-danger">{errors?.AuthorizedPerson?.contactInfo?.address?.pincode}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>State <span className="text-danger">*</span></label>
                                            <Field
                                                name="AuthorizedPerson.contactInfo.address.state"
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Your State"
                                            />
                                            <div className="text-danger">{errors?.AuthorizedPerson?.contactInfo?.address?.state}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Country <span className="text-danger">*</span></label>
                                            <Field
                                                name="AuthorizedPerson.contactInfo.address.country"
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Your Country"
                                            />
                                            <div className="text-danger">{errors?.AuthorizedPerson?.contactInfo?.address?.country}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Signature <span className="text-danger">*</span></label>
                                            {values.AuthorizedPerson.contactInfo.signature ? (
                                                <div>
                                                    {isInput === "signature" ? (
                                                        <div>
                                                            <a href={values.AuthorizedPerson.contactInfo.signature} target="_blank" rel="noopener noreferrer" className="btn btn-primary me-2 w-50 text-white">Download</a>
                                                            <button type="button" className="btn btn-success w-25" onClick={() => setisInput("signature")}>Edit</button>
                                                        </div>
                                                    ) : (
                                                        <Field
                                                            name="AuthorizedPerson.contactInfo.signature"
                                                            type="file"
                                                            className="form-control"
                                                            onChange={(e) => handleImageUpload(e, "signature")}
                                                        />
                                                    )}
                                                </div>
                                            ) : (
                                                <Field
                                                    name="AuthorizedPerson.contactInfo.signature"
                                                    type="file"
                                                    className="form-control"
                                                    onChange={(e) => handleImageUpload(e, "signature")}
                                                />
                                            )}
                                            <div className="text-danger">{errors?.AuthorizedPerson?.contactInfo?.signature}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bank Details */}
                                <div>
                                    <h4 className="mb-4">Bank Details :-</h4>
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <label>Account Holder Name <span className='text-danger'>*</span></label>
                                            <Field name="bankDetails.accountHolderName" type="text" className="form-control" placeholder="Enter Account Holder Name">

                                            </Field>
                                            <div className="text-danger">{errors?.bankDetails?.accountHolderName}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Bank Name <span className='text-danger'>*</span></label>
                                            <Field name="bankDetails.bankName" type="text" className="form-control" placeholder="Enter Bank Name">

                                            </Field>
                                            <div className="text-danger">{errors?.bankDetails?.bankName}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Branch Name <span className='text-danger'>*</span></label>
                                            <Field name="bankDetails.branchName" type="text" className="form-control" placeholder="Enter Branch Name">

                                            </Field>
                                            <div className="text-danger">{errors?.bankDetails?.branchName}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>State <span className='text-danger'>*</span></label>
                                            <Field name="bankDetails.state" type="text" className="form-control" placeholder="Enter Your State">

                                            </Field>
                                            <div className="text-danger">{errors?.bankDetails?.state}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Account Number <span className='text-danger'>*</span></label>
                                            <Field name="bankDetails.accountNumber" type="text" className="form-control" placeholder="Enter Account Number">

                                            </Field>
                                            <div className="text-danger">{errors?.bankDetails?.accountNumber}</div>

                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>IFSC Code<span className='text-danger'>*</span></label>
                                            <Field name="bankDetails.ifscCode" type="text" className="form-control" placeholder="Enter IFSC Code">

                                            </Field>
                                            <div className="text-danger">{errors?.bankDetails?.ifscCode}</div>

                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>UPI ID <span className='text-danger'>*</span></label>
                                            <Field name="bankDetails.upiID" type="url" className="form-control" placeholder="Enter UPI ID">

                                            </Field>
                                            <div className="text-danger">{errors?.bankDetails?.upiID}</div>

                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>PAN No. <span className='text-danger'>*</span></label>
                                            <Field name="bankDetails.panNo" type="number" className="form-control" placeholder="Enter PAN No.">

                                            </Field>
                                            <div className="text-danger">{errors?.bankDetails?.panNo}</div>

                                        </div>
                                    </div>
                                </div>
                                {/* Document */}
                                <div>
                                    <h4 className="mb-4">Document:</h4>
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <label>ISO Certificate <span className="text-danger">*</span></label>
                                            {institute?.document?.ISOcertificate ? (
                                                <div>
                                                    {isInput === "ISOcertificate" ? (
                                                        <Field
                                                            name="document.ISOcertificate"
                                                            type="file"
                                                            className="form-control"
                                                            placeholder="Enter ISO Certificate"
                                                            onChange={(e) => handleImageUpload(e, "ISOcertificate")}
                                                        />) : (
                                                        <div>
                                                            <a href={institute?.document?.ISOcertificateUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary me-2 w-50 text-white">Download</a>
                                                            <button type="button" className="btn btn-success w-25" onClick={() => setisInput("ISOcertificate")}>Edit</button>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <Field
                                                    name="document.ISOcertificate"
                                                    type="file"
                                                    className="form-control"
                                                    placeholder="Enter ISO Certificate"
                                                    onChange={(e) => handleImageUpload(e, "ISOcertificate")}
                                                />
                                            )}
                                            <div className="text-danger">{errors?.document?.ISOcertificate}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>GST Certificate <span className="text-danger">*</span></label>
                                            {institute?.document?.GSTcertificate ? (
                                                <div>
                                                    {isInput === "GSTcertificate" ? (
                                                        <Field
                                                            name="document.GSTcertificate"
                                                            type="file"
                                                            className="form-control"
                                                            placeholder="Enter GST Certificate"
                                                            onChange={(e) => handleImageUpload(e, "GSTcertificate")}
                                                        />
                                                    ) : (
                                                        <div>
                                                            <a href={institute?.document?.GSTcertificate} target="_blank" rel="noopener noreferrer" className="btn btn-primary me-2 w-50 text-white">Download</a>
                                                            <button type="button" className="btn btn-success w-25" onClick={() => setisInput("GSTcertificate")}>Edit</button>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <Field
                                                    name="document.GSTcertificate"
                                                    type="file"
                                                    className="form-control"
                                                    placeholder="Enter GST Certificate"
                                                    onChange={(e) => handleImageUpload(e, "GSTcertificate")}
                                                />
                                            )}
                                            <div className="text-danger">{errors?.document?.GSTcertificate}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Affiliation Certificate <span className="text-danger">*</span></label>
                                            {institute?.document?.AffiliationCertificate ? (
                                                <div>
                                                    {isInput === "AffiliationCertificate" ? (
                                                        <Field
                                                            name="document.AffiliationCertificate"
                                                            type="file"
                                                            className="form-control"
                                                            placeholder="Enter Affiliation Certificate"
                                                            onChange={(e) => handleImageUpload(e, "AffiliationCertificate")}
                                                        />
                                                    ) : (
                                                        <div>
                                                            <a href={institute?.document?.AffiliationCertificate} target="_blank" rel="noopener noreferrer" className="btn btn-primary me-2 w-50 text-white">Download</a>
                                                            <button type="button" className="btn btn-success w-25" onClick={() => setisInput("AffiliationCertificate")}>Edit</button>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <Field
                                                    name="document.AffiliationCertificate"
                                                    type="file"
                                                    className="form-control"
                                                    placeholder="Enter Affiliation Certificate"
                                                    onChange={(e) => handleImageUpload(e, "AffiliationCertificate")}
                                                />
                                            )}
                                            <div className="text-danger">{errors?.document?.AffiliationCertificate}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>PAN Card <span className="text-danger">*</span></label>
                                            {institute?.document?.PANcard ? (
                                                <div>
                                                    {isInput === "PANcard" ? (
                                                        <Field
                                                            name="document.PANcard"
                                                            type="file"
                                                            className="form-control"
                                                            placeholder="Enter PAN Card"
                                                            onChange={(e) => handleImageUpload(e, "PANcard")}
                                                        />
                                                    ) : (
                                                        <div>
                                                            <a href={institute?.document?.PANcard} target="_blank" rel="noopener noreferrer" className="btn btn-primary me-2 w-50 text-white">Download</a>
                                                            <button type="button" className="btn btn-success w-25" onClick={() => setisInput("PANcard")}>Edit</button>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <Field
                                                    name="document.PANcard"
                                                    type="file"
                                                    className="form-control"
                                                    placeholder="Enter PAN Card"
                                                    onChange={(e) => handleImageUpload(e, "PANcard")}
                                                />
                                            )}
                                            <div className="text-danger">{errors?.document?.PANcard}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>MSME <span className="text-danger">*</span></label>
                                            {institute?.document?.MSME ? (
                                                <div>
                                                    {isInput === "MSME" ? (
                                                        <Field
                                                            name="document.MSME"
                                                            type="file"
                                                            className="form-control"
                                                            placeholder="Enter MSME"
                                                            onChange={(e) => handleImageUpload(e, "MSME")}
                                                        />
                                                    ) : (
                                                        <div>
                                                            <a href={institute?.document?.MSME} target="_blank" rel="noopener noreferrer" className="btn btn-primary me-2 w-50 text-white">Download</a>
                                                            <button type="button" className="btn btn-success w-25" onClick={() => setisInput("MSME")}>Edit</button>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <Field
                                                    name="document.MSME"
                                                    type="file"
                                                    className="form-control"
                                                    placeholder="Enter MSME"
                                                    onChange={(e) => handleImageUpload(e, "MSME")}
                                                />
                                            )}
                                            <div className="text-danger">{errors?.document?.MSME}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>TIN <span className="text-danger">*</span></label>
                                            {institute?.document?.TIN ? (
                                                <div>
                                                    {isInput === "TIN" ? (
                                                        <Field
                                                            name="document.TIN"
                                                            type="file"
                                                            className="form-control"
                                                            placeholder="Enter TIN"
                                                            onChange={(e) => handleImageUpload(e, "TIN")}
                                                        />
                                                    ) : (
                                                        <div>
                                                            <a href={institute?.document?.TIN} target="_blank" rel="noopener noreferrer" className="btn btn-primary me-2 w-50 text-white">Download</a>
                                                            <button type="button" className="btn btn-success w-25" onClick={() => setisInput("TIN")}>Edit</button>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <Field
                                                    name="document.TIN"
                                                    type="file"
                                                    className="form-control"
                                                    placeholder="Enter TIN"
                                                    onChange={(e) => handleImageUpload(e, "TIN")}
                                                />
                                            )}
                                            <div className="text-danger">{errors?.document?.TIN}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>NAAC <span className="text-danger">*</span></label>
                                            {institute?.document?.NAAC ? (
                                                <div>
                                                    {isInput === "NAAC" ? (
                                                        <Field
                                                            name="document.NAAC"
                                                            type="file"
                                                            className="form-control"
                                                            placeholder="Enter NAAC"
                                                            onChange={(e) => handleImageUpload(e, "NAAC")}
                                                        />
                                                    ) : (
                                                        <div>
                                                            <a href={institute?.document?.NAAC} target="_blank" rel="noopener noreferrer" className="btn btn-primary me-2 w-50 text-white">Download</a>
                                                            <button type="button" className="btn btn-success w-25" onClick={() => setisInput("NAAC")}>Edit</button>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <Field
                                                    name="document.NAAC"
                                                    type="file"
                                                    className="form-control"
                                                    placeholder="Enter NAAC"
                                                    onChange={(e) => handleImageUpload(e, "NAAC")}
                                                />
                                            )}
                                            <div className="text-danger">{errors?.document?.NAAC}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>UGC Approved Letter <span className="text-danger">*</span></label>
                                            {institute?.document?.UGCapprovedLetter ? (
                                                <div>
                                                    {isInput === "UGCapprovedLetter" ? (
                                                        <Field
                                                            name="document.UGCapprovedLetter"
                                                            type="file"
                                                            className="form-control"
                                                            placeholder="Enter UGC Approved Letter"
                                                            onChange={(e) => handleImageUpload(e, "UGCapprovedLetter")}
                                                        />
                                                    ) : (
                                                        <div>
                                                            <a href={institute?.document?.NAAC} target="_blank" rel="noopener noreferrer" className="btn btn-primary me-2 w-50 text-white">Download</a>
                                                            <button type="button" className="btn btn-success w-25" onClick={() => setisInput("UGCapprovedLetter")}>Edit</button>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <Field
                                                    name="document.UGCapprovedLetter"
                                                    type="file"
                                                    className="form-control"
                                                    placeholder="Enter UGC Approved Letter"
                                                    onChange={(e) => handleImageUpload(e, "UGCapprovedLetter")}
                                                />
                                            )}
                                            <div className="text-danger">{errors?.document?.UGCapprovedLetter}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end mt-3">
                                    <button type="button" className="w-25 btn btn-danger me-2" onClick={() => resetForm()}>Cancel</button>
                                    <button type="submit" className="w-25 btn btn-primary ms-2">Submit</button>
                                </div>
                                {/* Status */}
                                {/* <div>
                                    <h4 className="mb-4">Status :-</h4>
                                    <div className="row">
                                       
                                    </div>
                                </div>
                                FeedBack
                                <div>
                                    <h4 className="mb-4">FeedBack :-</h4>
                                    <div className="row">
                                       
                                    </div>
                                </div> */}
                            </Form>

                        )}
                    </Formik >

                </div >
            </div >
        </>
    )
}

export default EditProfile