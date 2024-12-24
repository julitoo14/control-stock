# Endpoints: API de Productos

## **GET**

### 1. Obtener todos los productos registrados
**Descripción:** Obtener todos los productos registrados.
- **Método:** `GET`
- **URL:** `/api/productos/`
- **Autenticación:** Sí

**Respuesta de ejemplo:**
```json
{
  "productos": [
    {
      "_id": "13231ads31",
      "nombre": "iPhone 15",
      "precio": 1100,
      "descripcion": "telefono marca Apple",
      "sku": "IPH001",
      "stock": 20,
      "categoria": {
        "_id": "6769bcff2e2087167f2b353d",
        "nombre": "Electrónica",
        "descripcion": "Productos electrónicos y gadgets"
      },
      "costo": 750,
      "habilitado": true,
      "createdAt": "2024-12-23T12:00:00Z",
      "updatedAt": "2024-12-23T12:30:00Z"
    }
  ]
}
```

### 2. Obtener un producto específico por ID
**Descripción:** Obtener un producto específico por el ID.
- **Método:** `GET`
- **URL:** `/api/productos/:id`
- **Autenticación:** Sí

**Respuesta de ejemplo:**
```json
{
  "producto": {
    "_id": "13231ads31",
    "nombre": "iPhone 15",
    "precio": 1100,
    "descripcion": "telefono marca Apple",
    "sku": "IPH001",
    "stock": 20,
    "categoria": {
      "_id": "6769bcff2e2087167f2b353d",
      "nombre": "Electrónica",
      "descripcion": "Productos electrónicos y gadgets"
    },
    "costo": 750,
    "habilitado": true,
    "createdAt": "2024-12-23T12:00:00Z",
    "updatedAt": "2024-12-23T12:30:00Z"
  }
}
```

### 3. Obtener productos por categoría
**Descripción:** Obtener productos específicos por el ID de la categoría.
- **Método:** `GET`
- **URL:** `/api/productos/categoria/:id`
- **Autenticación:** Sí

**Respuesta de ejemplo:**
```json
{
  "productos": [
    {
      "_id": "13231ads31",
      "nombre": "iPhone 15",
      "precio": 1100,
      "descripcion": "telefono marca Apple",
      "sku": "IPH001",
      "stock": 20,
      "categoria": {
        "_id": "6769bcff2e2087167f2b353d",
        "nombre": "Electrónica",
        "descripcion": "Productos electrónicos y gadgets"
      },
      "costo": 750,
      "habilitado": true,
      "createdAt": "2024-12-23T12:00:00Z",
      "updatedAt": "2024-12-23T12:30:00Z"
    }
  ]
}
```

## **POST**

### 4. Crear un nuevo producto
**Descripción:** Registrar un nuevo producto.
- **Método:** `POST`
- **URL:** `/api/productos/`
- **Autenticación:** Sí

**Cuerpo de la solicitud:**
```json
{
  "nombre": "iPhone 15",
  "precio": 1100,
  "descripcion": "telefono marca Apple",
  "sku": "IPH001",
  "stock": 20,
  "categoria": "6769bcff2e2087167f2b353d",
  "costo": 750,
  "habilitado": true
}
```

**Respuesta de ejemplo:**
```json
{
  "producto": {
    "_id": "13231ads31",
    "nombre": "iPhone 15",
    "precio": 1100,
    "descripcion": "telefono marca Apple",
    "sku": "IPH001",
    "stock": 20,
    "categoria": "6769bcff2e2087167f2b353d",
    "costo": 750,
    "habilitado": true,
    "createdAt": "2024-12-23T12:00:00Z",
    "updatedAt": "2024-12-23T12:30:00Z"
  }
}
```

## **PUT**

### 5. Actualizar un producto
**Descripción:** Actualizar un producto existente.
- **Método:** `PUT`
- **URL:** `/api/productos/:id`
- **Autenticación:** Sí

**Cuerpo de la solicitud:**
```json
{
  "nombre": "iPhone 15 Pro",
  "precio": 1200,
  "descripcion": "telefono marca Apple actualizado",
  "sku": "IPH001",
  "stock": 15,
  "categoria": "6769bcff2e2087167f2b353d",
  "costo": 800,
  "habilitado": true
}
```

**Respuesta de ejemplo:**
```json
{
  "producto": {
    "_id": "13231ads31",
    "nombre": "iPhone 15 Pro",
    "precio": 1200,
    "descripcion": "telefono marca Apple actualizado",
    "sku": "IPH001",
    "stock": 15,
    "categoria": "6769bcff2e2087167f2b353d",
    "costo": 800,
    "habilitado": true,
    "createdAt": "2024-12-23T12:00:00Z",
    "updatedAt": "2024-12-23T12:30:00Z"
  }
}
```

## **DELETE**

### 6. Eliminar un producto
**Descripción:** Eliminar un producto existente.
- **Método:** `DELETE`
- **URL:** `/api/productos/:id`
- **Autenticación:** Sí

**Respuesta de ejemplo:**
```json
{
  "message": "Producto eliminado exitosamente."
}
```
