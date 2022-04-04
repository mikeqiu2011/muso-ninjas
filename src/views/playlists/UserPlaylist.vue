<template>
  <div class="home">
    <h1>User playlist</h1>
    <div v-if="error" class="error">could not fetch the data</div>
    <div v-if="playlists">
      <ListView :playlists="playlists" />
    </div>
    <router-link class="btn" :to="{ name: 'CreatePlaylist' }"
      >Create new playlist</router-link
    >
  </div>
</template>

<script>
import getCollection from "../../composibles/getCollection";
import getUser from "../../composibles/getUser";
import ListView from "../../components/ListView.vue";
export default {
  setup() {
    const { user } = getUser();
    const { error, documents: playlists } = getCollection("playlists", [
      "userId",
      "==",
      user.value.uid,
    ]);

    console.log(playlists.value);

    return { error, playlists };
  },
  components: { ListView },
};
</script>
