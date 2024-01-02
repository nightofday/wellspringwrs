import { useEffect, useState } from "react";
import { KTCard, KTCardBody, toAbsoluteUrl } from "../../../_metronic/helpers";
import { CustomersListToolbar } from "./toolbar/CustomersListToolBar";

interface Customer {
  CustomerID: number;
  Name: string;
  Address: string;
  Phone: string;
  Email: string;
  BorrowedContainers: string;
  Notes: string;
  Photo: string;
  IsActive: boolean;
  CustomerType: string;
  Points: number;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <KTCard>
      <CustomersListToolbar />

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
                    />
                  </div>
                </th>
                <th className="min-w-125px">Name</th>
                <th className="min-w-125px">Email</th>
                <th className="min-w-125px">Borrowed Containers</th>
                <th className="min-w-125px">Notes</th>
                <th className="min-w-125px">Active</th>
                <th className="min-w-125px">Customer Type</th>
                <th className="min-w-125px">Points</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 fw-bold">
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer.CustomerID}>
                    <td>
                      <div className="form-check form-check-sm form-check-custom form-check-solid">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="1"
                        />
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
                          <a href="#">
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
                          </a>
                        </div>
                        <div className="d-flex flex-column">
                          <a
                            href="#"
                            className="text-gray-800 text-hover-primary mb-1"
                          >
                            {customer.Name}
                          </a>
                          <span>{customer.Phone}</span>
                        </div>
                      </div>
                    </td>
                    <td>{customer.Email}</td>
                    <td>{customer.BorrowedContainers}</td>
                    <td>{customer.Notes}</td>
                    <td>{customer.IsActive}</td>
                    <td>{customer.CustomerType}</td>
                    <td>{customer.Points}</td>
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
      </KTCardBody>
    </KTCard>
  );
};

export default Customers;
