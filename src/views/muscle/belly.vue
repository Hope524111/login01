<template>
    <div class="muscle-page">
        <h1>🧘 Belly / Abs</h1>
        <p class="intro">
            The abdominal muscles, including the rectus abdominis, obliques, and transverse abdominis, form the core
            center of your body. Strong abs improve posture, balance, and athletic performance, while also protecting
            your spine. These muscles are activated in movements like crunching, twisting, and stabilizing.
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
                            name: 'Dumbbell Russian Twist',
                            description: 'Hold a dumbbell and twist your torso side-to-side to engage obliques.',
                            gif: 'https://gymvisual.com/img/p/2/9/8/5/3/29853.gif'
                        },
                        {
                            name: 'Weighted Sit-Up',
                            description: 'Hold dumbbell on chest while performing sit-ups to increase resistance.',
                            gif: 'https://gymvisual.com/img/p/1/9/8/2/4/19824.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Dumbbell Crunch',
                            description: 'Hold light dumbbell behind head to engage upper abs with more control.',
                            gif: 'https://i.pinimg.com/originals/8e/8a/f7/8e8af7ba9e246bb8dace6d62f460a793.gif'
                        }
                    ]
                },
                Barbell: {
                    Male: [
                        {
                            name: 'Barbell Rollout',
                            description: 'Roll barbell forward from kneeling position to activate entire core.',
                            gif: 'https://i.makeagif.com/media/3-20-2017/cZp7_v.gif'
                        },
                        {
                            name: 'Landmine Twist',
                            description: 'Using a barbell landmine, twist your torso to work your obliques.',
                            gif: 'https://i.makeagif.com/media/8-01-2023/JWNoyT.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Barbell Rollout',
                            description: 'Roll barbell forward from kneeling position to activate entire core.',
                            gif: 'https://i.makeagif.com/media/3-20-2017/cZp7_v.gif'
                        },
                        {
                            name: 'Landmine Twist',
                            description: 'Using a barbell landmine, twist your torso to work your obliques.',
                            gif: 'https://i.makeagif.com/media/8-01-2023/JWNoyT.gif'
                        }
                    ]
                },
                Bodyweight: {
                    Male: [
                        {
                            name: 'Leg Raise',
                            description: 'Lift your legs while lying down to target lower abs.',
                            gif: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/08/legraise-1472054568.gif'
                        },
                        {
                            name: 'Plank',
                            description: 'Full-body isometric hold that strengthens core endurance.',
                            gif: 'https://media1.giphy.com/media/yIv8U59Lhj2aQ/giphy.gif?cid=6c09b952bi2hv3z2cktjc1gjnut0aaby9qnp1ihmrf8cxxix&ep=v1_gifs_search&rid=giphy.gif&ct=g'
                        }
                    ],
                    Female: [
                        {
                            name: 'Crunch',
                            description: 'Classic ab move targeting the upper abs.',
                            gif: 'https://www.icegif.com/wp-content/uploads/2022/07/icegif-475.gif'
                        },
                        {
                            name: 'Mountain Climbers',
                            description: 'Cardio-based ab exercise that improves both strength and endurance.',
                            gif: 'https://i.pinimg.com/originals/0b/3c/b4/0b3cb465e4a3a09139819e0bce4036a0.gif'
                        }
                    ]
                },
                'Resistance Band': {
                    Male: [
                        {
                            name: 'Band Kneeling Crunch',
                            description: 'Anchor band above and pull down to crunch the core.',
                            gif: 'https://i.makeagif.com/media/1-22-2018/9EklMT.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Seated Band Twist',
                            description: 'Sit and twist your core with band resistance.',
                            gif: 'https://gymbeam.cz/blog/wp-content/uploads/2018/03/rusky-twist.gif'
                        }
                    ]
                },
                Other: {
                    Male: [
                        {
                            name: 'Cable Crunch',
                            description: 'Use a cable machine to perform kneeling crunches with adjustable resistance.',
                            gif: 'https://i.pinimg.com/originals/54/68/d5/5468d5032b585e2e6682f9257d27d568.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Ab Roller',
                            description: 'Roll forward to engage entire core, especially deep stabilizers.',
                            gif: 'https://cdn.shopify.com/s/files/1/0075/4673/2662/files/ab-roller-exercise.gif'
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