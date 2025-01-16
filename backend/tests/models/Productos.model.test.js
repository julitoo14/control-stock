import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import mongoose from 'mongoose';
import Producto from '../../models/Productos.js'; // Ajusta el path según la ubicación del modelo
import Categoria from '../../models/Categorias.js'; // Asegúrate de tener un modelo de categoría
import { connection } from '../../config/database.js';

chai.use(chaiAsPromised);
const { expect } = chai;

// Conexión a MongoDB antes de las pruebas
before(async () => {
  connection();
});

// Limpiar la base de datos antes de cada prueba
beforeEach(async () => {
  await Producto.deleteMany({});
  await Categoria.deleteMany({});
});

// Cerrar la conexión después de las pruebas
after(async () => {
  await mongoose.connection.close();
});

describe('Producto Model', () => {
  it('debería crear un producto válido', async () => {
    const categoria = await Categoria.create({ nombre: 'Electrónica' });
    const producto = new Producto({
      nombre: 'Smartphone',
      precio: 699,
      descripcion: 'Un smartphone de última generación',
      stock: 50,
      categoria: categoria._id,
      costo: 400,
    });

    const savedProducto = await producto.save();
    expect(savedProducto._id).to.exist;
    expect(savedProducto.nombre).to.equal('Smartphone');
  });

  it('debería fallar si falta un campo obligatorio', async () => {
    const producto = new Producto({
      precio: 699,
      descripcion: 'Un smartphone de última generación',
      stock: 50,
    });

    await expect(producto.save()).to.be.rejectedWith('El nombre es obligatorio');
  });

  it('debería fallar si el precio es negativo', async () => {
    const categoria = await Categoria.create({ nombre: 'Electrónica' });
    const producto = new Producto({
      nombre: 'Smartphone',
      precio: -699,
      descripcion: 'Un smartphone de última generación',
      stock: 50,
      categoria: categoria._id,
      costo: 400,
    });

    await expect(producto.save()).to.be.rejectedWith('El precio no puede ser negativo');
  });

  it('debería fallar si el stock es negativo', async () => {
    const categoria = await Categoria.create({ nombre: 'Electrónica' });
    const producto = new Producto({
      nombre: 'Smartphone',
      precio: 699,
      descripcion: 'Un smartphone de última generación',
      stock: -10,
      categoria: categoria._id,
      costo: 400,
    });

    await expect(producto.save()).to.be.rejectedWith('El stock no puede ser negativo');
  });

  it('debería permitir campos únicos opcionales (SKU y código de barras)', async () => {
    const categoria = await Categoria.create({ nombre: 'Electrónica' });
    const producto1 = new Producto({
      nombre: 'Smartphone',
      precio: 699,
      descripcion: 'Un smartphone de última generación',
      stock: 50,
      categoria: categoria._id,
      costo: 400,
      sku: 'SKU12345',
      codigo_barras: '1234567890123',
    });

    const producto2 = new Producto({
      nombre: 'Tablet',
      precio: 399,
      descripcion: 'Una tablet moderna',
      stock: 30,
      categoria: categoria._id,
      costo: 200,
    });

    await expect(producto1.save()).to.eventually.be.fulfilled;
    await expect(producto2.save()).to.eventually.be.fulfilled;
  });

  it('debería fallar si SKU o código de barras no son únicos', async () => {
    const categoria = await Categoria.create({ nombre: 'Electrónica' });
    const producto1 = new Producto({
      nombre: 'Smartphone',
      precio: 699,
      descripcion: 'Un smartphone de última generación',
      stock: 50,
      categoria: categoria._id,
      costo: 400,
      sku: 'SKU12345',
      codigo_barras: '1234567890123',
    });

    const producto2 = new Producto({
      nombre: 'Tablet',
      precio: 399,
      descripcion: 'Una tablet moderna',
      stock: 30,
      categoria: categoria._id,
      costo: 200,
      sku: 'SKU12345',
      codigo_barras: '1234567890123',
    });

    await producto1.save();
    await expect(producto2.save()).to.be.rejectedWith(/duplicate key/);
  });
});
