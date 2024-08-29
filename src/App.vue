<template>
  <div>
    <router-view :user="user" @login="handleLogin" @logout="handleLogout" />
  </div>
</template>

<!-- TODO: Considerar en eliminar localSroage por seguridad y buena practica -->
<script>
import { setCookie, eraseCookie, getCookie} from './helpers/cookies';

async function createUser(email) {
  const response = await fetch(`https://firmasxw.com/test/createUsrOnLogin/${email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Error creating user');
  } else {
    const responseBody = await response.json();
    setCookie('token', responseBody.token, 7); 
  }
}

export default {
  data() {
    return {
      user: JSON.parse(getCookie('user')) || null
    };
  },
  methods: {
    async handleLogin(userData) {
      console.log(userData);
      this.user = userData;
      setCookie('user', JSON.stringify(userData.email), 7); 
      localStorage.setItem('user', JSON.stringify(userData)); 
      await createUser(userData.email)
      this.$router.push('/requests');
    },
    handleLogout() {
      this.user = null;
      eraseCookie('user');
      localStorage.removeItem('user');
      this.$router.push('/login');
    }
  }
}
</script>