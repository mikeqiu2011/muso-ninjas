<template>
  <form @submit.prevent="handleSubmit">
    <h3>Signup</h3>
    <input
      type="displayName"
      placeholder="displayName"
      required
      v-model="displayName"
    />
    <input type="email" placeholder="email" required v-model="email" />
    <input type="password" placeholder="password" required v-model="password" />
    <div class="error">{{ error }}</div>
    <button v-if="!isPending">Sign up</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import useSignup from "../../composibles/useSignup";
import { useRouter } from "vue-router";

export default {
  setup(props, context) {
    const displayName = ref("");
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const { error, signup, isPending } = useSignup();

    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        // context.emit("login");
        router.push({ name: "Home" });
      }
    };
    return { email, password, handleSubmit, error, isPending, displayName };
  },
};
</script>

<style>
</style>