# Endpoints

## Products

## GET

### 1
**Descripción:** Obtener todos los productos registrados.
- **Método:** `GET`
- **URL:** `/api/productos/`
- **Autenticación:** Si

**Respuesta de ejemplo:**
```json
{
    productos:[
        {
            _id: "13231ads31"
            nombre: "iPhone 15",
            precio:1100,
            descripcion: "telefono marca Apple",
            sku: "IPH001",
            stock:20,
            categoria: {
                "_id": "6769bcff2e2087167f2b353d",
                "nombre": "Electrónica",
                "descripcion": "Productos electrónicos y gadgets"
            }
            costo:750,
            habilitado:true,
            cratedAt,
            updatedAt
        }
    ]
}
```

### 2
**Descripción:** Obtener un producto especifico por el id
- **Método:** `GET`
- **URL:** `/api/productos/:id`
- **Autenticación:** Si
Se debe enviar el id del producto en la peticion url
Ejemplo /api/productos/13231ads31

**Respuesta de ejemplo:**
```json
{
    producto:
        {
            _id: "13231ads31"
            nombre: "iPhone 15",
            precio:1100,
            descripcion: "telefono marca Apple",
            sku: "IPH001",
            stock:20,
            categoria: {
                "_id": "6769bcff2e2087167f2b353d",
                "nombre": "Electrónica",
                "descripcion": "Productos electrónicos y gadgets"
            }
            costo:750,
            habilitado:true,
            cratedAt,
            updatedAt
        }
}
```

### 3 
**Descripción:** Obtener un producto especifico por el id de la categoria
- **Método:** `GET`
- **URL:** `/api/productos/categoria/6769bcff2e2087167f2b353d`
- **Autenticación:** Si
Se debe enviar el id de la categoria en la peticion url
Ejemplo /api/productos/categoria/13231ads31
