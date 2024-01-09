const API_URL = import.meta.env.VITE_APP_API_URL_LOCAL;

export const fetchCustomerById = async (customerId: any): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/customers/${customerId}`);
    console.log(`Fetching data from: ${API_URL}/customers/${customerId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching customer data:", error);
    throw error;
  }
};

export const fetchCustomers = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/customers`);
    console.log(`Fetching data from: ${API_URL}/customers`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching customer data:", error);
    throw error;
  }
};

export const deleteCustomers = async (customerIds: string[]): Promise<void> => {
  try {
    const response = await fetch("http://localhost:3000/api/customers", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customerIds }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // If needed, you can return additional data or perform other logic here
  } catch (error) {
    console.error("Error deleting customers:", error);
    throw error;
  }
};

export const deleteCustomerById = async (customerId: string): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/customers/${customerId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // If needed, you can return additional data or perform other logic here
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};
