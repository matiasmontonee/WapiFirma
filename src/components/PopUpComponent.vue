<template>
  <div v-if="show" class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-200 px-4 py-2 rounded text-center w-1/4 ml-12 z-50">
    <p class="text-lg leading-6 font-medium text-green-900">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: ['show', 'message'],
}
</script>