// parivesh sir.........................

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import useGlobalToast from "../../GlobalComponents/GlobalToast";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";

const StockInventory = () => {
  const { InstituteId } = getCommonCredentials();
  console.log("InstituteIdsssss", InstituteId);  
  const showToast = useGlobalToast();
  const [Account, setAccount] = useState("Create");
  const [forms, setforms] = useState([]);
  const [SelectedInventory, setSelectedInventory] = useState([]);
  const [ShowView, setShowView] = useState(false);
  const [companies, setCompanies] = useState([]);
  const initialValues = {
    instituteId: InstituteId,
    itemDetails: {
      name: "",
      category: "",
      subCategory: "",
      description: "",
      mfgDate: "",
      expDate: "",
      companyName: "",
    },
    gstInfo: {
      gstApplicable: "",
      taxability: "",
      HSNcode: "",
      productDescription: "",
      typeOfTax: "",
      setTax: "",
      typeOfSupply: "",
    },
    accounting: {
      unit: "",
      amountPerUnit: "",
      quantity: "",
      gstPercent: "",
      discountPercent: "",
    },
    stockInfo: {
      currentStock: "",
      lowStockThreshold: "",
      purchaseHistory: [{ date: "", quantityPurchased: "", supplier: "" }],
    },
  };
  const validationSchema = Yup.object({
    itemDetails: Yup.object({
      name: Yup.string().required("Item name is required"),
      category: Yup.string().required("Category is required"),
      subCategory: Yup.string().required("subCategory is required"),
      description: Yup.string().max(
        500,
        "Description cannot exceed 500 characters"
      ),
      mfgDate: Yup.date()
        .nullable()
        .typeError("Invalid manufacturing date format")
        .max(new Date(), "Manufacturing date cannot be in the future"),
      expDate: Yup.date().required("Invalid expiration date format"),
      companyName: Yup.string().required("Company name is required"),
    }),
    gstInfo: Yup.object({
      gstApplicable: Yup.boolean().required("GST applicable is required"),
      taxability: Yup.string()
        .oneOf(["Exempt", "Nil Rated", "Taxable"], "Invalid taxability type")
        .required("Taxability is required"),
      HSNcode: Yup.string().required("HSN Code is required"),
      productDescription: Yup.string().required(
        "product Description is required"
      ),
      typeOfTax: Yup.string()
        .oneOf(["CGST/SGST", "Integrated Tax"], "Invalid tax type")
        .required("Type of tax is required"),
      setTax: Yup.number()
        .min(0, "Tax must be a positive value")
        .required("Tax is required"),
      typeOfSupply: Yup.string()
        .oneOf(["Goods", "Services"], "Invalid type of supply")
        .required("Type of supply is required"),
    }),
    accounting: Yup.object({
      unit: Yup.string().required("Unit type is required"),
      amountPerUnit: Yup.number()
        .required("Amount per unit is required")
        .min(0, "Amount must be a positive value"),
      quantity: Yup.number()
        .required("Quantity is required")
        .min(0, "Quantity cannot be negative"),
      gstPercent: Yup.number()
        .min(0, "GST percentage cannot be negative")
        .required("gst Percent is required"),
      discountPercent: Yup.number()
        .min(0, "Discount percentage cannot be negative")
        .required("discount Percent is required"),
    }),
    stockInfo: Yup.object({
      currentStock: Yup.number()
        .required("Current stock is required")
        .min(0, "Stock cannot be negative"),
      lowStockThreshold: Yup.number()
        .min(0, "Threshold must be a positive number")
        .required("low Stock Threshold is required"),
      purchaseHistory: Yup.array()
        .of(
          Yup.object({
            date: Yup.date()
              .required("Date is required")
              .typeError("Invalid date format"),
            quantityPurchased: Yup.number()
              .required("Quantity purchased is required")
              .min(0, "Quantity cannot be negative"),
            supplier: Yup.string().required("Supplier is required"),
          })
        )
        .required("Purchase history is required"),
    }),
  });
  const fetchData = async () => {
    await axios
      .get("api/inventory/get")
      .then((res) => {
        setforms(res.data);
      })
      .catch((error) => {
        console.error("Error fetching:", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const HandleInventory = async (formData) => {
    try {
      const response = await axios.post("/api/inventory/post", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        Method: "POST",
      });
      if (response.status === 201) {
        showToast("Inventory added successfully",'success')
      }
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      if (err.response) {
        showToast(err.response.data.message || "Error adding inventory",'error')
      }
    }
    console.log(formData, "whgsdqfvwhd");
  };
  useEffect(() => {
    axios
      .get("api/firm-account/get")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
        console.error("Error fetching supplier:", error);
      });
  }, []);
  console.log("inventory", companies);
  const handleEdit = async (v, id, index) => {
    try {
      const res = await axios.put(`api/inventory/update/${id}`, v);
      if (res.status === 200) {
        const modalElement = document.getElementById(
          `edit_library_book_${index}`
        );
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        }
        toast.success("Inventory updated successfully", {
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
    } catch (err) {
      toast.error(
        err.response ? err.response.data.message : "Error updating inventory",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        }
      );
      console.log(err);
    }
  };
  const handleDelete = (id) => {
    try {
      axios.delete(`api/inventory/delete/${id}`).then((res) => {
        if (res.status === 200) {
          toast.success("Inventory date Delete successfully", {
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
      });
    } catch (err) {
      toast.error(
        err.response
          ? err.response.data.message
          : "Error Data Deleting inventory",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        }
      );
    }
  };
  return (
    <>
      <div className="container mb-5">
        <h2 className="text-center mt-4">Inventory Account</h2>
        <div className="stockAccount text-center mt-3">
          <button
            className="btn btn-info m-2 "
            value="Create"
            onClick={(e) => setAccount(e.target.value)}
          >
            Create
          </button>
          <button
            className="btn btn-warning m-2"
            value="Edit"
            onClick={(e) => setAccount(e.target.value)}
          >
            Edit / Delete
          </button>
          <button
            className="btn btn-secondary m-2"
            value="Display"
            onClick={(e) => setAccount(e.target.value)}
          >
            Display
          </button>
        </div>

        {Account === "Create" && (
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={HandleInventory}
          >
            {({ values, errors, setFieldValue }) => (
              <Form className="card p-4 shadow-lg  rounded">
                <div className="card-header d-flex justify-content-between align-items-center ">
                  <h2 className="text-dark">Inventory Management</h2>
                </div>
                <div className="card-body text-capitalize">
                  <div className="row">
                    {/* Item Details */}
                    <div className="accordion border" id="itemDetailsAccordion">
                      <div className="accordion-item">
                        <h2
                          className="accordion-header"
                          id="itemDetailsHeading"
                        >
                          <button
                            className="accordion-button collapsed fs-4"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#itemDetailsCollapse"
                            aria-expanded="false"
                            aria-controls="itemDetailsCollapse"
                          >
                            Item Details
                          </button>
                        </h2>
                        <div
                          id="itemDetailsCollapse"
                          className="accordion-collapse collapse show"
                          aria-labelledby="itemDetailsHeading"
                          data-bs-parent="#itemDetailsAccordion"
                        >
                          <div className="accordion-body border mb-4 rounded">
                            <div className="row g-3 mt-3">
                              <div className="col-12 col-md-6">
                                <label>Inventory Name:</label>
                                <Field
                                  className="form-control"
                                  name="itemDetails.name"
                                  type="text"
                                  placeholder="Enter Your Inventory Name"
                                />
                                <div className="text-danger">
                                  {errors?.itemDetails?.name}
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <label>Category:</label>
                                <Field
                                  as="select"
                                  className="form-control"
                                  name="itemDetails.category"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "itemDetails.category",
                                      e.target.value
                                    );
                                    setFieldValue(
                                      "itemDetails.subCategory",
                                      ""
                                    );
                                  }}
                                >
                                  <option value="">
                                    -- Select Category --
                                  </option>
                                  <option value="academic">
                                    Academic Supplies
                                  </option>
                                  <option value="uniforms">
                                    Uniforms and Accessories
                                  </option>
                                  <option value="sports">
                                    Sports Equipment
                                  </option>
                                  <option value="infrastructure">
                                    Infrastructure and Furniture
                                  </option>
                                  <option value="events">School Events</option>
                                </Field>
                                <div className="text-danger">
                                  {errors?.itemDetails?.category}
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <label>Sub-Category:</label>
                                <Field
                                  as="select"
                                  className="form-control"
                                  name="itemDetails.subCategory"
                                >
                                  <option value="">
                                    -- Select Sub-Category --
                                  </option>
                                  {values.itemDetails.category ===
                                    "academic" && (
                                    <>
                                      <option value="books">Books</option>
                                      <option value="notebooks">
                                        Notebooks
                                      </option>
                                      <option value="stationery">
                                        Stationery
                                      </option>
                                      <option value="artSupplies">
                                        Art Supplies
                                      </option>
                                      <option value="charts">
                                        Educational Charts
                                      </option>
                                    </>
                                  )}
                                  {values.itemDetails.category ===
                                    "uniforms" && (
                                    <>
                                      <option value="schoolUniform">
                                        School Uniform
                                      </option>
                                      <option value="shoes">
                                        Shoes and Socks{" "}
                                      </option>
                                      <option value="schoolBag">
                                        School Bag
                                      </option>
                                      <option value="idCards">ID Cards</option>
                                    </>
                                  )}
                                </Field>
                                <div className="text-danger">
                                  {errors?.itemDetails?.subCategory}
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <label>Company Name:</label>
                                <Field
                                  as="select"
                                  className="form-control"
                                  name="itemDetails.companyName"
                                >
                                  <option value="">-- Select Company --</option>
                                  {companies?.items?.map((company) => (
                                    <option
                                      key={company?.id}
                                      value={company?._id}
                                    >
                                      {company?.name}
                                    </option>
                                  ))}
                                </Field>
                                <div className="text-danger">
                                  {errors?.itemDetails?.companyName?.name}
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <label>Manufacturing Date:</label>
                                <Field
                                  className="form-control"
                                  name="itemDetails.mfgDate"
                                  type="date"
                                  placeholder="Enter Your Manufacturing Date"
                                />
                                <div className="text-danger">
                                  {errors?.itemDetails?.mfgDate}
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <label>Expiry Date:</label>
                                <Field
                                  className="form-control"
                                  name="itemDetails.expDate"
                                  type="date"
                                  placeholder="Enter Your Expiry Date"
                                />
                                <div className="text-danger">
                                  {errors?.itemDetails?.expDate}
                                </div>
                              </div>
                              <div className="col-12">
                                <label>Description:</label>
                                <textarea
                                  className="form-control h-auto"
                                  name="itemDetails.description"
                                  type="text"
                                  placeholder="Enter Your Description"
                                />
                                <div className="text-danger">
                                  {errors?.itemDetails?.description}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* GST Information */}
                    <div
                      className="accordion border mt-2"
                      id="gstInfoAccordion"
                    >
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="gstInfoHeading">
                          <button
                            className="accordion-button collapsed fs-4"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#gstInfoCollapse"
                            aria-expanded="true"
                            aria-controls="gstInfoCollapse"
                          >
                            GST Info
                          </button>
                        </h2>
                        <div
                          id="gstInfoCollapse"
                          className="accordion-collapse collapse"
                          aria-labelledby="gstInfoHeading"
                          data-bs-parent="#gstInfoAccordion"
                        >
                          <div className="accordion-body border mb-3 rounded">
                            <div className="row g-3 mt-3">
                              <div className="col-12 col-md-6">
                                <label className="form-label">
                                  GST Applicable
                                </label>
                                <Field
                                  as="select"
                                  className="form-control"
                                  name="gstInfo.gstApplicable"
                                >
                                  <option value="select">
                                    Select GST Applicable
                                  </option>
                                  <option value={true}>Yes</option>
                                  <option value={false}>No</option>
                                </Field>
                                <div className="text-danger">
                                  {errors?.gstInfo?.gstApplicable}
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <label className="form-label">Taxability</label>
                                <Field
                                  as="select"
                                  className="form-control"
                                  name="gstInfo.taxability"
                                >
                                  <option value="">Select Taxability</option>
                                  <option value="Exempt">Exempt</option>
                                  <option value="Nil Rated">Nil Rated</option>
                                  <option value="Taxable">Taxable</option>
                                </Field>
                                <div className="text-danger">
                                  {errors?.gstInfo?.taxability}
                                </div>
                              </div>
                            </div>
                            <div className="row g-3 mt-2">
                              <div className="col-12 col-md-6">
                                <label className="form-label">HSN Code</label>
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="gstInfo.HSNcode"
                                  placeholder="Enter HSN Code"
                                />
                                <div className="text-danger">
                                  {errors?.gstInfo?.HSNcode}
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <label className="form-label">
                                  Product Description
                                </label>
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="gstInfo.productDescription"
                                  placeholder="Enter product description"
                                />
                                <div className="text-danger">
                                  {errors?.gstInfo?.productDescription}
                                </div>
                              </div>
                            </div>
                            <div className="row g-3 mt-2">
                              <div className="col-12 col-md-6">
                                <label className="form-label">
                                  Type of Tax
                                </label>
                                <Field
                                  as="select"
                                  className="form-control"
                                  name="gstInfo.typeOfTax"
                                >
                                  <option value="">Select Type of Tax</option>
                                  <option value="CGST/SGST">CGST/SGST</option>
                                  <option value="Integrated Tax">
                                    Integrated Tax
                                  </option>
                                </Field>
                                <div className="text-danger">
                                  {errors?.gstInfo?.typeOfTax}
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <label className="form-label">Set Tax</label>
                                <Field
                                  type="number"
                                  className="form-control"
                                  name="gstInfo.setTax"
                                  placeholder="Enter set tax"
                                />
                                <div className="text-danger">
                                  {errors?.gstInfo?.setTax}
                                </div>
                              </div>
                            </div>
                            <div className="row g-3 mt-2">
                              <div className="col-12 col-md-6">
                                <label className="form-label">
                                  Type of Supply
                                </label>
                                <Field
                                  as="select"
                                  className="form-control"
                                  name="gstInfo.typeOfSupply"
                                >
                                  <option value="">
                                    Select Type of Supply
                                  </option>
                                  <option value="Goods">Goods</option>
                                  <option value="Services">Services</option>
                                </Field>
                                <div className="text-danger">
                                  {errors?.gstInfo?.typeOfSupply}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Accounting details */}
                    {/* Accounting Info Accordion Item */}
                    <div className="accordion-item border mt-2">
                      <h2 className="accordion-header" id="headingAccounting">
                        <button
                          className="accordion-button collapsed fs-4"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseAccounting"
                          aria-expanded="true"
                          aria-controls="collapseAccounting"
                        >
                          Accounting Info
                        </button>
                      </h2>
                      <div
                        id="collapseAccounting"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingAccounting"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body border mb-4 rounded">
                          <div className="row g-3">
                            <div className="col-12 col-md-6">
                              <label className="form-label">Unit</label>
                              <Field
                                as="select"
                                className="form-control"
                                name="accounting.unit"
                              >
                                <option value="">-- Select Unit --</option>
                                {/* Weight/Mass */}
                                <optgroup label="Weight/Mass">
                                  <option value="kg">Kilogram (kg)</option>
                                  <option value="g">Gram (g)</option>
                                  <option value="mg">Milligram (mg)</option>
                                  <option value="lb">Pound (lb)</option>
                                  <option value="oz">Ounce (oz)</option>
                                  <option value="t">Tonne (t)</option>
                                </optgroup>
                                {/* Length */}
                                <optgroup label="Length">
                                  <option value="m">Meter (m)</option>
                                  <option value="cm">Centimeter (cm)</option>
                                  <option value="mm">Millimeter (mm)</option>
                                  <option value="km">Kilometer (km)</option>
                                  <option value="in">Inch (in)</option>
                                  <option value="ft">Foot (ft)</option>
                                  <option value="yd">Yard (yd)</option>
                                </optgroup>
                                {/* Volume */}
                                <optgroup label="Volume">
                                  <option value="L">Liter (L)</option>
                                  <option value="mL">Milliliter (mL)</option>
                                  <option value="m³">Cubic Meter (m³)</option>
                                  <option value="gallon">Gallon</option>
                                  <option value="pint">Pint</option>
                                  <option value="barrel">Barrel</option>
                                </optgroup>
                                {/* Quantity/Count */}
                                <optgroup label="Quantity/Count">
                                  <option value="pcs">Piece (pcs)</option>
                                  <option value="pack">Pack</option>
                                  <option value="bundle">Bundle</option>
                                  <option value="dozen">Dozen</option>
                                  <option value="gross">Gross</option>
                                  <option value="carton">Carton</option>
                                </optgroup>
                                {/* Area */}
                                <optgroup label="Area">
                                  <option value="m²">Square Meter (m²)</option>
                                  <option value="ft²">Square Foot (ft²)</option>
                                  <option value="acre">Acre</option>
                                  <option value="ha">Hectare (ha)</option>
                                </optgroup>
                                {/* Time */}
                                <optgroup label="Time">
                                  <option value="s">Second (s)</option>
                                  <option value="min">Minute (min)</option>
                                  <option value="h">Hour (h)</option>
                                  <option value="day">Day</option>
                                  <option value="week">Week</option>
                                  <option value="month">Month</option>
                                </optgroup>
                                {/* Special/Custom */}
                                <optgroup label="Special/Custom">
                                  <option value="bolt">Bolt</option>
                                  <option value="bushel">Bushel</option>
                                  <option value="crate">Crate</option>
                                  <option value="box">Box</option>
                                  <option value="barrel">Barrel</option>
                                </optgroup>
                              </Field>
                              <div className="text-danger">
                                {errors?.accounting?.unit}
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <label className="form-label">
                                Amount Per Unit
                              </label>
                              <Field
                                type="number"
                                className="form-control"
                                name="accounting.amountPerUnit"
                                placeholder="Enter amount per unit"
                              />
                              <div className="text-danger">
                                {errors?.accounting?.amountPerUnit}
                              </div>
                            </div>
                          </div>
                          <div className="row g-3 mt-2">
                            <div className="col-12 col-md-6">
                              <label className="form-label">Quantity</label>
                              <Field
                                type="number"
                                className="form-control"
                                name="accounting.quantity"
                                placeholder="Enter quantity"
                              />
                              <div className="text-danger">
                                {errors?.accounting?.quantity}
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <label className="form-label">
                                GST Percentage
                              </label>
                              <Field
                                type="number"
                                className="form-control"
                                name="accounting.gstPercent"
                                placeholder="Enter GST percentage"
                              />
                              <div className="text-danger">
                                {errors?.accounting?.gstPercent}
                              </div>
                            </div>
                          </div>
                          <div className="row g-3 mt-2">
                            <div className="col-12 col-md-6">
                              <label className="form-label">
                                Discount Percentage
                              </label>
                              <Field
                                type="number"
                                className="form-control"
                                name="accounting.discountPercent"
                                placeholder="Enter discount percentage"
                              />
                              <div className="text-danger">
                                {errors?.accounting?.discountPercent}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stock Info Accordion Item */}
                    <div className="accordion-item border mt-2">
                      <h2 className="accordion-header" id="headingStock">
                        <button
                          className="accordion-button collapsed fs-4"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseStock"
                          aria-expanded="false"
                          aria-controls="collapseStock"
                        >
                          Stock Info
                        </button>
                      </h2>
                      <div
                        id="collapseStock"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingStock"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body border mb-4 rounded">
                          <div className="row g-3 mt-3">
                            <div className="col-12 col-md-6">
                              <label className="form-label">
                                Current Stock
                              </label>
                              <Field
                                type="number"
                                className="form-control"
                                name="stockInfo.currentStock"
                                placeholder="Enter current stock"
                              />
                              <div className="text-danger">
                                {errors?.stockInfo?.currentStock}
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <label className="form-label">
                                Low Stock Threshold
                              </label>
                              <Field
                                type="number"
                                className="form-control"
                                name="stockInfo.lowStockThreshold"
                                placeholder="Enter low stock threshold"
                              />
                              <div className="text-danger">
                                {errors?.stockInfo?.lowStockThreshold}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stock Info */}
                    {/* Purchase History Accordion Item */}
                    <div className="accordion-item border mt-2 mb-4">
                      <h2
                        className="accordion-header"
                        id="headingPurchaseHistory"
                      >
                        <button
                          className="accordion-button collapsed fs-4"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapsePurchaseHistory"
                          aria-expanded="true"
                          aria-controls="collapsePurchaseHistory"
                        >
                          Purchase History
                        </button>
                      </h2>
                      <div
                        id="collapsePurchaseHistory"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingPurchaseHistory"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body border">
                          <FieldArray
                            name="stockInfo.purchaseHistory"
                            render={(arrayHelpers) => (
                              <>
                                {values.stockInfo.purchaseHistory.map(
                                  (_, index) => (
                                    <div className="row g-3 mb-3" key={index}>
                                      <div className="col-12 col-md-4">
                                        <label className="form-label">
                                          Date:
                                        </label>
                                        <Field
                                          className="form-control"
                                          name={`stockInfo.purchaseHistory[${index}].date`}
                                          type="date"
                                        />
                                        <ErrorMessage
                                          name={`stockInfo.purchaseHistory[${index}].date`}
                                          component="div"
                                          className="text-danger"
                                        />
                                      </div>
                                      <div className="col-12 col-md-4">
                                        <label className="form-label">
                                          Quantity Purchased:
                                        </label>
                                        <Field
                                          className="form-control"
                                          placeholder="Enter Quantity"
                                          name={`stockInfo.purchaseHistory[${index}].quantityPurchased`}
                                          type="number"
                                        />
                                        <ErrorMessage
                                          name={`stockInfo.purchaseHistory[${index}].quantityPurchased`}
                                          component="div"
                                          className="text-danger"
                                        />
                                      </div>

                                      <div className="col-12 col-md-4">
                                        <label>Supplier Name:</label>
                                        <Field
                                          as="select"
                                          className="form-control"
                                          name={`stockInfo.purchaseHistory[${index}].supplier`}
                                        >
                                          <option value="">
                                            -- Select Supplier --
                                          </option>
                                          {companies?.items?.map((company) => (
                                            <option
                                              key={company?.id}
                                              value={company?._id}
                                            >
                                              {company?.name}
                                            </option>
                                          ))}
                                        </Field>
                                        <ErrorMessage
                                          name={`stockInfo.purchaseHistory[${index}].supplier`}
                                          component="div"
                                          className="text-danger"
                                        />
                                      </div>
                                    </div>
                                  )
                                )}
                                <div className="row g-2 mb-3">
                                  <div className="col-12">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={() =>
                                        arrayHelpers.push({
                                          date: "",
                                          quantityPurchased: "",
                                          supplier: "",
                                        })
                                      }
                                    >
                                      <i class="fa fa-plus" aria-hidden="true">
                                        Add
                                      </i>
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-danger ms-3"
                                      onClick={() =>
                                        arrayHelpers.remove(
                                          values.stockInfo.purchaseHistory
                                            .length - 1
                                        )
                                      }
                                    >
                                      <i
                                        class="fa fa-minus-circle"
                                        aria-hidden="true"
                                      >
                                        Remove
                                      </i>
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button Outside Accordion */}
                    <div className="row">
                      <div className="col-12 ms-2">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
        {Account === "Edit" && (
          <div className="  mt-3 ">
            <div className="card ">
              <div className="card-header text-center">
                <h3 className="mb-0">Inventory Information</h3>
              </div>
              <div className="table-responsive  ">
                <table className="table mb-5">
                  <thead>
                    <tr>
                      <th>inventory Name</th>
                      <th>Category</th>
                      <th>Sub-Category</th>
                      <th>Unit</th>
                      <th>Quantity</th>
                      <th>Current Stock</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {forms?.map((Inventory, index) => (
                      <tr key={index}>
                        <td>{Inventory?.itemDetails?.name}</td>
                        <td>{Inventory?.itemDetails?.category}</td>
                        <td>{Inventory?.itemDetails?.subCategory}</td>
                        <td>{Inventory?.accounting?.unit}</td>
                        <td>{Inventory?.accounting?.quantity}</td>
                        <td>{Inventory?.stockInfo?.currentStock}</td>

                        <td className=" d-flex align-items-center gap-2">
                          <button
                            className="btn btn-primary "
                            onClick={() => {
                              setShowView(true);
                              setSelectedInventory(Inventory);
                            }}
                          >
                            <i class="fa fa-eye" aria-hidden="true"></i>
                          </button>
                          <button
                            className="btn btn-secondary"
                            data-bs-toggle="modal"
                            data-bs-target={`#edit_library_book_${index}`}
                          >
                            <i
                              class="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>
                          </button>
                          <button
                            className="btn btn-danger"
                            data-bs-toggle="modal"
                            onClick={() => handleDelete(Inventory._id)}
                          >
                            <i class="fa fa-trash-o" aria-hidden="true"></i>
                          </button>
                        </td>
                        <div
                          className="modal fade"
                          id={`edit_library_book_${index}`}
                        >
                          <div
                            className="modal-dialog modal-dialog-centered bg-transparent"
                            style={{ maxWidth: "70%" }}
                          >
                            <div className="modal-content">
                              <div className="modal-header">
                                <h4 className="modal-title">Edit Book</h4>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                ></button>
                              </div>
                              <Formik
                                initialValues={Inventory}
                                // validationSchema={validationSchema}
                                onSubmit={(Values) =>
                                  handleEdit(Values, Inventory._id, index)
                                }
                              >
                                {({ values }) => (
                                  <Form className="card p-4 ">
                                    {/* Item Details */}
                                    <div
                                      className="accordion border"
                                      id="itemDetailsAccordion"
                                    >
                                      <div className="accordion-item">
                                        <h2
                                          className="accordion-header"
                                          id="itemDetailsHeading"
                                        >
                                          <button
                                            className="accordion-button collapsed fs-4"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#itemDetailsCollapse"
                                            aria-expanded="false"
                                            aria-controls="itemDetailsCollapse"
                                          >
                                            Item Details
                                          </button>
                                        </h2>
                                        <div
                                          id="itemDetailsCollapse"
                                          className="accordion-collapse collapse show"
                                          aria-labelledby="itemDetailsHeading"
                                          data-bs-parent="#itemDetailsAccordion"
                                        >
                                          <div className="accordion-body border m-4 rounded ">
                                            <div className="row mt-3">
                                              <div className="col-6 mb-3">
                                                <label>inventory Name:</label>
                                                <Field
                                                  className="form-control"
                                                  name="itemDetails.name"
                                                  type="text"
                                                  placeholder="Enter Your Inventory Name"
                                                />
                                              </div>
                                              {/* Category Dropdown */}
                                              <div className="col-6 mb-3">
                                                <label>Category:</label>
                                                <Field
                                                  className="form-control"
                                                  name="itemDetails.category"
                                                />
                                              </div>
                                              <div className="col-6 mb-3">
                                                <label>Sub-Category:</label>
                                                <Field
                                                  className="form-control"
                                                  name="itemDetails.subCategory"
                                                ></Field>
                                              </div>
                                              <div className="col-6 mb-3">
                                                <label>Company Name:</label>
                                                <Field
                                                  className="form-control"
                                                  name="itemDetails.companyName.name"
                                                ></Field>
                                              </div>

                                              <div className="col-6 mb-3">
                                                <label>
                                                  Manufacturing Date:
                                                </label>
                                                <Field
                                                  className="form-control"
                                                  name="itemDetails.mfgDate"
                                                  placeholder="Enter Your Manufacturing Date"
                                                />
                                              </div>
                                              <div className="col-6 mb-3">
                                                <label>Expiry Date:</label>
                                                <Field
                                                  className="form-control"
                                                  name="itemDetails.expDate"
                                                  placeholder="Enter Your Expiry Date"
                                                />
                                              </div>
                                              <div className=" mb-3">
                                                <label>Description:</label>
                                                <textarea
                                                  className="form-control h-auto"
                                                  name="itemDetails.description"
                                                  type="text"
                                                  placeholder="Enter Your Description"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* Gst Informstion  */}
                                    <div
                                      className="accordion border mt-2"
                                      id="gstInfoAccordion"
                                    >
                                      <div className="accordion-item ">
                                        <h2
                                          className="accordion-header"
                                          id="gstInfoHeading"
                                        >
                                          <button
                                            className="accordion-button collapsed fs-4"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#gstInfoCollapse"
                                            aria-expanded="true"
                                            aria-controls="gstInfoCollapse"
                                          >
                                            GST Info
                                          </button>
                                        </h2>
                                        <div
                                          id="gstInfoCollapse"
                                          className="accordion-collapse collapse "
                                          aria-labelledby="gstInfoHeading"
                                          data-bs-parent="#gstInfoAccordion"
                                        >
                                          <div className="accordion-body border m-4 rounded">
                                            <div className="row mt-3">
                                              <div className="col-6">
                                                <label className="form-label">
                                                  GST Applicable
                                                </label>
                                                <Field
                                                  className="form-control"
                                                  name="gstInfo.gstApplicable"
                                                />
                                              </div>
                                              <div className="col-6">
                                                <label className="form-label">
                                                  Taxability
                                                </label>
                                                <Field
                                                  className="form-control"
                                                  name="gstInfo.taxability"
                                                ></Field>
                                              </div>
                                            </div>
                                            <div className="row ">
                                              <div className="col-6 mt-2">
                                                <label className="form-label">
                                                  HSN Code
                                                </label>
                                                <Field
                                                  type="text"
                                                  className="form-control"
                                                  name="gstInfo.HSNcode"
                                                  placeholder="Enter HSN Code"
                                                />
                                              </div>
                                              <div className="col-6 mt-2">
                                                <label className="form-label">
                                                  Product Description
                                                </label>
                                                <Field
                                                  type="text"
                                                  className="form-control"
                                                  name="gstInfo.productDescription"
                                                  placeholder="Enter product description"
                                                />
                                              </div>
                                            </div>
                                            <div className="row mt-2">
                                              <div className="col-6">
                                                <label className="form-label">
                                                  Type of Tax
                                                </label>
                                                <Field
                                                  className="form-control"
                                                  name="gstInfo.typeOfTax"
                                                />
                                              </div>
                                              <div className="col-6">
                                                <label className="form-label">
                                                  Set Tax
                                                </label>
                                                <Field
                                                  className="form-control"
                                                  name="gstInfo.setTax"
                                                />
                                              </div>
                                            </div>
                                            <div className="row mt-2">
                                              <div className="col-6">
                                                <label className="form-label">
                                                  Type of Supply
                                                </label>
                                                <Field
                                                  className="form-control"
                                                  name="gstInfo.typeOfSupply"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* Accounting details */}
                                    <div
                                      className="accordion"
                                      id="accordionExample"
                                    >
                                      {/* Accounting Info Accordion Item */}
                                      <div className="accordion-item border mt-2">
                                        <h2
                                          className="accordion-header"
                                          id="headingAccounting"
                                        >
                                          <button
                                            className="accordion-button collapsed fs-4"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseAccounting"
                                            aria-expanded="true"
                                            aria-controls="collapseAccounting"
                                          >
                                            Accounting Info
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseAccounting"
                                          className="accordion-collapse collapse "
                                          aria-labelledby="headingAccounting"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body border m-4 rounded">
                                            <div className="row mb-3 mt-3">
                                              <div className="col-6">
                                                <label className="form-label">
                                                  Unit
                                                </label>
                                                <Field
                                                  className="form-control"
                                                  name="accounting.unit"
                                                />
                                              </div>

                                              <div className="col-6">
                                                <label className="form-label">
                                                  Amount Per Unit
                                                </label>
                                                <Field
                                                  type="number"
                                                  className="form-control"
                                                  name="accounting.amountPerUnit"
                                                  placeholder="Enter amount per unit"
                                                />
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label className="form-label">
                                                  Quantity
                                                </label>
                                                <Field
                                                  type="number"
                                                  className="form-control"
                                                  name="accounting.quantity"
                                                  placeholder="Enter quantity"
                                                />
                                              </div>
                                              <div className="col-6">
                                                <label className="form-label">
                                                  GST Percentage
                                                </label>
                                                <Field
                                                  type="number"
                                                  className="form-control"
                                                  name="accounting.gstPercent"
                                                  placeholder="Enter GST percentage"
                                                />
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label className="form-label">
                                                  Discount Percentage
                                                </label>
                                                <Field
                                                  type="number"
                                                  className="form-control"
                                                  name="accounting.discountPercent"
                                                  placeholder="Enter discount percentage"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Stock Info Accordion Item */}
                                      <div className="accordion-item border mt-2">
                                        <h2
                                          className="accordion-header"
                                          id="headingStock"
                                        >
                                          <button
                                            className="accordion-button collapsed fs-4"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseStock"
                                            aria-expanded="false"
                                            aria-controls="collapseStock"
                                          >
                                            Stock Info
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseStock"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingStock"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="row mb-3 mt-3">
                                              <div className="col-6">
                                                <label className="form-label">
                                                  Current Stock
                                                </label>
                                                <Field
                                                  className="form-control"
                                                  name="stockInfo.currentStock"
                                                  placeholder="Enter current stock"
                                                />
                                              </div>
                                              <div className="col-6">
                                                <label className="form-label">
                                                  Low Stock Threshold
                                                </label>
                                                <Field
                                                  className="form-control"
                                                  name="stockInfo.lowStockThreshold"
                                                  placeholder="Enter low stock threshold"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className="accordion "
                                      id="accordionExample"
                                    >
                                      {/* Purchase History Accordion Item */}
                                      <div className="accordion-item border mt-2 mb-4">
                                        <h2
                                          className="accordion-header"
                                          id="headingPurchaseHistory"
                                        >
                                          <button
                                            className="accordion-button collapsed fs-4"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapsePurchaseHistory"
                                            aria-expanded="true"
                                            aria-controls="collapsePurchaseHistory"
                                          >
                                            Purchase History
                                          </button>
                                        </h2>
                                        {values.stockInfo.purchaseHistory.map(
                                          (_, idx) => (
                                            <div
                                              id="collapsePurchaseHistory"
                                              className="accordion-collapse collapse "
                                              aria-labelledby="headingPurchaseHistory"
                                              data-bs-parent="#accordionExample"
                                            >
                                              <div className="accordion-body ">
                                                <div className="row mb-3">
                                                  <div className="col-4">
                                                    <label>Date:</label>
                                                    <Field
                                                      className="form-control"
                                                      name={`stockInfo.purchaseHistory.${idx}.date`}
                                                    />
                                                  </div>
                                                  <div className="col-4">
                                                    <label>
                                                      Quantity Purchased:
                                                    </label>
                                                    <Field
                                                      className="form-control"
                                                      name={`stockInfo.purchaseHistory.${idx}.quantityPurchased`}
                                                      // type="number"
                                                    />
                                                  </div>
                                                  <div className="col-4">
                                                    <label>Supplier:</label>
                                                    <Field
                                                      className="form-control"
                                                      // name={`stockInfo.purchaseHistory.${idx}.supplier`}
                                                      name="itemDetails.companyName.name"
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>

                                      {/* Submit Button Outside Accordion */}
                                    </div>
                                    <div className="modal-footer d-flex justify-content-center">
                                      <button
                                        type="submit"
                                        className="btn btn-info mx-2"
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </Form>
                                )}
                              </Formik>
                            </div>
                          </div>
                        </div>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {ShowView && SelectedInventory && (
                  <div
                    className="modal fade show"
                    tabIndex="-1"
                    style={{
                      display: "block",
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      zIndex: 1050,
                    }}
                    id="viewInventoryModal"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog modal-dialog-centered modal-lg"
                      style={{ maxWidth: "70%" }}
                    >
                      <div className="modal-content border-0 rounded-4 shadow-lg">
                        <div className="modal-header bg-dark text-white">
                          <h3 className="modal-title fw-bold text-uppercase text-white">
                            View Stock Details
                          </h3>
                          <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={() => setShowView(false)}
                          ></button>
                        </div>

                        <Formik>
                          {({ errors, resetForm, values }) => (
                            <Form className="modal-body px-4 py-3">
                              {/* Item Details */}
                              <div
                                className="accordion border"
                                id="itemDetailsAccordion"
                              >
                                <div className="accordion-item">
                                  <h2
                                    className="accordion-header"
                                    id="itemDetailsHeading"
                                  >
                                    <button
                                      className="accordion-button collapsed fs-4"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#itemDetailsCollapse"
                                      aria-expanded="false"
                                      aria-controls="itemDetailsCollapse"
                                    >
                                      Item Details
                                    </button>
                                  </h2>
                                  <div
                                    id="itemDetailsCollapse"
                                    className="accordion-collapse collapse show"
                                    aria-labelledby="itemDetailsHeading"
                                    data-bs-parent="#itemDetailsAccordion"
                                  >
                                    <div className="accordion-body border m-4 rounded ">
                                      <div className="row mt-3">
                                        <div className="col-6 mb-3">
                                          <label>inventory Name :</label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.itemDetails
                                                ?.name
                                            }
                                          </div>
                                        </div>
                                        {/* Category Dropdown */}
                                        <div className="col-6 mb-3">
                                          <label>Category:</label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.itemDetails
                                                ?.category
                                            }
                                          </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <label>Sub-Category:</label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.itemDetails
                                                ?.subCategory
                                            }
                                          </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <label>Company Name:</label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.itemDetails
                                                ?.companyName?.name
                                            }
                                          </div>
                                        </div>

                                        <div className="col-6 mb-3">
                                          <label>Manufacturing Date:</label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {SelectedInventory?.itemDetails
                                              ?.mfgDate
                                              ? new Date(
                                                  SelectedInventory?.itemDetails?.mfgDate
                                                ).toLocaleDateString()
                                              : ""}
                                          </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <label>Expiry Date:</label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {SelectedInventory?.itemDetails
                                              ?.expDate
                                              ? new Date(
                                                  SelectedInventory?.itemDetails?.expDate
                                                ).toLocaleDateString()
                                              : ""}
                                          </div>
                                        </div>
                                        <div className=" mb-3">
                                          <label>Description:</label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.itemDetails
                                                ?.description
                                            }
                                          </div>
                                          {/* <textarea className="form-control h-auto" name="itemDetails.description" type="text" placeholder="Enter Your Description" /> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Gst Informstion  */}
                              <div
                                className="accordion border mt-2"
                                id="gstInfoAccordion"
                              >
                                <div className="accordion-item ">
                                  <h2
                                    className="accordion-header"
                                    id="gstInfoHeading"
                                  >
                                    <button
                                      className="accordion-button collapsed fs-4"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#gstInfoCollapse"
                                      aria-expanded="true"
                                      aria-controls="gstInfoCollapse"
                                    >
                                      GST Info
                                    </button>
                                  </h2>
                                  <div
                                    id="gstInfoCollapse"
                                    className="accordion-collapse collapse "
                                    aria-labelledby="gstInfoHeading"
                                    data-bs-parent="#gstInfoAccordion"
                                  >
                                    <div className="accordion-body border m-4 rounded">
                                      <div className="row mt-3">
                                        <div className="col-6">
                                          <label className="form-label">
                                            GST Applicable :{" "}
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.gstInfo
                                                ?.gstApplicable
                                            }
                                          </div>
                                        </div>
                                        <div className="col-6">
                                          <label className="form-label">
                                            Taxability:{" "}
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.gstInfo
                                                ?.taxability
                                            }
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row ">
                                        <div className="col-6 mt-2">
                                          <label className="form-label">
                                            HSN Code :{" "}
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.gstInfo
                                                ?.HSNcode
                                            }
                                          </div>
                                        </div>
                                        <div className="col-6 mt-2">
                                          <label className="form-label">
                                            Product Description :{" "}
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.gstInfo
                                                ?.productDescription
                                            }
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row mt-2">
                                        <div className="col-6">
                                          <label className="form-label">
                                            Type of Tax :{" "}
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.gstInfo
                                                ?.typeOfTax
                                            }
                                          </div>
                                        </div>
                                        <div className="col-6">
                                          <label className="form-label">
                                            Set Tax :{" "}
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {SelectedInventory?.gstInfo?.setTax}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row mt-2">
                                        <div className="col-6">
                                          <label className="form-label">
                                            Type of Supply :{" "}
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.gstInfo
                                                ?.typeOfSupply
                                            }
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Accounting details */}
                              <div className="accordion" id="accordionExample">
                                {/* Accounting Info Accordion Item */}
                                <div className="accordion-item border mt-2">
                                  <h2
                                    className="accordion-header"
                                    id="headingAccounting"
                                  >
                                    <button
                                      className="accordion-button collapsed fs-4"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseAccounting"
                                      aria-expanded="true"
                                      aria-controls="collapseAccounting"
                                    >
                                      Accounting Info
                                    </button>
                                  </h2>
                                  <div
                                    id="collapseAccounting"
                                    className="accordion-collapse collapse "
                                    aria-labelledby="headingAccounting"
                                    data-bs-parent="#accordionExample"
                                  >
                                    <div className="accordion-body border m-4 rounded">
                                      <div className="row mb-3 mt-3">
                                        <div className="col-6">
                                          <label className="form-label">
                                            Unit
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.accounting
                                                ?.unit
                                            }
                                          </div>
                                        </div>

                                        <div className="col-6">
                                          <label className="form-label">
                                            Amount Per Unit
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.accounting
                                                ?.amountPerUnit
                                            }
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row mb-3">
                                        <div className="col-6">
                                          <label className="form-label">
                                            Quantity
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.accounting
                                                ?.quantity
                                            }
                                          </div>
                                        </div>
                                        <div className="col-6">
                                          <label className="form-label">
                                            GST Percentage
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.accounting
                                                ?.gstPercent
                                            }
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row mb-3">
                                        <div className="col-6">
                                          <label className="form-label">
                                            Discount Percentage
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.accounting
                                                ?.discountAmount
                                            }
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Stock Info Accordion Item */}
                                <div className="accordion-item border mt-2">
                                  <h2
                                    className="accordion-header"
                                    id="headingStock"
                                  >
                                    <button
                                      className="accordion-button collapsed fs-4"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseStock"
                                      aria-expanded="false"
                                      aria-controls="collapseStock"
                                    >
                                      Stock Info
                                    </button>
                                  </h2>
                                  <div
                                    id="collapseStock"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="headingStock"
                                    data-bs-parent="#accordionExample"
                                  >
                                    <div className="accordion-body">
                                      <div className="row mb-3 mt-3">
                                        <div className="col-6">
                                          <label className="form-label">
                                            Current Stock
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.stockInfo
                                                ?.currentStock
                                            }
                                          </div>
                                        </div>
                                        <div className="col-6">
                                          <label className="form-label">
                                            Low Stock Threshold
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.stockInfo
                                                ?.lowStockThreshold
                                            }
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="accordion " id="accordionExample">
                                {/* Purchase History Accordion Item */}
                                <div className="accordion-item border mt-2 mb-4">
                                  <h2
                                    className="accordion-header"
                                    id="headingPurchaseHistory"
                                  >
                                    <button
                                      className="accordion-button collapsed fs-4"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapsePurchaseHistory"
                                      aria-expanded="true"
                                      aria-controls="collapsePurchaseHistory"
                                    >
                                      Purchase History
                                    </button>
                                  </h2>
                                  {SelectedInventory?.stockInfo?.purchaseHistory?.map(
                                    (_, idx) => (
                                      <div
                                        id="collapsePurchaseHistory"
                                        className="accordion-collapse collapse "
                                        aria-labelledby="headingPurchaseHistory"
                                        data-bs-parent="#accordionExample"
                                      >
                                        <div className="accordion-body ">
                                          <div className="row mb-3">
                                            <div className="col-4">
                                              <label>Date:</label>
                                              <div
                                                className="p-3 border rounded-3"
                                                style={{ background: "#fff" }}
                                              >
                                                {SelectedInventory?.stockInfo
                                                  ?.purchaseHistory[idx].date
                                                  ? new Date(
                                                      SelectedInventory?.stockInfo?.purchaseHistory[
                                                        idx
                                                      ].date
                                                    ).toLocaleDateString()
                                                  : ""}
                                              </div>
                                            </div>
                                            <div className="col-4">
                                              <label>Quantity Purchased:</label>
                                              <div
                                                className="p-3 border rounded-3"
                                                style={{ background: "#fff" }}
                                              >
                                                {
                                                  SelectedInventory?.stockInfo
                                                    ?.purchaseHistory[idx]
                                                    .quantityPurchased
                                                }
                                              </div>
                                            </div>
                                            <div className="col-4">
                                              <label>Supplier:</label>
                                              <div
                                                className="p-3 border rounded-3"
                                                style={{ background: "#fff" }}
                                              >
                                                {
                                                  SelectedInventory?.itemDetails
                                                    ?.companyName?.name
                                                }
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                              <button
                                className="btn btn-primary text-center"
                                onClick={() => setShowView(false)}
                              >
                                Close
                              </button>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {Account === "Display" && (
          <div className="  mt-3 ">
            <div className="card ">
              <div className="card-header text-center">
                <h3 className="mb-0">Inventory Information</h3>
              </div>
              <div className="table-responsive  ">
                <table className="table mb-5">
                  <thead>
                    <tr>
                      <th>inventory Name</th>
                      <th>Category</th>
                      <th>Sub-Category</th>
                      {/* <th>Company Name</th> */}
                      <th>Unit</th>
                      <th>Quantity</th>
                      <th>Current Stock</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {forms?.map((Inventory, index) => (
                      <tr key={index}>
                        <td>{Inventory?.itemDetails?.name}</td>
                        <td>{Inventory?.itemDetails?.category}</td>
                        <td>{Inventory?.itemDetails?.subCategory}</td>
                        <td>{Inventory?.accounting?.unit}</td>
                        <td>{Inventory?.accounting?.quantity}</td>
                        <td>{Inventory?.stockInfo?.currentStock}</td>

                        <td className=" d-flex align-items-center gap-2">
                          <button
                            className="btn btn-primary "
                            onClick={() => {
                              setShowView(true);
                              setSelectedInventory(Inventory);
                            }}
                          >
                            <i class="fa fa-eye" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {ShowView && SelectedInventory && (
                  <div
                    className="modal fade show"
                    tabIndex="-1"
                    style={{
                      display: "block",
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      zIndex: 1050,
                    }}
                    id="viewInventoryModal"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog modal-dialog-centered modal-lg"
                      style={{ maxWidth: "70%" }}
                    >
                      <div className="modal-content border-0 rounded-4 shadow-lg">
                        <div className="modal-header bg-dark text-white">
                          <h3 className="modal-title fw-bold text-uppercase text-white">
                            View Stock Details
                          </h3>
                          <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={() => setShowView(false)}
                          ></button>
                        </div>

                        <Formik>
                          {({ errors, resetForm, values }) => (
                            <Form className="modal-body px-4 py-3">
                              {/* Item Details */}
                              <div
                                className="accordion border"
                                id="itemDetailsAccordion"
                              >
                                <div className="accordion-item">
                                  <h2
                                    className="accordion-header"
                                    id="itemDetailsHeading"
                                  >
                                    <button
                                      className="accordion-button collapsed fs-4"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#itemDetailsCollapse"
                                      aria-expanded="false"
                                      aria-controls="itemDetailsCollapse"
                                    >
                                      Item Details
                                    </button>
                                  </h2>
                                  <div
                                    id="itemDetailsCollapse"
                                    className="accordion-collapse collapse show"
                                    aria-labelledby="itemDetailsHeading"
                                    data-bs-parent="#itemDetailsAccordion"
                                  >
                                    <div className="accordion-body border m-4 rounded ">
                                      <div className="row mt-3">
                                        <div className="col-6 mb-3">
                                          <label>inventory Name :</label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.itemDetails
                                                ?.name
                                            }
                                          </div>
                                        </div>
                                        {/* Category Dropdown */}
                                        <div className="col-6 mb-3">
                                          <label>Category:</label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.itemDetails
                                                ?.category
                                            }
                                          </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <label>Sub-Category:</label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.itemDetails
                                                ?.subCategory
                                            }
                                          </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <label>Company Name:</label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.itemDetails
                                                ?.companyName?.name
                                            }
                                          </div>
                                        </div>

                                        <div className="col-6 mb-3">
                                          <label>Manufacturing Date:</label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {SelectedInventory?.itemDetails
                                              ?.mfgDate
                                              ? new Date(
                                                  SelectedInventory?.itemDetails?.mfgDate
                                                ).toLocaleDateString()
                                              : ""}
                                          </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <label>Expiry Date:</label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {SelectedInventory?.itemDetails
                                              ?.expDate
                                              ? new Date(
                                                  SelectedInventory?.itemDetails?.expDate
                                                ).toLocaleDateString()
                                              : ""}
                                          </div>
                                        </div>
                                        <div className=" mb-3">
                                          <label>Description:</label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.itemDetails
                                                ?.description
                                            }
                                          </div>
                                          {/* <textarea className="form-control h-auto" name="itemDetails.description" type="text" placeholder="Enter Your Description" /> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Gst Informstion  */}
                              <div
                                className="accordion border mt-2"
                                id="gstInfoAccordion"
                              >
                                <div className="accordion-item ">
                                  <h2
                                    className="accordion-header"
                                    id="gstInfoHeading"
                                  >
                                    <button
                                      className="accordion-button collapsed fs-4"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#gstInfoCollapse"
                                      aria-expanded="true"
                                      aria-controls="gstInfoCollapse"
                                    >
                                      GST Info
                                    </button>
                                  </h2>
                                  <div
                                    id="gstInfoCollapse"
                                    className="accordion-collapse collapse "
                                    aria-labelledby="gstInfoHeading"
                                    data-bs-parent="#gstInfoAccordion"
                                  >
                                    <div className="accordion-body border m-4 rounded">
                                      <div className="row mt-3">
                                        <div className="col-6">
                                          <label className="form-label">
                                            GST Applicable :{" "}
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.gstInfo
                                                ?.gstApplicable
                                            }
                                          </div>
                                        </div>
                                        <div className="col-6">
                                          <label className="form-label">
                                            Taxability:{" "}
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.gstInfo
                                                ?.taxability
                                            }
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row ">
                                        <div className="col-6 mt-2">
                                          <label className="form-label">
                                            HSN Code :{" "}
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.gstInfo
                                                ?.HSNcode
                                            }
                                          </div>
                                        </div>
                                        <div className="col-6 mt-2">
                                          <label className="form-label">
                                            Product Description :{" "}
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.gstInfo
                                                ?.productDescription
                                            }
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row mt-2">
                                        <div className="col-6">
                                          <label className="form-label">
                                            Type of Tax :{" "}
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.gstInfo
                                                ?.typeOfTax
                                            }
                                          </div>
                                        </div>
                                        <div className="col-6">
                                          <label className="form-label">
                                            Set Tax :{" "}
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {SelectedInventory?.gstInfo?.setTax}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row mt-2">
                                        <div className="col-6">
                                          <label className="form-label">
                                            Type of Supply :{" "}
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.gstInfo
                                                ?.typeOfSupply
                                            }
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Accounting details */}
                              <div className="accordion" id="accordionExample">
                                {/* Accounting Info Accordion Item */}
                                <div className="accordion-item border mt-2">
                                  <h2
                                    className="accordion-header"
                                    id="headingAccounting"
                                  >
                                    <button
                                      className="accordion-button collapsed fs-4"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseAccounting"
                                      aria-expanded="true"
                                      aria-controls="collapseAccounting"
                                    >
                                      Accounting Info
                                    </button>
                                  </h2>
                                  <div
                                    id="collapseAccounting"
                                    className="accordion-collapse collapse "
                                    aria-labelledby="headingAccounting"
                                    data-bs-parent="#accordionExample"
                                  >
                                    <div className="accordion-body border m-4 rounded">
                                      <div className="row mb-3 mt-3">
                                        <div className="col-6">
                                          <label className="form-label">
                                            Unit
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.accounting
                                                ?.unit
                                            }
                                          </div>
                                        </div>

                                        <div className="col-6">
                                          <label className="form-label">
                                            Amount Per Unit
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.accounting
                                                ?.amountPerUnit
                                            }
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row mb-3">
                                        <div className="col-6">
                                          <label className="form-label">
                                            Quantity
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.accounting
                                                ?.quantity
                                            }
                                          </div>
                                        </div>
                                        <div className="col-6">
                                          <label className="form-label">
                                            GST Percentage
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.accounting
                                                ?.gstPercent
                                            }
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row mb-3">
                                        <div className="col-6">
                                          <label className="form-label">
                                            Discount Percentage
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.accounting
                                                ?.discountAmount
                                            }
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Stock Info Accordion Item */}
                                <div className="accordion-item border mt-2">
                                  <h2
                                    className="accordion-header"
                                    id="headingStock"
                                  >
                                    <button
                                      className="accordion-button collapsed fs-4"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseStock"
                                      aria-expanded="false"
                                      aria-controls="collapseStock"
                                    >
                                      Stock Info
                                    </button>
                                  </h2>
                                  <div
                                    id="collapseStock"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="headingStock"
                                    data-bs-parent="#accordionExample"
                                  >
                                    <div className="accordion-body">
                                      <div className="row mb-3 mt-3">
                                        <div className="col-6">
                                          <label className="form-label">
                                            Current Stock
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.stockInfo
                                                ?.currentStock
                                            }
                                          </div>
                                        </div>
                                        <div className="col-6">
                                          <label className="form-label">
                                            Low Stock Threshold
                                          </label>
                                          <div
                                            className="p-3 border rounded-3"
                                            style={{ background: "#fff" }}
                                          >
                                            {
                                              SelectedInventory?.stockInfo
                                                ?.lowStockThreshold
                                            }
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="accordion " id="accordionExample">
                                {/* Purchase History Accordion Item */}
                                <div className="accordion-item border mt-2 mb-4">
                                  <h2
                                    className="accordion-header"
                                    id="headingPurchaseHistory"
                                  >
                                    <button
                                      className="accordion-button collapsed fs-4"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapsePurchaseHistory"
                                      aria-expanded="true"
                                      aria-controls="collapsePurchaseHistory"
                                    >
                                      Purchase History
                                    </button>
                                  </h2>
                                  {SelectedInventory?.stockInfo?.purchaseHistory?.map(
                                    (_, idx) => (
                                      <div
                                        id="collapsePurchaseHistory"
                                        className="accordion-collapse collapse "
                                        aria-labelledby="headingPurchaseHistory"
                                        data-bs-parent="#accordionExample"
                                      >
                                        <div className="accordion-body ">
                                          <div className="row mb-3">
                                            <div className="col-6">
                                              <label>Date:</label>
                                              <div
                                                className="p-3 border rounded-3"
                                                style={{ background: "#fff" }}
                                              >
                                                {SelectedInventory?.stockInfo
                                                  ?.purchaseHistory[idx].date
                                                  ? new Date(
                                                      SelectedInventory?.stockInfo?.purchaseHistory[
                                                        idx
                                                      ].date
                                                    ).toLocaleDateString()
                                                  : ""}
                                              </div>
                                            </div>
                                            <div className="col-6">
                                              <label>Quantity Purchased:</label>
                                              <div
                                                className="p-3 border rounded-3"
                                                style={{ background: "#fff" }}
                                              >
                                                {
                                                  SelectedInventory?.stockInfo
                                                    ?.purchaseHistory[idx]
                                                    .quantityPurchased
                                                }
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StockInventory;
