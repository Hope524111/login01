<template>
    <div class="muscle-page">
      <h1>🏋️‍♂️ Back Thigh (Hamstrings)</h1>
      <p class="intro">
        The back thigh, mainly composed of the hamstring muscles, plays a critical role in hip extension, knee flexion,
        and overall athletic performance. Strong hamstrings improve sprinting ability, jumping power, and protect the knees
        from injury. Targeted training enhances strength balance between the front and back of the legs, leading to better
        stability, posture, and injury prevention.
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
                description: 'Hinge at the hips with dumbbells to stretch and contract the hamstrings.',
                gif: 'https://i.pinimg.com/originals/37/0f/5a/370f5af5a35d5a12fb5d6e42ecf55552.gif'
              },
              {
                name: 'Dumbbell Step-Through Lunge',
                description: 'Step forward and backward in lunge to dynamically activate hamstrings.',
                gif: 'https://i.pinimg.com/originals/85/c9/b5/85c9b53258d0cd34b38e687f39c77fef.gif'
              }
            ],
            Female: [
              {
                name: 'Dumbbell Deadlift to Curtsy Lunge',
                description: 'Deadlift for hamstrings, followed by curtsy lunge for dynamic glute-ham coordination.',
                gif: 'https://www.kettlebellkings.com/cdn/shop/articles/curtsy-lunge_1200x1200_crop_center.gif?v=1703665328'
              },
              {
                name: 'Single-Leg Romanian Deadlift',
                description: 'Focus on one leg to isolate and balance hamstring strength.',
                gif: 'https://media1.popsugar-assets.com/files/thumbor/G7a19fuBrloTGGi1Ewn23IElsmk/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2021/03/24/956/n/1922729/f7e675427ce8f132_IMB_alPSEs/i/Single-Leg-Romanian-Deadlift.GIF'
              }
            ]
          },
          Barbell: {
            Male: [
              {
                name: 'Barbell Romanian Deadlift',
                description: 'Focus on hip hinge to maximally stretch and strengthen hamstrings.',
                gif: 'https://burnfit.io/wp-content/uploads/2023/11/RM_BB_DL.gif'
              },
              {
                name: 'Good Morning',
                description: 'Barbell on shoulders; bend forward at the hips to train posterior chain heavily.',
                gif: 'https://cdn.shopify.com/s/files/1/0449/8453/3153/files/barbell-good-morning_5ccb0512-0e3a-4200-b947-53c200a2f8ee.gif?v=1726733378'
              }
            ],
            Female: [
              {
                name: 'Sumo Deadlift',
                description: 'Wide stance deadlift that emphasizes hamstrings and inner thighs.',
                gif: 'https://www.garagegymreviews.com/wp-content/uploads/sumo-deadlift-high-pull.gif'
              },
              {
                name: 'Deficit Deadlift',
                description: 'Stand on an elevated platform to increase hamstring stretch at the bottom.',
                gif: 'https://blog.myfitnesspal.com/wp-content/uploads/2019/07/Deficit-Deadlift.gif'
              }
            ]
          },
          Bodyweight: {
            Male: [
              {
                name: 'Nordic Hamstring Curl',
                description: 'Control descent forward from kneeling to powerfully strengthen hamstrings eccentrically.',
                gif: 'https://www.kettlebellkings.com/cdn/shop/articles/nordic_curls.gif?v=1699444790'
              },
              {
                name: 'Glute Bridge Walkout',
                description: 'From a bridge position, slowly walk heels away to dynamically challenge hamstrings.',
                gif: 'https://i.pinimg.com/originals/5a/d7/ac/5ad7acc11654b51f8588e82dc16f80f0.gif'
              }
            ],
            Female: [
              {
                name: 'Hamstring Curl on Stability Ball',
                description: 'Use a stability ball to roll in and out, engaging hamstrings and core.',
                gif: 'https://hips.hearstapps.com/hmg-prod/images/766/fitgif-friday-stability-ball-leg-curl-slider-thumbnail-override-1498833361.gif'
              },
              {
                name: 'Bodyweight Single Leg Deadlift',
                description: 'Balance on one leg and hinge at hips to target hamstrings.',
                gif: 'https://media1.popsugar-assets.com/files/thumbor/G7a19fuBrloTGGi1Ewn23IElsmk/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2021/03/24/956/n/1922729/f7e675427ce8f132_IMB_alPSEs/i/Single-Leg-Romanian-Deadlift.GIF'
              }
            ]
          },
          'Resistance Band': {
            Male: [
              {
                name: 'Resistance Band Deadlift',
                description: 'Stand on band and perform hip hinge to train hamstrings efficiently.',
                gif: 'https://cdn.shopify.com/s/files/1/0052/7043/7978/files/resistance-band-benefit-strength-training-deadlift-01_480x480.gif?v=1646954312'
              },
              {
                name: 'Seated Resistance Band Hamstring Curl',
                description: 'Anchor band low, sit on ground, and curl legs toward glutes.',
                gif: 'https://cdn.shopify.com/s/files/1/0795/8747/5789/files/Animated-GIF-downsized_large-7.gif?v=1702849087'
              }
            ],
            Female: [
              {
                name: 'Standing Resistance Band Leg Curl',
                description: 'Attach band and curl heel toward glutes while standing, isolating hamstrings.',
                gif: 'https://i.pinimg.com/originals/8b/7c/42/8b7c428cfc34aca95964cbb002b112f3.gif'
              },
              {
                name: 'Resistance Band Single Leg Deadlift',
                description: 'Use band resistance while performing a single-leg deadlift for hamstring engagement.',
                gif: 'https://www.nourishmovelove.com/wp-content/uploads/2020/10/deadlift-with-resistance-band.gif'
              }
            ]
          },
          Other: {
            Male: [
              {
                name: 'Leg Curl Machine',
                description: 'Use machine to curl legs against resistance, isolating hamstrings directly.',
                gif: 'https://media.tenor.com/ZElx6PviDq0AAAAM/gym.gif'
              }
            ],
            Female: [
              {
                name: 'Cable Hamstring Curl',
                description: 'Use ankle strap on cable machine to perform standing hamstring curls.',
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
  