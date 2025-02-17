import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFileUploader } from "../../Custom Hooks/CustomeHook";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import {
  useCreateBookMutation,
  useGetBooksByInstituteIdQuery,
  useSoftDeleteBookMutation,
  useUpdateBookMutation,
} from "../../Redux/Api/bookSlice";
import useGlobalToast from "../../GlobalComponents/GlobalToast";
import { Spinner } from "react-bootstrap";
import Loader from "../../GlobalComponents/GlobalLoader";
import GlobalTable from "../../GlobalComponents/GlobalTable";

function BooksList() {
  const showToast = useGlobalToast();
  const [querry, setquerry] = useState();
  const [SearchData, setSearchData] = useState([]);
  const [BookLists, setBookLists] = useState([]);
  const { userId, InstituteId } = getCommonCredentials();
  const { uploadedData, handleImageUpload } = useFileUploader();

  const validations = Yup.object({
    bookName: Yup.string().required("Book Name is required"),
    bookNumber: Yup.number().required("Book Number is required"),
    rackNo: Yup.number().required("Rack Number is required"),
    publisher: Yup.string().required("Publisher is required"),
    author: Yup.string().required("Author is required"),
    subject: Yup.string().required("Subject is required"),
    quantity: Yup.number().required("Quantity is required"),
    availability: Yup.string().required("Availability is required"),
    price: Yup.number().required("Price is required"),
    postDate: Yup.date().required("Post Date is required"),
  });

  const {
    data: bookData,
    isLoading,
    isFetching,
  } = useGetBooksByInstituteIdQuery(InstituteId, {
    skip: !InstituteId,
  });

  const [addBook] = useCreateBookMutation();
  const [updateBookById] = useUpdateBookMutation();
  const [addBookToTrash] = useSoftDeleteBookMutation();

  useEffect(() => {
    setBookLists(bookData?.items);
  }, [bookData]);

  const sortFunctions = {
    asc: (a, b) => a.bookName.localeCompare(b.bookName),
    desc: (a, b) => b.bookName.localeCompare(a.bookName),
    recentlyViewed: () => [...BookLists].reverse(),
    recentlyAdded: (a, b) => new Date(b.postDate) - new Date(a.postDate),
  };
  const handleSort = (type) => {
    const sortedBooks =
      type === "recentlyViewed"
        ? sortFunctions[type]()
        : [...BookLists].sort(sortFunctions[type]);
    setBookLists(sortedBooks);
  };

  function SearchFilter(v) {
    setquerry(v);
    const filterData = BookLists.filter(
      (data) =>
        (data?.bookName
          ? data?.bookName.toLowerCase().includes(v.toLowerCase())
          : false) ||
        (data?.publisher
          ? data?.publisher.toLowerCase().includes(v.toLowerCase())
          : false) ||
        (data?.bookNo
          ? data?.bookNo.toString().includes(v.toLowerCase())
          : false) ||
        (data?.subject
          ? data?.subject.toLowerCase().includes(v.toLowerCase())
          : false)
    );
    console.log(filterData);
    setSearchData(filterData);
  }

  const [initialvalue, setinitialvalue] = useState({
    instituteId: InstituteId,
    bookName: "",
    bookNumber: "",
    publisher: "",
    author: "",
    subject: "",
    rackNo: "",
    quantity: "",
    availability: "",
    price: "",
    postDate: "",
    action: "",
    edition: "",
    publicationYear: "",
    genre: "",
    language: "",
    description: "",
    coverImageURL: uploadedData?.coverImageURL,
    issuedCount: "",
    lastIssuedDate: "",
    updatedAt: "",
  });

  const [popup, setpopup] = useState(false);

  const handlepost = async (v, { resetForm }) => {
    const data = { ...v, coverImageURL: uploadedData?.coverImageURL };
    try {
      const response = await addBook(data);
      if (response.data.status === 201) {
        showToast("Book Added Successfully", "success");
        resetForm();
        // fetchData();
        setpopup(false);
      } else {
        showToast("Error adding book", "error");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      showToast(`Error adding book ${error}`, "error");
    }
  };

  const handledelete = async (id) => {
    try {
      const res = await addBookToTrash(id);
      if (res.data.status === 200) {
        showToast("Book Deleted Successfully", "success");
      }
    } catch (error) {
      console.error("Error deleting the book:", error);
      showToast(`Error deleting the book ${error}`, "error");
    }
  };
  // Handle Form Submit for Update
  const handleUpdate = async (values, id) => {
    const data = { ...values, coverImageURL: uploadedData?.coverImageURL };
    try {
      const response = await updateBookById({ bookId: id, bookData: data });
      if (response.data.status === 200) {
        showToast("Book Updated Successfully", "success");
        setpopup(false);
      }
    } catch (error) {
      console.error("Error updating book:", error);
      showToast(`Error updating book ${error}`, "error");
    }
  };

  const headers = [
    "ID",
    "Book Name",
    "Book No",
    "Publisher",
    "Author",
    "Subject",
    "Rack No",
    "Qty",
    "Available",
    "Price",
    "Post Date",
  ];

  const tableData = BookLists?.map((item) => ({
    _id: item._id,
    ID: item.secondaryId,
    "Book Name": item.bookName,
    "Book No": item.bookNumber,
    Publisher: item.publisher,
    Author: item.author,
    Subject: item.subject,
    "Rack No": item.rackNo,
    Qty: item.quantity,
    Available: item.status,
    Price: item.price,
    "Post Date": item.postDate,
  }));

  const actions = [
    {
      label: "Edit",
      className: "btn-primary",
      icon: "fa fa-edit",
      onClick: (row) => handlerecoverid(row._id),
    },
    {
      label: "Move To Trash",
      className: "btn-danger ms-2",
      icon: "fa fa-trash",
      onClick: (row) => handledelete(row._id),
    },
  ];

  return (
    <>
      {/* <!-- Main Wrapper --> */}
      <div className="main-wrapper container mt-5">
        {/* <!-- Page Wrapper --> */}
        <div className="page-wrapper">
          <div className="content">
            {/* <!-- Page Header --> */}
            <div className="d-md-flex d-block align-items-center justify-content-between mb-3 ms-3">
              <div className="my-auto mb-2">
                <h3 className="page-title mb-1">Books</h3>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <a href="index.html">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="javascript:void(0);">Management</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Books
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
                <div className="mb-2">
                  <Link
                    to="#"
                    className="btn btn-primary d-flex align-items-center"
                    onClick={() => setpopup(true)}
                  >
                    <i className="menu-icon tf-icons bx bx-book-reader text-white "></i>
                    Add Book
                  </Link>
                </div>
                <div className="mb-2">
                  <Link
                    to="/booklisttrash"
                    className="btn btn-danger ms-2 d-flex align-items-center"
                  >
                    <i className="menu-icon tf-icons bx bx-trash text-white "></i>
                    Trash
                  </Link>
                </div>
              </div>
            </div>
            {/* <!-- /Page Header --> */}

            {/* <!-- Students List --> */}
            <div className="card">
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
                <h4 className="mb-3">Books</h4>
                <div className="d-flex align-items-center flex-wrap">
                  <div className="input-icon-start mb-3 me-2 position-relative">
                    <span className="icon-addon">
                      <i className="ti ti-search"></i>
                    </span>
                    <input
                      type="text"
                      value={querry}
                      onChange={(e) => SearchFilter(e.target.value)}
                      className="form-control date-range bookingrange"
                      placeholder="Search Your Book"
                    />
                  </div>
                  <div className="dropdown mb-3">
                    <a
                      href="javascript:void(0);"
                      className="btn bg-white dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      <i className="ti ti-sort-ascending-2 me-2"></i>Sort by A-Z
                    </a>
                    <ul className="dropdown-menu p-3">
                      <li>
                        <a
                          href="javascript:void(0);"
                          className="dropdown-item rounded-1"
                          onClick={() => handleSort("asc")}
                        >
                          Ascending
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0);"
                          className="dropdown-item rounded-1"
                          onClick={() => handleSort("desc")}
                        >
                          Descending
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0);"
                          className="dropdown-item rounded-1"
                          onClick={() => handleSort("recentlyViewed")}
                        >
                          Recently Viewed
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0);"
                          className="dropdown-item rounded-1"
                          onClick={() => handleSort("recentlyAdded")}
                        >
                          Recently Added
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body p-0 py-3">
                <GlobalTable
                  headers={headers}
                  loading={isLoading}
                  actions={actions}
                  data={tableData}
                />
                {/* <!-- /Student List --> */}
              </div>
            </div>
            {/* <!-- /Students List --> */}
          </div>
        </div>
        {/* <!-- /Page Wrapper --> */}

        {/* <!-- Add Book --> */}

        <div
          className={`modal fade ${popup ? "show d-block" : "d-none"}`}
          id="add_library_book"
          style={{ background: "#0000007d" }}
        >
          <div className="m-5 p-5 d-flex justify-content-center align-items-center modal-dialog-centered">
            <div className="modal-content w-75 p-3">
              <div className="modal-header">
                <h4 className="modal-title">Add Book</h4>
                <button
                  type="button"
                  className="btn-close custom-btn-close"
                  onClick={() => setpopup(false)}
                >
                  <i className="ti ti-box"></i>
                </button>
              </div>
              <Formik
                initialValues={initialvalue}
                onSubmit={handlepost}
                validationSchema={validations}
              >
                {({ errors, resetForm }) => (
                  <Form>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Book Name</label>
                            <Field
                              type="text"
                              name="bookName"
                              className="form-control"
                              placeholder="Enter Book Name"
                            />
                            <div className="text-danger">
                              {errors?.bookName}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Cover Image URL
                            </label>
                            <Field
                              type="file"
                              className="form-control"
                              name="coverImageURL"
                              onChange={(e) =>
                                handleImageUpload(e, "coverImageURL")
                              }
                              placeholder="Enter Cover Image URL"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Book No</label>
                            <Field
                              type="number"
                              name="bookNumber"
                              className="form-control"
                              placeholder="Enter Book No"
                            />
                            <div className="text-danger">
                              {errors?.bookNumber}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Rack No</label>
                            <Field
                              type="number"
                              name="rackNo"
                              className="form-control"
                              placeholder="Enter Rack No"
                            />
                            <div className="text-danger">{errors?.rackNo}</div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Publisher</label>
                            <Field
                              type="text"
                              name="publisher"
                              className="form-control"
                              placeholder="Enter Publisher"
                            />
                            <div className="text-danger">
                              {errors?.publisher}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Author</label>
                            <Field
                              type="text"
                              name="author"
                              className="form-control"
                              placeholder="Enter Author"
                            />
                            <div className="text-danger">{errors?.author}</div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Subject</label>
                            <Field
                              type="text"
                              name="subject"
                              className="form-control"
                              placeholder="Enter Subject"
                            />
                            <div className="text-danger">{errors?.subject}</div>
                          </div>
                        </div>
                        {/* <div className="mb-3">
                                                            <label className="form-label">Book ID</label>
                                                            <Field type="number" name="bookID" className="form-control" placeholder="Enter Book ID" />
                                                            <div className='text-danger'>
                                                                {
                                                                    errors?.bookID
                                                                }
                                                            </div>
                                                        </div> */}
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Qty</label>
                            <Field
                              type="number"
                              name="quantity"
                              className="form-control"
                              placeholder="Enter Qty"
                            />
                            <div className="text-danger">
                              {errors?.quantity}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Available</label>
                            <Field
                              as="select"
                              name="availability"
                              className="form-control"
                              placeholder="Select Availability"
                            >
                              <option value="">Select</option>
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </Field>
                            <div className="text-danger">
                              {errors?.availability}
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Price</label>
                            <Field
                              type="number"
                              name="price"
                              className="form-control"
                              placeholder="Enter Price"
                            />
                            <div className="text-danger">{errors?.price}</div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-0">
                            <label className="form-label">Post Date</label>
                            <Field
                              type="date"
                              name="postDate"
                              className="form-control"
                              placeholder="Enter Post Date"
                            />
                            <div className="text-danger">
                              {errors?.postDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between m-2">
                      <div></div>
                      <div>
                        <button
                          type="reset"
                          onClick={() => {
                            resetForm, setpopup(false);
                          }}
                          className="btn btn-transparent border-primary me-3"
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary me-3">
                          Submit
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
        {/* <!-- Add Book --> */}
      </div>
      {/* <!-- /Main Wrapper --> */}
    </>
  );
}

export default BooksList;
