<template>
    <div class="muscle-page">
        <h1>💪 Biceps</h1>
        <p class="intro">
            The biceps are the prominent muscles located at the front of your upper arms. Responsible for elbow flexion
            and forearm rotation, strong biceps not only improve arm aesthetics but also contribute to pulling strength
            and daily activities like lifting, carrying, and pulling.
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
                            name: 'Dumbbell Bicep Curl',
                            description: 'Stand upright, curl dumbbells with supinated grip to isolate biceps.',
                            gif: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/dumbbellcurl-1457043876.gif'
                        },
                        {
                            name: 'Hammer Curl',
                            description: 'Neutral grip dumbbell curl to target brachialis and biceps.',
                            gif: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/hammercurl-1456956209.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Seated Dumbbell Curl',
                            description: 'Seated version for more isolation and less momentum.',
                            gif: 'https://149874912.v2.pressablecdn.com/wp-content/uploads/2020/10/Incline-Dumbbell-Curl.gif'
                        },
                        {
                            name: 'Alternate Dumbbell Curl',
                            description: 'Curl each arm alternately to improve control and form.',
                            gif: 'https://www.anytimefitness.com/wp-content/uploads/2023/03/Anytime-Fitness-ArmDay-ReciprocatingBicepCurls.gif'
                        }
                    ]
                },
                Barbell: {
                    Male: [
                        {
                            name: 'Barbell Curl',
                            description: 'Classic heavy lift for building mass and strength in biceps.',
                            gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif'
                        },
                        {
                            name: 'EZ Bar Preacher Curl',
                            description: 'Use preacher bench for strict form, targets lower bicep.',
                            gif: 'https://media2.giphy.com/media/WsFX0H7qz5M1o8VpxH/giphy.gif?cid=6c09b952x39dblgrpe3un7gcax59qywmubc35p8d3v7a6lkb&ep=v1_gifs_search&rid=giphy.gif&ct=g'
                        }
                    ],
                    Female: [
                        {
                            name: 'Light Barbell Curl',
                            description: 'Controlled curls with lighter weight for toning.',
                            gif: 'https://cdn.shopify.com/s/files/1/0250/0362/2496/files/892.gif?v=1644825960'
                        }
                    ]
                },
                Bodyweight: {
                    Male: [
                        {
                            name: 'Chin-Up',
                            description: 'Underhand grip pull-up, heavily activates biceps.',
                            gif: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/chinup-1457101678.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Negative Chin-Up',
                            description: 'Jump up to bar and slowly lower to build strength.',
                            gif: 'https://www.dasantosh.com/wp-content/uploads/2019/09/negative-chin-ups-min.gif'
                        }
                    ]
                },
                'Resistance Band': {
                    Male: [
                        {
                            name: 'Band Bicep Curl',
                            description: 'Step on band and curl handles upward to contract biceps.',
                            gif: 'https://i.makeagif.com/media/1-16-2019/C5OTVv.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Light Band Curl',
                            description: 'Great for warm-up or toning with low resistance.',
                            gif: 'https://media.self.com/photos/65d51cf2e8a6dbc4e5d6111c/master/w_320%2Cc_limit/Robyn-banded-biceps-curl.gif'
                        }
                    ]
                },
                Other: {
                    Male: [
                        {
                            name: 'Cable Curl',
                            description: 'Cable machines provide constant tension for growth.',
                            gif: 'https://ccuuubmtdurkmbeufybi.supabase.co/storage/v1/object/public/animations/0868.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'TRX Curl',
                            description: 'Suspension trainer curl for body control and muscle tone.',
                            gif: 'https://images.squarespace-cdn.com/content/v1/5d02eef8911a8d0001896ff8/1618855717674-LJPD7CXDGHDF8FT2W8GG/70-TRX-Row-GIF-25cd5a9e0ea34287badad1fe5cefc982.gif?format=1500w'
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