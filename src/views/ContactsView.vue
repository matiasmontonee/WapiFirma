<template>
  <NavbarComponent :user="user" @logout="logout" />

  <main class="flex p-4 pt-0 lg:ml-56 bg-gray-100">
    <div class="rounded-2xl w-full bg-white">
      <table class="w-full">
        <thead>
          <tr class="border-b">
            <th class="pl-6 pt-5 pb-3 text-left text-sm">
              <div class="flex items-center">
                <i class="fas fa-search mr-2 text-blue-400 cursor-pointer"></i>
                <input class="text-gray-400 focus:outline-none" placeholder="Nombre" />
              </div>
            </th>
            <th class="pt-5 pb-3 text-left text-sm">
              <div class="flex items-center">
                <i class="fas fa-search mr-2 text-blue-400 cursor-pointer"></i>
                <input class="text-gray-400 focus:outline-none" placeholder="Apellido" />
              </div>
            </th>
            <th class="pt-5 pb-3 text-left text-sm">
              <div class="flex items-center">
                <i class="fas fa-search mr-2 text-blue-400 cursor-pointer"></i>
                <input class="text-gray-400 focus:outline-none" placeholder="Dni/Ci" />
              </div>
            </th>
            <th class="pt-5 pb-3 text-left text-sm">
              <div class="flex items-center">
                <i class="fas fa-search mr-2 text-blue-400 cursor-pointer"></i>
                <input class="text-gray-400 focus:outline-none" placeholder="WhatsApp" />
              </div>
            </th>
            <th class="pt-5 pb-3 text-left text-sm">
              <div class="flex items-center">
                <i class="fas fa-search mr-2 text-blue-400 cursor-pointer"></i>
                <input class="text-gray-400 focus:outline-none" placeholder="Email" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-gray-800">
            <td class="pt-2 text-sm pl-6">
              <div class="my-2">Claudia</div>
              <div class="my-2">Ramiro</div>
              <div class="my-2">Andrés</div>
              <div class="my-2">Luis</div>
            </td>
            <td class="pt-2 text-sm">
              <div class="my-2">Alves</div>
              <div class="my-2">Pedraza</div>
              <div class="my-2">Osanz</div>
              <div class="my-2">Petri</div>
            </td>
            <td class="pt-2 text-sm">
              <div class="my-2">33177345</div>
              <div class="my-2">12345876</div>
              <div class="my-2">23487123</div>
              <div class="my-2">9874521</div>
            </td>
            <td class="pt-2 text-sm">
              <div class="my-2">+5491137681841</div>
              <div class="my-2">-</div>
              <div class="my-2">+5491137681841</div>
              <div class="my-2">-</div>
            </td>
            <td class="pt-2 text-sm">
              <div class="my-2">-</div>
              <div class="my-2">ramiro@gmail.com</div>
              <div class="my-2">-</div>
              <div class="my-2">luis@hotmail.com</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue';

export default {
  emits: ['login','logout'],
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
    }
  }
}
</script>
