<template>
  <div class="login-container">
    <div class="login-card">
      <form @submit.prevent="submitForm">
        <div class="form-group" style="display: flex; align-items: center;">
          <label for="username">Username:</label>
          <input type="text" class="input_username_and_password" id="username" v-model="email" />
        </div>
        <div class="form-group" style="display: flex; align-items: center;">
          <label for="password">Password:</label>
          <input type="password" class="input_username_and_password" id="password" v-model="password" />
        </div>
        <button type="submit" class="login-button">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async submitForm() {
        console.log('Iniciando tentativa de login com:', this.email); // Logar início do processo de login
          const response = await fetch(`http://localhost:3000/mecanics/${this.email}`);
          console.log('Resposta da API:', response.status); // Logar status da resposta

          if (response.ok) {
            const users = await response.json();
            console.log('Usuários retornados pela API:', users); // Logar os usuários retornados

            if (users != null) {
              console.log('Usuário encontrado:', users.password); // Logar usuário encontrado

              if (this.verificaPassword(users.password, this.password)) {
                console.log('Login bem-sucedido para:', users.id); // Logar sucesso no login
                this.$emit('login-success');

              } else {
                console.error('Credenciais inválidas ou usuário não encontrado');
                this.$emit('login-failure');
              }
            } else {
              console.error('Nenhum usuário encontrado com esse e-mail');
              this.$emit('login-failure');
            }
          } else {
            console.error('Erro ao fazer login: resposta não OK');
            this.$emit('login-failure');
          }
      },
      verificaPassword(passwordGuardada, passwordLogin) {
        return passwordGuardada === passwordLogin;
      }
    }
  };
  
  </script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
}

.login-card {
  justify-content: center;
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
  text-align: center;
  position: relative;
  right: 350px;
}

.login-button {
  align-items: center;
  align-self: center;
  width: 40%;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.input_username_and_password {
  font-size: 13px;
  border-radius: 4px;
  line-height: 1.5;
  padding: 5px 10px;
  transition: box-shadow 100ms ease-in, border 100ms ease-in, background-color 100ms ease-in;
  border: 2px solid #dee1e2;
  color: rgb(14, 14, 16);
  background: #dee1e2;
  display: block;
  height: 35px;
  margin-bottom: 30px;
  :hover {
      border-color: #ffffff;
  }
  :focus{
      border-color: #9147ff;
      background: #fff;
  }
}

.form-group label {
  display: block;
  padding: 5px 10px;
  height: 35px;
  background-color: #86888a;
  color: #fff;
  border-radius: 4px 0 0 4px;
  margin-bottom: 30px;
}
                
</style>
