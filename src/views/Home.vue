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
      // 只清除登录相关数据，保留聊天历史等持久化数据
      localStorage.removeItem('userRole');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('loginName');
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
  font-family: var(--font-primary);
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

#bgimg2 {
  background: linear-gradient(
      135deg,
      rgba(26, 26, 46, 0.75) 0%,
      rgba(47, 47, 74, 0.75) 100%
    ),
    url('~@/assets/bgimg3.png') no-repeat center center/cover;
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
  background: var(--color-overlay);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border);
  padding: 12px 24px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: var(--space-lg);
}

.nav-links li a {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  padding: var(--space-sm) 0;
  position: relative;
  transition: color var(--transition-fast);
}

/* Nav link underline animation */
.nav-links li a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient-primary);
  transition: width var(--transition-normal);
}

.nav-links li a:hover {
  color: var(--color-text);
}

.nav-links li a:hover::after,
.nav-links li a.active::after {
  width: 100%;
}

.nav-links li a.active {
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}

/* Action buttons */
.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.action-button {
  background: transparent;
  color: var(--color-text);
  border: 2px solid var(--color-border);
  padding: 8px 20px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-normal);
}

.action-button:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  box-shadow: var(--shadow-glow);
}

.action-button.logout {
  background: transparent;
  border-color: var(--color-error);
  color: var(--color-error);
}

.action-button.logout:hover {
  background: var(--color-error);
  color: var(--color-text);
  box-shadow: 0 4px 20px rgba(255, 107, 107, 0.3);
}

.action-button.install {
  background: var(--gradient-primary);
  border: none;
  color: white;
}

.action-button.install:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow-lg);
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    padding: 10px 16px;
  }

  .nav-wrapper {
    flex-wrap: wrap;
    gap: var(--space-md);
  }

  .nav-links {
    order: 3;
    width: 100%;
    justify-content: center;
    gap: var(--space-md);
    padding-top: var(--space-sm);
    border-top: 1px solid var(--color-border);
    margin-top: var(--space-sm);
  }

  .nav-links li {
    margin: 0;
  }

  .nav-links li a {
    font-size: var(--font-size-sm);
    padding: var(--space-xs);
  }

  .nav-actions {
    gap: var(--space-sm);
  }

  .action-button {
    padding: 6px 14px;
    font-size: var(--font-size-xs);
  }
}
</style>
