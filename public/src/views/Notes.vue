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
          <v-tabs align-with-title cols="12" v-model="tab">
            <v-tab cols-12 class="mytab nav" v-for="item in items" :key="item">{{ item }}</v-tab>
            <v-tabs-items v-model="tab" class="color">
              <v-tab-item>
                <v-col>
                  <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>

                  <button v-on:click="emptyEditor()">Empty the editor</button>

                  <h2>Editor data</h2>
                  <p>
                    <span v-html="editorData"></span>
                  </p>
                  <code>{{ editorData }}</code>
                </v-col>
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
    }
  }
};
</script>

<style scoped>
.color {
  color: black;
}
</style>