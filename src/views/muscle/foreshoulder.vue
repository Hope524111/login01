<template>
    <div class="muscle-page">
        <h1>🏋️ Front Shoulder</h1>
        <p class="intro">
            The front shoulder, also known as the anterior deltoid, plays a vital role in pushing movements like
            pressing and front raises. It supports shoulder stability, arm lifting, and improves upper body aesthetics.
            Strengthening this muscle enhances performance in exercises such as bench press, overhead press, and daily
            pushing tasks.
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
                            name: 'Dumbbell Front Raise',
                            description: 'Lift dumbbells forward to shoulder height to target anterior deltoids.',
                            gif: 'https://cdn.jefit.com/assets/img/exercises/gifs/413.gif'
                        },
                        {
                            name: 'Dumbbell Arnold Press',
                            description: 'A twisting overhead press that activates all deltoid heads, especially the front.',
                            gif: 'https://cdn.jefit.com/assets/img/exercises/gifs/1126.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Seated Dumbbell Front Raise',
                            description: 'A more controlled variation to target the front shoulder.',
                            gif: 'https://newlife.com.cy/wp-content/uploads/2019/11/22351301-Dumbbell-Seated-Front-Raise-female_Shoulders_360.gif'
                        },
                        {
                            name: 'Light Dumbbell Shoulder Press',
                            description: 'Press dumbbells overhead to build shoulder strength and stability.',
                            gif: 'https://media.tenor.com/T_vqvD5qG-YAAAAM/shoulder-press-seated-shoulder-press.gif'
                        }
                    ]
                },
                Barbell: {
                    Male: [
                        {
                            name: 'Barbell Overhead Press',
                            description: 'A compound movement that heavily engages the front shoulder.',
                            gif: 'https://i.pinimg.com/originals/40/91/1f/40911f8db4987e02cb0fbd353b93a36e.gif'
                        },
                        {
                            name: 'Barbell Front Raise',
                            description: 'Lift barbell with extended arms to shoulder level.',
                            gif: 'https://burnfit.io/wp-content/uploads/2023/11/BB_FRONT_RAISE.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Light Barbell Shoulder Press',
                            description: 'A beginner-friendly press focusing on stability and control.',
                            gif: 'https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/11/Seated-barbell-overhead-press.gif?resize=600%2C600&ssl=1'
                        }
                    ]
                },
                Bodyweight: {
                    Male: [
                        {
                            name: 'Incline Push-Up',
                            description: 'Targets upper chest and front shoulders with bodyweight resistance.',
                            gif: 'https://fitnessfaqs.com/wp-content/uploads/2023/12/Incline-Push-ups.gif'
                        },
                        {
                            name: 'Wall Handstand Push-Up',
                            description: 'Advanced move for front deltoid and shoulder pressing power.',
                            gif: 'https://bodyweighttrainingarena.com/wp-content/uploads/2022/10/Wall-Handstand-Pushup-7.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Wall Shoulder Tap',
                            description: 'Beginner drill for shoulder control and stability.',
                            gif: 'https://gymvisual.com/img/p/1/5/1/5/0/15150.gif'
                        }
                    ]
                },
                'Resistance Band': {
                    Male: [
                        {
                            name: 'Resistance Band Front Raise',
                            description: 'Simulate dumbbell front raise with band tension.',
                            gif: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/12/bandfrontraise-1480629927.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Light Band Shoulder Press',
                            description: 'Push band overhead from, ideal for toning.',
                            gif: 'https://media.self.com/photos/60c7f70dd8ecd2b162ff9e5a/master/w_320%2Cc_limit/Hejira-overhead-press-band.gif'
                        }
                    ]
                },
                Other: {
                    Male: [
                        {
                            name: 'Cable Front Raise',
                            description: 'Continuous cable tension isolates the anterior deltoid.',
                            gif: 'https://burnfit.io/wp-content/uploads/2023/11/CABLE_FRONT_RAISE.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'TRX Y Raise',
                            description: 'Use suspension to target the shoulder with a Y-shaped arm motion.',
                            gif: 'https://i.makeagif.com/media/6-13-2016/0RSBB_.gif'
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