<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="py">
class HelloWorld(object):
    name = 'HelloWorld'
    def data(self):
        return {'msg': 'Hello from Python!'}

module.exports = HelloWorld()
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>
