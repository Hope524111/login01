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
  padding: var(--space-2xl) var(--space-lg);
  min-height: calc(100vh - 70px);
  box-sizing: border-box;
}

.tools-container {
  background: var(--gradient-card);
  backdrop-filter: blur(16px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  max-width: 960px;
  width: 100%;
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);
}

.tools-container:hover {
  border-color: var(--color-border-hover);
}

.page-title {
  font-family: var(--font-heading);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  text-align: center;
  margin-bottom: var(--space-xl);
  color: var(--color-text);
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: var(--space-lg);
}

.tool-card {
  background: var(--gradient-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl) var(--space-lg);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  transition: all var(--transition-normal);
}

.tool-card:hover {
  transform: translateY(-6px);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-glow-lg);
  background: rgba(255, 107, 53, 0.1);
}

.emoji {
  font-size: 2.5rem;
  transition: transform var(--transition-normal);
}

.tool-card:hover .emoji {
  transform: scale(1.15);
}

.tool-card p {
  margin: 0;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  text-align: center;
}

.slide-in {
  animation: slideInUp 0.6s ease-out both;
}

.tool-grid .tool-card:nth-child(1) { animation-delay: 0.1s; }
.tool-grid .tool-card:nth-child(2) { animation-delay: 0.15s; }
.tool-grid .tool-card:nth-child(3) { animation-delay: 0.2s; }
.tool-grid .tool-card:nth-child(4) { animation-delay: 0.25s; }
.tool-grid .tool-card:nth-child(5) { animation-delay: 0.3s; }

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .tools-page {
    padding: var(--space-xl) var(--space-md);
  }

  .tools-container {
    padding: var(--space-xl) var(--space-lg);
  }

  .page-title {
    font-size: var(--font-size-xl);
  }

  .tool-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-md);
  }

  .tool-card {
    padding: var(--space-lg);
  }

  .emoji {
    font-size: 2rem;
  }
}
</style>

