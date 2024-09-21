import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import axios from "axios";
import { createCustomer, updateCustomer } from "../utils/Apis";
import { ICustomerFormData } from "../interface/ICustomerFormData";

interface CustomerFormProps {
  onCustomerAdded: () => void; // Função para atualizar a CustomerTable
  customerToEdit?: ICustomerFormData; // Prop para editar cliente
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  onCustomerAdded,
  customerToEdit, // Recebe o cliente a ser editado
}) => {
  const [formData, setFormData] = useState<ICustomerFormData>({
    id: undefined,
    name: "",
    email: "",
    phone: "",
    cpf: "",
    birthDate: "",
    cep: "",
    street: "",
    city: "",
    state: "",
    number: 0,
    neighborhood: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const toast = useRef<Toast>(null);

  // Efeito para preencher o formulário ao editar cliente
  useEffect(() => {
    if (customerToEdit) {
      setFormData(customerToEdit); // Preenche o formulário com os dados do cliente
    }
  }, [customerToEdit]);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "").slice(0, 8); // Limita a entrada a 8 caracteres numéricos
    setFormData((prevState) => ({ ...prevState, cep }));

    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData((prevState) => ({
            ...prevState,
            street: data.logradouro,
            city: data.localidade,
            state: data.uf,
            neighborhood: data.bairro,
          }));
          toast.current?.show({
            severity: "success",
            summary: "Endereço encontrado",
            life: 3000,
          });
        } else {
          resetAddressFields();
          toast.current?.show({
            severity: "error",
            summary: "CEP não encontrado",
            life: 3000,
          });
        }
      } catch (error) {
        resetAddressFields();
        toast.current?.show({
          severity: "error",
          summary: "Erro ao buscar CEP",
          life: 3000,
        });
        console.error("Erro ao buscar CEP:", error);
      }
    } else {
      resetAddressFields();
    }
  };

  const resetAddressFields = () => {
    setFormData((prevState) => ({
      ...prevState,
      street: "",
      city: "",
      state: "",
      neighborhood: "",
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === "number" ? parseInt(value) : value;
    setFormData((prevState) => ({ ...prevState, [name]: updatedValue }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const customerData = { ...formData };

    try {
      if (formData.id) {
        // Se houver um ID, significa que estamos editando o cliente
        await updateCustomer(formData.id, customerData);
        toast.current?.show({
          severity: "success",
          summary: "Cliente atualizado com sucesso",
          life: 3000,
        });
      } else {
        // Caso contrário, estamos criando um novo cliente
        await createCustomer(customerData);
        toast.current?.show({
          severity: "success",
          summary: "Cliente cadastrado com sucesso",
          life: 3000,
        });
      }

      setErrors([]);
      setFormData({
        id: undefined,
        name: "",
        email: "",
        phone: "",
        cpf: "",
        birthDate: "",
        cep: "",
        street: "",
        city: "",
        state: "",
        number: 0,
        neighborhood: "",
      });

      onCustomerAdded(); // Chama a função para atualizar a tabela de clientes
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMsg = err.response?.data?.message || [
          "Falha ao cadastrar/atualizar cliente",
        ];
        setErrors(errorMsg);
        toast.current?.show({
          severity: "error",
          summary: "Erro ao cadastrar/atualizar cliente",
          life: 3000,
        });
      } else {
        console.error("Erro inesperado:", err);
      }
    }
  };

  return (
    <Card
      title={
        <div style={{ textAlign: "center", color: "#2a2b60" }}>
          {formData.id ? "Editar Cliente" : "Cadastro de Cliente"}
        </div>
      }
      style={{ width: "100%" }}
    >
      <Toast ref={toast} />
      <form onSubmit={handleSubmit} className="container">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="name">Nome</label>
            <InputText
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="phone">Telefone</label>
            <InputText
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="cpf">CPF</label>
            <InputText
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
              maxLength={11}
              className="form-control"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="birthDate">Data de Nascimento</label>
            <InputText
              id="birthDate"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="cep">CEP</label>
            <InputText
              id="cep"
              name="cep"
              value={formData.cep}
              onChange={handleCepChange}
              required
              maxLength={8}
              className="form-control"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="street">Rua</label>
            <InputText
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="form-control"
              disabled
              style={{ backgroundColor: "#e9ecef" }}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="neighborhood">Bairro</label>
            <InputText
              id="neighborhood"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleChange}
              className="form-control"
              disabled
              style={{ backgroundColor: "#e9ecef" }}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="city">Cidade</label>
            <InputText
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-control"
              disabled
              style={{ backgroundColor: "#e9ecef" }}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="state">Estado</label>
            <InputText
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="form-control"
              disabled
              style={{ backgroundColor: "#e9ecef" }}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="number">Número</label>
            <InputText
              id="number"
              name="number"
              value={formData.number.toString()}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>
        <Button
          label={formData.id ? "Atualizar Cliente" : "Cadastrar Cliente"}
          type="submit"
          className="mt-3"
          icon="pi pi-user"
          style={{
            backgroundColor: "#2a2b60",
            borderColor: "#2a2b60",
            color: "white",
          }}
        />
      </form>

      {/* Exibir as mensagens de erro abaixo do formulário */}
      {errors.length > 0 && (
        <div className="alert alert-danger mt-3">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};

export default CustomerForm;
