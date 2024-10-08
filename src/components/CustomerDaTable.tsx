import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ICustomerFormData } from "../interface/ICustomerFormData";
import { getCustomers, deleteCustomer } from "../utils/Apis";
import { AxiosError } from "axios";

interface CustomerTableProps {
  customerAdded: boolean;
  onEditCustomer: (customer: ICustomerFormData) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  customerAdded,
  onEditCustomer,
}) => {
  const [customers, setCustomers] = useState<ICustomerFormData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const toast = React.useRef<Toast>(null);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const response = await getCustomers(1, 10);
      setCustomers(response);
    } catch (error) {
      handleError(error, "Erro ao carregar clientes");
    } finally {
      setLoading(false);
    }
  };

  const removeCustomer = async (id?: number) => {
    if (!id) {
      showToast("error", "Erro", "ID inválido para exclusão");
      return;
    }

    try {
      await deleteCustomer(id);
      showToast("success", "Sucesso", "Cliente removido com sucesso!");
      loadCustomers(); 
    } catch (error) {
      handleError(error, "Erro ao remover cliente");
    }
  };

  const actionBodyTemplate = (rowData: ICustomerFormData) => (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-warning"
        onClick={() => onEditCustomer(rowData)} 
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger"
        onClick={() => removeCustomer(rowData.id)}
      />
    </div>
  );

  const showToast = (
    severity: "success" | "info" | "warn" | "error",
    summary: string,
    detail: string
  ) => {
    toast.current?.show({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };

  const handleError = (error: unknown, defaultMessage: string) => {
    const err = error as AxiosError<{ message: string[] | string }>;
    const errorMessage = err.response?.data?.message || defaultMessage;

    showToast(
      "error",
      "Erro",
      Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage
    );
  };

  useEffect(() => {
    loadCustomers();
  }, [customerAdded]);

  return (
    <div className="card">
      <Toast ref={toast} />
      <DataTable value={customers} paginator rows={10} loading={loading}>
        <Column field="id" header="ID" />
        <Column field="name" header="Nome" />
        <Column field="email" header="Email" />
        <Column field="phone" header="Telefone" />
        <Column field="cpf" header="CPF" />
        <Column field="city" header="Cidade" />
        <Column body={actionBodyTemplate} header="Ações" />
      </DataTable>
    </div>
  );
};

export default CustomerTable;
