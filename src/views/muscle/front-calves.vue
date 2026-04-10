<template>
    <div class="muscle-page">
        <h1>🏃 Front Calves / Tibialis Anterior</h1>
        <p class="intro">
            The front calves, primarily the tibialis anterior, are responsible for dorsiflexion—raising the foot
            upwards. Strengthening this area improves ankle stability, prevents shin splints, and enhances running,
            jumping, and balance performance. Though often neglected, it's vital for complete lower leg training.
        </p>

        <div class="selectors">
            <div class="selector-block">
                <label>Select Gender:</label>
                <select v-model="selectedGender">
                    <option disabled value="">Please select</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </div>

            <div class="selector-block">
                <label>Select Equipment:</label>
                <select v-model="selectedEquipment">
                    <option disabled value="">Please select</option>
                    <option>Dumbbell</option>
                    <option>Barbell</option>
                    <option>Bodyweight</option>
                    <option>Resistance Band</option>
                    <option>Other</option>
                </select>
            </div>

            <button @click="loadRecommendations" :disabled="!canRecommend">Show Recommended Exercises</button>
        </div>

        <div v-if="recommendations.length" class="recommendations">
            <h3>🎯 Recommended Exercises:</h3>
            <ul>
                <li v-for="(item, index) in recommendations" :key="index">
                    <h4>{{ item.name }}</h4>
                    <p>{{ item.description }}</p>
                    <img :src="item.gif" alt="exercise demo" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedGender: '',
            selectedEquipment: '',
            recommendations: []
        };
    },
    computed: {
        canRecommend() {
            return this.selectedGender && this.selectedEquipment;
        }
    },
    methods: {
        loadRecommendations() {
            const data = {
                Dumbbell: {
                    Male: [
                        {
                            name: 'Dumbbell Toe Raises',
                            description: 'Hold dumbbells, lift toes upward while keeping heels on ground to engage tibialis anterior.',
                            gif: 'https://wordpress.planforfit.com/wp-content/uploads/2016/03/dumbbell-calves-raise.gif'
                        }
                    ],
                    Female: [
                        {
                           gif: 'https://www.shutterstock.com/image-vector/coming-soon-speechbubble-advertising-megaphone-600nw-2511768889.jpg'
                        }
                    ]
                },
                Barbell: {
                    Male: [
                        {
                            name: 'Barbell Toe Raise',
                            description: 'Barbell across back, raise toes up while keeping heels planted.',
                            gif: 'https://cdn.shopify.com/s/files/1/0618/9462/3460/files/1_l-A7PP7r1NNlrKd2sF4jRg.gif'
                        },
                        {
                            name: 'Smith Machine Toe Raise',
                            description: 'Use smith machine for support while lifting toes upward.',
                            gif: 'https://barbend.com/wp-content/uploads/2024/04/smith-machine-calf-raise-barbend-movement-gif-masters.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Barbell Toe Raise',
                            description: 'Barbell across back, raise toes up while keeping heels planted.',
                            gif: 'https://cdn.shopify.com/s/files/1/0618/9462/3460/files/1_l-A7PP7r1NNlrKd2sF4jRg.gif'
                        },
                        {
                            name: 'Smith Machine Toe Raise',
                            description: 'Use smith machine for support while lifting toes upward.',
                            gif: 'https://barbend.com/wp-content/uploads/2024/04/smith-machine-calf-raise-barbend-movement-gif-masters.gif'
                        }
                    ]
                },
                Bodyweight: {
                    Male: [
                        {
                            name: 'Wall Tib Raises',
                            description: 'Lean against a wall and lift toes repeatedly to target front calves.',
                            gif: 'https://sworkit.com/wp-content/uploads/2021/10/Tibialis-Raises.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Seated Toe Lift',
                            description: 'Sit on a chair and lift toes off ground repeatedly.',
                            gif: 'https://i.pinimg.com/originals/e1/bb/fd/e1bbfdf2e67794127168782f6fd71137.gif'
                        }
                    ]
                },
                'Resistance Band': {
                    Male: [
                        {
                            name: 'Band Toe Flexion',
                            description: 'Anchor band and flex toes upward for controlled tibialis activation.',
                            gif: 'https://www.vissco.com/wp-content/uploads/animation/sub/theraband-plantarflexion-with-knee-extended.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Seated Band Toe Pull',
                            description: 'Sit and loop band around foot, pull back for tibialis flexion.',
                            gif: 'https://i.pinimg.com/originals/79/ab/b0/79abb0d27d8341e31572d5ecf3ce372e.gif'
                        }
                    ]
                },
                Other: {
                    Male: [
                        {
                            gif: 'https://www.shutterstock.com/image-vector/coming-soon-speechbubble-advertising-megaphone-600nw-2511768889.jpg'
                        }
                    ],
                    Female: [
                        {
                            name: 'Balance Board Toe Raise',
                            description: 'Perform toe raises while standing on balance board for activation + stability.',
                            gif: 'https://i.pinimg.com/originals/24/eb/88/24eb88bdb177bc56d25eaac740ba320c.gif'
                        }
                    ]
                }
            };

            this.recommendations =
                data[this.selectedEquipment]?.[this.selectedGender] || [];
        }
    }
};
</script>

<style scoped>
.muscle-page {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  font-family: 'Segoe UI', sans-serif;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.muscle-page h1 {
  font-size: 26px;
  color: #1f2937;
  margin-bottom: 10px;
  text-align: center;
}

.intro {
  margin-bottom: 25px;
  font-size: 16px;
  color: #4b5563;
  text-align: center;
  line-height: 1.6;
  padding: 0 10px;
}

.selectors {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 30px;
}

.selector-block {
  display: flex;
  flex-direction: column;
  font-size: 15px;
}

.selector-block label {
  margin-bottom: 6px;
  font-weight: bold;
}

.selector-block select {
  padding: 8px;
  font-size: 15px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background-color: #f9fafb;
}

button {
  margin-top: 10px;
  align-self: flex-start;
  background-color: #10b981;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.3s;
}

button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #059669;
}

.recommendations {
  margin-top: 30px;
  padding: 0 10px;
}

.recommendations h3 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #111827;
  text-align: center;
}

.recommendations ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.recommendations li {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.recommendations li h4 {
  margin-bottom: 8px;
  font-size: 17px;
  color: #1f2937;
}

.recommendations li p {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 10px;
}

.recommendations img {
  width: 100%;
  max-width: 400px;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
  display: block;
  margin: 0 auto;
}

/* ------------------ 📱 手机端优化 ------------------ */
@media (max-width: 600px) {
  .muscle-page {
    padding: 15px;
    margin: 10px;
    border-radius: 12px;
  }

  .muscle-page h1 {
    font-size: 22px;
  }

  .intro {
    font-size: 15px;
  }

  .selectors {
    gap: 12px;
  }

  .selector-block select {
    font-size: 14px;
    padding: 8px;
  }

  button {
    font-size: 14px;
    padding: 10px 18px;
  }

  .recommendations li {
    padding: 14px;
  }

  .recommendations li h4 {
    font-size: 16px;
  }

  .recommendations li p {
    font-size: 13px;
  }
}
</style>