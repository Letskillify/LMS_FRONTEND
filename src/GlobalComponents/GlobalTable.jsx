import React from "react";
import "./css/GlobalTable.css";
import Loader from "./GlobalLoader";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const GlobalTable = ({
  headers,
  data,
  actions,
  loading,
  noDataMessage,
  tooltipProps,
}) => {
  const renderTooltip = (message) => (
    <Tooltip {...tooltipProps}>
      {message}
    </Tooltip>
  );
  return (
    <div className="table-container">
      {loading ? (
        <div className="w-100 d-flex justify-content-center align-items-center">
          <Loader size={30} />
        </div>
      ) : data?.length > 0 ? (
        <table className="table datatable">
          <thead className="thead-light">
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
              {actions && actions.length > 0 && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <td key={colIndex}>{row[header] || "-"}</td>
                ))}
                {actions && (
                  <td className="action-buttons">
                    {actions.map((action, actionIndex) => (
                      <OverlayTrigger
                        key={actionIndex}
                        placement="top"
                        overlay={action.label ? renderTooltip(action.label) : <></>}
                      >
                        <button
                          key={actionIndex}
                          className={`btn ${action.className}`}
                          onClick={() => action.onClick(row)}
                        >
                          {action.icon && <i className={action.icon}></i>}
                        </button>
                      </OverlayTrigger>
                    ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-data-container">
          <i className="fa fa-folder-open no-data-icon"></i>
          <p>{noDataMessage ? noDataMessage : "No data found"}</p>
        </div>
      )}
    </div>
  );
};

export default GlobalTable;
