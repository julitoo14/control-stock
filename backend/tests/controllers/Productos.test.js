//dependencias
import sinon from "sinon";
import * as chai from "chai";
import Producto from "../../models/Productos.js";
import {
  saveProduct,
  updateProduct,
  deleteProduct,
  getAllOrFilteredProducts,
  getProductById,
} from "../../controllers/productos.controller.js";

const { expect } = chai;

const mockResponse = () => ({
  status: sinon.stub().returnsThis(), // simulamos el método status y permite encadenar llamadas
  json: sinon.stub(), // simulamos el método json
  send: sinon.stub(), // simulamos el método send
});

describe("Product Controller", () => {
  afterEach(() => sinon.restore());

  describe("getAllOrFilteredProducts Controller", () => {
    it("should return all products if no filters are provided", async () => {
      const req = { query: {} }; // Sin filtros
      const res = mockResponse();

      const mockProducts = [
        { nombre: "Producto 1", precio: 100 },
        { nombre: "Producto 2", precio: 200 },
      ];

      sinon.stub(Producto, "find").returns({
        skip: sinon.stub().returnsThis(),
        limit: sinon.stub().resolves(mockProducts),
      });

      await getAllOrFilteredProducts(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockProducts)).to.be.true;
    });

    it("should apply filters and return filtered products", async () => {
      const req = {
        query: { precioMin: 50, precioMax: 150, search: "Producto" },
      };
      const res = mockResponse();

      const mockProducts = [{ nombre: "Producto 1", precio: 100 }];

      sinon.stub(Producto, "find").callsFake((query) => {
        expect(query).to.deep.equal({
          precio: { $gte: 50, $lte: 150 },
          nombre: { $regex: "Producto", $options: "i" },
        });
        return {
          skip: sinon.stub().returnsThis(),
          limit: sinon.stub().resolves(mockProducts),
        };
      });

      await getAllOrFilteredProducts(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockProducts)).to.be.true;
    });

    it("should handle server errors", async () => {
      const req = { query: {} };
      const res = mockResponse();

      sinon.stub(Producto, "find").throws(new Error("Database error"));

      await getAllOrFilteredProducts(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(sinon.match.has("error", "Database error"))).to
        .be.true;
    });
  });

  describe("getProductById Controller", () => {
    it("should return the product with the given ID", async () => {
      const req = { params: { id: "mocked_id" } };
      const res = mockResponse();

      const mockProduct = { _id: "mocked_id", name: "Product" };

      sinon.stub(Producto, "findById").resolves(mockProduct);

      await getProductById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockProduct)).to.be.true;
    });

    it("should return 404 if the product is not found", async () => {
      const req = { params: { id: "mocked_id" } };
      const res = mockResponse();

      sinon.stub(Producto, "findById").resolves(null);

      await getProductById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(
        res.json.calledWith(sinon.match.has("error", "Producto no encontrado"))
      ).to.be.true;
    });
  });

  describe("crateProduct Controller", () => {
    // Test para verificar que se cree un producto
    it("should return 200 and the created product", async () => {
      // Simula un ObjectId para la categoría
      const mockedCategoryId = "mocked_category_id";
      // Simula el request
      const req = {
        body: {
          name: "Product",
          descripcion: "Description",
          precio: 100,
          stock: 10,
          codigo_barras: "123456",
          sku: "123456",
          categoria: mockedCategoryId, // Usa el ID simulado
          costo: 50,
        },
      };
      // Simula el response
      const res = mockResponse();

      // Simula el producto creado con el ObjectId mockeado
      const savedProduct = { ...req.body, _id: "mocked_id" };

      // Stub para el método save del modelo Producto
      const saveStub = sinon
        .stub(Producto.prototype, "save")
        .resolves(savedProduct);

      // Llama al controlador con el request y response mockeados
      await saveProduct(req, res);

      // Verificaciones
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(sinon.match(savedProduct))).to.be.true;
      expect(saveStub.calledOnce).to.be.true;
    });

    // Test para verificar que se retorne un error 500 si ocurre un error
    it("should return 500 if an error occurs", async () => {
      const req = { body: {} };
      const res = mockResponse();

      sinon
        .stub(Producto.prototype, "save")
        .rejects(new Error("Database error"));

      await saveProduct(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(sinon.match.has("error"))).to.be.true;
    });
  });

  describe("updateProduct Controller", () => {
    // Test para verificar que se actualice un producto
    it("should return 200 and the updated product", async () => {
      // Simula el request
      const req = { params: { id: "mocked_id" }, body: { name: "Product" } };
      // Simula el response
      const res = mockResponse();
      // Simula el producto actualizado
      const updatedProduct = { _id: "mocked_id", name: "Updated Product" };
      // Stub para el método findByIdAndUpdate del modelo Producto
      sinon.stub(Producto, "findByIdAndUpdate").resolves(updatedProduct);
      // Llama al controlador con el request y response mockeados
      await updateProduct(req, res);
      // Verificaciones
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match(updatedProduct))).to.be.true;
    });
    // Test para verificar que se retorne un error 500 si ocurre un error
    it("should return 500 if an error occurs", async () => {
      const req = { params: { id: "mocked_id" }, body: {} };
      const res = mockResponse();

      sinon
        .stub(Producto, "findByIdAndUpdate")
        .rejects(new Error("Database error"));

      await updateProduct(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(sinon.match.has("error"))).to.be.true;
    });
  });

  describe("deleteProduct Controller", () => {
    it("should return 204 when the product is deleted", async () => {
      // Simula el request
      const req = { params: { id: "mocked_id" } };
      // Simula el response
      const res = mockResponse();

      // Stub para el método findByIdAndDelete del modelo Producto
      const findByIdAndDeleteStub = sinon
        .stub(Producto, "findByIdAndDelete")
        .resolves({ _id: "mocked_id" });

      // Llama al controlador con el request y response mockeados
      await deleteProduct(req, res);

      // Verificaciones
      expect(res.status.calledWith(204)).to.be.true; // Verifica el estado 204
      expect(res.send.calledOnce).to.be.true; // Verifica que se envió la respuesta
      expect(findByIdAndDeleteStub.calledOnceWith("mocked_id")).to.be.true; // Verifica que se eliminó el producto con el ID correcto
    });

    // Test para verificar que se retorne un error 500 si ocurre un error
    it("should return 500 if an error occurs", async () => {
      const req = { params: { id: "mocked_id" } };
      const res = mockResponse();

      // Stub para simular un error en findByIdAndDelete
      sinon
        .stub(Producto, "findByIdAndDelete")
        .rejects(new Error("Database error"));

      // Llama al controlador
      await deleteProduct(req, res);

      // Verificaciones
      expect(res.status.calledWith(500)).to.be.true; // Verifica el estado 500
      expect(res.json.calledWith(sinon.match.has("error"))).to.be.true; // Verifica que se devuelve el error en JSON
    });
  });
});
