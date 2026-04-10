<template>
    <div class="muscle-page">
        <h1>🏋️ Rear Shoulders / Posterior Delts</h1>
        <p class="intro">
            The rear deltoids, or posterior shoulders, are crucial for pulling motions, posture correction, and shoulder
            stability. They help move the arms backward and outward, and are essential for balance in upper body
            training. Strong rear delts prevent injuries and improve aesthetics from all angles.
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
                            name: 'Bent Over Reverse Fly',
                            description: 'Bend at hips and raise arms outward to activate rear delts.',
                            gif: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/dumbbellreversefly-1456949026.gif'
                        },
                        {
                            name: 'Dumbbell Face Pull',
                            description: 'Pull dumbbells to face level with elbows wide—targets rear delts and traps.',
                            gif: 'https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2021/01/Dumbbell-Rear-Delt-Row.gif?resize=600%2C600&ssl=1'
                        }
                    ],
                    Female: [
                        {
                            name: 'Seated Rear Delt Fly',
                            description: 'Sit on bench and fly arms behind for a posture-friendly variant.',
                            gif: 'https://post.healthline.com/wp-content/uploads/2015/11/Rear-delt-flys.gif'
                        }
                    ]
                },
                Barbell: {
                    Male: [
                        {
                            name: 'Bent Over Barbell Row (Wide)',
                            description: 'Pull bar to upper chest with elbows flared—emphasizes rear delts.',
                            gif: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/barbellrow-1457038583.gif?resize=640:*'
                        }
                    ],
                    Female: [
                        {
                            name: 'Reverse Barbell Shrug',
                            description: 'Bar in front of thighs, lift shoulders back and up for rear shoulder/trap tension.',
                            gif: 'https://cdn.shopify.com/s/files/1/0449/8453/3153/files/Behind_the_Back_Shrugs_600x600.gif?v=1717644932'
                        }
                    ]
                },
                Bodyweight: {
                    Male: [
                        {
                            name: 'Rear Delt Push-Up',
                            description: 'Hands placed wide & high in push-up, targets rear delts on press.',
                            gif: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Liegestuetz02_ani_fcm.gif/960px-Liegestuetz02_ani_fcm.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Prone Arm Lift',
                            description: 'Lie on stomach, lift arms up & back for rear delts and posture.',
                            gif: 'https://dailyburn.com/life/wp-content/uploads/2016/06/Prone-Y-T-1.gif'
                        }
                    ]
                },
                'Resistance Band': {
                    Male: [
                        {
                            name: 'Band Reverse Fly',
                            description: 'Hold band and pull arms apart to squeeze shoulder blades.',
                            gif: 'https://musclemagfitness.com/wp-content/uploads/reverse-fly-with-bands-exercise.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Seated Band Face Pull',
                            description: 'Anchor band and pull toward face with elbows wide.',
                            gif: 'https://musclemagfitness.com/wp-content/uploads/resistance-band-face-pulls-exercise.gif'
                        }
                    ]
                },
                Other: {
                    Male: [
                        {
                            name: 'Cable Reverse Fly',
                            description: 'Pull cables outward from center, a staple rear delt isolation move.',
                            gif: 'https://burnfit.io/wp-content/uploads/2023/11/CABLE_REV_FLY.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Machine Rear Delt Fly',
                            description: 'Use pec deck machine in reverse for guided rear shoulder training.',
                            gif: 'https://149874912.v2.pressablecdn.com/wp-content/uploads/2020/04/reverse-machine-fly.gif'
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