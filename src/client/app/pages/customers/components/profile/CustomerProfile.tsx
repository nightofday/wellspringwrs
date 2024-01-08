import { Link } from "react-router-dom";
import Orders from "./CustomerOrders";
import Notes from "./Notes";
import { KTCard, KTCardBody } from "../../../../../_metronic/helpers";
import EmptyContainers from "./EmptyContainers";
import Overview from "./Overview";
import BorrowedContainers from "./BorrowedContainers";

function CustomerProfile() {
  return (
    <>
      <KTCard>
        <KTCardBody>
          <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
            <div className="me-7 mb-4">
              <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                <img src="/media/avatars/300-1.jpg" alt="Metornic" />
                <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"></div>
              </div>
            </div>
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <span className="text-gray-800 text-hover-primary fs-2 fw-bolder me-1">
                      Emma Smith
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
                      09307387388
                    </a>
                    <a
                      href="#"
                      className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                    >
                      <i className="ki-duotone ki-sms fs-4 me-1">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>
                      test@gmail.com
                    </a>

                    <a
                      href="#"
                      className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                    >
                      <i className="ki-duotone ki-geolocation  fs-4 me-1">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                      </i>
                      San Roque New Corella
                    </a>
                  </div>
                </div>
                <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                  <a href="#" className="btn btn-sm btn-light me-2">
                    <i className="ki-duotone ki-check fs-3 d-none"></i>
                    <span className="indicator-label">Redeem Points</span>
                  </a>
                  <button
                    className="btn btn-sm btn-primary me-3 w-auto"
                    data-kt-menu-trigger="click"
                    data-kt-menu-placement="bottom-end"
                    data-kt-menu-flip="top-end"
                  >
                    <i className="ki-duotone ki-plus fs-2"></i> Add
                    <div
                      className="menu menu-sub menu-sub-dropdown mt-4 py-3 px-5"
                      data-kt-menu="true"
                    >
                      <div className="menu-item ">
                        <a
                          className="menu-link text-gray-500 text-hover-primary mb-1"
                          href="#"
                        >
                          Empty Container
                        </a>
                        <a
                          className="menu-link text-gray-500 text-hover-primary mb-1"
                          href="#"
                        >
                          Borrow Container
                        </a>
                        <a
                          className="menu-link text-gray-500 text-hover-primary mb-1"
                          href="#"
                        >
                          Orders
                        </a>
                      </div>
                    </div>
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
          <div className="d-flex flex-wrap flex-stack">
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
