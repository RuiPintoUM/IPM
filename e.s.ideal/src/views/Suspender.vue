<template>
    <div class="header">
        <h1>Suspender Serviço</h1>
    </div>
    <div>
        <div class="header">
            <h1>Suspender Serviço</h1>
        </div>
        <div class="content">
            <!-- Big input box for reason to suspend service -->
            <textarea id="reason-input" class="reason-input" placeholder="Digite o motivo para suspender o serviço"></textarea>
            <div v-if="showErrorMessage" class="error-message">
              Credenciais Incorretas/Inválidas!
            </div>
            <!-- Buttons at the bottom -->
            <div class="buttons">
                <button class="return-button" @click="returnPage">Voltar</button>
                <button class="confirm-button" @click="suspendService">Confirmar</button>
            </div>
        </div>
    </div>
</template>
  
  <script>
    export default {
    data() {
      return {
        showErrorMessage: false
      };
    },
    methods: {
        suspendService() {
          const serviceId = this.$route.params.id;
          const reason = document.getElementById('reason-input').value;

          // Fetch the existing service data from the server
          fetch(`http://localhost:3000/services/${serviceId}`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to fetch service data');
              }
              return response.json();
            })
            .then(serviceData => {
              // Update the suspenso property in the existing service data
              serviceData.suspenso = reason;
              serviceData.estado = "parado";

              // Send the updated service data to the server
              return fetch(`http://localhost:3000/services/${serviceId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(serviceData)
              });
            })
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to suspend service');
              }
              this.$router.push('/servicosatribuidos/agendados');
            })
            .catch(error => {
              console.error('Error suspending service:', error);
              this.showErrorMessage = true;
              setTimeout(() => {
                this.showErrorMessage = false;
              }, 4000); 
            });
      },
      returnPage() {
        const serviceId = this.$route.params.id;
        this.$router.go(-1);
      }    
    }
}

  </script>
  
  <style>
  .header {
    background-color: #286cd4;
    color: white;
    padding: 20px;
    width: 100%;
    position: fixed; 
    top: 0;
    left: 0;
    z-index: 1000; 
    text-align: center; /* Center align the text */
    font-size: 30px;
  }

  .header-text {
    font-family: Arial, sans-serif; /* Specify font family */
    font-size: 24px; /* Adjust font size as needed */
    margin: 0; /* Remove default margin */
  }

  .content {
    margin-top: 10%;
    width: 90vh;
    height: 40vh; /* Adjust height as needed */
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .reason-input {
    width: 80%; /* Adjust width as needed */
    height: 80%; /* Adjust height as needed */
    margin-bottom: 20px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
  }
  
  .buttons {
    position: relative; /* Change position to relative */
    bottom: 0;
    margin-top: auto; /* Push buttons to the bottom of the container */
    display: flex;
  }
  
  .return-button, .confirm-button {
    padding: 10px 20px;
    margin: 0 20px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #286cd4;
    color: white;
  }
  
  .return-button:hover, .confirm-button:hover {
    background-color: #1e4f8f;
  }
  
  </style>