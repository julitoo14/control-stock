import axios from 'axios';

const getCategories = async () => {
    try {
        const response = await axios.get('http://localhost:3900/api/categorias')
        return response.data;
    } catch (error) {
        console.error(error)
        throw new Error('No se han podido obtener las categorías')
    }
}

export { getCategories }