<template>
  <div class="flex items-center justify-start">
    <span>Pedir foto de DNI/CI + foto Selfie</span>
    <div class="flex items-center">
      <div class="relative ml-3">
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" class="hidden" v-model="signer.sendWithDNI" @change="handleDNIChange" />
          <div class="w-10 h-3 bg-gray-300 rounded-full" :class="{ 'bg-blue-500': signer.sendWithDNI }"></div>
          <div class="absolute w-5 h-5 bg-white border rounded-full transition-transform transform"
            :class="{ 'translate-x-full': signer.sendWithDNI }"></div>
        </label>
      </div>
      <i @mouseover="showInfoMessage = 'photoId'" @mouseleave="showInfoMessage = false"
        class="fas fa-info-circle text-xl ml-3 text-gray-500 hover:text-gray-400 cursor-pointer"></i>
      <div v-if="showInfoMessage === 'photoId'"
        class="absolute bg-gray-200 rounded-lg text-sm py-1 px-6 w-1/5 top-1/5 text-gray-700 shadow-lg z-10 mr-4 mt-32">
        <p>El firmante deberá tomar una foto del documento de identidad por ambos lados + foto selfie para firmar (FxW
          no valida las fotos). Las fotos quedarán en el informe de firmas. Solo se puede solicitar esta información con
          nuestro asistente FirmIA.</p>
      </div>
    </div>

    <div class="flex items-center ml-16">
      <i v-if="signer.method === 'mail'" class="fas fa-envelope text-xl mr-2 text-gray-500"></i>
      <i v-else-if="signer.method === 'wpp'" class="fab fa-whatsapp text-xl mr-2 text-gray-500"></i>
      <input type="checkbox" v-model="signer.sendWithFirmIA" class="mr-2 ml-0.5 cursor-pointer h-4 w-4"
        @change="handleCheckboxChange">
      <p>Enviar con FirmIA</p>
      <i @mouseover="showInfoMessage = true" @mouseleave="showInfoMessage = false"
        class="fas fa-info-circle text-xl ml-2 text-gray-500 hover:text-gray-400 cursor-pointer"></i>
      <div v-if="showInfoMessage === true"
        class="absolute bg-gray-200 rounded-lg text-sm py-1 px-6 w-1/5 top-1/5 text-gray-700 shadow-lg z-10 mr-4 mt-32">
        <p>Envía el documento automáticamente mediante nuestro asistente de WhatsApp FirmIA</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signer: {
        sendWithDNI: false,
        sendWithFirmIA: false,
        method: 'mail' // or 'wpp', depending on the initial state
      },
      showInfoMessage: false
    };
  },
  methods: {
    handleDNIChange() {
      console.log('signer.sendWithDNI:', this.signer.sendWithDNI);
    },
    handleCheckboxChange() {
      console.log('signer.sendWithFirmIA:', this.signer.sendWithFirmIA);
    }
  }
};
</script>

<style scoped>
.input-hidden {
  display: none;
}

.input-visible {
  display: block;
}

.bg-blue-500 {
  background-color: rgba(59, 130, 246);
}

.translate-x-full {
  transform: translateX(100%);
}

.transition-transform {
  transition: transform 0.3s ease;
}
</style>
