<template>
    <div class="muscle-page">
      <h1>💪 Lower Back</h1>
      <p class="intro">
        The lower back is a vital area for core stability and overall body strength. It includes muscles like the erector
        spinae that support posture, balance, and spinal movement. A strong lower back can enhance athletic performance,
        prevent injuries, and alleviate common back pain. Training this region properly improves your lifting capacity,
        posture, and daily functional activities.
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
                name: 'Dumbbell Deadlift',
                description: 'Hold dumbbells, hinge at hips, and lift to engage the lower back and hamstrings.',
                gif: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/dumbbelldeadlift-1457044319.gif?resize=980:*'
              },
              {
                name: 'Single Arm Dumbbell Row',
                description: 'Support with one knee on a bench and row dumbbell to target lower back muscles.',
                gif: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3MyaHgwbWh5NzBob3lneWd6dDFnMm5laWlzMmhhZjZhbGd4aXdzdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/irCqptSYgMPX7nnJaj/giphy.gif'
              }
            ],
            Female: [
              {
                name: 'Dumbbell Deadlift',
                description: 'Hold dumbbells, hinge at hips, and lift to engage the lower back and hamstrings.',
                gif: 'https://149874912.v2.pressablecdn.com/wp-content/uploads/2020/10/dumbbell-deadlift.gif'
              },
              {
                name: 'Single Arm Dumbbell Row',
                description: 'Support with one knee on a bench and row dumbbell to target lower back muscles.',
                gif: 'https://www.nourishmovelove.com/wp-content/uploads/2023/04/row-curl-pres-one-dumbbell-workout.gif'
              }
            ]
          },
          Barbell: {
            Male: [
              {
                name: 'Barbell Deadlift',
                description: 'A fundamental exercise to build overall back strength, including lower back.',
                gif: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/barbelldeadlift-1457038089.gif'
              },
              {
                name: 'Barbell Good Morning',
                description: 'Barbell on shoulders, bend forward at hips to strengthen lower back muscles.',
                gif: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2017/05/goodmorning-1496161176.gif'
              }
            ],
            Female: [
              {
                name: 'Barbell Deadlift',
                description: 'A fundamental exercise to build overall back strength, including lower back.',
                gif: 'https://i.makeagif.com/media/3-30-2024/E4O2XZ.gif'
              },
              {
                name: 'Barbell Good Morning',
                description: 'Barbell on shoulders, bend forward at hips to strengthen lower back muscles.',
                gif: 'https://www.verywellfit.com/thmb/qg8rNhAVggICDCDivEz1TiicyM4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20-3498255-Goodmorning-Exercise-GIF-dcf63c8509134f3bbf5c183383d877a5.gif'
              }
            ]
          },
          Bodyweight: {
            Male: [
              {
                name: 'Superman Hold',
                description: 'Lie face down, lift arms and legs off the ground to strengthen lower back.',
                gif: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/08/supermany-1472154643.gif?crop=1xw:0.75xh;center,top&resize=1200:*'
              },
              {
                name: 'Glute Bridge',
                description: 'Lift hips upward while lying on back to activate glutes and lower back.',
                gif: 'https://i.pinimg.com/originals/da/c4/66/dac466dcf065b2e33f30b39c6c881896.gif'
              }
            ],
            Female: [
              {
                name: 'Superman Hold',
                description: 'Lie face down, lift arms and legs off the ground to strengthen lower back.',
                gif: 'https://i.pinimg.com/originals/c8/68/58/c868587de9b7841f4359310a821a3cd0.gif'
              },
              {
                name: 'Glute Bridge',
                description: 'Lift hips upward while lying on back to activate glutes and lower back.',
                gif: 'https://images-prod.healthline.com/hlcmsresource/images/topic_centers/Fitness-Exercise/648x364_5_Glute_Bridge_Variations_Press_Through_Toes.gif'
              }
            ]
          },
          'Resistance Band': {
            Male: [
              {
                name: 'Resistance Band Deadlift',
                description: 'Stand on the band and perform a deadlift motion for lower back activation.',
                gif: 'https://www.performancehealth.com/media/wysiwyg/blog/articles/Deadlift.gif'
              },
              {
                name: 'Resistance Band Good Morning',
                description: 'Band looped over shoulders and feet, hinge at hips to target lower back.',
                gif: 'https://fitnessprogramer.com/wp-content/uploads/2022/07/Good-Morning-With-Resistance-Band.gif'
              }
            ],
            Female: [
              {
                name: 'Resistance Band Deadlift',
                description: 'Stand on the band and perform a deadlift motion for lower back activation.',
                gif: 'https://cdn.shopify.com/s/files/1/0655/4832/1000/files/Resistance_band_deadlift_480x480.gif?v=1683262685'
              },
              {
                name: 'Resistance Band Good Morning',
                description: 'Band looped over shoulders and feet, hinge at hips to target lower back.',
                gif: 'https://cdn.jefit.com/assets/img/exercises/gifs/466.gif'
              }
            ]
          },
          Other: {
            Male: [
              {
                name: 'Back Extension Machine',
                description: 'Use machine to perform back extensions focusing on lumbar muscles.',
                gif: 'https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/05/back-extension-frontloaded.gif?resize=600%2C600&ssl=1'
              }
            ],
            Female: [
              {
                name: 'Back Extension Machine',
                description: 'Use machine to perform back extensions focusing on lumbar muscles.',
                gif: 'https://media1.popsugar-assets.com/files/thumbor/oKAbsVCXl1wbpXcEYhUHWlj1uJw=/fit-in/792x808/filters:format_auto():upscale()/2019/01/10/659/n/1922729/tmp_KPVPg4_8c2a3adbd8c7e13c_IMB_MwXuQT.GIF'
              }
            ]
          }
        };
  
        this.recommendations = data[this.selectedEquipment]?.[this.selectedGender] || [];
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
  