<template>
  <div class="tool-container">
    <div class="tool-card">

      <h2 class="tool-title">1RM Calculator</h2>
      <p class="tool-subtitle">Estimate your one-rep max strength</p>

      <div class="form-group">
        <input type="number" v-model.number="weight" placeholder="Weight lifted (kg)" />
        <input type="number" v-model.number="reps" placeholder="Reps performed" />
        <button @click="calculateRM">Calculate</button>
      </div>

      <div v-if="rm" class="result-card">
        <p class="result-text">Estimated 1RM: <strong>{{ rm }} kg</strong></p>
        <ul class="rm-percentages">
          <li>85%: {{ (rm * 0.85).toFixed(1) }} kg</li>
          <li>70%: {{ (rm * 0.7).toFixed(1) }} kg</li>
          <li>50%: {{ (rm * 0.5).toFixed(1) }} kg</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RMCalculator",
  data() {
    return {
      weight: null,
      reps: null,
      rm: null
    };
  },
  methods: {
    calculateRM() {
      if (!this.weight || !this.reps || this.reps < 1) return;
      this.rm = Math.round(this.weight * (1 + this.reps / 30)); // Epley公式
    },
    goBack() {
      this.$router.push("/home/tools");
    }
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
  max-width: 450px;
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
  margin-top: 20px;
}

.result-text {
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 10px;
}

.rm-percentages {
  list-style: none;
  padding: 0;
  color: #555;
  font-size: 1rem;
  line-height: 1.6;
}

.back-button {
  background: none;
  border: none;
  color: #667eea;
  font-weight: bold;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color 0.2s;
  text-decoration: none;
}

.back-button:hover {
  color: #4b55c4;
  text-decoration: none;
}

@media (max-width: 768px) {
  .tool-container {
    padding: 10px 20px;
  }
}
</style>