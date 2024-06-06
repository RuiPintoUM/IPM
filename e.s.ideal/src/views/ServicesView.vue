<template>
  <Header />
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
      services: []
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
          this.services = data; 
        })
        .catch(error => console.log(error));
    },
  },
  created() {
    this.getServices();
  }
}
</script>

<style>
  .container {
    background-color: #d8d8d9;
    display: flex;
    flex-wrap: wrap;
    border-radius: 10px;
    justify-content: flex-start;
    margin-top: 10%;
    margin-left: -20%;
    margin-right: -20%;
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
    position: absolute;
    margin-top: 20px;
    margin-right: -8.75%;
    width: 20%;
    max-width: 100%;
    right: -12.5%;
    background-color: #1b8fdc;
    color: #f0f0f0; 
    border: 2px solid #1b8fdc;
    border-radius: 10px;
    cursor: pointer; 
    height: 100px;
    font-size: 20px;
  }

  .item-content {
    padding: 10px; 
    width: 100%;
  }

  .service-card {
    cursor: pointer;
    margin-top: 20px;
    transition: all 0.3s ease-in;
  }
</style>
