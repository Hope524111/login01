<template>
    <div class="tool-container">
        <div class="tool-card">
            <h2 class="tool-title">Calorie Calculator</h2>
            <p class="tool-subtitle">Estimate your daily calorie needs</p>

            <div class="form-group">
                <input type="number" v-model.number="age" placeholder="Age (years)" />
                <input type="number" v-model.number="weight" placeholder="Weight (kg)" />
                <input type="number" v-model.number="height" placeholder="Height (cm)" />

                <select v-model="gender">
                    <option disabled value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <select v-model="activity">
                    <option disabled value="">Activity Level</option>
                    <option value="1.2">Sedentary (little/no exercise)</option>
                    <option value="1.375">Light (1-3 days/week)</option>
                    <option value="1.55">Moderate (3-5 days/week)</option>
                    <option value="1.725">Active (6-7 days/week)</option>
                    <option value="1.9">Very Active (twice a day)</option>
                </select>

                <button @click="calculateCalories">Calculate</button>
            </div>

            <div v-if="result" class="result-card">
                <p class="result-text">Estimated daily calories:</p>
                <p class="result-value">{{ result }} kcal</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CalorieCalculator",
    data() {
        return {
            age: null,
            weight: null,
            height: null,
            gender: "",
            activity: "",
            result: null
        };
    },
    methods: {
        calculateCalories() {
            if (!this.age || !this.weight || !this.height || !this.gender || !this.activity) return;

            let bmr = 0;
            if (this.gender === "male") {
                bmr = 10 * this.weight + 6.25 * this.height - 5 * this.age + 5;
            } else {
                bmr = 10 * this.weight + 6.25 * this.height - 5 * this.age - 161;
            }

            this.result = Math.round(bmr * parseFloat(this.activity));
        },
        goBack() {
            this.$router.push("/home/tools");
        }
    }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

.tool-container {
    display: flex;
    justify-content: center;
    padding: 50px 20px;
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

input,
select {
    padding: 12px 16px;
    font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 10px;
    outline: none;
    transition: 0.3s;
}

input:focus,
select:focus {
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
    padding: 5px;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.05);
}

.result-text {
    font-size: 1rem;
    color: #444;
}

.result-value {
    font-size: 2.2rem;
    font-weight: bold;
    color: #667eea;
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