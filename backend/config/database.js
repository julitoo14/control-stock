const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Carga las variables de entorno
dotenv.config();

let databaseName = process.env.DATABASE_NAME;

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
  databaseName = process.env.TEST_DATABASE_NAME; // Usa la base de datos de pruebas si está en modo test
}


const connection = async () => {
  try {
    await mongoose.connect(
      `${process.env.DB_URI_BASE}`,
      {
        dbName: databaseName,
      }
    );

    console.log('Connected to Database: ' + databaseName);
  } catch (error) {
    console.error(error);
    throw new Error('No se ha establecido la conexión a la base de datos');
  }
};

module.exports = connection;