import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Select from "react-select";
// import "bootstrap/dist/css/bootstrap.min.css";

const Purchase = () => {
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

    useEffect(() => {
        fetchCompanyNames();
        fetchItemIds();
    }, []);


    const handlePurchase = async (values) => {

        try {
            const response = await axios.post("/api/voucher/purchase/post", values);
            if (response.status === 201) {
                console.log("Purchase successful");
                setFormData(response.data);
            }
            console.log(response);

        } catch (error) {
            if (error.response) {
                console.error("Error handling purchase:", error.response.data.error);
            } else {
                console.error("Error handling purchase:", error.message);

            }
        }
    }

    console.log(formData);

    const [additionalCharges, setAdditionalCharges] = useState([
        { reason: "", charges: "" },
    ]);

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updatedCharges = [...additionalCharges];
        updatedCharges[index][name] = value;
        setAdditionalCharges(updatedCharges);
    };

    const handleAddForm = () => {
        setAdditionalCharges([...additionalCharges, { reason: "", charges: "" }]);
    };

    const handleRemoveForm = (index) => {
        const updatedCharges = additionalCharges.filter((_, i) => i !== index);
        setAdditionalCharges(updatedCharges);
    };



    const initialValues = {
        POnumber: "",
        // purchaseId: "",
        itemId: [],
        invoiceNo: "",
        Date: "",
        seller: "",
        purchasedBy: "",
        tradeType: "",
        isShippingPaid: false,
        shippingDetails: {
            name: null,
            contactNumber: null,
            email: null,
            addressLine1: null,
            addressLine2: null,
            city: null,
            state: null,
            postalCode: null,
            country: null,
            shippingMethod: null,
            trackingNumber: null,
            estimatedDeliveryDate: null,
            actualDeliveryDate: null,
            shippingAmount: 0,
        },
        additionalCharges: [{ reason: "", charges: 0.00 }],
        // totalAmount: "",
        // GrandTotalAmount: "",
        currency: "INR",
    };

    const validationSchema = Yup.object({
        POnumber: Yup.number().required("PO number is required"),
        // purchaseId: Yup.string().required("Purchase ID is required"),
        itemId: Yup.array().min(1, "At least one item is required"),
        invoiceNo: Yup.string().required("Invoice number is required"),
        Date: Yup.date().required("Date is required"),
        seller: Yup.string().required("Seller is required"),
        purchasedBy: Yup.string().required("Purchaser is required"),
        shippingDetails: Yup.object().shape({
            name: Yup.string().when("isShippingPaid", {
                is: true,
                then: Yup.string().required("Recipient's name is required"),
            }),
            contactNumber: Yup.string().when("isShippingPaid", {
                is: true,
                then: Yup.string()
                    .matches(/^[0-9]+$/, "Must be a valid number")
                    .required("Contact number is required"),
            }),
            email: Yup.string().email("Invalid email"),
            addressLine1: Yup.string().when("isShippingPaid", {
                is: true,
                then: Yup.string().required("Address is required"),
            }),
            city: Yup.string().when("isShippingPaid", {
                is: true,
                then: Yup.string().required("City is required"),
            }),
            state: Yup.string().when("isShippingPaid", {
                is: true,
                then: Yup.string().required("State is required"),
            }),
            postalCode: Yup.string().when("isShippingPaid", {
                is: true,
                then: Yup.string().required("Postal code is required"),
            }),
            country: Yup.string().when("isShippingPaid", {
                is: true,
                then: Yup.string().required("Country is required"),
            }),
            shippingMethod: Yup.string().when("isShippingPaid", {
                is: true,
                then: Yup.string()
                    .oneOf(["Standard", "Express", "Overnight", "Same-Day"])
                    .required("Shipping method is required"),
            }),
            trackingNumber: Yup.string(),
            estimatedDeliveryDate: Yup.date(),
            actualDeliveryDate: Yup.date(),
            shippingAmount: Yup.number().when("isShippingPaid", {
                is: true,
                then: Yup.number().typeError("Must be a valid number"),
            }),
        }),

        // additionalCharges: Yup.array().of(
        //     Yup.object({
        //         reason: Yup.string().required("Charge reason is required"),
        //         charges: Yup.number().typeError("Charge must be a valid number"),
        //     })
        // ),
        // totalAmount: Yup.number().typeError("Must be a valid number"),
        // GrandTotalAmount: Yup.number().typeError("Must be a valid number"),
        // currency: Yup.string().required("Currency is required"),
    });


    // Form submission

    return (
        <div className="container mt-5">
            <Formik
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={handlePurchase}

            >
                {({ values, setFieldValue }) => (
                    <div className="card p-4 shadow-sm">
                        <h2 className="mb-4 text-center">Vourchar Account</h2>
                        <Form className="row g-3">                               
                           
                            <div className="col-md-6">
                                <label className="form-label">P.O. Number:</label>
                                <Field name="POnumber" type="number" className="form-control" placeholder="Enter Purchase Order Number" />
                                <ErrorMessage name="POnumber" component="div" className="text-danger" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Purchased By:</label>
                                <Field as="select" name="purchasedBy" type="text" className="form-control" >
                                    <option disabled value="">
                                        Select Purchased by
                                    </option>
                                    {companyNames.map((company, i) => (
                                        <option key={i} value={company._id}>
                                            {company.name || "Unnamed Company"}
                                        </option>
                                    ))}
                                </Field>

                                <ErrorMessage name="purchasedBy" component="div" className="text-danger" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Invoice Number:</label>
                                <Field name="invoiceNo" type="number" className="form-control" placeholder="Enter Invoice Number" />
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
                                    {companyNames.filter(company => company._id !== values.purchasedBy).map((company, i) => (
                                        <option key={i} value={company._id} disabled={company._id === values.purchasedBy}>
                                            {company.name || "Unnamed Company"}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="seller" component="div" className="text-danger" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Trade Type:</label>
                                <Field name="tradeType" type="text" className="form-control" placeholder="Enter Trade Type" />
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
                            <div>

                                <Field
                                    name="isShippingPaid"
                                    type="checkbox"
                                    className="form-check-input me-2"
                                    onChange={(e) => setFieldValue("isShippingPaid", e.target.checked)}
                                />
                                <label className="form-check-label">Is Shipping Paid</label>
                                {values?.isShippingPaid && (
                                    <>
                                        <h3 className="mt-4">Shipping Details</h3>
                                        <div className="row">

                                            <div className="col-md-6">
                                                <label className="form-label">Name:</label>
                                                <Field
                                                    name="shippingDetails.name"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Name"
                                                    validate={(value) => {
                                                        if (value === '') {
                                                            return 'Shipping address is required'
                                                        }
                                                    }}
                                                />
                                                <ErrorMessage name="shippingDetails.name" component="div" className="text-danger" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Contact Number:</label>
                                                <Field
                                                    name="shippingDetails.contactNumber"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Contact Number"
                                                    validate={(value) => {
                                                        if (value === '') {
                                                            return 'Contact number is required'
                                                        }
                                                    }}
                                                />

                                                <ErrorMessage
                                                    name="shippingDetails.contactNumber"
                                                    component="div"
                                                    className="text-danger"

                                                />
                                            </div>
                                        </div>
                                        <div className="row">

                                            <div className="col-md-6">
                                                <label className="form-label">Address:</label>
                                                <Field
                                                    name="shippingDetails.addressLine1"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Address"
                                                    validate={(value) => {
                                                        if (value === '') {
                                                            return 'Address is required'
                                                        }
                                                    }}
                                                />
                                                <ErrorMessage
                                                    name="shippingDetails.addressLine1"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">City:</label>
                                                <Field
                                                    name="shippingDetails.city"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter City"
                                                    validate={(value) => {
                                                        if (value === '') {
                                                            return 'City is required'
                                                        }
                                                    }}
                                                />
                                                <ErrorMessage
                                                    name="shippingDetails.city"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="form-label">State:</label>
                                                <Field
                                                    name="shippingDetails.state"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter State"
                                                    validate={(value) => {
                                                        if (value === '') {
                                                            return 'State is required'
                                                        }
                                                    }}
                                                />
                                                <ErrorMessage
                                                    name="shippingDetails.state"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Country:</label>
                                                <Field
                                                    name="shippingDetails.country"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Country"
                                                    validate={(value) => {
                                                        if (value === '') {
                                                            return 'Country is required'
                                                        }
                                                    }}
                                                />
                                                <ErrorMessage
                                                    name="shippingDetails.country"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="form-label">Pincode:</label>
                                                <Field
                                                    name="shippingDetails.postalCode"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Pincode"
                                                    validate={(value) => {
                                                        if (value === '') {
                                                            return 'Pincode is required'
                                                        }
                                                    }}
                                                />
                                                <ErrorMessage
                                                    name="shippingDetails.postalCode"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Shipping Method:</label>
                                                <Field
                                                    as="select"
                                                    name="shippingDetails.shippingMethod"
                                                    className="form-control"
                                                >
                                                    <option value="">Select Shipping Method</option>
                                                    <option value="Standard">Standard</option>
                                                    <option value="Express">Express</option>
                                                    <option value="Overnight">Overnight</option>
                                                    <option value="Same-Day">Same-Day</option>
                                                </Field>
                                                <ErrorMessage
                                                    name="shippingDetails.shippingMethod"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                        </div>
                                        <div className="row">

                                            <div className="col-md-6">
                                                <label className="form-label">Estimated Delivery Date:</label>
                                                <Field
                                                    name="shippingDetails.estimatedDeliveryDate"
                                                    type="date"
                                                    className="form-control"
                                                    placeholder="Enter Estimated Delivery Date"
                                                    validate={(value) => {
                                                        if (value === '') {
                                                            return 'Estimated Delivery Date is required'
                                                        }
                                                    }}
                                                />
                                                <ErrorMessage
                                                    name="shippingDetails.estimatedDeliveryDate"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Actual Delivery Date:</label>
                                                <Field
                                                    name="shippingDetails.actualDeliveryDate"
                                                    type="date"
                                                    className="form-control"
                                                    placeholder="Enter Actual Delivery Date"
                                                    validate={(value) => {
                                                        if (value === '') {
                                                            return 'Actual Delivery Date is required'
                                                        }
                                                    }}
                                                />
                                                <ErrorMessage
                                                    name="shippingDetails.actualDeliveryDate"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                        </div>
                                        <div className="row">

                                            <div className="col-md-6">
                                                <label className="form-label">Tracking Number:</label>
                                                <Field
                                                    name="shippingDetails.trackingNumber"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Tracking Number"
                                                    validate={(value) => {
                                                        if (value === '') {
                                                            return 'Tracking Number is required'
                                                        }
                                                    }}
                                                />
                                                <ErrorMessage
                                                    name="shippingDetails.trackingNumber"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Shipping Amount:</label>
                                                <Field
                                                    name="shippingDetails.shippingAmount"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Shipping Amount"
                                                    validate={(value) => {
                                                        if (value === '') {
                                                            return 'Shipping Amount is required'
                                                        }
                                                    }}

                                                />
                                                <ErrorMessage
                                                    name="shippingDetails.shippingAmount"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className=" mt-5">
                                    <h3>Additional Charges</h3>

                                    {additionalCharges.map((charge, index) => (
                                        <div className="row" key={index}>
                                            <div className="col-md-5">
                                                <label className="form-label">Reason:</label>
                                                <input
                                                    type="text"
                                                    name="reason"
                                                    className="form-control"
                                                    placeholder="Enter reason"
                                                    value={charge.reason}
                                                    onChange={(e) => handleChange(index, e)}
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-5">
                                                <label className="form-label">Charges:</label>
                                                <input
                                                    type="number"
                                                    name="charges"
                                                    className="form-control"
                                                    placeholder="Enter charges amount"
                                                    value={charge.charges}
                                                    onChange={(e) => handleChange(index, e)}
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-2 d-flex align-items-end">
                                                {index > 0 && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger mx-2"
                                                        onClick={() => handleRemoveForm(index)}
                                                    >
                                                        <i class="fa fa-minus-circle" aria-hidden="true"></i>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className="btn btn-primary mt-4"
                                    type="button"
                                    onClick={handleAddForm}
                                >
                                   <i class="fa fa-plus" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div className="col-12 text-center">
                                <button type="submit" className="btn btn-primary btn-md">
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

export default Purchase;



