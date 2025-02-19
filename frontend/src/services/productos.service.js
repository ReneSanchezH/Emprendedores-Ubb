// src/services/productos.service.js
import instance from "./axios.service";

// Obtener todos los productos
export const getProductos = async () => {
  try {
    const response = await instance.get("/productos");
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    } else {
      console.error("Error fetching productos:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching productos:", error);
    return [];
  }
};

// Obtener un producto por ID
export const getProductoById = async (id) => {
  try {
    const response = await instance.get(`/productos/${id}`);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    } else {
      console.error(`Error fetching producto con ID ${id}:`, response);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching producto con ID ${id}:`, error);
    return null;
  }
};

export const createProducto = async (producto) => {
  const formData = new FormData();
  formData.append('nombre', producto.nombre);
  formData.append('categoria', producto.categoria);
  formData.append('descripcion', producto.descripcion);
  formData.append('stock', producto.stock);
  formData.append('fotografia', producto.file);
  formData.append('emprendedorId', producto.emprendedorId); 

  try {
    const response = await instance.post("/productos/", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log("response producto.service: ", response);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    }
  } catch (error) {
    console.error("Error creando el producto:", error.response.data);
    return error.response;
  }
};
// Actualizar un producto
export const updateProducto = async (id, producto) => {
  try {
    const response = await instance.put(`/productos/${id}`, producto);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    }
  } catch (error) {
    console.error(`Error al actualizar producto con ID: ${id}:`, error);
  }
};

// Eliminar un producto
export const deleteProducto = async (id) => {
  try {
    const response = await instance.delete(`/productos/${id}`);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    }
  } catch (error) {
    console.error(`Error eliminando producto con ID ${id}:`, error);
  }
};
