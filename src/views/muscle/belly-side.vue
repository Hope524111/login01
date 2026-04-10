<template>
    <div class="muscle-page">
        <h1>🏋️ Side Abs / Obliques</h1>
        <p class="intro">
            The oblique muscles, located on the sides of your abdomen, are responsible for twisting and side-bending
            movements. They help define the waistline, improve core strength and posture, and are essential for
            rotational sports like tennis or boxing.
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
                            name: 'Dumbbell Side Bend',
                            description: 'Hold dumbbell in one hand and bend sideways to work the obliques.',
                            gif: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYfGWUpm0SokgRVrww4n-FJOh2pRTKI6M7Dw&s'
                        },
                        {
                            name: 'Dumbbell Russian Twist',
                            description: 'Sit on the floor, twist torso side-to-side with dumbbell.',
                            gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Russian-Twist.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Light Dumbbell Side Crunch',
                            description: 'Crunch to the side while holding light dumbbells.',
                            gif: 'https://i.pinimg.com/originals/72/3f/db/723fdb8c6f7817e89a627112c5f90709.gif'
                        }
                    ]
                },
                Barbell: {
                    Male: [
                        {
                            name: 'Landmine Twist',
                            description: 'Stand and twist the barbell side to side to hit obliques.',
                            gif: 'https://i.pinimg.com/originals/bd/00/2a/bd002a7347f971d0d0675a6e02d03bd7.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Barbell Standing Twist',
                            description: 'Hold light barbell on shoulders, rotate torso gently.',
                            gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/09/Barbell-Side-Bend.gif'
                        }
                    ]
                },
                Bodyweight: {
                    Male: [
                        {
                            name: 'Bicycle Crunch',
                            description: 'Twist elbow to opposite knee while alternating legs.',
                            gif: 'https://media.tenor.com/Jopm0JiwtdsAAAAM/egsersiz.gif'
                        },
                        {
                            name: 'Side Plank Hip Dips',
                            description: 'In a side plank, lower and lift your hip repeatedly.',
                            gif: 'https://cdn-life.dailyburn.com/life/wp-content/uploads/2022/02/09234326/ezgif.com-gif-maker-copy.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Seated Oblique Twist',
                            description: 'Sit and twist upper body to each side to activate side abs.',
                            gif: 'https://media4.giphy.com/media/cpKD9u3S25xYL8tcbr/giphy.gif?cid=6c09b952d4fpmshpc6lzxbyjzv4t7za9nbcdujrj5b4s9hzr&ep=v1_gifs_search&rid=giphy.gif&ct=g'
                        },
                        {
                            name: 'Side Crunch (Lying)',
                            description: 'Lie on side, bring upper body and legs together in crunch motion.',
                            gif: 'https://media1.popsugar-assets.com/files/thumbor/Yy9uA0U4Q31AVI1N1WBY4KmTk40=/fit-in/792x446/top/filters:format_auto():upscale()/2020/09/25/740/n/1922729/tmp_OPr4bA_600a629a8464e844_IMB_K7aQdA.GIF'
                        }
                    ]
                },
                'Resistance Band': {
                    Male: [
                        {
                            name: 'Band Standing Twist',
                            description: 'Anchor band and twist torso across body to hit obliques.',
                            gif: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt06BZ5_fr7ljx1vjwFsEdphapmAm1y5TQBg&s'
                        }
                    ],
                    Female: [
                        {
                            name: 'Seated Band Side Pull',
                            description: 'Pull band from one side to engage the side abs with low resistance.',
                            gif: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/01/400x400_Resistance_Band_Workout_Abs_Russian_Twist.gif'
                        }
                    ]
                },
                Other: {
                    Male: [
                        {
                            name: 'Medicine Ball Twist',
                            description: 'Twist with a light medicine ball for controlled side core work.',
                            gif: 'https://cdn.shopify.com/s/files/1/2350/9323/files/13-Russian_Twist.gif?v=1651731797'
                        },
                        {
                            name: 'Cable Woodchopper',
                            description: 'Use a cable machine to chop across the body like swinging an axe.',
                            gif: 'https://www.verywellfit.com/thmb/kzdEn_acFtI7cr9TjAWXR__3B7o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/53-3498288-Cable-Woodchop-GIF-4071a44349374e3c97a3c31b83e8fa5a.gif'
                        }
                    ],
                    Female: [
                        {
                            name: 'Medicine Ball Twist',
                            description: 'Twist with a light medicine ball for controlled side core work.',
                            gif: 'https://cdn.shopify.com/s/files/1/2350/9323/files/13-Russian_Twist.gif?v=1651731797'
                        },
                        {
                            name: 'Cable Woodchopper',
                            description: 'Use a cable machine to chop across the body like swinging an axe.',
                            gif: 'https://www.verywellfit.com/thmb/kzdEn_acFtI7cr9TjAWXR__3B7o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/53-3498288-Cable-Woodchop-GIF-4071a44349374e3c97a3c31b83e8fa5a.gif'
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