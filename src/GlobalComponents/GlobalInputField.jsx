import { ErrorMessage, Field } from "formik";
import React from "react";

const InputFieldComponet = ({
  lableName,
  type,
  name,
  options,
  disabled,
  onChange,
  placeHolder,
}) => {
  return (
    <>
      {
        <>
          <div className="mb-3">
            <label htmlFor={name} className="form-label">
              {lableName}
            </label>
            {type === "text" ? (
              <Field
                onChange={onChange ? onChange : null}
                type={type}
                id={name}
                name={name}
                placeholder={placeHolder}
                className="form-control"
              />
            ) : type === "file" ? (
              <>
                <Field
                  onChange={onChange}
                  type={type}
                  id={name}
                  placeholder={placeHolder}
                  name={name}
                  className="form-control"
                />
              </>
            )  : type === "date" ? (
              <>
                <Field
                  onChange={onChange}
                  type={type}
                  id={name}
                  placeholder={placeHolder}
                  name={name}
                  className="form-control"
                />
              </>
            ): (
              <Field as="select" id={name} name={name} className="form-control">
                <option value="" selected disabled>
                  Select {lableName}
                </option>
                {options?.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={disabled}
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
