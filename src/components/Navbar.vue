<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/ninja.png" />
      <h1><router-link :to="{ name: 'Home' }">Muso Ninjas</router-link></h1>
      <div class="links">
        <div v-if="user">
          <router-link :to="{ name: 'UserPlaylist' }" class="btn"
            >My playlist</router-link
          >
          <router-link :to="{ name: 'CreatePlaylist' }" class="btn"
            >Create playlist</router-link
          >
          <span>Hi, {{ user.displayName }}</span>
          <button @click="handleLogout">Logout</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
          <router-link class="btn" :to="{ name: 'Signup' }"
            >Sign up</router-link
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "../composibles/useLogout";
import getUser from "../composibles/getUser";
import { useRouter } from "vue-router";
export default {
  setup(props, context) {
    const router = useRouter();
    const { error, logout, isPending } = useLogout();
    const { user } = getUser(); // must use the { } !!!
    const handleLogout = async () => {
      console.log("now logging out");
      await logout();
      if (!error.value) {
        console.log("successfully logged out");
        router.push({ name: "Login" });
      }
    };
    return { handleLogout, error, user, isPending };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex; /* align item next to each other */
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav img {
  max-height: 60px;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto; /* when parent display flex, child will align to right */
}
nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}
span {
  display: inline-block;
  border-left: 1px solid #eee;
  font-size: 14px;
  margin-left: 14px;
  padding-left: 14px;
}
</style>