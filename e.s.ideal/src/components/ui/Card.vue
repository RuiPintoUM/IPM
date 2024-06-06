<template>
  <div class="card">
    <div class="container-big">
      <!-- Aplicar o router-link diretamente ao left-container -->
      <router-link :to="{ name: 'servico', params: { id: service.id } }" class="left-container">
        <h2>{{ serviceDescr }}</h2>
        <div class="left-container-agend">
        </div>
      </router-link>
      <div class="right-container" :style="{ 'background-color': estadoBackgroundColor() }">
        <h2>{{ estadoMessage() }}</h2>
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      serviceDescr: '',
      serviceDur: ''
    };
  },
  methods: {
    getServiceById(servicedefinitionId) {
      fetch(`http://localhost:3000/service-definitions/${servicedefinitionId}`) 
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong');
          }
        })
        .then(data => {
          this.serviceDescr = data.descr;
          this.serviceDur = data.duração;
        })
        .catch(error => console.log(error));
    },
    estadoMessage() {
      if (this.service.estado === 'parado') {
        return 'Suspenso';
      } else if (this.service.estado === 'realizado') {
        return 'Concluído';
      } else if (this.service.agendamento === 'programado') {
        const { dia, mes, ano, hora, minutos } = this.service.data;
        return `${dia}/${mes}/${ano} às ${hora}:${minutos}`;
      } else if (this.service.estado === 'nafila') {
        return `${this.serviceDur} minutos`;
      } else {
        return ``; 
      }
    },
    estadoBackgroundColor() {
      if (this.service.estado === 'parado') {
        return 'red';
      } else if (this.service.estado === 'realizado') {
        return 'green';
      } else {
        return ''; 
      }
    }
  },
  created() {
    this.getServiceById(this.service.serviceDefinitionId);
  }
}
</script>

<style scoped>
.card {
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 13px;
  border-radius: 20px;
  width: 100%;
}

.container-big {
  width: 100%;
  display: flex;
}

.right-container {
  display: block;
  margin-right: 0;
  border-radius: 0px 10px 10px 0px;
  background-color: #1b8fdc;
  color: #f0f0f0;
  font-size: 25px;
  width: 60%;
  text-align: center;
}

.left-container {
  width: 90%;
  border-radius: 10px 0 0 10px;
  border: 1px solid #1b8fdc;
  background-color: #1b8fdc;
  color: #f0f0f0;
  display: flex;
  font-size: 25px;
}

.left-container-agend {
  
  margin-left: auto; 
  margin-right: 0;
  font-size: 25px;
  color: #f0f0f0;
}

.card p {
  color: black;
}
</style>