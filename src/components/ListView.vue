<template>
  <div v-for="playlist in playlists" :key="playlist.id">
    <div class="single">
      <div class="thumbnail">
        <img :src="playlist.coverUrl" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["playlists"],
};
</script>

<style>
</style>