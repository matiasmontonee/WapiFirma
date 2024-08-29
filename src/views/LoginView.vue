<template>
  <div class="lg:flex h-screen">
    <div class="lg:w-1/2 text-white text-center p-4" style="background-color: #54DFA3;">
      <h1 class="lg:text-5xl text-3xl lg:mt-12 font-semibold">Iniciar Sesión</h1>
      <div id="login" class="lg:mx-32 mx-16">
        <GoogleLogin :callback="callback" prompt auto-login class="my-8"></GoogleLogin>

        <form method="POST" class="flex flex-col">
          <label for="email" class="mb-1 text-lg text-left">Email</label>
          <input type="email" name="email" class="h-12 rounded-md mb-4 text-black px-2" required />
          <label for="password" class="mb-1 text-lg text-left">Contraseña</label>
          <input type="password" name="password" class="h-12 rounded-md mb-4 text-black px-2" required />
          <p class="underline hover:text-gray-200 cursor-pointer mb-4 text-left">Olvidé mi contraseña</p>
          <button class="p-2 lg:mb-0 mb-2 rounded-md hover:bg-blue-300 font-bold" style="background-color: #13B07F;">Iniciar Sesión</button>
        </form>
      </div>
    </div>

    <div class="lg:w-1/2 bg-white">
      <img src="../assets/img/fxwbanner-2.png" alt="FxW Logo" class="w-2/4 mx-auto mt-12 mb-8">
      <p class="text-2xl md:text-3xl lg:text-4xl text-center font-bold mx-12 mb-4" style="color: #54DFA3">Firmá todos tus documentos desde cualquier lugar con <span style="color: #13B07F;">FirmaXW</span></p>
      <p class="text-2xl md:text-3xl lg:text-4xl text-center font-bold mx-8 mb-4" style="color: #54DFA3;">Simple. Rápido. Legal.</p>
      <img src="../assets/img/login.png" alt="FxW Logo" class="w-1/4 mx-auto">
    </div>
  </div>
</template>

<script>
import { decodeCredential } from 'vue3-google-login';

export default {
  methods: {
    callback(response) {
      const userData = decodeCredential(response.credential);
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData)); // Almacena los datos del usuario en el almacenamiento local
        this.$emit('login', userData);
      } else {
        console.error('Authentication failed');
      }
    }
  }
}
</script>