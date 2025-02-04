
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { MainContext } from '../../Controller/MainProvider';
import axios from 'axios';

const validationSchema = Yup.object({
    applicableTo: Yup.array().of(Yup.string()).min(1, "At least one course must be selected"),
    totalInstallmentsFeesAmount: Yup.number().min(0, "Amount cannot be negative").required("Total Installments Fee Amount is required"),
    totalLumpSumFeesAmount: Yup.number().min(0, "Amount cannot be negative").required("Total Lump Sum Fee Amount is required"),
    feeTypes: Yup.array().of(
        Yup.object({
            feeType: Yup.string().required("Fee type is required"),
            amount: Yup.number().min(0, "Amount cannot be negative").required("Amount is required"),
        })
    ).min(1, "At least one fee type must be selected"),
    totalNoOfInstallments: Yup.number().min(1, "At least one installment is required").required("Total number of installments is required"),
    // installmentDetails: Yup.array().of(
    //     Yup.object({
    //         installmentNumber: Yup.number().required("Installment number is required"),
    //         installmentName: Yup.string().required("Installment name is required"),
    //         installmentFeesAmount: Yup.number().min(0, "Amount cannot be negative").required("Installment amount is required"),
    //         installmentDueDate: Yup.date().required("Due date is required"),
    //         percentageOfTotal: Yup.number().min(0, "Percentage cannot be negative").max(100, "Cannot exceed 100%").required("Percentage is required"),
    //     })
    // ).min(1, "At least one installment must be provided"),
    batchYear: Yup.string().matches(/^\d{4}$/, "Batch year must be a 4-digit year").nullable(),
    OverDuePenaltyAmountPerDay: Yup.number().min(0, "Penalty amount cannot be negative").required("Penalty amount is required"),
    paymentMode: Yup.string().oneOf(["Cash", "Card", "Bank Transfer", "UPI", "Other", "Any of the above"], "Invalid payment mode").required("Payment mode is required"),
});

function FeeStructureManagement() {
    const [feeStructure, setFeeStructure] = useState([]);
    const [classes, setClasses] = useState([]);
    const [feetype, setFeetype] = useState([])
    const { userId } = useContext(MainContext);
    const initialValues = {
        instituteID: userId,
        applicableTo: [],
        totalInstallmentsFeesAmount: 0,
        totalLumpSumFeesAmount: 0,
        feeTypes: [{ feeType: "", amount: 0 }],
        totalNoOfInstallments: 1,
        // installmentDetails: [{ installmentNumber: 1, installmentName: "", installmentFeesAmount: 0, installmentDueDate: "", percentageOfTotal: 0 }],
        globalApplicability: false,
        batchYear: "",
        remarks: "",
        OverDuePenaltyAmountPerDay: 0,
        paymentMode: "Any of the above"
    };

    // const fetchFeeStructure = async () => {
    //     try {
    //         const { data } = await axios.get(`/api/fees-structure/get/institute/${userId}`);
    //         setFeeStructure(data);
    //     } catch (error) {
    //         console.error("Error fetching fee structure:", error);
    //     }
    // };

    const fetchFeetype = async () => {
        try {
            const { data } = await axios.get(`/api/fees-type/get/institute/${userId}`);
            if (data?.length > 0) {
                const feetype = data.map(feetypes => ({ id: feetypes._id, feesType: feetypes.feesType }));
                setFeetype(feetype);
            } else {
                console.error("No fee types found for the institute.");
            }
        } catch (error) {
            console.error("Error fetching fee types:", error);
        }
    };

    const fetchClasses = async () => {
        try {
            const response = await axios.get(`/api/class/get/institute/${userId}`);
            console.log("API Response:", response.data);
            if (response.status === 200) {
                const classData = response.data.map(item => ({ id: item._id, className: item.className }));
                setClasses(classData);
            } else {
                console.error("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.error("Error fetching classes:", error.response?.data || error.message);
        }
    };
    console.log(classes, "sxs");


    useEffect(() => {
        // fetchFeeStructure()
        fetchClasses()
        fetchFeetype()
    }, []);

    const handleAddFeeStructure = async (values, { resetForm }) => {
        try {
            const response = await axios.post('/api/fees-type/post', values, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 201) {
                setFeeStructure((prevStructure) => [...prevStructure, response.data]);
                resetForm();
                alert("Fee Structure added successfully!");
            } else {
                console.error("Failed to add fee structure:", response.statusText);
                alert("Error adding fee structure.");
            }
        } catch (error) {
            console.error("Error adding fee structure:", error.response?.data?.message || error.message);
            alert("Error adding fee structure.");
        }
    };

    return (
        <div className="page-wrapper">
            <div className="container bg-white mt-4 p-5">
                <h2 className="text-center">Fees Structure</h2>
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={handleAddFeeStructure}
                >
                    {({ }) => (
                        <Form className="mb-4">
                            <div className="container mt-4">
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label for="applicableTo" className="form-label">Applicable Courses</label>
                                        <Field as="select" className="form-control" id="applicableTo" name="applicableTo" placeholder="Enter Institute ID">
                                            <option value="">-- Select Your Course --</option>
                                            {classes?.map((Class) => (
                                                <option key={Class?.id} value={Class?._id}>
                                                    {Class?.className}
                                                </option>
                                            ))}

                                        </Field>

                                    </div>
                                    <div className="col-md-6">
                                        <label for="instituteID" className="form-label">Global Applicability</label>
                                        <Field as="select" className="form-control" id="instituteID" name="instituteID" placeholder="Enter Institute ID">
                                            <option value="">Select Global Applicability</option>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </Field>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Total Installment Fees</label>
                                        <Field type="number" className="form-control" name="totalInstallmentsFeesAmount" placeholder="Enter Amount" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Total Lump Sum Fees</label>
                                        <Field type="number" className="form-control" name="totalLumpSumFeesAmount" placeholder="Enter Amount" />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Total No. of Installments</label>
                                        <Field type="number" className="form-control" name="totalNoOfInstallments" placeholder="Enter Number" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Overdue Penalty Amount/Day</label>
                                        <Field type="number" className="form-control" name="OverDuePenaltyAmountPerDay" placeholder="Enter Amount" />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Batch Year</label>
                                        <Field type="month" className="form-control" name="batchYear" placeholder="Enter Batch Year" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Payment Mode</label>
                                        <Field as="select" className="form-select" name="paymentMode">
                                            <option value="Cash">Cash</option>
                                            <option value="Card">Card</option>
                                            <option value="Bank Transfer">Bank Transfer</option>
                                            <option value="UPI">UPI</option>
                                            <option value="Other">Other</option>
                                            <option value="Any of the above">Any of the above</option>
                                        </Field>
                                    </div>
                                </div>

                                <h4 className='mt-4'>Fee Type</h4>
                                {feetype?.map((feeType, index) => (
                                    <div className="row mb-3" key={feeType?.id || index}>
                                        <div className="col-md-6">
                                            <label className="form-label">Fee Type</label>
                                            <Field as="select"
                                                className="form-control"
                                                name={`feeTypes.${index}.feeType`}
                                                placeholder="Select Fee Type">
                                                <option value="">Select Your Fee Type</option>
                                                {feetype?.map((type) => (
                                                    <option key={type?.id} value={type?.feesType}>
                                                        {type?.feesType}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Amount</label>
                                            <Field
                                                type="number"
                                                className="form-control"
                                                name={`feeTypes.${index}.amount`}
                                                placeholder="Enter Amount" />
                                        </div>
                                    </div>
                                ))}

                                <h4 className='mt-4'>Installment Details</h4>
                                {/* <div>

                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Installment Number</label>
                                            <Field type="number" className="form-control" name="installmentDetails.installmentNumber" placeholder="Enter Number" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Installment Name</label>
                                            <Field type="text" className="form-control" name="installmentDetails.installmentName" placeholder="Enter Name" />
                                        </div>

                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Installment Due Date</label>
                                            <Field type="date" className="form-control" name="installmentDetails.installmentDueDate" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Installment Percentage Of Total</label>
                                            <Field type="number" className="form-control" name="installmentDetails.percentageOfTotal" placeholder="Enter Percentage" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label"> Installment Fees Amount</label>
                                            <Field type="number" className="form-control" name="installmentDetails.installmentFeesAmount" placeholder="Enter Amount" />
                                        </div>


                                        <div className="col-6">
                                            <label className="form-label">Remarks</label>
                                            <textarea type="text" className="form-control h-25" name="remarks" placeholder="Enter Remarks" />

                                        </div>
                                    </div>
                                </div> */}



                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>

                        </Form>
                    )}
                </Formik>

                <h3 className="text-center">Fee Structure Records</h3>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped mt-3">
                        <thead>
                            <tr>
                                <th>Total Installments Fee</th>
                                <th>Total Lump Sum Fee</th>
                                <th>Total Installments</th>
                                <th>Batch Year</th>
                                <th>Payment Mode</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feeStructure.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.totalInstallmentsFeesAmount}</td>
                                    <td>{item.totalLumpSumFeesAmount}</td>
                                    <td>{item.paymentMode}</td>
                                    <td>{item.batchYear}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm">Edit</button>
                                        <button className="btn btn-danger btn-sm">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default FeeStructureManagement;