<template>
  <div class="tool-container">
    <div class="tool-card">

      <h2 class="tool-title">HIIT Timer</h2>
      <p class="tool-subtitle">Customize your workout & rest intervals</p>

      <div class="form-group">
        <input type="number" v-model.number="work" placeholder="Work (seconds)" />
        <input type="number" v-model.number="rest" placeholder="Rest (seconds)" />
        <input type="number" v-model.number="rounds" placeholder="Rounds" />
        <button @click="startTimer" :disabled="running">Start</button>
        <button @click="resetTimer" v-if="running">Reset</button>
      </div>

      <div v-if="running" class="result-card">
        <p class="result-text">Current Round: {{ currentRound }} / {{ rounds }}</p>
        <p class="result-text">Now: <strong>{{ isWork ? 'Work!' : 'Rest' }}</strong></p>
        <p class="result-value">{{ secondsLeft }}s</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HIITTimer",
  data() {
    return {
      work: '',
      rest: '',
      rounds: '',
      currentRound: 1,
      isWork: true,
      secondsLeft: 0,
      interval: null,
      running: false
    };
  },
  methods: {
    startTimer() {
      if (!this.work || !this.rest || !this.rounds) return;

      this.currentRound = 1;
      this.isWork = true;
      this.secondsLeft = this.work;
      this.running = true;

      this.interval = setInterval(() => {
        this.secondsLeft--;

        if (this.secondsLeft <= 0) {
          if (this.isWork) {
            this.isWork = false;
            this.secondsLeft = this.rest;
          } else {
            this.isWork = true;
            this.currentRound++;

            if (this.currentRound > this.rounds) {
              this.resetTimer();
              return;
            }

            this.secondsLeft = this.work;
          }
        }
      }, 1000);
    },
    resetTimer() {
      clearInterval(this.interval);
      this.interval = null;
      this.running = false;
      this.currentRound = 1;
      this.isWork = true;
      this.secondsLeft = 0;
    },
    goBack() {
      this.$router.push("/home/tools");
    }
  },
  beforeDestroy() {
    this.resetTimer();
  }
};
</script>

<style scoped>
.tool-container {
  display: flex;
  justify-content: center;
  padding: 80px 20px;
}

.tool-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  max-width: 480px;
  width: 100%;
  padding: 20px 30px;
  text-align: center;
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tool-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.tool-subtitle {
  font-size: 1rem;
  color: #777;
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 30px;
}

input {
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: none;
  transition: 0.3s;
}

input:focus {
  border-color: #667eea;
  box-shadow: 0 0 5px rgba(102, 126, 234, 0.4);
}

button {
  padding: 12px;
  font-size: 16px;
  border: none;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

button:hover {
  transform: scale(1.05);
}

.result-card {
  background: #f7f7f7;
  border-radius: 12px;
  padding: 20px;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.05);
}

.result-text {
  font-size: 1rem;
  color: #444;
}

.result-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ff6b6b;
  margin-top: 10px;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: linear-gradient(45deg, #e3eafc, #f0f4ff);
  color: #4b55c4;
  border: 1px solid #ccd5f3;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 10px rgba(102, 126, 234, 0.1);
  text-decoration: none;
}

.back-button:hover {
  background: linear-gradient(45deg, #d4defc, #e6ecff);
  transform: translateX(-2px);
  color: #2f3ab2;
  text-decoration: none;
}

@media (max-width: 768px) {
  .tool-container {
    padding: 10px 20px;
  }
}
</style>