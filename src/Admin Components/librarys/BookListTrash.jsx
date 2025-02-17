import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetTrashBooksByInstituteIdQuery,
  useRestoreBookMutation,
} from "../../Redux/Api/bookSlice";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import GlobalTable from "../../GlobalComponents/GlobalTable";
import useGlobalToast from "../../GlobalComponents/GlobalToast";

function BookListTrash() {
  const showToast = useGlobalToast();
  const [Data, setData] = useState();
  const { InstituteId } = getCommonCredentials();
  const {
    data: trashBooksData,
    isFetching,
    isLoading,
  } = useGetTrashBooksByInstituteIdQuery(InstituteId, {
    skip: !InstituteId,
  });

  const [restoreBook] = useRestoreBookMutation();

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

  const tableData = Data?.map((item) => ({
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
      label: "Recover",
      className: "btn-primary",
      icon: "fa fa-refresh",
      onClick: (row) => handlerecoverid(row._id),
    },
    {
      label: "Delete Permanent",
      className: "btn-danger ms-2",
      icon: "fa fa-trash",
      onClick: (row) => handledelete1(row._id),
    },
  ];

  useEffect(() => {
    setData(trashBooksData?.trashedItems);
  }, [trashBooksData]);
  console.log("Data", Data);

  const handlerecoverall = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5500/api/book/revive-all",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );
      if (res?.status === 200) {
        alert("ABCD");
      }
    } catch (error) {
      console.error("Error in book recovery:", error);
    }
  };

  const handlposttransh = async () => {
    try {
      const res = await axios.delete(
        "http://localhost:5500/api/book/permanent-delete-all",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
        }
      );
      if (res.status === 200) {
        alert("your all data deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting the book:", error);
    }
  };

  const handledelete1 = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5500/api/book/permanent-delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
        }
      );
      if (res.status === 200) {
        alert("your data is deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting the book:", error);
    }
  };
  const handlerecoverid = async (id) => {
    try {
      const res = await restoreBook(id);
      if (res.data.status === 200) {
        showToast("Book Recovered Successfully", "success");
      }
    } catch (error) {
      console.error("Error deleting the book:", error);
    }
  };

  return (
    <>
      <div className="main-wrapper container mt-5">
        {/* <!-- Page Wrapper --> */}
        <div className="page-wrapper">
          <div className="content">
            {/* <!-- Page Header --> */}
            <div className="d-md-flex d-block align-items-center justify-content-between mb-3 ms-2">
              <div className="my-auto mb-2">
                <h3 className="page-title mb-1">Trash Books</h3>
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
              <div className="d-flex my-xl-auto gap-2 right-content align-items-center flex-wrap">
                <div className="mb-2">
                  <Link
                    className="btn btn-primary d-flex align-items-center"
                    onClick={handlerecoverall}
                  >
                    <i className="ti ti-refresh me-2"></i>Recover All
                  </Link>
                </div>
                <div className="mb-2">
                  <Link
                    className="btn btn-danger d-flex align-items-center"
                    onClick={handlposttransh}
                  >
                    <i className="ti ti-trash me-2"></i>Delete All
                  </Link>
                </div>
                <div className="mb-2">
                  <Link
                    className="btn btn-primary d-flex align-items-center"
                    to={"/booklist"}
                  >
                    <i className="ti ti-refresh me-2"></i>Go Back
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
                      className="form-control date-range bookingrange"
                      placeholder="Search Your Book"
                    />
                  </div>
                  <div className="dropdown mb-3">
                    <a
                      href="javascript:void(0);"
                      className="btn btn-outline-light bg-white dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      <i className="ti ti-sort-ascending-2 me-2"></i>Sort by A-Z
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body p-0 py-3">
                <GlobalTable
                  headers={headers}
                  loading={isLoading || isFetching}
                  actions={actions}
                  data={tableData}
                />
                {/* <!-- /Student List --> */}
              </div>
            </div>
            {/* <!-- /Students List --> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default BookListTrash;
