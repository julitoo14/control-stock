import { expect } from "chai"; // Asegúrate de importar esto
import sinon from "sinon";
import request from "supertest"; // Para simular solicitudes HTTP
import app from "../../index.js"; // La instancia de tu aplicación Express
import Producto from "../../models/Productos.js"; // Modelo que estás probando

describe("Product Routes", () => {
    afterEach(() => {
        sinon.restore(); // Restaura los stubs después de cada prueba
    });

    describe("GET /", () => {
        // Prueba unitaria para la ruta GET /api/productos que obtiene todos los productos
        it("should return all products", async () => {
            sinon.stub(Producto, "find").returns({
                skip: sinon.stub().returnsThis(),
                limit: sinon.stub().resolves([
                    {
                        nombre: "Producto 1",
                        precio: 100,
                        descripcion: "Descripción del producto 1",
                        stock: 20,
                        categoria: "mocked_categoria_id",
                        costo: 50,
                        habilitado: true,
                    },
                    {
                        nombre: "Producto 2",
                        precio: 200,
                        descripcion: "Descripción del producto 2",
                        stock: 15,
                        categoria: "mocked_categoria_id",
                        costo: 100,
                        habilitado: true,
                    },
                ]),
            });

            const response = await request(app).get("/api/productos");

            expect(response.status).to.equal(200); // Usamos expect para validar
            expect(response.body).to.be.an("array");
            expect(response.body.length).to.equal(2);
        });
    });

    // Prueba unitaria para la ruta GET /api/productos/:id que obtiene un producto por ID
    describe("GET /:id", () => {
        it("should return a product by ID", async () => {
            const mockProduct = {
                _id: "mocked_id",
                nombre: "Producto 1",
                precio: 100,
                descripcion: "Descripción del producto 1",
                stock: 20,
                categoria: "mocked_categoria_id",
                costo: 50,
                habilitado: true,
            };
            sinon.stub(Producto, "findById").resolves(mockProduct);

            const response = await request(app).get("/api/productos/mocked_id");

            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal(mockProduct);
        });

        it("should return 404 if the product is not found", async () => {
            sinon.stub(Producto, "findById").resolves(null);

            const response = await request(app).get(
                "/api/productos/non_existent_id"
            );

            expect(response.status).to.equal(404);
            expect(response.body).to.have.property(
                "error",
                "Producto no encontrado"
            );
        });
    });
    // Prueba unitaria para la ruta POST /api/productos que crea un nuevo producto
    describe("POST /api/products", () => {
        it("should create a new product", async () => {
            const newProduct = {
                nombre: "Producto 1",
                precio: 100,
                descripcion: "Descripción del producto 1",
                stock: 20,
                categoria: "507f191e810c19729de860ea",
                costo: 50,
            };

            const response = await request(app)
                .post("/api/productos")
                .send(newProduct)
                .set("Content-Type", "application/json"); // Envía datos correctamente

            expect(response.status).to.equal(201);
            expect(response.body).to.include({ nombre: "Producto 1" });
        });
    });

    it("should return 400 for invalid data", async () => {
        const invalidProduct = { precio: -100, stock: "invalid" };
        const response = await request(app)
            .post("/api/productos")
            .send(invalidProduct);

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("errors");
    });
    // Prueba unitaria para la ruta PUT /api/productos/:id que actualiza un producto por ID
    describe("PUT /:id", () => {
        it("should update a product by ID", async () => {
            const updatedProduct = {
                nombre: "Producto 1",
                precio: 100,
                descripcion: "Descripción del producto 1",
                stock: 20,
                categoria: "507f191e810c19729de860ea",
                costo: 50,
            };

            sinon.stub(Producto, "findByIdAndUpdate").resolves(updatedProduct);

            const response = await request(app)
                .put("/api/productos/mocked_id")
                .send(updatedProduct)
                .set("Content-Type", "application/json");

            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal(updatedProduct);
        });
    });
    // Prueba unitaria para la ruta DELETE /api/productos/:id que elimina un producto por ID
    describe("DELETE /:id", () => {
        it("should delete a product by ID", async () => {
            sinon.stub(Producto, "findByIdAndDelete").resolves();

            const response = await request(app).delete(
                "/api/productos/mocked_id"
            );

            expect(response.status).to.equal(204);
            expect(response.body).to.be.empty;
        });
    });
});
