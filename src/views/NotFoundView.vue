<template>
  <div class="text-center flex flex-col items-center sm:p-0 p-4 pt-0 mt-24">
    <img src="../assets/img/fxwbanner.png" alt="Login" class="h-48 mb-8">
    <h1 class="text-4xl text-red-500 font-bold mb-6">Página no encontrada</h1>
    <p class="text-lg mb-6">Lo sentimos, la página que estás buscando no existe.</p>
    <router-link to="/requests" class=" bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-md">
      <i class="fas fa-arrow-left text-xl"></i>
    </router-link>
  </div>
</template>