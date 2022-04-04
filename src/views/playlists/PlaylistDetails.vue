<template>
  <h1>playlist details</h1>
  {{ playlist.title }}
</template>

<script>
import getCollection from "../../composibles/getCollection";
export default {
  props: ["id"],
  setup(props) {
    const { error, documents } = getCollection("playlists");

    const playlist = documents.filter((playlist) => {
      return playlist.id == props.id;
    });

    return { error, playlist };
  },
};
</script>

<style>
</style>