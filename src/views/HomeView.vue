<template>
  <div class="home">
      <book/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import book from '@/components/BookComponent.vue'

export default {
  name: 'HomeView',
  components: {
      book
  }
}
</script>
