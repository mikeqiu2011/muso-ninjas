<template>
  <div class="home">
    <h1>User playlist</h1>
    <div v-if="error" class="error">could not fetch the data</div>
    <div v-if="documents">
      <ListView :playlists="documents" />
    </div>
  </div>
</template>

<script>
import getCollection from "../../composibles/getCollection";
import ListView from "../../components/ListView.vue";
export default {
  setup() {
    const { error, documents } = getCollection("playlists");

    return { error, documents };
  },
  components: { ListView },
};
</script>
