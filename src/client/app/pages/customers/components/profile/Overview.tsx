function Overview() {
  return (
    <>
      <div className="card-body pt-3 ">
        <div className="d-flex align-items-center justify-content-between my-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1">
              Transaction History
            </span>
            <br />
            <span className="text-muted fw-semibold fs-7">Yesterday</span>
          </h3>
          <div className="card-toolbar" data-kt-buttons="true">
            <a
              className="btn btn-sm btn-color-muted btn-active btn-active-primary active px-4 me-1"
              id="kt_charts_widget_3_year_btn"
            >
              Today
            </a>
            <a
              className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1"
              id="kt_charts_widget_3_month_btn"
            >
              Yesterday
            </a>
            <a
              className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4"
              id="kt_charts_widget_3_week_btn"
            >
              All
            </a>
          </div>
        </div>
        {/* begin::Timeline */}
        <div className="fw-bold text-gray-800 fs-6 mb-2">01/08/2021</div>
        <div className="timeline-label">
          {/* begin::Item */}

          <div className="timeline-item">
            {/* begin::Label */}

            <div className="timeline-label fw-bold text-gray-800 fs-6">
              08:42
            </div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless text-warning fs-1"></i>
            </div>
            {/* end::Badge */}
            {/* begin::Text */}
            <div className="fw-mormal timeline-content text-muted ps-3">
              Outlines keep you honest. And keep structure
            </div>
            {/* end::Text */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className="timeline-item">
            {/* begin::Label */}
            <div className="timeline-label fw-bold text-gray-800 fs-6">
              10:00
            </div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless text-success fs-1"></i>
            </div>
            {/* end::Badge */}
            {/* begin::Content */}
            <div className="timeline-content d-flex">
              <span className="fw-bold text-gray-800 ps-3">AEOL meeting</span>
            </div>
            {/* end::Content */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className="timeline-item">
            {/* begin::Label */}
            <div className="timeline-label fw-bold text-gray-800 fs-6">
              14:37
            </div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless text-danger fs-1"></i>
            </div>
            {/* end::Badge */}
            {/* begin::Desc */}
            <div className="timeline-content fw-bold text-gray-800 ps-3">
              Make deposit
              <a href="#" className="text-primary">
                USD 700
              </a>
              . to ESL
            </div>
            {/* end::Desc */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className="timeline-item">
            {/* begin::Label */}
            <div className="timeline-label fw-bold text-gray-800 fs-6">
              16:50
            </div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless text-primary fs-1"></i>
            </div>
            {/* end::Badge */}
            {/* begin::Text */}
            <div className="timeline-content fw-mormal text-muted ps-3">
              Indulging in poorly driving and keep structure keep great
            </div>
            {/* end::Text */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className="timeline-item">
            {/* begin::Label */}
            <div className="timeline-label fw-bold text-gray-800 fs-6">
              21:03
            </div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless text-danger fs-1"></i>
            </div>
            {/* end::Badge */}
            {/* begin::Desc */}
            <div className="timeline-content fw-semibold text-gray-800 ps-3">
              New order placed
              <a href="#" className="text-primary">
                #XF-2356
              </a>
              .
            </div>
            {/* end::Desc */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className="timeline-item">
            {/* begin::Label */}
            <div className="timeline-label fw-bold text-gray-800 fs-6">
              16:50
            </div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless text-primary fs-1"></i>
            </div>
            {/* end::Badge */}
            {/* begin::Text */}
            <div className="timeline-content fw-mormal text-muted ps-3">
              Indulging in poorly driving and keep structure keep great
            </div>
            {/* end::Text */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className="timeline-item">
            {/* begin::Label */}
            <div className="timeline-label fw-bold text-gray-800 fs-6">
              21:03
            </div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless text-danger fs-1"></i>
            </div>
            {/* end::Badge */}
            {/* begin::Desc */}
            <div className="timeline-content fw-semibold text-gray-800 ps-3">
              New order placed
              <a href="#" className="text-primary">
                #XF-2356
              </a>
              .
            </div>
            {/* end::Desc */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className="timeline-item">
            {/* begin::Label */}
            <div className="timeline-label fw-bold text-gray-800 fs-6">
              10:30
            </div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless text-success fs-1"></i>
            </div>
            {/* end::Badge */}
            {/* begin::Text */}
            <div className="timeline-content fw-mormal text-muted ps-3">
              Finance KPI Mobile app launch preparion meeting
            </div>
            {/* end::Text */}
          </div>
          {/* end::Item */}
        </div>
        {/* end::Timeline */}
      </div>
    </>
  );
}
export default Overview;
