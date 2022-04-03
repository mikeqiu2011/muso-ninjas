<template>
  <div class="home">
    <h1>Home</h1>
    <div v-if="error" class="error">could not fetch the data</div>
    <div v-if="documents">
      <div v-for="doc in documents" :key="doc.id">
        {{ doc.title }}
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from "../composibles/getCollection";
export default {
  setup() {
    const { error, documents } = getCollection("playlists");

    return { error, documents };
  },
};
</script>
