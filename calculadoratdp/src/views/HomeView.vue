<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/LogoTDP.jpeg" height="200">
    <FormularioCalculadora/>
  </div>
</template>

<script>

import FormularioCalculadora from '@/components/FormularioCalculadora.vue';

export default {
  name: 'HomeView',
  components: {
    FormularioCalculadora
  }
}
</script>
