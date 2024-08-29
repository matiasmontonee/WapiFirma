<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-black opacity-50"></div>
    <div class="relative bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h3 class="text-xl font-bold mb-4">No tienes crédito de firmas <i class="fas fa-times-circle text-red-500 ml-1"></i></h3>
      <p class="mb-4">¡Comprá tu pack para no volver a firmar en papel!</p>
      <div class="flex justify-end">
        <router-link to="/purchase">
          <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2">Comprar pack</button>
        </router-link>
        <button @click="close" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['show'],
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>
