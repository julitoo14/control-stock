import dotenv from 'dotenv';
dotenv.config();
import { connection } from './config/database.js'; // Importa la función de conexión a la BD
connection();
//dependencias
import cors from 'cors';
import express from 'express';
import productRoutes from './routes/productos.routes.js';
import categoryRoutes from './routes/categorias.routes.js';

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/productos', productRoutes);
app.use('/api/categorias', categoryRoutes);


app.listen(port, () => console.log(`Stock app listening on port ${port}!`));

export default app;