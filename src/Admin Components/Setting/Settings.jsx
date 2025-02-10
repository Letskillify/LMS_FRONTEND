import { Field, Formik, Form } from "formik";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { MainContext } from "../../Controller/MainProvider";
import { Bounce, toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import axios from "axios";

const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
]
const paymentMethods = [
    { value: "UPI", label: "UPI" },
    { value: "Bank Transfer", label: "Bank Transfer" },
    { value: "Cash", label: "Cash" },
    { value: "Credit/Debit Card", label: "Credit/Debit Card" },
]
const Settings = () => {
    const [activeTab, setActiveTab] = useState("School");
    const { Settings, userId } = useContext(MainContext)
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const defaultValues = {
        instituteId: userId,
        general: {
            academicYear: Settings?.general?.academicYear || "2024-20",
            timezone: "UTC"
        },
        uploads: {
            logo: "",
            watermark: "",
            authoritySignature: "",
            marksheetQR: ""
        },
        fees: {
            feesApplicableMonths: [],
            lateFeesFine: {
                isFineEnable: false,
                isSameDayFineEnable: false
            }
        },
        feesReceipt: {
            feeReceiptLabel: "",
            feeReceiptPrefix: "",
            fieldsToShowOnReceipt: []
        },
        payment: {
            availablePaymentModes: [
                {
                    mode: '',
                    details: {
                        accountName: "",
                        accountNumber: "",
                        ifscCode: "",
                        upiId: "",
                        qrCode: ""
                    }
                }
            ],
            invoicePrefix: ""
        },
        notification: {
            dailyFeeCollectionNotification: {
                mobileNumber: [],
                notificationTime: new Date().setHours(0, 0, 0)
            },
            email: false,
            sms: false
        },
        biometrics: {
            devicecSRno: "",
            members: []
        },
        attendance: {
            punchInTime: new Date(),
            punchOutTime: new Date(),
            markLate: []
        },
        library: {
            maxBooksIssued: 0,
            finePerDay: 0,
            membershipRequired: true
        },
        email: {
            host: "",
            port: 0,
            secure: false,
            auth: {
                user: "",
                pass: ""
            },
            from: "",
            encryption: ""
        },
        sms: {
            accountSid: "",
            authToken: "",
            from: ""
        },
        option: {
            logo: {
                feesReceipt: false,
                idCards: false,
                admitCards: false,
                marksheet: false,
                transferCertificate: false,
                expense: false
            },
            organisationAddress: {
                feesReceipt: false,
                idCards: false,
                admitCards: false,
                marksheet: false,
                transferCertificate: false,
                expense: false
            },
            affiliationCode: {
                feesReceipt: false,
                idCards: false,
                admitCards: false,
                marksheet: false,
                transferCertificate: false,
                expense: false
            },
            affiliatedTo: {
                feesReceipt: false,
                idCards: false,
                admitCards: false,
                marksheet: false,
                transferCertificate: false,
                expense: false
            },
            organisationCode: {
                feesReceipt: false,
                idCards: false,
                admitCards: false,
                marksheet: false,
                transferCertificate: false,
                expense: false
            },
            watermark: {
                feesReceipt: false,
                idCards: false,
                admitCards: false,
                marksheet: false,
                transferCertificate: false,
                demandBill: false,
                expense: false
            },
            phone: {
                feesReceipt: false,
                idCards: false,
                admitCards: false,
                marksheet: false,
                transferCertificate: false,
                expense: false
            },
            email: {
                feesReceipt: false,
                idCards: false,
                admitCards: false,
                marksheet: false,
                transferCertificate: false,
                expense: false
            },
            classTeacherSignature: {
                idCards: false,
                admitCards: false,
                marksheet: false,
                transferCertificate: false
            },
            principalSignature: {
                idCards: false,
                admitCards: false,
                marksheet: false,
                transferCertificate: false
            },
            feesReceipt: {
                generateNewReceiptNoOnDelete: false,
                resetReceiptNoOnSessionChange: false,
                hideTotalFees: false,
                hidePreviousPaidFees: false,
                hideDiscount: false,
                hideBalanceFees: false,
                hideReceivingAmountWords: false
            },
            feesReceiptPrint: {
                printSinglePage: false,
                printQuarterA4: false,
                printHalfPage: false,
                openReceiptInNewTab: false,
                hideFeesReceivedBy: false,
                onlyAdminPastDateSelection: false
            },
            gstNumber: {
                showOnFeesReceipt: false
            },
            udiseCode: {
                marksheet: false,
                transferCertificate: false,
                idCard: false,
                admitCard: false,
                forms: false,
                expense: false
            },
            tagline: {
                marksheet: false,
                transferCertificate: false,
                idCard: false,
                admitCard: false,
                forms: false,
                feesReceipt: false,
                expense: false
            },
            qrCode: {
                marksheet: false
            },
            accountantSignature: {
                feesReceipt: false
            },
            studentSetting: {
                canChangePassword: false,
                canChangeEmail: false,
                canChangePhoneNo: false,
                canParentsChangeNo: false
            }
        }
    };

    const [initialValues, setInitialValues] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                if (Settings === "Not Found") {
                    // Default values ko API me save karein
                    const response = await axios.post('/api/settings/post', defaultValues);
                    if (response.status === 201) {
                        toast.success("Default settings created successfully", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme: "colored",
                            transition: Bounce,
                        });
                        setInitialValues(defaultValues); // Default values set karein
                    }
                } else {
                    setInitialValues(Settings); // API se aaye data ko set karein
                }
            } catch (error) {
                toast.error(error.response ? error.response.data.message : error.message, {
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

        fetchSettings();
    }, [Settings]);




    const handleSubmit = async (values) => {
        console.log("Form values:", values);

        try {
            const response = await axios.put(`/api/settings/update/${values?._id}`, values, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                console.log("Settings updated successfully:", response.data);
                toast.success("Settings updated successfully", {
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
            } else {
                toast.warn("Unexpected response", {
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
            }
        } catch (error) {
            console.error("Error updating settings:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Error updating settings", {
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
        }
    }


    return (
        Settings ? (
            <div className="container mt-5" >
                {/* Navigation Tabs */}
                < div className="card p-4">
                    <div className="overflow-auto" style={{ maxWidth: "100vw" }}>
                        <ul className="nav nav-tabs mb-3 border" role="tablist" style={{ flexWrap: "nowrap" }}>
                            {[
                                "School", "Fees", "Auto Generate", "Biometric", "Attendance",
                                "Options", "Payment", "Library", "SMS", "Mail", "Notifications",
                                "Activities", "Clear Cache"
                            ].map((tab) => (
                                <li className="nav-item" key={tab} onClick={() => handleTabChange(tab)}>
                                    <a className={`nav-link px-3 ${activeTab === tab ? "active" : ""}`} href="#" style={{ whiteSpace: "nowrap" }}>
                                        {tab}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Form Section */}
                    {initialValues ? (
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                        >
                            {({ values, setFieldValue, handleChange, handleSubmit }) => (
                                <Form name="settings-form" className="border p-3 rounded mt-3">
                                    {activeTab === "School" && (
                                        <div className="row mt-4">
                                            {/* General Settings Section */}
                                            <h5>General Settings</h5>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Academic Year</label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="e.g., 2024-25"
                                                        name="general.academicYear"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Timezone</label>
                                                    <Field
                                                        component="select"
                                                        className="form-control"
                                                        name="general.timezone"
                                                    >
                                                        <option value="UTC">UTC</option>
                                                        <option value="GMT">GMT</option>
                                                        {/* Add more timezones as needed */}
                                                    </Field>
                                                </div>
                                            </div>

                                            {/* Uploads Section */}
                                            <h5 className="mt-4">Uploads</h5>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Logo</label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        name="uploads.logo"
                                                        onChange={(event) => setFieldValue("uploads.logo", event.currentTarget.files[0])}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Watermark</label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        name="uploads.watermark"
                                                        onChange={(event) => setFieldValue("uploads.watermark", event.currentTarget.files[0])}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Authority Signature</label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        name="uploads.authoritySignature"
                                                        onChange={(event) => setFieldValue("uploads.authoritySignature", event.currentTarget.files[0])}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Marksheet QR</label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        name="uploads.marksheetQR"
                                                        onChange={(event) => setFieldValue("uploads.marksheetQR", event.currentTarget.files[0])}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === "Fees" && (
                                        <div className="row mt-4">
                                            {/* Fees Settings Section */}
                                            <h5>Fees Settings</h5>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label"> In which months fees are applicable? </label>
                                                    <Field name="fees.feesApplicableMonths">
                                                        {({ field }) => (
                                                            <Select
                                                                isMulti
                                                                options={months}
                                                                name="fees.feesApplicableMonths"
                                                                value={values?.fees?.feesApplicableMonths?.map(month => ({ value: month, label: month }))
                                                                }
                                                                onChange={selected => setFieldValue("fees.feesApplicableMonths", selected.map(item => item.value))}
                                                                placeholder="Select Months"
                                                                styles={{
                                                                    multiValue: base => ({
                                                                        ...base,
                                                                        backgroundColor: "#e0f7fa",
                                                                        borderRadius: "5px",
                                                                        padding: "1px"
                                                                    })
                                                                }}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Late Fee Fine Settings</label>
                                                    <div className="form-check">
                                                        <Field
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            name="fees.lateFeesFine.isFineEnable"
                                                        />
                                                        <label className="form-check-label">Late fee fine enable/disable</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <Field
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            name="fees.lateFeesFine.isSameDayFineEnable"
                                                        />
                                                        <label className="form-check-label">Same-day fine enable/disable</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Fee Receipt Settings</label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="feesReceipt.feeReceiptLabel"
                                                        placeholder="Receipt name (e.g., School Fee Receipt)"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="feesReceipt.feeReceiptPrefix"
                                                        placeholder="Prefix for receipt numbers (e.g., INV-)"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Fields to show on receipt</label>
                                                    <Field
                                                        component="select"
                                                        className="form-control"
                                                        name="feesReceipt.fieldsToShowOnReceipt"
                                                        multiple
                                                    >
                                                        <option value="Student Name">Student Name</option>
                                                        <option value="Class">Class</option>
                                                        <option value="Date">Date</option>
                                                        {/* Add more fields as needed */}
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === "Auto Generate" && (
                                        <div className="row mt-4">
                                            {/* Invoice Settings Section */}
                                            <h5>Invoice Settings</h5>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Invoice Prefix</label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="payment.invoicePrefix"
                                                        placeholder="Invoice prefix (e.g., 'INV-2024')"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === "Biometric" && (
                                        <div className="row mt-4">
                                            {/* Biometric Settings Section */}
                                            <h5>Biometric Settings</h5>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Biometric device serial number</label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="biometrics.devicecSRno"
                                                        placeholder="Biometric device ka serial number"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Registered biometric users</label>
                                                    <Field
                                                        component="select"
                                                        className="form-control"
                                                        name="biometrics.members"
                                                        multiple
                                                    >
                                                        {/* Add more fields as needed */}
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === "Attendance" && (
                                        <div className="row mt-4">
                                            {/* Attendance Settings Section */}
                                            <h5>Attendance Settings</h5>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Entry time (e.g., 9:00 AM)</label>
                                                    <Field
                                                        className="form-control"
                                                        type="time"
                                                        name="attendance.punchInTime"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Exit time (e.g., 3:00 PM)</label>
                                                    <Field
                                                        className="form-control"
                                                        type="time"
                                                        name="attendance.punchOutTime"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Late Marking Rules</label>
                                                    <Field
                                                        component="select"
                                                        className="form-control"
                                                        name="attendance.markLate"
                                                        multiple
                                                    >
                                                        <option value="After 9:15 AM">After 9:15 AM</option>
                                                        {/* Add more fields as needed */}
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === "Options" && (
                                        <div className="row mt-4">
                                            {/* Logo Visibility Section */}
                                            <h5>Logo Visibility</h5>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.logo.feesReceipt"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.logo.feesReceipt">Show logo in fees receipt</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.logo.idCards"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.logo.idCards">Show logo in ID cards</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.logo.admitCards"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.logo.admitCards">Show logo in admit cards</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.logo.marksheet"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.logo.marksheet">Show logo in marksheet</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.logo.transferCertificate"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.logo.transferCertificate">Show logo in TC</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.logo.expense"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.logo.expense">Show logo in expense reports</label>
                                                </div>
                                            </div>

                                            {/* Organisation Address & Accountant Signature Visibility Section */}
                                            <h5 className="mt-4">Organisation Address</h5>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.organisationAddress.feesReceipt"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.organisationAddress.feesReceipt">Show address in fees receipt</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.organisationAddress.idCards"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.organisationAddress.idCards">Show address in ID cards</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.organisationAddress.admitCards"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.organisationAddress.admitCards">Show address in admit cards</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.organisationAddress.marksheet"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.organisationAddress.marksheet">Show address in marksheet</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.organisationAddress.transferCertificate"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.organisationAddress.transferCertificate">Show address in TC</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.organisationAddress.expense"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.organisationAddress.expense">Show address in expense reports</label>
                                                </div>
                                            </div>
                                            <h5 className="mt-4">Organisation Code</h5>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.organisationCode.admitCards"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.organisationCode.admitCards">Show organisation code in admit cards</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.organisationCode.expense"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.organisationCode.expense">Show organisation code in expense reports</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.organisationCode.feesReceipt"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.organisationCode.feesReceipt">Show organisation code in fees receipt</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.organisationCode.idCards"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.organisationCode.idCards">Show organisation code in ID cards</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.organisationCode.marksheet"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.organisationCode.marksheet">Show organisation code in marksheet</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.organisationCode.transferCertificate"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.organisationCode.transferCertificate">Show organisation code in TC</label>
                                                </div>
                                            </div>
                                            <h5 className="mt-4">Affiliated To</h5>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.affiliatedTo.admitCards"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.affiliatedTo.admitCards">Show affiliatedTo in admit cards</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.affiliatedTo.expense"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.affiliatedTo.expense">Show affiliatedTo in expense reports</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.affiliatedTo.feesReceipt"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.affiliatedTo.feesReceipt">Show affiliatedTo in fees receipt</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.affiliatedTo.idCards"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.affiliatedTo.idCards">Show affiliatedTo in id cards</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.affiliatedTo.marksheet"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.affiliatedTo.marksheet">Show affiliatedTo in marksheet</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.affiliatedTo.transferCertificate"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.affiliatedTo.transferCertificate">Show affiliatedTo in transfer certificate</label>
                                                </div>
                                            </div>
                                            <h5 className="mt-4">Affiliation Code</h5>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.affiliationCode.admitCards"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.affiliationCode.admitCards">Show affiliationCode in admitCards</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.affiliationCode.expense"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.affiliationCode.expense">Show affiliationCode in expense</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.affiliationCode.feesReceipt"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.affiliationCode.feesReceipt">Show affiliationCode in fees receipt</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.affiliationCode.idCards"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.affiliationCode.idCards">Show affiliationCode in id cards</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.affiliationCode.marksheet"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.affiliationCode.marksheet">Show affiliationCode in marksheet</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.affiliationCode.transferCertificate"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.affiliationCode.transferCertificate">Show affiliationCode in transfer certificate</label>
                                                </div>
                                            </div>
                                            <h5 className="mt-4">Class Teacher Signature</h5>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.classTeacherSignature.admitCards"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.classTeacherSignature.admitCards">Show class teacher signature in admit cards</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.classTeacherSignature.idCards"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.classTeacherSignature.idCards">Show class teacher signature in id cards</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.classTeacherSignature.marksheet"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.classTeacherSignature.marksheet">Show class teacher signature in marksheet</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.classTeacherSignature.transferCertificate"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.classTeacherSignature.transferCertificate">Show class teacher signature in transfer certificate</label>
                                                </div>
                                            </div>
                                            <h5 className="mt-4">Email Visibility</h5>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.email.admitCards"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.email.admitCards">Show email in admit cards</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.email.expense"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.email.expense">Show email in expense</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.email.feesReceipt"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.email.feesReceipt">Show email in fees receipt</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.email.idCards"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.email.idCards">Show email in id cards</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.email.marksheet"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.email.marksheet">Show email in marksheet</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.email.transferCertificate"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.email.transferCertificate">Show email in transfer certificate</label>
                                                </div>
                                            </div>
                                            <h5 className="mt-4">Fees Receipt Settings</h5>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.feesReceipt.generateNewReceiptNoOnDelete"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.feesReceipt.generateNewReceiptNoOnDelete">Generate new receipt no. on delete</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.feesReceipt.hideBalanceFees"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.feesReceipt.hideBalanceFees">Hide balance fees</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.feesReceipt.hideDiscount"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.feesReceipt.hideDiscount">Hide discount</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.feesReceipt.hidePreviousPaidFees"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.feesReceipt.hidePreviousPaidFees">Hide previous paid fees</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.feesReceipt.hideReceivingAmountWords"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.feesReceipt.hideReceivingAmountWords">Hide receiving amount words</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.feesReceipt.hideTotalFees"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.feesReceipt.hideTotalFees">Hide total fees</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.feesReceipt.resetReceiptNoOnSessionChange"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.feesReceipt.resetReceiptNoOnSessionChange">Reset receipt no. on session change</label>
                                                </div>
                                            </div>
                                            <h5 className="mt-4">Fees Receipt Print Settings</h5>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.feesReceiptPrint.hideFeesReceivedBy"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.feesReceiptPrint.hideFeesReceivedBy">Hide fees received by</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.feesReceiptPrint.onlyAdminPastDateSelection"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.feesReceiptPrint.onlyAdminPastDateSelection">Only admin can select past date</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.feesReceiptPrint.openReceiptInNewTab"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.feesReceiptPrint.openReceiptInNewTab">Open receipt in new tab</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.feesReceiptPrint.printHalfPage"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.feesReceiptPrint.printHalfPage">Print half page</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.feesReceiptPrint.printQuarterA4"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.feesReceiptPrint.printQuarterA4">Print quarter A4</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.feesReceiptPrint.printSinglePage"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.feesReceiptPrint.printSinglePage">Print single page</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.gstNumber.showOnFeesReceipt"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.gstNumber.showOnFeesReceipt">Show GST number in fees receipt</label>
                                                </div>
                                            </div>
                                            <h5 className="mt-4">Phone Visibility</h5>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.phone.admitCards"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.phone.admitCards">Show phone in admit cards</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.phone.expense"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.phone.expense">Show phone in expense</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.phone.feesReceipt"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.phone.feesReceipt">Show phone in fees receipt</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.phone.idCards"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.phone.idCards">Show phone in id cards</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.phone.marksheet"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.phone.marksheet">Show phone in marksheet</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.phone.transferCertificate"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.phone.transferCertificate">Show phone in transfer certificate</label>
                                                </div>
                                            </div>
                                            <h5 className="mt-4">Principal Signature Visibility</h5>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.principalSignature.admitCards"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.principalSignature.admitCards">Show principal signature in admit cards</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.principalSignature.idCards"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.principalSignature.idCards">Show principal signature in id cards</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.principalSignature.marksheet"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.principalSignature.marksheet">Show principal signature in marksheet</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.principalSignature.transferCertificate"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.principalSignature.transferCertificate">Show principal signature in transfer certificate</label>
                                                </div>
                                            </div>
                                            <h5 className="mt-4">Student Settings</h5>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.studentSetting.canChangeEmail"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.studentSetting.canChangeEmail">Student can change email</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.studentSetting.canChangePassword"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.studentSetting.canChangePassword">Student can change password</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.studentSetting.canChangePhoneNo"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.studentSetting.canChangePhoneNo">Student can change phone number</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.studentSetting.canParentsChangeNo"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.studentSetting.canParentsChangeNo">Parents can change phone number</label>
                                                </div>
                                            </div>
                                            <h5 className="mt-4">Tagline Visibility</h5>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.tagline.admitCard"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.tagline.admitCard">Show tagline in admit card</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.tagline.expense"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.tagline.expense">Show tagline in expense</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.tagline.feesReceipt"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.tagline.feesReceipt">Show tagline in fees receipt</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.tagline.forms"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.tagline.forms">Show tagline in forms</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.tagline.idCard"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.tagline.idCard">Show tagline in id card</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.tagline.marksheet"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.tagline.marksheet">Show tagline in marksheet</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.tagline.transferCertificate"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.tagline.transferCertificate">Show tagline in transfer certificate</label>
                                                </div>
                                            </div>
                                            <h5 className="mt-4">UDISE Code Visibility</h5>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.udiseCode.admitCard"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.udiseCode.admitCard">Show UDISE code in admit card</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.udiseCode.expense"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.udiseCode.expense">Show UDISE code in expense</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.udiseCode.forms"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.udiseCode.forms">Show UDISE code in forms</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.udiseCode.idCard"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.udiseCode.idCard">Show UDISE code in id card</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.udiseCode.marksheet"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.udiseCode.marksheet">Show UDISE code in marksheet</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.udiseCode.transferCertificate"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.udiseCode.transferCertificate">Show UDISE code in transfer certificate</label>
                                                </div>
                                            </div>
                                            <h5 className="mt-4">Watermark Visibility</h5>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.watermark.admitCards"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.watermark.admitCards">Show watermark in admit cards</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.watermark.demandBill"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.watermark.demandBill">Show watermark in demand bill</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.watermark.expense"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.watermark.expense">Show watermark in expense</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.watermark.feesReceipt"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.watermark.feesReceipt">Show watermark in fees receipt</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.watermark.idCards"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.watermark.idCards">Show watermark in id cards</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.watermark.marksheet"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.watermark.markSheet">Show watermark in marksheet</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.watermark.transferCertificate"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.watermark.transferCertificate">Show watermark in transfer certificate</label>
                                                </div>
                                            </div>
                                            <h5 className="mt-4">Accountant Signature Visibility</h5>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.accountantSignature.feesReceipt"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.accountantSignature.feesReceipt">Show accountant signature in fees receipt</label>
                                                </div>
                                            </div>
                                            <h5 className="mt-4">QR Code Visibility</h5>
                                            <div className="col-md-4">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="option.qrCode.marksheet"
                                                    />
                                                    <label className="form-check-label" htmlFor="option.qrCode.marksheet">Show QR Code in marksheet</label>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === "Payment" && (
                                        <div className="row mt-4">
                                            {/* Payment Methods Section */}
                                            <h5>Payment Methods Available</h5>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Mode</label>
                                                    <Field
                                                        component="select"
                                                        className="form-select"
                                                        name="payment.availablePaymentModes.mode"
                                                    >
                                                        <option>Select Mode</option>
                                                        <option value="UPI">UPI</option>
                                                        <option value="Bank Transfer">Bank Transfer</option>
                                                        <option value="Cash">Cash</option>
                                                        <option value="Credit/Debit Card">Credit/Debit Card</option>
                                                    </Field>
                                                </div>
                                            </div>
                                            {values.payment.availablePaymentModes.mode === "UPI" && (
                                                <>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">UPI Id</label>
                                                            <Field
                                                                type="text"
                                                                className="form-control"
                                                                name="payment.availablePaymentModes.details.upiId"
                                                                placeholder="Enter UPI ID"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Qr Code</label>
                                                            <Field
                                                                type="file"
                                                                className="form-control"
                                                                name="payment.availablePaymentModes.details.qrCode"
                                                                placeholder="Enter Qr Code"
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                            {values.payment.availablePaymentModes.mode === "UPI" && (
                                                <>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">UPI Id</label>
                                                            <Field
                                                                type="text"
                                                                className="form-control"
                                                                name="payment.availablePaymentModes.details.upiId"
                                                                placeholder="Enter UPI ID"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Qr Code</label>
                                                            <Field
                                                                type="file"
                                                                className="form-control"
                                                                name="payment.availablePaymentModes.details.qrCode"
                                                                placeholder="Enter Qr Code"
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                            {/* Invoice Prefix Section */}
                                            <h5 className="mt-4">Invoice Prefix</h5>
                                            <div className="col-md-6">
                                                <label className="form-label">Prefix</label>
                                                <div className="mb-3">
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="payment.invoicePrefix"
                                                        placeholder="Enter invoice prefix (e.g. PG-2024)"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === "Mail" && (
                                        <div className="row mt-4">
                                            {/* SMTP Settings Section */}
                                            <h5>SMTP Settings</h5>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="email.host"
                                                        placeholder="SMTP Host (e.g., smtp.example.com)"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <Field
                                                        type="number"
                                                        className="form-control"
                                                        name="email.port"
                                                        placeholder="Port number (e.g., 587)"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="email.secure"
                                                    />
                                                    <label className="form-check-label" htmlFor="smtpSettings.secure">SSL/TLS Enable (true/false)</label>
                                                </div>
                                            </div>

                                            {/* Authentication Section */}
                                            <h5 className="mt-4">Authentication</h5>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="email.auth.user"
                                                        placeholder="SMTP Username"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <Field
                                                        type="password"
                                                        className="form-control"
                                                        name="email.auth.pass"
                                                        placeholder="SMTP Password"
                                                    />
                                                </div>
                                            </div>

                                            {/* Sender Details Section */}
                                            <h5 className="mt-4">Sender Details</h5>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <Field
                                                        type="email"
                                                        className="form-control"
                                                        name="email.from"
                                                        placeholder="Email sender address"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="email.encryption"
                                                        placeholder="Encryption method (e.g., SSL)"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === "Notifications" && (
                                        <div className="row mt-4">
                                            {/* Daily Fee Collection Notification Section */}
                                            <h5>Daily Fee Collection Notification</h5>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="notificationSettings.mobileNumber"
                                                        placeholder='Mobile Number (e.g., ["+919876543210"])'
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <Field
                                                        type="time"
                                                        className="form-control"
                                                        name="notificationSettings.notificationTime"
                                                        placeholder="Time to send notification"
                                                    />
                                                </div>
                                            </div>

                                            {/* Notification Channels Section */}
                                            <h5 className="mt-4">Notification Channels</h5>
                                            <div className="col-md-6">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="notificationSettings.email"
                                                    />
                                                    <label className="form-check-label" htmlFor="notificationSettings.email">Email Notification Enable/Disable</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="notificationSettings.sms"
                                                    />
                                                    <label className="form-check-label" htmlFor="notificationSettings.sms">SMS Notification Enable/Disable</label>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === "Activities" && (
                                        <div className="row mt-4">
                                            {/* Activity Logs Section */}
                                            <h5>Activity Logs</h5>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <Field
                                                        type="number"
                                                        className="form-control"
                                                        name="activityLogs.maxLogSize"
                                                        placeholder="Max Log Size (in MB)"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <Field
                                                        type="number"
                                                        className="form-control"
                                                        name="activityLogs.maxLogDays"
                                                        placeholder="Max Log Days (in days)"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === "Library" && (
                                        <div className="row mt-4">
                                            {/* Library Settings Options */}
                                            <h5>Library Settings</h5>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <Field
                                                        type="number"
                                                        className="form-control"
                                                        name="library.finePerDay"
                                                        placeholder="Fine Per Day"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <Field
                                                        type="number"
                                                        className="form-control"
                                                        name="library.maxBooksIssued"
                                                        placeholder="Max Books Issued"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="library.membershipRequired"
                                                    />
                                                    <label className="form-check-label" htmlFor="library.membershipRequired">Membership Required</label>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === "SMS" && (
                                        <div className="row mt-4">
                                            {/* Library Settings Options */}
                                            <h5>Library Settings</h5>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="sms.accountSid"
                                                        placeholder="Account SID"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="sms.authToken"
                                                        placeholder="Auth Token"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="sms.from"
                                                        placeholder="From"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === "Clear Cache" && (
                                        <div className="row mt-4">
                                            {/* Clear Cache Options */}
                                            <h5>Clear Cache Options</h5>
                                            <div className="col-md-6">
                                                <div className="mb-3 form-check form-switch">
                                                    <Field
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="clearCache.autoClear"
                                                    />
                                                    <label className="form-check-label" htmlFor="clearCache.autoClear">Enable Auto Cache Clearing</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <Field
                                                        type="number"
                                                        className="form-control"
                                                        name="clearCache.clearInterval"
                                                        placeholder="Clear Interval (in days)"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* Save Button */}
                                    <div className="text-end">
                                        <button type="submit" className="btn btn-primary">
                                            Save Settings
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik >
                    ) : (
                        <div className="d-flex mt-5 justify-content-center align-items-center">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    )}
                </div >
            </div >
        ) : (
            <div className="d-flex mt-5 justify-content-center align-items-center">
                <Spinner animation="border" variant="primary" />
            </div>
        )
    );
};

export default Settings;

