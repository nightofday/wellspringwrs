import React, { useEffect, useState } from "react";
import {
  KTCard,
  KTCardBody,
  KTIcon,
  toAbsoluteUrl,
} from "../../../_metronic/helpers";
import { CustomersListToolbar } from "./toolbar/CustomersListToolBar";
import { CustomersListPagination } from "./toolbar/CustomersListPagination";
import CustomersActionCell from "./components/CustomersActionCell";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

interface Customer {
  CustomerID: number;
  Name: string;
  Address: string;
  Phone: string;
  Email: string;
  BorrowedContainers: string;
  Notes: string;
  Photo: string;
  IsActive: number | null;
  CustomerType: string;
  Points: number;
}

const Customers = () => {
  // State variables
  //handles the table data changed
  const [tableDataChanged, setTableDataChanged] = useState<boolean>(false);
  const reloadTable = () => {
    setTableDataChanged((prev) => !prev);
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // handles the customers data
  const [customers, setCustomers] = useState<Customer[]>([]);
  // handles the filtered customers
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [filteredCustomersTemp, setFilteredCustomersTemp] = useState<
    Customer[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  //handles the selected customers for deletion
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [isHeaderCheckboxChecked, setIsHeaderCheckboxChecked] =
    useState<boolean>(false);
  // Function to handle checkbox selection and update selectedCustomers
  const handleCheckboxChange = (customerId: number) => {
    if (customerId === 0) {
      // Header checkbox selected
      setIsHeaderCheckboxChecked(!isHeaderCheckboxChecked);

      if (!isHeaderCheckboxChecked) {
        // If the header checkbox is checked, select checkboxes only on the current page
        const currentPageCustomerIds = displayedCustomers.map(
          (customer) => customer.CustomerID
        );
        setSelectedCustomers(currentPageCustomerIds);
      } else {
        // If the header checkbox is unchecked, clear all selected checkboxes
        setSelectedCustomers([]);
      }
    } else {
      // Individual checkbox selected
      if (selectedCustomers.includes(customerId)) {
        setSelectedCustomers((prevSelected) =>
          prevSelected.filter((id) => id !== customerId)
        );
      } else {
        setSelectedCustomers((prevSelected) => [...prevSelected, customerId]);
      }

      // Check if all checkboxes on the current page are selected when an individual checkbox is selected
      const allSelectedOnPage = displayedCustomers.every((customer) =>
        selectedCustomers.includes(customer.CustomerID)
      );
      setIsHeaderCheckboxChecked(allSelectedOnPage);
    }
  };

  // Fetch customers data from API
  useEffect(() => {
    fetch("http://localhost:3000/api/customers")
      .then((response) => response.json())
      .then((data: Customer[]) => {
        setCustomers(data);
        setFilteredCustomers(data); // Set filteredCustomers initially with all customers
      })
      .catch((error) => console.error("Error:", error));
  }, [tableDataChanged]); // Add tableDataChanged as a dependency

  // Function to handle delete of selected customers
  const handleDelete = async () => {
    try {
      // Ensure there are selected customers to delete
      if (selectedCustomers.length === 0) {
        return;
      }

      // Show confirmation dialog
      const confirmed = await Swal.fire({
        title: "Are you sure?",
        text: `You are about to delete ${selectedCustomers.length} ${
          selectedCustomers.length === 1 ? "customer" : "customers"
        }. Do you want to proceed?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (!confirmed.isConfirmed) {
        return; // User canceled the deletion
      }

      // Send a DELETE request to the server
      const response = await fetch("http://localhost:3000/api/customers", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerIds: selectedCustomers }),
      });

      // Check if the deletion was successful (you may need to adjust based on your API response format)
      if (response.ok) {
        // Update local state after successful deletion
        const updatedCustomers = customers.filter(
          (customer) => !selectedCustomers.includes(customer.CustomerID)
        );

        reloadTable();
        setCustomers(updatedCustomers);
        setFilteredCustomers(updatedCustomers);
        setSelectedCustomers([]);
        setIsHeaderCheckboxChecked(false);
        // Display success message based on the number of selected customers
        const successMessage =
          selectedCustomers.length === 1
            ? `${
                customers.find(
                  (customer) => customer.CustomerID === selectedCustomers[0]
                )?.Name
              } deleted successfully!`
            : `${selectedCustomers.length} customers deleted successfully!`;

        Swal.fire({
          title: "Success",
          text: successMessage,
          icon: "success",
          confirmButtonText: "OK, Got it!",
          confirmButtonColor: "#3085d6",
        });
      } else {
        // Handle error scenario (display an error message, etc.)
        console.error("Error deleting customers:", response.statusText);
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error:", error);
    }
  };

  // Function to handle filter
  // Function to handle filter
  const handleFilter = (IsActive: number | null, CustomerType: string) => {
    console.log("Isactive:", IsActive);
    const filtered = customers.filter((customer) => {
      // Filter based on IsActive
      const isActiveFilter =
        IsActive !== null ? customer.IsActive === +IsActive : true;

      // Filter based on CustomerType
      const customerTypeFilter = CustomerType
        ? customer.CustomerType === CustomerType
        : true;

      // Combine the filters
      return isActiveFilter && customerTypeFilter;
    });
    console.log(filtered);

    setFilteredCustomersTemp(filtered);
    setFilteredCustomers(filtered);
    setCurrentPage(1); // Reset to the first page after filter
  };

  // Handle search functionality
  const handleSearch = (searchTerm: string) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredSearch = filteredCustomersTemp.filter(
      (customer) =>
        customer.Name.toLowerCase().includes(lowerCaseSearchTerm) ||
        customer.Email.toLowerCase().includes(lowerCaseSearchTerm) ||
        customer.Notes.toLowerCase().includes(lowerCaseSearchTerm) ||
        customer.CustomerType.toLowerCase().includes(lowerCaseSearchTerm)
    );

    setFilteredCustomers(filteredSearch);
    setCurrentPage(1); // Reset to the first page after search
  };

  // Handle page change
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate the correct range of rows to display on the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredCustomers.length);
  const displayedCustomers = filteredCustomers.slice(startIndex, endIndex);

  return (
    <KTCard>
      {/* Customers list toolbar */}
      <CustomersListToolbar
        onSearch={handleSearch}
        onDelete={handleDelete}
        handleFilter={handleFilter}
        selectedCount={selectedCustomers.length}
        reloadTable={reloadTable}
        filteredCustomers={filteredCustomers}
      />

      <KTCardBody className="py-4">
        <div className="table-responsive">
          <table className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer">
            <thead>
              <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                <th className="w-10px pe-2">
                  <div className="form-check form-check-sm form-check-custom form-check-solid me-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      data-kt-check=""
                      data-kt-check-target="#kt_table_users .form-check-input"
                      checked={isHeaderCheckboxChecked}
                      onChange={() => handleCheckboxChange(0)} // Pass 0 for header checkbox
                    />
                  </div>
                </th>
                <th className="min-w-125px">Name</th>
                <th className="min-w-125px">Email</th>
                <th className="min-w-125px">Borrowed Containers</th>
                <th className="min-w-125px">Active</th>
                <th className="min-w-125px">Customer Type</th>
                <th className="min-w-125px">Points</th>
                <th className="min-w-125px">Notes</th>
                <th className="min-w-125px">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 fw-bold">
              {displayedCustomers.length > 0 ? (
                displayedCustomers.map((customer) => (
                  <tr key={customer.CustomerID}>
                    <td>
                      <div className="form-check form-check-sm form-check-custom form-check-solid">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={customer.CustomerID}
                          checked={selectedCustomers.includes(
                            customer.CustomerID
                          )}
                          onChange={() =>
                            handleCheckboxChange(customer.CustomerID)
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
                          <Link to={`/customers/profile/overview`}>
                            {customer.Photo ? (
                              <div className="symbol-label">
                                <img
                                  src={toAbsoluteUrl(`media/${customer.Photo}`)}
                                  alt={customer.Name}
                                  className="w-100"
                                />
                              </div>
                            ) : (
                              <div className="symbol-label fs-3">
                                {customer.Name.split(" ")
                                  .slice(0, 2)
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                            )}
                          </Link>
                        </div>
                        <div className="d-flex flex-column">
                          <Link
                            to={`/customers/profile/overview`}
                            className="text-gray-800 text-hover-primary mb-1"
                          >
                            {customer.Name}
                          </Link>
                          <span>{customer.Phone}</span>
                        </div>
                      </div>
                    </td>
                    <td>{customer.Email}</td>
                    <td>{customer.BorrowedContainers}</td>
                    <td>
                      <span
                        className={`badge ${
                          customer.IsActive ? "badge-success" : "badge-danger"
                        }`}
                      >
                        {customer.IsActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>{customer.CustomerType}</td>
                    <td>{customer.Points}</td>
                    <td>{customer.Notes}</td>
                    <td>
                      <CustomersActionCell
                        CustomerID={customer.CustomerID}
                        reloadTable={reloadTable}
                        Name={customer.Name}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>
                    <div className="d-flex text-center w-100 align-content-center justify-content-center">
                      No matching records found
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Customers list pagination */}
        <CustomersListPagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredCustomers.length / pageSize)}
          onPageChange={onPageChange}
          totalRows={filteredCustomers.length}
          pageSize={pageSize}
        />
      </KTCardBody>
    </KTCard>
  );
};

export default Customers;
