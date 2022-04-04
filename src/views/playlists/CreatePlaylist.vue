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
    <button v-if="!isPending">create</button>
    <button v-else>saving</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import useCollection from "../../composibles/useCollection";
import getUser from "../../composibles/getUser";
import useStorage from "../../composibles/useStorage";
import { timestamp } from "../../firebase/config";
import { useRouter } from "vue-router";

export default {
  setup() {
    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileError = ref("");
    const { user } = getUser();
    const isPending = ref(false);
    const router = useRouter();

    const { url, filePath, uploadImage } = useStorage();
    const { error, addDoc } = useCollection("playlists");

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        await uploadImage(file.value);

        let playlist = {
          title: title.value,
          description: description.value,
          coverUrl: url.value,
          filePath: filePath.value, // we may need this to delete the file in future
          userId: user.value.uid,
          userName: user.value.displayName,
          songs: [], // to be added in future
          createdAt: timestamp(),
        };
        console.log(playlist);
        res = await addDoc(playlist);
        isPending.value = false;
        if (!error.value) {
          console.log("playlist create");
          router.push({ name: "PlaylistDetails", params: { id: res.id } });
        }
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
      handleSubmit,
      handleChange,
      fileError,
      isPending,
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