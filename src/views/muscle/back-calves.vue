<template>
    <div class="muscle-page">
      <h1>🦵 Back Calves</h1>
      <p class="intro">
        The calf muscles, primarily the gastrocnemius and soleus, are crucial for lower body strength, stability, and power.
        They are involved in plantarflexion (pointing the toes downward), running, jumping, and balance. Strengthening the calves
        enhances athletic performance, improves ankle stability, and reduces the risk of lower limb injuries.
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
                name: 'Dumbbell Standing Calf Raise',
                description: 'Hold dumbbells at sides and raise heels up to fully contract calves.',
                gif: 'https://cdn.jefit.com/assets/img/exercises/gifs/142.gif'
              },
              {
                name: 'Dumbbell Seated Calf Raise',
                description: 'Sit down, place dumbbells on knees, and raise heels focusing on soleus activation.',
                gif: 'https://i.pinimg.com/originals/fd/19/2b/fd192bb6ef1ff52e0babb696c59500f1.gif'
              }
            ],
            Female: [
              {
                name: 'Single Leg Dumbbell Calf Raise',
                description: 'Hold a dumbbell and perform calf raises on one leg to isolate each calf muscle.',
                gif: 'https://cdn.jefit.com/assets/img/exercises/gifs/1238.gif'
              },
              {
                name: 'Elevated Dumbbell Calf Raise',
                description: 'Stand on a raised platform and perform deep range calf raises holding dumbbells.',
                gif: 'https://www.nourishmovelove.com/wp-content/uploads/2020/12/squat-calf-raise.gif'
              }
            ]
          },
          Barbell: {
            Male: [
              {
                name: 'Barbell Standing Calf Raise',
                description: 'Place barbell on back and perform standing calf raises with controlled form.',
                gif: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/03/barbell-full-squat.gif'
              },
              {
                name: 'Barbell Donkey Calf Raise',
                description: 'Lean forward with barbell support and perform donkey-style calf raises.',
                gif: 'https://cdn.jefit.com/assets/img/exercises/gifs/300.gif'
              }
            ],
            Female: [
              {
                name: 'Smith Machine Calf Raise',
                description: 'Use Smith machine for added balance support during standing calf raises.',
                gif: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/11/standing-calf-raise.gif'
              },
              {
                name: 'Barbell Seated Calf Raise',
                description: 'Sit down and place barbell on thighs, raise heels to target soleus.',
                gif: 'https://cdn.jefit.com/assets/img/exercises/gifs/143.gif'
              }
            ]
          },
          Bodyweight: {
            Male: [
              {
                name: 'Bodyweight Single Leg Calf Raise',
                description: 'Raise on one leg without weights to focus on balance and strength.',
                gif: 'https://cdn.jefit.com/assets/img/exercises/gifs/1236.gif'
              },
              {
                name: 'Explosive Calf Jumps',
                description: 'Small explosive jumps emphasizing calf contraction each time.',
                gif: 'https://bodyweighttrainingarena.com/wp-content/uploads/2020/07/Explosive-Calf-Raises.gif'
              }
            ],
            Female: [
              {
                name: 'Bodyweight Standing Calf Raise',
                description: 'Simple bodyweight calf raises with slow tempo for better muscle activation.',
                gif: 'https://www.verywellfit.com/thmb/JyVlnkeXA-Fteaxs6j7WPENAYvE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/48-Standing-Calf-Raises-GIF-50e0467350804dddb4a9a15d6ee5d009.gif'
              },
              {
                name: 'Wall Lean Calf Raise',
                description: 'Lean against a wall and raise heels for focused calf training.',
                gif: 'https://sworkit.com/wp-content/uploads/2021/10/Wall-Lean-Calf-Raises.gif'
              }
            ]
          },
          'Resistance Band': {
            Male: [
              {
                name: 'Resistance Band Calf Raise',
                description: 'Stand on band and press upward against the band’s resistance.',
                gif: 'https://ccuuubmtdurkmbeufybi.supabase.co/storage/v1/object/public/animations/1000.gif'
              },
              {
                name: 'Resistance Band Seated Calf Extension',
                description: 'Sit down and extend feet against band resistance to strengthen calves.',
                gif: 'https://i.pinimg.com/originals/3a/fd/48/3afd48fa765289fe913ed5c2acbf13da.gifz'
              }
            ],
            Female: [
              {
                name: 'Seated Resistance Band Calf Raise',
                description: 'Sit down, band around feet, and flex toes upward and downward.',
                gif: 'https://cdn.jefit.com/assets/img/exercises/gifs/963.gif'
              },
              {
                name: 'Resistance Band Donkey Calf Raise',
                description: 'Bend over with resistance band and perform donkey-style calf raises.',
                gif: 'https://images-prod.healthline.com/hlcmsresource/images/topic_centers/Fitness-Exercise/400x400_Wall_Pushup_Variations_Resistance_Band_Donkey_Kick.gif'
              }
            ]
          },
          Other: {
            Male: [
              {
                name: 'Standing Calf Raise Machine',
                description: 'Use machine for heavy standing calf raise training.',
                gif: 'https://fitnessvolt.com/wp-content/uploads/exercises/1080/cable-standing-calf-raise-1375.gif'
              }
            ],
            Female: [
              {
                name: 'Seated Calf Raise Machine',
                description: 'Use machine to perform isolated soleus-focused seated calf raises.',
                gif: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/11/seated-calf-raise.gif'
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
  
  