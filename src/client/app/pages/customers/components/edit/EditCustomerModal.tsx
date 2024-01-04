import React, { ChangeEvent, useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { toAbsoluteUrl } from "../../../../../_metronic/helpers";
import axios from "axios";

interface EditCustomerModalProps {
  onClose: () => void;
  CustomerID: number;
  reloadTable: () => void;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  photo: string;
  customerType: string;
  isactive: boolean;
  points: number;
  borrowedcontainers: number;
  [key: string]: string | boolean | number; // Index signature
}

const EditCustomerModal: React.FC<EditCustomerModalProps> = ({
  onClose,
  CustomerID,
  reloadTable,
}) => {
  const [customer, setCustomer] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    photo: "",
    customerType: "",
    isactive: false,
    points: 0,
    borrowedcontainers: 0,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

  const formik = useFormik<FormValues>({
    initialValues: customer,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Form values:", values);
      try {
        // Show confirmation dialog
        const confirmed = await Swal.fire({
          title: "Are you sure?",
          text: `Are you sure you want to update ${values.name}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, update it!",
        });

        if (!confirmed.isConfirmed) {
          return; // User canceled the deletion
        }
        console.log("CustomerPhoto:", customer.Photo);
        console.log("CustomerPhoto:", values.photo);
        // Image upload logic
        if (values.photo !== customer.Photo) {
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
        console.log("CustomerPhoto:", values.isactive);

        const response = await fetch(
          `http://localhost:3000/api/customers/${CustomerID}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        const data = await response.json();
        console.log("Data:", data);
        Swal.fire({
          title: "Success!",
          text: `${values.name} updated successfully!`,
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      } catch (error) {
        console.error("Error updating customer:", error);
        Swal.fire({
          title: "Error!",
          text: "An error occurred while updating the customer.",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      }
      // Add your logic to handle the form submission
      // You may want to call an API to update the customer data
      // Once the update is successful, close the modal
      onClose();
      reloadTable();
      setPreviewImage(null);
    },
  });

  useEffect(() => {
    // Fetch customer data based on CustomerID
    console.log("Effect triggered with CustomerID:", CustomerID);
    const fetchData = async () => {
      let data;
      try {
        // Replace the URL with your API endpoint
        const response = await fetch(
          `http://localhost:3000/api/customers/${CustomerID}`
        );

        data = await response.json();

        // Set form values
        formik.setValues({
          name: data.Name,
          email: data.Email,
          phone: data.Phone,
          address: data.Address,
          notes: data.Notes,
          photo: data.Photo,
          customerType: data.CustomerType,
          isactive: data.IsActive || false,
          points: data.Points,
          borrowedcontainers: data.BorrowedContainers,
        });
        // Update the local state with the fetched data
        setCustomer(data);

        // Set the preview image
        if (data.Photo !== null && data.Photo.trim() !== "") {
          setPreviewImage(toAbsoluteUrl(`media/${data.Photo}`));
        } else {
          setPreviewImage("media/svg/avatars/blank.svg");
        }

        console.log("Data:", data.IsActive);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [CustomerID]);

  // Handle image change event
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      formik.setFieldValue("photo", file); // Set the image file in formik values
    } else {
      setPreviewImage("media/svg/avatars/blank.svg");
      formik.setFieldValue("photo", null); // Set the image file in formik values
    }
  };

  return (
    <>
      <div className="modal fade show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered mw-550px">
          <div className="modal-content">
            <div className="modal-header py-7 d-flex justify-content-between">
              <h5 className="modal-title">Edit Customer</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <form className="form" onSubmit={formik.handleSubmit}>
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
                        src={previewImage || ""}
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
                    label: "Customer Type",
                    name: "customerType",
                    type: "select",
                  },
                  {
                    label: "Is Active",
                    name: "isactive",
                    type: "checkbox",
                    checked: formik.values.isactive,
                  },
                  {
                    label: "Points",
                    name: "points",
                    type: "number",
                  },
                  {
                    label: "Borrowed Containers",
                    name: "borrowedcontainers",
                    type: "number",
                  },
                  {
                    label: "Notes",
                    name: "notes",
                    type: "text",
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
                      {/* Use the right component based on the field type */}
                      {field.type === "select" ? (
                        <select
                          className={`form-select form-select-solid form-select-lg ${
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
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={String(
                            formik.values[
                              field.name as keyof typeof formik.values
                            ]
                          )}
                        >
                          <option value="" disabled>
                            Select {field.label}
                          </option>
                          <option value="Reseller">Reseller</option>
                          <option value="Walk-in">Walk-in</option>
                        </select>
                      ) : field.type === "checkbox" ? (
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name={field.name}
                          onChange={(e) => {
                            formik.handleChange(e);
                            formik.setFieldValue(
                              field.name,
                              !formik.values[
                                field.name as keyof typeof formik.values
                              ]
                            );
                          }}
                          onBlur={formik.handleBlur}
                          checked={field.checked}
                        />
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
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={String(
                            formik.values[
                              field.name as keyof typeof formik.values
                            ]
                          )}
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
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default EditCustomerModal;
