<template>
    <div class="muscle-page">
        <h1>🏋️ Front Thigh / Quadriceps</h1>
        <p class="intro">
            The front thigh, mainly composed of the quadriceps muscles, is essential for lower body strength and
            movement. These muscles are responsible for extending the knee, supporting posture, and generating power in
            activities like walking, running, jumping, and squatting.
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
                            name: 'Dumbbell Goblet Squat',
                            description: 'Hold dumbbell at chest and squat to target quads with added resistance.',
                            gif: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/gobletsquat-1457030891.gif'
                        },
                        {
                            name: 'Dumbbell Walking Lunge',
                            description: 'Step forward with alternating legs, great for quad and glute engagement.',
                            gif: 'https://media1.giphy.com/media/xT8qBrjcngCsejZ0mA/giphy.gif?cid=6c09b952ukj7utcx80bl39k7tigi13gz9xxw53onlzvsgjaz&ep=v1_gifs_search&rid=giphy.gif&ct=g'
                        }
                    ],
                    Female: [
                        {
                            name: 'Dumbbell Step-Up',
                            description: 'Step onto a bench or box with dumbbells to strengthen thighs and balance.',
                            gif: 'https://i.pinimg.com/originals/e8/5f/18/e85f18b4eb8728ccbc662aa2c53f92ac.gif'
                        }
                    ]
                },
                Barbell: {
                    Male: [
                        {
                            name: 'Barbell Back Squat',
                            description: 'Classic strength move targeting the entire lower body, especially quads.',
                            gif: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2017/04/barbellsquat-1491916408.gif'
                        },
                        {
                            name: 'Barbell Front Squat',
                            description: 'More quad-focused squat with barbell positioned on shoulders.',
                            gif: 'https://www.journalmenu.com/wp-content/uploads/2017/10/front-squat-gif-front-optimize.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Barbell Split Squat',
                            description: 'One leg forward on bench, barbell on back, for deeper quad isolation.',
                            gif: 'https://i.pinimg.com/originals/4b/07/70/4b07705125af7af35f2d087ab337dc73.gif'
                        }
                    ]
                },
                Bodyweight: {
                    Male: [
                        {
                            name: 'Bodyweight Squat',
                            description: 'Basic movement to build quad strength and control without equipment.',
                            gif: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/bodyweightsquat-1457041691.gif?resize=640:*'
                        },
                        {
                            name: 'Jump Squat',
                            description: 'Add explosive movement for strength and cardio challenge.',
                            gif: 'https://i.pinimg.com/originals/b0/99/38/b09938c767aa33d3c3f7afdea3afd103.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Wall Sit',
                            description: 'Static hold with back against the wall, burns out the quads.',
                            gif: 'https://media.post.rvohealth.io/wp-content/uploads/sites/2/2020/08/400x400_9964_Why_a_Wall_is_the_Perfect_Workout_Equipment_Wall_Sit_Clam.gif'
                        }
                    ]
                },
                'Resistance Band': {
                    Male: [
                        {
                            name: 'Resistance Band Squat',
                            description: 'Stand on band and squat down while holding resistance handles.',
                            gif: 'https://i.pinimg.com/originals/67/c5/6a/67c56ac1f52bf4b489e49eab57e23307.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Band Step-Out Squat',
                            description: 'Step to side with band around thighs, great for quad and glute activation.',
                            gif: 'https://www.nourishmovelove.com/wp-content/uploads/2021/11/goblet-squat-step-out.gif'
                        }
                    ]
                },
                Other: {
                    Male: [
                        {
                            name: 'Leg Press Machine',
                            description: 'Push weight away using quads with a fixed machine platform.',
                            gif: 'https://barbend.com/wp-content/uploads/2024/04/leg-press.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Leg Extension Machine',
                            description: 'Isolated quad movement by extending legs on machine.',
                            gif: 'https://hips.hearstapps.com/hmg-prod/images/766/fitgif9-29-tnoverride-1515519049.gif?crop=0.636xw:1xh;center,top&resize=1200:*'
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