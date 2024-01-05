import { useState } from "react";
import { initialQueryState, KTIcon } from "../../../../_metronic/helpers";

interface CustomersListFilterProps {
  handleFilter: (IsActive: number | null, CustomerType: string) => void;
}
function CustomersListFilter({ handleFilter }: CustomersListFilterProps) {
  const [status, setStatus] = useState("");
  const [customerType, setCustomerType] = useState("");

  const applyFilter = () => {
    let isActive: number | null = null;

    if (status === "1") {
      isActive = 1;
    } else if (status === "0") {
      isActive = 0;
    }

    // Call the parent component's handleFilter function with the selected options
    handleFilter(isActive, customerType);
  };

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
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              data-kt-select2="true"
              data-placeholder="Select option"
              data-allow-clear="true"
              data-kt-user-table-filter="role"
              data-hide-search="true"
            >
              <option value="">All</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
          {/* end::Input group */}

          {/* begin::Input group */}
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Customer Type</label>
            <select
              className="form-select form-select-solid fw-bolder"
              value={customerType}
              onChange={(e) => setCustomerType(e.target.value)}
              data-kt-select2="true"
              data-placeholder="Select option"
              data-allow-clear="true"
              data-kt-user-table-filter="role"
              data-hide-search="true"
            >
              <option value="">All</option>
              <option value="Reseller">Reseller</option>
              <option value="Walk-in">Walk-in</option>
            </select>
          </div>
          {/* end::Input group */}

          {/* begin::Actions */}
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-light btn-active-light-primary fw-bold me-2 px-6"
              data-kt-user-table-filter="reset"
              onClick={() => {
                setStatus("");
                setCustomerType("");
              }}
            >
              Reset
            </button>
            <button
              className="btn btn-primary fw-bold px-6"
              data-kt-menu-dismiss="true"
              data-kt-user-table-filter="filter"
              onClick={applyFilter}
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
}

export { CustomersListFilter };
