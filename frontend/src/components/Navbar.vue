<template>
    <div :class="{ 'dark': isDarkMode }" class="flex h-screen">
        <!-- Overlay -->
        <div v-if="isSidebarOpen" class="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" @click="closeSidebar">
        </div>

        <!-- Sidebar -->
        <aside :class="{ 'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen }"
            class="fixed z-30 h-full w-64 bg-white dark:bg-gray-800 border-r dark:text-gray-100 text-gray-900 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:relative">
            <div class="p-3 text-xl font-bold border-b ">
                <span>Sistema De Stock</span>
            </div>
            <nav class="p-4">
                <ul class="space-y-2">
                    <!-- Dashboard -->
                    <li>
                        <a href="/dashboard" class="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                            @click="closeSidebar">
                            Dashboard
                        </a>
                    </li>

                    <!-- Movimientos Dropdown -->
                    <button @click="toggleDropdown('movimientos')"
                        class="w-full flex justify-between items-center px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                        Movimientos
                        <svg xmlns="http://www.w3.org/2000/svg"
                            :class="{ 'rotate-180': activeDropdown === 'movimientos' }"
                            class="h-4 w-4 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 9l6 6 6-6" />
                        </svg>
                    </button>

                    <ul v-if="activeDropdown === 'movimientos'" class="pl-6 mt-2 space-y-2">
                        <li>
                            <a href="/movimientos/crear"
                                class="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                @click="closeSidebar">
                                Crear Movimiento
                            </a>
                        </li>
                        <li>
                            <a href="/movimientos/listar"
                                class="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                @click="closeSidebar">
                                Listar Movimientos
                            </a>
                        </li>
                    </ul>

                    <!-- Productos Dropdown -->
                    <li>
                        <button @click="toggleDropdown('productos')"
                            class="w-full flex justify-between items-center px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                            Productos
                            <svg xmlns="http://www.w3.org/2000/svg"
                                :class="{ 'rotate-180': activeDropdown === 'productos' }"
                                class="h-4 w-4 transition-transform" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 9l6 6 6-6" />
                            </svg>
                        </button>
                        <ul v-if="activeDropdown === 'productos'" class="pl-6 mt-2 space-y-2">
                            <li>
                                <a href="/productos/listar"
                                    class="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                    @click="closeSidebar">
                                    Listar Productos
                                </a>
                            </li>
                            <li>
                                <a href="/productos/buscar"
                                    class="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                    @click="closeSidebar">
                                    Buscar Producto
                                </a>
                            </li>
                            <li>
                                <a href="/productos/crear"
                                    class="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                    @click="closeSidebar">
                                    Crear Producto
                                </a>
                            </li>
                        </ul>
                    </li>

                    

                    <!-- Categorías Dropdown -->
                    <li>
                        <button @click="toggleDropdown('categorias')"
                            class="w-full flex justify-between items-center px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                            Categorías
                            <svg xmlns="http://www.w3.org/2000/svg"
                                :class="{ 'rotate-180': activeDropdown === 'categorias' }"
                                class="h-4 w-4 transition-transform" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 9l6 6 6-6" />
                            </svg>
                        </button>
                        <ul v-if="activeDropdown === 'categorias'" class="pl-6 mt-2 space-y-2">
                            <li>
                                <a href="/categorias/crear"
                                    class="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                    @click="closeSidebar">
                                    Crear Categoría
                                </a>
                            </li>
                            <li>
                                <a href="/categorias/editar"
                                    class="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                    @click="closeSidebar">
                                    Listar Categorías
                                </a>
                            </li>
                        </ul>
                    </li>
                    <!--  Reportes  -->
                    <li>
                        <a href="/reportes" class="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                            @click="closeSidebar">
                            Reportes
                        </a>
                    </li>

                    <!-- Configuracion   -->
                    <li>
                        <a href="/configuracion" class="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                            @click="closeSidebar">
                            Configuración
                        </a>
                    </li>



                </ul>
            </nav>
        </aside>

        <!-- Contenido principal -->
        <div class="flex-1 flex flex-col">
            <!-- Navbar -->
            <header
                class="bg-white dark:bg-gray-800 dark:text-gray-100 text-gray-900 border-b px-4 py-3 flex justify-between items-center shadow-md">
                <div class="flex items-center gap-4">
                    <button @click="toggleSidebar" class="md:hidden focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    <span class="text-lg font-bold">Panel de Control</span>
                </div>
                <button @click="toggleDarkMode" class="focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="{ 'fill-yellow-500': isDarkMode }"
                        viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M10 15.586a5.586 5.586 0 100-11.172 5.586 5.586 0 000 11.172zM10 1v2m0 14v2m8-8h-2M3 10H1m14.95-4.95l-1.414 1.414M5.464 14.536l-1.414 1.414M5.464 5.464L4.05 4.05M14.536 14.536l-1.414-1.414" />
                    </svg>
                </button>
            </header>

            <!-- Contenido dinámico -->
            <main class="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
                <router-view />
            </main>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';

// Sidebar
const isSidebarOpen = ref(false);
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};
const closeSidebar = () => {
    isSidebarOpen.value = false;
};

// Dropdowns
const activeDropdown = ref(null);
const toggleDropdown = (menu) => {
    activeDropdown.value = activeDropdown.value === menu ? null : menu;
};

// Modo Oscuro
const isDarkMode = ref(false);
const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;

    // Guardar en localStorage para persistencia
    if (isDarkMode.value) {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
    } else {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
    }
};

// Cargar configuración inicial
if (localStorage.getItem('theme') === 'dark') {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
}
</script>