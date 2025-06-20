<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <button
              @click="$router.back()"
              class="p-2 text-text-muted hover:text-text-primary transition-colors"
            >
              <ArrowLeftIcon class="w-5 h-5" />
            </button>
            <h1 class="text-lg font-semibold text-text-primary">문제 미리보기</h1>
          </div>
          <div class="flex items-center space-x-3">
            <span class="text-sm text-text-secondary">
              {{ problem?.grade }}학년 {{ problem?.subject }}
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- Problem Content -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="problem" class="bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Problem Header -->
        <div class="bg-gradient-to-r from-primary to-blue-600 px-6 py-8 text-white">
          <h2 class="text-2xl font-bold mb-2">{{ problem.title }}</h2>
          <p class="text-blue-100 text-lg leading-relaxed">{{ problem.question }}</p>
        </div>

        <!-- Problem Canvas -->
        <div class="p-8 min-h-[500px] relative">
          <div
            v-if="problem.modules.length === 0"
            class="flex items-center justify-center h-64 text-text-muted"
          >
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4">
                <ExclamationTriangleIcon class="w-full h-full" />
              </div>
              <p>아직 추가된 모듈이 없습니다</p>
            </div>
          </div>

          <!-- Interactive Modules -->
          <PlayerModule
            v-for="module in problem.modules"
            :key="module.id"
            :module="module"
            @answer-change="onAnswerChange"
          />
        </div>

        <!-- Action Buttons -->
        <div class="px-8 py-6 bg-surface border-t flex justify-between items-center">
          <div class="text-sm text-text-secondary">
            모듈 {{ problem.modules.length }}개
          </div>
          <div class="flex space-x-3">
            <button
              @click="resetAnswers"
              class="px-4 py-2 text-text-secondary border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              다시 풀기
            </button>
            <button
              @click="checkAnswers"
              class="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              정답 확인
            </button>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="text-center py-12">
        <div class="w-24 h-24 mx-auto mb-4 text-text-muted">
          <ExclamationTriangleIcon class="w-full h-full" />
        </div>
        <h3 class="text-lg font-medium text-text-primary mb-2">문제를 찾을 수 없습니다</h3>
        <p class="text-text-secondary mb-6">요청하신 문제가 존재하지 않습니다.</p>
        <button
          @click="$router.push('/problems')"
          class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          문제 목록으로 돌아가기
        </button>
      </div>
    </main>

    <!-- Results Modal -->
    <ResultsModal
      v-if="showResults"
      :results="answerResults"
      @close="showResults = false"
      @retry="resetAnswers"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProblemsStore } from '@/stores/problems'
import type { Problem, Module } from '@/types'
import { ArrowLeftIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import PlayerModule from '@/components/player/PlayerModule.vue'
import ResultsModal from '@/components/player/ResultsModal.vue'

const route = useRoute()
const router = useRouter()
const problemsStore = useProblemsStore()

const problem = ref<Problem | null>(null)
const userAnswers = ref<Record<string, any>>({})
const showResults = ref(false)
const answerResults = ref<Array<{ moduleId: string; correct: boolean; userAnswer: any; correctAnswer: any }>>([])

const onAnswerChange = (moduleId: string, answer: any) => {
  userAnswers.value[moduleId] = answer
}

const checkAnswers = () => {
  if (!problem.value) return

  const results = problem.value.modules
    .filter(module => module.checkAnswer)
    .map(module => {
      const userAnswer = userAnswers.value[module.id]
      const correctAnswer = module.answer
      const correct = checkAnswer(userAnswer, correctAnswer, module.type)

      return {
        moduleId: module.id,
        correct,
        userAnswer,
        correctAnswer
      }
    })

  answerResults.value = results
  showResults.value = true
}

const checkAnswer = (userAnswer: any, correctAnswer: any, moduleType: string): boolean => {
  if (userAnswer === undefined || userAnswer === null) return false
  
  switch (moduleType) {
    case '객관식':
      return userAnswer === correctAnswer
    case '주관식':
      return String(userAnswer).trim().toLowerCase() === String(correctAnswer).trim().toLowerCase()
    case '각도기':
      return Math.abs(Number(userAnswer) - Number(correctAnswer)) <= 2 // 2도 오차 허용
    default:
      return userAnswer === correctAnswer
  }
}

const resetAnswers = () => {
  userAnswers.value = {}
  showResults.value = false
}

onMounted(() => {
  const problemId = route.params.id as string
  const foundProblem = problemsStore.getProblemById(problemId)
  
  if (foundProblem) {
    problem.value = foundProblem
  } else {
    // Handle case where problem doesn't exist
    router.push('/problems')
  }
})
</script>