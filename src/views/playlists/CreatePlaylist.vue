<template>
  <form @submit.prevent="handleSubmit">
    <h4>create new Playlist</h4>
    <input type="text" placeholder="title" required v-model="title" />
    <textarea
      placeholder="playlist description..."
      required
      v-model="description"
    ></textarea>
    <label>Upload playlist cover image</label>
    <input type="file" placeholder="image" />
    <div class="error">{{ error }}</div>
    <button>create play list</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import useCollection from "../../composibles/useCollection";

export default {
  setup() {
    const title = ref("");
    const description = ref("");

    const { error, addDoc, isPending } = useCollection();

    const handleSubmit = async () => {
      let playlist = {
        title: title,
        description: description,
        File: file,
      };
      await addDoc(playlist);
      if (!error.value) {
        console.log("playlist create");
      }
    };

    return { title, description, error, isPending };
  },
};
</script>

<style scoped>
form {
  background: white;
}
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>