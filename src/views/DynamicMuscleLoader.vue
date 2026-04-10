<template>
  <div>
    
    <div v-if="!AsyncComponent" style="color: red; text-align: center; margin-top: 60px;">
      <!-- ❌ page cannot be found: {{ part }} -->
    </div>

    <!-- ✅ 正常加载组件 -->
    <component v-else :is="AsyncComponent" />
  </div>
</template>

<script>
const muscleComponents = {
  'back-calves': () => import('@/views/muscle/back-calves.vue'),
  'back-thigh': () => import('@/views/muscle/back-thigh.vue'),
  'belly-side': () => import('@/views/muscle/belly-side.vue'),
  'belly': () => import('@/views/muscle/belly.vue'),
  'chest': () => import('@/views/muscle/chest.vue'),
  'foreshoulder': () => import('@/views/muscle/foreshoulder.vue'),
  'front-arms': () => import('@/views/muscle/front-arms.vue'),
  'front-calves': () => import('@/views/muscle/front-calves.vue'),
  'forearm': () => import('@/views/muscle/forearm.vue'),
  'front-thigh': () => import('@/views/muscle/front-thigh.vue'),
  'traps': () => import('@/views/muscle/traps.vue'),
  'glutes': () => import('@/views/muscle/glutes.vue'),
  'hands': () => import('@/views/muscle/hands.vue'),
  'lats': () => import('@/views/muscle/lats.vue'),
  'lowerback': () => import('@/views/muscle/lowerback.vue'),
  'rear-shoulders': () => import('@/views/muscle/rear-shoulders.vue'),
  'traps-middle': () => import('@/views/muscle/traps-middle.vue'),
  'triceps': () => import('@/views/muscle/triceps.vue')
};

export default {
  name: 'DynamicMuscleLoader',
  props: ['part'],
  data() {
    return {
      AsyncComponent: null
    };
  },
  created() {
  console.log('✅ part from props:', this.part);
  console.log('✅ loader available keys:', Object.keys(muscleComponents));

  const loader = muscleComponents[this.part];
  if (loader) {
    loader()
      .then(module => {
        this.AsyncComponent = module.default || module;
        console.log('✅ Component loaded successfully');
      })
      .catch(err => {
        console.error('❌ Failed to load component:', err);
      });
  } else {
    console.warn('⚠️ No loader found for part:', this.part);
  }
}
};
</script>
