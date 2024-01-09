import { KTSVG } from "../../../../../_metronic/helpers";

function EmptyContainers() {
  return (
    <>
      <div className="card mt-5 mt-xl-8 ">
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1"></span>
          </h3>
          <div className="card-toolbar">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_1"
            >
              Launch demo modal
            </button>
          </div>
        </div>
        <div className="card-body py-3">
          <div className="table-responsive">
            <table className="table align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bold text-muted bg-light">
                  <th className="ps-4 min-auto rounded-start">Date</th>
                  <th className="min-w-auto">Time</th>
                  <th className="min-w-auto text-center">Quantity</th>
                  <th className="min-w-auto text-start">Remarks</th>
                  <th className="min-w-auto text-end rounded-end pe-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="fw-bold">
                  <td className="ps-4">12/05/2021</td>
                  <td>12:00 PM</td>
                  <td className="text-center">10</td>
                  <td className="w-auto">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </td>
                  <td className="text-center">
                    <div className="d-flex flex-column flex-md-row justify-content-end pe-4">
                      <a
                        href="#"
                        className="align-item-center btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-2 mb-lg-0"
                      >
                        <i className="ki-duotone ki-pencil fs-3">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                      </a>
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      >
                        <i className="ki-duotone ki-trash fs-3 ">
                          <span className="path1"></span>
                          <span className="path2"></span>
                          <span className="path3"></span>
                          <span className="path4"></span>
                          <span className="path5"></span>
                        </i>
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* begin::Modal */}

      <div className="modal fade" tabIndex={-1} id="kt_modal_1">
        <div className="modal-dialog modal-dialog-centered mw-650px">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Empty Containers</h5>
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
              <form className="form">
                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">
                    Date
                  </label>
                  <div className="col-lg-8 fv-row">
                    <input
                      type="date"
                      className="form-control form-control-lg form-control-solid"
                      placeholder="Email"
                      name="email"
                      defaultValue="
                      Bootstrap5"
                    />
                  </div>
                </div>
                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">
                    Time
                  </label>
                  <div className="col-lg-8 fv-row">
                    <input
                      type="time"
                      className="form-control form-control-lg form-control-solid"
                      placeholder="Email"
                      name="email"
                      defaultValue="
                          Bootstrap5"
                    />
                  </div>
                </div>
                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">
                    Quantity
                  </label>
                  <div className="col-lg-8 fv-row">
                    <input
                      type="number"
                      className="form-control form-control-lg form-control-solid"
                      placeholder="Quantity"
                      name="email"
                      defaultValue="
                          Bootstrap5"
                    />
                  </div>
                </div>
                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">
                    Remarks
                  </label>
                  <div className="col-lg-8 fv-row">
                    <textarea
                      className="form-control form-control-lg form-control-solid"
                      rows={3}
                      placeholder="Remarks"
                      name="remarks"
                      defaultValue={""}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* end::Modal */}
    </>
  );
}

export default EmptyContainers;
