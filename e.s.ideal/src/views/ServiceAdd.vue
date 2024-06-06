<template>
    <header class="header">
        <div class="container">
            <div class="left-side">
                <h1>Finalizar Serviço</h1>
            </div>
            <div class="right-side">
                <router-link to="/logout">Logout</router-link>
            </div>
        </div>
    </header>

    <div class="section">
    <div class="dropdown-container">
      <label for="service-dropdown">Escolha o Serviço que deseja acrescentar:  </label>
      <div class="dropdown">
        <button class="dropdown-button" @click="toggleDropdown">
          <span v-if="selectedService">{{ selectedService }}</span>
          <span v-else>Selecionar Serviço</span>
          <i class="fas fa-chevron-down" />
        </button>
        <div class="dropdown-content" v-show="showDropdown">
          <ul>
            <li v-for="service in services" :key="service.id">
              <a href="#" @click="selectService(service)">{{ service.name }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="input-container">
      <label for="service-input">Lista de Serviços acrescentados:</label>
      <textarea id="service-input" v-model="addedServices" readonly>{{ addedServices }}</textarea>
    </div>
    <button class="action-button-1" @click="handleReturn">Retornar</button>
    <button class="action-button-2" @click="handleFinalize">Finalizar</button>
  </div>

</template>

  
<script>
export default {
  name: 'ServiceSelection',
  data() {
    return {
      services: [
        { id: 1, name: 'Substituir pneus' },
        { id: 2, name: 'Alinhar direção' },
        { id: 3, name: 'Mudar óleo travões' },
        { id: 4, name: 'Limpeza interior' },
        { id: 5, name: 'Limpeza exterior' },
      ],
      selectedService: null,
      showDropdown: false,
      addedServices: '',
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    selectService(service) {
      this.selectedService = service.name;
      this.showDropdown = false;
      this.addedServices += `${service.name} \n`;
    },
    handleReturn() {
      // Implement logic to handle returning
      console.log('Returning...');

      // Example: Navigate to a previous page or route
      this.$router.push('/previous-page');
    },
    handleFinalize() {
      // Implement logic to handle finalizing
      console.log('Finalizing...');
      this.$router.push('/servicosatribuidos/agendados')
      
    },
  },
};
</script>

<style>
.header {
  background-color: #286cd4;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Ensure it's on top of other elements */
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1024px;
  margin: 0 auto;
}

.left-side {
  flex: 1;
  text-align: center; /* Center the text horizontally */
}

.left-side h1 {
  margin: 0;
  font-weight: bold;
  font-size: 60px;
}

.right-side a {
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
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 4px;
  margin-right: 20px;
}

.right-side a:hover {
  background-color: gray;
}

.section label,
#service-input {
  color: black;
}

.section {
  position: absolute;
  top: 100px;
  left: 0;
  padding: 20px;
  width: 100%; 
}

.dropdown {
  position: relative;
  padding: 10px;
}

.dropdown-container {
  display: flex;
}

.label-container {
  flex: 1; 
}

.label-container label {
  margin-right: 10px; /* Add space between label and dropdown */
}

.dropdown-container label,
.input-container label {
  font-size: 30px; /* Increase the font size */
  font-weight: bold; /* Make the text bold */
}

.dropdown-content {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #f1f1f1;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 5px;
}

.dropdown-content a {
  display: block;
  padding: 10px 16px;
  color: black;
  text-decoration: none;
}

.dropdown-button {
  padding: 10px 25px;
  font-size: 18px; 
  width: 100%;
}

/* Actions */
.buttons-container {
  display: flex;
  justify-content: space-around;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 20px;
}

.service-selection {
  display: flex;
  gap: 10px;
}

#service-input {
  font-size: 20px;
  height: 50vh;
  width: 95%;
  padding: 5px 10px;
}

.card-heading {
  margin: 0;
  padding: 10px 0;
}

.dropdown-container, .input-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
}

.input-container {
        margin-top: 20px; /* Add some space between dropdown and the added services list */
}

.actions {
  display: flex;
  justify-content: center; /* Centers the buttons horizontally */
  padding: 20px 0; /* Optional padding */
  background-color: #286cd4;
  font-weight: bold;
}

.action-button-1 {
  background-color: #286cd4;
  font-weight: bold;
  color: #f0f0f0;
  border: 2px solid #b0b0b0;
  border-radius: 10px;
  position:relative;
  cursor: pointer;
  font-size: 25px;
  width: 10%;
}

.action-button-2 {
  background-color: #286cd4;
  font-weight: bold;
  color: #f0f0f0;
  border: 2px solid #b0b0b0;
  border-radius: 10px;
  position:relative;
  cursor: pointer;
  font-size: 25px;
  width: 10%;
  left: 75%
}

.action-button {
    background-color: #286cd4;
    font-weight: bold;
    color: #f0f0f0;
    border: 2px solid #b0b0b0;
    border-radius: 10px;
    cursor: pointer;
    font-size: 25px;
    padding: 10px 20px; /* Adjust padding as necessary */
    width: auto; /* or specify a width if you prefer */
    text-align: center;
    display: block;
    margin: 10px 0; /* This adds spacing around the button, adjust as needed */
  }

  .action-button:not(.dropdown-button) {
    width: 10%; /* Keep the original width for Retornar and Finalizar buttons */
    position:relative;
    left: auto; /* Reset the left property for the Retornar and Finalizar buttons */
  }

</style>