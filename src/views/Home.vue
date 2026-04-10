<template>
  <div class="app-container">
    <div id="bgimg2"></div>
    <div class="main-content">
      <!-- Top Navigation Bar -->
      <header class="navbar">
        <nav class="nav-wrapper">
          <ul class="nav-links">
            <li><router-link to="/home" active-class="active">Home</router-link></li>
            <li><router-link to="/home/fitness-planner" active-class="active">AI Bot</router-link></li>
            <li><router-link to="/home/tools" active-class="active">Tools</router-link></li>
            <li><router-link to="/home/friends" active-class="active">Friends</router-link></li>
            <li><router-link to="/home/community" active-class="active">Community</router-link></li>
            <li><router-link to="/home/contact" active-class="active">Contact</router-link></li>
          </ul>

          <div class="nav-actions">
            <button class="action-button logout" @click="logout">Logout</button>
            <button class="action-button install" @click="installApp">Install</button>
          </div>
        </nav>
      </header>

      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      selectedPart: null,
      deferredPrompt: null, 
    };
  },
  created() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
    });
  },
  methods: {
    logout() {
      localStorage.clear();
      fetch('/api/logout', { method: 'POST', credentials: 'include' })
        .then(response => {
          if (response.ok) console.log("✅ Successfully logged out");
          else console.error("❌ Failed to log out from the server");
        })
        .catch(error => console.error("❌ Logout error:", error));

      this.$emit("user-logged-out");
      this.$router.push("/");
    },
    installApp() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then(choice => {
          if (choice.outcome === 'accepted') {
            console.log('User accepted install prompt');
          } else {
            console.log('User dismissed install prompt');
          }
        });
      } else {
        alert('Installation is not available. Please use your browser menu to install manually.');
      }
    }

  }
};
</script>

<style scoped>
.main-content {
  position: relative;
  z-index: 1;
}

body {
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

#bgimg2 {
  background: url('~@/assets/bgimg3.png') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}

/* Navigation Bar */
.navbar {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 8px 20px;
}

.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin-right: 20px;
}

.nav-links li a {
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s;
}

.nav-links li a.active {
  font-weight: bold;
  border-bottom: 2px solid #fff;
}

.nav-links li a:hover {
  color: #ffe4b5;
}

.nav-actions {
  display: flex;
  align-items: center;
}

.action-button {
  background: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-left: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
  width: 100px;
}

.action-button.logout {
  background: #ff6b6b;
}

.action-button.logout:hover {
  background: #ff4757;
}

.action-button.install:hover {
  background: #369c72;
}

@media (max-width: 768px) {
  .navbar {
    padding: 4px 10px;
  }

  .nav-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: nowrap;
    padding: 25px 20px 10px;
    gap: 20px;
  }

  .nav-links {
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-auto-rows: auto;
    gap: 10px 10px;
    justify-content: center;
  }

  .nav-actions {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    justify-content: flex-start;
    margin-top: -15px;
  }

  .nav-links li {
    margin: 0;
  }

  .nav-links li a {
    font-size: 16px;
    padding: 6px 6px;
  }

  .action-button {
    font-size: 16px;
    padding: 10px 20px;
    width: 90px;
  }
}
</style>
