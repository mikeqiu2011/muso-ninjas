<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="email" required v-model="email" />
    <input type="password" placeholder="password" required v-model="password" />
    <div class="error">{{ error }}</div>
    <button v-if="!isPending">Log in</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import useLogin from "@/composibles/useLogin";
import { useRouter } from "vue-router";

export default {
  setup(props, context) {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const { error, login, isPending } = useLogin();

    const handleSubmit = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
        // context.emit("login");
        router.push({ name: "UserPlaylist" });
      }
    };
    return { email, password, handleSubmit, error, isPending };
  },
};
</script>

<style>
.pending {
  background-color: blue;
}
</style>