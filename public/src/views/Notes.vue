<template>
  <div>
    <v-card class="overflow-hidden">
      <v-app-bar
        absolute
        color="#6A76AB"
        dark
        shrink-on-scroll
        prominent
        src="https://picsum.photos/1920/1080?random"
        fade-img-on-scroll
        scroll-target="#scrolling-techniques-3"
      >
        <template v-slot:img="{ props }">
          <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
        </template>
        <h1 class="ml-10">Blog Notes</h1>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
        <v-btn icon>
          <v-icon x-large>mdi-magnify</v-icon>
        </v-btn>
        <template v-slot:extension>
          <v-tabs align-with-title v-model="tab">
            <v-tab class="mytab nav" v-for="item in items" :key="item">{{ item }}</v-tab>
            <v-tabs-items v-model="tab" class="color">
              <v-tab-item>
                <v-row>
                  <v-col class="ml-5 mt-n2" cols="6">
                    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                    <v-btn
                      class="my-10 ml-5"
                      x-large
                      color="green lighten-2"
                      v-on:click="emptyEditor()"
                    >Limpiar</v-btn>

                    <v-btn
                      class="my-10 ml-6"
                      x-large
                      color="blue accent-3"
                      v-on:click="createNote()"
                    >Crear Nota</v-btn>
                    <v-divider></v-divider>
                    <h2 class="my-10">Tu Nota:</h2>
                    <p class="nota">
                      <span v-html="editorData"></span>
                    </p>
                  </v-col>
                  <v-row class="justify-center">
                    <v-col cols="6">
                      <h5>Nombre para la nota:</h5>
                      <v-text-field class="mt-2" label="Nota" outlined></v-text-field>
                      <h5>Fecha para la nota:</h5>
                      <v-text-field class="mt-2" label="Fecha" outlined></v-text-field>
                      <h5>Category</h5>
                      <v-radio-group class="mt-4" v-model="radioGroup">
                        <v-radio v-for="n in values" :key="n" :label="n" :value="n"></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-row>
              </v-tab-item>
              <v-tab-item>
                <v-col>NOTAS AQUI</v-col>
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-sheet id="scrolling-techniques-3" class="overflow-y-auto" max-height="100%">
        <v-container style="height: 1600px;"></v-container>
      </v-sheet>
    </v-card>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "notes",
  data() {
    return {
      values: ["work", "personal", "family", "general"],
      search: "",
      tab: null,
      items: ["CREATE NOTE", "VER NOTAS"],
      editor: ClassicEditor,
      editorData: "<p>Tu nota.</p>",
      editorConfig: {
        // The configuration of the editor.
      }
    };
  },
  methods: {
    emptyEditor() {
      this.editorData = "";
    },
    createNote() {}
  }
};
</script>

<style scoped>
.color {
  color: black;
}
.nota {
  width: 100%;
  height: fit-content;
  border: 1px dotted black;
}
</style>