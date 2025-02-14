import React, { useEffect, useState } from "react";
import axios from "axios";
import { Field, Formik, Form } from "formik";
import { Bounce, toast } from "react-toastify";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import { useCreateBoardMutation, useDeleteBoardMutation, useUpdateBoardMutation } from "../../Redux/Api/academicsApi/boardSlice";
import useGlobalToast from "../../GlobalComponents/GlobalToast";

function Board() {
    const showToast = useGlobalToast();
    const [BoardData, setBoardData] = useState([]);
    const {userId, Board} = getCommonCredentials();
    const [popup, setPopup] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState(null);

    const [createBoard] = useCreateBoardMutation();
    const [updateBoard] = useUpdateBoardMutation();
    const [deleteBoard] = useDeleteBoardMutation();

    const handleBoard = async (values, { resetForm }) => {
        try {
            const res = await createBoard(values);
            if (res.data.status === 201) {
                showToast("Board Created Successfully", "success");
                resetForm();
            }
        } catch (error) {
            showToast("Error submitting board", "error");
        }
    };


    const handleBoardUpdate = async (values, { resetForm }) => {
        try {
            const res = await updateBoard({boardId: selectedBoard._id, boardData: values});
            if (res.data.status === 200) {
                showToast("Board Updated Successfully", "success");
                resetForm();
            }
        } catch (error) {
            showToast("Error updating board", "error");
        }
    };

    const handleBoardDelete = async (id) => {
        try {
            const res = await deleteBoard(id);
            if (res.data.status === 200) {
                showToast("Board Deleted Successfully", "success");
            }
        } catch (error) {
            showToast("Error deleting board", "error");
        }
    };

    useEffect(() => {
        setBoardData(Board);
    }, [Board]);

    return (
        <>
            <div className="px-4 py-5">
                <div className="row">
                    {/* Create Board Section */}
                    <div className="col-md-4 mt-3">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title text-center">Create Board</h5>
                                <Formik
                                    initialValues={{
                                        boardName: "",
                                        instituteId: userId,
                                    }}
                                    onSubmit={handleBoard}
                                >
                                    {() => (
                                        <Form>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Board Name <span className="text-danger">*</span>
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="boardName"
                                                    id="boardName"
                                                    className="form-control"
                                                    placeholder="Enter board name"
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary w-100">
                                                Submit
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>

                    {/* List Boards Section */}
                    <div className="col-md-8 mt-3">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-3">
                                    <h5 className="card-title">Boards</h5>
                                   
                                </div>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Board Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {BoardData && BoardData.length > 0 ? (
                                            BoardData.map((item, index) => (
                                                <tr key={item._id}>
                                                    <td>{index + 1}</td>
                                                    <td className="text-capitalize">{item.boardName}</td>
                                                    <td className="text-center d-flex justify-content-center">
                                                        <button
                                                            className="btn btn-warning btn-sm me-2"
                                                            onClick={() => {
                                                                setPopup(true);
                                                                setSelectedBoard(item);
                                                            }}
                                                        >
                                                           <i class="fa fa-pencil-square-o" aria-hidden="true"></i>

                                                        </button>
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleBoardDelete(item._id)}
                                                        >
                                                            <i class="fa fa-trash-o" aria-hidden="true"></i>

                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3">No data available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Edit Board */}
            {popup && selectedBoard && (
                <div className="modal fade show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Board</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setPopup(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <Formik
                                    initialValues={{
                                        boardName: selectedBoard.boardName || "",
                                    }}
                                    onSubmit={(values, actions) => {
                                        handleBoardUpdate(values, actions);
                                        setPopup(false);
                                    }}
                                >
                                    {() => (
                                        <Form>
                                            <div className="mb-3">
                                                <label className="form-label">Board Name</label>
                                                <Field
                                                    type="text"
                                                    name="boardName"
                                                    className="form-control"
                                                    placeholder="Enter board name"
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary w-100">
                                                Update
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Board;
