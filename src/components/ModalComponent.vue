<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-black opacity-50"></div>
    <div class="relative bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h3 class="text-xl font-bold mb-4">Datos guardados <i class="fas fa-check-circle text-green-500 ml-1"></i></h3>
      <p class="mb-4">Tus datos fueron guardados exitosamente.</p>
      <button @click="close" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Cerrar</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isVisible'],
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>