<template>
  <NavbarComponent :user="user" @logout="logout" />

  <main class="flex p-4 pt-0 lg:ml-56 bg-gray-100">
    <div class="rounded-2xl w-full overflow-x-auto bg-white">
      <h1 class="text-3xl font-bold text-center mt-4">Elige el mejor plan para ti</h1>

      <div class="flex justify-center mt-16 mb-12">
        <div class="w-1/4 px-1 text-center my-6">
          <div class="px-4 border-2 border-gray-300 flex flex-col items-center justify-between h-full">
            <div class="flex-grow flex flex-col items-center">
              <h2 class="mt-4 font-semibold text-green-400">Salve una planta</h2>
              <h3 class="font-bold">-Pack de 20 firmas-</h3>
              <p class="mt-4 font-semibold">u$d<span class="text-5xl">20,6</span></p>
              <p class="mt-4 font-semibold">Ideal para profesionales e inmobiliarias.</p>
              <ul class="text-left px-4 text-sm mt-8 font-semibold text-gray-800 list-disc">
                <li class="mb-1">u$d 1,03 final por firma</li>
                <li class="my-1">Sin fecha límite de consumo</li>
                <li class="my-1">Plantilla de WhatsApp personalizada</li>
                <li class="my-1">Hasta 1 usuario</li>
                <li class="my-1">Plataforma centralizada de firmas</li>
              </ul>
            </div>
            <button class="bg-green-400 hover:bg-green-500 py-2 px-6 my-8 font-semibold text-sm"
              @click="handleClick(20)">COMPRAR</button>
          </div>
        </div>
        <div class="w-1/4 px-1 text-center relative">
          <div
            class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 py-1 px-3 rounded z-10 text-gray-100 text-sm"
            style="top: -0.3rem;">#máspopular</div>
          <div class="px-4 border-2 border-green-400 flex flex-col items-center justify-between h-full">
            <div class="mt-6 flex-grow flex flex-col items-center">
              <h2 class="mt-4 font-semibold text-green-400">Salve un árbol</h2>
              <h3 class="font-bold">-Pack de 50 firmas-</h3>
              <p class="mt-4 font-semibold">u$d<span class="text-5xl">39,5</span></p>
              <p class="mt-4 font-semibold">Ideal para pequeñas y medianas empresas.</p>
              <ul class="text-left px-4 text-sm mt-8 font-semibold text-gray-800 list-disc">
                <li class="mb-1">u$d 0,70 final por firma</li>
                <li class="my-1">Sin fecha límite de consumo</li>
                <li class="my-1">Plantilla de WhatsApp personalizada</li>
                <li class="my-1">Hasta 3 usuarios</li>
                <li class="my-1">Plataforma centralizada de firmas</li>
                <li class="mt-1">Soporte online</li>
              </ul>
            </div>
            <button class="bg-green-400 hover:bg-green-500 py-2 px-6 my-14 font-semibold text-sm"
              @click="handleClick(50)">COMPRAR</button>
          </div>
        </div>
        <div class="w-1/4 px-1 text-center my-6">
          <div class="px-6 border-2 border-gray-300 flex flex-col items-center justify-between h-full">
            <div class="flex-grow flex flex-col items-center">
              <h2 class="mt-4 font-semibold text-green-400">Salve un bosque</h2>
              <h3 class="font-bold">-Pack de 100 firmas-</h3>
              <p class="mt-4 font-semibold">u$d<span class="text-5xl">68,6</span></p>
              <p class="mt-4 font-semibold">Ideal para organizaciones.</p>
              <ul class="text-left px-4 text-sm mt-8 font-semibold text-gray-800 list-disc">
                <li class="mb-1">u$d 0,68 final por firma</li>
                <li class="my-1">Sin fecha límite de consumo</li>
                <li class="my-1">Plantilla de WhatsApp personalizada</li>
                <li class="my-1">Usuarios ilimitados</li>
                <li class="my-1">Plataforma centralizada de firmas</li>
                <li class="my-1">Soporte online</li>
                <li class="my-1">API de integración</li>
              </ul>
            </div>
            <button class="bg-green-400 hover:bg-green-500 py-2 px-6 my-8 font-semibold text-sm"
              @click="handleClick(100)">COMPRAR</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue';
import axios from 'axios';
import { getCookie } from '../helpers/cookies';

export default {
  emits: ['login', 'logout'],
  props: ['user'],
  components: {
    NavbarComponent
  },
  data() {
    return {
      sidebarOpen: false
    };
  },
  methods: {
    logout() {
      this.$emit('logout');
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    async handleClick(amount) {
      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': getCookie('token')
      };
      try {
        const response = await axios.get(`https://firmasxw.com/test/generatePaiementDlocal?amount=${amount}`, { headers });
        const redirectUrl = response.data.url;
        window.open(redirectUrl, '_blank');
      } catch (error) {
        console.error('API call failed:', error);
      }
    }
  }
}
</script>
