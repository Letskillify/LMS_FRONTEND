import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Select from "react-select";
// import "bootstrap/dist/css/bootstrap.min.css";

const Vourchar = () => {
    const [formData, setFormData] = useState({}); // To store form data
    const [itemId, setItemId] = useState([]); // To store item details from backend
    const [companyNames, setCompanyNames] = useState([]); // To store company names

    // Fetch company names
    const fetchCompanyNames = async () => {
        try {
            const response = await axios.get("/api/firm-account/get");
            setCompanyNames(response?.data || []);
        } catch (error) {
            console.error("Error fetching company names:", error);
        }
    };

    // Fetch item IDs
    const fetchItemIds = async () => {
        try {
            const response = await axios.get("/api/inventory/get");
            setItemId(response?.data || []);
        } catch (error) {
            console.error("Error fetching item IDs:", error);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchCompanyNames();
        fetchItemIds();
    }, []);

    // Initial form values
    const formInitialValues = {
        POnumber: "",
        purchaseId: "",
        itemId: [], // Array for multiple items
        invoiceNo: "",
        Date: "",
        purchasedBy: "",
        seller: "",
        tradeType: "",
        isShippingPaid: false,
        shippingDetails: {
            shippingInfo: {
                name: "",
                contactNumber: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                postalCode: "",
                country: "",
                shippingMethod: "",
                trackingNumber: "",
                estimatedDeliveryDate: "",
                actualDeliveryDate: "",
                shippingAmount: "",
            },
        },
        additionalCharges: [{ reason: "", charges: "" }],
    };

    // Corrected validation schema
    const validationSchema = Yup.object({
        POnumber: Yup.string().required("P.O. Number is required"),
        purchaseId: Yup.string().required("Purchase ID is required"),
        itemId: Yup.array()
            .of(Yup.string().required("Item is required"))
            .min(1, "At least one item must be selected"),
        invoiceNo: Yup.string().required("Invoice Number is required"),
        Date: Yup.date().required("Date is required"),
        purchasedBy: Yup.string().required("Purchased By is required"),
        seller: Yup.string().required("Seller is required"),
        isShippingPaid: Yup.boolean().required("Shipping Paid status is required"),
        shippingDetails: Yup.object().shape({
            shippingInfo: Yup.lazy((_, context) => {
                const isShippingPaid = context.parent?.isShippingPaid;

                // If `isShippingPaid` is true, apply the validation rules
                if (isShippingPaid) {
                    return Yup.object().shape({
                        name: Yup.string().required("Name is required"),
                        contactNumber: Yup.string()
                            .matches(/^\d{10}$/, "Contact number must be 10 digits")
                            .required("Contact Number is required"),
                        addressLine1: Yup.string().required("Address Line 1 is required"),
                        addressLine2: Yup.string().required("Address Line 2 is required"),
                        city: Yup.string().required("City is required"),
                        state: Yup.string().required("State is required"),
                        postalCode: Yup.string().required("Postal Code is required"),
                        country: Yup.string().required("Country is required"),
                        shippingMethod: Yup.string().required("Shipping Method is required"),
                        trackingNumber: Yup.string().required("Tracking Number is required"),
                        estimatedDeliveryDate: Yup.date().required(
                            "Estimated Delivery Date is required"
                        ),
                        actualDeliveryDate: Yup.date().required(
                            "Actual Delivery Date is required"
                        ),
                        shippingAmount: Yup.number().required("Shipping Amount is required"),
                    });
                }

                // If `isShippingPaid` is false or undefined, make the fields optional
                return Yup.object().shape({
                    name: Yup.string(),
                    contactNumber: Yup.string(),
                    addressLine1: Yup.string(),
                    addressLine2: Yup.string(),
                    city: Yup.string(),
                    state: Yup.string(),
                    postalCode: Yup.string(),
                    country: Yup.string(),
                    shippingMethod: Yup.string(),
                    trackingNumber: Yup.string(),
                    estimatedDeliveryDate: Yup.date(),
                    actualDeliveryDate: Yup.date(),
                    shippingAmount: Yup.number(),
                });
            }),
        }),
    });
    // Form submission
    const handleFormSubmit = async (values) => {
        try {
            if (!values.isShippingPaid) {
                values.shippingDetails.shippingInfo = {}; // Clear shipping info if not required
            }

            console.log("Submitting Data:", values);
            const response = await axios.post("/api/voucher/purchase/post", values);
            console.log("Form submitted successfully:", response.data);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    console.log(itemId);
    
    return (
        <div className="container mt-5">
            <Formik
                initialValues={formInitialValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
            >
                {({ values,setFieldValue }) => (
                    <div className="card p-4 shadow-sm">
                        <h2 className="mb-4 text-center">Vourchar Account</h2>
                        <Form className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">P.O. Number:</label>
                                <Field name="POnumber" type="number" className="form-control" />
                                <ErrorMessage name="POnumber" component="div" className="text-danger" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Purchased By:</label>
                                <Field name="purchasedBy" type="text" className="form-control" />
                                <ErrorMessage name="purchasedBy" component="div" className="text-danger" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Invoice Number:</label>
                                <Field name="invoiceNo" type="text" className="form-control" />
                                <ErrorMessage name="invoiceNo" component="div" className="text-danger" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Date:</label>
                                <Field name="Date" type="date" className="form-control" />
                                <ErrorMessage name="Date" component="div" className="text-danger" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Seller:</label>
                                <Field as="select" name="seller" className="form-control">
                                    <option disabled value="">
                                        Select Seller
                                    </option>
                                    {companyNames.map((company, i) => (
                                        <option key={i} value={company._id}>
                                            {company.name || "Unnamed Company"}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="seller" component="div" className="text-danger" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Trade Type:</label>
                                <Field name="tradeType" type="text" className="form-control" />
                                <ErrorMessage name="tradeType" component="div" className="text-danger" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Item Name:</label>
                                <Field name="itemId">
                                    {({ field }) => (
                                        <Select
                                            isMulti
                                            options={itemId.map(sec => ({
                                                value: sec._id,
                                                label: sec.itemDetails.name
                                            }))}
                                            name="itemId"
                                            value={values.itemId.map(s => ({
                                                value: s,
                                                label: itemId.find(sec => sec._id === s).itemDetails.name
                                            }))}
                                            onChange={itemId => setFieldValue("itemId", itemId.map(s => s.value))}
                                            placeholder="Select Item name"
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
                                <ErrorMessage name="itemId" component="div" className="text-danger" />
                            </div>

                            <div className="col-md-6 mt-4">
                                <label className="form-check-label">
                                    <Field name="isShippingPaid" type="checkbox" className="form-check-input me-2" />
                                    Is Shipping Paid?
                                </label>
                            </div>

                            {/* Conditional Shipping Details */}
                            {values.isShippingPaid && (
                                <>
                                    <h3 className="mt-4">Shipping Details</h3>
                                    <div className="col-md-6">
                                        <label className="form-label">Name:</label>
                                        <Field name="shippingDetails.shippingInfo.name" type="text" className="form-control" />
                                        <ErrorMessage name="shippingDetails.shippingInfo.name" component="div" className="text-danger" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Contact Number:</label>
                                        <Field
                                            name="shippingDetails.shippingInfo.contactNumber"
                                            type="text"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="shippingDetails.shippingInfo.contactNumber"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Address:</label>
                                        <Field
                                            name="shippingDetails.shippingInfo.addressLine1"
                                            type="text"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="shippingDetails.shippingInfo.addressLine1"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">City:</label>
                                        <Field
                                            name="shippingDetails.shippingInfo.city"
                                            type="text"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="shippingDetails.shippingInfo.city"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">State:</label>
                                        <Field
                                            name="shippingDetails.shippingInfo.state"
                                            type="text"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="shippingDetails.shippingInfo.state"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Country:</label>
                                        <Field
                                            name="shippingDetails.shippingInfo.country"
                                            type="text"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="shippingDetails.shippingInfo.country"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Pincode:</label>
                                        <Field
                                            name="shippingDetails.shippingInfo.postalCode"
                                            type="text"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="shippingDetails.shippingInfo.postalCode"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Shipping Method:</label>
                                        <Field
                                            as="select"
                                            name="shippingDetails.shippingInfo.shippingMethod"
                                            className="form-control"
                                        >
                                            <option value="Standard">Standard</option>
                                            <option value="Express">Express</option>
                                            <option value="Overnight">Overnight</option>
                                            <option value="Same-Day">Same-Day</option>
                                        </Field>
                                        <ErrorMessage
                                            name="shippingDetails.shippingInfo.shippingMethod"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Tracking Number:</label>
                                        <Field
                                            name="shippingDetails.shippingInfo.trackingNumber"
                                            type="text"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="shippingDetails.shippingInfo.trackingNumber"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Estimated Delivery Date:</label>
                                        <Field
                                            name="shippingDetails.shippingInfo.estimatedDeliveryDate"
                                            type="date"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="shippingDetails.shippingInfo.estimatedDeliveryDate"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Actual Delivery Date:</label>
                                        <Field
                                            name="shippingDetails.shippingInfo.actualDeliveryDate"
                                            type="date"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="shippingDetails.shippingInfo.actualDeliveryDate"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Shipping Amount:</label>
                                        <Field
                                            name="shippingDetails.shippingInfo.shippingAmount"
                                            type="text"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="shippingDetails.shippingInfo.shippingAmount"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                </>
                            )}
                            <div className="col-12 text-center">
                                <button type="submit" className="btn btn-primary btn-sm">
                                    Submit
                                </button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default Vourchar; 
