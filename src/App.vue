<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/network">Network</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <button v-if="deferredPrompt" @click="installApp" @keypress="installApp">
    Install App!
  </button>
  <router-view />
</template>

<script>

export default {
  data() {
    return {
      deferredPrompt: null,
      showInstallPrompt: false,
    };
  },
  methods: {
    installApp() {
      console.log('install requested');
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          this.deferredPrompt = null;
          this.showInstallPrompt = false;
        });
      }
    },
  },
  created() {
    window.addEventListener('beforeinstallprompt', (event) => {
      console.log('🚀 ~ file: App.vue:44 ~ window.addEventListener ~ event:', event);
      event.preventDefault();
      this.deferredPrompt = event;
      this.showInstallPrompt = true;
    });
  },
  // created() {
  //   debugger;
  //   this.checkPWAInstall();
  //   console.log(this.isInstalled);
  //   debugger;
  //   if (!this.isInstalled) {
  //     debugger;
  //     this.installPWA();
  //   }
  // },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
