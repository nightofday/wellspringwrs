function EmptyContainers() {
  return (
    <>
      <div className="card mb-5 mb-xl-8">
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1">History</span>
          </h3>
          <div className="card-toolbar">
            <a href="#" className="btn btn-sm btn-light-primary">
              <i className="ki-duotone ki-plus fs-2"></i>Empty Container
            </a>
          </div>
        </div>
        <div className="card-body py-3">
          <div className="table-responsive">
            <table className="table align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bold text-muted bg-light">
                  <th className="ps-4 min-w-125px rounded-start">Date</th>
                  <th className="min-w-125px">Time</th>
                  <th className="min-w-125px text-center">Quantity</th>
                  <th className="min-w-200px text-end rounded-end pe-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="fw-bold">
                  <td className="ps-4">12/05/2021</td>
                  <td>12:00 PM</td>
                  <td className="text-center">10</td>
                  <td className="text-end pe-4">
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
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
                      <i className="ki-duotone ki-trash fs-3">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                        <span className="path4"></span>
                        <span className="path5"></span>
                      </i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmptyContainers;
