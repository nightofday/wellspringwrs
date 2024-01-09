import Swal from "sweetalert2";
import { deleteCustomerById } from "../../../../../../server/api";

interface DeleteSingleCustomerProps {
  CustomerID: number;
  Name: string;
  reloadTable: () => void;
}

function DeleteSingleCustomer({
  CustomerID,
  reloadTable,
  Name,
}: DeleteSingleCustomerProps) {
  const onDeleteCustomer = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: `You are about to delete, ${Name}. This action cannot be undone`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      }).then(async function (result) {
        if (result.value) {
          await deleteCustomerById(CustomerID.toString());
          reloadTable();
          Swal.fire({
            title: "Success!",
            text: `${Name} deleted successfully!`,
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: "Cancelled!",
            icon: "error",
            text: `Customer was not deleted!`,
            showCancelButton: false,
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <a
        className="menu-link px-3"
        data-kt-users-table-filter="delete_row"
        onClick={onDeleteCustomer}
      >
        Delete
      </a>
    </>
  );
}

export default DeleteSingleCustomer;
