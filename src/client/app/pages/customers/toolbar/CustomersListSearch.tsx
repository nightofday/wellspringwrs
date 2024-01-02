import { KTIcon } from "../../../../_metronic/helpers";

const CustomersListSearchComponent = () => {
  return (
    <div className="card-title">
      {/* begin::Search */}
      <div className="d-flex align-items-center position-relative my-1">
        <KTIcon iconName="magnifier" className="fs-1 position-absolute ms-6" />
        <input
          type="text"
          data-kt-user-table-filter="search"
          className="form-control form-control-solid w-250px ps-14"
          placeholder="Search Customer"
          value=""
        />
      </div>
      {/* end::Search */}
    </div>
  );
};

export { CustomersListSearchComponent };
