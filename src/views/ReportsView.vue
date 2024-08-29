<template>
  <NavbarComponent :user="user" @logout="logout" />

  <main class="flex p-4 pt-0 lg:ml-56 bg-gray-100">
    <div class="rounded-2xl w-full overflow-x-auto bg-white">
      <select class="m-6 mt-4 p-2 w-38 rounded border border-gray-300">
        <option value="30" selected>Últimos 30 días</option>
        <option value="15">Últimos 15 días</option>
        <option value="7">Últimos 7 días</option>
        <option value="hoy">Hoy</option>
      </select>

      <table class="w-full mb-72">
        <thead>
          <tr class="border-b">
            <th class="pl-12 pb-3 text-left text-sm">
              <p class="text-gray-400">Usuario</p>
            </th>
            <th class="pr-6 pb-3 text-left text-sm">
              <p class="text-gray-400">Creados</p>
            </th>
            <th class="pr-6 pb-3 text-left text-sm">
              <p class="text-gray-400">Firmados</p>
            </th>
            <th class="pr-6 pb-3 text-left text-sm">
              <p class="text-gray-400">Comenzados</p>
            </th>
            <th class="pr-6 pb-3 text-left text-sm">
              <p class="text-gray-400">Rechazados</p>
            </th>
            <th class="pb-3 text-left text-sm">
              <p class="text-gray-400">Efectividad</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="pl-8 py-2 font-bold">
              <p>Todos</p>
            </td>
            <td class="text-sm pl-5 py-2 font-bold">
              <p>26</p>
            </td>
            <td class="text-sm pl-6 py-2 font-bold">
              <p>12</p>
            </td>
            <td class="text-sm pl-9 py-2 font-bold">
              <p>11</p>
            </td>
            <td class="text-sm pl-9 py-2 font-bold">
              <p>3</p>
            </td>
            <td class="text-sm pl-7 py-2 font-bold">
              <p>46%</p>
            </td>
          </tr>
          <tr>
            <td class="pl-8 py-2 text-sm">
              <p>Ramiro Pedraza</p>
            </td>
            <td class="text-sm pl-5 py-2">
              <p>23</p>
            </td>
            <td class="text-sm pl-6 py-2">
              <p>10</p>
            </td>
            <td class="text-sm pl-9 py-2">
              <p>10</p>
            </td>
            <td class="text-sm pl-9 py-2">
              <p>3</p>
            </td>
            <td class="text-sm pl-7 py-2">
              <p>43%</p>
            </td>
          </tr>
          <tr>
            <td class="pl-8 py-2 text-sm">
              <p>Jaime Mezinas</p>
            </td>
            <td class="text-sm pl-6 py-2">
              <p>3</p>
            </td>
            <td class="text-sm pl-7 py-2">
              <p>2</p>
            </td>
            <td class="text-sm pl-10 py-2">
              <p>1</p>
            </td>
            <td class="text-sm pl-9 py-2">
              <p>0</p>
            </td>
            <td class="text-sm pl-7 py-2">
              <p>66%</p>
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
