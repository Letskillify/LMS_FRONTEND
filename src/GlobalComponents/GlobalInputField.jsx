import { ErrorMessage, Field } from "formik";
import React from "react";

  const InputFieldComponet = ({ lableName, type, name, options, disabled, placeholder, onChange }) => {
    return (
      <>
        {
          <>
            <div className="col-12 col-md-6 mb-3">
              <label htmlFor={name} className="form-label">
                {lableName}
              </label>
              {type === "text" ? (
                <Field
                  onChange={onChange}
                  type={type}
                  id={name}
                  placeholder={placeholder}
                  name={name}
                  placeholder={placeHolder}
                  className="form-control"
                  onChange={onChange}
                />
              </>
            ) : (
              <Field as={type} id={name} name={name} className="form-control">
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
      }
    </>
  );
};

export default InputFieldComponet;
