<template>
    <div class="muscle-page">
        <h1>🏋️ Chest</h1>
        <p class="intro">
            The chest muscles, primarily the pectoralis major and minor, are responsible for pushing movements such as
            pressing and hugging. Building a strong chest not only enhances upper body strength and posture but also
            improves performance in pushing exercises and daily tasks like pushing doors or lifting objects.
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
                            name: 'Dumbbell Bench Press',
                            description: 'Lie flat on a bench and press dumbbells upward to build chest mass.',
                            gif: 'https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/f9ac646a-2133-4c42-a8b7-68deb8b600aa/Ronnie-Coleman-GIF.gif?t=1671569146'
                        },
                        {
                            name: 'Dumbbell Flyes',
                            description: 'Open arms wide in an arc motion to stretch and contract chest muscles.',
                            gif: 'https://musclemagfitness.com/wp-content/uploads/stability-ball-dumbbell-fly-exercise.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Incline Dumbbell Press',
                            description: 'Targets upper chest and front shoulders in a controlled motion.',
                            gif: 'https://www.verywellfit.com/thmb/hu6CwDngSHu6zjBZDqQ0K5x84Bw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/66-4588212-Incline-Dumbbell-Press-GIF-cc6b35c8cecc4b808532c881732bf3f0.gif'
                        },
                        {
                            name: 'Flat Dumbbell Flyes',
                            description: 'Excellent for toning and sculpting the chest area.',
                            gif: 'https://i.pinimg.com/originals/83/70/e6/8370e67f5e6e5cefc0f212e251067485.gif'
                        }
                    ]
                },
                Barbell: {
                    Male: [
                        {
                            name: 'Barbell Bench Press',
                            description: 'Classic compound exercise for building a powerful chest.',
                            gif: 'https://i.makeagif.com/media/7-03-2015/kNNrpY.gif'
                        },
                        {
                            name: 'Incline Barbell Press',
                            description: 'Focuses more on the upper portion of the pectoral muscles.',
                            gif: 'https://149874912.v2.pressablecdn.com/wp-content/uploads/2020/03/Incline-Bench-Press.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Light Barbell Press',
                            description: 'A beginner-friendly variation of the barbell bench press.',
                            gif: 'https://images.squarespace-cdn.com/content/v1/54f9e84de4b0d13f30bba4cb/1528488712624-CH2H2PZAK8FS8GZR8ABG/BenchPress.mov+%281%29.gif'
                        }
                    ]
                },
                Bodyweight: {
                    Male: [
                        {
                            name: 'Standard Push-Up',
                            description: 'A fundamental bodyweight exercise to engage the entire chest.',
                            gif: 'https://hips.hearstapps.com/hmg-prod/images/pushup-1462808858.gif'
                        },
                        {
                            name: 'Wide Push-Up',
                            description: 'Hands placed wider to emphasize chest over triceps.',
                            gif: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2017/10/widegrippushup-1508248881.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Knee Push-Up',
                            description: 'Beginner variation for building chest and shoulder strength.',
                            gif: 'https://media1.giphy.com/media/cVSWGfQhD2T8WmNTek/giphy.gif?cid=6c09b952gmxpwg7435e9884vahs7ys54430k05pm0nizvhs8&ep=v1_gifs_search&rid=giphy.gif&ct=g'
                        },
                        {
                            name: 'Incline Push-Up on Bench',
                            description: 'Easier variation using a bench or wall to reduce resistance.',
                            gif: 'https://www.verywellfit.com/thmb/GG7EXAUxQvwxiu4QAzDBPu6yy44=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/90-3120038--Incline-PushupsGIF-d321334ec54849539010832028d5635a.gif'
                        }
                    ]
                },
                'Resistance Band': {
                    Male: [
                        {
                            name: 'Band Chest Press',
                            description: 'Simulate a bench press motion with band tension.',
                            gif: 'https://images.squarespace-cdn.com/content/v1/54f9e84de4b0d13f30bba4cb/1525881176260-YJD6JDG15GZPB72R5XCO/cable+chest+press.gif'
                        }
                    ],
                    Female: [
                        {
                            gif: 'https://www.shutterstock.com/image-vector/coming-soon-speechbubble-advertising-megaphone-600nw-2511768889.jpg'
                        }
                    ]
                },
                Other: {
                    Male: [
                        {
                            name: 'Cable Crossover',
                            description: 'Use cables to isolate and contract the chest from different angles.',
                            gif: 'https://i.makeagif.com/media/6-30-2015/rMHeTR.gif'
                        },
                        {
                            name: 'Pec Deck Machine Fly',
                            description: 'Supportive seated fly movement perfect for sculpting the chest.',
                            gif: 'https://musclemagfitness.com/wp-content/uploads/Lever-Pec-Deck-Fly-Chest.gif'
                        }
                    ],
                    Female: [
                        {
                            gif: 'https://www.shutterstock.com/image-vector/coming-soon-speechbubble-advertising-megaphone-600nw-2511768889.jpg'
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