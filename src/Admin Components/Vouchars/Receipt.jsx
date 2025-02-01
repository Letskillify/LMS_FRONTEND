import { Formik, Form, Field } from 'formik'
import React, { useState } from 'react'
import { Bounce, toast } from 'react-toastify';
import * as Yup from "yup";

const receiptValidationSchema = Yup.object().shape({
    receiptId: Yup.string().required("Receipt ID is required"),
    payerDetails: Yup.object().shape({
        name: Yup.string().required("Payer name is required"),
        email: Yup.string().email("Invalid email format"),
        phone: Yup.string()
            .matches(/^\d{10,15}$/, "Phone number must be between 10-15 digits"),
        address: Yup.string(),
    }),
    receiptItems: Yup.array()
        .of(
            Yup.object().shape({
                itemName: Yup.string().required("Item name is required"),
                quantity: Yup.number().min(1, "Quantity must be at least 1").required("Quantity is required"),
                unitPrice: Yup.number().min(0, "Unit price must be positive").required("Unit price is required"),
                subTotal: Yup.number(),
            })
        )
        .min(1, "At least one item is required"),
    totalAmount: Yup.number().min(0, "Total amount cannot be negative"),
    taxDetails: Yup.array().of(
        Yup.object().shape({
            taxName: Yup.string(),
            percentage: Yup.number().min(0, "Tax percentage cannot be negative"),
            amount: Yup.number().min(0, "Tax amount cannot be negative"),
        })
    ),
    grandTotalAmount: Yup.number().min(0, "Grand total cannot be negative"),
    paymentMethod: Yup.string()
        .oneOf(["Cash", "Bank Transfer", "Credit Card", "Cheque", "Other"], "Invalid payment method")
        .required("Payment method is required"),
    date: Yup.date().required("Date is required"),
    relatedInvoice: Yup.string().nullable(),
    notes: Yup.string(),
});

const receiptInitialValues = {
    receiptId: "",
    payerDetails: {
        name: "",
        email: "",
        phone: "",
        address: "",
    },
    receiptItems: [
        {
            itemName: "",
            quantity: 1,
            unitPrice: 0,
            subTotal: 0,
        },
    ],
    totalAmount: 0,
    taxDetails: [
        {
            taxName: "",
            percentage: 0,
            amount: 0,
        },
    ],
    grandTotalAmount: 0,
    paymentMethod: "",
    date: "",
    relatedInvoice: null,
    notes: "",
};

const ReceiptForm = () => {
    const [receiptItems, setReceiptItems] = useState([
        { itemName: "", quantity: 1, unitPrice: 0, subTotal: 0 },
    ]);
    const [taxDetails, setTaxDetails] = useState([
        { taxName: "", percentage: 0, amount: 0 },
    ]);

    const handleItemChange = (index, field, value) => {
        const newItems = [...receiptItems];
        newItems[index][field] = value;
        if (field === "quantity" || field === "unitPrice") {
            newItems[index].subTotal =
                (newItems[index].quantity || 0) * (newItems[index].unitPrice || 0);
        }
        setReceiptItems(newItems);
    };

    const handleTaxChange = (index, field, value) => {
        const newTaxes = [...taxDetails];
        newTaxes[index][field] = value;
        if (field === "percentage") {
            newTaxes[index].amount = (totalAmount * (newTaxes[index].percentage || 0)) / 100;
        }
        setTaxDetails(newTaxes);
    };

    const addReceiptItem = () => {
        setReceiptItems([...receiptItems, { itemName: "", quantity: 1, unitPrice: 0, subTotal: 0 }]);
    };

    const addTaxDetail = () => {
        setTaxDetails([...taxDetails, { taxName: "", percentage: 0, amount: 0 }]);
    };

    const totalAmount = receiptItems.reduce((sum, item) => sum + item.subTotal, 0);
    const taxAmount = taxDetails.reduce((sum, tax) => sum + tax.amount, 0);
    const grandTotal = totalAmount + taxAmount;

    const handleSubmit = async(values) => {
       try {
        const response = await axios.post("http://localhost:5500/api/receipts", values,{
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
        });
        if (response.status === 200) {
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
        console.log(error);
        toast.error("Receipt added successfully", {
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

    return (

        <div className="container mt-4 ">
            <div className="bg-white p-4 rounded">
                <h2 className="mb-4 text-center">Receipt Form</h2>
                <Formik initialValues={receiptInitialValues} validationSchema={receiptValidationSchema} onSubmit={handleSubmit}>
                    {({ errors, touched }) => (
                        <Form>
                            {/* Payer Details */}
                            <h5>Payer Details</h5>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Name</label>
                                    <Field type="text" name="name" className="form-control" placeholder="Enter Name" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <Field type="email" name="email" className="form-control" placeholder="Enter Email" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Phone</label>
                                    <Field type="tel" name="phone" className="form-control" placeholder="Enter Phone" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Address</label>
                                    <Field type="text" name="address" className="form-control" placeholder="Enter Address" />
                                </div>
                            </div>

                            {/* Receipt Items */}
                            <h5>Receipt Items</h5>
                            {receiptItems.map((item, index) => (
                                <div className="row mb-2" key={index}>
                                    <div className="col-md-4">
                                        <Field
                                            type="text"
                                            className="form-control"
                                            placeholder="Item Name"
                                            name={`items.${index}.itemName`}
                                            value={item.itemName}
                                            onChange={(e) => handleItemChange(index, "itemName", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <Field
                                            type="number"
                                            className="form-control"
                                            placeholder="Quantity"
                                            name={`items.${index}.quantity`}
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value))}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <Field
                                            type="number"
                                            className="form-control"
                                            placeholder="Unit Price"
                                            name={`items.${index}.unitPrice`}
                                            min="0"
                                            value={item.unitPrice}
                                            onChange={(e) => handleItemChange(index, "unitPrice", parseFloat(e.target.value))}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <Field type="number" className="form-control" value={item.subTotal} readOnly />
                                    </div>
                                </div>
                            ))}
                            <button type="button" className="btn btn-primary btn-sm mb-3" onClick={addReceiptItem}>
                                + Add Item
                            </button>

                            {/* Tax Details */}
                            <h5>Tax Details</h5>
                            {taxDetails.map((tax, index) => (
                                <div className="row mb-2" key={index}>
                                    <div className="col-md-5">
                                        <Field
                                            type="text"
                                            className="form-control"
                                            placeholder="Tax Name"
                                            name={`taxes.${index}.taxName`}
                                            value={tax.taxName}
                                            onChange={(e) => handleTaxChange(index, "taxName", e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <Field
                                            type="number"
                                            className="form-control"
                                            placeholder="Percentage"
                                            min="0"
                                            name={`taxes.${index}.percentage`}
                                            value={tax.percentage}
                                            onChange={(e) => handleTaxChange(index, "percentage", parseFloat(e.target.value))}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <Field type="number" className="form-control" name={`taxes.${index}.amount`} value={tax.amount} readOnly />
                                    </div>
                                </div>
                            ))}
                            <button type="button" className="btn btn-primary btn-sm mb-3" onClick={addTaxDetail}>
                                + Add Tax
                            </button>

                            {/* Payment Method */}
                            <div className="row">

                            <div className="col-6 mb-3">
                                <label className="form-label">Payment Method</label>
                                <select className="form-select" name="paymentMethod">
                                    <option value="">Select Payment Method</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                    <option value="Credit Card">Credit Card</option>
                                    <option value="Cheque">Cheque</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className=" col-6 mb-3">
                                    <label className="form-label">Date</label>
                                    <Field type="date" className="form-control" name="date" />
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="mb-3">
                                <label className="form-label">Notes</label>
                                <textarea className="form-control" rows="3" placeholder="Additional Notes"></textarea>
                            </div>

                            <div className="row">
                                {/* Total & Grand Total */}
                                <div className=" col-6 mb-3">
                                    <label className="form-label">Total Amount</label>
                                    <Field type="number" className="form-control" name="totalAmount" value={totalAmount} readOnly />
                                </div>
                                <div className="col-6 mb-3">
                                    <label className="form-label">Grand Total Amount</label>
                                    <Field type="number" className="form-control" name="grandTotal" value={grandTotal} readOnly />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-5 text-center d-flex justify-content-center">

                                <button type="submit" className="btn btn-primary btn-md w-25 py-2">
                                    Submit
                                </button>
                            </div>
                        </Form>
                    )
                    }
                </Formik>
            </div>
        </div>
    );
};

export default ReceiptForm;
