<template>
  <NavbarComponent :user="user" @logout="logout" />

  <main class="flex p-4 pt-0 lg:ml-56 bg-gray-100">
    <div v-if="loading" class="flex justify-center items-center text-center mx-auto w-full h-full">
      <i class="fas fa-spinner fa-spin text-4xl text-blue-500 text-center mx-auto"></i>
    </div>
    <div v-else class="rounded-2xl w-full overflow-x-auto bg-white"
      style="flex:1; height: calc(85vh); width: calc(100vh)">
      <table class="w-full">
        <thead>
          <tr class="border-b">
            <!-- Buscador ID -->
            <th class="w-1/5 pl-6 pt-5 pb-3 text-left text-sm">
              <div class="flex items-center">
                <i class="fas fa-search mr-2 text-blue-400 cursor-pointer"></i>
                <input type="text" v-model="searchTerm" @input="searchDocuments"
                  class="text-gray-400 text-lg focus:outline-none" placeholder="Id Documento" />
              </div>
            </th>
            <th class="w-1/5 pr-10 pt-5 pb-3 text-left text-sm">
              <p class="text-gray-400 text-lg">Firmantes</p>
            </th>
            <!-- Buscador fecha -->
            <th class="w-1/5 pt-5 pb-3 text-left text-sm">
              <div class="flex items-center">
                <input type="date" v-model="searchDate" @input="searchDocuments"
                  class="text-gray-400 text-lg focus:outline-none" placeholder="Fecha de Creación" />
              </div>
            </th>
            <!-- Buscador estado -->
            <th class="w-1/5 pr-20 pt-5 pb-3 text-left text-sm relative" ref="dropdownContainer">
              <div class="flex items-center">
                <i class="fas fa-chevron-down mr-2 text-blue-400 cursor-pointer" @click="toggleDropdown"></i>
                <div class="relative">
                  <button class="text-gray-400 text-lg focus:outline-none" @click="toggleDropdown">Estado</button>
                  <ul v-if="showDropdown" class="absolute top-full bg-white border border-gray-300 shadow-md ">
                    <li class="cursor-pointer px-4 py-2 hover:bg-gray-100" @click="setSearchStatus('Firmado')">Firmado
                    </li>
                    <li class="cursor-pointer px-4 py-2 hover:bg-gray-100" @click="setSearchStatus('Pendiente')">
                      Pendiente
                    </li>
                    <li class="cursor-pointer px-4 py-2 hover:bg-gray-100" @click="setSearchStatus('Todos')">
                      Todos
                    </li>
                  </ul>
                </div>
              </div>
            </th>
            <th class="w-1/5 pr-10 pt-5 pb-3 text-left text-sm">
              <p class="text-gray-400 text-lg focus:outline-none">Informe</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b" v-for="(solicitud, index) in todasLasSolicitudes" :key="'row-' + index">
            <td class="text-sm pl-6 py-2 flex items-center">
              <div>
                <div @click="toggleRow(index)" class="flex items-end cursor-pointer">
                  {{ solicitud.id_custom_client }}.pdf
                  <i class="fas fa-chevron-down text-blue-400 ml-2 mb-0.5"
                    :class="{ 'transform rotate-180': isRowExpanded(index) }"></i>
                </div>
                <div class="flex overflow-x-auto">
                  <div class="flex flex-col">
                    <!-- ONE -->
                    <div v-show="isRowExpanded(index) && solicitud.firmantes.length > 0">
                      <span>
                        <i class="fas fa-circle mr-2 mt-4"
                          :class="{ 'text-green-400': solicitud.firmantes[0]?.signed, 'text-gray-400': !solicitud.firmantes[0]?.signed }"></i>
                        {{ solicitud.firmantes[0]?.name }}
                      </span>
                      <div class="flex items-center mt-1 ml-6">
                        <a :href="solicitud.firmantes[0]?.link" target="_blank" class="hover:text-blue-400 underline">{{
                          solicitud.firmantes[0]?.link }}</a>
                        <i v-if="!copiedLinks.includes(solicitud.firmantes[0]?.link)"
                          @click="copyLink(solicitud.firmantes[0]?.link)"
                          class="fas fa-clone ml-2 mr-1 text-blue-400 hover:text-blue-300 cursor-pointer"></i>
                        <i v-else class="fas fa-check-circle ml-2 mr-1 text-green-400"></i>
                      </div>
                      <p class="mt-1 ml-6 mb-2">{{ solicitud.firmantes[0]?.method }} <span class="ml-4">{{
                        isNaN(solicitud.firmantes[0]?.phone.charAt(0)) ? solicitud.firmantes[0]?.phone : '+' +
                          solicitud.firmantes[0]?.phone ?? solicitud.firmantes[0]?.email }}</span></p>
                    </div>
                    <!-- TWO -->
                    <div v-show="isRowExpanded(index) && solicitud.firmantes.length > 1">
                      <span>
                        <i class="fas fa-circle mr-2"
                          :class="{ 'text-green-400': solicitud.firmantes[1]?.signed, 'text-gray-400': !solicitud.firmantes[1]?.signed }"></i>
                        {{ solicitud.firmantes[1]?.name }}
                      </span>
                      <div class="flex items-center mt-1 ml-6">
                        <a :href="solicitud.firmantes[1]?.link" target="_blank" class="hover:text-blue-400 underline">{{
                          solicitud.firmantes[1]?.link }}</a>
                        <i v-if="!copiedLinks.includes(solicitud.firmantes[1]?.link)"
                          @click="copyLink(solicitud.firmantes[1]?.link)"
                          class="fas fa-clone ml-2 mr-1 text-blue-400 hover:text-blue-300 cursor-pointer"></i>
                        <i v-else class="fas fa-check-circle ml-2 mr-1 text-green-400"></i>
                      </div>
                      <p class="mt-1 ml-6 mb-2">{{ solicitud.firmantes[1]?.method }} <span class="ml-4">{{
                        isNaN(solicitud.firmantes[1]?.phone.charAt(0)) ? solicitud.firmantes[1]?.phone : '+' +
                          solicitud.firmantes[1]?.phone ?? solicitud.firmantes[1]?.email }}</span></p>
                    </div>
                    <!-- THREE -->
                    <div v-show="isRowExpanded(index) && solicitud.firmantes.length > 2">
                      <span>
                        <i class="fas fa-circle mr-2"
                          :class="{ 'text-green-400': solicitud.firmantes[2]?.signed, 'text-gray-400': !solicitud.firmantes[2]?.signed }"></i>
                        {{ solicitud.firmantes[2]?.name }}
                      </span>
                      <div class="flex items-center mt-1 ml-6">
                        <a :href="solicitud.firmantes[2]?.link" target="_blank" class="hover:text-blue-400 underline">{{
                          solicitud.firmantes[2]?.link }}</a>
                        <i v-if="!copiedLinks.includes(solicitud.firmantes[2]?.link)"
                          @click="copyLink(solicitud.firmantes[2]?.link)"
                          class="fas fa-clone ml-2 mr-1 text-blue-400 hover:text-blue-300 cursor-pointer"></i>
                        <i v-else class="fas fa-check-circle ml-2 mr-1 text-green-400"></i>
                      </div>
                      <p class="mt-1 ml-6 mb-2">{{ solicitud.firmantes[2]?.method }} <span class="ml-4">{{
                        isNaN(solicitud.firmantes[2]?.phone.charAt(0)) ? solicitud.firmantes[2]?.phone : '+' +
                          solicitud.firmantes[2]?.phone ?? solicitud.firmantes[2]?.email }}</span></p>
                    </div>
                  </div>

                  <div class="flex flex-col">
                    <!-- FOUR -->
                    <div v-show="isRowExpanded(index) && solicitud.firmantes.length > 3">
                      <span>
                        <i class="fas fa-circle mr-2 mt-4"
                          :class="{ 'text-green-400': solicitud.firmantes[3]?.signed, 'text-gray-400': !solicitud.firmantes[3]?.signed }"></i>
                        {{ solicitud.firmantes[3]?.name }}
                      </span>
                      <div class="flex items-center mt-1 ml-6">
                        <a :href="solicitud.firmantes[3]?.link" target="_blank" class="hover:text-blue-400 underline">{{
                          solicitud.firmantes[3]?.link }}</a>
                        <i v-if="!copiedLinks.includes(solicitud.firmantes[3]?.link)"
                          @click="copyLink(solicitud.firmantes[3]?.link)"
                          class="fas fa-clone ml-2 mr-1 text-blue-400 hover:text-blue-300 cursor-pointer"></i>
                        <i v-else class="fas fa-check-circle ml-2 mr-1 text-green-400"></i>
                      </div>
                      <p class="mt-1 ml-6 mb-2">{{ solicitud.firmantes[3]?.method }} <span class="ml-4">{{
                        isNaN(solicitud.firmantes[3]?.phone.charAt(0)) ? solicitud.firmantes[3]?.phone : '+' +
                          solicitud.firmantes[3]?.phone ?? solicitud.firmantes[3]?.email }}</span></p>
                    </div>
                    <!-- FIVE -->
                    <div v-show="isRowExpanded(index) && solicitud.firmantes.length > 4">
                      <span>
                        <i class="fas fa-circle mr-2"
                          :class="{ 'text-green-400': solicitud.firmantes[4]?.signed, 'text-gray-400': !solicitud.firmantes[4]?.signed }"></i>
                        {{ solicitud.firmantes[4]?.name }}
                      </span>
                      <div class="flex items-center mt-1 ml-6">
                        <a :href="solicitud.firmantes[4]?.link" target="_blank" class="hover:text-blue-400 underline">{{
                          solicitud.firmantes[4]?.link }}</a>
                        <i v-if="!copiedLinks.includes(solicitud.firmantes[4]?.link)"
                          @click="copyLink(solicitud.firmantes[4]?.link)"
                          class="fas fa-clone ml-2 mr-1 text-blue-400 hover:text-blue-300 cursor-pointer"></i>
                        <i v-else class="fas fa-check-circle ml-2 mr-1 text-green-400"></i>
                      </div>
                      <p class="mt-1 ml-6 mb-2">{{ solicitud.firmantes[4]?.method }} <span class="ml-4">{{
                        isNaN(solicitud.firmantes[4]?.phone.charAt(0)) ? solicitud.firmantes[4]?.phone : '+' +
                          solicitud.firmantes[4]?.phone ?? solicitud.firmantes[4]?.email }}</span></p>
                    </div>
                    <!-- SIX -->
                    <div v-show="isRowExpanded(index) && solicitud.firmantes.length > 5">
                      <span>
                        <i class="fas fa-circle mr-2"
                          :class="{ 'text-green-400': solicitud.firmantes[5]?.signed, 'text-gray-400': !solicitud.firmantes[5]?.signed }"></i>
                        {{ solicitud.firmantes[5]?.name }}
                      </span>
                      <div class="flex items-center mt-1 ml-6">
                        <a :href="solicitud.firmantes[5]?.link" target="_blank" class="hover:text-blue-400 underline">{{
                          solicitud.firmantes[5]?.link }}</a>
                        <i v-if="!copiedLinks.includes(solicitud.firmantes[5]?.link)"
                          @click="copyLink(solicitud.firmantes[5]?.link)"
                          class="fas fa-clone ml-2 mr-1 text-blue-400 hover:text-blue-300 cursor-pointer"></i>
                        <i v-else class="fas fa-check-circle ml-2 mr-1 text-green-400"></i>
                      </div>
                      <p class="mt-1 ml-6 mb-2">{{ solicitud.firmantes[5]?.method }} <span class="ml-4">{{
                        isNaN(solicitud.firmantes[5]?.phone.charAt(0)) ? solicitud.firmantes[5]?.phone : '+' +
                          solicitud.firmantes[5]?.phone ?? solicitud.firmantes[5]?.email }}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td class="pl-9 pt-2 text-sm" style="vertical-align: top;">
              <p>{{ solicitud.cantidad_firmados }}/{{ solicitud.cantidad_firmantes }}</p>
            </td>
            <td class="pl-8 pt-2 text-sm" style="vertical-align: top;">
              {{ formatDate(solicitud.created_at) }}
            </td>
            <td class="pt-2 text-sm " style="vertical-align: top;">
              <p :class="{ 'bg-green-400': solicitud.is_finished, 'bg-gray-400': !solicitud.is_finished }"
                class="text-white font-semibold px-0 py-0.5 rounded-xl mr-4 w-20 text-center">
                {{ solicitud.is_finished ? 'Firmado' : 'Pendiente' }}
              </p>
            </td>
            <td class="pl-6 text-sm" style="vertical-align: top;">
              <a :href="solicitud.firmantes[0]?.link" target="_blank">
                <i class="far fa-file-pdf text-3xl text-blue-400 hover:text-blue-300"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-center mx-auto text-xl py-2 my-6 w-1/5 rounded-md bg-blue-300 text-white">
        <button @click="prevPage"><i class="fas fa-chevron-left hover:text-blue-500"></i></button>
        <p class="mx-4">{{ currentPage }}</p>
        <button @click="nextPage"><i class="fas fa-chevron-right hover:text-blue-500"></i></button>
      </div>

    </div>
  </main>

  <PopUpComponent :show="showPopUp" :message="PopUpMessage" />
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue';
import PopUpComponent from '../components/PopUpComponent.vue';
import axios from 'axios';
import { getCookie } from '../helpers/cookies';

export default {
  emits: ['login', 'logout'],
  props: ['user'],
  components: {
    NavbarComponent,
    PopUpComponent
  },
  data() {
    return {
      loading: false,
      showDropdown: false,
      showMessage: false,
      sidebarOpen: false,
      documentosFirmados: [],
      documentoStatus: null,
      solicitudesGrupo: [],
      todasLasSolicitudes: [],
      todasLasSolicitudesOriginal: [],
      searchDate: '',
      searchTerm: '',
      searchStatus: '',
      expandedRows: [],
      copiedLinks: [],
      showPopUp: false,
      PopUpMessage: 'Documento Enviado',
      currentPage: 1,
    };
  },
  created() {
    this.fetchTodasLasSolicitudes();
    const enviado = this.$route.query.enviado; // Mostrar y cerrar popup
    if (enviado === 'true') {
      this.showPopUp = true;
      setTimeout(() => {
        this.showPopUp = false;
      }, 5000);
    }
  },
  methods: {
    logout() {
      this.$emit('logout');
    },
    toggleDropdown() { // Dropdown methods
      this.showDropdown = !this.showDropdown;
      if (this.showDropdown) {
        this.$nextTick(() => {
          document.addEventListener('click', this.closeDropdownOnClickOutside);
        });
      } else {
        document.removeEventListener('click', this.closeDropdownOnClickOutside);
      }
    },
    closeDropdownOnClickOutside(event) {
      if (this.$refs.dropdownContainer && !this.$refs.dropdownContainer.contains(event.target)) {
        this.showDropdown = false;
      }
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    toggleRow(index) { // Método para alternar la expansión de filas
      if (this.expandedRows.includes(index)) {
        // Si ya está expandido, lo cerramos
        this.expandedRows = this.expandedRows.filter(i => i !== index);
      } else {
        // Si no está expandido, lo abrimos
        this.expandedRows.push(index);
      }
    },
    isRowExpanded(index) { // Método para verificar si una fila está expandida
      return this.expandedRows.includes(index);
    },
    copyLink(link) { // Método para copiar el link
      const el = document.createElement('textarea');
      el.value = link;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.copiedLinks.push(link);

      setTimeout(() => { // Eliminar el enlace copiado después de dos segundos
        const index = this.copiedLinks.indexOf(link);
        if (index !== -1) {
          this.copiedLinks.splice(index, 1);
        }
      }, 2000);
    },
    formatDate(unixTimestamp) {
      const date = new Date(unixTimestamp * 1000); // Convert UNIX timestamp to milliseconds
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
    formatDateToDDMMYYYY(dateString) {
      const [year, month, day] = dateString.split('-');
      return `${day}-${month}-${year}`;
    },
    setSearchStatus(status) {
      this.searchStatus = status === 'Firmado';
      if (status === 'Todos') {
        this.searchStatus = '';
      }
      this.showDropdown = false;
      this.searchDocuments();
    },
    searchDocuments() {
      const searchTerm = this.searchTerm.trim().toLowerCase();
      const searchDate = this.searchDate;
      const searchStatus = this.searchStatus;
      console.log(searchDate);
      const todasLasSolicitudesOriginal = [...this.todasLasSolicitudesOriginal];

      // Si tanto el término de búsqueda como la fecha de búsqueda están vacíos, mostrar todas las solicitudes
      if (!searchTerm && !searchDate && searchStatus === '') {
        this.todasLasSolicitudes = [...this.todasLasSolicitudesOriginal];
        return;
      }



      // Filtrar las solicitudes por ID de documento y fecha de creación
      this.todasLasSolicitudes = todasLasSolicitudesOriginal.filter(solicitud => {
        const matchesSearchTerm = !searchTerm || solicitud.id_custom_client.toString().toLowerCase().includes(searchTerm);
        const matchesSearchDate = !searchDate || this.formatDate(solicitud.created_at) === this.formatDateToDDMMYYYY(searchDate);
        const matchesSearchStatus = searchStatus === '' || solicitud.is_finished === searchStatus;
        return matchesSearchTerm && matchesSearchDate && matchesSearchStatus;
      });
    },
    fetchTodasLasSolicitudes() { // TODO: acomodar para obtener en que pagina estamos
      this.loading = true;
      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': getCookie('token')
      };

      axios.get(`https://firmasxw.com/test/list?page=${this.currentPage}`, { headers })
        .then(response => {
          this.todasLasSolicitudes = response.data.splice(0, 15);
          this.todasLasSolicitudesOriginal = this.todasLasSolicitudes;
          this.loading = false;
        })
        .catch(error => {
          console.error('Error al obtener todas las solicitudes:', error);
          this.loading = false;
        });
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;

      this.fetchTodasLasSolicitudes();
    },
    nextPage() {
      if (this.todasLasSolicitudes.length === 15) {
        this.currentPage += 1;
        console.log(this.currentPage);
        this.fetchTodasLasSolicitudes();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
        this.fetchTodasLasSolicitudes();
      }
    },
    beforeDestroy() {
      document.removeEventListener('click', this.closeDropdownOnClickOutside);
    }
  }
}
</script>


<!-- El icono de fecha -->
<style>
::-webkit-calendar-picker-indicator {
  margin-left: -15px;
}
</style>