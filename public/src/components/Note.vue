<template>
  <div>
    <v-card class="mx-auto" max-width="344" outlined>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1 d-flex flex-row-reverse">
            {{note.date}}
            <v-spacer></v-spacer>
            {{note.title}}
          </v-list-item-title>
          <v-list-item-title>{{note.category}}</v-list-item-title>
          <v-list-item-subtitle v-html="note.description"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-card-actions>
        <v-btn color="primary" @click="editNote" text>Editar</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="warning" @click="deleteNote()" text>Borrar</v-btn>
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