import { ChangeEvent, FC, useEffect, useState } from "react";
import { KTIcon, KTSVG } from "../../../../../_metronic/helpers";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

interface AddCustomersModalProps {
  reloadTable: () => void;
}

function AddCustomersModal({ reloadTable }: AddCustomersModalProps) {
  // State for customer data
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    photo: "",
    customerType: "",
  });

  // Validation schema for formik
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(
        /^\+?[0-9]*$/,
        "Invalid phone number format. Only digits and optional leading '+' are allowed."
      ),
    address: Yup.string().required("Address is required"),
    email: Yup.string().email("Invalid email format"), // Make email optional
    customerType: Yup.string().required("Customer Type is required"),
  });

  // Formik configuration
  const formik = useFormik({
    initialValues: customer,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Check if customer name already exists
        const response = await axios.get(
          `http://localhost:3000/api/customers?name=${values.name}`
        );

        if (response.data.length > 0) {
          // Customer name already exists, show error message
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Customer name already exists",
            confirmButtonText: "OK, Got it!",
          });
          return;
        }

        // Image upload logic
        if (values.photo) {
          const formData = new FormData();
          formData.append("photo", values.photo);
          const response = await axios.post(
            "http://localhost:3000/api/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          // Assuming your server responds with the image path
          const imagePath = response.data.path;

          // Save the image path in the values object
          values.photo = imagePath;
        }
        // Add customer
        await axios.post("http://localhost:3000/api/customers", values);

        // Show success message and reload page

        const closeButton = document.querySelector(
          '.modal .btn[data-bs-dismiss="modal"]'
        );
        (closeButton as HTMLButtonElement).click();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Customer added successfully",
          confirmButtonText: "OK, Got it!",
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed && closeButton) {
            reloadTable();
            formik.resetForm();
          }
        });
      } catch (error) {
        // Show error message and log error
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong",
          confirmButtonText: "OK, Got it!",
          confirmButtonColor: "#3085d6",
        });
        console.error("Error adding customer", error);
      }
    },
  });

  // State for preview image
  const [previewImage, setPreviewImage] = useState("");

  // Handle image change event
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result?.toString() || "");
      };
      reader.readAsDataURL(file);
      formik.setFieldValue("photo", file); // Set the image file in formik values
    } else {
      setPreviewImage("");
    }
  };

  return (
    <>
      {/* Button to trigger the modal */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#AddCustomer"
      >
        <KTIcon iconName="plus" className="fs-2" />
        Add Customer
      </button>

      {/* Modal */}
      <div className="modal fade" tabIndex={-1} id="AddCustomer">
        <div className="modal-dialog modal-dialog-centered mw-550px">
          <div className="modal-content">
            <div className="modal-header py-7 d-flex justify-content-between">
              <h5 className="modal-title">Add Customer</h5>
              {/* Close button */}
              <div
                className="btn btn-icon btn-sm btn-active-light-primary ms-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <KTSVG
                  path="media/icons/duotune/arrows/arr061.svg"
                  className="svg-icon svg-icon-2x"
                />
              </div>
            </div>
            <div className="modal-body">
              {/* Form */}
              <form className="form" onSubmit={formik.handleSubmit}>
                {/* Photo field */}
                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">
                    Photo
                  </label>
                  <div className="col-lg-8 fv-row">
                    <div
                      className="image-input image-input-outline fv-row mt-2 "
                      style={{ overflow: "hidden" }}
                    ></div>
                    <label
                      className="btn btn-icon btn-circle btn-active-color-primary w-100px h-100px bg-body  "
                      style={{ overflow: "hidden" }}
                    >
                      <img
                        src={previewImage || "media/svg/avatars/blank.svg"}
                        alt="Preview"
                        className="img-fluid max-width-100 max-height-100 rounded"
                      />
                      <input
                        type="file"
                        style={{ display: "none" }}
                        accept="image/*"
                        name="photo"
                        onChange={(e) => handleImageChange(e)}
                      />
                    </label>
                  </div>
                </div>

                {/* Form fields */}
                {[
                  {
                    label: "Customer Name",
                    name: "name",
                    type: "text",
                    required: true,
                  },
                  { label: "Email", name: "email", type: "email" },
                  {
                    label: "Phone",
                    name: "phone",
                    type: "tel",
                    required: true,
                  },
                  {
                    label: "Address",
                    name: "address",
                    type: "text",
                    required: true,
                  },
                  {
                    label: "Notes",
                    name: "notes",
                    type: "text",
                  },
                  {
                    label: "Customer Type",
                    name: "customerType",
                    type: "select",
                  },
                ].map((field) => (
                  <div className="row mb-6" key={field.name}>
                    <label
                      className={`col-lg-4 col-form-label fw-bold fs-6 ${
                        field.required && field.name !== "email"
                          ? "required"
                          : ""
                      }`}
                    >
                      {field.label}
                    </label>
                    <div className="col-lg-8 fv-row">
                      {field.type === "select" ? (
                        <select
                          className={`form-control form-control-lg form-control-solid ${
                            formik.touched[
                              field.name as keyof typeof formik.touched
                            ] &&
                            formik.errors[
                              field.name as keyof typeof formik.errors
                            ]
                              ? "is-invalid"
                              : ""
                          }`}
                          name={field.name}
                          value={
                            formik.values[
                              field.name as keyof typeof formik.values
                            ]
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="" disabled>
                            Select {field.label}
                          </option>
                          <option value="Reseller">Reseller</option>
                          <option value="Walk-in">Walk-in</option>
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          className={`form-control form-control-lg form-control-solid ${
                            formik.touched[
                              field.name as keyof typeof formik.touched
                            ] &&
                            formik.errors[
                              field.name as keyof typeof formik.errors
                            ]
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder={field.label}
                          name={field.name}
                          value={
                            formik.values[
                              field.name as keyof typeof formik.values
                            ]
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      )}

                      {/* Display error message if field is touched and has error */}
                      {formik.touched[
                        field.name as keyof typeof formik.touched
                      ] &&
                        formik.errors[
                          field.name as keyof typeof formik.errors
                        ] && (
                          <div className="fv-plugins-message-container invalid-feedback">
                            {
                              formik.errors[
                                field.name as keyof typeof formik.errors
                              ]
                            }
                          </div>
                        )}
                    </div>
                  </div>
                ))}

                {/* Modal footer */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => formik.resetForm()}
                  >
                    Reset
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { AddCustomersModal };
