<template>
  <button v-if="!showAddSong" @click="showAddSong = !showAddSong">
    Add Songs
  </button>
  <div v-else>
    <form @submit.prevent="handleAddSong">
      <h4>Add a New Song</h4>
      <input type="text" required placeholder="Song title" v-model="title" />
      <input type="text" required placeholder="Song artist" v-model="artist" />
      <button>add</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { updateDocument } from "../composibles/document";
export default {
  props: ["playlist"],

  setup(props) {
    const title = ref("");
    const artist = ref("");
    const showAddSong = ref(false);

    const handleAddSong = async () => {
      // showAddSong.value = !showAddSong.value;

      const newSong = {
        title: title,
        artist: artist,
        id: Math.floor(Math.random() * 1000000), // mimic a random id generator
      };
      console.log(newSong);

      let songs = [...props.playlist.songs, newSong];
      console.log(songs);

      await updateDocument("playlists", props.playlist.id, {
        songs: songs,
      });
      console.log("song added");
      title.value = "";
      artist.value = "";
    };

    return { title, artist, showAddSong, handleAddSong };
  },
};
</script>

<style scoped>
.add-song {
  text-align: center;
  margin-top: 40px;
}
form {
  max-width: 100%;
  text-align: left;
}
</style>