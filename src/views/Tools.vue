<template>
  <transition name="slide-up" mode="out-in">
    <div class="tools-page">
      <div class="tools-container slide-in">
        <h2 class="page-title">Fitness Tools</h2>
        <div class="tool-grid">
          <div class="tool-card" @click="goTo('/home/tools/calorie')">
            <span class="emoji">🔥</span>
            <p>Calorie Calculator</p>
          </div>
          <div class="tool-card" @click="goTo('/home/tools/bmi')">
            <span class="emoji">📏</span>
            <p>BMI Calculator</p>
          </div>
          <div class="tool-card" @click="goTo('/home/tools/water')">
            <span class="emoji">💧</span>
            <p>Daily Water Intake</p>
          </div>
          <div class="tool-card" @click="goTo('/home/tools/hiit')">
            <span class="emoji">⏱️</span>
            <p>HIIT Timer</p>
          </div>
          <div class="tool-card" @click="goTo('/home/tools/rm')">
            <span class="emoji">🏋️‍♂️</span>
            <p>RM Calculator</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Tools',
  methods: {
    goTo(path) {
      this.$router.push(path);
    }
  }
}
</script>

<style scoped>
.tools-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 60px 20px;
  min-height: 100vh;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto; 
}

.tools-container {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  max-width: 960px;
  width: 100%;
}

.page-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
}

.tool-card {
  background: #ffffffdd;
  border-radius: 16px;
  padding: 1.2rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tool-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  background-color: #eef6ff;
}

.emoji {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.tool-card p {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  text-align: center;
}

.slide-in {
  animation: slideInUp 0.6s ease-out both;
}

@keyframes slideInUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .tools-page {
    padding: 40px 15px;
    min-height: auto;  
    overflow-y: auto; 
  }

  .tools-container {
    padding: 25px 20px;
    border-radius: 16px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  .page-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .tool-grid {
    grid-template-columns: 1fr 1fr; 
    gap: 1rem;
  }

  .tool-card {
    padding: 1rem;
    border-radius: 12px;
  }

  .emoji {
    font-size: 1.8rem;
  }

  .tool-card p {
    font-size: 0.95rem;
  }
}

</style>

