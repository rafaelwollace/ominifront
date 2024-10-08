import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createCustomer = async <T>(customerData: T): Promise<T> => {
  try {
    const response = await axios.post(`${BASE_URL}customers`, customerData);
    return response.data as T;
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    throw error;
  }
};

export const getCustomers = async (page: number, limit: number) => {
  try {
    const response = await axios.get(`${BASE_URL}customers`, {
      params: { page, limit },
    });
    return response.data; 
  } catch (error) {
    console.error("Erro ao obter clientes:", error);
    throw error;
  }
};

export const deleteCustomer = async (id: number) => {
  try {
    await axios.delete(`${BASE_URL}customers/${id}`);
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
    throw error;
  }
};

export const updateCustomer = async <T extends { id?: number }>(
  id: number,
  customerData: T
): Promise<T> => {
  try {
    const dataToUpdate = { ...customerData };
    delete dataToUpdate.id;

    const response = await axios.put(
      `${BASE_URL}customers/${id}`,
      dataToUpdate 
    );
    return response.data as T;
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    throw error;
  }
};
