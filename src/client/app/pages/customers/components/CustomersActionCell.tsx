import React, { useEffect, useState } from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import EditCustomerModal from "./edit/EditCustomerModal";
import { MenuComponent } from "../../../../_metronic/assets/ts/components";
import DeleteSingleCustomer from "./delete/DeleteSingleCustomer";

interface CustomersActionCellProps {
  CustomerID: number;
  reloadTable: () => void;
}

const CustomersActionCell: React.FC<CustomersActionCellProps> = ({
  CustomerID,
  reloadTable,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

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
          <a href="#" className="menu-link px-3" onClick={openModal}>
            Edit
          </a>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className="menu-item px-3">
          <DeleteSingleCustomer
            CustomerID={CustomerID}
            reloadTable={reloadTable}
          />
        </div>
        {/* end::Menu item */}
      </div>

      {/* Modal outside of the dropdown */}
      {isModalOpen && (
        <EditCustomerModal
          onClose={closeModal}
          CustomerID={CustomerID}
          reloadTable={reloadTable}
        />
      )}
    </>
  );
};

export default CustomersActionCell;
