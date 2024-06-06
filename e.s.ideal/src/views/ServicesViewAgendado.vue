<template>
  <Header />
  <div class="container-1">
    <h2 class="card-heading">Serviços</h2>
    <div class="dropdown">
      <button class="dropbtn" @click="toggleDropdown">{{ showDropdown ? 'Fechar' : 'Agendado' }}</button>
      <div class="dropdown-content" v-show="showDropdown">
        <a @click="filterServices('Livre')" href="/servicosatribuidos/livres">Livre</a>
      </div>
    </div>
    <div class="container">
      <div class="item-content">
        <Card 
          v-for="service in services" 
          :key="service.id"
          :service="service"
          class="service-card">
        </Card>
      </div>
    </div>
</div>
</template>


<script>
import Header from '@/components/icons/ServicesHeader.vue';
import Card from '@/components/ui/Card.vue';

export default {
  components: {
    Header, 
    Card
  },
  data() {
    return {
      services: [],
      showDropdown: false,
      dropdownOptions: [
        { text: 'Agendado', value: 'Agendado' },
        { text: 'Livre', value: 'Livre' }
      ],
      selectedFilter: null
    }
  },
  methods: {
    getServices() {
      fetch('http://localhost:3000/services')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong');
          }
        })
        .then(data => {
          const filteredServices = data.filter(service => service.agendamento === 'programado');

          this.services = filteredServices; 
        })
        .catch(error => console.log(error));
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    filterServices(type) {
      this.selectedFilter = type;
    }
  },
  created() {
    this.getServices();
  }
}
</script>

<style>
.container-1 {
  position: relative; 
  background-color: #808080;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  width: 160%;
  border-radius: 10px;
  justify-content: flex-start;
  left: -28%;
  height: 300%;
  margin-top: 0px;

  }

  .container {
    background-color: #d8d8d9;
    display: flex;
    flex-wrap: wrap;
    border-radius: 10px;
    justify-content: flex-start;
    width: 100%;
  }

  .card-heading {
    bottom: 15%;
    font-size: 45px;
    font-weight: bold; 
    padding: 10px; 
    padding-left: 10px;
    color: none; 
  }

  .item {
    position: relative;
    background-color: #1b8fdc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 100%;
    color: #f0f0f0;
    margin-left: 2%;
    margin-top: 1.5%;
    margin-bottom: 1.5%;
    height: 100px;
    font-size: 20px;
  }

  .action-button {
    position: absolute; /* Define a posição absoluta para o botão */
    margin-top: 20px;
    margin-right: -8.75%;
    width: 20%;
    max-width: 100%;
    right: -12.5%; /* Ajusta a posição horizontal do botão */
    background-color: #1b8fdc; /* Cor de fundo do botão */
    color: #f0f0f0; /* Cor do texto do botão */
    border: 2px solid #1b8fdc; /* Borda do botão */
    border-radius: 10px;
    cursor: pointer; 
    height: 100px;
    font-size: 20px;
  }

  .item-content {
    padding: 20px; 
    width: 100%;
  }

  .service-card {
    cursor: pointer;
    margin-top: 20px;
    transition: all 0.3s ease-in;
  }

  .dropdown {
  position: relative; /* Make the dropdown relative to its container */
  display: inline-block; /* Allow the button to stay inline */
  padding: 30px;
  position: absolute; /* or relative or fixed */
  right: 0;

}

.dropdown-content {
  position: absolute; /* Make the content position absolute relative to the dropdown */
  right: 20%; /* Position the content at the right side */
  background-color: #f1f1f1; /* Light background color for the dropdown */
  min-width: 160px; /* Set a minimum width for the content */
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); /* Add a slight shadow */
  z-index: 1; /* Ensure the content is on top of other elements */
  border-radius: 5px; /* Add border radius for rounded corners */
  font-size: 20px;
}

.dropdown-content a {
  display: block; /* Display options as blocks to stack them vertically */
  padding: 10px 16px; /* Add some padding for better readability */
  color: black; /* Set text color for options */
}

.dropbtn {
    font-size: 20px; /* Increase the font size */
    padding: 5px; /* Add padding around the text */
    padding-right: 20px;
    padding-left: 20px;
  }


</style>