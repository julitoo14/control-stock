import axios from 'axios';

const SaveProduct = async (product) => {
    try {
        const response = await axios.post('http://localhost:3900/api/productos', product)
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error('No se ha podido guardar el producto' + error)
    }
}

const updateProduct = async (product) => {
    try {
        const response = await axios.put(`http://localhost:3900/api/productos/${product._id}`, product)
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error('No se ha podido actualizar el producto')
    }
}

const getProduct = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3900/api/productos/${id}`)
        return response.data;
    } catch (error) {
        console.error(error)
        throw new Error('No se ha podido obtener el producto')
    }
}

const getProducts = async (filters) => {
    try {
        const response = await axios.get(`http://localhost:3900/api/productos?${filters}`)
        console.log(`http://localhost:3900/api/productos?${filters}`)
        return response.data.products
    } catch (error) {
        console.error(error)
        throw new Error('No se han podido obtener los productos')
    }
}

const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3900/api/productos/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error('No se ha podido eliminar el producto')
    }
}

export { getProducts, deleteProduct, SaveProduct, getProduct, updateProduct };