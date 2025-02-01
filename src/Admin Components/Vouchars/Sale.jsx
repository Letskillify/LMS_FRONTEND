import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Select from "react-select";
import { Bounce, toast } from 'react-toastify';

function SalesVoucherForm() {

    const [formData, setFormData] = useState({});
    const [itemId, setItemId] = useState([]);
    const [companyNames, setCompanyNames] = useState([]);
    const initialValues = {
        SOnumber: "",
        itemId: [],
        invoiceNo: "",
        Date: "",
        buyer: "",
        soldBy: "",
        tradeType: "",
        isShippingPaid: false,
        shippingDetails: {
            name: null,
            contactNumber: null,
            email: null,
            address: null,
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
        discounts: [{ reason: "", amount: "" }],
        additionalCharges: [{ reason: "", charges: "" }],
    };
    const validationSchema = Yup.object({
        SOnumber: Yup.number().required('Sales Order Number is required'),
        saleId: Yup.string().required('Sale ID is required'),
        invoiceNo: Yup.string().required('Invoice Number is required'),
        Date: Yup.date().required('Sales Date is required'),
        buyer: Yup.string().required('Buyer is required'),
        soldBy: Yup.string().required('Seller is required'),
        isShippingPaid: Yup.string().required('Shipping Paid status is required'),
        shippingName: Yup.string().when('isShippingPaid', {
            is: 'true',
            then: Yup.string().required('Recipient Name is required')
        }),
        contactNumber: Yup.string().when('isShippingPaid', {
            is: 'true',
            then: Yup.string().required('Contact Number is required')
        }),
        addressLine1: Yup.string().when('isShippingPaid', {
            is: 'true',
            then: Yup.string().required('Address Line 1 is required')
        }),
        city: Yup.string().when('isShippingPaid', {
            is: 'true',
            then: Yup.string().required('City is required')
        }),
        state: Yup.string().when('isShippingPaid', {
            is: 'true',
            then: Yup.string().required('State is required')
        }),
        postalCode: Yup.string().when('isShippingPaid', {
            is: 'true',
            then: Yup.string().required('Postal Code is required')
        }),
        discounts: Yup.array().of(
            Yup.object().shape({
                reason: Yup.string().required('Discount reason is required'),
                amount: Yup.number().required('Discount amount is required'),
            })
        ),
        additionalCharges: Yup.array().of(
            Yup.object().shape({
                reason: Yup.string().required('Additional charge reason is required'),
                charges: Yup.number().required('Additional charge amount is required'),
            })
        ),
        totalAmount: Yup.number().required('Total Amount is required'),
        GrandTotalAmount: Yup.number().required('Grand Total Amount is required')
    });

    const handleSaleSubmit = async (values) => {
        console.log("Sales voucher values:", values);

        try {
            const response = await axios.post('/api/voucher/sale/post', values, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST"
            });
            if (response.status === 201) {
                console.log("Sales voucher created successfully:", response.data);
                toast.success("Receipt added successfully", {
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
        } catch (error) {
            console.error("Error creating sales voucher:", error);
            toast.error("Sales voucher creation failed", {
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
    }

    const fetchCompanyNames = async () => {
        try {
            const response = await axios.get("/api/firm-account/get");
            setCompanyNames(response?.data || []);
        } catch (error) {
            console.error("Error fetching company names:", error);
        }
    }

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

    return (
        <div>
            <div className="container my-5">
                <div className="card">
                    <div className="card-header text-white text-center">
                        <h3>Sales Voucher Form</h3>
                    </div>
                    <div className="card-body">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSaleSubmit}
                        >
                            {({ setFieldValue, values }) => (
                                <Form>
                                    <h5 className="mb-3 text-primary">Sales Details</h5>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="SOnumber" className="form-label">Sales Order Number</label>
                                            <Field type="number" className="form-control" id="SOnumber" name="SOnumber" placeholder="Enter Sales Order Number" />
                                            <ErrorMessage name="SOnumber" component="div" className="text-danger" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="invoiceNo" className="form-label">Invoice Number</label>
                                            <Field type="text" className="form-control" id="invoiceNo" name="invoiceNo" placeholder="Enter Invoice Number" />
                                            <ErrorMessage name="invoiceNo" component="div" className="text-danger" />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="buyer" className="form-label">Buyer</label>
                                            <Field as="select" name="buyer" className="form-control">
                                                <option value="">Select Buyer</option>
                                                {companyNames.map((company, i) => (
                                                    <option key={i} value={company._id}>
                                                        {company.name || "Unnamed Company"}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="buyer" component="div" className="text-danger" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="soldBy" className="form-label">Sold By</label>
                                            <Field as="select" name="soldBy" className="form-control">
                                                <option value="">Select Seller</option>
                                                {companyNames
                                                    .filter(company => company._id !== values.buyer)
                                                    .map((company, i) => (
                                                        <option key={`${i}-${company._id}`} value={company._id}>
                                                            {company.name || "Unnamed Company"}
                                                        </option>
                                                    ))}
                                            </Field>
                                            <ErrorMessage name="soldBy" component="div" className="text-danger" />
                                        </div>
                                    </div>

                                    <div className="row">
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
                                                        value={values.itemId ? values.itemId.map(s => ({
                                                            value: s,
                                                            label: itemId.find(sec => sec._id === s).itemDetails.name
                                                        })) : []}
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

                                        <div className="col-md-6">
                                            <label htmlFor="Date" className="form-label">Sales Date</label>
                                            <Field type="date" className="form-control" id="Date" name="Date" placeholder="Enter Sales Date" />
                                            <ErrorMessage name="Date" component="div" className="text-danger" />
                                        </div>
                                    </div>

                                    <div className="row mb-3 ms-1">
                                        <label className="form-label">Is Shipping Paid?</label>
                                        <div className="form-check col-1">
                                            <Field type="radio" className="form-check-input" name="isShippingPaid" value="true" id="paidYes" />
                                            <label className="form-check-label" htmlFor="paidYes">Yes</label>
                                        </div>
                                        <div className="form-check col-1">
                                            <Field type="radio" className="form-check-input" name="isShippingPaid" value="false" id="paidNo" />
                                            <label className="form-check-label" htmlFor="paidNo">No</label>
                                        </div>
                                    </div>


                                    {values.isShippingPaid === "true" && (
                                        <div>
                                            <h5 className="mb-3 text-primary">Shipping Details</h5>

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label htmlFor="shippingDetails.name" className="form-label">Recipient Name</label>
                                                    <Field type="text" className="form-control" id="shippingDetails.name" name="shippingDetails[0].name" placeholder="Enter Recipient Name" />
                                                    <ErrorMessage name="shippingDetails[0].name" component="div" className="text-danger" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="shippingDetails.contactNumber" className="form-label">Contact Number</label>
                                                    <Field type="text" className="form-control" id="shippingDetails.contactNumber" name="shippingDetails[0].contactNumber" placeholder="Enter Contact Number" />
                                                    <ErrorMessage name="shippingDetails[0].contactNumber" component="div" className="text-danger" />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-12">
                                                    <label htmlFor="shippingDetails.addressLine1" className="form-label">Address</label>
                                                    <Field type="text" className="form-control" id="shippingDetails.addressLine1" name="shippingDetails[0].addressLine1" placeholder="Enter Address Line 1" />
                                                    <ErrorMessage name="shippingDetails[0].addressLine1" component="div" className="text-danger" />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <label htmlFor="shippingDetails.city" className="form-label">City</label>
                                                    <Field type="text" className="form-control" id="shippingDetails.city" name="shippingDetails[0].city" placeholder="Enter City" />
                                                    <ErrorMessage name="shippingDetails[0].city" component="div" className="text-danger" />
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="shippingDetails.state" className="form-label">State</label>
                                                    <Field type="text" className="form-control" id="shippingDetails.state" name="shippingDetails[0].state" placeholder="Enter State" />
                                                    <ErrorMessage name="shippingDetails[0].state" component="div" className="text-danger" />
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="shippingDetails.postalCode" className="form-label">Postal Code</label>
                                                    <Field type="text" className="form-control" id="shippingDetails.postalCode" name="shippingDetails[0].postalCode" placeholder="Enter Postal Code" />
                                                    <ErrorMessage name="shippingDetails[0].postalCode" component="div" className="text-danger" />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Country</label>
                                                    <Field type="text" className="form-control" id="shippingDetails.country" name="shippingDetails[0].country" />
                                                    {/* <option value="">Select Country</option>
                                                        {countries.map(country => (
                                                            <option key={country} value={country}>{country}</option>
                                                        ))} */}

                                                    <ErrorMessage name="shippingDetails.country" component="div" className="text-danger" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Shipping Method</label>
                                                    <Field as="select" className="form-select" id="shippingDetails.shippingMethod" name="shippingDetails.shippingMethod">
                                                        <option value="">Select a shipping method</option>
                                                        <option value="Standard">Standard</option>
                                                        <option value="Express">Express</option>
                                                        <option value="Overnight">Overnight</option>
                                                        <option value="Same-Day">Same-Day</option>
                                                    </Field>
                                                    <ErrorMessage name="shippingDetails.shippingMethod" component="div" className="text-danger" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <h3>Additional Charges</h3>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">reason</label>
                                            <Field type="text" className="form-control" id="additionalCharges[0].reason" name="additionalCharges[0].reason" placeholder="Enter Sales Order Number" />
                                            <ErrorMessage name="additionalCharges[0].reason" component="div" className="text-danger" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">charges</label>
                                            <Field type="number" className="form-control" id="additionalCharges[0].charges" name="additionalCharges[0].charges" placeholder="Enter Invoice Number" />
                                            <ErrorMessage name="additionalCharges[0].charges" component="div" className="text-danger" />
                                        </div>
                                    </div>
                                    <h3>Discounts amount</h3>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">reason</label>
                                            <Field type="text" className="form-control" id="discounts[0].reason" name="discounts[0].reason" placeholder="Enter Sales Order Number" />
                                            <ErrorMessage name="discounts[0].reason" component="div" className="text-danger" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">amount</label>
                                            <Field type="number" className="form-control" id="discounts[0].amount" name="discounts[0].amount" placeholder="Enter Invoice Number" />
                                            <ErrorMessage name="discounts[0].amount" component="div" className="text-danger" />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalesVoucherForm;

