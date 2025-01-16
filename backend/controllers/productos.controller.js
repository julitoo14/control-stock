import Producto from "../models/Productos.js";

// guardamos el producto en la base de datos
const saveProduct = async (req, res) => {
  const { body } = req;
  const product = new Producto(body);
  try {
    const savedProduct = await product.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedProduct = await Producto.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Producto.findByIdAndDelete(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// obtenemos los productos filtrados
const getAllOrFilteredProducts = async (req, res) => {
    // obtenemos los parametros de la query
  const {
    categoria,
    precioMin,
    precioMax,
    search,
    limit = 20,
    page = 1,
  } = req.query;
  // creamos un objeto vacio para almacenar los filtros
  const query = {};
  try {
    // si existen los filtros los almacenamos en la query
    if (categoria) query.categoria = categoria;
    if (precioMin) query.precio = { ...query.precio, $gte: Number(precioMin) };
    if (precioMax) query.precio = { ...query.precio, $lte: Number(precioMax) };
    if (search) query.nombre = { $regex: search, $options: "i" };
    
    // limitamos la cantidad de productos a mostrar 
    const limitNum = Math.min(Number(limit), 100);
    // calculamos el salto de los productos
    const skip = (page - 1) * limitNum;
    // buscamos los productos en la base de datos
    const productos = await Producto.find(query).skip(skip).limit(limitNum);
    return res.status(200).json(productos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Producto.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    return res.status(200).json(product);
    } catch (error) {
    return res.status(500).json({ error: error.message });
    }
}

export { saveProduct, updateProduct, getAllOrFilteredProducts, deleteProduct, getProductById };
