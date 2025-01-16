import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import mongoose from 'mongoose';
import Usuario from '../../models/Usuarios.js'; 
import bcrypt from 'bcrypt';
import { connection } from '../../config/database.js';

chai.use(chaiAsPromised);
const { expect } = chai;

before(async () => {
  await connection(); // Conecta a la base de datos 
});

beforeEach(async () => {
  await Usuario.deleteMany({}); // Limpia la colección de usuarios antes de cada prueba
});

after(async () => {
  await mongoose.connection.close(); // Cierra la conexión después de las pruebas
});

describe('Usuario Model', () => {
  it('debería crear un usuario válido', async () => {
    const usuario = new Usuario({
      username: 'testuser',
      password: 'securepassword',
    });

    const savedUsuario = await usuario.save();
    expect(savedUsuario._id).to.exist;
    expect(savedUsuario.username).to.equal('testuser');
  });

  it('debería encriptar la contraseña antes de guardar', async () => {
    const usuario = new Usuario({
      username: 'testuser',
      password: 'securepassword',
    });

    const savedUsuario = await usuario.save();
    expect(savedUsuario.password).to.not.equal('securepassword');
    expect(await bcrypt.compare('securepassword', savedUsuario.password)).to.be.true;
  });

  it('debería fallar si el nombre de usuario no es único', async () => {
    const usuario1 = new Usuario({
      username: 'testuser',
      password: 'securepassword',
    });

    const usuario2 = new Usuario({
      username: 'testuser',
      password: 'anotherpassword',
    });

    await usuario1.save();
    await expect(usuario2.save()).to.be.rejectedWith(/duplicate key/);
  });

  it('debería fallar si falta el nombre de usuario', async () => {
    const usuario = new Usuario({
      password: 'securepassword',
    });

    await expect(usuario.save()).to.be.rejectedWith('El nombre de usuario es obligatorio');
  });

  it('debería fallar si falta la contraseña', async () => {
    const usuario = new Usuario({
      username: 'testuser',
    });

    await expect(usuario.save()).to.be.rejectedWith('La contraseña es obligatoria');
  });

  it('debería permitir verificar la contraseña usando el método comparePassword', async () => {
    const usuario = new Usuario({
      username: 'testuser',
      password: 'securepassword',
    });

    const savedUsuario = await usuario.save();
    const isMatch = await savedUsuario.comparePassword('securepassword');
    expect(isMatch).to.be.true;

    const isNotMatch = await savedUsuario.comparePassword('wrongpassword');
    expect(isNotMatch).to.be.false;
  });

  it('debería actualizar la contraseña correctamente', async () => {
    const usuario = new Usuario({
      username: 'testuser',
      password: 'securepassword',
    });

    const savedUsuario = await usuario.save();
    savedUsuario.password = 'newsecurepassword';
    await savedUsuario.save();

    const isMatchOld = await savedUsuario.comparePassword('securepassword');
    expect(isMatchOld).to.be.false;

    const isMatchNew = await savedUsuario.comparePassword('newsecurepassword');
    expect(isMatchNew).to.be.true;
  });
});
