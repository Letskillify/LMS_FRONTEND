import { ErrorMessage, Field } from "formik";
import React from "react";

const InputFieldComponet = ({ lableName, type, name, options, disabled, placeholder }) => {
  return (
    <>
      <div className="col-12 col-md-6 mb-3">
        <label htmlFor={name} className="form-label">
          {lableName}
        </label>
        {["text", "date", "time", "number"].includes(type) ? (
          <Field
            type={type}
            id={name}
            name={name}
            className="form-control"
            placeholder={placeholder}
          />
        ) : type === "textarea" ? (
          <Field
            as="textarea"
            id={name}
            name={name}
            className="form-control"
            placeholder={placeholder}
            rows="4"
          />
        ) : (
          <Field as="select" id={name} name={name} className="form-control">
            <option value="">{placeholder || `Select ${lableName}`}</option>
            {options?.map((option) => (
              <option
                disabled={disabled ? disabled : false}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </Field>
        )}
        <ErrorMessage
          name={name}
          component="div"
          className="invalid-feedback d-block"
        />
      </div>
    </>
  );
};

export default InputFieldComponet;
