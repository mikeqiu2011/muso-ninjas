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
    <input type="file" @change="handleChange" ref="file" />
    <div class="error">{{ error }}</div>
    <div class="error">{{ fileError }}</div>
    <button>create play list</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import useCollection from "../../composibles/useCollection";
import useStorage from "../../composibles/useStorage";

export default {
  setup() {
    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileError = ref("");

    const { url, filePath, uploadImage } = useStorage();
    const { error, addDoc, isPending } = useCollection();

    const handleSubmit = async () => {
      if (file.value) {
        await uploadImage(file.value);

        let playlist = {
          title: title,
          description: description,
          url: url,
          filePath: filePath,
        };
        console.log(playlist);
        // await addDoc(playlist);
        // if (!error.value) {
        //   console.log("playlist create");
        // }
      }
    };

    // allowed file types
    const types = ["image/png", "image/jpeg"];

    const handleChange = (e) => {
      const selected = e.target.files[0];
      if (selected && types.includes(selected.type)) {
        console.log(selected);
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select an image file (png or jpeg)";
      }
    };

    return {
      title,
      description,
      error,
      isPending,
      handleSubmit,
      handleChange,
      fileError,
    };
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