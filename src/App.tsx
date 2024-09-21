import React, { useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Header from "./components/includes/Header";
import Footer from "./components/includes/Footer";
import CustomerForm from "./components/CustomerForm";
import CustomerTable from "./components/CustomerDaTable";
import { ICustomerFormData } from "./interface/ICustomerFormData";

const App: React.FC = () => {
  const [customerAdded, setCustomerAdded] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState<
    ICustomerFormData | undefined
  >(undefined);

  const handleCustomerAdded = () => {
    setCustomerAdded((prev) => !prev);
  };

  const handleEditCustomer = (customer: ICustomerFormData) => {
    setCustomerToEdit(customer);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <div className="container-fluid flex-grow-1" style={{ padding: "2rem" }}>
        <div className="row">
          <div className="col-md-6">
            <CustomerForm
              onCustomerAdded={handleCustomerAdded}
              customerToEdit={customerToEdit} 
            />
          </div>
          <div className="col-md-6">
            <CustomerTable
              customerAdded={customerAdded}
              onEditCustomer={handleEditCustomer} 
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
