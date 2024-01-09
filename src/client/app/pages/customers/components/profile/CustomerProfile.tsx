import { Link, useLocation, useParams } from "react-router-dom";
import Orders from "./CustomerOrders";
import Notes from "./Notes";
import {
  KTCard,
  KTCardBody,
  toAbsoluteUrl,
} from "../../../../../_metronic/helpers";
import EmptyContainers from "./EmptyContainers";
import Overview from "./Overview";
import BorrowedContainers from "./BorrowedContainers";
import { useEffect, useState } from "react";
import { fetchCustomerById } from "../../../../../../server/api";

interface Customer {
  id: string;
  Name: string;
  Phone: string;
  Email: string;
  Address: string;
  EmptyContainers: number;
  BorrowedContainers: number;
  RewardPoints: number;
  Notes: string;
  Orders: string;
  Photo: string;
  IsActive: boolean;
}
function CustomerProfile() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const customerId = queryParams.get("id");

  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (customerId) {
          const customerData = await fetchCustomerById(customerId);
          setCustomer(customerData);
        }
      } catch (error) {
        // Handle the error
      }
    };

    fetchData();
  }, [customerId]);

  if (!customer) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <KTCard>
        <KTCardBody>
          <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
            <div className="me-7 mb-4">
              <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                {customer.Photo ? (
                  <img
                    src={toAbsoluteUrl(`media/${customer.Photo}`)}
                    alt={customer.Name}
                    className="w-200"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <img
                    src="/media/avatars/blank.png"
                    alt={customer.Name}
                    className="w-100"
                  />
                )}

                <div
                  className={`position-absolute translate-middle bottom-0 start-100 mb-6 rounded-circle border border-4 border-white h-20px w-20px ${
                    customer.IsActive ? "bg-success" : "bg-danger"
                  }`}
                ></div>
              </div>
            </div>
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <span className="text-gray-800 text-hover-primary fs-2 fw-bolder me-1">
                      {customer.Name}
                    </span>
                  </div>
                  <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                    <a
                      href="#"
                      className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                    >
                      <i className="ki-duotone ki-whatsapp  fs-4 me-1">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>
                      {customer.Phone}
                    </a>
                    {customer.Email && (
                      <a
                        href="#"
                        className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                      >
                        <i className="ki-duotone ki-sms fs-4 me-1">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        {customer.Email}
                      </a>
                    )}

                    <a
                      href="#"
                      className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                    >
                      <i className="ki-duotone ki-geolocation  fs-4 me-1">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                      </i>
                      {customer.Address}
                    </a>
                  </div>
                </div>
                <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                  <button className="btn btn-sm btn-primary me-3 w-auto">
                    <i className="ki-outline ki-user-edit fs-2"></i> Edit
                  </button>
                </div>
              </div>
              <div className="d-flex flex-wrap flex-stack">
                <div className="d-flex flex-column flex-grow-1 pe-8">
                  <div className="d-flex flex-wrap">
                    <div className="border border-gray-300 border-dashed rounded w-auto py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <i className="ki-duotone ki-bucket fs-3 me-2 text-primary">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                          </i>
                          <div className="fs-2 fw-bolder">100</div>
                        </div>
                      </div>

                      <div className="fw-bold fs-6 text-gray-500">
                        Empty Containers
                      </div>
                    </div>

                    <div className="border border-gray-300 border-dashed rounded w-auto py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <i className="ki-duotone ki-bucket fs-3 me-2">
                          <span className="path1"></span>
                          <span className="path2"></span>
                          <span className="path3"></span>
                          <span className="path4"></span>
                        </i>
                        <div className="fs-2 fw-bolder">85</div>
                      </div>
                      <div className="fw-bold fs-6 text-gray-500">
                        Borrowed Containers
                      </div>
                    </div>
                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <i className="ki-duotone ki-arrow-up fs-3 text-success me-2">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        <div className="fs-2 fw-bolder">0</div>
                      </div>
                      <div className="fw-bold fs-6 text-gray-500">
                        Reward Points
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center w-200px w-sm-300px flex-column mt-3">
                  {/*  additional content */}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex overflow-auto h-55px">
            <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
              <li className="nav-item">
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === "/customers/profile/overview" &&
                      "active")
                  }
                  to="/customers/profile/overview"
                >
                  Overview
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname ===
                      "/customers/profile/empty-containers" && "active")
                  }
                  to="/customers/profile/empty-containers"
                >
                  Empty Containers
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname ===
                      "/customers/profile/borrowed-containers" && "active")
                  }
                  to="/customers/profile/borrowed-containers"
                >
                  Borrowed Containers
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname ===
                      "/customers/profile/customerorders" && "active")
                  }
                  to="/customers/profile/customerorders"
                >
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === "/customers/profile/rewards" &&
                      "active")
                  }
                  to="/customers/profile/rewards"
                >
                  Rewards
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === "/customers/profile/notes" &&
                      "active")
                  }
                  to="/customers/profile/notes"
                >
                  Notes
                </Link>
              </li>
            </ul>
          </div>
          <div className="separator border-2 mt-5"></div>
          <div className="d-flex row">
            {location.pathname === "/customers/profile/overview" && (
              <Overview />
            )}
            {location.pathname === "/customers/profile/empty-containers" && (
              <EmptyContainers />
            )}
            {location.pathname === "/customers/profile/borrowed-containers" && (
              <BorrowedContainers />
            )}
            {location.pathname === "/customers/profile/customerorders" && (
              <Orders />
            )}
            {location.pathname === "/customers/profile/notes" && <Notes />}
          </div>
        </KTCardBody>
      </KTCard>
    </>
  );
}
export default CustomerProfile;
