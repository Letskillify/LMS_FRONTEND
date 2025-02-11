import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import Select from "react-select";
import { getCommonCredentials } from '../../GlobalHelper/CommonCredentials';

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
    installmentDetails: Yup.array().of(
        Yup.object({
            installmentNumber: Yup.number().required("Installment number is required"),
            installmentName: Yup.string().required("Installment name is required"),
            installmentFeesAmount: Yup.number().min(0, "Amount cannot be negative").required("Installment amount is required"),
            installmentDueDate: Yup.date().required("Due date is required"),
            percentageOfTotal: Yup.number().min(0, "Percentage cannot be negative").max(100, "Cannot exceed 100%").required("Percentage is required"),
        })
    ).min(1, "At least one installment must be provided"),
    batchYear: Yup.string().matches(/^\d{4}$/, "Batch year must be a 4-digit year").nullable(),
    OverDuePenaltyAmountPerDay: Yup.number().min(0, "Penalty amount cannot be negative").required("Penalty amount is required"),
    paymentMode: Yup.string().oneOf(["Cash", "Card", "Bank Transfer", "UPI", "Other", "Any of the above"], "Invalid payment mode").required("Payment mode is required"),
});

function FeeStructureManagement() {
    // const [feeStructure, setFeeStructure] = useState([]);
    const [dataget, setDataget] = useState([]);
    const [classes, setClasses] = useState([]);
    const [feetype, setFeetype] = useState([])
    const [viewpopup, setViewpopup] = useState(false);
    const [viewData, setViewData] = useState();
    const [installment, setInstallment] = useState([
        {
            installmentNumber: 1,
            installmentName: "",
            installmentFeesAmount: 0,
            installmentDueDate: "",
            percentageOfTotal: 0
        }
    ])
    const { userId } = getCommonCredentials();
    const initialValues = {
        instituteId: userId,
        applicableTo: [],
        totalInstallmentsFeesAmount: 0,
        totalLumpSumFeesAmount: 0,
        feeTypes: [{ feeType: "", amount: 0 }],
        totalNoOfInstallments: 1,
        installmentDetails: [{ installmentNumber: 1, installmentName: "", installmentFeesAmount: 0, installmentDueDate: "", percentageOfTotal: 0 }],
        globalApplicability: false,
        batchYear: "",
        remarks: "",
        OverDuePenaltyAmountPerDay: 0,
        paymentMode: "Any of the above"
    };

    const fetchGet = async () => {
        try {
            const response = await axios.get(`/api/fees-structure/get`);
            setDataget(response.data);
        } catch (error) {
            console.error("Error fetching fee structure:", error);
        }
        console.log(dataget);

    };
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/fees-structure/delete/${id}`);
            if (response.status === 200) {
                toast.success("Fee Structure Deleted Successfully", {
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
                // fetchGet();
            }
        } catch (error) {
            console.error('Error deleting fee structure:', error);
            toast.error(error.response?.data?.message || "Error deleting fee structure", {
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
    };

    const handleEdit = async (id) => {
        try {
            const response = await axios.get(`/api/fees-structure/update/${id}`);
            // setDataget(response.data);
            setViewpopup(true);
        } catch (error) {
            console.error("Error fetching fee structure:", error);
        }
    }
    const fetchFeetype = async () => {
        try {
            const response = await axios.get(`/api/fees-type/get/institute/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.status === 200) {
                setFeetype(response.data);
            }
        } catch (error) {
            console.error("Error fetching fee types:", error);
        }
    };
    const fetchClasses = async () => {
        try {
            const response = await axios.get(`/api/class/get/institute/${userId}`);
            if (response.status === 200) {
                setClasses(response.data);
            } else {
                console.error("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.error("Error adding fee structure:", error.response?.data || error.message);
            alert(`Error adding fee structure: ${error.response?.data?.error || error.message}`);
        }

    };
    useEffect(() => {
        fetchGet()
        fetchClasses()
        fetchFeetype()
    }, []);

    const handleAddFeeStructure = async (values, { resetForm }) => {
        console.log(values, "dw");

        try {
            const response = await axios.post('/api/fees-structure/post', values, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            });

            if (response.status === 201) {
                resetForm();
                toast.success("Fee Structure Added Successfully", {
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
            console.error("Error adding fee structure:", error);
            console.error("Error adding fee structure:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Error adding fee structure", {
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
            // alert("Error adding fee structure.");
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
                    {({ values, setFieldValue }) => (
                        <Form className="mb-4">
                            <div className="container mt-4">
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label for="applicableTo.className" className="form-label">Applicable Courses</label>
                                        <Field name="applicableTo.className">
                                            {({ field }) => (
                                                <Select
                                                    isMulti
                                                    options={classes.map(cl => ({
                                                        value: cl._id,
                                                        label: cl.className
                                                    }))}
                                                    name="applicableTo.className"
                                                    value={values.applicableTo.className.map(s => ({
                                                        value: s,
                                                        label: classes.find(cl => cl._id === s).className
                                                    }))}
                                                    onChange={selected => setFieldValue("applicableTo.className", selected.map(s => s.value))}
                                                    placeholder="Select Classes"
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
                                    <div className="col-md-6">
                                        <label className="form-label" htmlFor="globalApplicability">Global Applicability</label>
                                        <Field as="select" className="form-control" id="globalApplicability" name="globalApplicability">
                                            <option value="" disabled>Select Global Applicability</option>
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
                                {feetype?.map((type, index) => (
                                    <div className="row mb-3" key={index}>
                                        <div className="col-md-6">
                                            <label className="form-label">Fee Type</label>
                                            <Field as="select"
                                                className="form-control"
                                                name={`feeTypes.${index}.feeType`}
                                                placeholder="Select Fee Type"
                                            >
                                                <option value="">Select Your Fee Type</option>
                                                <option key={type?.id} value={type?._id}>
                                                    {type?.feesType}
                                                </option>
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
                                {installment?.length > 0 &&
                                    installment?.map((_, index) => (
                                        <div key={index}>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Installment Number</label>
                                                    <Field type="number" className="form-control" name={`installmentDetails.${index}.installmentNumber`} placeholder="Enter Number" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Installment Name</label>
                                                    <Field type="text" className="form-control" name={`installmentDetails.${index}.installmentName`} placeholder="Enter Name" />
                                                </div>

                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Installment Due Date</label>
                                                    <Field type="date" className="form-control" name={`installmentDetails.${index}.installmentDueDate`} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Installment Percentage Of Total</label>
                                                    <Field type="number" className="form-control" name={`installmentDetails.${index}.percentageOfTotal`} placeholder="Enter Percentage" />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label"> Installment Fees Amount</label>
                                                    <Field type="number" className="form-control" name={`installmentDetails.${index}.installmentFeesAmount`} placeholder="Enter Amount" />
                                                </div>


                                                <div className="col-6">
                                                    <label className="form-label">Remarks</label>
                                                    <textarea type="text" className="form-control h-25" name={`installmentDetails.${index}.remarks`} placeholder="Enter Remarks" />

                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }



                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>

                        </Form>
                    )}
                </Formik>

                <h3 className="text-center">Fee Structure Records</h3>
                <div className="table-responsive">
                    <table className="table table-bordered mt-3">
                        <thead>
                            <tr>
                                <th>Installments Fee</th>
                                <th>Lump Sum Fee</th>
                                <th>Installments</th>
                                <th>Batch Year</th>
                                <th>Payment Mode</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataget.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.totalIntallmentsFeesAmount}</td>
                                    <td>{item?.totalLumpSumFeesAmount}</td>
                                    <td>{item?.totalNoOfInstallments}</td>
                                    <td>{item?.batchYear}</td>
                                    <td>{item?.paymentMode}</td>
                                    <td>
                                        <button
                                            className="btn btn-info btn-sm me-2"
                                            onClick={() => { setViewData(item); setViewpopup(true); }}>
                                            <i className="fa fa-eye" aria-hidden="true"></i>
                                        </button>
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => handleEdit(item?._id)}>
                                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm ms-2"
                                            onClick={() => handleDelete(item?._id)}>
                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
            {viewpopup && viewData && (
                <div className="modal fade show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">View Fee Structure</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setViewpopup(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="container ">
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label for="applicableTo" className="form-label">Applicable Courses</label>
                                            <div className="p-2 border rounded-3">{viewData?.applicableTo.Class}</div>

                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="globalApplicability">Global Applicability</label>
                                            <div className="p-2 border rounded-3">{viewData?.globalApplicability ? "Yes" : "No"}</div>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Total Installment Fees</label>
                                            <div className="p-2 border rounded-3">{viewData?.totalInstallmentsFeesAmount}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Total Lump Sum Fees</label>
                                            <div className="p-2 border rounded-3">{viewData?.totalLumpSumFeesAmount}</div>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Total No. of Installments</label>
                                            <div className="p-2 border rounded-3">{viewData?.totalNoOfInstallments}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Overdue Penalty Amount/Day</label>
                                            <div className="p-2 border rounded-3">{viewData?.OverDuePenaltyAmountPerDay}</div>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Batch Year</label>
                                            <div className="p-2 border rounded-3">{viewData?.batchYear}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Payment Mode</label>
                                            <div className="p-2 border rounded-3">{viewData?.paymentMode}</div>
                                        </div>
                                    </div>

                                    <h4 className='mt-4'>Fee Type</h4>
                                    {viewData?.feeTypes?.map((type, index) => (
                                        <div className="row mb-3" key={index}>
                                            <div className="col-md-6">
                                                <label className="form-label">Fee Type</label>
                                                <div className="p-2 border rounded-3">{type?.feeType}</div>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Amount</label>
                                                <div className="p-2 border rounded-3">{type?.amount}</div>
                                            </div>
                                        </div>
                                    ))}

                                    <h4 className='mt-4'>Installment Details</h4>
                                    {viewData?.installmentDetails?.map((_, index) => (
                                        <div key={index}>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Installment Number</label>
                                                    <div className="p-2 border rounded-3">{viewData?.installmentDetails[index].installmentNumber}</div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Installment Name</label>
                                                    <div className="p-2 border rounded-3">{viewData?.installmentDetails[index].installmentName}</div>
                                                </div>

                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Installment Due Date</label>
                                                    <div className="p-2 border rounded-3">{new Date(viewData?.installmentDetails[index].installmentDueDate).toLocaleDateString()}</div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Installment Percentage Of Total</label>
                                                    <div className="p-2 border rounded-3">{viewData?.installmentDetails[index].percentageOfTotal}</div>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label"> Installment Fees Amount</label>
                                                    <div className="p-2 border rounded-3">{viewData?.installmentDetails[index].installmentFeesAmount}</div>
                                                </div>


                                                <div className="col-6">
                                                    <label className="form-label">Remarks</label>
                                                    <div className="p-2 border rounded-3">{viewData?.installmentDetails[index].remarks}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div >
    );
}

export default FeeStructureManagement;




