const mongoose = require('mongoose');
const connection = require('./database'); // Ajusta la ruta según tu proyecto
connection();
const Producto = require('../models/Productos'); // Ajusta la ruta según tu proyecto

// Función para agregar productos de prueba
async function agregarProductos() {
  const productos = [
    { nombre: 'Laptop Dell', descripcion: 'Laptop de 15 pulgadas', precio: 1200, costo: 1000, stock: 10, categoria: '6769bcff2e2087167f2b353d', sku: 'LAPDEL-001' },
    { nombre: 'Monitor Samsung', descripcion: 'Monitor 24 pulgadas Full HD', precio: 200, costo: 150, stock: 15, categoria: '6769bcff2e2087167f2b353d', sku: 'MONSAM-002' },
    { nombre: 'Teclado Mecánico', descripcion: 'Teclado con iluminación RGB', precio: 100, costo: 70, stock: 25, categoria: '6769bcff2e2087167f2b353e', sku: 'TECME-003' },
    { nombre: 'Mouse Logitech', descripcion: 'Mouse inalámbrico ergonómico', precio: 50, costo: 30, stock: 30, categoria: '6769bcff2e2087167f2b353e', sku: 'MOULO-004' },
    { nombre: 'Impresora HP', descripcion: 'Impresora multifunción', precio: 300, costo: 250, stock: 5, categoria: '6769bcff2e2087167f2b353f', sku: 'IMPHP-005' },
    { nombre: 'Teléfono Xiaomi', descripcion: 'Teléfono móvil con 128GB de almacenamiento', precio: 400, costo: 350, stock: 20, categoria: '6769bcff2e2087167f2b3540', sku: 'TELXIA-006' },
    { nombre: 'Tablet Samsung', descripcion: 'Tablet de 10 pulgadas', precio: 300, costo: 250, stock: 8, categoria: '6769bcff2e2087167f2b3540', sku: 'TABSAM-007' },
    { nombre: 'Auriculares Sony', descripcion: 'Auriculares con cancelación de ruido', precio: 150, costo: 120, stock: 18, categoria: '6769bcff2e2087167f2b353e', sku: 'AURSO-008' },
    { nombre: 'Smartwatch Huawei', descripcion: 'Reloj inteligente con monitor de salud', precio: 250, costo: 200, stock: 12, categoria: '6769bcff2e2087167f2b353e', sku: 'SMTHUA-009' },
    { nombre: 'Cámara Canon', descripcion: 'Cámara DSLR de 24MP', precio: 800, costo: 700, stock: 5, categoria: '6769bcff2e2087167f2b3541', sku: 'CAMCAN-010' },
    { nombre: 'Cargador Portátil', descripcion: 'Cargador de 10000mAh', precio: 50, costo: 35, stock: 40, categoria: '6769bcff2e2087167f2b353e', sku: 'CARPOR-011' },
    { nombre: 'Router TP-Link', descripcion: 'Router inalámbrico de alta velocidad', precio: 60, costo: 40, stock: 22, categoria: '6769bcff2e2087167f2b3542', sku: 'ROUTPL-012' },
    { nombre: 'SSD Kingston', descripcion: 'Disco SSD de 500GB', precio: 80, costo: 60, stock: 15, categoria: '6769bcff2e2087167f2b3543', sku: 'SSDKIN-013' },
    { nombre: 'Disco Duro Seagate', descripcion: 'Disco duro de 1TB', precio: 70, costo: 50, stock: 20, categoria: '6769bcff2e2087167f2b3543', sku: 'DISSEA-014' },
    { nombre: 'Tarjeta de Video NVIDIA', descripcion: 'Tarjeta gráfica RTX 3060', precio: 500, costo: 450, stock: 6, categoria: '6769bcff2e2087167f2b3544', sku: 'TARNVI-015' },
    { nombre: 'Fuente de Poder', descripcion: 'Fuente de poder de 600W', precio: 100, costo: 80, stock: 10, categoria: '6769bcff2e2087167f2b3544', sku: 'FUENPO-016' },
    { nombre: 'Placa Base ASUS', descripcion: 'Placa base para procesadores Intel', precio: 150, costo: 120, stock: 10, categoria: '6769bcff2e2087167f2b3544', sku: 'PLACAS-017' },
    { nombre: 'Micrófono Blue Yeti', descripcion: 'Micrófono USB para streaming', precio: 130, costo: 100, stock: 7, categoria: '6769bcff2e2087167f2b3545', sku: 'MICBLU-018' },
    { nombre: 'Parlantes JBL', descripcion: 'Parlantes Bluetooth', precio: 90, costo: 70, stock: 12, categoria: '6769bcff2e2087167f2b3545', sku: 'PARJBL-019' },
    { nombre: 'Webcam Logitech', descripcion: 'Cámara web Full HD', precio: 80, costo: 60, stock: 10, categoria: '6769bcff2e2087167f2b353e', sku: 'WEBLOG-020' },
  ];
  
      

  try {
    await Producto.insertMany(productos);
    console.log('Productos de prueba agregados con éxito');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error al agregar productos de prueba:', error);
    mongoose.disconnect();
  }
}

agregarProductos();
