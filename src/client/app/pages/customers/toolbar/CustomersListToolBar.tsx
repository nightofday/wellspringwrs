import { KTIcon } from "../../../../_metronic/helpers";
import { AddCustomersModal } from "../modals/create/AddCustomersModal";
import { CustomersListFilter } from "./CustomersListFilter";
import { CustomersListSearchComponent } from "./CustomersListSearch";

function CustomersListToolbar() {
  return (
    <div className="card-header border-0 pt-6">
      <CustomersListSearchComponent />
      <div className="card-toolbar">
        <div
          className="d-flex justify-content-end"
          data-kt-user-table-toolbar="base"
        >
          <CustomersListFilter />

          {/* begin::Export */}
          <button type="button" className="btn btn-light-primary me-3">
            <KTIcon iconName="exit-up" className="fs-2" />
            Export
          </button>
          {/* end::Export */}

          {/* begin::Add Customer */}
          <AddCustomersModal />
          {/* end::Add Customer */}
        </div>
      </div>
    </div>
  );
}

export { CustomersListToolbar };
