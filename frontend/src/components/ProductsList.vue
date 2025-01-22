<template>
    <div>
      <table class="w-full border-collapse border text-gray-300  bg-gray-800">
        <thead class="bg-gray-900 text-gray-300 dark:bg-gray-700">
          <tr>
            <th class="p-2 border border-gray-700 dark:border-gray-600">Nombre</th>
            <th class="p-2 border border-gray-700 dark:border-gray-600">Descripción</th>
            <th class="p-2 border border-gray-700 dark:border-gray-600">SKU</th>
            <th class="p-2 border border-gray-700 dark:border-gray-600">Precio</th>
            <th class="p-2 border border-gray-700 dark:border-gray-600">Costo</th>
            <th class="p-2 border border-gray-700 dark:border-gray-600">Stock</th>
            <th class="p-2 border border-gray-700 dark:border-gray-600">Habilitado</th>
            <th class="p-2 border border-gray-700 dark:border-gray-600">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="props.products.length === 0">
            <td
              class="p-2 text-center font-bold border border-gray-600 dark:border-gray-600"
              colspan="8"
            >
              No se encontraron productos 😢
            </td>
          </tr>
          <tr
            v-for="product in props.products"
            :key="product._id"
            class="hover:bg-gray-700 dark:hover:bg-gray-700"
          >
            <td class="p-2 border border-gray-700 dark:border-gray-600">{{ product.nombre }}</td>
            <td class="p-2 border border-gray-700 dark:border-gray-600">{{ product.descripcion }}</td>
            <td class="p-2 border border-gray-700 dark:border-gray-600">{{ product.sku }}</td>
            <td class="p-2 border border-gray-700 dark:border-gray-600">{{ product.precio }}</td>
            <td class="p-2 border border-gray-700 dark:border-gray-600">{{ product.costo }}</td>
            <td class="p-2 border border-gray-700 dark:border-gray-600">{{ product.stock }}</td>
            <td class="p-2 border border-gray-700 dark:border-gray-600">{{ product.habilitado }}</td>
            <td class="p-2 border border-gray-700 dark:border-gray-600 flex gap-x-2">
              <button
                class="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600"
                @click="editProduct(product._id)"
              >
                Editar
              </button>
              <button
                class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600"
                @click="borrar(product._id)"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
    import { useRouter } from 'vue-router';
    import { deleteProduct } from '../services/products';
    const router = useRouter();
    const props = defineProps({
        products: Array,
    });

    const editProduct = (id) => {
        router.push(`/productos/editar/${id}`);
    };

    const borrar = async (id) => {
        const confirm = window.confirm('Estas seguro que queres borrar el producto?');
        if(confirm) {
            await deleteProduct(id);
            router.go();
        }
    };



  </script>
  