<template>
    <div class="relative" ref="dropdownRef">
      <!-- Botón principal -->
      <div 
        class="flex items-center justify-center space-x-2 bg-gray-950 hover:bg-gray-800 text-white p-4 rounded cursor-pointer"
        @click="toggleDropdown"
      >
        <ProfileIcon class="w-4 h-4" />
        <p class="font-bold">Profile</p>
      </div>
  
      <!-- Dropdown -->
      <div 
        v-if="isDropdownVisible" 
        class="absolute right-0 mt-2 w-48 bg-gray-900 text-white shadow-md rounded p-2 z-10"
      >
        <ul>
          <li class="p-2 hover:bg-gray-800 cursor-pointer rounded">Settings</li>
          <li class="p-2 hover:bg-gray-800 cursor-pointer rounded">Logout</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import ProfileIcon from '../../icons/ProfileIcon.vue';
  
  const isDropdownVisible = ref(false);
  const dropdownRef = ref(null);
  
  // Alterna la visibilidad del dropdown
  const toggleDropdown = () => {
    isDropdownVisible.value = !isDropdownVisible.value;
  };
  
  // Cierra el dropdown si se hace clic fuera
  const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
      isDropdownVisible.value = false;
    }
  };
  
  // Agrega y elimina el evento global en `document`
  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
  });
  </script>
  