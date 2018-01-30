<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello-world />
  </div>
</template>

<script lang="py">
# Loading sub-components (still a little ugly)
HelloWorld = require('./HelloWorld.vue')['default']

module.exports = {
    'name': 'app',
    'components': {
        'hello-world': HelloWorld
    }}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
