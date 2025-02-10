import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../Controller/MainProvider';
import * as Yup from 'yup';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { useImageUploader } from '../Custom Hooks/CustomeHook';

function Leave() {
    const { uploadedData, handleImageUpload } = useImageUploader();
    const { userId, instituteId } = useContext(MainContext);
    const [LeaveDay, setLeaveDay] = useState('');
    const [leaves, setLeaves] = useState([]);
    const [popup, setpopup] = useState(false);
    const [selectLeaveDay, setSelectLeaveDay] = useState(null);

    const initialValues = {
        userId: userId,
        instituteId: instituteId,
        user: '',
        typeOfLeave: '',
        reason: '',
        halfDay: '',
        multipleDays: '',
        startDate: '',
        endDate: '',
        date: '',
        attachments: '',
        userRole: '',
    };

    const validationSchema = Yup.object().shape({
        user: Yup.string().oneOf(['StudentProfile', 'TeachingStaff', 'NonTeachingStaff'], 'Invalid user type').required('User type is required'),
        typeOfLeave: Yup.string().oneOf(['Casual Leave', 'Personal Leave', 'Public Leave', 'Medical Leave'], 'Invalid leave type').required('Leave type is required'),
        reason: Yup.string().trim().required('Reason is required'),
        halfDay: Yup.boolean(),
        multipleDays: Yup.boolean(),
        startDate: Yup.date().when('multipleDays', {
            is: true,
            then: Yup.date().required('Start Date is required for multiple days leave'),
        }),
        endDate: Yup.date().when('multipleDays', {
            is: true,
            then: Yup.date()
                .required('End Date is required for multiple days leave')
                .min(Yup.ref('startDate'), 'End Date must be after Start Date'),
        }),
        date: Yup.date().required('Date is required for a single-day leave'),
        attachments: Yup.mixed(),
        userRole : Yup.string().required("User Role is required")
    });

    const fatchLeave = async () => {
        try {
            const response = await axios.get(`/api/leaves/get/user/${userId}`);
            setLeaves(response.data);
            setpopup(true);            
        } catch (error) {
            console.log("Error fetching leaves", error);
        }
    }
    console.log(leaves, 'leaves');
    console.log(userId);

    useEffect(() => {
        if (userId) {
            fatchLeave();
        }
    }, [userId]);

    const handleFormSubmit = async (values) => {
        const data = {
            ...values,
            attachments: uploadedData?.attachments
        };
        try {
            const response = await axios.post("/api/leaves/post", data);
            if (response.status === 201) {
                toast.success("Leave applied successfully");
                window.location.reload();
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Error applying leave");
            }
        }
    };

    console.log(selectLeaveDay, "selectLeaveDay");


    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header text-center text-white">
                    <h3>Apply for Leave</h3>
                </div>
                <div className="card-body">
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}>
                        <Form>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">User Type</label>
                                    <Field as="select" name="user" className="form-select">
                                        <option value="">Select User Type</option>
                                        <option value="StudentProfile">Student</option>
                                        <option value="TeachingStaff">Teaching Staff</option>
                                        <option value="NonTeachingStaff">Non-Teaching Staff</option>
                                    </Field>
                                    <ErrorMessage name="user" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Leave Type</label>
                                    <Field as="select" name="typeOfLeave" className="form-select">
                                        <option value="">Select Leave Type</option>
                                        <option value="Casual Leave">Casual Leave</option>
                                        <option value="Personal Leave">Personal Leave</option>
                                        <option value="Public Leave">Public Leave</option>
                                        <option value="Medical Leave">Medical Leave</option>
                                    </Field>
                                    <ErrorMessage name="typeOfLeave" component="div" className="text-danger" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Reason</label>
                                    <Field as="textarea" name="reason" className="form-control" rows="1"></Field>
                                    <ErrorMessage name="reason" component="div" className="text-danger" />
                                </div>
                                <div className='col-md-6 mb-3'>
                                    <label className="form-label">Date</label>
                                    <Field type="date" name="date" className="form-control" />
                                    <ErrorMessage name="date" component="div" className="text-danger" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Attachments</label>
                                    <Field type="file" name="attachments" className="form-control" onChange={(e) => handleImageUpload(e, 'attachments')} />
                                    <ErrorMessage name="attachments" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label" >Leave Day Type</label>
                                    <Field as="select" name="multipleDays" id="multipleDays" className="form-select" onChange={(e) => setLeaveDay(e.target.value)}>
                                        <option value="">Select Leave Day Type</option>
                                        <option value={false}>Half Day</option>
                                        <option value={true}>Multiple Days</option>
                                    </Field>
                                    <ErrorMessage name="multipleDays" component="div" className="text-danger" />
                                </div>
                            </div>
                            {LeaveDay && (
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Start Date</label>
                                        <Field type="date" name="startDate" className="form-control" />
                                        <ErrorMessage name="startDate" component="div" className="text-danger" />
                                    </div>
                                    <div className="col-md-6 mb-3" id="endDateField">
                                        <label className="form-label">End Date</label>
                                        <Field type="date" name="endDate" className="form-control" />
                                        <ErrorMessage name="endDate" component="div" className="text-danger" />
                                    </div>
                                </div>
                            )}
                            <button type="submit" className="btn btn-primary w-100">Submit Application</button>
                        </Form>
                    </Formik>
                </div>
            </div>
            <div className='mt-5 bg-white'>
                <h3 className='p-3 text-center mb-4'>Apply Leave Status</h3>
                <div className="table-responsive">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Attachments</th>
                                <th>Leave Type</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Reason</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaves?.map((leave, index) => (
                                <tr key={index}>
                                    <td>{leave.attachments ? <img src={leave.attachments} className="img-fluid" style={{ maxWidth: '100px' }} /> : '-'}</td>
                                    <td>{leave.typeOfLeave}</td>
                                    <td>{leave.startDate ? new Date(leave.startDate).toLocaleDateString() : '-'}</td>
                                    <td>{leave.endDate ? new Date(leave.endDate).toLocaleDateString() : '-'}</td>
                                    <td>{leave.reason}</td>
                                    <td>
                                        <button className="btn btn-primary me-3" onClick={() => { setpopup(true); setSelectLeaveDay(leave) }}><i class="fa fa-eye" aria-hidden="true"></i></button>
                                        <button className="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {popup && selectLeaveDay && (
                <div className="modal d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Leave Details</h5>
                                <button type="button" className="btn-close" onClick={() => setpopup(false)}></button>
                            </div>
                            <div className="modal-body">
                                {/* Attachments */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Attachments</label>
                                    <div>
                                        {selectLeaveDay?.attachments ? (
                                            <img src={selectLeaveDay.attachments} className="img-fluid rounded border" style={{ maxWidth: "100px", maxHeight: "100px" }} />
                                        ) : (
                                            <div className="border p-2 rounded bg-light">No Attachment</div>
                                        )}
                                    </div>
                                </div>

                                {/* Leave Type & Reason */}
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Type of Leave</label>
                                        <div className="border p-2 rounded bg-light">
                                            {selectLeaveDay?.typeOfLeave || "-"}
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Reason</label>
                                        <div className="border p-2 rounded bg-light">
                                            {selectLeaveDay?.reason || "-"}
                                        </div>
                                    </div>
                                </div>

                                {/* User & Leave Type */}
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">User Type</label>
                                        <div className="border p-2 rounded bg-light">
                                            {selectLeaveDay?.user || "-"}
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Leave Day Type</label>
                                        <div className="border p-2 rounded bg-light">
                                            {selectLeaveDay?.multipleDays ? "Multiple Days" : "Half Day"}
                                        </div>
                                    </div>
                                </div>

                                {/* Show Start Date & End Date when multipleDays is true */}
                                {selectLeaveDay?.multipleDays && (
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Start Date</label>
                                            <div className="border p-2 rounded bg-light">
                                                {selectLeaveDay?.startDate ? new Date(selectLeaveDay.startDate).toLocaleDateString() : "-"}
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">End Date</label>
                                            <div className="border p-2 rounded bg-light">
                                                {selectLeaveDay?.endDate ? new Date(selectLeaveDay.endDate).toLocaleDateString() : "-"}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setpopup(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => setpopup(false)}>Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Leave;

// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import React, { useContext, useEffect, useState } from 'react';
// import { MainContext } from '../Controller/MainProvider';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { Bounce, toast } from 'react-toastify';
// import { useImageUploader } from '../Custom Hooks/CustomeHook';

// function Leave() {
//     const { uploadedData, handleImageUpload } = useImageUploader();
//     const { userId, instituteId } = useContext(MainContext);
//     const [LeaveDay, setLeaveDay] = useState('');
//     const [leaves, setLeaves] = useState([]);
//     const [popup, setpopup] = useState(false);
//     const [selectLeaveDay, setSelectLeaveDay] = useState();
//     const initialValues = {
//         userId: userId,
//         instituteId: instituteId,
//         user: '',
//         typeOfLeave: '',
//         reason: '',
//         halfDay: false,
//         multipleDays: false,
//         startDate: '',
//         endDate: '',
//         date: null,
//         attachments: '',
//         userRole: '',
//     };
//     const validationSchema = Yup.object().shape({
//         user: Yup.string().oneOf(['StudentProfile', 'TeachingStaff', 'NonTeachingStaff'], 'Invalid user type').required('User type is required'),
//         typeOfLeave: Yup.string().oneOf(['Casual Leave', 'Personal Leave', 'Public Leave', 'Medical Leave'], 'Invalid leave type').required('Leave type is required'),
//         reason: Yup.string().trim().required('Reason is required'),
//         halfDay: Yup.boolean(),
//         multipleDays: Yup.boolean(),
//         startDate: Yup.date().when('multipleDays', {
//             is: true,
//             then: Yup.date().required('Start Date is required for multiple days leave'),
//         }),
//         endDate: Yup.date().when('multipleDays', {
//             is: true,
//             then: Yup.date()
//                 .required('End Date is required for multiple days leave')
//                 .min(Yup.ref('startDate'), 'End Date must be after Start Date'),
//         }),
//         date: Yup.date().required('Date is required for a single-day leave'),
//         attachments: Yup.mixed(),
//         userRole: Yup.string().required("User Role is required")
//     });
//     const fatchLeave = async () => {
//         try {
//             const response = await axios.get(`/api/leaves/get/user/${userId}`);
//             setLeaves(response.data);
//             // setSelectLeaveDay(response.data)
//             setpopup(true);
//         } catch (error) {
//             console.log("Error fetching leaves", error);
//         }
//     }
//     console.log(leaves, "leaves");

//     const handleFormSubmit = async (values) => {
//         console.log(values);

//         const data = {
//             ...values,
//             attachments: uploadedData?.attachments
//         };
//         try {
//             const response = await axios.post(`/api/leaves/post`, data);
//             if (response.status === 201) {
//                 toast.success("Leave applied successfully");
//                 window.location.reload();
//             }
//         } catch (error) {
//             if (error.response) {
//                 toast.error(error.response.data.error);
//             } else {
//                 toast.error("Error applying leave");
//             }
//         }
//     };
//     console.log(selectLeaveDay, "selectLeaveDay");

//     useEffect(() => {
//         fatchLeave()
//     }, []);
//     return (
//         <div className="container mt-5">
//             <div className="card shadow-sm">
//                 <div className="card-header text-center text-white">
//                     <h3>Apply for Leave</h3>
//                 </div>
//                 <div className="card-body">
//                     <Formik
//                         initialValues={initialValues}
//                         enableReinitialize
//                         // validationSchema={validationSchema}
//                         onSubmit={handleFormSubmit}>
//                         <Form>
//                             <div className="row">
//                                 <div className="col-md-6 mb-3">
//                                     <label className="form-label">User Type</label>
//                                     <Field as="select" name="user" className="form-select">
//                                         <option value="">Select User Type</option>
//                                         <option value="StudentProfile">Student</option>
//                                         <option value="TeachingStaff">Teaching Staff</option>
//                                         <option value="NonTeachingStaff">Non-Teaching Staff</option>
//                                     </Field>
//                                     <ErrorMessage name="user" component="div" className="text-danger" />
//                                 </div>
//                                 <div className="col-md-6 mb-3">
//                                     <label className="form-label">Leave Type</label>
//                                     <Field as="select" name="typeOfLeave" className="form-select">
//                                         <option value="">Select Leave Type</option>
//                                         <option value="Casual Leave">Casual Leave</option>
//                                         <option value="Personal Leave">Personal Leave</option>
//                                         <option value="Public Leave">Public Leave</option>
//                                         <option value="Medical Leave">Medical Leave</option>
//                                     </Field>
//                                     <ErrorMessage name="typeOfLeave" component="div" className="text-danger" />
//                                 </div>
//                             </div>

//                             <div className="row">
//                                 <div className="col-md-6 mb-3">
//                                     <label className="form-label">Reason</label>
//                                     <Field as="textarea" name="reason" className="form-control" rows="1"></Field>
//                                     <ErrorMessage name="reason" component="div" className="text-danger" />
//                                 </div>
//                                 <div className='col-md-6 mb-3'>
//                                     <label className="form-label">User Role</label>
//                                     <Field type="text" name="userRole" className="form-control" />
//                                     <ErrorMessage name="userRole" component="div" className="text-danger" />
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="col-md-6 mb-3">
//                                     <label className="form-label">Attachments</label>
//                                     <Field type="file" name="attachments" className="form-control" onChange={(e) => handleImageUpload(e, 'attachments')} />
//                                     <ErrorMessage name="attachments" component="div" className="text-danger" />
//                                 </div>
//                                 <div className="col-md-6 mb-3">
//                                     <label className="form-label" >Leave Day Type</label>
//                                     <Field as="select" name="multipleDays" id="multipleDays" className="form-select"
//                                         onChange={(e) => setLeaveDay(e.target.value === "true")}>
//                                         <option value="" disabled>Select Leave Day Type</option>
//                                         <option value={false}>Half Day</option>
//                                         <option value={true}>Multiple Days</option>
//                                     </Field>

//                                     <ErrorMessage name="multipleDays" component="div" className="text-danger" />
//                                 </div>
//                             </div>
//                             {LeaveDay && (
//                                 <div className="row">
//                                     <div className="col-md-6 mb-3">
//                                         <label className="form-label">Start Date</label>
//                                         <Field type="date" name="startDate" className="form-control" />
//                                         <ErrorMessage name="startDate" component="div" className="text-danger" />
//                                     </div>
//                                     <div className="col-md-6 mb-3" id="endDateField">
//                                         <label className="form-label">End Date</label>
//                                         <Field type="date" name="endDate" className="form-control" />
//                                         <ErrorMessage name="endDate" component="div" className="text-danger" />
//                                     </div>
//                                 </div>
//                             )}
//                             <div className='col-md-6 mb-3'>
//                                 <label className="form-label">Date</label>
//                                 <Field type="date" name="date" className="form-control" />
//                                 <ErrorMessage name="date" component="div" className="text-danger" />
//                             </div>
//                             <button type="submit" className="btn btn-primary w-100">Submit Application</button>
//                         </Form>
//                     </Formik>
//                 </div>
//             </div>
//             <div className='mt-5 bg-white'>
//                 <h3 className='p-3 text-center mb-4'>Apply Leave Status</h3>
//                 <div className="table-responsive">
//                     <table className='table'>
//                         <thead>
//                             <tr>
//                                 <th>Attachments</th>
//                                 <th>Leave Type</th>
//                                 <th>Start Date</th>
//                                 <th>End Date</th>
//                                 <th>Reason</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {leaves?.map((leave, index) => (
//                                 <tr key={index}>
//                                     <td>{leave.attachments ? <img src={leave.attachments} className="img-fluid" style={{ maxWidth: '100px' }} /> : '-'}</td>
//                                     <td>{leave.typeOfLeave}</td>
//                                     <td>{leave.startDate ? new Date(leave.startDate).toLocaleDateString() : '-'}</td>
//                                     <td>{leave.endDate ? new Date(leave.endDate).toLocaleDateString() : '-'}</td>
//                                     <td>{leave.reason}</td>
//                                     <td>
//                                         <button className="btn btn-primary me-3"
//                                             onClick={() => {
//                                                 setpopup(true);
//                                                 setSelectLeaveDay(leave);
//                                             }}>
//                                             <i className="fa fa-eye" aria-hidden="true"></i>
//                                         </button>

//                                         <button className="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//             {popup && selectLeaveDay && (
//                 <div className="modal d-block" tabIndex="-1" role="dialog">
//                     <div className="modal-dialog">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Leave Details</h5>
//                                 <button type="button" className="btn-close" onClick={() => setpopup(false)}></button>
//                             </div>
//                             <div className="modal-body">
//                                 {/* Attachments */}
//                                 <div className="col-md-6 mb-3">
//                                     <label className="form-label">Attachments</label>
//                                     <div>
//                                         {selectLeaveDay?.attachments && selectLeaveDay.attachments.length > 0 ? (
//                                             selectLeaveDay.attachments.map((attachment, index) => (
//                                                 <img key={index} src={attachment} className="img-fluid rounded border me-2" style={{ maxWidth: "100px", maxHeight: "100px" }} />
//                                             ))
//                                         ) : (
//                                             <div className="border p-2 rounded bg-light">No Attachment</div>
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* Leave Details */}
//                                 <div className="row">
//                                     <div className="col-md-6 mb-3">
//                                         <label className="form-label">Type of Leave</label>
//                                         <div className="border p-2 rounded bg-light">
//                                             {selectLeaveDay?.typeOfLeave || "-"}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6 mb-3">
//                                         <label className="form-label">Reason</label>
//                                         <div className="border p-2 rounded bg-light">
//                                             {selectLeaveDay?.reason || "-"}
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="row">
//                                     <div className="col-md-6 mb-3">
//                                         <label className="form-label">User Type</label>
//                                         <div className="border p-2 rounded bg-light">
//                                             {selectLeaveDay?.user || "-"}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6 mb-3">
//                                         <label className="form-label">User Role</label>
//                                         <div className="border p-2 rounded bg-light">
//                                             {selectLeaveDay?.userRole || "-"}
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Leave Duration Handling */}
//                                 <div className="row">
//                                     <div className="col-md-6 mb-3">
//                                         <label className="form-label">Leave Type</label>
//                                         <div className="border p-2 rounded bg-light">
//                                             {selectLeaveDay?.multipleDays ? "Multiple Days" : selectLeaveDay?.halfDay ? "Half Day" : "Single Day"}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6 mb-3">
//                                         <label className="form-label">Status</label>
//                                         <div className="border p-2 rounded bg-light">
//                                             {selectLeaveDay?.status ? selectLeaveDay.status : "Pending"}
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Dates Handling */}
//                                 {selectLeaveDay?.multipleDays === true ? (
//                                     <div className="row">
//                                         <div className="col-md-6 mb-3">
//                                             <label className="form-label">Start Date</label>
//                                             <div className="border p-2 rounded bg-light">
//                                                 {selectLeaveDay?.startDate ? new Date(selectLeaveDay.startDate).toLocaleDateString() : "-"}
//                                             </div>
//                                         </div>
//                                         <div className="col-md-6 mb-3">
//                                             <label className="form-label">End Date</label>
//                                             <div className="border p-2 rounded bg-light">
//                                                 {selectLeaveDay?.endDate ? new Date(selectLeaveDay.endDate).toLocaleDateString() : "-"}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <div className="row">
//                                         <div className="col-md-6 mb-3">
//                                             <label className="form-label">Date</label>
//                                             <div className="border p-2 rounded bg-light">
//                                                 {selectLeaveDay?.date ? new Date(selectLeaveDay.date).toLocaleDateString() : "-"}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>

//                             <div className="modal-footer">
//                                 <button type="button" className="btn btn-secondary" onClick={() => setpopup(false)}>Close</button>
//                                 <button type="button" className="btn btn-primary" onClick={() => setpopup(false)}>Apply</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//         </div>
//     );
// }

// export default Leave;
