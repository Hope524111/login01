<template>
    <div class="chest-page">
        <!-- Header -->
        <header class="page-header">
            <button class="back-btn" @click="$router.push('/home/muscle')">
                <span class="back-icon">←</span>
            </button>
            <h1 class="page-title">🏋️ Chest (胸肌)</h1>
        </header>

        <div class="chest-content">
            <!-- Anatomy Card -->
            <div class="anatomy-card">
                <div class="anatomy-left">
                    <svg viewBox="0 0 200 200" class="muscle-svg">
                        <!-- Chest muscle illustration -->
                        <ellipse cx="70" cy="90" rx="35" ry="40" fill="rgba(255,107,53,0.8)" stroke="#FF6A35" stroke-width="2"/>
                        <ellipse cx="130" cy="90" rx="35" ry="40" fill="rgba(255,107,53,0.8)" stroke="#FF6A35" stroke-width="2"/>
                        <!-- Connecting tissue -->
                        <rect x="85" y="75" width="30" height="20" rx="5" fill="rgba(255,107,53,0.6)"/>
                        <!-- Shoulder connections -->
                        <ellipse cx="40" cy="75" rx="15" ry="12" fill="rgba(255,159,28,0.7)" stroke="#FF9F1C" stroke-width="1"/>
                        <ellipse cx="160" cy="75" rx="15" ry="12" fill="rgba(255,159,28,0.7)" stroke="#FF9F1C" stroke-width="1"/>
                        <!-- Labels -->
                        <text x="70" y="140" text-anchor="middle" fill="#FF6A35" font-size="10" font-weight="bold">胸大肌</text>
                        <text x="130" y="140" text-anchor="middle" fill="#FF6A35" font-size="10" font-weight="bold">胸大肌</text>
                    </svg>
                </div>
                <div class="anatomy-right">
                    <h3 class="anatomy-title">胸肌 (Pectoralis)</h3>
                    <div class="anatomy-info">
                        <div class="info-item">
                            <span class="info-label">位置</span>
                            <span class="info-value">胸部，占据上半身前侧主要面积</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">功能</span>
                            <span class="info-value">肩内收、水平内推、手臂内旋</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">训练技巧</span>
                            <span class="info-value">哑铃卧推、上斜板卧推、飞鸟夹胸</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Gender Tabs -->
            <div class="gender-tabs">
                <button
                    class="gender-tab"
                    :class="{ active: selectedGender === 'male' }"
                    @click="selectedGender = 'male'"
                >
                    👨 Male
                </button>
                <button
                    class="gender-tab"
                    :class="{ active: selectedGender === 'female' }"
                    @click="selectedGender = 'female'"
                >
                    👩 Female
                </button>
            </div>

            <!-- Workout Phases -->
            <transition name="fade">
            <div class="workout-phases">
                <!-- Warm-up Phase -->
                <div class="phase-card warmup">
                    <div class="phase-header" @click="togglePhase('warmup')">
                        <div class="phase-title-wrap">
                            <span class="phase-icon">🔥</span>
                            <span class="phase-title">Warm-up 热身</span>
                        </div>
                        <span class="phase-badge">{{ warmupExercises.length }} exercises</span>
                        <span class="phase-arrow" :class="{ expanded: expandedPhase === 'warmup' }">▼</span>
                    </div>
                    <div class="phase-content" v-show="expandedPhase === 'warmup'">
                        <div class="phase-timeline">
                            <div class="timeline-item" v-for="(ex, idx) in warmupExercises" :key="idx">
                                <span class="timeline-time">{{ ex.duration }}</span>
                                <div class="timeline-content">
                                    <span class="timeline-name">{{ ex.name }}</span>
                                    <span class="timeline-desc">{{ ex.description }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Main Phase -->
                <div class="phase-card main-phase">
                    <div class="phase-header" @click="togglePhase('main')">
                        <div class="phase-title-wrap">
                            <span class="phase-icon">💪</span>
                            <span class="phase-title">Main Workout 主训练</span>
                        </div>
                        <span class="phase-badge">{{ mainExercises.length }} exercises</span>
                        <span class="phase-arrow" :class="{ expanded: expandedPhase === 'main' }">▼</span>
                    </div>
                    <div class="phase-content" v-show="expandedPhase === 'main'">
                        <div class="exercise-list">
                            <div
                                v-for="exercise in mainExercises"
                                :key="exercise.name"
                                class="exercise-card"
                                :class="{ expanded: expandedExercise === exercise.name }"
                            >
                                <div class="exercise-header" @click="toggleExercise(exercise.name)">
                                    <div class="video-container">
                                        <iframe
                                            :src="`https://www.youtube.com/embed/${exercise.videoId}?enablejsapi=1`"
                                            frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowfullscreen
                                        ></iframe>
                                    </div>
                                    <div class="exercise-info">
                                        <h4 class="exercise-name">{{ exercise.name }}</h4>
                                        <div class="exercise-meta">
                                            <span class="meta-tag sets">{{ exercise.sets }} sets</span>
                                            <span class="meta-tag reps">{{ exercise.reps }} reps</span>
                                            <span class="meta-tag rest">⏱️ {{ exercise.rest }}</span>
                                        </div>
                                        <div class="exercise-difficulty" :class="exercise.difficulty">
                                            {{ exercise.difficulty }}
                                        </div>
                                    </div>
                                </div>
                                <div class="exercise-detail" v-show="expandedExercise === exercise.name">
                                    <div class="detail-section demo-section">
                                        <h5>🎬 动作演示</h5>
                                        <div class="demo-video-container">
                                            <iframe
                                                :src="`https://www.youtube.com/embed/${exercise.videoId}?enablejsapi=1`"
                                                frameborder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen
                                            ></iframe>
                                        </div>
                                    </div>
                                    <div class="detail-section">
                                        <h5>📝 Steps 步骤</h5>
                                        <ol>
                                            <li v-for="(step, i) in exercise.steps" :key="i">{{ step }}</li>
                                        </ol>
                                    </div>
                                    <div class="detail-section">
                                        <h5>💡 Tips 技巧</h5>
                                        <ul>
                                            <li v-for="(tip, i) in exercise.tips" :key="i">{{ tip }}</li>
                                        </ul>
                                    </div>
                                    <div class="detail-section mistakes">
                                        <h5>⚠️ Common Mistakes 常见错误</h5>
                                        <ul>
                                            <li v-for="(mistake, i) in exercise.mistakes" :key="i">{{ mistake }}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Cool-down Phase -->
                <div class="phase-card cooldown">
                    <div class="phase-header" @click="togglePhase('cooldown')">
                        <div class="phase-title-wrap">
                            <span class="phase-icon">🧘</span>
                            <span class="phase-title">Cool-down 拉伸</span>
                        </div>
                        <span class="phase-badge">{{ cooldownExercises.length }} exercises</span>
                        <span class="phase-arrow" :class="{ expanded: expandedPhase === 'cooldown' }">▼</span>
                    </div>
                    <div class="phase-content" v-show="expandedPhase === 'cooldown'">
                        <div class="phase-timeline">
                            <div class="timeline-item" v-for="(ex, idx) in cooldownExercises" :key="idx">
                                <span class="timeline-time">{{ ex.duration }}</span>
                                <div class="timeline-content">
                                    <span class="timeline-name">{{ ex.name }}</span>
                                    <span class="timeline-desc">{{ ex.description }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </transition>

            <!-- Summary Card -->
            <div class="summary-card">
                <h3 class="summary-title">📊 Workout Summary</h3>
                <div class="summary-stats">
                    <div class="stat-item">
                        <span class="stat-value">{{ totalExercises }}</span>
                        <span class="stat-label">Exercises</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">{{ estimatedTime }}</span>
                        <span class="stat-label">Minutes</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">{{ selectedGender === 'male' ? '4' : '3' }}</span>
                        <span class="stat-label">Sets</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">{{ selectedGender === 'male' ? '10' : '15' }}</span>
                        <span class="stat-label">Reps</span>
                    </div>
                </div>
                <div class="summary-difficulty">
                    <span class="diff-label">Difficulty:</span>
                    <span class="diff-value">{{ selectedGender === 'male' ? 'Intermediate' : 'Beginner' }}</span>
                </div>
                <button class="start-workout-btn" @click="startWorkout">开始训练</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedGender: localStorage.getItem('chestGender') || 'male',
            expandedPhase: 'main',
            expandedExercise: null,
            completedExercises: JSON.parse(localStorage.getItem('chestCompletedExercises') || '[]'),
            warmupExercises: [
                {
                    name: 'Arm Circles',
                    duration: '1 min',
                    description: 'Dynamic arm mobility to activate shoulder joints'
                },
                {
                    name: 'Push-up Variations',
                    duration: '2 min',
                    description: 'Light push-ups to activate chest muscles'
                },
                {
                    name: 'Doorway Stretch',
                    duration: '1 min',
                    description: 'Chest opening stretch for warm-up'
                }
            ],
            cooldownExercises: [
                {
                    name: 'Child\'s Pose',
                    duration: '1 min',
                    description: 'Recovery stretch for chest and shoulders'
                },
                {
                    name: 'Chest Doorway Stretch',
                    duration: '2 min',
                    description: 'Deep stretch for pectoralis muscles'
                },
                {
                    name: 'Shoulder Blade Squeeze',
                    duration: '1 min',
                    description: 'Posture correction and upper back activation'
                }
            ],
            mainExercises: [
                {
                    name: '杠铃卧推 Bench Press',
                    videoId: 'rT7DgCrcr3c',
                    sets: 4,
                    reps: '10',
                    rest: '90s',
                    difficulty: 'intermediate',
                    steps: [
                        '躺在平板凳上，双脚踩实地面',
                        '双手握住杠铃，握距略宽于肩',
                        '将杠铃从架子上取出，置于胸部上方',
                        '缓慢下降杠铃至中胸位置',
                        '推起杠铃至手臂伸直，保持核心收紧'
                    ],
                    tips: [
                        '下降时控制速度，避免杠铃弹胸',
                        '保持肩胛骨收紧贴凳',
                        '推起时不要完全锁死肘关节'
                    ],
                    mistakes: [
                        '过度弓背，导致腰部离开凳面',
                        '握距过宽或过窄',
                        '下落位置过高或过低'
                    ]
                },
                {
                    name: '上斜哑铃卧推 Incline DB Press',
                    videoId: 'dX6jn16jrAo',
                    sets: 4,
                    reps: '10',
                    rest: '90s',
                    difficulty: 'intermediate',
                    steps: [
                        '将凳子调至30-45度上斜角度',
                        '双手各持一只哑铃，坐下',
                        '将哑铃置于肩部两侧，手心朝前',
                        '向上推起哑铃至手臂伸直',
                        '缓慢下降至肩部高度，重复'
                    ],
                    tips: [
                        '控制动作速度，感受胸肌拉伸',
                        '保持手腕中立，不要内折',
                        '椅子角度不要超过45度'
                    ],
                    mistakes: [
                        '哑铃重量过重导致姿势变形',
                        '上推时肩膀前探',
                        '没有充分拉伸胸肌就反弹'
                    ]
                },
                {
                    name: '蝴蝶机夹胸 Pec Deck',
                    videoId: 'xlhD3DPJBoA',
                    sets: 4,
                    reps: '10',
                    rest: '90s',
                    difficulty: 'beginner',
                    steps: [
                        '调整坐垫高度，确保手臂与肩同高',
                        '坐直，核心收紧，背部贴紧靠背',
                        '双手握住把手，肘关节微屈',
                        '用力内收手臂，挤压胸肌',
                        '顶峰收缩1-2秒，缓慢回到起始位置'
                    ],
                    tips: [
                        '不要完全伸直手臂，保持张力',
                        '用胸肌发力，不是手臂',
                        '动作幅度要完整，充分收缩'
                    ],
                    mistakes: [
                        '重量过大导致身体前倾借力',
                        '手臂超过肩部高度',
                        '动作太快，没有控制'
                    ]
                },
                {
                    name: '俯卧撑 Push Up',
                    videoId: 'iodxDTx2L5I',
                    sets: 4,
                    reps: '10',
                    rest: '90s',
                    difficulty: 'beginner',
                    steps: [
                        '双手撑地，比肩稍宽，手指朝前',
                        '身体保持一条直线，核心收紧',
                        '屈肘下降至胸部接近地面',
                        '推起身体回到起始位置',
                        '全程保持身体稳定，不要塌腰'
                    ],
                    tips: [
                        '下降时吸气，推起时呼气',
                        '手肘与身体呈45度角',
                        '下降速度慢于推起速度'
                    ],
                    mistakes: [
                        '腰部塌陷或拱起',
                        '肩膀过度前伸超过手肘',
                        '动作速度太快，没有控制'
                    ]
                }
            ]
        };
    },
    computed: {
        totalExercises() {
            return this.warmupExercises.length + this.mainExercises.length + this.cooldownExercises.length;
        },
        estimatedTime() {
            return 30 + (this.selectedGender === 'male' ? 10 : 5);
        }
    },
    watch: {
        selectedGender(val) {
            localStorage.setItem('chestGender', val);
            // Adjust sets and reps based on gender
            if (val === 'female') {
                this.mainExercises.forEach(ex => {
                    ex.sets = 3;
                    ex.reps = '15';
                    ex.rest = '60s';
                });
            } else {
                this.mainExercises.forEach(ex => {
                    ex.sets = 4;
                    ex.reps = '10';
                    ex.rest = '90s';
                });
            }
        },
        completedExercises: {
            handler() {
                this.saveProgress();
            },
            deep: true
        }
    },
    mounted() {
        this.loadProgress();
    },
    methods: {
        togglePhase(phase) {
            this.expandedPhase = this.expandedPhase === phase ? null : phase;
        },
        toggleExercise(name) {
            this.expandedExercise = this.expandedExercise === name ? null : name;
        },
        startWorkout() {
            this.expandedPhase = 'main';
            this.$nextTick(() => {
                document.querySelector('.main-phase')?.scrollIntoView({ behavior: 'smooth' });
            });
        },
        loadProgress() {
            const saved = localStorage.getItem('chestCompletedExercises');
            if (saved) {
                this.completedExercises = JSON.parse(saved);
            }
        },
        saveProgress() {
            localStorage.setItem('chestCompletedExercises', JSON.stringify(this.completedExercises));
        }
    }
};
</script>

<style scoped>
:root {
    --color-primary: #FF6A35;
    --color-bg: #1A1A2E;
    --color-card: rgba(255, 255, 255, 0.05);
    --color-border: rgba(255, 255, 255, 0.1);
    --color-text: #FFFFFF;
    --color-text-secondary: #B2BEC3;
    --gradient-primary: linear-gradient(135deg, #FF6A35 0%, #FF9F1C 100%);
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --space-xs: 4px;
    --space-sm: 8px;
    --space-md: 16px;
    --space-lg: 24px;
    --space-xl: 32px;
    --shadow-glow: 0 4px 20px rgba(255, 107, 53, 0.4);
    --transition-fast: 0.15s ease;
    --transition-normal: 0.3s ease;
}

.chest-page {
    min-height: 100vh;
    background: var(--color-bg);
    color: var(--color-text);
    padding-bottom: var(--space-xl);
}

.page-header {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-md) var(--space-lg);
    background: rgba(26, 26, 46, 0.9);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--color-border);
}

.back-btn {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-sm);
    background: var(--color-card);
    border: 1px solid var(--color-border);
    color: var(--color-text);
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition-fast);
}

.back-btn:hover {
    background: var(--gradient-primary);
}

.page-title {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
}

.chest-content {
    padding: var(--space-lg);
    max-width: 900px;
    margin: 0 auto;
}

/* Anatomy Card */
.anatomy-card {
    display: flex;
    gap: var(--space-lg);
    background: var(--color-card);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    margin-bottom: var(--space-lg);
    backdrop-filter: blur(10px);
}

.anatomy-left {
    flex: 0 0 120px;
}

.muscle-svg {
    width: 120px;
    height: 120px;
}

.anatomy-right {
    flex: 1;
}

.anatomy-title {
    font-size: 18px;
    margin: 0 0 var(--space-md) 0;
    color: var(--color-primary);
}

.anatomy-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
}

.info-item {
    display: flex;
    flex-direction: column;
}

.info-label {
    font-size: 12px;
    color: var(--color-text-secondary);
    margin-bottom: 2px;
}

.info-value {
    font-size: 14px;
}

/* Gender Tabs */
.gender-tabs {
    display: flex;
    gap: var(--space-sm);
    margin-bottom: var(--space-lg);
}

.gender-tab {
    flex: 1;
    padding: var(--space-md);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-card);
    color: var(--color-text-secondary);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition-fast);
}

.gender-tab:hover {
    border-color: var(--color-primary);
}

.gender-tab.active {
    background: var(--gradient-primary);
    border-color: transparent;
    color: var(--color-text);
    box-shadow: var(--shadow-glow);
}

/* Workout Phases */
.workout-phases {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
}

.phase-card {
    background: var(--color-card);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    backdrop-filter: blur(10px);
}

.phase-card.warmup {
    border-left: 3px solid #4CAF50;
}

.phase-card.main-phase {
    border-left: 3px solid var(--color-primary);
}

.phase-card.cooldown {
    border-left: 3px solid #2196F3;
}

.phase-header {
    display: flex;
    align-items: center;
    padding: var(--space-md) var(--space-lg);
    cursor: pointer;
    transition: var(--transition-fast);
}

.phase-header:hover {
    background: rgba(255, 255, 255, 0.03);
}

.phase-title-wrap {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    flex: 1;
}

.phase-icon {
    font-size: 18px;
}

.phase-title {
    font-size: 16px;
    font-weight: 600;
}

.phase-badge {
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    color: var(--color-text-secondary);
    margin-right: var(--space-md);
}

.phase-arrow {
    font-size: 12px;
    color: var(--color-text-secondary);
    transition: var(--transition-normal);
}

.phase-arrow.expanded {
    transform: rotate(180deg);
}

.phase-content {
    padding: 0 var(--space-lg) var(--space-lg);
    overflow: hidden;
    transition: height 0.3s ease, opacity 0.3s ease;
}

.phase-content[style*="display: none"] {
    opacity: 0;
}

/* Timeline */
.phase-timeline {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
}

.timeline-item {
    display: flex;
    gap: var(--space-md);
    padding: var(--space-sm) 0;
    border-bottom: 1px solid var(--color-border);
}

.timeline-item:last-child {
    border-bottom: none;
}

.timeline-time {
    flex: 0 0 50px;
    font-size: 12px;
    color: var(--color-text-secondary);
    font-weight: 500;
}

.timeline-content {
    flex: 1;
}

.timeline-name {
    display: block;
    font-size: 14px;
    font-weight: 500;
}

.timeline-desc {
    display: block;
    font-size: 12px;
    color: var(--color-text-secondary);
    margin-top: 2px;
}

/* Exercise Card */
.exercise-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
}

.exercise-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    overflow: hidden;
    transition: var(--transition-normal);
}

.exercise-card.expanded {
    box-shadow: var(--shadow-glow);
}

.exercise-header {
    display: flex;
    gap: var(--space-md);
    padding: var(--space-md);
    cursor: pointer;
}

.video-container {
    flex: 0 0 160px;
    width: 160px;
    height: 90px;
    border-radius: var(--radius-sm);
    overflow: hidden;
    background: #000;
}

.video-container iframe {
    width: 100%;
    height: 100%;
}

.exercise-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.exercise-name {
    font-size: 14px;
    font-weight: 600;
    margin: 0 0 var(--space-sm) 0;
}

.exercise-meta {
    display: flex;
    gap: var(--space-sm);
    flex-wrap: wrap;
    margin-bottom: var(--space-sm);
}

.meta-tag {
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.1);
}

.meta-tag.sets {
    color: #4CAF50;
}

.meta-tag.reps {
    color: #FF9F1C;
}

.meta-tag.rest {
    color: var(--color-text-secondary);
}

.exercise-difficulty {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.exercise-difficulty.beginner {
    color: #4CAF50;
}

.exercise-difficulty.intermediate {
    color: #FF9F1C;
}

.exercise-difficulty.advanced {
    color: #f44336;
}

/* Exercise Detail */
.exercise-detail {
    padding: var(--space-md);
    border-top: 1px solid var(--color-border);
    background: rgba(0, 0, 0, 0.2);
}

.detail-section {
    margin-bottom: var(--space-md);
}

.detail-section:last-child {
    margin-bottom: 0;
}

.detail-section h5 {
    font-size: 13px;
    font-weight: 600;
    margin: 0 0 var(--space-sm) 0;
    color: var(--color-primary);
}

.detail-section ol,
.detail-section ul {
    margin: 0;
    padding-left: var(--space-lg);
}

.detail-section li {
    font-size: 13px;
    color: var(--color-text-secondary);
    margin-bottom: var(--space-xs);
    line-height: 1.5;
}

.detail-section.mistakes li {
    color: #f44336;
}

/* Demo Video Container */
.demo-section {
    margin-bottom: var(--space-md);
}

.demo-video-container {
    width: 100%;
    max-width: 320px;
    height: 180px;
    border-radius: var(--radius-sm);
    overflow: hidden;
    background: #000;
}

.demo-video-container iframe {
    width: 100%;
    height: 100%;
}

/* Exercise Detail Transition */
.exercise-detail {
    padding: var(--space-md);
    border-top: 1px solid var(--color-border);
    background: rgba(0, 0, 0, 0.2);
    overflow: hidden;
    transition: height 0.3s ease, opacity 0.3s ease;
}

.exercise-detail[style*="display: none"] {
    opacity: 0;
}

/* Gender Tab Fade Transition */
.gender-tabs {
    display: flex;
    gap: var(--space-sm);
    margin-bottom: var(--space-lg);
}

.gender-tab {
    flex: 1;
    padding: var(--space-md);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-card);
    color: var(--color-text-secondary);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition-fast), opacity 0.3s ease;
}

.gender-tab.fade-enter-active,
.gender-tab.fade-leave-active {
    transition: opacity 0.3s ease;
}

.gender-tab.fade-enter-from,
.gender-tab.fade-leave-to {
    opacity: 0;
}

/* Summary Card */
.summary-card {
    background: var(--color-card);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    backdrop-filter: blur(10px);
}

.summary-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 var(--space-md) 0;
    text-align: center;
}

.summary-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-md);
    margin-bottom: var(--space-md);
}

.stat-item {
    text-align: center;
}

.stat-value {
    display: block;
    font-size: 24px;
    font-weight: 700;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.stat-label {
    font-size: 12px;
    color: var(--color-text-secondary);
}

.summary-difficulty {
    text-align: center;
    font-size: 14px;
}

.diff-label {
    color: var(--color-text-secondary);
}

.diff-value {
    font-weight: 600;
    color: var(--color-primary);
}

.start-workout-btn {
    display: block;
    width: 100%;
    padding: var(--space-md);
    margin-top: var(--space-md);
    background: var(--gradient-primary);
    border: none;
    border-radius: var(--radius-md);
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition-fast);
    box-shadow: var(--shadow-glow);
}

.start-workout-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(255, 107, 53, 0.5);
}

/* Responsive */
@media (max-width: 600px) {
    .chest-content {
        padding: var(--space-md);
    }

    .anatomy-card {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .anatomy-left {
        flex: 0 0 auto;
    }

    .anatomy-info {
        text-align: left;
    }

    .exercise-header {
        flex-direction: column;
    }

    .video-container {
        flex: 0 0 auto;
        width: 100%;
        aspect-ratio: 16 / 9;
    }

    .summary-stats {
        grid-template-columns: repeat(2, 1fr);
    }

    .phase-header {
        padding: var(--space-sm) var(--space-md);
    }

    .phase-content {
        padding: 0 var(--space-md) var(--space-md);
    }

    .phase-title {
        font-size: 14px;
    }
}
</style>