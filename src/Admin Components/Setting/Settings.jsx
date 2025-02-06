import { Field, Formik, Form } from "formik";
import React, { useState } from "react";
import Select from "react-select";

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

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const initialValues = {
        instituteId: "",
        general: {
            academicYear: "",
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
            paymentMethods: [],
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


    return (
        <div className="container mt-5">
            {/* Navigation Tabs */}
            <div className="card p-4">
                <ul className="nav nav-tabs mb-4 border">
                    {[
                        "School", "Fees", "Auto Generate", "Biometric", "Attendance",
                        "Options", "Payment Gateway", "Mail", "Notifications",
                        "Activities", "Clear Cache"
                    ].map((tab) => (
                        <li className="nav-item" key={tab} onClick={() => handleTabChange(tab)}>
                            <a className={`nav-link ${activeTab === tab ? "active" : ""}`} href="#">
                                {tab}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Form Section */}
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => {
                        console.log(values);
                        // Add save logic here
                    }}
                >
                    {({ values, setFieldValue, handleChange, handleSubmit }) => (
                        <Form name="settings-form" className="border p-3 rounded">
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
                                            <Field
                                                type="file"
                                                className="form-control"
                                                name="uploads.logo"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Watermark</label>
                                            <Field
                                                type="file"
                                                className="form-control"
                                                name="uploads.watermark"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Authority Signature</label>
                                            <Field
                                                type="file"
                                                className="form-control"
                                                name="uploads.authoritySignature"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Marksheet QR</label>
                                            <Field
                                                type="file"
                                                className="form-control"
                                                name="uploads.marksheetQR"
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
                                            <label className="form-label"> Kis mahine fees applicable hogi? </label>
                                            <Field name="fees.feesApplicableMonths">
                                                {({ field }) => (
                                                    <Select
                                                        isMulti
                                                        options={months}
                                                        name="fees.feesApplicableMonths"
                                                        value={values.fees.feesApplicableMonths.map(month => ({ value: month, label: month }))
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
                                                name="fees.feeReceiptLabel"
                                                placeholder="Receipt ka naam (e.g., School Fee Receipt)"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <Field
                                                className="form-control"
                                                type="text"
                                                name="fees.feeReceiptPrefix"
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
                                                name="fees.fieldsToShowOnReceipt"
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
                                                name="fees.invoicePrefix"
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
                                            <label className="form-label">Biometric device ka serial number</label>
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
                                    <div className="col-md-6">
                                        <div className="mb-3 form-check form-switch">
                                            <Field
                                                className="form-check-input"
                                                type="checkbox"
                                                name="logoVisibility.feesReceipt"
                                            />
                                            <label className="form-check-label" htmlFor="logoVisibility.feesReceipt">Show logo in fees receipt</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3 form-check form-switch">
                                            <Field
                                                className="form-check-input"
                                                type="checkbox"
                                                name="logoVisibility.idCards"
                                            />
                                            <label className="form-check-label" htmlFor="logoVisibility.idCards">Show logo in ID cards</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3 form-check form-switch">
                                            <Field
                                                className="form-check-input"
                                                type="checkbox"
                                                name="logoVisibility.admitCards"
                                            />
                                            <label className="form-check-label" htmlFor="logoVisibility.admitCards">Show logo in admit cards</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3 form-check form-switch">
                                            <Field
                                                className="form-check-input"
                                                type="checkbox"
                                                name="logoVisibility.marksheet"
                                            />
                                            <label className="form-check-label" htmlFor="logoVisibility.marksheet">Show logo in marksheet</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3 form-check form-switch">
                                            <Field
                                                className="form-check-input"
                                                type="checkbox"
                                                name="logoVisibility.transferCertificate"
                                            />
                                            <label className="form-check-label" htmlFor="logoVisibility.transferCertificate">Show logo in TC</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3 form-check form-switch">
                                            <Field
                                                className="form-check-input"
                                                type="checkbox"
                                                name="logoVisibility.expense"
                                            />
                                            <label className="form-check-label" htmlFor="logoVisibility.expense">Show logo in expense reports</label>
                                        </div>
                                    </div>

                                    {/* Organisation Address Visibility Section */}
                                    <h5 className="mt-4">Organisation Address Visibility</h5>
                                    <div className="col-md-6">
                                        <div className="mb-3 form-check form-switch">
                                            <Field
                                                className="form-check-input"
                                                type="checkbox"
                                                name="organisationAddressVisibility.feesReceipt"
                                            />
                                            <label className="form-check-label" htmlFor="organisationAddressVisibility.feesReceipt">Show address in fees receipt</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3 form-check form-switch">
                                            <Field
                                                className="form-check-input"
                                                type="checkbox"
                                                name="organisationAddressVisibility.idCards"
                                            />
                                            <label className="form-check-label" htmlFor="organisationAddressVisibility.idCards">Show address in ID cards</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3 form-check form-switch">
                                            <Field
                                                className="form-check-input"
                                                type="checkbox"
                                                name="organisationAddressVisibility.admitCards"
                                            />
                                            <label className="form-check-label" htmlFor="organisationAddressVisibility.admitCards">Show address in admit cards</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3 form-check form-switch">
                                            <Field
                                                className="form-check-input"
                                                type="checkbox"
                                                name="organisationAddressVisibility.marksheet"
                                            />
                                            <label className="form-check-label" htmlFor="organisationAddressVisibility.marksheet">Show address in marksheet</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3 form-check form-switch">
                                            <Field
                                                className="form-check-input"
                                                type="checkbox"
                                                name="organisationAddressVisibility.transferCertificate"
                                            />
                                            <label className="form-check-label" htmlFor="organisationAddressVisibility.transferCertificate">Show address in TC</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3 form-check form-switch">
                                            <Field
                                                className="form-check-input"
                                                type="checkbox"
                                                name="organisationAddressVisibility.expense"
                                            />
                                            <label className="form-check-label" htmlFor="organisationAddressVisibility.expense">Show address in expense reports</label>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === "Payment Gateway" && (
                                <div className="row mt-4">
                                    {/* Payment Methods Section */}
                                    <h5>Payment Methods Available</h5>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            {/* <Field
                                                component="select"
                                                className="form-select"
                                                name="paymentMethods"
                                                multiple
                                            >
                                                <option>UPI</option>
                                                <option>Bank Transfer</option>
                                                <option>Cash</option>
                                                <option>Credit/Debit Card</option>
                                            </Field> */}
                                            <Field name="payment.paymentMethods">
                                                {({ field }) => (
                                                    <Select
                                                        isMulti
                                                        options={paymentMethods}
                                                        name="payment.paymentMethods"
                                                        value={values?.paymentMethods?.map(method => ({ value: method, label: method }))
                                                        }
                                                        onChange={selected => setFieldValue("payment.paymentMethods", selected?.map(item => item.value))}
                                                        placeholder="Select payment methods"
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
                                    {/* Invoice Prefix Section */}
                                    <h5 className="mt-4">Invoice Prefix</h5>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <Field
                                                type="text"
                                                className="form-control"
                                                name="invoicePrefix"
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
                                                name="smtpSettings.host"
                                                placeholder="SMTP Host (e.g., smtp.example.com)"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <Field
                                                type="number"
                                                className="form-control"
                                                name="smtpSettings.port"
                                                placeholder="Port number (e.g., 587)"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3 form-check form-switch">
                                            <Field
                                                className="form-check-input"
                                                type="checkbox"
                                                name="smtpSettings.secure"
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
                                                name="smtpSettings.auth.user"
                                                placeholder="SMTP Username"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <Field
                                                type="password"
                                                className="form-control"
                                                name="smtpSettings.auth.pass"
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
                                                name="smtpSettings.from"
                                                placeholder="Email sender address"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <Field
                                                type="text"
                                                className="form-control"
                                                name="smtpSettings.encryption"
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
                </Formik>
            </div>
        </div>
    );
};

export default Settings;

