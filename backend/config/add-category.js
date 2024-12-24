const mongoose = require('mongoose');
const connection = require('./database'); // Ajusta la ruta según tu proyecto
connection();
const Categoria = require('../models/Categorias'); // Ajusta la ruta según tu proyecto


async function agregarCategorias() {
    const categorias = [
      { nombre: 'Electrónica', descripcion: 'Productos electrónicos y gadgets' },
      { nombre: 'Accesorios', descripcion: 'Accesorios diversos para tecnología' },
      { nombre: 'Oficina', descripcion: 'Materiales y equipos de oficina' },
      { nombre: 'Teléfonos', descripcion: 'Teléfonos móviles y accesorios' },
      { nombre: 'Fotografía', descripcion: 'Cámaras y equipos relacionados' },
      { nombre: 'Redes', descripcion: 'Equipos y accesorios de red' },
      { nombre: 'Almacenamiento', descripcion: 'Dispositivos de almacenamiento' },
      { nombre: 'Hardware', descripcion: 'Componentes para computadoras' },
      { nombre: 'Audio', descripcion: 'Productos de audio y sonido' },
    ];
  
    try {
      const result = await Categoria.insertMany(categorias);
      console.log('Categorías agregadas con éxito:', result.map(cat => ({
        id: cat._id,
        nombre: cat.nombre,
      })));
      mongoose.disconnect();
    } catch (error) {
      console.error('Error al agregar categorías:', error);
      mongoose.disconnect();
    }
  }

  agregarCategorias();