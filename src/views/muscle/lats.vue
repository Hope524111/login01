<template>
    <div class="muscle-page">
      <h1>💪 Lats</h1>
      <p class="intro">
        The latissimus dorsi, commonly known as the lats, are large, powerful muscles located on the sides of the back.
        They are essential for pulling movements, posture support, and enhancing the V-shaped appearance of the upper body.
        Strengthening the lats improves overall back strength, shoulder stability, and performance in sports and daily activities
        that involve pulling or lifting motions.
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
                name: 'Single Arm Dumbbell Row',
                description: 'Row a dumbbell towards your waist to strongly engage the lats.',
                gif: 'https://media1.giphy.com/media/irCqptSYgMPX7nnJaj/giphy.gif?cid=6c09b9526eo6bmapvalalt083ch7bb4as2z85au187ph419h&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g'
              },
              {
                name: 'Dumbbell Dead Row',
                description: 'Start from the floor each rep to maximize lat recruitment.',
                gif: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/dumbbellrow-1457030613.gif'
              }
            ],
            Female: [
              {
                name: 'Dumbbell Pullover',
                description: 'Lie on a bench and pull a dumbbell from behind head to above chest, stretching the lats.',
                gif: 'https://www.verywellfit.com/thmb/9TjZz5XCD7m55wzI1E61Bn_XBZY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/95--Dumbbell-PulloverGIF-0a01af6ebf634a7aba793eecf824a383.gif'
              },
              {
                name: 'Incline Dumbbell Row',
                description: 'Lie chest-down on an incline bench and row dumbbells to work lats safely and effectively.',
                gif: 'https://i.pinimg.com/originals/1e/db/7b/1edb7b8deff8a3e53db126d706b931ab.gif'
              }
            ]
          },
          Barbell: {
            Male: [
              {
                name: 'Barbell Bent Over Row',
                description: 'Classic strength exercise, rowing barbell towards waist to hit lats hard.',
                gif: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/barbellrow-1457038583.gif'
              },
              {
                name: 'T-Bar Row',
                description: 'Use T-bar machine to perform heavy lat-focused rows.',
                gif: 'https://cdn.shopify.com/s/files/1/0425/7667/4983/files/FOTOS_BLOG_INSIDE_2_38500574-fcbd-46d2-9a08-6553ebb31089.gif?v=1713254932'
              }
            ],
            Female: [
              {
                name: 'Barbell Pendlay Row',
                description: 'Each rep starts from the ground for explosive strength and better lat activation.',
                gif: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/08/barbell-bent-over-row.gif'
              },
              {
                name: 'Landmine Row',
                description: 'Use a landmine setup to perform rows with a more stable posture, targeting lats.',
                gif: 'https://media.post.rvohealth.io/wp-content/uploads/2023/08/ScientificSarcasticIlsamochadegu-size_restricted.gif'
              }
            ]
          },
          Bodyweight: {
            Male: [
              {
                name: 'Pull-Up',
                description: 'Hang from a bar and pull chin over the bar focusing on lats contraction.',
                gif: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/pullup-1456956490.gif'
              },
              {
                name: 'Archer Pull-Up',
                description: 'A more advanced unilateral pull-up that strongly isolates one side of the lats.',
                gif: 'https://i.makeagif.com/media/3-28-2016/LMIiXm.gif'
              }
            ],
            Female: [
              {
                name: 'Assisted Pull-Up',
                description: 'Use resistance bands or a machine to help perform pull-ups focusing on the lats.',
                gif: 'https://media3.giphy.com/media/q3aUlQotsrLzH5fj8H/giphy.gif?cid=6c09b952ewloba8f0px1w9dvwnvs25jb4k2i1v88e10j6ihp&ep=v1_gifs_search&rid=giphy.gif&ct=g'
              },
              {
                name: 'Negative Pull-Up',
                description: 'Jump to the top pull-up position and slowly lower to strengthen the lats.',
                gif: 'https://www.inspireusafoundation.org/wp-content/uploads/2023/04/band-assisted-chin-up.gif'
              }
            ]
          },
          'Resistance Band': {
            Male: [
              {
                name: 'Resistance Band Lat Pulldown',
                description: 'Anchor band high and pull down to mimic lat pulldown machine movement.',
                gif: 'https://cdn.shopify.com/s/files/1/0250/0362/2496/files/1233.gif?v=1644909487'
              },
              {
                name: 'Resistance Band Row',
                description: 'Sit or stand and row band handles toward you, squeezing lats at the end.',
                gif: 'https://cdn.shopify.com/s/files/1/0655/4832/1000/files/Bent-over-row_480x480.gif?v=1693372226'
              }
            ],
            Female: [
              {
                name: 'Resistance Band Straight Arm Pulldown',
                description: 'Keep arms straight and pull band downward to isolate lats.',
                gif: 'https://cdn.shopify.com/s/files/1/2350/9323/files/12_grande.gif?v=1562748913'
              },
              {
                name: 'Resistance Band Assisted Pull-Up',
                description: 'Use band support to complete more pull-ups, strengthening the back.',
                gif: 'https://media.post.rvohealth.io/wp-content/uploads/2020/11/Pullup-prep-exercises.gif'
              }
            ]
          },
          Other: {
            Male: [
              {
                name: 'Lat Pulldown Machine',
                description: 'Sit and pull bar down toward chest focusing on lat contraction.',
                gif: 'https://media.tenor.com/PVR9ra9tAwcAAAAM/pulley-pegada-aberta.gif'
              }
            ],
            Female: [
              {
                name: 'Cable Straight Arm Pulldown',
                description: 'Use a cable machine to pull bar straight down, isolating lats with strict form.',
                gif: 'https://i.pinimg.com/originals/9d/fc/e4/9dfce458d1bc8863951aa59b603b49bc.gif'
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
  