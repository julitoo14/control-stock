<template>
  <div class="p-2">
    <ProductsFilter :categories="categories" @fetch-products="fetchProducts" />
    <ProductsList :products="products" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getProducts } from '../services/products';
import { getCategories } from '../services/categories';
import ProductsList from '../components/ProductsList.vue';
import ProductsFilter from '../components/ProductsFilter.vue';

// Estado global
const products = ref([]);
const categories = ref([]);

// Cargar productos iniciales
onMounted(async () => {
  products.value = await getProducts();
  categories.value = await getCategories();
});

// Método para obtener productos filtrados 
const fetchProducts = async (filters) => {
  products.value = await getProducts(filters);
};
</script>
