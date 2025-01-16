import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import app from "../../index.js"; // Tu servidor Express
import Producto from "../../models/Productos.js"; // Modelo de producto
import Categoria from "../../models/Categorias.js";
import { connection as conn } from "../../config/database.js"; // Conexión a la base de datos

// Inicializamos Supertest
const request = supertest(app);

describe("Integration Tests - Product Routes", () => {
    before(async () => {
        // Conectamos a la base de datos antes de empezar
        await conn();
    });

    after(async () => {
        // Cerramos la conexión después de terminar
        await mongoose.disconnect();
    });

    afterEach(async () => {
        // Limpiamos la colección después de cada prueba
        await Producto.deleteMany({});
        await Categoria.deleteMany({});
    });

    describe("GET /api/products", () => {
        it("should return an empty array of products", async () => {
            // Realizamos la solicitud GET
            const res = await request.get("/api/productos");

            // Verificamos la respuesta
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("array");
            expect(res.body).to.have.lengthOf(0);
        });

        it("should return all products", async () => {
            // Creamos las categorias
            const categoria1 = new Categoria({ nombre: "Electrónica" });
            const categoria2 = new Categoria({ nombre: "Hogar" });
            // Creamos un producto de prueba
            const producto1 = new Producto({
                nombre: "Laptop",
                precio: 1500,
                descripcion: "Laptop de última generación",
                stock: 100,
                categoria: categoria1._id,
                costo: 1000,
                codigo_barras: "123456789",
                habilitado: true
            });
            const producto2 = new Producto({
                nombre: "Sofá",
                precio: 5000,
                descripcion: "Sofá de 3 cuerpos",
                stock: 50,
                categoria: categoria2._id,
                costo: 3000,
                sku: "SOF_123",
                habilitado: true
            });

            // Guardamos los productos en la base de datos
            await categoria1.save();
            await categoria2.save();
            await producto1.save();
            await producto2.save();

            // Realizamos la solicitud GET
            const res = await request.get("/api/productos");

            // Verificamos la respuesta
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("array");
            expect(res.body).to.have.lengthOf(2);
        });
    });

    describe('GET /api/productos/:id', () => {
        // Prueba para obtener un producto por su ID
        it('should return a product by its ID', async () => {
            // Creamos una categoria
            const categoria = new Categoria({ nombre: "Electrónica" });
            // Creamos un producto de prueba
            const producto = new Producto({
                nombre: "Laptop",
                precio: 1500,
                descripcion: "Laptop de última generación",
                stock: 100,
                categoria: categoria._id,
                costo: 1000,
                codigo_barras: "123456789",
                habilitado: true
            });

            // Guardamos la categoria y el producto en la base de datos
            await categoria.save();
            await producto.save();

            // Realizamos la solicitud GET
            const res = await request.get(`/api/productos/${producto._id}`);

            // Verificamos la respuesta
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("nombre", "Laptop");
            expect(res.body).to.have.property("precio", 1500);
        });

        // Prueba para obtener un producto que no existe
        it('should return a 404 if the product does not exist', async () => {
            // Realizamos la solicitud GET
            const idInexistente = "60b1f7d6f9f9b1f9b1f9b1f9";
            const res = await request.get(`/api/productos/${idInexistente}`);

            // Verificamos la respuesta
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property("error", "Producto no encontrado");
        });

    });

    describe('POST /api/productos', () => {

        it('should create a new product', async () => {
            // Creamos una categoria
            const categoria = new Categoria({ nombre: "Electrónica" });
            // Creamos un nuevo producto
            const newProduct = {
                nombre: "Laptop",
                precio: 1500,
                descripcion: "Laptop de última generación",
                stock: 100,
                categoria: categoria._id,
                costo: 1000,
                codigo_barras: "123456789",
                habilitado: true
            };

            // Guardamos la categoria en la base de datos
            await categoria.save();

            // Realizamos la solicitud POST
            const res = await request.post('/api/productos').send(newProduct);

            // Verificamos la respuesta
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property("nombre", "Laptop");
        });

        it('should return a 400 if missing data', async () => {
            // Creamos un producto sin nombre
            const categoria = new Categoria({ nombre: "Electrónica" });
            const newProduct = {
                precio: 1500,
                descripcion: "Laptop de última generación",
                categoria: categoria._id,
                stock: 100,
                costo: 1000,
                codigo_barras: "123456789",
                habilitado: true
            };

            await categoria.save();

            // Realizamos la solicitud POST
            const res = await request.post('/api/productos').send(newProduct);

            // Verificamos la respuesta
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property("errors");
        });

        it('should return a 400 if types are invalid', async () => {
            // Creamos un producto con un precio inválido
            const categoria = new Categoria({ nombre: "Electrónica" });
            const newProduct = {
                nombre: "Laptop",
                precio: "1500ad",
                descripcion: "Laptop de última generación",
                categoria: categoria._id,
                stock: 100,
                costo: 1000,
                codigo_barras: "123456789",
                habilitado: true
            };

            await categoria.save();

            // Realizamos la solicitud POST
            const res = await request.post('/api/productos').send(newProduct);

            // Verificamos la respuesta
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property("errors");
        });

    });

    describe('PUT /api/productos/:id', () => {
        // Prueba para actualizar un producto
        it('should update a product', async () => {
            // Creamos una categoria
            const categoria = new Categoria({ nombre: "Electrónica" });
            // Creamos un producto de prueba
            const producto = new Producto({
                nombre: "Laptop",
                precio: 1500,
                descripcion: "Laptop de última generación",
                stock: 100,
                categoria: categoria._id,
                costo: 1000,
                codigo_barras: "123456789",
                habilitado: true
            });

            // Guardamos la categoria y el producto en la base de datos
            await categoria.save();
            await producto.save();

            // Realizamos la solicitud PUT
            const res = await request.put(`/api/productos/${producto._id}`).send({ nombre: "Macbook" });

            // Verificamos la respuesta
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("nombre", "Macbook");
        });

        // Prueba para actualizar un producto que no existe
        it('should return a 404 if the product does not exist', async () => {
            // Realizamos la solicitud PUT
            const idInexistente = "60b1f7d6f9f9b1f9b1f9b1f9";
            const res = await request.put(`/api/productos/${idInexistente}`).send({ nombre: "Macbook" });

            // Verificamos la respuesta
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property("error", "Producto no encontrado");
        });

        it('should return a 400 if types are invalid', async () => {
            // Creamos una categoria
            const categoria = new Categoria({ nombre: "Electrónica" });
            // Creamos un producto de prueba
            const producto = new Producto({
                nombre: "Laptop",
                precio: 1500,
                descripcion: "Laptop de última generación",
                stock: 100,
                categoria: categoria._id,
                costo: 1000,
                codigo_barras: "123456789",
                habilitado: true
            });

            // Guardamos la categoria y el producto en la base de datos
            await categoria.save();
            await producto.save();

            // Realizamos la solicitud PUT
            const res = await request.put(`/api/productos/${producto._id}`).send({ precio: "1500ad" });

            // Verificamos la respuesta
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property("errors");
        });

    });

    describe('DELETE /api/productos/:id', () => {
        // Prueba para eliminar un producto
        it('should delete a product', async () => {
            // Creamos una categoria
            const categoria = new Categoria({ nombre: "Electrónica" });
            // Creamos un producto de prueba
            const producto = new Producto({
                nombre: "Laptop",
                precio: 1500,
                descripcion: "Laptop de última generación",
                stock: 100,
                categoria: categoria._id,
                costo: 1000,
                codigo_barras: "123456789",
                habilitado: true
            });

            // Guardamos la categoria y el producto en la base de datos
            await categoria.save();
            await producto.save();

            // Realizamos la solicitud DELETE
            const res = await request.delete(`/api/productos/${producto._id}`);

            // Verificamos la respuesta
            expect(res.status).to.equal(204);
            expect(res.body).to.be.empty;
        });

        // Prueba para eliminar un producto que no existe
        it('should return a 404 if the product does not exist', async () => {
            // Realizamos la solicitud DELETE
            const idInexistente = "60b1f7d6f9f9b1f9b1f9b1f9";
            const res = await request.delete(`/api/productos/${idInexistente}`);

            // Verificamos la respuesta
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property("error", "Producto no encontrado");
        });

    });

});
