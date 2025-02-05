import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';

// Initial values
const initialValues = {
    category: "", // Choose from ['Travel', 'Office Supplies', 'Utilities', 'Miscellaneous', 'Other']
    description: "",
    expenseItems: [
        {
            itemName: "",
            quantity: 1,
            unitPrice: 0,
            subTotal: 0, // Computed as quantity * unitPrice
        },
    ],
    totalAmount: 0, // Computed as sum of all subTotals
    additionalCharges: [
        {
            chargeName: "",
            amount: 0,
        },
    ],
    isShippingPaid: false,
    shippingDetails: {
        address: null,
        city: null,
        state: null,
        country: null,
        postalCode: null,
        amount: 0, // Shipping cost
    },
    grandTotalAmount: 0, // Computed as totalAmount + expenseItems + shipping amount
    paidTo: {
        name: "", // Required
        email: "",
        phone: "",
        address: "",
    },
    paidBy: {
        name: "", // Required
        email: "",
        phone: "",
        address: "",
    },
    paymentMethod: "",
    date: new Date(),
    notes: "",
};


// Validation Schema
const validationSchema = Yup.object({
    category: Yup.string().required('Category is required'),
    description: Yup.string(),
    expenseItems: Yup.array().of(
        Yup.object({
            itemName: Yup.string().required('Item name is required'),
            quantity: Yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
            unitPrice: Yup.number().min(0, 'Unit price must be at least 0').required('Unit price is required')
        })
    ),
    additionalCharges: Yup.array().of(
        Yup.object().shape({   
            chargeName: Yup.string().required('Charge name is required'),
            amount: Yup.number().min(0, 'Charge amount must be at least 0').required('Charge amount is required')
        })
    ),
    shippingDetails: Yup.object({
        address: Yup.string().when('isShippingPaid', {
            is: true,
            then: Yup.string().required('Shipping address is required')
        }),
        city: Yup.string().when('isShippingPaid', {
            is: true,
            then: Yup.string().required('Shipping city is required')
        }),
        state: Yup.string().when('isShippingPaid', {
            is: true,
            then: Yup.string().required('Shipping state is required')
        }),
        postalCode: Yup.string().when('isShippingPaid', {
            is: true,
            then: Yup.string().required('Shipping postal code is required')
        }),
        amount: Yup.number().when('isShippingPaid', {
            is: true,
            then: Yup.number().min(0, 'Shipping amount must be at least 0').required('Shipping amount is required')
        })
    }),
    paidTo: Yup.object({
        name: Yup.string().required('Paid to (Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        phone: Yup.string().required('Phone is required'),
        address: Yup.string().required('Address is required')
    }),
    paymentMethod: Yup.string().required('Payment method is required'),
    notes: Yup.string()
});

const ExpenseForm = () => {
    const [forms, setForms] = useState([{}]);
    const [expenseItems, setExpenseItems] = useState([
        {
            itemName: "",
            quantity: 1,
            unitPrice: 0,
            subTotal: 0,
        },
    ]);
    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updatedCharges = [...expenseItems];
        updatedCharges[index][name] = value;
        setExpenseItems(updatedCharges);
    };
    const handleAddForm = () => {
        setExpenseItems([...expenseItems, { itemName: "", quantity: 1, unitPrice: 0, subTotal: 0 }]);

    };

    const hanldeExpenseItems = async (values) => {
        console.log(values, "dw")
        try {

            const response = await axios.post('/api/voucher/expense/post', values);
            if (response.status === 201) {
                setForms(response.data)
                console.log(response.data);
                toast.success("Expense added successfully", {
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
            console.log('Error', error)
            toast.error("Error adding expense", {
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
    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header text-white text-center">
                    <h3>Expense Management</h3>
                </div>
                <div className="card-body">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => hanldeExpenseItems(values)}
                    >
                        {({ values }) => (
                            <Form>
                                <div className="border rounded ">
                                    <h5 className="text-primary mb-4 ms-2 mt-3">Expense Details</h5>
                                    <div className="row m-3">
                                        {/* Category */}
                                        <div className="">
                                            <div className="row ">
                                                {/* Payment Method */}
                                                <div className=" col-4">
                                                    <label>Payment Method</label>
                                                    <Field as="select" className="form-control" name="paymentMethod">
                                                        <option value="">Select Payment Method</option>
                                                        <option value="Cash">Cash</option>
                                                        <option value="Bank Transfer">Bank Transfer</option>
                                                        <option value="Credit Card">Credit Card</option>
                                                        <option value="UPI">UPI</option>
                                                        <option value="Other">Other</option>
                                                    </Field>
                                                    <ErrorMessage name="paymentMethod" component="div" className="text-danger" />
                                                </div>
                                                <div className=" col-4">
                                                    <label>Date</label>
                                                    <Field
                                                        type="date"
                                                        className="form-control"
                                                        name="date"
                                                    />
                                                    <ErrorMessage name="date" component="div" className="text-danger" />
                                                </div>
                                                <div className="col-4">
                                                    <label className=''>Category</label>
                                                    <Field
                                                        as="select"
                                                        className="form-control"
                                                        id="category"
                                                        name="category"
                                                    >
                                                        <option value="">Select Category</option>
                                                        <option value="Travel">Travel</option>
                                                        <option value="Office Supplies">Office Supplies</option>
                                                        <option value="Utilities">Utilities</option>
                                                        <option value="Miscellaneous">Miscellaneous</option>
                                                        <option value="Other">Other</option>
                                                    </Field>
                                                <ErrorMessage name="category" component="div" className="text-danger" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="row m-3">
                                        <div className="form-group">
                                            <label>Description</label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                id="description"
                                                placeholder="Description of the expense"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Expense Items */}
                                <div className="border rounded mt-3">
                                    <div>
                                        <h5 className="text-primary mb-4 mt-3 ms-2">Expense Items</h5>
                                        {expenseItems.map((item, index) => (
                                            <div key={index} className="expense-item mb-3">
                                                <div className="form-row m-3">
                                                    <div className="form-group col-md-12">
                                                        <label>Item Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="item[0].itemName"
                                                            placeholder="Item name"
                                                            value={item.itemName}
                                                            onChange={(e) => handleChange(index, e)}
                                                        />
                                                        <ErrorMessage name="item[0].itemName" component="div" className="text-danger" />
                                                    </div>

                                                    <div className="row">
                                                        <div className="form-group col-md-4">
                                                            <label className='mt-3'>Quantity</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                name="quantity"
                                                                placeholder="Quantity"
                                                                value={item.quantity}
                                                                onChange={(e) => handleChange(index, e)}
                                                            />
                                                            <ErrorMessage name="item[0].quantity" component="div" className="text-danger" />
                                                        </div>
                                                        <div className="form-group col-md-4">
                                                            <label className='mt-3'>Unit Price</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                name="unitPrice"
                                                                placeholder="Unit Price"
                                                                value={item.unitPrice}
                                                                onChange={(e) => handleChange(index, e)}
                                                            />
                                                            <ErrorMessage name="item[0].unitPrice" component="div" className="text-danger" />
                                                        </div>
                                                        <div className="form-group col-md-4">
                                                            <label className='mt-3'>Sub Total</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                name="subTotal"
                                                                placeholder="Sub Total"
                                                                value={item.subTotal}
                                                                onChange={(e) => handleChange(index, e)}
                                                            />
                                                            <ErrorMessage name="subTotal" component="div" className="text-danger" />
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            className="btn btn-secondary mb-3 m-3"
                                            onClick={handleAddForm}
                                        >
                                            <i class="fa fa-plus" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>

                                {/* Additional charge */}
                                <div className="border rounded mt-3">

                                    <h5 className="text-primary mb-4 mt-3 ms-2">Additional Charges</h5>
                                    <div className="expense-item mb-3">
                                        <div className="form-row m-3">
                                            <div className="row">
                                                <div className="form-group col-md-6">
                                                    <label className='mt-3'>ChargeName</label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="additionalCharges.chargeName"
                                                        placeholder="Enter chargeName"
                                                    />
                                                    <ErrorMessage name="additionalCharges.chargeName" component="div" className="text-danger" />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className='mt-3'>Charges</label>
                                                    <Field
                                                        type="number"
                                                        className="form-control"
                                                        name="additionalCharges.amount"
                                                        placeholder="Enter Charges"
                                                    />
                                                    <ErrorMessage name="additionalCharges.amount" component="div" className="text-danger" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* Shipping Details */}

                                <div className='border rounded  mt-3'>

                                    <h5 className="text-primary mb-4 mt-4 ms-2">Shipping Details</h5>
                                    <div className="row mt-3 ms-2   ">
                                        {/* <label className="form-label fs-6">Is Shipping Paid?</label> */}
                                        <div className="row mb-3">
                                            <label className="form-label fs-6">Is Shipping Paid?</label>
                                            <div className="form-check ms-2 col-1">
                                                <Field type="radio" className="form-check-input" name="isShippingPaid" value="true" id="paidYes" />
                                                <label className="form-check-label" htmlFor="paidYes">Yes</label>
                                            </div>
                                            <div className="form-check col-1">
                                                <Field type="radio" className="form-check-input" name="isShippingPaid" value="false" id="paidNo" />
                                                <label className="form-check-label" htmlFor="paidNo">No</label>
                                            </div>
                                        </div>
                                    </div>
                                    {values.isShippingPaid === 'true' && (
                                        <div className='m-3'>
                                            {/* Shipping Details Inputs */}
                                            <div className="form-group">
                                                <label className='mt-3'>Shipping Address</label>
                                                <Field
                                                    type="text"
                                                    className="form-control"
                                                    name="shippingDetails.address"
                                                    placeholder="Enter Shipping Address"
                                                    validate={(value) => {
                                                        if (value === '') {
                                                            return 'Shipping address is required'
                                                        }
                                                    }}
                                                />
                                                <ErrorMessage name="shippingDetails.address" component="div" className="text-danger" />
                                            </div>
                                            <div className="row">

                                                <div className="form-group col-6">
                                                    <label className='mt-3'>City</label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="shippingDetails.city"
                                                        placeholder="Enter City"
                                                        validate={(value) => {
                                                            if (value === '') {
                                                                return 'City is required'
                                                            }
                                                        }}
                                                    />
                                                    <ErrorMessage name="shippingDetails.city" component="div" className="text-danger" />
                                                </div>
                                                <div className="form-group col-6">
                                                    <label className='mt-3'>State</label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="shippingDetails.state"
                                                        placeholder="Enter State"
                                                        validate={(value) => {
                                                            if (value === '') {
                                                                return 'State is required'
                                                            }
                                                        }}
                                                    />
                                                    <ErrorMessage name="shippingDetails.state" component="div" className="text-danger" />
                                                </div>
                                            </div>
                                            <div className="row">

                                                <div className="form-group col-6">
                                                    <label className='mt-3'>Postal Code</label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="shippingDetails.postalCode"
                                                        placeholder="Enter Postal Code"
                                                        validate={(value) => {
                                                            if (value === '') {
                                                                return 'Postal code is required'
                                                            }
                                                        }}
                                                    />
                                                    <ErrorMessage name="shippingDetails.postalCode" component="div" className="text-danger" />
                                                </div>
                                                <div className="form-group col-6">
                                                    <label className='mt-3'>Shipping Amount</label>
                                                    <Field
                                                        type="number"
                                                        className="form-control"
                                                        name="shippingDetails.amount"
                                                        placeholder="Enter Shipping Amount"
                                                        validate={(value) => {
                                                            if (value < 0) {
                                                                return 'Shipping amount must be at least 0'
                                                            }
                                                        }}
                                                    />
                                                    <ErrorMessage name="shippingDetails.amount" component="div" className="text-danger" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* paidTo Information */}
                                <div className="border rounded mt-3  ">

                                    <h5 className="text-primary mb-4 ms-2 mt-3">Paid To</h5>
                                    <div className="row  m-2">

                                        <div className="form-group col-6">
                                            <label className='mt-3'>Name</label>
                                            <Field
                                                type="text"
                                                className="form-control"
                                                name="paidTo.name"
                                                placeholder="Enter Name"
                                            />
                                            <ErrorMessage name="paidTo.name" component="div" className="text-danger" />
                                        </div>
                                        <div className="form-group col-6">
                                            <label className='mt-3'>Email</label>
                                            <Field
                                                type="email"
                                                className="form-control"
                                                name="paidTo.email"
                                                placeholder="Enter Email"
                                            />
                                            <ErrorMessage name="paidTo.email" component="div" className="text-danger" />
                                        </div>
                                    </div>
                                    <div className="row m-2">
                                        <div className="form-group col-6">
                                            <label className='mt-3'>Phone</label>
                                            <Field
                                                type="text"
                                                className="form-control"
                                                name="paidTo.phone"
                                                placeholder="Enter Phone"
                                            />
                                            <ErrorMessage name="paidTo.phone" component="div" className="text-danger" />
                                        </div>
                                        <div className="form-group col-6">
                                            <label className='mt-3'>Address</label>
                                            <Field
                                                type="text"
                                                className="form-control "
                                                name="paidTo.address"
                                                placeholder="Enter Address"
                                            />
                                            <ErrorMessage name="paidTo.address" component="div" className="text-danger" />
                                        </div>
                                    </div>
                                </div>
                                {/* paidBy Information */}
                                <div className="border rounded mt-3 ">
                                    <h5 className="text-primary mb-4 ms-2 mt-3">Paid By</h5>
                                    <div className="row  m-2">

                                        <div className="form-group col-6">
                                            <label className='mt-3'>Name</label>
                                            <Field
                                                type="text"
                                                className="form-control"
                                                name="paidBy.name"
                                                placeholder="Enter Name"
                                            />
                                            <ErrorMessage name="paidBy.name" component="div" className="text-danger" />
                                        </div>
                                        <div className="form-group col-6">
                                            <label className='mt-3'>Email</label>
                                            <Field
                                                type="email"
                                                className="form-control"
                                                name="paidBy.email"
                                                placeholder="Enter Email"
                                            />
                                            <ErrorMessage name="paidBy.email" component="div" className="text-danger" />
                                        </div>
                                    </div>
                                    <div className="row m-2">
                                        <div className="form-group col-6">
                                            <label className='mt-3'>Phone</label>
                                            <Field
                                                type="text"
                                                className="form-control"
                                                name="paidBy.phone"
                                                placeholder="Enter Phone"
                                            />
                                            <ErrorMessage name="paidBy.phone" component="div" className="text-danger" />
                                        </div>
                                        {/* Payment Method */}
                                        <div className="form-group col-6">
                                            <label className='mt-3'>Address</label>
                                            <Field
                                                type="text"
                                                className="form-control "
                                                name="paidBy.address"
                                                placeholder="Enter Address"
                                            />
                                            <ErrorMessage name="paidBy.address" component="div" className="text-danger" />
                                        </div>
                                    </div>
                                </div>



                                <button type="submit" className="btn btn-primary mt-3" >Submit</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div >
    );
};

export default ExpenseForm;
