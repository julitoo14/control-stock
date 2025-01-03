<template>
    <form class="">
        <div class="flex flex-col w-full md:w-2/4 m-auto gap-y-4">
            <div>
                <label for="nombre" class="block">Nombre</label>
                <input v-model="nombre" type="text" id="nombre" name="nombre" class="w-full bg-gray-200 border-gray-900 rounded-sm p-2" />
            </div>
            <div>
                <label for="descripcion" class="block">Descripción</label>
                <textarea v-model="descripcion" id="descripcion" name="descripcion" class="w-full bg-gray-200 border-gray-900 rounded-sm p-2"></textarea>
            </div>
            <div>
                <label for="categoria" class="block">Categoría</label>
                <select v-model="categoria" id="categoria" name="categoria" class="w-full bg-gray-200 border-gray-900 rounded-sm p-2">
                    <option value="">Selecciona una categoría</option>
                    <option v-for="category in categorias" :key="category._id" :value="category._id">
                        {{ category.nombre }}
                    </option>
                </select>
            </div>
            <div>
                <label for="sku" class="block">SKU</label>
                <input v-model="sku" type="text" id="sku" name="sku" class="w-full bg-gray-200 border-gray-900 rounded-sm p-2" />
            </div>
            <div>
                <label for="precio" class="block">Precio</label>
                <input v-model="precio" type="number" id="precio" name="precio" class="w-full bg-gray-200 border-gray-900 rounded-sm p-2" />
            </div>
            <div>
                <label for="costo" class="block">Costo</label>
                <input v-model="costo" type="number" id="costo" name="costo" class="w-full bg-gray-200 border-gray-900 rounded-sm p-2" />
            </div>
            <div>
                <label for="stock" class="block">Stock</label>
                <input v-model="stock" type="number" id="stock" name="stock" class="w-full bg-gray-200 border-gray-900 rounded-sm p-2" />
            </div>
            <div>
                <label for="habilitado" class="block">habilitado</label>
                <input v-model="habilitado" type="checkbox" id="habilitado" name="habilitado" class=" bg-gray-200 border-gray-900 rounded-sm p-2" />
            </div>
            <div>
                <button @click.prevent="save" type="submit" class="p-2 bg-gray-800 text-white">Guardar Producto</button>
            </div>
        </div>
    </form>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import { getCategories } from '../services/categories';

const emit = defineEmits(['save-product']);
const props = defineProps({
    product: Object,
});

// Variables reactivas para el formulario
const categorias = ref([]);
const categoria = ref('');
const nombre = ref('');
const descripcion = ref('');
const sku = ref('');
const precio = ref(0);
const costo = ref(0);
const stock = ref(0);
const habilitado = ref(true);

// Inicializar valores al montar
onMounted(async () => {
    if (props.product) {
        updateForm(props.product);
    }
    // Cargar categorías
     categorias.value = await getCategories();
     console.log(categorias.value);
});

// Actualizar valores reactivamente cuando cambia el prop
watch(() => props.product, (newProduct) => {
    if (newProduct) {
        updateForm(newProduct);
    }
});

// Función para actualizar el formulario
const updateForm = (product) => {
    nombre.value = product.nombre || '';
    descripcion.value = product.descripcion || '';
    categoria.value = product.categoria?._id || null;
    sku.value = product.sku || '';
    precio.value = product.precio || 0;
    costo.value = product.costo || 0;
    stock.value = product.stock || 0;
    habilitado.value = product.habilitado || true;
};

// Función para guardar el producto
const save = () => {
    const product = {
        _id: props.product?._id,
        nombre: nombre.value,
        descripcion: descripcion.value,
        sku: sku.value,
        precio: precio.value,
        costo: costo.value,
        stock: stock.value,
        categoria: categoria.value,
        habilitado: habilitado.value,
    };
    emit('save-product', product);
};
</script> 