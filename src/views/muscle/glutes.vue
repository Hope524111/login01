<template>
    <div class="muscle-page">
      <h1>🍑 Glutes</h1>
      <p class="intro">
        The glutes, or gluteal muscles, consist of the gluteus maximus, medius, and minimus. They are responsible for hip
        extension, rotation, and stabilization of the pelvis. Strong glutes improve athletic performance, enhance posture,
        reduce lower back pain, and contribute to a well-shaped lower body. Training the glutes is essential for strength,
        balance, and overall body aesthetics.
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
                name: 'Dumbbell Romanian Deadlift',
                description: 'Hinge at hips while keeping dumbbells close to body to target glutes and hamstrings.',
                gif: 'https://i.pinimg.com/originals/3e/bb/77/3ebb776eb3b74fe1bdd21f6f078bd197.gif'
              },
              {
                name: 'Dumbbell Walking Lunge',
                description: 'Take deep steps forward with dumbbells to engage glutes with each stride.',
                gif: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/dumbbelllunge-1457044372.gif'
              }
            ],
            Female: [
              {
                name: 'Dumbbell Bulgarian Split Squat',
                description: 'Place rear foot on bench and lunge downward to isolate glutes.',
                gif: 'https://media.tenor.com/5P_Ar_LX0DQAAAAM/split-squat-exercise.gif'
              },
              {
                name: 'Dumbbell Hip Thrust',
                description: 'Rest shoulders on a bench, place dumbbell on hips, and thrust upward to maximize glute contraction.',
                gif: 'https://cdn.shopify.com/s/files/1/0449/8453/3153/files/Banded_Dumbbell_Hip_Thrust.webp?v=1733716504'
              }
            ]
          },
          Barbell: {
            Male: [
              {
                name: 'Barbell Squat',
                description: 'Perform deep squats to fully engage glutes and lower body.',
                gif: 'https://media1.tenor.com/m/Pfj8vy41k-0AAAAC/gym.gif'
              },
              {
                name: 'Barbell Romanian Deadlift',
                description: 'Focus on controlled movement to stretch and contract the glutes.',
                gif: 'https://cdn.shopify.com/s/files/1/0449/8453/3153/files/barbell-deadlift_600x600.gif?v=1690860568'
              }
            ],
            Female: [
              {
                name: 'Barbell Hip Thrust',
                description: 'Place a barbell over hips and thrust upwards to focus on glute engagement.',
                gif: 'https://cdn.shopify.com/s/files/1/2678/2664/files/ezgif.com-video-to-gif-21.gif?v=1595558283'
              },
              {
                name: 'Sumo Deadlift',
                description: 'Wide stance deadlift variant to increase glute and inner thigh activation.',
                gif: 'https://www.garagegymreviews.com/wp-content/uploads/sumo-deadlift-high-pull.gif'
              }
            ]
          },
          Bodyweight: {
            Male: [
              {
                name: 'Single Leg Glute Bridge',
                description: 'Lift one leg while performing a glute bridge to isolate each glute individually.',
                gif: 'https://i.pinimg.com/originals/9c/43/48/9c4348c308e6847c99019c511ffee41a.gif'
              },
              {
                name: 'Step-Up',
                description: 'Step onto a high platform focusing on driving through the heel to engage glutes.',
                gif: 'https://www.kettlebellkings.com/cdn/shop/articles/weighted-step-up.gif?v=1731311898'
              }
            ],
            Female: [
              {
                name: 'Glute Kickback',
                description: 'Extend leg backward while keeping core stable to target glutes.',
                gif: 'https://media.post.rvohealth.io/wp-content/uploads/sites/2/2022/04/GRT-02.03.DonkeyKick.gif'
              },
              {
                name: 'Bodyweight Hip Thrust',
                description: 'No equipment needed; thrust hips up while focusing on squeezing the glutes.',
                gif: 'https://media.post.rvohealth.io/wp-content/uploads/2020/10/hip-thrust-on-workout-bench.gif'
              }
            ]
          },
          'Resistance Band': {
            Male: [
              {
                name: 'Banded Glute Bridge',
                description: 'Add resistance band above knees to increase glute engagement during bridges.',
                gif: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/08/glutebridgehipcircle-1472218667.gif'
              },
              {
                name: 'Resistance Band Deadlift',
                description: 'Stand on band and perform hip hinge to work glutes effectively.',
                gif: 'https://cdn.shopify.com/s/files/1/0052/7043/7978/files/resistance-band-benefit-strength-training-deadlift-01_480x480.gif?v=1646954312'
              }
            ],
            Female: [
              {
                name: 'Banded Side Walk',
                description: 'Use a mini-band around knees and take small lateral steps to activate glutes.',
                gif: 'https://hips.hearstapps.com/hmg-prod/images/766/fitgif-friday-lateral-mini-band-walk-slider-thumbnail-override-1516815032.gif'
              },
              {
                name: 'Resistance Band Kickback',
                description: 'Extend leg backward with band resistance to focus on glute activation.',
                gif: 'https://cdn.oxygenmag.com/wp-content/uploads/2020/05/exercise-bands-glute-kickback.gif?width=730'
              }
            ]
          },
          Other: {
            Male: [
              {
                name: 'Glute Ham Raise (GHD)',
                description: 'Use glute-ham developer machine to train glutes and hamstrings together.',
                gif: 'https://i.makeagif.com/media/5-28-2023/vhYICn.gif'
              }
            ],
            Female: [
              {
                name: 'Cable Kickbacks',
                description: 'Attach ankle strap to cable machine and extend leg backward to isolate glutes.',
                gif: 'https://media.post.rvohealth.io/wp-content/uploads/sites/2/2022/05/GRT-02.01.CableMachineGluteKickbacks.gif'
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
  
  