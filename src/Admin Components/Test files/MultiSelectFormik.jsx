import React from "react";
import { Formik, Form, Field } from "formik";
import Select from "react-select";
import * as Yup from "yup";

const MultiSelectFormik = () => {
    const options = [
        { value: "brian_miller", label: "Brian Miller" },
        { value: "jessica_white", label: "Jessica White" },
        { value: "john_doe", label: "John Doe" },
        { value: "emma_smith", label: "Emma Smith" },
    ];

    const validationSchema = Yup.object().shape({
        participants: Yup.array()
            .min(1, "Please select at least one participant")
            .required("This field is required"),
    });

    const handleSubmit = (values) => {
        console.log("Form values:", values);
    };

    return (
        <Formik
            initialValues={{ participants: [] }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue, errors, touched }) => (
                <Form>
                    <div style={{ marginBottom: "20px" }}>
                        <label htmlFor="participants" style={{ fontWeight: "bold" }}>
                            Select Participants:
                        </label>
                        <Field name="participants">
                            {({ field }) => (
                                <Select
                                    isMulti
                                    options={options}
                                    className=""
                                    name="participants"
                                    value={values.participants}
                                    onChange={(selected) => setFieldValue("participants", selected)}
                                    placeholder="Select multiple participants"
                                    styles={{
                                        multiValue: (base) => ({
                                            ...base,
                                            backgroundColor: "#e0f7fa",
                                            borderRadius: "5px",
                                            padding: "2px",
                                        }),
                                        multiValueLabel: (base) => ({
                                            ...base,
                                            color: "#00796b",
                                        }),
                                        multiValueRemove: (base) => ({
                                            ...base,
                                            color: "#00796b",
                                            cursor: "pointer",
                                            ":hover": {
                                                color: "#004d40",
                                            },
                                        }),
                                    }}
                                />
                            )}
                        </Field>
                        {errors.participants && touched.participants && (
                            <div style={{ color: "red", marginTop: "5px" }}>
                                {errors.participants}
                            </div>
                        )}
                    </div>
                    <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#00796b", color: "white", border: "none", borderRadius: "5px" }}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default MultiSelectFormik;
