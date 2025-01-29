import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Field, Formik, Form } from "formik";
import { MainContext } from "../../Controller/MainProvider";
import { Bounce, toast } from "react-toastify";

function Board() {
    const [Board, setBoard] = useState([]);
    const { userId } = useContext(MainContext);
    const [popup, setPopup] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState(null);

    const handleBoard = async (values, { resetForm }) => {
        try {
            const res = await axios.post("/api/board/post", values, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.status === 201) {
                toast.success("Board added successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    transition: Bounce,
                });
                fatchboards();
                resetForm();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error creating board", {
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

    const fatchboards = async () => {
        try {
            const res = await axios.get("/api/board/get");
            if (res.status === 200) {
                setBoard(res.data);
            }
        } catch (error) {
            console.error("Error fetching boards:", error);
        }
    };

    const handleBoardUpdate = async (values, { resetForm }) => {
        try {
            const res = await axios.put(`/api/board/update/${selectedBoard._id}`, values, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.status === 200) {
                toast.success("Board updated successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    transition: Bounce,
                });
                fatchboards();
                resetForm();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating board", {
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

    const handleBoardDelete = async (id) => {
        try {
            const res = await axios.delete(`/api/board/delete/${id}`);
            if (res.status === 200) {
                toast.success("Board deleted successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    transition: Bounce,
                });
                fatchboards();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting board", {
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

    useEffect(() => {
        fatchboards();
    }, []);

    return (
        <>
            <div className="container py-5">
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
                                        {Board && Board.length > 0 ? (
                                            Board.map((item, index) => (
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
