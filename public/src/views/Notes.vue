<template>
  <div>
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>

    <button v-on:click="emptyEditor()">Empty the editor</button>

    <h2>Editor data</h2>
    <p>
      <span v-html="editorData"></span>
    </p>
    <code>{{ editorData }}</code>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "notes",
  data() {
    return {
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
