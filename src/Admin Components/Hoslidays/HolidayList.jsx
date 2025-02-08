import { Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { useImageUploader } from '../../Custom Hooks/CustomeHook';

function HolidayList() {
    const [holidays, setHolidays] = React.useState([]);
    const [popup, setPopup] = React.useState(false);
    const [edit, setEdit] = React.useState(null);
    const { uploadedData, handleImageUpload } = useImageUploader();

    const handleHoliday = async (values) => {
        const data = {
            ...values,
            thumbnail: uploadedData?.thumbnail
        }
        try {
            const response = await axios.post("/api/holiday/post", data, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST"
            })
            if (response.status === 201) {
                alert("Data Sent Successfully")
                fetchData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchData = async () => {
        console.log(holidays);
        try {
            const response = await axios.get(`/api/holiday/get`);
            console.log(response);
            setHolidays(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/holiday-list/delete/${id}`);
            console.log(response);
            fetchData();
            if (response.status === 200) {
                alert("Data Deleted Successfully")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = async (values) => {
        const data = {
            ...values,
            thumbnail: uploadedData?.thumbnail
        }
        try {
            const response = await axios.put(`/api/holiday-list/update/${edit._id}`, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(response);
            if (response.status === 200) {
                alert("Data Updated Successfully");
                setPopup(false);
                fetchData();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <div className="container-fluid my-5">
                <h1 className="text-center mb-4">Holiday Management</h1>
                {/* <!-- Holiday Form --> */}
                <div className="card p-4 mb-4">
                    <h4>Add New Holiday</h4>
                    <Formik initialValues={{
                        startingDate: '',
                        endingDate: '',
                        thumbnail: '',
                        title: '',
                        description: '',

                    }}
                        // validationSchema={{
                        //     startingDate: Yup.string().required('Starting date is required'),
                        //     endingDate: Yup.string().required('Ending date is required'),
                        //     thumbnail: Yup.string().required('Thumbnail is required'),
                        //     title: Yup.string().required('Title is required'),
                        //     description: Yup.string().required('Description is required'),
                        // }}
                        onSubmit={handleHoliday}
                    >
                        {() => (
                            <Form  className="row g-3">
                                <div className="col-md-6">
                                    <label for="startingDate" className="form-label">Starting Date</label>
                                    <Field type="date" className="form-control" id="startingDate" name="startingDate" />
                                </div>
                                <div className="col-md-6">
                                    <label for="endingDate" className="form-label">Ending Date</label>
                                    <Field type="date" className="form-control" id="endingDate" name="endingDate" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="thumbnail" className="form-label">Thumbnail (Upload)</label>
                                    <input type="file" className="form-control" id="thumbnail" name="thumbnail" accept="image/*"  onChange={(e) => handleImageUpload(e, "thumbnail")}/>
                                </div>
                                <div className="col-md-6">
                                    <label for="title" className="form-label">Holiday Title</label>
                                    <Field type="text" className="form-control" id="title" name="title" placeholder="Enter title" />
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
                                <th>Thumbnail</th>
                                <th>Holiday Title</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>

                        </thead>
                        <tbody id="holidayTableBody" >
                            {holidays.map((holiday) => (
                                <tr key={holiday._id}>
                                    <td>{holiday.thumbnail ? <img src={holiday.thumbnail} alt="Thumbnail" className="img-fluid" style={{ maxWidth: '100px' }} /> : '-'}</td>
                                    <td>{holiday.title}</td>
                                    <td>{holiday.startingDate ? new Date(holiday.startingDate).toLocaleDateString() : '-'}</td>
                                    <td>{holiday.endingDate ? new Date(holiday.endingDate).toLocaleDateString() : '-'}</td>
                                    <td>{holiday.description}</td>
                                    <td className="d-flex gap-2">
                                        <button className="btn btn-secondary" onClick={() => { setPopup(true); setEdit(holiday) }}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(holiday._id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {
                    popup && edit && (
                        <div className="popup-overlay">
                            <div className="popup-content">
                                <div className='d-flex justify-content-end mb-5'>
                                    <button className='btn-close btn-close-primary' onClick={() => setPopup(false)}></button>
                                </div>
                                <Formik
                                    initialValues={{    
                                        startingDate: edit?.startingDate ? new Date(edit?.startingDate).toLocaleDateString() : '' || '',
                                        endingDate: edit?.endingDate ? new Date(edit?.endingDate).toLocaleDateString() : '' || '',
                                        title: edit?.title || '',
                                        description: edit?.description || '',
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
                                    {() => (
                                        <Form action="/api/holidays/add" method="POST" className="row g-3">
                                            <div className="col-md-6">
                                                <label for="startingDate" className="form-label">Starting Date</label>
                                                <Field  className="form-control" id="startingDate" name="startingDate" values={edit?.startingDate} />
                                            </div>
                                            <div className="col-md-6">
                                                <label for="endingDate" className="form-label">Ending Date</label>
                                                <Field  className="form-control" id="endingDate" name="endingDate" values={edit?.endingDate} />
                                            </div>
                                            <div className="col-md-6">
                                                <label for="thumbnail" className="form-label">Thumbnail (URL)</label>
                                                <Field type="file"  className="form-control" id="thumbnail" name="thumbnail" placeholder="Enter thumbnail URL" values={edit?.thumbnail}  onChange={(e) => handleImageUpload(e, "thumbnail")}/>
                                            </div>
                                            <div className="col-md-6">
                                                <label for="title" className="form-label">Holiday Title</label>
                                                <Field className="form-control" id="title" name="title" placeholder="Enter title" values={edit?.title} />
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

export default HolidayList
