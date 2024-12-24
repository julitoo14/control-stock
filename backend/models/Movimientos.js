const { Schema, model } = require('mongoose');

const movimientoSchema = new Schema(
  {
    producto: {
      type: Schema.Types.ObjectId, // Relación con el modelo de Producto
      ref: 'Product',
      required: [true, 'El producto es obligatorio'],
    },
    tipo: {
      type: String,
      enum: ['entrada', 'salida'], // Solo permite estos valores
      required: [true, 'El tipo de movimiento es obligatorio'],
    },
    cantidad: {
      type: Number,
      required: [true, 'La cantidad es obligatoria'],
      min: [1, 'La cantidad debe ser al menos 1'],
    },
    descripcion: {
      type: String,
      trim: true,
      default: null, // Información opcional sobre el movimiento
    },
  },
  {
    timestamps: true, // Maneja automáticamente createdAt y updatedAt
  }
);

module.exports = model('Movimiento', movimientoSchema);
