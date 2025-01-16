import { Schema, model } from 'mongoose';
import Categoria from './Categorias.js';

const productSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
      trim: true,
    },
    sku: {
      type: String,
      unique: true,
      sparse: true, // Permite campos únicos opcionales
    },
    codigo_barras: {
      type: String,
      unique: true,
      sparse: true, // Permite que sea opcional
    },
    stock: {
      type: Number,
      required: [true, 'El stock es obligatorio'],
      min: [0, 'El stock no puede ser negativo'],
    },
    categoria: {
      type: Schema.Types.ObjectId,
      ref: Categoria,
      required: [true, 'La categoría es obligatoria'],
    },
    costo: {
      type: Number,
      required: [true, 'El costo es obligatorio'],
      min: [0, 'El costo no puede ser negativo'],
    },
    habilitado: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Agrega automáticamente createdAt y updatedAt
  }
);

// Índice para búsquedas rápidas por nombre
productSchema.index({ nombre: 1 });

export default model('Producto', productSchema);
