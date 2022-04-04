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
      <p>song list here</p>
    </div>
    <div v-if="isOwner">
      <button @click="handleDelete">Delete playlist</button>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import getDocument from "../../composibles/getDocument";
import deleteDocument from "../../composibles/deleteDocument";
import getUser from "../../composibles/getUser";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
export default {
  props: ["id"],

  setup(props) {
    // grab the return value and rename it to playlist
    const { error, document: playlist } = getDocument("playlists", props.id);
    const { user } = getUser();
    const router = useRouter();

    const isOwner = computed(() => {
      console.log(user.value.uid, playlist.value.userId);
      return (
        playlist.value && user.value && user.value.uid == playlist.value.userId
      );
    });

    const handleDelete = () => {
      deleteDocument("playlists", props.id);
      router.push({ name: "Home" });
    };

    return { error, playlist, isOwner, handleDelete };
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
</style>