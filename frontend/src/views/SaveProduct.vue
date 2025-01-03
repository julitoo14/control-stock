<template>
    <div class="p-2">
        <h1 class="text-2xl font-bold text-center">Agregar producto</h1>
        <ProductForm @save-product="SaveAndRedirect"/>
    </div>
</template>

<script setup>
import ProductForm from '../components/ProductForm.vue';
import { SaveProduct } from '../services/products';
import { useRouter } from 'vue-router';
const router = useRouter();

const SaveAndRedirect = async (product) => {
    try {
        await SaveProduct(product);
        router.push('/productos');
    } catch (error) {
        console.error(error);
    }
}

</script>