import { KTIcon } from "../../../../_metronic/helpers";

function CustomersActionCell() {
  return (
    <>
      <a
        href="#"
        className="btn btn-light btn-active-light-primary btn-sm"
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-end"
      >
        Actions
        <KTIcon iconName="down" className="fs-5 m-0" />
      </a>
      {/* begin::Menu */}
      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
        data-kt-menu="true"
      >
        {/* begin::Menu item */}
        <div className="menu-item px-3">
          <a className="menu-link px-3">Edit</a>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className="menu-item px-3">
          <a className="menu-link px-3" data-kt-users-table-filter="delete_row">
            Delete
          </a>
        </div>
        {/* end::Menu item */}
      </div>

      {/* end::Menu */}
    </>
  );
}

export default CustomersActionCell;
