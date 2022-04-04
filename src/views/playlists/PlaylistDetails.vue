<template>
  <div class="error">{{ error }}</div>
  <div v-if="document">
    {{ document.title }}
  </div>
</template>

<script>
import getDocument from "../../composibles/getDocument";
export default {
  props: ["id"],

  setup(props) {
    const { error, document } = getDocument("playlists", props.id);

    return { error, document };
  },
};
</script>

<style>
</style>