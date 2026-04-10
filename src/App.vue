<template>
  <div id="app">

    <router-view />

    <ChatPopup
      v-if="showChat"
      :friendId="chatFriendId"
      :friendUsername="chatFriendName"
      @close="showChat = false"
    />
  </div>
</template>

<script>
import ChatPopup from "@/views/ChatPopup.vue";

export default {
  components: {
    ChatPopup,
  },
  data() {
    return {
      showChat: false,
      chatFriendId: null,
      chatFriendName: "",
    };
  },
  created() {
    this.$root.$on("open-chat", (friendId, friendName) => {
      this.chatFriendId = friendId;
      this.chatFriendName = friendName;
      this.showChat = true;
    });
  }
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

html, body {
  overflow-x: hidden;
  overflow-y: hidden;
  margin: 0;
  padding: 0;
}

html, body {
  overflow-x: hidden;
}

</style>
