import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import mongoose from 'mongoose';
import Categoria from '../../models/Categorias.js'; // Ajusta la ruta según tu proyecto
import { connection } from '../../config/database.js';

chai.use(chaiAsPromised);
const { expect } = chai;

before(async () => {
  await connection(); // Conecta a la base de datos usando tu configuración
});

beforeEach(async () => {
  await Categoria.deleteMany({}); // Limpia la colección de categorías antes de cada prueba
});

after(async () => {
  await mongoose.connection.close(); // Cierra la conexión después de las pruebas
});

describe('Categoria Model', () => {
  it('debería crear una categoría válida', async () => {
    const categoria = new Categoria({
      nombre: 'Electrónica',
      descripcion: 'Categoría de productos electrónicos',
    });

    const savedCategoria = await categoria.save();
    expect(savedCategoria._id).to.exist;
    expect(savedCategoria.nombre).to.equal('Electrónica');
    expect(savedCategoria.descripcion).to.equal('Categoría de productos electrónicos');
  });

  it('debería fallar si el nombre es único y se intenta duplicar', async () => {
    const categoria1 = new Categoria({
      nombre: 'Electrónica',
    });

    const categoria2 = new Categoria({
      nombre: 'Electrónica',
    });

    await categoria1.save();
    await expect(categoria2.save()).to.be.rejectedWith(/duplicate key/);
  });

  it('debería fallar si el nombre está vacío', async () => {
    const categoria = new Categoria({
      nombre: '',
    });

    await expect(categoria.save()).to.be.rejectedWith('El nombre de la categoría es obligatorio');
  });

  it('debería permitir que la descripción sea opcional', async () => {
    const categoria = new Categoria({
      nombre: 'Hogar',
    });

    const savedCategoria = await categoria.save();
    expect(savedCategoria.descripcion).to.be.null;
  });

  it('debería recortar espacios innecesarios en el nombre', async () => {
    const categoria = new Categoria({
      nombre: '   Deportes   ',
    });

    const savedCategoria = await categoria.save();
    expect(savedCategoria.nombre).to.equal('Deportes');
  });

  it('debería tener campos `createdAt` y `updatedAt` generados automáticamente', async () => {
    const categoria = new Categoria({
      nombre: 'Moda',
    });

    const savedCategoria = await categoria.save();
    expect(savedCategoria.createdAt).to.exist;
    expect(savedCategoria.updatedAt).to.exist;
  });
});
