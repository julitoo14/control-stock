<template>
    <!-- Modal Overlay -->
    <div
      class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50"
      v-if="show"
      @click.self="close"
      ref="modal"
    >
      <!-- Modal Content -->
      <div
        class="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden max-w-sm w-full animate-fadeIn"
      >
        <!-- Header -->
        <div class="flex justify-between items-center border-b border-gray-700 px-6 py-4">
          <h4 class="text-lg font-semibold">Confirmar</h4>
          <button
            @click="close"
            class="text-gray-400 hover:text-white transition duration-200"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
  
        <!-- Body -->
        <div class="p-6">
          <p class="text-gray-300">Estas seguro que queres borrar el producto?</p>
        </div>
  
        <!-- Footer -->
        <div class="flex justify-end space-x-2 px-6 py-4 bg-gray-700">
          <button
            @click="$emit('delete')"
            class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium transition duration-200"
          >
            Yes
          </button>
          <button
            @click="close"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-medium transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  const props = defineProps({
    show: { type: Boolean, default: false },
  });
  const emit = defineEmits(["close", "delete"]);
  const modal = ref(null);
  
  const close = () => {
    emit("close");
  };
  
  onMounted(() => {
    const modalElement = modal.value;
    modalElement?.addEventListener("click", (event) => {
      if (event.target === modalElement) close();
    });
  });
  </script>
  
  <style scoped>
  /* Animación para el modal */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
  </style>