<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// import axios from 'axios';
import HelloWorld from '@/components/HelloWorld.vue';
import API from '../../utils/api';

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
  },
  data() {
    return {};
  },
  methods: {
    async testAPI() {
      console.log('Testing API...');
      const { data } = await API.get('/test');
      console.log(data);
    },
    async log(message) {
      console.log('Testing API DB...');
      const payload = {
        interaction: message,
      };
      const { data } = await API.post('/log', payload);
      console.log(data);
    },
  },
  async beforeMount() {
    this.testAPI();
    // this.log('Loaded application...');
  },
};
</script>
