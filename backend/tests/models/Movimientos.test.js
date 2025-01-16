import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import mongoose from 'mongoose';
import Movimiento from '../../models/Movimientos.js'; // Ajusta la ruta según tu proyecto
import Producto from '../../models/Productos.js'; // Asegúrate de tener el modelo Producto configurado
import { connection } from '../../config/database.js';

chai.use(chaiAsPromised);
const { expect } = chai;

before(async () => {
  await connection(); // Conecta a la base de datos usando tu configuración
});

beforeEach(async () => {
  await Movimiento.deleteMany({});
  await Producto.deleteMany({});
});

after(async () => {
  await mongoose.connection.close(); // Cierra la conexión después de las pruebas
});

describe('Movimiento Model', () => {
  it('debería crear un movimiento válido', async () => {
    const producto = await Producto.create({
      nombre: 'Laptop',
      precio: 1500,
      descripcion: 'Laptop de última generación',
      stock: 100,
      categoria: new mongoose.Types.ObjectId(), // ID ficticio para la categoría
      costo: 1000,
    });

    const movimiento = new Movimiento({
      producto: producto._id,
      tipo: 'entrada',
      cantidad: 10,
      descripcion: 'Ingreso de stock inicial',
    });

    const savedMovimiento = await movimiento.save();
    expect(savedMovimiento._id).to.exist;
    expect(savedMovimiento.tipo).to.equal('entrada');
    expect(savedMovimiento.cantidad).to.equal(10);
  });

  it('debería fallar si el tipo no es válido', async () => {
    const producto = await Producto.create({
      nombre: 'Laptop',
      precio: 1500,
      descripcion: 'Laptop de última generación',
      stock: 100,
      categoria: new mongoose.Types.ObjectId(), // ID ficticio para la categoría
      costo: 1000,
    });

    const movimiento = new Movimiento({
      producto: producto._id,
      tipo: 'transaccion', // Valor inválido
      cantidad: 5,
    });

    await expect(movimiento.save()).to.be.rejectedWith(/`transaccion` is not a valid enum value/);

  });

  it('debería fallar si falta el producto', async () => {
    const movimiento = new Movimiento({
      tipo: 'entrada',
      cantidad: 5,
      descripcion: 'Stock adicional',
    });

    await expect(movimiento.save()).to.be.rejectedWith('El producto es obligatorio');
  });

  it('debería fallar si falta el tipo', async () => {
    const producto = await Producto.create({
      nombre: 'Laptop',
      precio: 1500,
      descripcion: 'Laptop de última generación',
      stock: 100,
      categoria: new mongoose.Types.ObjectId(),
      costo: 1000,
    });

    const movimiento = new Movimiento({
      producto: producto._id,
      cantidad: 5,
    });

    await expect(movimiento.save()).to.be.rejectedWith('El tipo de movimiento es obligatorio');
  });

  it('debería fallar si la cantidad es menor que 1', async () => {
    const producto = await Producto.create({
      nombre: 'Laptop',
      precio: 1500,
      descripcion: 'Laptop de última generación',
      stock: 100,
      categoria: new mongoose.Types.ObjectId(),
      costo: 1000,
    });

    const movimiento = new Movimiento({
      producto: producto._id,
      tipo: 'entrada',
      cantidad: 0, // Cantidad inválida
    });

    await expect(movimiento.save()).to.be.rejectedWith('La cantidad debe ser al menos 1');
  });

  it('debería permitir que la descripción sea opcional', async () => {
    const producto = await Producto.create({
      nombre: 'Laptop',
      precio: 1500,
      descripcion: 'Laptop de última generación',
      stock: 100,
      categoria: new mongoose.Types.ObjectId(),
      costo: 1000,
    });

    const movimiento = new Movimiento({
      producto: producto._id,
      tipo: 'salida',
      cantidad: 5,
    });

    const savedMovimiento = await movimiento.save();
    expect(savedMovimiento.descripcion).to.be.null;
  });

  it('debería tener campos `createdAt` y `updatedAt` generados automáticamente', async () => {
    const producto = await Producto.create({
      nombre: 'Laptop',
      precio: 1500,
      descripcion: 'Laptop de última generación',
      stock: 100,
      categoria: new mongoose.Types.ObjectId(),
      costo: 1000,
    });

    const movimiento = new Movimiento({
      producto: producto._id,
      tipo: 'entrada',
      cantidad: 10,
    });

    const savedMovimiento = await movimiento.save();
    expect(savedMovimiento.createdAt).to.exist;
    expect(savedMovimiento.updatedAt).to.exist;
  });
});
