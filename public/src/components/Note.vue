<template>
  <div>
    <v-card class="mx-auto" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">{{note.date}}</v-list-item-title>
          <div>{{note.title}}</div>
          <div class="overline mb-4">{{note.category}}</div>
          <v-list-item-subtitle v-html="note.description"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-card-actions>
        <v-btn @click="editNote" text>Editar</v-btn>
        <v-btn @click="deleteNote()" text>Borrar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>


<script>
import API from "../services/api";

export default {
  name: "Note",
  props: {
    note: Object
  },
  methods: {
    editNote() {
      this.$emit("editNote", this.note._id);
    },
    deleteNote() {
      API.deleteNote(this.note._id).then(this.$emit("deleteNote"));
    }
  }
};
</script>

<style lang="scss" scoped>
</style>