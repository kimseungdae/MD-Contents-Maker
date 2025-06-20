<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
      <!-- Header -->
      <div class="px-6 py-4 border-b">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-text-primary">정답 확인 결과</h3>
          <button
            @click="$emit('close')"
            class="text-text-muted hover:text-text-primary transition-colors"
          >
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Results -->
      <div class="px-6 py-4">
        <!-- Score Summary -->
        <div class="text-center mb-6">
          <div class="text-3xl font-bold mb-2" :class="scoreColor">
            {{ correctCount }}/{{ totalCount }}
          </div>
          <div class="text-sm text-text-secondary">
            {{ scorePercentage }}% 정답
          </div>
          <div class="mt-4">
            <div class="text-2xl mb-2">{{ scoreEmoji }}</div>
            <div class="text-lg font-medium" :class="scoreColor">
              {{ scoreMessage }}
            </div>
          </div>
        </div>

        <!-- Detailed Results -->
        <div class="space-y-3">
          <div
            v-for="(result, index) in results"
            :key="index"
            class="flex items-center justify-between p-3 rounded-lg"
            :class="result.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'"
          >
            <div class="flex items-center space-x-3">
              <div class="text-lg">
                {{ result.correct ? '✅' : '❌' }}
              </div>
              <div>
                <div class="text-sm font-medium">문제 {{ index + 1 }}</div>
                <div class="text-xs text-text-muted">
                  답: {{ result.userAnswer || '미응답' }}
                </div>
              </div>
            </div>
            <div v-if="!result.correct" class="text-right">
              <div class="text-xs text-text-muted">정답</div>
              <div class="text-sm font-medium text-green-600">
                {{ result.correctAnswer }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="px-6 py-4 border-t bg-surface flex justify-end space-x-3">
        <button
          @click="$emit('retry')"
          class="px-4 py-2 text-text-secondary border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          다시 풀기
        </button>
        <button
          @click="$emit('close')"
          class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

interface Props {
  results: Array<{
    moduleId: string
    correct: boolean
    userAnswer: any
    correctAnswer: any
  }>
}

interface Emits {
  (e: 'close'): void
  (e: 'retry'): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const totalCount = computed(() => props.results.length)
const correctCount = computed(() => props.results.filter(r => r.correct).length)
const scorePercentage = computed(() => 
  totalCount.value > 0 ? Math.round((correctCount.value / totalCount.value) * 100) : 0
)

const scoreColor = computed(() => {
  const percentage = scorePercentage.value
  if (percentage >= 90) return 'text-green-600'
  if (percentage >= 70) return 'text-yellow-600'
  return 'text-red-600'
})

const scoreEmoji = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return '🎉'
  if (percentage >= 90) return '😊'
  if (percentage >= 70) return '😐'
  return '😅'
})

const scoreMessage = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return '완벽해요!'
  if (percentage >= 90) return '훌륭해요!'
  if (percentage >= 70) return '잘했어요!'
  return '조금 더 힘내요!'
})
</script>