<template>
    <div class="header">
      <h1>E.S.Ideal</h1>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Header',
  }
  </script>
  
<style scoped>
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
</style>
