<template>
  <div class="header">
    <h1 class="header-text">Serviços Atribuídos</h1>
    <button class="action-button"@click="navigateToBeginPage()">Logout</button>
  </div>
</template>

<script>
export default {
  methods: {
    navigateToBeginPage() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.header {
  display: flex; /* Usa o layout flexível */
  align-items: center;
  background-color: #286cd4;
  color: white;
  padding: 50px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 50px;
}

.action-button {
  background-color: #878787;
  color: #f0f0f0;
  right: 15%;
  border: 2px solid #878787;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  height: 50px; /* Ajuste a altura conforme necessário */
  font-size: 25px;
  height: 50px;
  width: 150px;
}

.header-text {
  font-family: Arial, sans-serif;
  font-size: 70px;
  margin: 0 auto;
}
</style>
