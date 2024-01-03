import React from "react";

interface DeleteCustomersProps {
  onDelete: () => void;
  selectedCount?: number; // Make selectedCount an optional property
}

function DeleteCustomers({ onDelete, selectedCount }: DeleteCustomersProps) {
  return (
    <div className="d-flex justify-content-end align-items-center">
      <div className="fw-bolder me-5">
        <span className="me-2">
          {selectedCount !== undefined ? `${selectedCount} Selected` : ""}
        </span>
      </div>

      <button type="button" className="btn btn-danger" onClick={onDelete}>
        Delete Selected
      </button>
    </div>
  );
}

export default DeleteCustomers;
