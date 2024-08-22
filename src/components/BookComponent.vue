<template>
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>id</th>
            <th>titre</th>
            <th>Auteur</th>
            <th>Date de Publication</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in allbooks" :key="book.id">
            <td>{{ book.id }}</td>
            <td>{{ book.titre }}</td>
            <td>{{ book.auteur }}</td>
            <td>{{ book.date_publication }}</td>
            <td>{{ book.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['allbooks']) // Correction ici pour récupérer correctement le getter
    },
    methods: {
      ...mapActions(['fetchBooks'])
    },
    mounted() {
      this.fetchBooks(); // Appel de l'action pour récupérer les livres à la montée du composant
      console.log(this.allbooks);
    }
  }
  </script>
  