import { body } from 'express-validator';

// Validador para crear un producto (requiere todos los campos)
const validateSaveProduct = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isString()
    .withMessage('El nombre debe ser un texto'),
  body('precio')
    .notEmpty()
    .withMessage('El precio es obligatorio')
    .isFloat({ min: 0 })
    .withMessage('El precio no puede ser negativo'),
  body('descripcion')
    .notEmpty()
    .withMessage('La descripción es obligatoria')
    .isString()
    .withMessage('La descripción debe ser un texto'),
  body('sku')
    .optional()
    .isString()
    .withMessage('El SKU debe ser un texto'),
  body('codigo_barras')
    .optional()
    .isString()
    .withMessage('El código de barras debe ser un texto'),
  body('stock')
    .notEmpty()
    .withMessage('El stock es obligatorio')
    .isInt({ min: 0 })
    .withMessage('El stock no puede ser negativo'),
  body('categoria')
    .notEmpty()
    .withMessage('La categoría es obligatoria')
    .isMongoId()
    .withMessage('La categoría debe ser un ID válido'),
  body('costo')
    .notEmpty()
    .withMessage('El costo es obligatorio')
    .isFloat({ min: 0 })
    .withMessage('El costo no puede ser negativo'),
  body('habilitado')
    .optional()
    .isBoolean()
    .withMessage('El estado de habilitado debe ser un valor booleano'),
];

// Validador para actualizar un producto (requiere al menos un campo)
const validateUpdateProduct = [
  body()
    .custom((value, { req }) => {
      if (!Object.keys(req.body).length) {
        throw new Error('Debe enviar al menos un campo para actualizar');
      }
      return true;
    })
    .withMessage('Debe enviar al menos un campo para actualizar'),
  body('nombre')
    .optional()
    .isString()
    .withMessage('El nombre debe ser un texto'),
  body('precio')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El precio no puede ser negativo'),
  body('descripcion')
    .optional()
    .isString()
    .withMessage('La descripción debe ser un texto'),
  body('sku')
    .optional()
    .isString()
    .withMessage('El SKU debe ser un texto'),
  body('codigo_barras')
    .optional()
    .isString()
    .withMessage('El código de barras debe ser un texto'),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El stock no puede ser negativo'),
  body('categoria')
    .optional()
    .isMongoId()
    .withMessage('La categoría debe ser un ID válido'),
  body('costo')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El costo no puede ser negativo'),
  body('habilitado')
    .optional()
    .isBoolean()
    .withMessage('El estado de habilitado debe ser un valor booleano'),
];

export { validateSaveProduct, validateUpdateProduct };
