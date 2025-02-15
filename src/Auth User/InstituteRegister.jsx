import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React from 'react'
import * as yup from 'yup';
import { useFileUploader } from '../Custom Hooks/CustomeHook';
import { useNavigate } from 'react-router-dom';
import { useAddInstituteMutation } from '../Redux/Api/instituteSlice';
import useGlobalToast from '../GlobalComponents/GlobalToast';


const validationSchema = yup.object().shape({
    name: yup.string().required("Institute name is required"),
    contactInfo: yup.object().shape({
        email: yup.string().email().required("Email is required"),
        mobile: yup.string().required("Mobile number is required"),
        whatsapp: yup.string().required("WhatsApp number is required"),
        landline: yup.string().nullable(),
        website: yup.string().url().required("Website is required"),
    }),
    address: yup.object().shape({
        line1: yup.string().required("Address line 1 is required"),
        line2: yup.string().required("Address line 2 is required"),
        city: yup.string().required("City is required"),
        state: yup.string().required("State is required"),
        country: yup.string().required("Country is required"),
        postalCode: yup.string().required("Postal code is required"),
        MapLocationUrl: yup.string().required("Map location URL is required"),
    }),
    establishedYear: yup.string().matches(/^[0-9]{4}$/, "Established year must be a 4-digit year").required("Established year is required"),
    NoOfCoursesOffered: yup.number().required("Number of courses offered is required"),
    NoOfStaffsEnrolled: yup.number().required("Number of staffs enrolled is required"),
    NoOfStudentsEnrolled: yup.number().required("Number of students enrolled is required"),
    disableStudentAdmission: yup.boolean(),
    acceptScholarshipAdmission: yup.boolean(),
    libraryFacilities: yup.boolean(),
    cafeteriaFacilities: yup.boolean(),
    hostelFacilities: yup.boolean(),
    accreditation: yup.string().required("Accreditation is required"),
    instituteType: yup.string().required("Institute type is required"),
    logo: yup.mixed().nullable(),
    aboutInstitute: yup.string().required("About institute is required"),
    affiliationNo: yup.string().required("Affiliation number is required"),
    affiliationYear: yup.string().matches(/^[0-9]{4}$/, "Affiliation year must be a 4-digit year").required("Affiliation year is required"),
    affiliationName: yup.string().required("Affiliation name is required"),
    AuthorizedPerson: yup.object().shape({
        name: yup.string().required("Authorized person name is required"),
        designation: yup.string().required("Authorized person designation is required"),
        IDproof: yup.mixed().nullable(),
        contactInfo: yup.object().shape({
            email: yup.string().email("Invalid email format").required("Email is required"),
            mobile: yup.string().required("Mobile number is required"),
            whatsapp: yup.string().required("WhatsApp number is required"),
            alternateContact: yup.string().nullable(),
            address: yup.object().shape({
                houseNo: yup.string().required("House number is required"),
                streetName: yup.string().required("Street name is required"),
                city: yup.string().required("City is required"),
                pincode: yup.string().required("Pincode is required"),
                state: yup.string().required("State is required"),
                country: yup.string().required("Country is required"),
            }),
            signature: yup.mixed().nullable(),
        }),
    }),
    bankDetails: yup.object().shape({
        accountHolderName: yup.string().matches(/^[a-zA-Z\s]+$/, "Account holder name must be alphabets only").required("Account holder name is required"),
        bankName: yup.string().matches(/^[a-zA-Z\s]+$/, "Bank name must be alphabets only").required("Bank name is required"),
        branchName: yup.string().matches(/^[a-zA-Z\s]+$/, "Branch name must be alphabets only").required("Branch name is required"),
        accountNumber: yup.string().matches(/^[0-9]{9,18}$/, "Account number must be 9 to 18 digits").required("Account number is required"),
        ifscCode: yup.string().matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "IFSC code must be in the format of XXXX0XXXXXX").required("IFSC code is required"),
        upiID: yup.string().matches(/^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, "UPI ID must be in the format of [name]@[bankname].[bankcode]").required("UPI ID is required"),
        panNo: yup.string().matches(/^[A-Z]{5}\d{4}[A-Z]{1}$/, "PAN number must be in the format of XXXXX1234X").required("PAN number is required"),
    }),
    document: yup.object().shape({
        ISOcertificate: yup.mixed().nullable(),
        GSTcertificate: yup.mixed().nullable(),
        AffiliationCertificate: yup.mixed().nullable(),
        PANcard: yup.mixed().nullable(),
        MSME: yup.mixed().nullable(),
        TIN: yup.mixed().nullable(),
        NAAC: yup.mixed().nullable(),
        UGCapprovedLetter: yup.mixed().nullable(),
    }),
    loginPassword: yup.string().required("Login password is required"),
});

function InstituteRegister() {
    const { uploadedData, handleFileUpload } = useFileUploader();
    const [ createInstitute ] = useAddInstituteMutation();
    const Toast = useGlobalToast();
    const Navigate = useNavigate();
    const initialValues = {
        name: "",
        contactInfo: {
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
        establishedYear: null,
        NoOfCoursesOffered: null,
        NoOfStaffsEnrolled: null,
        NoOfStudentsEnrolled: null,
        disableStudentAdmission: false,
        acceptScholarshipAdmission: false,
        libraryFacilities: false,
        cafeteriaFacilities: false,
        hostelFacilities: false,
        accreditation: "",
        instituteType: "",
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
        console.log(values);

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
            const response = await createInstitute(data);
            if (response.data) {
                Toast(response.data.message || "Submission successful.", "success");
                resetForm();
                Navigate("/");
            } else {
                Toast(response.error.data.message || "Submission failed.", "error");
            }
        } catch (error) {
            if (error.response) {
                Toast((error.response.data.message || error.response.data) || "Submission failed.", "error");
            } else {
                Toast("An unknown error occurred.", "error");
                console.log(error);

            }
        }
    };

    return (
        <>
            <div className="modal-body">
                <div className="nav-align-top mb-4">

                    <Formik initialValues={initialValues} onSubmit={HandleSubmit} validationSchema={validationSchema} >
                        {({ errors, touched, resetForm }) => (
                            <Form className="border p-4 shadow rounded bg-white">
                                <h2 className='text-center'>Institute Registration  </h2>
                                <hr className='mb-5' />
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
                                            <Field name="contactInfo.mobile" type="number" className="form-control" placeholder="Enter Your Mobile Number">

                                            </Field>
                                            < div className="text-danger">{errors?.contactInfo?.mobile}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Contact Email <span className='text-danger'>*</span></label>
                                            <Field name="contactInfo.email" type="email" className="form-control" placeholder="Enter Your Mobile email">

                                            </Field>
                                            < div className="text-danger">{errors?.contactInfo?.email}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>WhatsApp No. <span className='text-danger'>*</span></label>
                                            <Field name="contactInfo.whatsapp" type="number" className="form-control" placeholder="Enter Your WhatsApp No.">

                                            </Field>
                                            < div className="text-danger">{errors?.contactInfo?.whatsapp}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Landline No.</label>
                                            <Field name="contactInfo.landline" type="number" className="form-control" placeholder="Enter Your Landline No.">

                                            </Field>
                                            < div className="text-danger">{errors?.contactInfo?.landline}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Website <span className='text-danger'>*</span></label>
                                            <Field name="contactInfo.website" type="text" className="form-control" placeholder="Enter Your Website">

                                            </Field>
                                            < div className="text-danger">{errors?.contactInfo?.website}</div>
                                        </div>
                                    </div>
                                </div>
                                {/* Adress  */}
                                <div>
                                    <hr />
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
                                            <label>Map Location URL <span className='text-danger'>*</span></label>
                                            <Field name="address.MapLocationUrl" type="url" className="form-control" placeholder="Enter Your MapLocationURL">

                                            </Field>
                                            < div className="text-danger">{errors?.address?.city}</div>
                                        </div>
                                    </div>
                                </div>
                                {/* other detail */}
                                <div>
                                    <hr />
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
                                            <Field name="logo" type="file" accept="image/jpeg, image/png, image/gif" onChange={(e) => handleFileUpload(e, "logo")} className="form-control">

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
                                                className="form-control rounded"
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
                                                    Accept Disable Student Admission ?
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
                                                    Accept Scholarship Admission ?
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
                                                    Provide Library Facilities ?
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
                                                    Provide Cafeteria Facilities ?
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
                                                    Provide Hostel Facilities ?
                                                </label>
                                                < div className="text-danger">{errors?.hostelFacilities}</div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Authorized person */}
                                <div>
                                    <hr />
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
                                            <label>ID Proof</label>
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
                                            <label>Alternate Contact</label>
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
                                                type="number"
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
                                                accept="image/jpeg, image/png, image/gif"
                                                className="form-control"
                                                onChange={(e) => handleFileUpload(e, "signature")}
                                            />
                                            <div className="text-danger">{errors?.AuthorizedPerson?.contactInfo?.signature}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bank Details */}
                                <div>
                                    <hr />
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
                                            <Field name="bankDetails.upiID" type="text" className="form-control" placeholder="Enter UPI ID">

                                            </Field>
                                            <div className="text-danger">{errors?.bankDetails?.upiID}</div>

                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>PAN No. <span className='text-danger'>*</span></label>
                                            <Field name="bankDetails.panNo" type="text" className="form-control" placeholder="Enter PAN No.">

                                            </Field>
                                            <div className="text-danger">{errors?.bankDetails?.panNo}</div>

                                        </div>
                                    </div>
                                </div>
                                {/* Document */}
                                <div>
                                    <hr />
                                    <h4 className="mb-4">Document:</h4>
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <label>ISO Certificate</label>
                                            <Field
                                                name="document.ISOcertificate"
                                                type="file"
                                                className="form-control"
                                                placeholder="Enter ISO Certificate"
                                                onChange={(e) => handleFileUpload(e, "ISOcertificate")}
                                            />
                                            <div className="text-danger">{errors?.document?.ISOcertificate}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>GST Certificate</label>
                                            <Field
                                                name="document.GSTcertificate"
                                                type="file"
                                                className="form-control"
                                                placeholder="Enter GST Certificate"
                                                onChange={(e) => handleFileUpload(e, "GSTcertificate")}
                                            />
                                            <div className="text-danger">{errors?.document?.GSTcertificate}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>Affiliation Certificate</label>
                                            <Field
                                                name="document.AffiliationCertificate"
                                                type="file"
                                                className="form-control"
                                                placeholder="Enter Affiliation Certificate"
                                                onChange={(e) => handleFileUpload(e, "AffiliationCertificate")}
                                            />
                                            <div className="text-danger">{errors?.document?.AffiliationCertificate}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>PAN Card</label>
                                            <Field
                                                name="document.PANcard"
                                                type="file"
                                                className="form-control"
                                                placeholder="Enter PAN Card"
                                                onChange={(e) => handleFileUpload(e, "PANcard")}
                                            />
                                            <div className="text-danger">{errors?.document?.PANcard}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>MSME</label>
                                            <Field
                                                name="document.MSME"
                                                type="file"
                                                className="form-control"
                                                placeholder="Enter MSME"
                                                onChange={(e) => handleFileUpload(e, "MSME")}
                                            />
                                            <div className="text-danger">{errors?.document?.MSME}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>TIN</label>
                                            <Field
                                                name="document.TIN"
                                                type="file"
                                                className="form-control"
                                                placeholder="Enter TIN"
                                                onChange={(e) => handleFileUpload(e, "TIN")}
                                            />
                                            <div className="text-danger">{errors?.document?.TIN}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>NAAC</label>
                                            <Field
                                                name="document.NAAC"
                                                type="file"
                                                className="form-control"
                                                placeholder="Enter NAAC"
                                                onChange={(e) => handleFileUpload(e, "NAAC")}
                                            />
                                            <div className="text-danger">{errors?.document?.NAAC}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label>UGC Approved Letter</label>
                                            <Field
                                                name="document.UGCapprovedLetter"
                                                type="file"
                                                className="form-control"
                                                placeholder="Enter UGC Approved Letter"
                                                onChange={(e) => handleFileUpload(e, "UGCapprovedLetter")}
                                            />
                                            <div className="text-danger">{errors?.document?.UGCapprovedLetter}</div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <hr />
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
                                    <button type="button" className="btn btn-danger me-2" onClick={() => resetForm()}>Cancel</button>
                                    <button type="submit" className="btn btn-primary ms-2">Submit</button>
                                </div>
                            </Form>

                        )}
                    </Formik>

                </div>
            </div>
        </>
    )
}

export default InstituteRegister