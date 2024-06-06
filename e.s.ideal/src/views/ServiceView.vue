<template>
    <div v-if= "defService.id" class="header">
        <h1 class="header-text">{{ defService.descr }}</h1>
        <button class="action-button"@click="navigateToBeginPage()">Logout</button>
    </div>
    <div class="container-1">
        <h2 class="card-heading">Veículo</h2>
        <div v-if= "carData.id" class="item">
            <h2 class="line">Matrícula: {{ carData.id }}</h2>
            <h2 class="line">Cilindrada: {{ carData.cilindrada }}</h2>
            <h2 class="line">KMs: {{ carData.kms }}</h2>
        </div>
    </div>
    <div class="container-2">
        <h2 class="card-heading">Cliente</h2>
        <div v-if= "clientData.id" class="item">
            <h2 class="line">Nome: {{ clientData.nome }}</h2>
            <h2 class="line">Contacto: {{ clientData.telefone }}</h2>
            <h2 class="line">Email: {{ clientData.email }}</h2>
        </div>
    </div>
    <div class="container-3">
        <h2 class="card-heading">Serviço</h2>
        <div v-if="serviceData.id && defService.id" class="item-bottom">
            <div class="details-container">
                <div class="column1">
                    <h2 class="line">Duração: {{ defService.duração }}</h2>
                    <h2 class="line">Estado: {{ serviceData.estado }}</h2>
                    <h2 class="line">Agendamento: {{ serviceData.agendamento }}</h2>
                </div>
                <div class="column2">
                    <h2 class="line">Descrição: {{ serviceData.descrição }}</h2>
                </div>
            </div>
        </div>
    </div>
        <button class="action-button-1" @click="navigateToOtherPage()">Retornar</button>
        <button class="action-button-2" @click="getDataStateChange('suspender')">Suspender</button>
        <button class="action-button-3" @click="navigateToEndService()">Finalizar</button>
        <button class="action-button-4" @click="getDataStateChange('cancelar')">Cancelar</button>
        <button class="action-button-5" @click="getDataStateChange('comecar')">Começar</button>
</template>
  
<script>
export default {
  data() {
    return {
      items: [
        { id: 1, title: 'Item 1', description: 'Descrição do Item 1' },
        { id: 2, title: 'Item 2', description: 'Descrição do Item 2' }
      ],
      serviceData: {
        id: '',
        vehicleId: '',
        serviceDefinitionId: '',
        estado: '',
        agendamento: '',
        descricao: ''
      },
      carData: {},
      clientData: {},
      defService: {}
    };
  },
  methods: {
    
    navigateToOtherPage() {
      this.$router.push('/servicosatribuidos/agendados');
    },
    navigateToBeginPage() {
      this.$router.push('/');
    },
    navigateToEndService() {
      this.$router.push('/finalizarservico');
      getDataStateChange('concluido');
    },
    getDataStateChange(option) {
        const currentRoute = this.$route.path;
        const currentID = currentRoute.split('/servico/')[1];
        fetch(`http://localhost:3000/services/${currentID}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch service data');
            }
        })
        .then(data => {
            this.serviceData = data;
            if (option == "suspender") this.serviceSuspend(this.serviceData)
            if (option == "concluir") this.serviceFinish(this.serviceData)
            if (option == "comecar") this.serviceBegin(this.serviceData)
            if (option == "cancelar") this.serviceCancelled(this.serviceData)

        })
        .catch(error => console.error('Erro ao buscar dados do serviço:', error));
    },
    serviceSuspend(serviceData) {
        // Verifica se o serviço possui um ID válido
        if (!serviceData.id) {
            console.error('ID do serviço inválido');
            return;
        }

        if (serviceData.estado === 'parado') {
            alert('O serviço não pode ser suspenso.');
            return;
        }
        if (serviceData.estado === 'realizado') {
            alert('O serviço não pode ser suspenso porque já foi realizado');
            return;
        }

        this.$router.push(`/servico/${serviceData.id}/suspender`);

        const novoEstado = 'parado'
        alert('O estado do serviço foi alterado com sucesso.');

        // Cria o objeto de dados a ser enviado
        const dados = {
            estado: novoEstado
        };

        // Envia a solicitação PATCH para atualizar o estado do serviço
        fetch(`http://localhost:3000/services/${serviceData.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
        .then(response => {
            if (response.ok) {
                console.log('Estado do serviço atualizado com sucesso');
                // Atualiza o estado localmente
                serviceData.estado = novoEstado;
            } else {
                throw new Error('Failed to update service state');
            }
        })
        .catch(error => console.error('Erro ao atualizar o estado do serviço:', error));
    },
    serviceBegin(serviceData) {
        // Verifica se o serviço possui um ID válido
        if (!serviceData.id) {
            console.error('ID do serviço inválido');
            return;
        }

        if (serviceData.estado === 'começado') {
            alert('O serviço não pode ser começado porque já se encontra a decorrer.');
            return;
        }
        if (serviceData.estado === 'realizado') {
            alert('O serviço não pode ser começado porque já foi concluído');
            return;
        }


        // Define o novo estado para "nafila"
        const novoEstado = 'começado'
        alert('O estado do serviço foi alterado com sucesso.');

        // Cria o objeto de dados a ser enviado
        const dados = {
            estado: novoEstado
        };

        // Envia a solicitação PATCH para atualizar o estado do serviço
        fetch(`http://localhost:3000/services/${serviceData.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
        .then(response => {
            if (response.ok) {
                console.log('Estado do serviço atualizado com sucesso');
                // Atualiza o estado localmente
                serviceData.estado = novoEstado;
            } else {
                throw new Error('Failed to update service state');
            }
        })
        .catch(error => console.error('Erro ao atualizar o estado do serviço:', error));
    },
    serviceFinish(serviceData) {
        // Verifica se o serviço possui um ID válido
        if (!serviceData.id) {
            console.error('ID do serviço inválido');
            return;
        }

        if (serviceData.estado === 'realizado') {
            alert('O serviço não pode ser concluído porque já foi realizado.');
            return;
        }

        // Define o novo estado para "realizado"
        const novoEstado = 'realizado'
        alert('O estado do serviço foi alterado com sucesso.');

        // Cria o objeto de dados a ser enviado
        const dados = {
            estado: novoEstado
        };

        // Envia a solicitação PATCH para atualizar o estado do serviço
        fetch(`http://localhost:3000/services/${serviceData.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
        .then(response => {
            if (response.ok) {
                console.log('Estado do serviço atualizado com sucesso');
                // Atualiza o estado localmente
                serviceData.estado = novoEstado;
            } else {
                throw new Error('Failed to update service state');
            }
        })
        .catch(error => console.error('Erro ao atualizar o estado do serviço:', error));
    },
    serviceCancelled(serviceData) {
        // Verifica se o serviço possui um ID válido
        if (!serviceData.id) {
            console.error('ID do serviço inválido');
            return;
        }

        if (serviceData.estado === 'nafila') {
            alert('O serviço não pode ser cancelado porque já se encontra na fila.');
            return;
        }
        if (serviceData.estado === 'realizado') {
            alert('O serviço não pode ser cancelado porque já foi concluído.');
            return;
        }

        // Define o novo estado para "realizado"
        const novoEstado = 'nafila'
        alert('O estado do serviço foi alterado com sucesso.');

        // Cria o objeto de dados a ser enviado
        const dados = {
            estado: novoEstado
        };

        // Envia a solicitação PATCH para atualizar o estado do serviço
        fetch(`http://localhost:3000/services/${serviceData.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
        .then(response => {
            if (response.ok) {
                console.log('Estado do serviço atualizado com sucesso');
                // Atualiza o estado localmente
                serviceData.estado = novoEstado;
            } else {
                throw new Error('Failed to update service state');
            }
        })
        .catch(error => console.error('Erro ao atualizar o estado do serviço:', error));
    },
    getServiceData(serviceId) {
      fetch(`http://localhost:3000/services/${serviceId}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch service data');
          }
        })
        .then(data => {
          this.serviceData = data;
          console.log('Dados do serviço:', this.serviceData);
          this.getCarData(this.serviceData.vehicleId);
          this.getDefData(this.serviceData.serviceDefinitionId);

        })
        .catch(error => console.error('Erro ao buscar dados do serviço:', error));
    },
    getDefData(defId) {
        fetch(`http://localhost:3000/service-definitions/${defId}`)
        .then(response => {
            if (response.ok) {
            return response.json();
            } else {
            throw new Error('Failed to fetch car data');
            }
        })
        .then(data => {
            // Manipule os dados do veículo conforme necessário
            console.log('Dados do veículo:', data);
            this.defService = data;
        })
        .catch(error => console.error('Erro ao buscar dados do veículo:', error));
    },
    getCarData(vehicleId) {
        fetch(`http://localhost:3000/vehicles/${vehicleId}`)
        .then(response => {
            if (response.ok) {
            return response.json();
            } else {
            throw new Error('Failed to fetch car data');
            }
        })
        .then(data => {
            // Manipule os dados do veículo conforme necessário
            console.log('Dados do veículo:', data);
            this.carData = data;
            this.getClientData(this.carData.clientId)
        })
        .catch(error => console.error('Erro ao buscar dados do veículo:', error));
    },
    getClientData(clientId) {
        fetch(`http://localhost:3000/clients/${clientId}`)
        .then(response => {
            if (response.ok) {
            return response.json();
            } else {
            throw new Error('Failed to fetch car data');
            }
        })
        .then(data => {
            // Manipule os dados do veículo conforme necessário
            console.log('Dados do Cliente:', data);
            this.clientData = data;
        })
        .catch(error => console.error('Erro ao buscar dados do veículo:', error));
    }
  },
  mounted() {
    // Aqui você pode acessar o link atual
    const currentRoute = this.$route.path;
    const currentID = currentRoute.split('/servico/')[1];
    this.getServiceData(currentID);
    
  }
}
</script>
  <style>
    body {
        background-color: white;
    }

    .header-text {
        font-weight: bold; 
        padding-left: 10px;
    }
    
    .container-1 {
        background-color: #808080;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-wrap: wrap;
        width: calc(50% - 200px); 
        max-width: 100%;
        border-radius: 10px;
        justify-content: flex-start;
        position: absolute;
        top: 12%;
        left: 100px;
    }

    .container-2 {
        background-color: #808080;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-wrap: wrap;
        width: calc(50% - 120px); 
        max-width: 100%;
        border-radius: 10px;
        justify-content: flex-start;
        position: absolute;
        right: 10%;
        top: 12%;
        left: 50%;
    }

    .container-3 {
        background-color: #808080;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-wrap: wrap;
        width: 88.6%;
        border-radius: 10px;
        justify-content: flex-start;
        position: absolute;
        left: 5.1%;
        height: auto;
        top: 390px;
    }

    .card-heading {bottom: 15%;
        font-size: 35px;
        font-weight: bold; 
        padding: 5px; 
        padding-left: 10px;
        color: white; 
    }

    .line {
        color:black;
        font-size: 25px;
        font-weight: bold; 
        padding-left: 10px;
    }

    .item {
        position: relative; /* Define a posição relativa para o item */
        background-color: #d9d9d9;
        border-radius: 10px;
        width: 100%; 
        max-width: 100%;
        color: #f0f0f0;
        font-size: 20px;
        padding: 0.5%;
        height: 200px;
    }

    .item-bottom {
        position: relative; /* Define a posição relativa para o item */
        background-color: #d9d9d9;
        border-radius: 10px;
        width: 100%; 
        max-width: 100%;
        color: #f0f0f0;
        font-size: 20px;
        padding: 0.5%;
        height: 350px;
    }
    
    .item-content {
        padding: 10px;
    }

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
        font-weight: bold;
        color: #f0f0f0;
        border: 2px solid #878787;
        border-radius: 10px;
        position: relative;
        cursor: pointer;
        height: 50px;
        font-size: 25px;
        height: 50px;
        width: 150px;
    }

    .action-button-1 {
        background-color: #286cd4; 
        font-weight: bold;
        color: #f0f0f0;
        border: 2px solid #b0b0b0;
        border-radius: 10px;
        position: relative;
        cursor: pointer;
        font-size: 25px;
        padding: 2%;
        width: 40%;
        top: 465px;
        right: 101%;
    }
    .action-button-2 {
        background-color: #286cd4; 
        font-weight: bold;
        color: #f0f0f0;
        border: 2px solid #b0b0b0;
        border-radius: 10px;
        position: relative;
        cursor: pointer;
        font-size: 25px;
        padding: 2%;
        width: 40%;
        top: 465px;
        right: 60%
    }
    .action-button-3 {
        background-color: #286cd4; 
        font-weight: bold;
        color: #f0f0f0;
        border: 2px solid #b0b0b0;
        border-radius: 10px;
        position: relative;
        cursor: pointer;
        font-size: 25px;
        padding: 2%;
        width: 40%;
        top: 400px;
        left: 65%
    }
    .action-button-4 {
        background-color: red; 
        font-weight: bold;
        color: #f0f0f0;
        border: 2px solid #b0b0b0;
        border-radius: 10px;
        position: relative;
        cursor: pointer;
        font-size: 25px;
        padding: 2%;
        width: 40%;
        top: 400px;
        left: 117%;
    }
    .action-button-5 {
        background-color: green; 
        font-weight: bold;
        color: #f0f0f0;
        border: 2px solid #b0b0b0;
        border-radius: 10px;
        position: relative;
        cursor: pointer;
        font-size: 25px;
        padding: 2%;
        width: 40%;
        top: 333px;
        left: 22%;
    }

    .header-text {
        font-family: Arial, sans-serif;
        font-size: 70px;
        margin: 0 auto;
    }

    .details-container {
        display: flex;
    }

    .column1, .column2 {
        flex: 1;
    }
</style>
  