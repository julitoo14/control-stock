import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Carga las variables de entorno
dotenv.config();

let databaseName = process.env.DATABASE_NAME;

if (process.env.NODE_ENV === "test") {
  databaseName = process.env.TEST_DATABASE_NAME;
} else if (process.env.NODE_ENV === "development") {
  databaseName = process.env.DEVELOPMENT_DATABASE_NAME;
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

export {connection};