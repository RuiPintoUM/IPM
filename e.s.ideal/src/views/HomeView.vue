<template>
  <div>
    <Header />

    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="form-container">
          <Login @login-success="handleLoginSuccess" @login-failure="handleLoginFailure" />
          <div v-if="showErrorMessage" class="error-message">
            Credenciais Incorretas/Inválidas!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Login from '../components/Login.vue';
import { useRouter } from 'vue-router'; // Import useRouter from vue-router

export default {
  name: 'HomeView',
  components: {
    Header,
    Login
  },
  data() {
    return {
      showErrorMessage: false
    };
  },
  methods: {
    handleLoginSuccess() {
      // Se o login for bem-sucedido, redirecione o usuário para a página de serviços atribuídos
      const router = useRouter();
      this.$router.push('/servicosatribuidos/agendados');
    },
    handleLoginFailure() {
      this.showErrorMessage = true;
      setTimeout(() => {
        this.showErrorMessage = false;
      }, 4000); //time out de 4 segundos para a mensagem de erro desaparecer
    }
  }
};
</script>

<style>
/* Add your styles here */
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 108%;
  margin-top: 20px;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
}

.input-field {
  width: 250px;
  height: 40px;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
}

</style>