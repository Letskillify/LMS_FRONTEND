import { Field, Form, Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { useFileUploader } from '../../Custom Hooks/CustomeHook';

import { Modal, Spinner } from 'react-bootstrap';
import { getCommonCredentials } from '../../GlobalHelper/CommonCredentials';
import { Bounce, toast } from 'react-toastify';
import { useGetAllDefaultHolidaysQuery } from '../../Redux/Api/defaultHolidaySlice';
import { useCreateInstituteHolidayMutation, useDeleteInstituteHolidayMutation, useGetAllInstituteHolidaysQuery, useUpdateInstituteHolidayMutation } from '../../Redux/Api/holidaySlice';
import useGlobalToast from '../../GlobalComponents/GlobalToast';
import GlobalTable from '../../GlobalComponents/GlobalTable';

function Holiday() {

    const showToast = useGlobalToast();
    const [holidays, setHolidays] = useState([]);
    const [defaultHolidays, setDefaultHolidays] = useState([]);
    const [popup, setPopup] = useState(false);
    const [defaultShow, setDefaultShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [addHoliday, setAddHoliday] = useState(null);
    const [edit, setEdit] = useState(null);
    const { userId, InstituteId } = getCommonCredentials();
    const { uploadedData, handleFileUpload, setUploadedData } = useFileUploader();

    const formatDate = (date) => {
        return date ? new Date(date).toISOString().split('T')[0] : '';
    };

    const { data : defaultHolidayData } = useGetAllDefaultHolidaysQuery();
    const { data : holidayData, isLoading } = useGetAllInstituteHolidaysQuery();
    const [addHolidayPost] = useCreateInstituteHolidayMutation();
    const [updateHoliday] = useUpdateInstituteHolidayMutation();
    const [deleteHoliday] = useDeleteInstituteHolidayMutation();

    useEffect(() => {
        if (defaultHolidayData) {
            setDefaultHolidays(defaultHolidayData?.items);
        }
        if(holidayData){
            setHolidays(holidayData?.items);
        }
    }, [defaultHolidayData, holidayData]);

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
            const response = await addHolidayPost(data);
            if (response.data.status === 201) {
                showToast("Data Added Successfully", "success");
                setAddHoliday('');
                setUploadedData({});
                resetForm();
            }
        } catch (error) {
            console.log(error);
            showToast("Error adding holiday", "error");
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await deleteHoliday(id);
            if (response.data.status === 200) {
                showToast("Data Deleted Successfully", "success");
            }
        } catch (error) {
            console.log(error);
            showToast("Error deleting holiday", "error");
        }
    }

    const handleEdit = async (values) => {
        const data = {
            ...values,
            thumbnail: uploadedData?.thumbnail
        }
        console.log("Form Data:", data);
        try {
            const response = await updateHoliday({ id: edit?._id, holidayData: data });
            if (response.data.status === 200) {
                showToast("Data Updated Successfully", "success");
                setPopup(false);
                // fetchData();
                setUploadedData({});
            }
        } catch (error) {
            console.log(error);
            showToast("Error updating holiday", "error");
        }
    };

    const getTableActions = () => [
        {
            icon: "fa fa-pencil-square-o",
            className: "btn-secondary",
            onClick: (holiday) => { 
                setPopup(true); 
                setEdit(holiday.originalData)
            },
            label: "Edit Holiday"
        },
        {
            icon: "fa fa-trash",
            className: "btn-danger",
            onClick: (holiday) => handleDelete(holiday._id),
            label: "Delete Holiday"
        }
    ];

    const formatTableData = (holidays) => {
        return holidays?.map(holiday => ({
            Thumbnail: holiday.thumbnail ? 
                <img src={holiday.thumbnail} 
                    onError={(e) => { e.target.src = "/image/defaultImg.png"; }} 
                    alt="Thumbnail" 
                    className="img-fluid" 
                    style={{ maxWidth: '50px' }} 
                /> : 
                'No Image',
            "Holiday Title": holiday.title,
            "Start Date": holiday.startingDate ? 
                new Date(holiday.startingDate).toLocaleDateString() : 
                (holiday.date ? new Date(holiday.date).toLocaleDateString() : '-'),
            "End Date": holiday.endingDate ? 
                new Date(holiday.endingDate).toLocaleDateString() : 
                (holiday.date ? new Date(holiday.date).toLocaleDateString() : '-'),
            Status: holiday.status || '-',
            Description: holiday.description,
            _id: holiday._id,
            originalData: holiday
        }));
    };

    const getDefaultTableActions = () => [
        {
            icon: "fa fa-edit",
            className: "btn-info",
            onClick: (holiday) => { 
                setAddHoliday(holiday.originalData); 
                setDefaultShow(false); 
            },
            label: "Use this holiday"
        }
    ];

    const formatDefaultTableData = (holidays) => {
        return holidays?.filter((holiday) => {
            const search = searchTerm.toLowerCase();
            return holiday?.title?.toLowerCase()?.includes(search) ||
                holiday?.description?.toLowerCase()?.includes(search);
        }).map(holiday => ({
            Thumbnail: holiday.thumbnail ? 
                <img src={holiday.thumbnail} 
                    alt="Thumbnail" 
                    className="img-fluid" 
                    style={{ maxWidth: '100px' }} 
                /> : 
                '-',
            "Holiday Title": holiday.title,
            "Start Date": holiday.startingDate ? 
                new Date(holiday.startingDate).toLocaleDateString() : 
                (holiday.date ? new Date(holiday.date).toLocaleDateString() : '-'),
            "End Date": holiday.endingDate ? 
                new Date(holiday.endingDate).toLocaleDateString() : 
                (holiday.date ? new Date(holiday.date).toLocaleDateString() : '-'),
            Status: holiday.status || '-',
            Description: holiday.description,
            originalData: holiday
        }));
    };
console.log(edit);

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
                                    <div className='w-100'>
                                        <label htmlFor="thumbnail" className="form-label">Thumbnail (Upload)</label>
                                        <div className="d-flex gap-2 align-items-center">
                                            {(addHoliday?.thumbnail || uploadedData?.thumbnail) && (
                                                <img 
                                                    src={uploadedData?.thumbnail || addHoliday?.thumbnail} 
                                                    onError={(e) => { e.target.src = "/image/defaultImg.png"; }}
                                                    alt="Thumbnail" 
                                                    className="img-fluid" 
                                                    style={{ height: '38px', objectFit: 'contain' }} 
                                                />
                                            )}
                                            <input 
                                                type="file" 
                                                className="form-control" 
                                                id="thumbnail" 
                                                name="thumbnail" 
                                                accept="image/*" 
                                                onChange={(e) => handleFileUpload(e, "thumbnail")} 
                                            />
                                        </div>
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
                <div className="card p-4">
                    <h4>All Holidays</h4>
                    <GlobalTable 
                        headers={["Thumbnail", "Holiday Title", "Start Date", "End Date", "Status", "Description"]}
                        data={formatTableData(holidays)}
                        actions={getTableActions()}
                        loading={isLoading}
                        noDataMessage="No holidays found"
                    />
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
                            <GlobalTable 
                                headers={["Thumbnail", "Holiday Title", "Start Date", "End Date", "Status", "Description"]}
                                data={formatDefaultTableData(defaultHolidays)}
                                actions={getDefaultTableActions()}
                                loading={defaultHolidays.length === 0}
                                noDataMessage="No default holidays found"
                            />
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
                                    instituteId: userId,
                                    startingDate: formatDate(edit?.startingDate) || "",
                                    endingDate: formatDate(edit?.endingDate) || "",
                                    date: formatDate(edit?.date) || "",
                                    thumbnail: edit?.thumbnail || "",
                                    multipleDays: edit?.multipleDays || false,
                                    title: edit?.title || "",
                                    description: edit?.description || "",
                                    status: edit?.status || ""
                                }}
                                onSubmit={(values) => handleEdit(values)}
                                enableReinitialize={true}
                            >
                                {({ values, setFieldValue }) => (
                                    <Form className="row g-3">
                                        <div className="col-md-6">
                                            <label htmlFor="title" className="form-label">Holiday Title</label>
                                            <Field type="text" className="form-control" id="title" name="title" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="multipleDays" className="form-label">Multiple Days</label>
                                            <Field as="select" className="form-select" id="multipleDays" name="multipleDays">
                                                <option value={false}>No</option>
                                                <option value={true}>Yes</option>
                                            </Field>
                                        </div>
                                        {values.multipleDays === true || values.multipleDays === "true" ? (
                                            <>
                                                <div className="col-md-6">
                                                    <label htmlFor="startingDate" className="form-label">Starting Date</label>
                                                    <Field type="date" className="form-control" id="startingDate" name="startingDate" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="endingDate" className="form-label">Ending Date</label>
                                                    <Field type="date" className="form-control" id="endingDate" name="endingDate" />
                                                </div>
                                            </>
                                        ) : (
                                            <div className="col-md-6">
                                                <label htmlFor="date" className="form-label">Date</label>
                                                <Field type="date" className="form-control" id="date" name="date" />
                                            </div>
                                        )}
                                        <div className={`col-md-6 d-flex align-items-center ${uploadedData?.thumbnail || edit?.thumbnail ? 'mt-4' : ''}`}>
                                            <div className='w-100'>
                                                <label htmlFor="thumbnail" className="form-label">Thumbnail (Upload)</label>
                                                <div className="d-flex gap-2 align-items-center">
                                                    {(edit?.thumbnail || uploadedData?.thumbnail) && (
                                                        <img 
                                                            src={uploadedData?.thumbnail || edit?.thumbnail} 
                                                            onError={(e) => { e.target.src = "/image/defaultImg.png"; }}
                                                            alt="Thumbnail" 
                                                            className="img-fluid" 
                                                            style={{ height: '38px', objectFit: 'contain' }} 
                                                        />
                                                    )}
                                                    <input 
                                                        type="file" 
                                                        className="form-control" 
                                                        id="thumbnail" 
                                                        name="thumbnail" 
                                                        accept="image/*" 
                                                        onChange={(e) => handleFileUpload(e, "thumbnail")} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="status" className="form-label">Status</label>
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
                                            <label htmlFor="description" className="form-label">Description</label>
                                            <Field 
                                                as="textarea" 
                                                className="form-control" 
                                                id="description" 
                                                name="description" 
                                                rows="3" 
                                                placeholder="Enter description"
                                            />
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" className="btn btn-secondary">Update Holiday</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Holiday
