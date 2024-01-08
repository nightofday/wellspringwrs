import Swal from "sweetalert2";
import { KTIcon } from "../../../../_metronic/helpers";
import Papa from "papaparse";

interface Customer {
  CustomerID: any;
  Name: any;
  CustomerType: any;
  Phone: any;
  Email: any;
  Address: any;
  IsActive: any;
  Points: any;
  BorrowedContainers: any;
  Notes: any;
}

interface CustomersListExportProps {
  filteredCustomers: Customer[];
}

function CustomersListExport({ filteredCustomers }: CustomersListExportProps) {
  const handleExport = () => {
    const dataToExport = filteredCustomers.map((customer) => ({
      CustomerID: customer.CustomerID,
      Name: customer.Name,
      CustomerType: customer.CustomerType,
      Phone: customer.Phone,
      Email: customer.Email,
      Address: customer.Address,
      CustomerStatus: customer.IsActive ? "Active" : "Inactive",
      CustomerPoints: customer.Points,
      BorrowedContainers: customer.BorrowedContainers,
      Notes: customer.Notes,
    }));

    const csvData = Papa.unparse(dataToExport); // Ensure you have PapaParse library installed

    // Trigger the CSV export directly without using a ref
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.target = "_blank";
    link.download = "Customers.csv";
    link.click();
    3;

    Swal.fire({
      icon: "success",
      title: "Exported!",
      text: "Customers have been exported.",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-light-primary me-3"
        onClick={handleExport}
      >
        <KTIcon iconName="exit-up" className="fs-2" />
        Export
      </button>
    </>
  );
}

export default CustomersListExport;
