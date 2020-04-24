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
        <v-row cols="6" class="d-flex">
          <v-col>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="dates"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-combobox v-model="dates" multiple chips small-chips readonly v-on="on"></v-combobox>
              </template>
              <v-date-picker v-model="dates" multiple no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6">
            <v-text-field class="mr-10" v-model="search" label="Search" single-line hide-details></v-text-field>
          </v-col>
        </v-row>
        <!--  <input v-model="date" type="date" color="green lighten-1"></input> -->
        <v-btn icon>
          <v-icon @click="filterNotes" x-large>mdi-magnify</v-icon>
        </v-btn>
        <v-btn @click="logout" icon>
          <v-icon x-large>mdi-location-exit</v-icon>
        </v-btn>
        <template v-slot:extension>
          <v-tabs align-with-title v-model="tab">
            <v-tab class="mytab nav" v-for="tab in tabs" :key="tab">{{ tab }}</v-tab>
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
                      v-if="!editId"
                      class="my-10 ml-6"
                      x-large
                      color="blue accent-3"
                      @click="addNote()"
                    >Crear Nota</v-btn>
                    <v-btn
                      class="my-10 ml-6"
                      x-large
                      color="blue accent-3"
                      @click="editNote()"
                    >Editar</v-btn>
                    <v-divider></v-divider>
                    <h2 class="my-10">Tu Nota:</h2>
                    <p class="nota">
                      <span v-html="editorData"></span>
                    </p>
                  </v-col>
                  <v-row class="justify-center">
                    <v-col cols="6">
                      <h5>Nombre para la nota:</h5>
                      <v-text-field class="mt-2" label="Nota" outlined v-model="name"></v-text-field>
                      <h5>Category</h5>
                      <v-radio-group class="mt-4" v-model="category" :mandatory="false">
                        <v-radio v-for="n in values" :key="n" :label="n" :value="n"></v-radio>
                      </v-radio-group>
                      <h5>Fecha para la nota:</h5>
                      <v-date-picker class="mt-2" v-model="date" color="green lighten-1"></v-date-picker>
                    </v-col>
                  </v-row>
                </v-row>
              </v-tab-item>
              <v-tab-item>
                <v-row>
                  <v-col v-for="(note, i) in notes" :key="i" cols="4">
                    <Note :note="notes[i]" v-on:editNote="takeIdforEdit" />
                  </v-col>
                </v-row>
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
import API from "../services/api";
import Note from "../components/Note";

export default {
  name: "notes",
  data() {
    return {
      dates: [],
      menu: false,
      editId: false,
      note: "",
      notes: [],
      values: ["work", "personal", "family", "general"],
      category: "",
      name: "",
      date: "",
      search: "",
      tab: null,
      tabs: ["CREATE NOTE", "SHOW MY NOTES"],
      editor: ClassicEditor,
      editorData: "<p>Tu nota.</p>",
      editorConfig: {
        // The configuration of the editor.
      }
    };
  },
  components: {
    Note
  },
  methods: {
    emptyEditor() {
      this.editorData = "";
    },
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
    filterNotes() {
      API.getAllNotes(this.search, this.dates[0]).then(
        response => (this.notes = response)
      );
    },
    async addNote() {
      let noteNew = {
        title: this.name,
        description: this.editorData,
        category: this.category,
        date: this.date
      };
      await API.addNoteToUser(noteNew);
    },
    takeIdforEdit(noteId) {
      this.editId = noteId;
      this.tab = 0;
    },
    async editNote() {
      let note = {
        title: this.name,
        description: this.editorData,
        category: this.category,
        date: this.date
      };
      API.editNote(note, this.editId);
    }
  },
  created() {
    API.getAllNotes(this.search, this.dates[0]).then(
      response => (this.notes = response)
    );
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
