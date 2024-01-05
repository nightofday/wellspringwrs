function CustomerProfile() {
  return (
    <>
      <div className="app-content flex-column-fluid" id="kt_app_content">
        <div className="app-container container-fluid">
          <div id="kt_app_content" className="app-content flex-column-fluid">
            <div
              id="kt_app_content_container"
              className="app-container container-fluid"
            >
              <div className="card mb-5 mb-xl-10">
                <div className="card-body pt-9 pb-0">
                  <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
                    <div className="me-7 mb-4">
                      <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                        <img src="/media/avatars/300-1.jpg" alt="Metornic" />
                        <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"></div>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                        <span className="text-dark fw-bolder fs-3 mb-0">
                          Emma Smith
                        </span>
                      </div>
                      <div className="d-flex flex-column my-4 ">
                        <span className="me-5">
                          <i className="las la-phone me-2"></i>
                          +456 123 7890
                        </span>
                        <span className="me-5">
                          <i className="las la-mail-bulk me-2"></i>
                          test@gmail.com
                        </span>
                        <span className="me-5">
                          <i className="las la-map-marker me-2"></i>
                          37, Warren Street, London, UK
                        </span>
                        <span className="me-5">
                          <i className="las la-globe me-2"></i>
                          www.wellspring.com
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap flex-stack">
                    {/* ... (rest of the content) ... */}
                  </div>
                  <div className="d-flex overflow-auto h-55px">
                    {/* ... (rest of the content) ... */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CustomerProfile;
