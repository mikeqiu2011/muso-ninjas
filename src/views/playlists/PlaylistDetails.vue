<template>
  <div class="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <!-- playlist info -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
    </div>

    <!-- song list info -->
    <div class="song-list">
      <div v-if="playlist.songs.length">
        <div v-for="song in playlist.songs" :key="song" class="single-song">
          <div class="details">
            <h3>{{ song.title }}</h3>
            <p>made by {{ song.artist }}</p>
          </div>
          <button v-if="isOwner" @click="deleteSong(song.id)">
            delete song
          </button>
        </div>
      </div>
      <div v-else>no songs</div>
      <div v-if="isOwner">
        <AddSong :playlist="playlist" />
      </div>
      <!-- <button @click="showAddSong = true">add song</button> -->
    </div>
    <div v-if="isOwner">
      <button @click="handleDelete">Delete playlist</button>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import getDocument from "../../composibles/getDocument";
import useStorage from "../../composibles/useStorage";
import { deleteDocument } from "../../composibles/document";
import useDocument from "../../composibles/useDocument";
import getUser from "../../composibles/getUser";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import AddSong from "../../components/AddSong.vue";
export default {
  props: ["id"],
  components: { AddSong },

  setup(props) {
    // grab the return value and rename it to playlist
    const { error, document: playlist } = getDocument("playlists", props.id);
    const { user } = getUser();
    const router = useRouter();
    const { deleteImage } = useStorage();
    const showAddSong = ref(false);
    const song = ref(null);
    const { updateDoc } = useDocument("playlists", props.id);

    const deleteSong = async (id) => {
      console.log("delete song: ", id);
      const songs = playlist.value.songs.filter((song) => {
        return song.id != id;
      });
      // playlist.value.songs = songs; // no need to update local one, as it syncs with firestore auto
      await updateDoc({ songs }); // need to pass an obj, if key and value are the same, we just pass the key
    };

    const handleAddSong = async () => {
      playlist.value.songs.push(song.value);
      await updateDocument("playlists", playlist.value);
      showAddSong.value = false;
    };

    const isOwner = computed(() => {
      console.log(user.value.uid, playlist.value.userId);
      return (
        playlist.value && user.value && user.value.uid == playlist.value.userId
      );
    });

    const handleDelete = async () => {
      await deleteImage(playlist.value.filePath); // first delete image then delete doc
      await deleteDocument("playlists", props.id); // async function, we have to await

      router.push({ name: "Home" });
    };

    return {
      error,
      playlist,
      isOwner,
      handleDelete,
      showAddSong,
      handleAddSong,
      deleteSong,
    };
  },
};
</script>

<style scoped>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr; /* divide the screen into 3 part, playlist ocupy 1, song ocupy 2 */
  gap: 80px; /** in between */
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
</style>