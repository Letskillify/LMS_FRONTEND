import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React from 'react'
import * as Yup from 'yup';
import { useImageUploader } from '../Custom Hooks/CustomeHook';
import { useNavigate } from 'react-router-dom';


const validationSchema = Yup.object({
    name: Yup.string().required("Institute name is required"),
    contact: Yup.object({
        email: Yup.string().email("Invalid email format").nullable(),
        mobile: Yup.string()
            .matches(/^\d{10}$/, "Mobile number must be 10 digits")
            .nullable(),
        whatsapp: Yup.string()
            .matches(/^\d{10}$/, "WhatsApp number must be 10 digits")
            .nullable(),
        landline: Yup.string().nullable(),
        website: Yup.string().url("Invalid URL").nullable(),
    }),
    address: Yup.object({
        line1: Yup.string().nullable(),
        line2: Yup.string().nullable(),
        city: Yup.string().nullable(),
        state: Yup.string().nullable(),
        country: Yup.string().nullable(),
        postalCode: Yup.string()
            .matches(/^\d{5,6}$/, "Postal code must be 5 or 6 digits")
            .nullable(),
        MapLocationUrl: Yup.string().url("Invalid URL").nullable(),
    }),
    establishedYear: Yup.number()
        .min(1900, "Year must be after 1900")
        .max(new Date().getFullYear(), "Year cannot be in the future")
        .required("Established year is required"),
    NoOfCoursesOffered: Yup.number()
        .min(0, "Cannot be negative")
        .required("Number of courses offered is required"),
    NoOfStaffsEnrolled: Yup.number()
        .min(0, "Cannot be negative")
        .required("Number of staffs enrolled is required"),
    NoOfStudentsEnrolled: Yup.number()
        .min(0, "Cannot be negative")
        .required("Number of students enrolled is required"),
    disableStudentAdmission: Yup.boolean(),
    acceptScholarshipAdmission: Yup.boolean(),
    libraryFacilities: Yup.boolean(),
    cafeteriaFacilities: Yup.boolean(),
    hostelFacilities: Yup.boolean(),
    accreditation: Yup.string().nullable(),
    instituteType: Yup.string()
        .oneOf(
            ["School", "College", "University", "Coaching Center"],
            "Invalid institute type"
        )
        .required("Institute type is required"),
    logo: Yup.mixed().nullable(),
    aboutInstitute: Yup.string().nullable(),
    affiliationNo: Yup.string().nullable(),
    affiliationYear: Yup.number()
        .min(1900, "Year must be after 1900")
        .max(new Date().getFullYear(), "Year cannot be in the future")
        .nullable(),
    affiliationName: Yup.string().nullable(),
    AuthorizedPerson: Yup.object({
        name: Yup.string().nullable(),
        designation: Yup.string().nullable(),
        IDproof: Yup.string().nullable(),
        contactInfo: Yup.object({
            email: Yup.string().email("Invalid email format").nullable(),
            mobile: Yup.string()
                .matches(/^\d{10}$/, "Mobile number must be 10 digits")
                .nullable(),
            whatsapp: Yup.string()
                .matches(/^\d{10}$/, "WhatsApp number must be 10 digits")
                .nullable(),
            alternateContact: Yup.string().nullable(),
            address: Yup.object({
                houseNo: Yup.string().nullable(),
                streetName: Yup.string().nullable(),
                city: Yup.string().nullable(),
                pincode: Yup.string()
                    .matches(/^\d{5,6}$/, "Pincode must be 5 or 6 digits")
                    .nullable(),
                state: Yup.string().nullable(),
                country: Yup.string().nullable(),
            }),
            signature: Yup.mixed().nullable(),
        }),
    }),
    bankDetails: Yup.object({
        accountHolderName: Yup.string().nullable(),
        bankName: Yup.string().nullable(),
        branchName: Yup.string().nullable(),
        accountNumber: Yup.string()
            .matches(/^\d+$/, "Account number must be numeric")
            .nullable(),
        ifscCode: Yup.string()
            .matches(/^[A-Z|a-z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format")
            .nullable(),
        upiID: Yup.string().nullable(),
        panNo: Yup.string()
            .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN format")
            .nullable(),
    }),
    document: Yup.object({
        ISOcertificate: Yup.mixed().nullable(),
        GSTcertificate: Yup.mixed().nullable(),
        AffiliationCertificate: Yup.mixed().nullable(),
        PANcard: Yup.mixed().nullable(),
        MSME: Yup.mixed().nullable(),
        TIN: Yup.mixed().nullable(),
        NAAC: Yup.mixed().nullable(),
        UGCapprovedLetter: Yup.mixed().nullable(),
    }),
    loginPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});



function InstituteRegister() {
    const { uploadedData, handleImageUpload } = useImageUploader();
    const Navigate = useNavigate();
    const initialValues = {
        name: "",
        contact: {
            email: null,
            mobile: null,
            whatsapp: null,
            landline: null,
            website: null,
        },
        address: {
            line1: null,
            line2: null,
            city: null,
            state: null,
            country: null,
            postalCode: null,
            MapLocationUrl: null,
        },
        establishedYear: 0,
        NoOfCoursesOffered: 0,
        NoOfStaffsEnrolled: 0,
        NoOfStudentsEnrolled: 0,
        disableStudentAdmission: false,
        acceptScholarshipAdmission: false,
        libraryFacilities: false,
        cafeteriaFacilities: false,
        hostelFacilities: false,
        accreditation: "",
        instituteType: "", // Choose from 'School', 'College', 'University', 'Coaching Center'
        logo: null,
        aboutInstitute: null,
        affiliationNo: null,
        affiliationYear: null,
        affiliationName: null,
        AuthorizedPerson: {
            name: null,
            designation: null,
            IDproof: null,
            contactInfo: {
                email: null,
                mobile: null,
                whatsapp: null,
                alternateContact: null,
                address: {
                    houseNo: null,
                    streetName: null,
                    city: null,
                    pincode: null,
                    state: null,
                    country: null,
                },
                signature: null,
            },
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
        loginPassword: "",
    };

    const HandleSubmit = async (values, { resetForm }) => {

        const data = {
            ...values,
            logo: uploadedData?.logo,
            AuthorizedPerson: {
                ...values.AuthorizedPerson,
                contactInfo: {
                    ...values.AuthorizedPerson.contactInfo,
                    signature: uploadedData?.signature,
                },
            },
            document: {
                ISOcertificate: uploadedData?.ISOcertificate || values.document.ISOcertificate,
                GSTcertificate: uploadedData?.GSTcertificate || values.document.GSTcertificate,
                AffiliationCertificate: uploadedData?.AffiliationCertificate || values.document.AffiliationCertificate,
                PANcard: uploadedData?.PANcard || values.document.PANcard,
                MSME: uploadedData?.MSME || values.document.MSME,
                TIN: uploadedData?.TIN || values.document.TIN,
                NAAC: uploadedData?.NAAC || values.document.NAAC,
                UGCapprovedLetter: uploadedData?.UGCapprovedLetter || values.document.UGCapprovedLetter,
            },
        };


        try {
            const response = await axios.post("http://localhost:5500/api/institute/post", data);
            if (response.status === 201) {
                resetForm();
                alert("Data Sent Successfully");
                Navigate("/login");
            }
        } catch (error) {
            if (error.response) {
                console.error("Server Error:", error.response.data);
                alert(error.response.data.message || "Submission failed.");
            } else {
                console.error("Unknown Error:", error.message);
            }
        }
    };

    return (
        <>
            <div className="modal-body">
                <div className="nav-align-top mb-4">

                    <Formik initialValues={initialValues} onSubmit={HandleSubmit} >
                        {({ errors, touched, resetForm }) => (
                            <Form className="border p-4 shadow rounded bg-white">
                                <h2>Institute registration  </h2>
                                <div>
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
                                            <Field name="contact.mobile" type="number" className="form-control" placeholder="Enter Your Mobile Number">

                                            </Field>
                                            < div className="text-danger">{errors?.contact?.mobile}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Contact Email <span className='text-danger'>*</span></label>
                                            <Field name="contact.email" type="email" className="form-control" placeholder="Enter Your Mobile email">

                                            </Field>
                                            < div className="text-danger">{errors?.contact?.email}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>WhatsApp No. <span className='text-danger'>*</span></label>
                                            <Field name="contact.whatsapp" type="number" className="form-control" placeholder="Enter Your WhatsApp No.">

                                            </Field>
                                            < div className="text-danger">{errors?.contact?.whatsapp}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Landline No. <span className='text-danger'>*</span></label>
                                            <Field name="contact.landline" type="number" className="form-control" placeholder="Enter Your Landline No.">

                                            </Field>
                                            < div className="text-danger">{errors?.contact?.landline}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Website <span className='text-danger'>*</span></label>
                                            <Field name="contact.website" type="text" className="form-control" placeholder="Enter Your Website">

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
                                            <Field name="logo" type="file" onChange={(e) => handleImageUpload(e, "logo")} className="form-control">

                                            </Field>
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
                                                as="textarea"
                                                name="aboutInstitute"
                                                id="aboutInstitute"
                                                className="form-control shadow-sm rounded"
                                                rows="4"
                                                placeholder="Write about the institute here..."
                                                style={{
                                                    resize: "none",
                                                    border: "1px solid #ccc",
                                                    fontFamily: "Arial, sans-serif",
                                                    fontSize: "14px",
                                                    padding: "10px",
                                                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                                }}
                                                required
                                            />
                                            <div className="text-danger">{errors?.aboutInstitute}</div>
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
                                            <Field
                                                name="AuthorizedPerson.contactInfo.signature"
                                                type="file"
                                                className="form-control"
                                                onChange={(e) => handleImageUpload(e, "signature")}
                                            />
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
                                            <Field
                                                name="document.ISOcertificate"
                                                type="file"
                                                className="form-control"
                                                placeholder="Enter ISO Certificate"
                                                onChange={(e) => handleImageUpload(e, "ISOcertificate")}
                                            />
                                            <div className="text-danger">{errors?.document?.ISOcertificate}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>GST Certificate <span className="text-danger">*</span></label>
                                            <Field
                                                name="document.GSTcertificate"
                                                type="file"
                                                className="form-control"
                                                placeholder="Enter GST Certificate"
                                                onChange={(e) => handleImageUpload(e, "GSTcertificate")}
                                            />
                                            <div className="text-danger">{errors?.document?.GSTcertificate}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Affiliation Certificate <span className="text-danger">*</span></label>
                                            <Field
                                                name="document.AffiliationCertificate"
                                                type="file"
                                                className="form-control"
                                                placeholder="Enter Affiliation Certificate"
                                                onChange={(e) => handleImageUpload(e, "AffiliationCertificate")}
                                            />
                                            <div className="text-danger">{errors?.document?.AffiliationCertificate}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>PAN Card <span className="text-danger">*</span></label>
                                            <Field
                                                name="document.PANcard"
                                                type="file"
                                                className="form-control"
                                                placeholder="Enter PAN Card"
                                                onChange={(e) => handleImageUpload(e, "PANcard")}
                                            />
                                            <div className="text-danger">{errors?.document?.PANcard}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>MSME <span className="text-danger">*</span></label>
                                            <Field
                                                name="document.MSME"
                                                type="file"
                                                className="form-control"
                                                placeholder="Enter MSME"
                                                onChange={(e) => handleImageUpload(e, "MSME")}
                                            />
                                            <div className="text-danger">{errors?.document?.MSME}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>TIN <span className="text-danger">*</span></label>
                                            <Field
                                                name="document.TIN"
                                                type="file"
                                                className="form-control"
                                                placeholder="Enter TIN"
                                                onChange={(e) => handleImageUpload(e, "TIN")}
                                            />
                                            <div className="text-danger">{errors?.document?.TIN}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>NAAC <span className="text-danger">*</span></label>
                                            <Field
                                                name="document.NAAC"
                                                type="file"
                                                className="form-control"
                                                placeholder="Enter NAAC"
                                                onChange={(e) => handleImageUpload(e, "NAAC")}
                                            />
                                            <div className="text-danger">{errors?.document?.NAAC}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>UGC Approved Letter <span className="text-danger">*</span></label>
                                            <Field
                                                name="document.UGCapprovedLetter"
                                                type="file"
                                                className="form-control"
                                                placeholder="Enter UGC Approved Letter"
                                                onChange={(e) => handleImageUpload(e, "UGCapprovedLetter")}
                                            />
                                            <div className="text-danger">{errors?.document?.UGCapprovedLetter}</div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="mb-4">Login ID :-</h4>
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <label>Login Password <span className='text-danger'>*</span></label>
                                            <Field name="loginPassword" type="text" className="form-control" placeholder="Enter Password">

                                            </Field>
                                            <div className="text-danger">{errors?.loginPassword}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end mt-2">
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
                    </Formik>

                </div>
            </div>
        </>
    )
}

export default InstituteRegister