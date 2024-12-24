const { Schema, model } = require('mongoose');

const categoriaSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre de la categoría es obligatorio'],
      unique: true, // Evita categorías duplicadas
      trim: true,
    },
    descripcion: {
      type: String,
      default: null, // Descripción opcional
      trim: true,
    },
  },
  {
    timestamps: true, // Crea campos createdAt y updatedAt automáticamente
  }
);

module.exports = model('Categoria', categoriaSchema);
