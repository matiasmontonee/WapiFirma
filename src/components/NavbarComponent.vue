<template>
  <div v-if="sidebarOpen" @click="toggleSidebar" class="lg:hidden fixed inset-0 bg-black opacity-50 z-10"></div>

  <!-- SIDEBAR -->
  <aside v-if="sidebarOpen"
    class="bg-gray-800 text-gray-400 pt-4 h-full w-56 flex-shrink-0 absolute inset-y-0 left-0 transform transition-transform z-20"
    :class="{ '-translate-x-full': !sidebarOpen }" style="height: calc(100vh);">
    <div class="flex flex-col h-full px-2">
      <a href="">
        <img src="../assets/img/fxwbanner.png" alt="Logo de fxw" class="mx-auto mt-1 mb-10" style="width: 85%;">
      </a>
      <div class="flex flex-col px-2 text-gray-100">
        <span class="flex flex-col items-center font-semibold rounded-2xl bg-blue-400 mb-2">
          <span>Firmas Restantes</span>
          <span class="text-xl">{{ tokenData.used }}/{{ tokenData.total }}</span>
        </span>
        <router-link to="/purchase" class="rounded-2xl bg-green-400 mb-14 hover:bg-green-300 text-center">Comprar
          pack</router-link>
      </div>
      <router-link to="/requests"
        :class="{ 'bg-blue-400': $route.path === '/requests', 'rounded-full text-white font-bold': $route.path === '/requests', 'hover:bg-blue-300 hover:rounded-full hover:text-white': $route.path !== '/requests' }"
        class="mr-1 p-2 mb-2 ml-2 mt-4 lg:mt-0 break-all">
        <i class="fas fa-home mr-2 p-1"
          :class="{ 'text-blue-400 bg-white rounded-full': $route.path === '/requests' }"></i> Solicitudes
      </router-link>
      <!-- <router-link to="/reports"
        :class="{ 'bg-blue-400': $route.path === '/reports', 'rounded-full text-white font-bold': $route.path === '/reports', 'hover:bg-blue-300 hover:rounded-full hover:text-white': $route.path !== '/reports' }"
        class="mr-1 p-2 mb-2 ml-2 break-all">
        <i class="fas fa-chart-line mr-2 p-1"
          :class="{ 'text-blue-400 bg-white rounded-full': $route.path === '/reports' }"></i> Informes
      </router-link>
      <router-link to="/contacts"
        :class="{ 'bg-blue-400': $route.path === '/contacts', 'rounded-full text-white font-bold': $route.path === '/contacts', 'hover:bg-blue-300 hover:rounded-full hover:text-white': $route.path !== '/contacts' }"
        class="mr-1 p-2 mb-2 ml-2 break-all">
        <i class="fas fa-user mr-2 p-1"
          :class="{ 'text-blue-400 bg-white rounded-full': $route.path === '/contacts' }"></i> Contactos
      </router-link> -->
      <router-link to="/profile"
        :class="{ 'bg-blue-400': $route.path === '/profile', 'rounded-full text-white font-bold': $route.path === '/profile', 'hover:bg-blue-300 hover:rounded-full hover:text-white': $route.path !== '/profile' }"
        class="mr-1 p-2 mb-16 ml-2 break-all">
        <i class="fas fa-cog mr-2 p-1"
          :class="{ 'text-blue-400 bg-white rounded-full': $route.path === '/profile' }"></i> Perfil
      </router-link>
      <div class="mt-auto mb-4">
        <div class="mb-10 mx-2 border-t border-gray-300"></div>
        <button class="text-left px-5 mb-4">
          <i class="fas fa-user-circle mr-5"></i>
          <span class="hover:text-gray-200" v-if="user">{{ user.name }}</span>
        </button>
        <button @click="logout" class="text-left px-5 text-lg">
          <i class="fas fa-sign-out-alt mr-4"></i>
          <span class="hover:text-gray-200">Cerrar sesión</span>
        </button>
      </div>
    </div>
  </aside>

  <!-- NAVBAR -->
  <header class="py-6 px-4 lg:px-12 bg-gray-100">
    <nav class="flex flex-row justify-between items-center">
      <div class="flex items-center ml-52">
        <i class="fas fa-bell mr-4 text-xl text-gray-500 relative">
          <span class="absolute h-2 w-2 bg-red-500 rounded-full top-0.5 right-0"></span>
        </i>
        <p class="text-blue-400 text-sm">Status: Activo</p>
      </div>

      <div class="flex items-center">
        <router-link to="/newdocument">
          <button
            class="hidden lg:flex bg-blue-400 hover:bg-blue-500 text-white font-semibold py-0.5 px-4 rounded-full">
            <div class="flex items-center">
              <i class="fas fa-file-alt mr-2"></i>
              <p class="mt-0.5">Crear documento</p>
            </div>
          </button>
        </router-link>
      </div>

      <!-- TABLET Y MOBILE -->
      <div class="lg:hidden flex justify-between w-full">
        <button @click="toggleSidebar" class="block lg:hidden rounded"><i class="fas fa-bars text-2xl"></i></button>
        <div class="flex items-center">
          <router-link to="/newdocument">
            <button class="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-1 px-6 rounded-xl mr-4">Crear
              documento</button>
          </router-link>
          <div class="items-center py-1 px-2 rounded-xl cursor-pointer" @click="toggleDropdown">
            <i class="fas fa-user text-2xl"></i>
          </div>
          <div v-show="showDropdown" class="lg:hidden absolute right-5 mt-52 w-64 bg-white rounded-md shadow-2xl z-10">
            <ul>
              <li class="flex items-center bg-gray-200 p-2 mb-1 rounded-t-md"><img v-if="user" :src="user.picture"
                  alt="User" class="rounded-full h-5 w-4.5 mr-2">
                <span v-if="user && user.name">{{ user.name.split(' ')[0] }}</span>
              </li>
              <li>
                <button class="hover:bg-gray-200 p-2 w-full text-left">
                  <i class="fas fa-user-circle mr-2 text-xl"></i>Mi perfil
                </button>
              </li>
              <li>
                <button @click="logout" class="hover:bg-gray-200 rounded-b-md p-2 w-full text-left">
                  <i class="fas fa-sign-out-alt mr-2 text-xl"></i>Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { googleLogout } from 'vue3-google-login';
import axios from 'axios';
import { getCookie } from '../helpers/cookies';

export default {
  props: ['user'],
  data() {
    return {
      showDropdown: false,
      sidebarOpen: window.innerWidth >= 1024,
      tokenData: 0
    };
  },
  mounted() {
    if (!this.tokenData) {
      this.fetchTokensData();
    }
  },
  methods: {
    logout() {
      googleLogout();
      this.$emit('logout');
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    fetchTokensData() {
      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': getCookie('token')
      };
      // Realiza la solicitud GET a la API para obtener todas las solicitudes
      axios.get('https://firmasxw.com/test/tokensLeft', { headers })
        .then(response => {
          this.tokenData = response.data;
        })
        .catch(error => {
          console.error('Error al obtener todas las solicitudes:', error);
        });
    }
  }
}
</script>
