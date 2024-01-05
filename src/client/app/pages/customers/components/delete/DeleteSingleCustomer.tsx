import axios from "axios";
import Swal from "sweetalert2";

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
  const onDeleteCustomer = () => {
    const deleteCustomer = async () => {
      try {
        //fetch customer data
        const getCustomerResponse = await axios.get(
          `http://localhost:3000/api/customers/${CustomerID}`
        );
        console.log(getCustomerResponse);

        Swal.fire({
          title: "Are you sure?",
          text: "You are about to delete this customer!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
        }).then(async function (result) {
          if (result.value) {
            const response = await axios.delete(
              `http://localhost:3000/api/customers/${CustomerID}`
            );
            console.log(response);
            const getname = response.data;
            const name = getname.data;
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

        // 💡 use axios.delete instead of axios.post

        reloadTable();
      } catch (error) {
        console.error(error);
      }
    };
    deleteCustomer();
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
