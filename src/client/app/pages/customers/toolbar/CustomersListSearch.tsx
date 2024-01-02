// CustomersListSearchComponent.tsx
import { KTIcon } from "../../../../_metronic/helpers";
import React, { useState } from "react";

interface CustomersListSearchProps {
  onSearch: (searchTerm: string) => void;
}

const CustomersListSearchComponent: React.FC<CustomersListSearchProps> = ({
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="card-title">
      {/* begin::Search */}
      <div className="d-flex align-items-center position-relative my-1">
        <KTIcon iconName="magnifier" className="fs-1 position-absolute ms-6" />
        <input
          type="text"
          className="form-control form-control-solid w-300px ps-14"
          placeholder="Search Customer"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      {/* end::Search */}
    </div>
  );
};

export { CustomersListSearchComponent };
