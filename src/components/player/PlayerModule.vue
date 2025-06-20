<template>
  <div class="absolute bg-white rounded-lg shadow-sm border p-4" :style="moduleStyle">
    <!-- 객관식 -->
    <div v-if="module.type === '객관식'" class="space-y-3">
      <h3 class="font-medium text-text-primary">{{ module.properties.question }}</h3>
      <div class="space-y-2">
        <label
          v-for="(option, index) in module.properties.options"
          :key="index"
          class="flex items-center space-x-2 cursor-pointer"
        >
          <input
            :value="option"
            :checked="selectedAnswer === option"
            type="radio"
            :name="`module_${module.id}`"
            class="text-primary focus:ring-primary"
            @change="updateAnswer(option)"
          />
          <span class="text-sm">{{ option }}</span>
        </label>
      </div>
    </div>

    <!-- 주관식 -->
    <div v-else-if="module.type === '주관식'" class="space-y-3">
      <h3 class="font-medium text-text-primary">{{ module.properties.question }}</h3>
      <input
        v-model="selectedAnswer"
        type="text"
        placeholder="답을 입력하세요"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        @input="updateAnswer(($event.target as HTMLInputElement).value)"
      />
    </div>

    <!-- 이미지표시 -->
    <div v-else-if="module.type === '이미지표시'" class="text-center">
      <img
        v-if="module.properties.src"
        :src="module.properties.src"
        class="max-h-60 mx-auto rounded"
      />
      <div v-else class="bg-gray-100 rounded-lg p-8">
        <div class="text-4xl mb-2">🖼️</div>
        <div class="text-sm text-text-muted">이미지가 여기에 표시됩니다</div>
      </div>
    </div>

    <!-- 각도기 -->
    <div v-else-if="module.type === '각도기'" class="space-y-3">
      <div class="text-center">
        <div class="text-4xl mb-2">📐</div>
        <div class="text-sm text-text-secondary mb-3">각도기를 사용하여 각도를 측정하세요</div>
      </div>
      <div class="flex items-center space-x-2">
        <input
          v-model.number="selectedAnswer"
          type="number"
          placeholder="각도"
          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          @input="updateAnswer(($event.target as HTMLInputElement).value)"
        />
        <span class="text-sm text-text-secondary">도</span>
      </div>
    </div>

    <!-- 기타 도구들 -->
    <div v-else class="text-center py-4">
      <div class="text-3xl mb-2">{{ getModuleIcon(module.type) }}</div>
      <div class="text-sm text-text-secondary">{{ module.type }}</div>
      <div class="text-xs text-text-muted mt-2">인터랙티브 기능 구현 예정</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Module } from '@/types'

interface Props {
  module: Module
}

interface Emits {
  (e: 'answer-change', moduleId: string, answer: any): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const selectedAnswer = ref<any>(null)

const moduleStyle = computed(() => ({
  left: `${props.module.position.x}px`,
  top: `${props.module.position.y}px`,
  width: `${props.module.size.width}px`,
  minWidth: '200px',
}))

const getModuleIcon = (type: string): string => {
  const icons: Record<string, string> = {
    자: '📏',
    시계: '🕐',
    선잇기: '✏️',
    색칠하기: '🎨',
    드래그앤드롭: '👆',
    블록놀이: '🧩',
    퍼즐: '🧩',
    수식입력: '📝',
    동영상: '🎥',
    음성: '🔊',
    서술형: '📝',
  }
  return icons[type] || '📦'
}

const updateAnswer = (answer: any) => {
  selectedAnswer.value = answer
  emit('answer-change', props.module.id, answer)
}
</script>
