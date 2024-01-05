// CustomersListToolbar.tsx
import { KTIcon } from "../../../../_metronic/helpers";
import { AddCustomersModal } from "../components/create/AddCustomersModal";
import { CustomersListFilter } from "./CustomersListFilter";
import { CustomersListSearchComponent } from "./CustomersListSearch";
import DeleteCustomers from "../components/delete/DeleteCustomers";

interface CustomersListToolbarProps {
  onSearch: (searchTerm: string) => void;
  onDelete: () => void;
  selectedCount: number;
  reloadTable: () => void;
  handleFilter: (IsActive: number | null, CustomerType: string) => void;
}

function CustomersListToolbar({
  onSearch,
  onDelete,
  selectedCount,
  reloadTable,
  handleFilter,
}: CustomersListToolbarProps) {
  const isCheckboxSelected = selectedCount > 0;

  return (
    <div className="card-header border-0 pt-6">
      <CustomersListSearchComponent onSearch={onSearch} />
      <div className="card-toolbar">
        <div
          className="d-flex justify-content-end"
          data-kt-user-table-toolbar="base"
        >
          {!isCheckboxSelected && (
            <CustomersListFilter handleFilter={handleFilter} />
          )}

          {/* begin::Export */}
          {!isCheckboxSelected && (
            <button type="button" className="btn btn-light-primary me-3">
              <KTIcon iconName="exit-up" className="fs-2" />
              Export
            </button>
          )}
          {/* end::Export */}

          {/* begin::Add Customer */}
          {!isCheckboxSelected && (
            <AddCustomersModal reloadTable={reloadTable} />
          )}
          {/* end::Add Customer */}

          {/* begin::Delete */}
          {isCheckboxSelected && (
            <DeleteCustomers
              onDelete={onDelete}
              selectedCount={selectedCount}
            />
          )}
          {/* end::Delete */}
        </div>
      </div>
    </div>
  );
}

export { CustomersListToolbar };
