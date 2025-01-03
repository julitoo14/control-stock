<template>
    <header class="bg-gray-800 text-white px-4 py-4 flex items-center justify-center relative shadow-md ">

  
      <!-- Botón de menú para móviles -->
      <button
        @click="toggleMenu"
        class="md:hidden focus:outline-none"
        aria-label="Abrir menú"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
  
      <!-- Menú de navegación -->
      <nav
        :class="[
          'absolute bg-gray-800 text-white top-full right-0 w-full md:w-auto md:relative md:top-0 md:right-auto transition-all duration-300 ease-in-out',
          menuOpen ? 'block' : 'hidden',
          'md:block'
        ]"
      >
        <ul class="flex flex-col md:flex-row md:space-x-4">
          <li>
            <router-link
              to="/"
              class="block px-4 py-2 hover:bg-gray-700 rounded md:py-0"
              active-class="font-bold"
            >
              Dashboard
            </router-link>
          </li>
          <li>
            <router-link
              to="/productos"
              class="block px-4 py-2 hover:bg-gray-700 rounded md:py-0"
              active-class="font-bold"
            >
              Productos
            </router-link>
          </li>
          <li>
            <router-link
              to="/categorias"
              class="block px-4 py-2 hover:bg-gray-700 rounded md:py-0"
              active-class="font-bold"
            >
              Categorías
            </router-link>
          </li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Estado del menú
  const menuOpen = ref(false);
  
  // Alternar menú en móviles
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
  };
  </script>
  
  