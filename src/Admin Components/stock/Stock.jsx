import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify';
import * as Yup from 'yup';
import { useCreateFirmAccountMutation, useGetFirmAccountsByInstituteIdQuery } from '../../Redux/Api/Stock/AccountSlice';
import { getCommonCredentials } from '../../GlobalHelper/CommonCredentials';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    alias: Yup.string().required('Alias is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    city: Yup.string().required('City is required'),
    address: Yup.string().required('Address is required'),
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone must be a 10-digit number')
        .required('Phone is required'),
    alternatePhone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Alternate phone must be a 10-digit number')
        .required('Alternate phone is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
       contactPersons: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().required('Contact person name is required'),
                designation: Yup.string().required('Designation is required'),
                phone: Yup.string()
                    .matches(/^[0-9]{10}$/, 'Phone must be a 10-digit number')
                    .required('Phone is required'),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Email is required'),
            })
        )
        .min(1, 'At least one contact person is required')
        .required('Contact persons are required'),
    companyCategory: Yup.string().required('Company category is required'),
    currencyType: Yup.string().required('Currency type is required'),
    aadharNumber: Yup.string()
        .matches(/^[0-9]{12}$/, 'Aadhar number must be a 12-digit number')
        .required('Aadhar number is required'),
    panNumber: Yup.string()
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number format')
        .required('PAN number is required'),
    bankDetails: Yup.array()
        .of(
            Yup.object().shape({
                accountHolderName: Yup.string()
                    .required('Account holder name is required'),
                accountNumber: Yup.string()
                    .matches(/^[0-9]+$/, 'Account number must be numeric')
                    .required('Account number is required'),
                ifscCode: Yup.string()
                    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code format')
                    .required('IFSC code is required'),
                bankName: Yup.string().required('Bank name is required'),
                branchName: Yup.string().required('Branch name is required'),
            })
        )
        .min(1, 'At least one bank detail is required')
        .required('Bank details are required'),
    businessType: Yup.string()
        .oneOf(['Buyer', 'Seller', 'Both'])
        .required('Business type is required'),
    gst: Yup.object().shape({
        type: Yup.string()
            .oneOf(['Regular', 'Composition', 'None'])
            .required('GST type is required'),
        gstPercentage: Yup.number()
            .nullable()
            .when('type', (type, schema) => {
                if (type === 'Regular' || type === 'Composition') {
                    return schema
                        .min(0, 'GST percentage cannot be negative')
                        .max(100, 'GST percentage cannot exceed 100')
                        .required('GST percentage is required');
                } else {
                    return schema.nullable();
                }
            }),
        gstNumber: Yup.string()
            .when('type', (type, schema) => {
                if (type === 'Regular' || type === 'Composition') {
                    return schema
                        .matches(
                            /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/,
                            'Invalid GST number format'
                        )
                        .required('GST number is required');
                } else {
                    return schema.notRequired();
                }
            }),
        firmType: Yup.string()
            .oneOf(['Goods', 'Services', 'Both'])
            .required('Firm type is required'),
    }),
    businessDetails: Yup.object().shape({
        registrationNumber: Yup.string().required(
            'Registration number is required'
        ),
        incorporationDate: Yup.string()
            .matches(
                /^\d{4}-\d{2}-\d{2}$/,
                'Incorporation date must be in YYYY-MM-DD format'
            )
            .required('Incorporation date is required'),
        industryType: Yup.string().required('Industry type is required'),
    }),

});
function Stock() {
    const [Account, setAccount] = useState("Create")
    const {InstituteId}= getCommonCredentials()
    const [showView, setShowView] = useState(false);
    const [selectedStock, setSelectedStock] = useState([]);
    const [forms, setForms] = useState([{}]);
    const [contactPersons, setcontactPersons] = useState([{}]);
    const [forms2, setForms2] = useState([{}]);
    const handleAddForm = () => {
        setcontactPersons([...contactPersons, {}]); // Add a new empty form
    };
    const handleAddBank = () => {
        setForms2([...forms2, {}]); // Add a new empty form
    };
    const initialValues = {
        InstituteId: InstituteId,
        name: '',
        alias: '',
        state: '',
        country: '',
        city: '',
        address: '',
        phone: '',
        alternatePhone: '',
        email: '',
        website: '',
        contactPersons: [
            {
                name: '',
                designation: '',
                phone: '',
                email: '',
            },
        ],
        companyCategory: '',
        currencyType: '',
        aadharNumber: '',
        panNumber: '',
        bankDetails: [
            {
                accountHolderName: '',
                accountNumber: '',
                ifscCode: '',
                bankName: '',
                branchName: '',
            },
        ],
        businessType: '', // Options: 'Buyer', 'Seller', 'Both'
        gst: {
            type: '', // Options: 'Regular', 'Composition', 'None'
            gstPercentage: null,
            gstNumber: '',
            firmType: '', // Options: 'Goods', 'Services', 'Both'
        },
        businessDetails: {
            registrationNumber: '',
            incorporationDate: '', // Format: 'YYYY-MM-DD'
            industryType: '', // Options: List of industries from the schema
        },

    };

    const handleApi = async (formData) => {
        try {
            console.log("Sending formData:", formData); // Debugging
    
            const response = await createFirmAccount(formData);
          if (response.data.status === 201) {
                    toast.success("Section updated successfully", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                      transition: Bounce,
                    });
                fatchData();  // Ensure this function is defined correctly
            } 
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
            toast.error(err.response?.data?.message || "Server error", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Bounce,
            });
        }
    };
    // const fatchData = async () => {
    //     try {
    //         const response = await axios.get('/api/firm-account/get');
    //         if (response.status === 200) {
    //             setForms(response.data);
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    const {data: FirmAccount , isLoading, isError, error } = useGetFirmAccountsByInstituteIdQuery(InstituteId, {
        skip: !InstituteId,
    });
    const [createFirmAccount]= useCreateFirmAccountMutation();
    useEffect(() => {
        if (InstituteId) {
            setForms(FirmAccount);
        }
    }, [InstituteId, FirmAccount]);

    // const handleDelete = async (id) => {
    //     try {
    //         const res = await axios.delete(`/api/firm-account/delete/${id}`);
    //         if (res.status === 200) {
    //             toast.success("Firm account deleted successfully", {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "colored",
    //                 transition: Bounce,
    //             });
    //             fatchData();
    //         }
            
    //     } catch (err) {
    //         toast.error(err?.response?.data?.message || "Error deleting firm account", {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "colored",
    //             transition: Bounce,
    //         })
    //     }
    // };
    // const handleEdit = async (v, id) => {
    //     console.log(v);

    //     try {
    //         const res = await axios.put(`/api/firm-account/update/${id}`, v, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             method: 'PUT',
    //         });
    //         if (res.status === 200) {
    //             toast.success("Inventory edding successfully", {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "colored",
    //                 transition: Bounce,
    //             });
    //             fatchData();

    //         }
    //     } catch (err) {
    //         toast.error(err.response.data.message || "Error edding inventory", {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "colored",
    //             transition: Bounce,
    //         })

    //     };
    // }
    // useEffect(() => {
    //     fatchData();
    // }, []);

    return (
        <>
            <div>
                <h2 className='text-center mt-4'>Stock Account</h2>
                <div className="stockAccount text-center mt-3" >
                    <button className='btn btn-info m-2 ' value="Create" onClick={(e) => setAccount(e.target.value)}>Create</button>
                    <button className='btn btn-warning m-2' value="Edit" onClick={(e) => setAccount(e.target.value)}>Edit / Delete</button>
                    <button className='btn btn-secondary m-2' value="Display" onClick={(e) => setAccount(e.target.value)}>Display</button>
                </div>

                {Account === "Create" && (
                    <Formik initialValues={initialValues} onSubmit={handleApi}
                        // validationSchema={validationSchema}
                    >
                        {({ errors, resetForm }) => (

                            <div className="ms-3 me-3 mt-5">
                                <Form >
                                    <div className="card shadow-lg  rounded">
                                        <div className="card-header d-flex justify-content-between align-items-center ">
                                            <h2 className="text-dark">Account Management</h2>
                                        </div>

                                        <div className="card-body text-capitalize">
                                            <div className="row">
                                                {/* <!-- Personal Info Section --> */}
                                                <div className="accordion" id="accordionExample">
                                                    {/* Personal Info Section */}
                                                    <div className="accordion-item border">
                                                        <h2 className="accordion-header" id="headingPersonalInfo">
                                                            <button
                                                                className="accordion-button fs-4"
                                                                type="button"
                                                                data-bs-toggle="collapse"
                                                                data-bs-target="#collapsePersonalInfo"
                                                                aria-expanded="true"
                                                                aria-controls="collapsePersonalInfo"
                                                            >
                                                                Personal Info
                                                            </button>
                                                        </h2>
                                                        <div
                                                            id="collapsePersonalInfo"
                                                            className="accordion-collapse collapse border m-4 rounded show"
                                                            aria-labelledby="headingPersonalInfo"
                                                            data-bs-parent="#accordionExample"
                                                        >
                                                            <div className="accordion-body">
                                                                {/* Company Name & Alias */}
                                                                <div className="row mb-3">
                                                                    <div className="col-md-6">
                                                                        <label className="col-form-label">Company Name:</label>
                                                                        <Field
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Enter Name"
                                                                            name="name"
                                                                        />
                                                                        <div className='text-danger'>
                                                                            {
                                                                                errors?.name
                                                                            }
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-md-6">
                                                                        <label className="col-form-label">Alias:</label>
                                                                        <Field
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Enter Alias"
                                                                            name="alias"
                                                                        />
                                                                        <div className='text-danger'>
                                                                            {
                                                                                errors?.alias
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* State, Country, City, Address */}
                                                                <div className="row mb-3">
                                                                    <div className="col-md-6">
                                                                        <label className="col-form-label">State:</label>
                                                                        <Field
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Enter State"
                                                                            name="state"
                                                                        />
                                                                        <div className='text-danger'>
                                                                            {
                                                                                errors?.state
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <label className="col-form-label">Country:</label>
                                                                        <Field
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Enter Country"
                                                                            name="country"
                                                                        />
                                                                        <div className='text-danger'>
                                                                            {
                                                                                errors?.country
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row mb-3">
                                                                    <div className="col-md-6">
                                                                        <label className="col-form-label">City:</label>
                                                                        <Field
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Enter City"
                                                                            name="city"
                                                                        /> <div className='text-danger'>
                                                                            {
                                                                                errors?.city
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <label className="col-form-label">Address:</label>
                                                                        <Field
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Enter Address"
                                                                            name="address"
                                                                        />
                                                                        <div className='text-danger'>
                                                                            {
                                                                                errors?.address
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Phone No & Email */}
                                                                <div className="row mb-3">
                                                                    <div className="col-md-6">
                                                                        <label className="col-form-label">Phone No:</label>
                                                                        <Field
                                                                            type="number"
                                                                            className="form-control"
                                                                            placeholder="Enter Phone"
                                                                            name="phone" />
                                                                        <div className='text-danger'>
                                                                            {
                                                                                errors?.phone
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <label className="col-form-label">Email:</label>
                                                                        <Field
                                                                            type="email"
                                                                            className="form-control"
                                                                            placeholder="Enter Email"
                                                                            name="email"
                                                                        />
                                                                        <div className='text-danger'>
                                                                            {
                                                                                errors?.email
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Alternate Phone No & Website */}
                                                                <div className="row mb-3">
                                                                    <div className="col-md-6">
                                                                        <label className="col-form-label">Alternate Phone No:</label>
                                                                        <Field
                                                                            type="number"
                                                                            className="form-control"
                                                                            placeholder="Enter Telephone"
                                                                            name="alternatePhone"
                                                                        />
                                                                        <div className='text-danger'>
                                                                            {
                                                                                errors?.alternatePhone
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <label className="col-form-label">Website:</label>
                                                                        <Field
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Enter Website"
                                                                            name="website"
                                                                        />
                                                                        <div className='text-danger'>
                                                                            {
                                                                                errors?.website
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                {/* <!-- Firm Info Section --> */}
                                                <div className="accordion" id="accordionExample">
                                                    {/* Firm Info Section */}
                                                    <div className="accordion-item border mt-3">
                                                        <h2 className="accordion-header" id="headingOne">
                                                            <button className="accordion-button collapsed fs-4" type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                                Firm Info
                                                            </button>
                                                        </h2>
                                                        <div id="collapseOne" className="accordion-collapse collapse border rounded m-3" aria-labelledby="headingOne"
                                                            data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                {/* Firm Info fields */}
                                                                <div className="row mb-3">
                                                                    <div className="col-md-6">
                                                                        <label className="col-form-label">Company Category:</label>
                                                                        <Field as="select" name="companyCategory" className="form-control">
                                                                            <option value="">Select Company Category</option>
                                                                            <option value="Small">Small</option>
                                                                            <option value="Medium">Medium</option>
                                                                            <option value="Large">Large</option>
                                                                        </Field>
                                                                        <div className='text-danger'>
                                                                            {
                                                                                errors?.companyCategory
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <label className="col-form-label">Currency Type:</label>
                                                                        <Field as="select" className="form-control" name="currencyType">
                                                                            <option value="">Select Currency</option>
                                                                            <option value="AED">AED - United Arab Emirates Dirham</option>
                                                                            <option value="AFN">AFN - Afghan Afghani</option>
                                                                            <option value="ALL">ALL - Albanian Lek</option>
                                                                            <option value="AMD">AMD - Armenian Dram</option>
                                                                            <option value="ANG">ANG - Netherlands Antillean Guilder</option>
                                                                            <option value="AOA">AOA - Angolan Kwanza</option>
                                                                            <option value="ARS">ARS - Argentine Peso</option>
                                                                            <option value="AUD">AUD - Australian Dollar</option>
                                                                            <option value="AWG">AWG - Aruban Florin</option>
                                                                            <option value="AZN">AZN - Azerbaijani Manat</option>
                                                                            <option value="BAM">BAM - Bosnia-Herzegovina Convertible Mark</option>
                                                                            <option value="BBD">BBD - Barbadian Dollar</option>
                                                                            <option value="BDT">BDT - Bangladeshi Taka</option>
                                                                            <option value="BGN">BGN - Bulgarian Lev</option>
                                                                            <option value="BHD">BHD - Bahraini Dinar</option>
                                                                            <option value="BIF">BIF - Burundian Franc</option>
                                                                            <option value="BMD">BMD - Bermudian Dollar</option>
                                                                            <option value="BND">BND - Brunei Dollar</option>
                                                                            <option value="BOB">BOB - Bolivian Boliviano</option>
                                                                            <option value="BRL">BRL - Brazilian Real</option>
                                                                            <option value="BSD">BSD - Bahamian Dollar</option>
                                                                            <option value="BTN">BTN - Bhutanese Ngultrum</option>
                                                                            <option value="BWP">BWP - Botswanan Pula</option>
                                                                            <option value="BYN">BYN - Belarusian Ruble</option>
                                                                            <option value="BZD">BZD - Belize Dollar</option>
                                                                            <option value="CAD">CAD - Canadian Dollar</option>
                                                                            <option value="CDF">CDF - Congolese Franc</option>
                                                                            <option value="CHF">CHF - Swiss Franc</option>
                                                                            <option value="CLP">CLP - Chilean Peso</option>
                                                                            <option value="CNY">CNY - Chinese Yuan</option>
                                                                            <option value="COP">COP - Colombian Peso</option>
                                                                            <option value="CRC">CRC - Costa Rican Colón</option>
                                                                            <option value="CUP">CUP - Cuban Peso</option>
                                                                            <option value="CVE">CVE - Cape Verdean Escudo</option>
                                                                            <option value="CZK">CZK - Czech Koruna</option>
                                                                            <option value="DJF">DJF - Djiboutian Franc</option>
                                                                            <option value="DKK">DKK - Danish Krone</option>
                                                                            <option value="DOP">DOP - Dominican Peso</option>
                                                                            <option value="DZD">DZD - Algerian Dinar</option>
                                                                            <option value="EGP">EGP - Egyptian Pound</option>
                                                                            <option value="ERN">ERN - Eritrean Nakfa</option>
                                                                            <option value="ETB">ETB - Ethiopian Birr</option>
                                                                            <option value="EUR">EUR - Euro</option>
                                                                            <option value="FJD">FJD - Fijian Dollar</option>
                                                                            <option value="FKP">FKP - Falkland Islands Pound</option>
                                                                            <option value="GBP">GBP - British Pound Sterling</option>
                                                                            <option value="GEL">GEL - Georgian Lari</option>
                                                                            <option value="GHS">GHS - Ghanaian Cedi</option>
                                                                            <option value="GIP">GIP - Gibraltar Pound</option>
                                                                            <option value="GMD">GMD - Gambian Dalasi</option>
                                                                            <option value="GNF">GNF - Guinean Franc</option>
                                                                            <option value="GTQ">GTQ - Guatemalan Quetzal</option>
                                                                            <option value="GYD">GYD - Guyanese Dollar</option>
                                                                            <option value="HKD">HKD - Hong Kong Dollar</option>
                                                                            <option value="HNL">HNL - Honduran Lempira</option>
                                                                            <option value="HRK">HRK - Croatian Kuna</option>
                                                                            <option value="HTG">HTG - Haitian Gourde</option>
                                                                            <option value="HUF">HUF - Hungarian Forint</option>
                                                                            <option value="IDR">IDR - Indonesian Rupiah</option>
                                                                            <option value="ILS">ILS - Israeli New Shekel</option>
                                                                            <option value="INR">INR - Indian Rupee</option>
                                                                            <option value="IQD">IQD - Iraqi Dinar</option>
                                                                            <option value="IRR">IRR - Iranian Rial</option>
                                                                            <option value="ISK">ISK - Icelandic Króna</option>
                                                                            <option value="JMD">JMD - Jamaican Dollar</option>
                                                                            <option value="JOD">JOD - Jordanian Dinar</option>
                                                                            <option value="JPY">JPY - Japanese Yen</option>
                                                                            <option value="KES">KES - Kenyan Shilling</option>
                                                                            <option value="KGS">KGS - Kyrgyzstani Som</option>
                                                                            <option value="KHR">KHR - Cambodian Riel</option>
                                                                            <option value="KMF">KMF - Comorian Franc</option>
                                                                            <option value="KPW">KPW - North Korean Won</option>
                                                                            <option value="KRW">KRW - South Korean Won</option>
                                                                            <option value="KWD">KWD - Kuwaiti Dinar</option>
                                                                            <option value="KYD">KYD - Cayman Islands Dollar</option>
                                                                            <option value="KZT">KZT - Kazakhstani Tenge</option>
                                                                            <option value="LAK">LAK - Lao Kip</option>
                                                                            <option value="LBP">LBP - Lebanese Pound</option>
                                                                            <option value="LKR">LKR - Sri Lankan Rupee</option>
                                                                            <option value="LRD">LRD - Liberian Dollar</option>
                                                                            <option value="LSL">LSL - Lesotho Loti</option>
                                                                            <option value="LYD">LYD - Libyan Dinar</option>
                                                                            <option value="MAD">MAD - Moroccan Dirham</option>
                                                                            <option value="MDL">MDL - Moldovan Leu</option>
                                                                            <option value="MGA">MGA - Malagasy Ariary</option>
                                                                            <option value="MKD">MKD - Macedonian Denar</option>
                                                                            <option value="MMK">MMK - Myanmar Kyat</option>
                                                                            <option value="MNT">MNT - Mongolian Tögrög</option>
                                                                            <option value="MOP">MOP - Macanese Pataca</option>
                                                                            <option value="MUR">MUR - Mauritian Rupee</option>
                                                                            <option value="MVR">MVR - Maldivian Rufiyaa</option>
                                                                            <option value="MWK">MWK - Malawian Kwacha</option>
                                                                            <option value="MXN">MXN - Mexican Peso</option>
                                                                            <option value="MYR">MYR - Malaysian Ringgit</option>
                                                                            <option value="MZN">MZN - Mozambican Metical</option>
                                                                            <option value="NAD">NAD - Namibian Dollar</option>
                                                                            <option value="NGN">NGN - Nigerian Naira</option>
                                                                            <option value="NIO">NIO - Nicaraguan Córdoba</option>
                                                                            <option value="NOK">NOK - Norwegian Krone</option>
                                                                            <option value="NPR">NPR - Nepalese Rupee</option>
                                                                            <option value="NZD">NZD - New Zealand Dollar</option>
                                                                            <option value="OMR">OMR - Omani Rial</option>
                                                                            <option value="PAB">PAB - Panamanian Balboa</option>
                                                                            <option value="PEN">PEN - Peruvian Sol</option>
                                                                            <option value="PGK">PGK - Papua New Guinean Kina</option>
                                                                            <option value="PHP">PHP - Philippine Peso</option>
                                                                            <option value="PKR">PKR - Pakistani Rupee</option>
                                                                            <option value="PLN">PLN - Polish Złoty</option>
                                                                            <option value="PYG">PYG - Paraguayan Guaraní</option>
                                                                            <option value="QAR">QAR - Qatari Riyal</option>
                                                                            <option value="RON">RON - Romanian Leu</option>
                                                                            <option value="RSD">RSD - Serbian Dinar</option>
                                                                            <option value="RUB">RUB - Russian Ruble</option>
                                                                            <option value="RWF">RWF - Rwandan Franc</option>
                                                                            <option value="SAR">SAR - Saudi Riyal</option>
                                                                            <option value="SBD">SBD - Solomon Islands Dollar</option>
                                                                            <option value="SCR">SCR - Seychellois Rupee</option>
                                                                            <option value="SDG">SDG - Sudanese Pound</option>
                                                                            <option value="SEK">SEK - Swedish Krona</option>
                                                                            <option value="SGD">SGD - Singapore Dollar</option>
                                                                            <option value="SHP">SHP - Saint Helena Pound</option>
                                                                            <option value="SLL">SLL - Sierra Leonean Leone</option>
                                                                            <option value="SOS">SOS - Somali Shilling</option>
                                                                            <option value="SRD">SRD - Surinamese Dollar</option>
                                                                            <option value="SSP">SSP - South Sudanese Pound</option>
                                                                            <option value="STD">STD - São Tomé and Príncipe Dobra</option>
                                                                            <option value="STN">STN - São Tomé and Príncipe Dobra (New)</option>
                                                                            <option value="SVC">SVC - Salvadoran Colón</option>
                                                                            <option value="SYP">SYP - Syrian Pound</option>
                                                                            <option value="SZL">SZL - Eswatini Lilangeni</option>
                                                                            <option value="THB">THB - Thai Baht</option>
                                                                            <option value="TJS">TJS - Tajikistani Somoni</option>
                                                                            <option value="TMT">TMT - Turkmenistani Manat</option>
                                                                            <option value="TND">TND - Tunisian Dinar</option>
                                                                            <option value="TOP">TOP - Tongan Paʻanga</option>
                                                                            <option value="TRY">TRY - Turkish Lira</option>
                                                                            <option value="TTD">TTD - Trinidad and Tobago Dollar</option>
                                                                            <option value="TWD">TWD - New Taiwan Dollar</option>
                                                                            <option value="TZS">TZS - Tanzanian Shilling</option>
                                                                            <option value="UAH">UAH - Ukrainian Hryvnia</option>
                                                                            <option value="UGX">UGX - Ugandan Shilling</option>
                                                                            <option value="USD">USD - United States Dollar</option>
                                                                            <option value="UYU">UYU - Uruguayan Peso</option>
                                                                            <option value="UZS">UZS - Uzbekistani Som</option>
                                                                            <option value="VEF">VEF - Venezuelan Bolívar</option>
                                                                            <option value="VND">VND - Vietnamese Đồng</option>
                                                                            <option value="VUV">VUV - Vanuatu Vatu</option>
                                                                            <option value="WST">WST - Samoan Tālā</option>
                                                                            <option value="XAF">XAF - Central African CFA Franc</option>
                                                                            <option value="XCD">XCD - East Caribbean Dollar</option>
                                                                            <option value="XOF">XOF - West African CFA Franc</option>
                                                                            <option value="XPF">XPF - CFP Franc</option>
                                                                            <option value="YER">YER - Yemeni Rial</option>
                                                                            <option value="ZAR">ZAR - South African Rand</option>
                                                                            <option value="ZMW">ZMW - Zambian Kwacha</option>
                                                                            <option value="ZWL">ZWL - Zimbabwean Dollar</option>
                                                                        </Field>
                                                                        <div className="text-danger">
                                                                            {errors?.currencyType}
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="row mb-3">
                                                                    <div className="col-md-6">
                                                                        <label className="col-form-label">Adhar No:</label>
                                                                        <Field type="number" name="aadharNumber" className="form-control" placeholder="Enter Aadhar"
                                                                        />
                                                                        <div className='text-danger'>
                                                                            {
                                                                                errors?.aadharNumber
                                                                            }
                                                                        </div>

                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <label className="col-form-label">GST Type:</label>
                                                                        <Field as="select" className="form-control" name='gst.type'
                                                                        >
                                                                            <option value="">Select GST Type</option>
                                                                            <option value="Regular">Regular</option>
                                                                            <option value="Composition">Composition</option>
                                                                            <option value="None">None</option>
                                                                        </Field>
                                                                        <div className='text-danger'>
                                                                            {
                                                                                errors?.gst?.type
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-3">
                                                                    <div className="col-md-6">
                                                                        <label className="col-form-label">GST No:</label>
                                                                        <Field type="number" name="gstNumber" className="form-control" placeholder="Enter GSTN"
                                                                        />
                                                                        <div className='text-danger'>
                                                                            {
                                                                                errors?.gst?.gstNumber
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <label className="col-form-label">Firm Type:</label>
                                                                        <Field as="select" className="form-control" name='gst.firmType'
                                                                        >
                                                                            <option value="">Select Firm Type</option>
                                                                            <option value="Goods">Goods</option>
                                                                            <option value="Services">Services</option>
                                                                            <option value="Both">Both</option>
                                                                        </Field>
                                                                        <div className='text-danger'>
                                                                            {
                                                                                errors?.gst?.firmType
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <label className="col-form-label">Bussiness Type:</label>
                                                                        <Field as="select" className="form-control" name='businessType'
                                                                        >
                                                                            <option value="">Select Firm Type</option>
                                                                            <option value="Buyer">Buyer</option>
                                                                            <option value="Seller">Seller</option>
                                                                            <option value="Both">Both</option>
                                                                        </Field>
                                                                        <div className='text-danger'>
                                                                            {
                                                                                errors?.businessType
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <label className="col-form-label">PAN:</label>
                                                                        <Field type="text" name="panNumber" className="form-control" placeholder="Enter PAN"
                                                                        />
                                                                        <div className='text-danger'>
                                                                            {
                                                                                errors?.panNumber
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Contact Persons */}
                                                    <div id="accordionExample" className="accordion">
                                                        <div className="accordion-item border mt-3" >
                                                            <h2 className="accordion-header">
                                                                <button
                                                                    className="accordion-button collapsed fs-4"
                                                                    type="button"
                                                                    data-bs-toggle="collapse"
                                                                    data-bs-target="#collapse"
                                                                    aria-expanded="false"
                                                                    aria-controls="collapse"
                                                                >
                                                                    Contact Person Info
                                                                </button>
                                                            </h2>
                                                            <div
                                                                id="collapse"
                                                                className="accordion-collapse collapse border rounded m-3"
                                                            >
                                                                {contactPersons?.map((_, idx) => (
                                                                    <div key={idx}>
                                                                    <div className="accordion-body" >
                                                                        <div className="row">
                                                                            <div className="col-md-6">
                                                                                <label className="col-form-label">Contact Person Name:</label>
                                                                                <Field
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    name={`contactPersons.${idx}.name`}
                                                                                    placeholder="Enter Name"
                                                                                />
                                                                                <div className='text-danger'>
                                                                                    {
                                                                                        errors?.contactPersons?.[idx]?.name
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <label className="col-form-label">Designation:</label>
                                                                                <Field
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    name={`contactPersons.${idx}.designation`}
                                                                                    placeholder="Enter Designation"
                                                                                />
                                                                                <div className='text-danger'>
                                                                                    {
                                                                                        errors?.contactPersons?.[idx]?.designation
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row mb-3">
                                                                            <div className="col-md-6">
                                                                                <label className="col-form-label">Phone:</label>
                                                                                <Field
                                                                                    type="number"
                                                                                    className="form-control"
                                                                                    name={`contactPersons.${idx}.phone`}
                                                                                    placeholder="Enter Phone"
                                                                                />
                                                                                <div className='text-danger'>
                                                                                    {
                                                                                        errors?.contactPersons?.[idx]?.phone
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <label className="col-form-label">Email:</label>
                                                                                <Field
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    name={`contactPersons.${idx}.email`}
                                                                                    placeholder="Enter Email"
                                                                                />
                                                                                <div className='text-danger'>
                                                                                    {
                                                                                        errors?.contactPersons?.[idx]?.email
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    </div>
                                                                ))}
                                                                <button type='button' className="btn btn-primary mb-3 ms-3" onClick={handleAddForm}>
                                                                    Add New Info
                                                                </button>
                                                            </div>
                                                        </div>


                                                        {/* Button to add new form */}
                                                    </div>




                                                    {/* Bank Details Section */}
                                                    <div className="accordion-item border mt-3">
                                                        <h2 className="accordion-header" id="headingTwo">
                                                            <button className="accordion-button collapsed fs-4" type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                Bank Details
                                                            </button>
                                                        </h2>
                                                        <div id="collapseTwo" className="accordion-collapse collapse border rounded m-3" aria-labelledby="headingTwo"
                                                            data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                {/* Bank Details fields */}
                                                                {forms2?.map((_, idx) => (
                                                                    <div key={idx}>
                                                                        <div className="row mb-3">
                                                                            <div className="col-md-6">
                                                                                <label className="col-form-label">Bank Account No:</label>
                                                                                <Field type="number" className="form-control" placeholder="Enter Bank Account"
                                                                                    name={`bankDetails.${idx}.accountNumber`}
                                                                                />
                                                                                <div className='text-danger'>
                                                                                    {errors?.bankDetails?.[idx]?.accountNumber}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <label className="col-form-label">IFSC No:</label>
                                                                                <Field type="text" className="form-control" placeholder="Enter IFSC No" name={`bankDetails.${idx}.ifscCode`}

                                                                                />
                                                                                <div className='text-danger'>
                                                                                    {errors?.bankDetails?.[idx]?.ifscCode}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row mb-3">
                                                                            <div className="col-md-6">
                                                                                <label className="col-form-label">Bank Holder Name:</label>
                                                                                <Field type="text" className="form-control" placeholder="Enter Bank Holder Name"
                                                                                    name={`bankDetails.${idx}.accountHolderName`}
                                                                                />
                                                                                <div className='text-danger'>
                                                                                    {errors?.bankDetails?.[idx]?.accountHolderName}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <label className="col-form-label">Bank Name:</label>
                                                                                <Field type="text" className="form-control" placeholder="Enter Bank Name" name={`bankDetails.${idx}.bankName`}

                                                                                />
                                                                                <div className='text-danger'>
                                                                                    {errors?.bankDetails?.[idx]?.bankName}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row mb-3">
                                                                            <div className="col-md-6">
                                                                                <label className="col-form-label">Branch Name:</label>
                                                                                <Field type="text" className="form-control" placeholder="Enter Branch Name"
                                                                                    name={`bankDetails.${idx}.branchName`}
                                                                                />
                                                                                <div className='text-danger'>
                                                                                    {errors?.bankDetails?.[idx]?.branchName}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                <button type='button' className="btn btn-primary mb-3 ms-3" onClick={handleAddBank}>
                                                                    Add New Info
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Business Details Section */}
                                                    <div className="accordion-item border mt-3">
                                                        <h2 className="accordion-header" id="headingThree">
                                                            <button className="accordion-button collapsed fs-4" type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                Business Details
                                                            </button>
                                                        </h2>
                                                        <div id="collapseThree" className="accordion-collapse collapse border rounded m-3"
                                                            aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                {/* Business Details fields */}
                                                                <div className="row mb-3">
                                                                    <div className="col-md-6">
                                                                        <label className="col-form-label">Registration Number:</label>
                                                                        <Field type="number" className="form-control" name="businessDetails.registrationNumber"
                                                                            placeholder="Enter Registration Number"
                                                                        />
                                                                        <div className='text-danger'>
                                                                            {
                                                                                errors?.businessDetails?.registrationNumber
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <label className="col-form-label">Incorporation Date:</label>
                                                                        <Field type="date" className="form-control" name="businessDetails.incorporationDate"
                                                                        />
                                                                        <div className='text-danger'>
                                                                            {
                                                                                errors?.businessDetails?.incorporationDate
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-3">
                                                                    <div className="col-md-6">
                                                                        <label className="col-form-label">Select Industry Type:</label>
                                                                        <Field as="select" className="form-control" name="businessDetails.industryType"
                                                                        >
                                                                            <option value="">Select Industry Type</option>
                                                                            <option value="Agriculture & Farming">Agriculture & Farming</option>
                                                                            <option value="Fishing & Aquaculture">Fishing & Aquaculture</option>
                                                                            <option value="Forestry & Logging">Forestry & Logging</option>
                                                                            <option value="Mining & Quarrying">Mining & Quarrying</option>
                                                                            <option value="Energy (Oil, Gas, Renewable)">Energy (Oil, Gas, Renewable)</option>
                                                                            <option value="Automobile Manufacturing">Automobile Manufacturing</option>
                                                                            <option value="Chemical & Pharmaceutical">Chemical & Pharmaceutical</option>
                                                                            <option value="Construction & Real Estate">Construction & Real Estate</option>
                                                                            <option value="Electronics & Appliances">Electronics & Appliances</option>
                                                                            <option value="Food Processing & Beverages">Food Processing & Beverages</option>
                                                                            <option value="Machinery & Industrial Equipment">Machinery & Industrial Equipment</option>
                                                                            <option value="Textiles & Apparel">Textiles & Apparel</option>
                                                                            <option value="Steel & Metalworks">Steel & Metalworks</option>
                                                                            <option value="Plastic & Polymer Manufacturing">Plastic & Polymer Manufacturing</option>
                                                                            <option value="Furniture & Home Decor">Furniture & Home Decor</option>
                                                                            <option value="Entertainment & Media">Entertainment & Media</option>
                                                                            <option value="Medical & Healthcare">Medical & Healthcare</option>
                                                                            <option value="Education & Training">Education & Training</option>
                                                                            <option value="Information Technology (IT)">Information Technology (IT)</option>
                                                                            <option value="Financial Services">Financial Services</option>
                                                                            <option value="Retail & E-commerce">Retail & E-commerce</option>
                                                                            <option value="Hospitality & Tourism">Hospitality & Tourism</option>
                                                                            <option value="Transport & Logistics">Transport & Logistics</option>
                                                                            <option value="Telecommunications">Telecommunications</option>
                                                                            <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                                                                            <option value="Research & Development">Research & Development</option>
                                                                            <option value="Data Analytics">Data Analytics</option>
                                                                            <option value="AI & Machine Learning">AI & Machine Learning</option>
                                                                            <option value="Consulting Services">Consulting Services</option>
                                                                            <option value="Government & Public Administration">Government & Public Administration
                                                                            </option>
                                                                            <option value="Non-Profit & NGOs">Non-Profit & NGOs</option>
                                                                            <option value="Corporate Headquarters">Corporate Headquarters</option>
                                                                            <option value="Real Estate & Property Management">Real Estate & Property Management</option>
                                                                            <option value="Environmental Services">Environmental Services</option>
                                                                            <option value="Fashion & Lifestyle">Fashion & Lifestyle</option>
                                                                            <option value="Aerospace & Defense">Aerospace & Defense</option>
                                                                            <option value="Legal Services">Legal Services</option>
                                                                            <option value="Media & Advertising">Media & Advertising</option>
                                                                            <option value="Sports & Recreation">Sports & Recreation</option>
                                                                        </Field>
                                                                        <div className='text-danger'>
                                                                            {
                                                                                errors?.businessDetails?.industryType
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* </div> */}


                                                    <div className="mt-4 mb-4 text-center" >
                                                        <button type="button" className="btn btn-secondary me-2">Cancel</button>
                                                        <button type="submit" className="btn btn-primary" onClick={() => { }}>Save</button>
                                                    </div>
                                                </div>

                                                {/* <!-- Buttons --> */}
                                            </div>
                                        </div>
                                    </div >
                                </Form >


                            </div >
                        )
                        }
                    </Formik >
                )}

                {Account === 'Edit' && (
                    <div className="ms-3 me-3" >
                        <div className="card mb-4 mt-3">
                            <div className="card-header text-center">
                                <h3 className="mb-0">Stock Information</h3>
                            </div>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Alias</th>
                                            <th>City</th>
                                            <th>State</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {forms?.items?.map((stock, index) => (
                                            <tr key={stock?.id}>
                                                <td>{stock?.name}</td>
                                                <td>{stock?.alias}</td>
                                                <td>{stock?.city}</td>
                                                <td>{stock?.state}</td>
                                                <td>{stock?.email}</td>
                                                <td>{stock?.phone}</td>
                                                <td className=' d-flex align-items-center gap-2'>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => {
                                                            setSelectedStock(stock);
                                                            setShowView(true);
                                                        }}
                                                    >
                                                        <i class="fa fa-eye" aria-hidden="true"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-success"
                                                        data-bs-toggle="modal"
                                                        data-bs-target={`#edit_library_book_${index}`}
                                                    >
                                                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleDelete(stock._id)}
                                                    >
                                                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                                                    </button>
                                                </td>
                                                <div className="modal fade" id={`edit_library_book_${index}`}>
                                                    <div className="modal-dialog modal-dialog-centered bg-transparent" style={{ maxWidth: '70%' }}>
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h4 className="modal-title">Edit Book</h4>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                            </div>
                                                            <Formik
                                                                initialValues={stock}
                                                                onSubmit={(v) => handleEdit(v, stock?._id)}
                                                            >{({ values }) => (
                                                                <div  >
                                                                    <Form >
                                                                        <div className="">
                                                                            <div className="card-header d-flex justify-content-between align-items-center">
                                                                                <h2 className="text-dark">Account Management</h2>
                                                                            </div>

                                                                            <div className="card-body text-capitalize">
                                                                                <div className="row">
                                                                                    {/* <!-- Personal Info Section --> */}
                                                                                    <div className="accordion" id="accordionExample">
                                                                                        {/* Personal Info Section */}
                                                                                        <div className="accordion-item border">
                                                                                            <h2 className="accordion-header" >
                                                                                                <button
                                                                                                    className="accordion-button fs-4"
                                                                                                    type="button"
                                                                                                >
                                                                                                    Personal Info Edit
                                                                                                </button>
                                                                                            </h2>
                                                                                            <div
                                                                                                id="collapsePersonalInfo"
                                                                                                className="accordion-collapse collapse border m-4 rounded show"
                                                                                                aria-labelledby="headingPersonalInfo"
                                                                                                data-bs-parent="#accordionExample"
                                                                                            >
                                                                                                <div className="accordion-body">
                                                                                                    {/* Company Name & Alias */}
                                                                                                    <div className="row mb-3">
                                                                                                        <div className="col-md-6">
                                                                                                            <label className="col-form-label">Company Name:</label>
                                                                                                            <Field
                                                                                                                type="text" className="form-control" placeholder="Enter Name" name="name"

                                                                                                            // handleChange={handleChange}

                                                                                                            />

                                                                                                        </div>

                                                                                                        <div className="col-md-6">
                                                                                                            <label className="col-form-label">Alias:</label>
                                                                                                            <Field
                                                                                                                type="text"
                                                                                                                className="form-control"
                                                                                                                placeholder="Enter Alias"
                                                                                                                name="alias"
                                                                                                            // value={stock.alias}
                                                                                                            />

                                                                                                        </div>
                                                                                                    </div>

                                                                                                    {/* State, Country, City, Address */}
                                                                                                    <div className="row mb-3">
                                                                                                        <div className="col-md-6">
                                                                                                            <label className="col-form-label">State:</label>
                                                                                                            <Field
                                                                                                                type="text"
                                                                                                                className="form-control"
                                                                                                                placeholder="Enter State"
                                                                                                                name="state"
                                                                                                            // value={stock.state}
                                                                                                            />

                                                                                                        </div>
                                                                                                        <div className="col-md-6">
                                                                                                            <label className="col-form-label">Country:</label>
                                                                                                            <Field
                                                                                                                type="text"
                                                                                                                className="form-control"
                                                                                                                placeholder="Enter Country"
                                                                                                                name="country"
                                                                                                            // value={stock.country}
                                                                                                            />

                                                                                                        </div>
                                                                                                    </div>

                                                                                                    <div className="row mb-3">
                                                                                                        <div className="col-md-6">
                                                                                                            <label className="col-form-label">City:</label>
                                                                                                            <Field
                                                                                                                type="text"
                                                                                                                className="form-control"
                                                                                                                placeholder="Enter City"
                                                                                                                name="city"
                                                                                                            // value={stock?.city}
                                                                                                            />
                                                                                                        </div>
                                                                                                        <div className="col-md-6">
                                                                                                            <label className="col-form-label">Address:</label>
                                                                                                            <Field
                                                                                                                type="text"
                                                                                                                className="form-control"
                                                                                                                placeholder="Enter Address"
                                                                                                                name="address"
                                                                                                            // value={stock.address}
                                                                                                            />

                                                                                                        </div>
                                                                                                    </div>

                                                                                                    {/* Phone No & Email */}
                                                                                                    <div className="row mb-3">
                                                                                                        <div className="col-md-6">
                                                                                                            <label className="col-form-label">Phone No:</label>
                                                                                                            <Field
                                                                                                                type="number"
                                                                                                                className="form-control"
                                                                                                                placeholder="Enter Phone"
                                                                                                                name="phone"
                                                                                                            // value={stock.phone}
                                                                                                            />

                                                                                                        </div>
                                                                                                        <div className="col-md-6">
                                                                                                            <label className="col-form-label">Email:</label>
                                                                                                            <Field
                                                                                                                type="email"
                                                                                                                className="form-control"
                                                                                                                placeholder="Enter Email"
                                                                                                                name="email"
                                                                                                            // value={stock.email}
                                                                                                            />

                                                                                                        </div>
                                                                                                    </div>

                                                                                                    {/* Alternate Phone No & Website */}
                                                                                                    <div className="row mb-3">
                                                                                                        <div className="col-md-6">
                                                                                                            <label className="col-form-label">Alternate Phone No:</label>
                                                                                                            <Field
                                                                                                                type="number"
                                                                                                                className="form-control"
                                                                                                                placeholder="Enter Telephone"
                                                                                                                name="alternatePhone"
                                                                                                            // value={stock.alternatePhone}
                                                                                                            />

                                                                                                        </div>
                                                                                                        <div className="col-md-6">
                                                                                                            <label className="col-form-label">Website:</label>
                                                                                                            <Field
                                                                                                                type="text"
                                                                                                                className="form-control"
                                                                                                                placeholder="Enter Website"
                                                                                                                name="website"
                                                                                                            // value={stock.website}
                                                                                                            />

                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>


                                                                                    {/* <!-- Firm Info Section --> */}
                                                                                    <div className="accordion" id="accordionExample">
                                                                                        {/* Firm Info Section */}
                                                                                        <div className="accordion-item border mt-3">
                                                                                            <h2 className="accordion-header" id="headingOne">
                                                                                                <button className="accordion-button collapsed fs-4" type="button" data-bs-toggle="collapse"
                                                                                                    data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                                                                    Firm Info
                                                                                                </button>
                                                                                            </h2>
                                                                                            <div id="collapseOne" className="accordion-collapse collapse border rounded m-3" aria-labelledby="headingOne"
                                                                                                data-bs-parent="#accordionExample">
                                                                                                <div className="accordion-body">
                                                                                                    {/* Firm Info fields */}
                                                                                                    <div className="row mb-3">
                                                                                                        <div className="col-md-6">
                                                                                                            <label className="col-form-label">Company Category:</label>
                                                                                                            <Field name="companyCategory" className="form-control"
                                                                                                            //  value={stock.companyCategory} 
                                                                                                            />
                                                                                                        </div>
                                                                                                        <div className="col-md-6">
                                                                                                            <label className="col-form-label">Currency Type:</label>
                                                                                                            <Field className="form-control" name="currencyType" />
                                                                                                            {/* // value={stock.currencyType} /> */}
                                                                                                        </div>

                                                                                                    </div>
                                                                                                    <div className="row mb-3">
                                                                                                        <div className="col-md-6">
                                                                                                            <label className="col-form-label">Adhar No:</label>
                                                                                                            <Field type="number" name="aadharNumber" className="form-control" placeholder="Enter Aadhar"
                                                                                                            // value={stock.aadharNumber}
                                                                                                            />


                                                                                                        </div>
                                                                                                        <div className="col-md-6">
                                                                                                            <label className="col-form-label">GST Type:</label>
                                                                                                            <Field type="text" className="form-control" name='gst.type'
                                                                                                            // value={stock?.gst?.type} 
                                                                                                            />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="row mb-3">
                                                                                                        <div className="col-md-6">
                                                                                                            <label className="col-form-label">GST No:</label>
                                                                                                            <Field type="number" className="form-control" name='gst.gstNumber'
                                                                                                            // value={stock?.gst?.gstNumber}
                                                                                                            />

                                                                                                        </div>
                                                                                                        <div className="col-md-6">
                                                                                                            <label className="col-form-label">Firm Type:</label>
                                                                                                            <Field className="form-control" name='gst.firmType'
                                                                                                            // value={stock.gst.firmType}
                                                                                                            />

                                                                                                        </div>
                                                                                                        <div className="col-md-6">
                                                                                                            <label className="col-form-label">PAN:</label>
                                                                                                            <Field type="text" name="panNumber" className="form-control" placeholder="Enter PAN"
                                                                                                            // value={stock.panNumber} 
                                                                                                            />

                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>

                                                                                        {/* Contact Persons */}
                                                                                        <div id="accordionExample" className="accordion">

                                                                                            <div className="accordion-item border mt-3" >
                                                                                                <h2 className="accordion-header">
                                                                                                    <button
                                                                                                        className="accordion-button collapsed fs-4"
                                                                                                        type="button"
                                                                                                        data-bs-toggle="collapse"
                                                                                                        data-bs-target="#collapse"
                                                                                                        aria-expanded="false"
                                                                                                        aria-controls="collapse"
                                                                                                    >
                                                                                                        Contact Person Info
                                                                                                    </button>
                                                                                                </h2>
                                                                                                <div
                                                                                                    id="collapse"
                                                                                                    className="accordion-collapse collapse border rounded m-3"
                                                                                                >
                                                                                                    {values?.contactPersons?.map((_, idx) => (
                                                                                                        <div className="accordion-body">
                                                                                                            <div className="row">
                                                                                                                <div className="col-md-6">
                                                                                                                    <label className="col-form-label">Contact Person Name:</label>
                                                                                                                    <Field
                                                                                                                        type="text"
                                                                                                                        className="form-control"
                                                                                                                        name={`contactPersons.${idx}.name`}
                                                                                                                        placeholder="Enter Name"
                                                                                                                    // value={stock.contactPersons[idx].name}
                                                                                                                    />

                                                                                                                </div>
                                                                                                                <div className="col-md-6">
                                                                                                                    <label className="col-form-label">Designation:</label>
                                                                                                                    <Field
                                                                                                                        type="text"
                                                                                                                        className="form-control"
                                                                                                                        name={`contactPersons.${idx}.designation`}
                                                                                                                        placeholder="Enter Designation"
                                                                                                                    // value={stock.contactPersons[idx].designation}
                                                                                                                    />

                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="row mb-3">
                                                                                                                <div className="col-md-6">
                                                                                                                    <label className="col-form-label">Phone:</label>
                                                                                                                    <Field
                                                                                                                        type="number"
                                                                                                                        className="form-control"
                                                                                                                        name={`contactPersons.${idx}.phone`}
                                                                                                                        placeholder="Enter Phone"
                                                                                                                    // value={stock.contactPersons[idx].phone}
                                                                                                                    />

                                                                                                                </div>
                                                                                                                <div className="col-md-6">
                                                                                                                    <label className="col-form-label">Email:</label>
                                                                                                                    <Field
                                                                                                                        type="text"
                                                                                                                        className="form-control"
                                                                                                                        name={`contactPersons.${idx}.email`}
                                                                                                                        placeholder="Enter Email"
                                                                                                                    // value={stock.contactPersons[idx].email}
                                                                                                                    />

                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    ))}
                                                                                                </div>
                                                                                            </div>


                                                                                            {/* Button to add new form */}
                                                                                        </div>




                                                                                        {/* Bank Details Section */}
                                                                                        <div className="accordion-item border mt-3">
                                                                                            <h2 className="accordion-header" id="headingTwo">
                                                                                                <button className="accordion-button collapsed fs-4" type="button" data-bs-toggle="collapse"
                                                                                                    data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                                                    Bank Details
                                                                                                </button>
                                                                                            </h2>
                                                                                            <div id="collapseTwo" className="accordion-collapse collapse border rounded m-3" aria-labelledby="headingTwo"
                                                                                                data-bs-parent="#accordionExample">
                                                                                                <div className="accordion-body">
                                                                                                    {/* Bank Details fields */}
                                                                                                    {values?.bankDetails?.map((_, idx) => (
                                                                                                        <div key={idx}>
                                                                                                            <div className="row mb-3">
                                                                                                                <div className="col-md-6">
                                                                                                                    <label className="col-form-label">Bank Account No:</label>
                                                                                                                    <Field type="number" className="form-control" placeholder="Enter Bank Account"
                                                                                                                        name={`bankDetails.${idx}.accountNumber`}
                                                                                                                    // value={stock.bankDetails[idx].accountNumber}
                                                                                                                    />

                                                                                                                </div>
                                                                                                                <div className="col-md-6">
                                                                                                                    <label className="col-form-label">IFSC No:</label>
                                                                                                                    <Field type="text" className="form-control" placeholder="Enter IFSC No" name={`bankDetails.${idx}.ifscCode`} />
                                                                                                                    {/* // value={stock.bankDetails[idx].ifscCode} /> */}

                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="row mb-3">
                                                                                                                <div className="col-md-6">
                                                                                                                    <label className="col-form-label">Bank Holder Name:</label>
                                                                                                                    <Field type="text" className="form-control" placeholder="Enter Bank Holder Name"
                                                                                                                        name={`bankDetails.${idx}.accountHolderName`}
                                                                                                                    // value={stock.bankDetails[idx].accountHolderName}
                                                                                                                    />

                                                                                                                </div>
                                                                                                                <div className="col-md-6">
                                                                                                                    <label className="col-form-label">Bank Name:</label>
                                                                                                                    <Field type="text" className="form-control" placeholder="Enter Bank Name" name={`bankDetails.${idx}.bankName`}
                                                                                                                    // value={stock.bankDetails[idx].bankName}
                                                                                                                    />

                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="row mb-3">
                                                                                                                <div className="col-md-6">
                                                                                                                    <label className="col-form-label">Branch Name:</label>
                                                                                                                    <Field type="text" className="form-control" placeholder="Enter Branch Name"
                                                                                                                        name={`bankDetails.${idx}.branchName`}
                                                                                                                    // value={stock.bankDetails[idx].branchName}
                                                                                                                    />

                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    ))}
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>

                                                                                        {/* Business Details Section */}
                                                                                        <div className="accordion-item border mt-3">
                                                                                            <h2 className="accordion-header" id="headingThree">
                                                                                                <button className="accordion-button collapsed fs-4" type="button" data-bs-toggle="collapse"
                                                                                                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                                                    Business Details
                                                                                                </button>
                                                                                            </h2>
                                                                                            <div id="collapseThree" className="accordion-collapse collapse border rounded m-3"
                                                                                                aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                                                                <div className="accordion-body">
                                                                                                    {/* Business Details fields */}
                                                                                                    <div className="row mb-3">
                                                                                                        <div className="col-md-6">
                                                                                                            <label className="col-form-label">Registration Number:</label>
                                                                                                            <Field type="number" className="form-control" name="businessDetails.registrationNumber"
                                                                                                                placeholder="Enter Registration Number"
                                                                                                            // value={stock.businessDetails.registrationNumber}
                                                                                                            />

                                                                                                        </div>
                                                                                                        <div className="col-md-6">
                                                                                                            <label className="col-form-label">Incorporation Date:</label>
                                                                                                            <Field type="" className="form-control" name="businessDetails.incorporationDate"
                                                                                                            // value={stock?.businessDetails?.incorporationDate}
                                                                                                            />

                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="row mb-3">
                                                                                                        <div className="col-md-6">
                                                                                                            <label className="col-form-label">Select Industry Type:</label>
                                                                                                            <Field className="form-control" name="businessDetails.industryType" />
                                                                                                            {/* // value={stock.businessDetails.industryType} /> */}

                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        {/* </div> */}


                                                                                        <div className="mt-4 mb-4 text-center" >
                                                                                            {/* <button type="button" className="btn btn-secondary me-2" onClick={() => setpopup(false)}>Cancel</button> */}
                                                                                            <button type="submit" className="btn btn-primary" onClick={() => { }}>Save</button>
                                                                                        </div>
                                                                                    </div>

                                                                                    {/* <!-- Buttons --> */}
                                                                                </div>
                                                                            </div>
                                                                        </div >
                                                                    </Form >


                                                                </div>
                                                            )}

                                                            </Formik>
                                                        </div>
                                                    </div>
                                                </div>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* View Modal */}
                                {showView && selectedStock && (
                                    <div
                                        className="modal fade show"
                                        tabIndex="-1"
                                        style={{
                                            display: "block",
                                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                                            zIndex: 1050,
                                        }}
                                    >
                                        <div className="modal-dialog modal-dialog-centered modal-lg">
                                            <div className="modal-content border-0 rounded-4 shadow-lg" >
                                                {/* Modal Header */}
                                                <div className="modal-header bg-dark text-white">
                                                    <h3 className="modal-title fw-bold text-uppercase text-white">View Stock Details</h3>
                                                    <button
                                                        type="button"
                                                        className="btn-close btn-close-white"
                                                        onClick={() => setShowView(false)}
                                                    ></button>
                                                </div>

                                                {/* Modal Body */}
                                                <div className="modal-body px-4 py-3">
                                                    <div className="accordion " id="accordionExample">
                                                        {/* Personal Info Accordion */}
                                                        <div className="accordion-item  border mt-3">
                                                            <h2 className="accordion-header" id="headingPersonalInfo">
                                                                <button
                                                                    className="accordion-button"
                                                                    type="button"
                                                                    data-bs-toggle="collapse"
                                                                    data-bs-target="#collapsePersonalInfo"
                                                                    aria-expanded="true"
                                                                    aria-controls="collapsePersonalInfo"
                                                                >
                                                                    Personal Information
                                                                </button>
                                                            </h2>
                                                            <div id="collapsePersonalInfo" className="accordion-collapse collapse show  "
                                                                aria-labelledby="headingPersonalInfo"
                                                                data-bs-parent="#accordionExample"
                                                            >
                                                                <div className="accordion-body">
                                                                    <div className="row">
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Name:</strong> {selectedStock.name}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Alias:</strong> {selectedStock.alias}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>City:</strong>
                                                                                {selectedStock.city}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>State:</strong> {selectedStock.state}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Country:</strong> {selectedStock.country}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Email:</strong> {selectedStock.email}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Phone:</strong> {selectedStock.phone}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Firm Info Accordion */}
                                                        <div className="accordion-item  border mt-3">
                                                            <h2 className="accordion-header" id="headingFirmInfo">
                                                                <button
                                                                    className="accordion-button"
                                                                    type="button"
                                                                    data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseFirmInfo"
                                                                    aria-expanded="true"
                                                                    aria-controls="collapseFirmInfo"
                                                                >
                                                                    Firm Information
                                                                </button>
                                                            </h2>
                                                            <div
                                                                id="collapseFirmInfo"
                                                                className="accordion-collapse collapse"
                                                                aria-labelledby="headingFirmInfo"
                                                                data-bs-parent="#accordionExample"
                                                            >
                                                                <div className="accordion-body">
                                                                    <div className="row">
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Name:</strong> {selectedStock.name}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Alias:</strong> {selectedStock.alias}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>City:</strong> {selectedStock.city}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>State:</strong> {selectedStock.state}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Country:</strong> {selectedStock.country}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Email:</strong> {selectedStock.email}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Phone:</strong> {selectedStock.phone}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Contact Info Accordion */}
                                                        <div className="accordion-item  border mt-3">
                                                            <h2 className="accordion-header" id="headingContactInfo">
                                                                <button
                                                                    className="accordion-button"
                                                                    type="button"
                                                                    data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseContactInfo"
                                                                    aria-expanded="true"
                                                                    aria-controls="collapseContactInfo"
                                                                >
                                                                    Contact Info
                                                                </button>
                                                            </h2>
                                                            <div
                                                                id="collapseContactInfo"
                                                                className="accordion-collapse collapse"
                                                                aria-labelledby="headingContactInfo"
                                                                data-bs-parent="#accordionExample"
                                                            >
                                                                <div className="accordion-body">
                                                                    <div className="row">
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Name:</strong> {selectedStock.name}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Alias:</strong> {selectedStock.alias}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>City:</strong> {selectedStock.city}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>State:</strong> {selectedStock.state}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Country:</strong> {selectedStock.country}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Email:</strong> {selectedStock.email}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Phone:</strong> {selectedStock.phone}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Bank Details Accordion */}
                                                        <div className="accordion-item  border mt-3">
                                                            <h2 className="accordion-header" id="headingBankDetails">
                                                                <button
                                                                    className="accordion-button"
                                                                    type="button"
                                                                    data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseBankDetails"
                                                                    aria-expanded="true"
                                                                    aria-controls="collapseBankDetails"
                                                                >
                                                                    Bank Details
                                                                </button>
                                                            </h2>
                                                            <div
                                                                id="collapseBankDetails"
                                                                className="accordion-collapse collapse"
                                                                aria-labelledby="headingBankDetails"
                                                                data-bs-parent="#accordionExample"
                                                            >
                                                                <div className="accordion-body">
                                                                    <div className="row">
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Name:</strong> {selectedStock.name}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Alias:</strong> {selectedStock.alias}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>City:</strong> {selectedStock.city}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>State:</strong> {selectedStock.state}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Country:</strong> {selectedStock.country}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Email:</strong> {selectedStock.email}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Phone:</strong> {selectedStock.phone}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Business Details Accordion */}
                                                        <div className="accordion-item  border mt-3">
                                                            <h2 className="accordion-header" id="headingBusinessDetails">
                                                                <button
                                                                    className="accordion-button"
                                                                    type="button"
                                                                    data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseBusinessDetails"
                                                                    aria-expanded="true"
                                                                    aria-controls="collapseBusinessDetails"
                                                                >
                                                                    Business Details
                                                                </button>
                                                            </h2>
                                                            <div
                                                                id="collapseBusinessDetails"
                                                                className="accordion-collapse collapse"
                                                                aria-labelledby="headingBusinessDetails"
                                                                data-bs-parent="#accordionExample"
                                                            >
                                                                <div className="accordion-body">
                                                                    <div className="row">
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Name:</strong> {selectedStock.name}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Alias:</strong> {selectedStock.alias}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>City:</strong> {selectedStock.city}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>State:</strong> {selectedStock.state}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Country:</strong> {selectedStock.country}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Email:</strong> {selectedStock.email}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Phone:</strong> {selectedStock.phone}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                {/* Modal Footer */}
                                                <div className="modal-footer d-flex justify-content-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary mx-2"
                                                        onClick={() => setShowView(false)}
                                                    >
                                                        close
                                                    </button>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )}


                            </div>
                        </div>
                    </div>
                )}

                {Account === "Display" && (
                    <div className="ms-3 me-3  mt-3" >
                        <div className="card">
                            <div className="card-header text-center">
                                <h3 className="mb-0">Stock Information</h3>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Alias</th>
                                            <th>City</th>
                                            <th>State</th>
                                            <th>Country</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {forms?.items?.map((stock) => (
                                            <tr key={stock.id}>
                                                <td>{stock.name}</td>
                                                <td>{stock.alias}</td>
                                                <td>{stock.city}</td>
                                                <td>{stock.state}</td>
                                                <td>{stock.country}</td>
                                                <td>{stock.email}</td>
                                                <td>{stock.phone}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => {
                                                            setSelectedStock(stock);
                                                            setShowView(true);
                                                        }}
                                                    >
                                                        View
                                                    </button>


                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* View Modal */}
                                {showView && selectedStock && (
                                    <div
                                        className="modal fade show"
                                        tabIndex="-1"
                                        style={{
                                            display: "block",
                                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                                            zIndex: 1050,
                                        }}
                                    >
                                        <div className="modal-dialog modal-dialog-centered modal-lg">
                                            <div className="modal-content border-0 rounded-4 shadow-lg" >
                                                {/* Modal Header */}
                                                <div className="modal-header bg-dark text-white">
                                                    <h3 className="modal-title fw-bold text-uppercase text-white">View Stock Details</h3>
                                                    <button
                                                        type="button"
                                                        className="btn-close btn-close-white"
                                                        onClick={() => setShowView(false)}
                                                    ></button>
                                                </div>

                                                {/* Modal Body */}
                                                <div className="modal-body px-4 py-3">
                                                    <div className="accordion " id="accordionExample">
                                                        {/* Personal Info Accordion */}
                                                        <div className="accordion-item  border mt-3">
                                                            <h2 className="accordion-header" id="headingPersonalInfo">
                                                                <button
                                                                    className="accordion-button"
                                                                    type="button"
                                                                    data-bs-toggle="collapse"
                                                                    data-bs-target="#collapsePersonalInfo"
                                                                    aria-expanded="true"
                                                                    aria-controls="collapsePersonalInfo"
                                                                >
                                                                    Personal Information
                                                                </button>
                                                            </h2>
                                                            <div id="collapsePersonalInfo" className="accordion-collapse collapse show  "
                                                                aria-labelledby="headingPersonalInfo"
                                                                data-bs-parent="#accordionExample"
                                                            >
                                                                <div className="accordion-body">
                                                                    <div className="row">
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Name:</strong> {selectedStock.name}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Alias:</strong> {selectedStock.alias}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>City:</strong> {selectedStock.city}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>State:</strong> {selectedStock.state}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Country:</strong> {selectedStock.country}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Email:</strong> {selectedStock.email}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Phone:</strong> {selectedStock.phone}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Firm Info Accordion */}
                                                        <div className="accordion-item  border mt-3">
                                                            <h2 className="accordion-header" id="headingFirmInfo">
                                                                <button
                                                                    className="accordion-button"
                                                                    type="button"
                                                                    data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseFirmInfo"
                                                                    aria-expanded="true"
                                                                    aria-controls="collapseFirmInfo"
                                                                >
                                                                    Firm Information
                                                                </button>
                                                            </h2>
                                                            <div
                                                                id="collapseFirmInfo"
                                                                className="accordion-collapse collapse"
                                                                aria-labelledby="headingFirmInfo"
                                                                data-bs-parent="#accordionExample"
                                                            >
                                                                <div className="accordion-body">
                                                                    <div className="row">
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Name:</strong> {selectedStock.name}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Alias:</strong> {selectedStock.alias}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>City:</strong> {selectedStock.city}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>State:</strong> {selectedStock.state}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Country:</strong> {selectedStock.country}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Email:</strong> {selectedStock.email}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Phone:</strong> {selectedStock.phone}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Contact Info Accordion */}
                                                        <div className="accordion-item  border mt-3">
                                                            <h2 className="accordion-header" id="headingContactInfo">
                                                                <button
                                                                    className="accordion-button"
                                                                    type="button"
                                                                    data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseContactInfo"
                                                                    aria-expanded="true"
                                                                    aria-controls="collapseContactInfo"
                                                                >
                                                                    Contact Info
                                                                </button>
                                                            </h2>
                                                            <div
                                                                id="collapseContactInfo"
                                                                className="accordion-collapse collapse"
                                                                aria-labelledby="headingContactInfo"
                                                                data-bs-parent="#accordionExample"
                                                            >
                                                                <div className="accordion-body">
                                                                    <div className="row">
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Name:</strong> {selectedStock.name}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Alias:</strong> {selectedStock.alias}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>City:</strong> {selectedStock.city}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>State:</strong> {selectedStock.state}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Country:</strong> {selectedStock.country}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Email:</strong> {selectedStock.email}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Phone:</strong> {selectedStock.phone}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Bank Details Accordion */}
                                                        <div className="accordion-item  border mt-3">
                                                            <h2 className="accordion-header" id="headingBankDetails">
                                                                <button
                                                                    className="accordion-button"
                                                                    type="button"
                                                                    data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseBankDetails"
                                                                    aria-expanded="true"
                                                                    aria-controls="collapseBankDetails"
                                                                >
                                                                    Bank Details
                                                                </button>
                                                            </h2>
                                                            <div
                                                                id="collapseBankDetails"
                                                                className="accordion-collapse collapse"
                                                                aria-labelledby="headingBankDetails"
                                                                data-bs-parent="#accordionExample"
                                                            >
                                                                <div className="accordion-body">
                                                                    <div className="row">
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Name:</strong> {selectedStock.name}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Alias:</strong> {selectedStock.alias}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>City:</strong> {selectedStock.city}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>State:</strong> {selectedStock.state}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Country:</strong> {selectedStock.country}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Email:</strong> {selectedStock.email}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Phone:</strong> {selectedStock.phone}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Business Details Accordion */}
                                                        <div className="accordion-item  border mt-3">
                                                            <h2 className="accordion-header" id="headingBusinessDetails">
                                                                <button
                                                                    className="accordion-button"
                                                                    type="button"
                                                                    data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseBusinessDetails"
                                                                    aria-expanded="true"
                                                                    aria-controls="collapseBusinessDetails"
                                                                >
                                                                    Business Details
                                                                </button>
                                                            </h2>
                                                            <div
                                                                id="collapseBusinessDetails"
                                                                className="accordion-collapse collapse"
                                                                aria-labelledby="headingBusinessDetails"
                                                                data-bs-parent="#accordionExample"
                                                            >
                                                                <div className="accordion-body">
                                                                    <div className="row">
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Name:</strong> {selectedStock.name}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Alias:</strong> {selectedStock.alias}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>City:</strong> {selectedStock.city}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>State:</strong> {selectedStock.state}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Country:</strong> {selectedStock.country}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Email:</strong> {selectedStock.email}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <div className="p-3 border rounded-3" style={{ background: "#fff" }}>
                                                                                <strong>Phone:</strong> {selectedStock.phone}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="modal-footer d-flex justify-content-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary mx-2"
                                                        onClick={() => setShowView(false)}
                                                    >
                                                        close
                                                    </button>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
                }

            </div >
        </>
    )
}


export default Stock





















{/* <div>
                                        <div>
                                           
                                            <div className="row mb-3">
                                                <label className="col-md-4 col-form-label">Payment Mode:</label>
                                                <div className="col-md-8">
                                                    <select
                                                        className="form-control"
                                                    
                                                        onChange={(e) => setPaymentMode(e.target.value)}
                                                    >
                                                        <option value="">Select Your Type</option>
                                                        <option value="mobile">Mobile Payment</option>
                                                        <option value="cash">Cash Payment</option>
                                                        <option value="check">Check Payment</option>
                                                        <option value="bank">Bank Transfer</option>
                                                    </select>
                                                </div>
                                            </div>


                                            {paymentMode === 'bank' && (
                                                <div>
                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-form-label">Bank Account:</label>
                                                        <div className="col-md-8">
                                                            <field type="text" className="form-control" placeholder="Enter Bank Account" />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-form-label">IFSC No:</label>
                                                        <div className="col-md-8">
                                                            <field type="text" className="form-control" placeholder="Enter IFSC No" />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-form-label">Bank Holder Name:</label>
                                                        <div className="col-md-8">
                                                            <field type="text" className="form-control" placeholder="Enter Bank Holder Name" />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-form-label">Bank Name:</label>
                                                        <div className="col-md-8">
                                                            <field type="text" className="form-control" placeholder="Enter Bank Name" />
                                                        </div>
                                                    </div>
                                                    <div />
                                                </div>
                                            )}

                                            {paymentMode === 'mobile' && (
                                                <div>
                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-form-label">Upi No :</label>
                                                        <div className="col-md-8">
                                                            <field type="text" className="form-control" placeholder="Enter Bank Account" />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-form-label">UPI ID :</label>
                                                        <div className="col-md-8">
                                                            <field type="text" className="form-control" placeholder="Enter Bank Account" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {paymentMode === 'check' && (
                                                <div>
                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-form-label">Check NO : </label>
                                                        <div className="col-md-8">
                                                            <field type="text" className="form-control" placeholder="Enter Bank Account" />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-form-label">Check Date</label>
                                                        <div className="col-md-8">
                                                            <field type="date" className="form-control" placeholder="Enter Bank Account" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            
                                        </div>
                                    </div> */}



