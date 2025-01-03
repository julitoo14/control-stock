<template>
    <div class="p-2">
        <h1 class="text-2xl font-bold text-center">Editar producto</h1>
        <ProductForm @save-product="updateAndRedirect" :product="product"/>
    </div>
</template>

<script setup>
import ProductForm from '../components/ProductForm.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getProduct, updateProduct} from '../services/products';
const id = useRoute().params.id;
const router = useRouter();
const product = ref(null);

onMounted(async () => {
    if(id) {
        product.value = await getProduct(id);
    }
});

const updateAndRedirect = async (product) => {
    try {
        await updateProduct(product);
        router.push('/productos');
    } catch (error) {
        console.error(error);
    }
}
</script>