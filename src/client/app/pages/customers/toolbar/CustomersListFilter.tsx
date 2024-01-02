import { initialQueryState, KTIcon } from "../../../../_metronic/helpers";
const CustomersListFilter = () => {
  return (
    <>
      {/* begin::Filter Button */}
      <button
        type="button"
        className="btn btn-light-primary me-3"
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-end"
      >
        <KTIcon iconName="filter" className="fs-2" />
        Filter
      </button>
      {/* end::Filter Button */}
      {/* begin::SubMenu */}
      <div
        className="menu menu-sub menu-sub-dropdown w-300px w-md-325px"
        data-kt-menu="true"
      >
        {/* begin::Header */}
        <div className="px-7 py-5">
          <div className="fs-5 text-gray-900 fw-bolder">Filter Options</div>
        </div>
        {/* end::Header */}

        {/* begin::Separator */}
        <div className="separator border-gray-200"></div>
        {/* end::Separator */}

        {/* begin::Content */}
        <div className="px-7 py-5" data-kt-user-table-filter="form">
          {/* begin::Input group */}
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Status</label>
            <select
              className="form-select form-select-solid fw-bolder"
              data-kt-select2="true"
              data-placeholder="Select option"
              data-allow-clear="true"
              data-kt-user-table-filter="role"
              data-hide-search="true"
            >
              <option value=""></option>
              <option value="Administrator">Active</option>
              <option value="Analyst">Inactive</option>
            </select>
          </div>
          {/* end::Input group */}

          {/* begin::Input group */}
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Customer Type</label>
            <select
              className="form-select form-select-solid fw-bolder"
              data-kt-select2="true"
              data-placeholder="Select option"
              data-allow-clear="true"
              data-kt-user-table-filter="role"
              data-hide-search="true"
            >
              <option value=""></option>
              <option value="Administrator">Reseller</option>
              <option value="Analyst">Walk-In</option>
            </select>
          </div>
          {/* end::Input group */}

          {/* begin::Actions */}
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-light btn-active-light-primary fw-bold me-2 px-6"
              data-kt-menu-dismiss="true"
              data-kt-user-table-filter="reset"
            >
              Reset
            </button>
            <button
              className="btn btn-primary fw-bold px-6"
              data-kt-menu-dismiss="true"
              data-kt-user-table-filter="filter"
            >
              Apply
            </button>
          </div>
          {/* end::Actions */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::SubMenu */}
    </>
  );
};

export { CustomersListFilter };
