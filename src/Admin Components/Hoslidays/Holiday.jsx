import { Field, Form, Formik } from 'formik'
import React, { useContext, useEffect } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { useImageUploader } from '../../Custom Hooks/CustomeHook';

import { Modal, Spinner } from 'react-bootstrap';
import { getCommonCredentials } from '../../GlobalHelper/CommonCredentials';
import { Bounce, toast } from 'react-toastify';

function Holiday() {
    const [holidays, setHolidays] = React.useState([]);
    const [defaultHolidays, setDefaultHolidays] = React.useState([]);
    const [popup, setPopup] = React.useState(false);
    const [defaultShow, setDefaultShow] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [addHoliday, setAddHoliday] = React.useState(null);
    const [edit, setEdit] = React.useState(null);
    const { userId } = getCommonCredentials();
    const { uploadedData, handleImageUpload, setUploadedData } = useImageUploader();

    const formatDate = (date) => {
        return date ? new Date(date).toISOString().split('T')[0] : '';
    };
    // const today = new Date().toISOString().split('T')[0];
    // const tomorrow = new Date();
    // tomorrow.setDate(tomorrow.getDate() + 1);
    // const nextDay = tomorrow.toISOString().split('T')[0];

    const initialValues = {
        instituteId: userId,
        startingDate: formatDate(addHoliday?.startingDate) || "",
        endingDate: formatDate(addHoliday?.endingDate) || "",
        date: formatDate(addHoliday?.date) || "",
        thumbnail: addHoliday?.thumbnail || '',
        multipleDays: addHoliday?.multipleDays || false,
        title: addHoliday?.title || '',
        description: addHoliday?.description || '',
        status: addHoliday?.status || 'Holiday'
    };


    const handleHoliday = async (values, { resetForm }) => {

        const data = {
            ...values,
            thumbnail: uploadedData?.thumbnail
        }

        try {
            const response = await axios.post("/api/institute-holiday/post", data, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST"
            })
            if (response.status === 201) {
                toast.success("Data Sent Successfully", {
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
                setAddHoliday('');
                setUploadedData({});
                resetForm();
                fetchData();
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Error sending data", {
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
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/institute-holiday/get/institute/${userId}`);
            setHolidays(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    const fetchHodlidayData = async () => {
        try {
            const response = await axios.get(`/api/holiday-list/get`);
            setDefaultHolidays(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/institute-holiday/delete/${id}`);
            if (response.status === 200) {
                toast.success("Data Deleted Successfully", {
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
                fetchData();
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Error deleting holiday", {
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
    }

    const handleEdit = async (values) => {
        const data = {
            ...values,
            thumbnail: uploadedData?.thumbnail
        }
        console.log("Form Data:", data);
        try {
            const response = await axios.put(`/api/institute-holiday/update/${edit._id}`, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(response);
            if (response.status === 200) {
                toast.success("Data Updated Successfully", {
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
                setPopup(false);
                fetchData();
                setUploadedData({});
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Error updating holiday", {
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

    useEffect(() => {
        fetchData();
        fetchHodlidayData();
    }, []);



    return (
        <>
            <div className="container-fluid my-5">
                <h1 className="text-center border-end border-start">Holiday Management</h1>
                <hr />
                {/* <!-- Holiday Form --> */}
                <div className="card p-4 mb-4">
                    <div className="row ">
                        <div className="col-md-12">
                            {addHoliday ? <div className="col-md-12 align-self-end"><button type="button" className="btn btn-warning" onClick={() => setDefaultShow(true)}>Change Default Holiday</button></div> :
                                <button type="button" className="btn btn-info" onClick={() => setDefaultShow(true)}>Add Default Holiday</button>}
                        </div>
                    </div>
                    <hr />
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values, { resetForm }) => handleHoliday(values, { resetForm })}
                        enableReinitialize   //this property enable change initialvalue
                    >
                        {({ values }) => (
                            <Form className="row g-3">
                                <div className="col-md-6">
                                    <label for="title" className="form-label">Holiday Title</label>
                                    <Field type="text" className="form-control" id="title" name="title" placeholder="Enter title" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="multipleDays" className="form-label">Multiple Days</label>
                                    <Field as="select" className="form-select" id="multipleDays" name="multipleDays">
                                        <option value={false}>No</option>
                                        <option value={true}>Yes</option>
                                    </Field>
                                </div>
                                {values?.multipleDays === "true" ? (
                                    <>
                                        <div className="col-md-6">
                                            <label for="startingDate" className="form-label">Starting Date</label>
                                            <Field type="date" className="form-control" id="startingDate" name="startingDate" />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="endingDate" className="form-label">Ending Date</label>
                                            <Field type="date" className="form-control" id="endingDate" name="endingDate" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="col-md-6">
                                            <label for="date" className="form-label">Date</label>
                                            <Field type="date" className="form-control" id="date" name="date" />
                                        </div>
                                    </>
                                )}
                                <div className={`col-md-6 d-flex align-items-center ${uploadedData?.thumbnail || addHoliday?.thumbnail ? 'mt-4' : ''}`}>
                                    {(addHoliday?.thumbnail || uploadedData?.thumbnail) && <div className="me-3">
                                        <img src={uploadedData?.thumbnail || addHoliday?.thumbnail} alt="Thumbnail" className="img-fluid" style={{ maxWidth: '100px' }} />
                                    </div>}
                                    <div className='w-100'>
                                        <label htmlFor="thumbnail" className="form-label">Thumbnail (Upload)</label>
                                        <input type="file" className="form-control" id="thumbnail" name="thumbnail" accept="image/*" onChange={(e) => handleImageUpload(e, "thumbnail")} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label for="status" className="form-label">Status</label>
                                    <Field as="select" className="form-select" id="status" name="status">
                                        <option value="">Select Status</option>
                                        <option value="Holiday">Holiday</option>
                                        <option value="Event">Event</option>
                                        <option value="Day-Out">Day-Out</option>
                                        <option value="Half-Day">Half-Day</option>
                                        <option value="Celebration">Celebration</option>
                                    </Field>
                                </div>
                                <div className="col-12">
                                    <label for="description" className="form-label">Description</label>
                                    <Field as="textarea" className="form-control" id="description" name="description" rows="3" placeholder="Enter description"></Field>
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="btn btn-secondary">Add Holiday</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                {/* <!-- Holiday Table --> */}
                <div className="card p-4 table-responsive">
                    <h4>All Holidays</h4>
                    <table className="table table-striped mt-3">
                        <thead>
                            <tr>
                                <th className='text-center'>Thumbnail</th>
                                <th>Holiday Title</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>

                        </thead>
                        <tbody id="holidayTableBody" >
                            {holidays.map((holiday) => (
                                <tr key={holiday._id} className='align-text-top'>
                                    <td className='text-center rounded'>{holiday.thumbnail ? <img src={holiday.thumbnail} onError={(e) => { e.target.src = "/image/defaultImg.png"; }} alt="Thumbnail" className="img-fluid" style={{ maxWidth: '50px' }} /> : <p>No Image</p>}</td>
                                    <td>{holiday.title}</td>
                                    <td>{holiday.startingDate ? new Date(holiday.startingDate).toLocaleDateString() : '-' || holiday.date ? new Date(holiday.date).toLocaleDateString() : '-'}</td>
                                    <td>{holiday.endingDate ? new Date(holiday.endingDate).toLocaleDateString() : '-' || holiday.date ? new Date(holiday.date).toLocaleDateString() : '-'}</td>
                                    <td>{holiday.description}</td>
                                    <td className="d-flex gap-2">
                                        <button className="btn btn-secondary" onClick={() => { setPopup(true); setEdit(holiday) }}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(holiday._id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {holidays?.length === 0 && <div className="d-flex mt-5 justify-content-center align-items-center">
                        <Spinner animation="border" variant="primary" />
                    </div>}
                </div>
                {defaultShow && (
                    <Modal show={defaultShow} onHide={() => setDefaultShow(false)} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter" className='mb-3'>Default Holidays</Modal.Title>
                            <h6 className="mx-auto align-self-center text-info">You can add default holidays here by clicking on the <i className="fa fa-edit text-success fs-5 mx-1" aria-hidden="true"></i> edit button</h6>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div className="form-group w-100">
                                    <input type="text" className="form-control" placeholder="Search by title or description" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                </div>
                            </div>
                            <table className="table table-striped mt-3">
                                <thead>
                                    <tr>
                                        <th>Thumbnail</th>
                                        <th>Holiday Title</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody id="holidayTableBody" >
                                    {defaultHolidays.filter((holiday) => {
                                        const search = searchTerm ? searchTerm.toLowerCase() : '';
                                        return holiday?.title?.toLowerCase()?.includes(search) ||
                                            holiday?.description?.toLowerCase()?.includes(search);
                                    }).map((holiday) => (
                                        <tr key={holiday._id} className='align-text-top'>
                                            <td>{holiday.thumbnail ? <img src={holiday.thumbnail} alt="Thumbnail" className="img-fluid" style={{ maxWidth: '100px' }} /> : '-'}</td>
                                            <td>{holiday.title}</td>
                                            <td>{holiday.startingDate ? new Date(holiday.startingDate).toLocaleDateString() : '-' || holiday.date ? new Date(holiday.date).toLocaleDateString() : '-'}</td>
                                            <td>{holiday.endingDate ? new Date(holiday.endingDate).toLocaleDateString() : '-' || holiday.date ? new Date(holiday.date).toLocaleDateString() : '-'}</td>
                                            <td>{holiday.description}</td>
                                            <td onClick={() => { setAddHoliday(holiday); setDefaultShow(false); }} className="fs-4" style={{ cursor: 'pointer' }}>
                                                <i className="fa fa-edit text-info" aria-hidden="true"></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {defaultHolidays.length === 0 && <div className="d-flex mt-5 justify-content-center align-items-center">
                                <Spinner animation="border" variant="primary" />
                            </div>}
                        </Modal.Body>
                    </Modal>
                )}
                {popup && edit && (
                    <div className="popup-overlay">
                        <div className="popup p-4 modal-lg">
                            <div className='d-flex justify-content-end mb-5'>
                                <button className='btn-close btn-close-primary' onClick={() => setPopup(false)}></button>
                            </div>
                            <Formik
                                initialValues={{
                                    institute: userId || '',
                                    startingDate: edit?.startingDate ? new Date(edit?.startingDate).toISOString().split('T')[0] : '' || '',
                                    endingDate: edit?.endingDate ? new Date(edit?.endingDate).toISOString().split('T')[0] : '' || '',
                                    thumbnail: edit?.thumbnail,
                                    multipleDays: edit?.multipleDays,
                                    date: edit?.date ? new Date(edit?.date).toISOString().split('T')[0] : '' || '',
                                    title: edit?.title || '',
                                    description: edit?.description || '',
                                    status: edit?.status || '',
                                }}
                                onSubmit={(values) => handleEdit(values)}


                            // validationSchema={{
                            //     startingDate: Yup.string().required('Starting date is required'),
                            //     endingDate: Yup.string().required('Ending date is required'),
                            //     thumbnail: Yup.string().required('Thumbnail is required'),
                            //     title: Yup.string().required('Title is required'),
                            //     description: Yup.string().required('Description is required'),
                            // }}
                            >
                                {({ values }) => (
                                    <Form action="/api/holidays/add" method="POST" className="row g-3">
                                        <div className="col-md-6">
                                            <label htmlFor="multipleDays" className="form-label">Multiple Days</label>
                                            <Field as="select" className="form-select" id="multipleDays" name="multipleDays" values={edit?.multipleDays}>
                                                <option value={false}>No</option>
                                                <option value={true}>Yes</option>
                                            </Field>
                                        </div>
                                        {values?.multipleDays == true || values?.multipleDays == "true" ? (
                                            <>
                                                <div className="col-md-6">
                                                    <label for="startingDate" className="form-label">Starting Date</label>
                                                    <Field className="form-control" type="date" id="startingDate" name="startingDate" values={edit?.startingDate} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label for="endingDate" className="form-label">Ending Date</label>
                                                    <Field className="form-control" type="date" id="endingDate" name="endingDate" values={edit?.endingDate} />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="col-md-6">
                                                    <label for="date" className="form-label">Date</label>
                                                    <Field className="form-control" type="date" id="date" name="date" values={edit?.date} />
                                                </div>
                                            </>
                                        )}
                                        <div className="col-md-6">
                                            <label htmlFor="thumbnail" className="form-label">Thumbnail (Upload)</label>
                                            <input type="file" className="form-control" id="thumbnail" name="thumbnail" accept="image/*" onChange={(e) => handleImageUpload(e, "thumbnail")} />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="title" className="form-label">Holiday Title</label>
                                            <Field className="form-control" id="title" name="title" placeholder="Enter title" values={edit?.title} />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="status" className="form-label">Status</label>
                                            <Field as="select" className="form-select" id="status" name="status">
                                                <option value="">Select Status</option>
                                                <option value="Holiday">Holiday</option>
                                                <option value="Event">Event</option>
                                                <option value="Day-Out">Day-Out</option>
                                                <option value="Half-Day">Half-Day</option>
                                                <option value="Celebration">Celebration</option>
                                            </Field>
                                        </div>
                                        <div className="col-12">
                                            <label for="description" className="form-label">Description</label>
                                            <Field as="textarea" className="form-control" id="description" name="description" rows="3" placeholder="Enter description" values={edit?.description} ></Field>
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" className='btn btn-secondary'>submit</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>

                        </div>
                    </div>
                )
                }
            </div>
        </>
    )
}

export default Holiday
