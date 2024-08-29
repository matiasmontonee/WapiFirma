<template>
  <NavbarComponent :user="user" @logout="logout" />

  <main class="flex p-4 pt-0 lg:ml-56 bg-gray-100">
    <div v-if="loading" class="flex justify-center w-full">
      <i class="fas fa-spinner fa-spin text-4xl text-blue-500"></i>
    </div>
    <div v-else class="rounded-2xl w-full bg-white" style="flex:1; height: calc(85vh); width: calc(100vh)">
      <div class="m-6 mt-4">
        <h2 class="text-blue-500 font-bold mb-2">Datos Empresa</h2>

        <div class="flex flex-col">
          <div class="flex items-center">
            <input type="text" placeholder="Nombre" v-model="datosPersonales.client_business_name"
              class="border-gray-300 border-b-2 w-2/5 focus:outline-none p-2 pl-0 mb-6 placeholder-gray-800 mr-4">
            <i @mouseover="showInfoMessage = true" @mouseleave="showInfoMessage = false"
              class="fas fa-info-circle text-xl mb-2 text-gray-500 hover:text-gray-400 cursor-pointer"></i>
            <div v-if="showInfoMessage"
              class="absolute bg-gray-200 rounded-lg text-sm py-4 px-4 w-1/3 top-1/5 right-1/2 left-1/2 text-gray-700 shadow-lg z-10 ml-20">
              <p>Es el nombre con el cual los firmantes identifican a su empresa.</p>
              <p>Lo verán de la siguiente manera:</p>
              <p>¡Hola Darío! Soy FirmIA, asistente virtual de FirmaXW. <span class="font-bold text-red-700">Crecer
                  SA</span> nos pidió hacerle llegar el siguiente documento para que lo firme.
              </p>
            </div>
          </div>
        </div>

        <h2 class="text-blue-500 font-bold mb-2">Datos Personales</h2>

        <div class="flex">
          <input type="text" placeholder="Nombre" v-model="datosPersonales.client_full_name"
            class="border-gray-300 border-b-2 w-1/4 focus:outline-none p-2 pl-0 mb-6 placeholder-gray-800 mr-4">
          <input type="text" placeholder="Apellido" v-model="datosPersonales.client_surname"
            class="border-gray-300 border-b-2 w-1/4 focus:outline-none p-2 pl-0 mb-6 placeholder-gray-800">
        </div>
        <input @input="validateDNI" type="text" placeholder="DNI / CI" v-model="datosPersonales.client_dni"
          class="border-gray-300 border-b-2 w-1/4 focus:outline-none p-2 pl-0 mb-6 placeholder-gray-800 mr-4">


        <input type="number" placeholder="1137681841" v-model="datosPersonales.client_phone"
          class="border-gray-300 border-b-2 w-1/4 focus:outline-none p-2 pl-0 mb-6 placeholder-gray-800">


        <div class="flex">
          <input type="text" placeholder="Email" v-model="datosPersonales.client_mail"
            class="border-gray-300 border-b-2 w-1/4 focus:outline-none p-2 pl-0 mb-6 placeholder-gray-800">
        </div>
        <div v-if="error" class="text-red-500 bg-red-100 p-2 rounded-md text-center flex justify-between items-center"
          style="width: 460px;">
          <span class="ml-2 font-bold">{{ error }}</span>
          <button @click="error = ''"><i
              class="fas fa-times text-lg cursor-pointer text-gray-800 hover:bg-red-300 px-2 rounded-sm"></i></button>
        </div>

        <div class="text-center mt-4">
          <button @click="guardarDatos"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 font-bold rounded-full"><i
              class="fas fa-save mr-2"></i>Guardar mis datos</button>
        </div>
      </div>
    </div>
  </main>

  <ModalComponent :isVisible="showModal" @close="showModal = false" />
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue';
import ModalComponent from '../components/ModalComponent.vue';
import axios from 'axios';
import { getCookie } from '../helpers/cookies';

export default {
  emits: ['login', 'logout'],
  props: ['user'],
  components: {
    NavbarComponent,
    ModalComponent
  },
  data() {
    return {
      sidebarOpen: false,
      showInfoMessage: false,
      datosPersonales: {},
      error: '',
      showModal: false,
      loading: true
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    logout() {
      this.$emit('logout');
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    toggleInfo() {
      this.showInfoMessage = !this.showInfoMessage;
    },
    validateDNI() {
      const regex = /^[0-9./-]*$/;

      if (!regex.test(this.datosPersonales.client_dni)) {
        this.datosPersonales.client_dni = this.datosPersonales.client_dni.replace(/[^0-9./-]/g, '');
      }
    },
    async guardarDatos() {
      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': getCookie('token')
      };

      const dni = this.datosPersonales.client_dni.replace(/[^0-9]/g, '');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const telefonoNumero = this.datosPersonales.client_phone;

      if (!this.datosPersonales.client_business_name || !this.datosPersonales.client_full_name ||
        !this.datosPersonales.client_surname || !this.datosPersonales.client_dni ||
        !this.datosPersonales.client_phone ||
        !this.datosPersonales.client_mail) {
        this.error = 'Por favor, completa todos los campos.';
      } else if (dni.length < 6 || dni.length > 8) {
        this.error = 'El DNI debe contener entre 6 y 8 números.';
      } else if (telefonoNumero.length < 8 || telefonoNumero.length > 30) {
        this.error = 'El número debe contener entre 8 y 12 caracteres.';
      } else if (!emailRegex.test(this.datosPersonales.client_mail)) {
        this.error = 'Por favor, ingresa un correo electrónico válido.';
      } else {
        this.error = '';
        let body = {
          client_full_name: this.datosPersonales.client_full_name,
          client_surname: this.datosPersonales.client_surname,
          client_dni: this.datosPersonales.client_dni,
          client_phone: this.datosPersonales.client_phone,
          client_mail: this.datosPersonales.client_mail,
          client_business_name: this.datosPersonales.client_business_name
        };

        await axios.post('https://firmasxw.com/test/modifyUserData', body, { headers })
        this.showModal = true;
      }
    },
    fetchUserData() {
      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': getCookie('token')
      };

      axios.get('https://firmasxw.com/test/userData', { headers })
        .then(response => {
          this.datosPersonales = {
            client_full_name: response.data.client_full_name,
            client_surname: response.data.client_surname,
            client_dni: response.data.client_dni,
            client_phone: response.data.client_phone,
            client_mail: response.data.client_mail,
            client_business_name: response.data.client_business_name
          };
          this.loading = false;
        })
        .catch(error => {
          console.error('Error al obtener todas las solicitudes:', error);
          this.loading = false;
        });
    },
    beforeDestroy() {
      document.removeEventListener('click', this.closeDropdownOnClickOutside);
    }
  }
}
</script>
