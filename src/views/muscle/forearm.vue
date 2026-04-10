<template>
  <div class="muscle-page">
    <h1>💪 Forearm </h1>
    <p class="intro">
      The forearm is a crucial muscle group located between the elbow and the wrist. It contains both flexor and
      extensor muscles responsible for various movements such as wrist curls, finger flexion, grip strength, and
      rotational control of the forearm. Strong forearms not only enhance performance in weightlifting and sports but
      also help prevent injuries and improve daily functionality like lifting, typing, and carrying.
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
              name: 'Dumbbell Wrist Curl',
              description: 'Seated, palms up, slowly curl the dumbbell to target wrist flexors.',
              gif: 'https://media1.tenor.com/m/J3eICLvit4kAAAAC/wrist-curl-bar.gif'
            },
            {
              name: 'Reverse Dumbbell Wrist Curl',
              description: 'Palms down grip, lift dumbbell to strengthen wrist extensors.',
              gif: 'https://assets.myworkouts.io/exercises-media/kbKcRTtJdtZXws6iA/one_arm_reverse_dumbbell_wrist_curl_over_bench_male_v4_gif100px_capon.gif'
            }
          ],
          Female: [
            {
              name: 'Dumbbell Wrist Curl',
              description: 'Seated, palms up, slowly curl the dumbbell to target wrist flexors.',
              gif: 'https://media1.tenor.com/m/J3eICLvit4kAAAAC/wrist-curl-bar.gif'
            },
            {
              name: 'Reverse Dumbbell Wrist Curl',
              description: 'Palms down grip, lift dumbbell to strengthen wrist extensors.',
              gif: 'https://assets.myworkouts.io/exercises-media/kbKcRTtJdtZXws6iA/one_arm_reverse_dumbbell_wrist_curl_over_bench_male_v4_gif100px_capon.gif'
            }
          ]
        },
        Barbell: {
          Male: [
            {
              name: 'Barbell Wrist Curl',
              description: 'Rest forearms on thighs, palms up, lift barbell with wrist flexion.',
              gif: 'https://gymvisual.com/img/p/4/8/1/6/4816.gif'
            },
            {
              name: 'Reverse Barbell Wrist Curl',
              description: 'Hold barbell with overhand grip, lift slowly using wrist extensors.',
              gif: 'https://fitnessprogramer.com/wp-content/uploads/2022/06/Barbell-Reverse-Wrist-Curl-Over-a-Bench.gif'
            }
          ],
          Female: [
            {
              name: 'Barbell Wrist Curl',
              description: 'Rest forearms on thighs, palms up, lift barbell with wrist flexion.',
              gif: 'https://gymvisual.com/img/p/4/8/1/6/4816.gif'
            },
            {
              name: 'Reverse Barbell Wrist Curl',
              description: 'Hold barbell with overhand grip, lift slowly using wrist extensors.',
              gif: 'https://fitnessprogramer.com/wp-content/uploads/2022/06/Barbell-Reverse-Wrist-Curl-Over-a-Bench.gif'
            }
          ]
        },
        Bodyweight: {
          Male: [
            {
              name: 'Static Push-Up Hold',
              description: 'Hold top push-up position to engage forearms and core.',
              gif: 'https://i.pinimg.com/originals/fd/bb/09/fdbb092b58863e5c86fdb8bb1411fcea.gif'
            },
            {
              name: 'Wall Handstand Hold',
              description: 'Handstand against wall to train wrist endurance and control.',
              gif: 'https://bodyweighttrainingarena.com/wp-content/uploads/2023/09/Wall-handstand-chest-facing.gif'
            }
          ],
          Female: [
            {
              name: 'Knee Push-Ups',
              description: 'Beginner-friendly push-up to build wrist strength and stability.',
              gif: 'https://media.post.rvohealth.io/wp-content/uploads/sites/2/2020/08/GRT-1.17.RegularChestPushupOnKnees.gif'
            },
          ]
        },
        'Resistance Band': {
          Male: [
            {
              name: 'Resistance Band Wrist Curl',
              description: 'Anchor band and curl wrist to target flexors.',
              gif: 'https://i.makeagif.com/media/1-16-2019/C5OTVv.gif'
            },
            {
              name: 'Reverse Band Curl',
              description: 'Overhand grip pulling band for forearm extensors.',
              gif: 'https://gymvisual.com/img/p/5/7/0/7/5707.gif'
            }
          ],
          Female: [
            {
              name: 'Seated Resistance Band Stretch',
              description: 'Gentle stretch with band to increase mobility.',
              gif: 'https://i.pinimg.com/originals/79/ab/b0/79abb0d27d8341e31572d5ecf3ce372e.gif'
            },
            {
              name: 'Inner Pull Band Curl',
              description: 'Light resistance inward curls for forearm shaping.',
              gif: 'https://i.pinimg.com/originals/79/f4/73/79f473c8a0cc4c6f7438159d07daf903.gif'
            }
          ]
        },
        Other: {
          Male: [
            {
              name: 'Wrist Roller',
              description: 'Use rolling bar device to improve strength and endurance.',
              gif: 'https://cdn-0.weighttraining.guide/wp-content/uploads/2022/11/Wrist-roller.png?ezimgfmt=ng%3Awebp%2Fngcb4'
            },
            {
              name: 'Power Gripper Squeeze',
              description: 'Explosive repetitions with hand gripper for grip strength.',
              gif: 'https://www.nerdfitness.com/wp-content/uploads/2019/06/improve-grip-strength-with-grip-crushers.gif'
            }
          ],
          Female: [
            {
              name: 'Grip Ball Squeeze',
              description: 'Squeeze a soft grip ball repeatedly to boost wrist control.',
              gif: 'https://irp.cdn-website.com/c8c90ce7/dms3rep/multi/Ball+Squeeze.gif'
            },
            {
              name: 'Wrist Rotation Ring',
              description: 'Use small wrist ring to improve mobility and prevent stiffness.',
              gif: 'https://i.pinimg.com/originals/df/fe/69/dffe6942482eec2e35535efc602f589f.gif'
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
