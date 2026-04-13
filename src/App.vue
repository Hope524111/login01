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
/* ========================================
   Global App Styles
   ======================================== */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  font-family: var(--font-primary);
  background: var(--color-dark);
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  font-family: var(--font-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--color-text);
  min-height: 100vh;
}

/* === Typography === */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

h1 { font-size: var(--font-size-3xl); }
h2 { font-size: var(--font-size-2xl); }
h3 { font-size: var(--font-size-xl); }
h4 { font-size: var(--font-size-lg); }

/* === Links === */
a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--color-secondary);
}

/* === Scrollbar for all scrollable elements === */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-text-muted) var(--color-dark);
}

/* === Selection === */
::selection {
  background: var(--color-primary);
  color: var(--color-text);
}

/* === Focus outline === */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* === Utility Classes === */
.text-primary { color: var(--color-primary); }
.text-secondary { color: var(--color-text-secondary); }
.text-muted { color: var(--color-text-muted); }

.bg-dark { background-color: var(--color-dark); }
.bg-card { background-color: var(--color-card); }

.card {
  background: var(--gradient-card);
  backdrop-filter: blur(16px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  transition: all var(--transition-normal);
}

.card:hover {
  border-color: var(--color-border-hover);
  box-shadow: var(--shadow-glow);
}

</style>
