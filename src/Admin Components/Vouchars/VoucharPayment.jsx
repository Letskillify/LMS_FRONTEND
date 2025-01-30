import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import { getApi } from "../Custom Hooks/CustomeHook";

function VoucherPayment() {
    const form2InitialValues = {
        voucherType: "",
        paymentMethod: "Cash",
        paymentStatus: "Pending",
        dueDate: "",
        paymentDate: "",
        overdueDays: "",
        notes: "",
        updateHistory: [],
    };

    const form2ValidationSchema = Yup.object({
        voucherType: Yup.string()
            .oneOf(
                [
                    "PurchaseVoucher",
                    "SalesVoucher",
                    "ExpenseVoucher",
                    "ReceiptVoucher",
                ],
                "Invalid Voucher Type"
            )
            .required("Voucher Type is required"),
        paymentMethod: Yup.string().oneOf(
            ["Cash", "Bank Transfer", "Credit Card", "UPI", "Cheque"],
            "Invalid Payment Method"
        ),
        paymentStatus: Yup.string().oneOf(
            ["Pending", "Paid", "Partially Paid"],
            "Invalid Payment Status"
        ),
        dueDate: Yup.date(),
        paymentDate: Yup.date(),
        overdueDays: Yup.number().min(0, "Cannot be negative"),
        notes: Yup.string(),
    });
    const handleFormSubmit = async () => {
        try {
          const response = await axios.post("/api/voucher/purchase/post", formData); // Replace with your endpoint
          console.log("Form submitted successfully:", response.data);
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      };

    return (
        <>
            <Formik
                initialValues={form2InitialValues}
                validationSchema={form2ValidationSchema}
                onSubmit={(values) => {
                    const finalData = { ...formData, ...values };
                    setFormData(finalData); // Update formData
                    handleFormSubmit(); // Submit the final data
                }}
            >
                {() => (
                    <div className="card p-4">
                        <h2 className="mb-4 text-center">Voucher Payment</h2>
                        <Form className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Voucher Type:</label>
                                <Field as="select" name="voucherType" className="form-select">
                                    <option value="">Select</option>
                                    <option value="PurchaseVoucher">Purchase Voucher</option>
                                    <option value="SalesVoucher">Sales Voucher</option>
                                    <option value="ExpenseVoucher">Expense Voucher</option>
                                    <option value="ReceiptVoucher">Receipt Voucher</option>
                                </Field>
                                <ErrorMessage
                                    name="voucherType"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Payment Method:</label>
                                <Field as="select" name="paymentMethod" className="form-select">
                                    <option value="Cash">Cash</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                    <option value="Credit Card">Credit Card</option>
                                    <option value="UPI">UPI</option>
                                    <option value="Cheque">Cheque</option>
                                </Field>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Payment Status:</label>
                                <Field as="select" name="paymentStatus" className="form-select">
                                    <option value="Pending">Pending</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Partially Paid">Partially Paid</option>
                                </Field>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Due Date:</label>
                                <Field name="dueDate" type="date" className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Payment Date:</label>
                                <Field name="paymentDate" type="date" className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Overdue Days:</label>
                                <Field name="overdueDays" type="number" className="form-control" />
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">Notes:</label>
                                <Field
                                    name="notes"
                                    as="textarea"
                                    className="form-control"
                                    rows="3"
                                />
                            </div>
                            <div className="col-12 d-flex justify-content-between">
                                <button type="submit" className="btn btn-success">
                                    Submit
                                </button>
                            </div>
                        </Form>
                    </div>
                )}

            </Formik>
        </>
    )
}

export default VoucherPayment;