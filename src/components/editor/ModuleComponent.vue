<template>
  <div
    class="absolute border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white hover:border-primary transition-colors cursor-move"
    :style="moduleStyle"
    @mousedown="startDrag"
  >
    <!-- Module Header -->
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm font-medium text-text-secondary">{{ module.type }}</span>
      <button
        @click="$emit('delete', module.id)"
        class="text-text-muted hover:text-danger transition-colors"
      >
        <XMarkIcon class="w-4 h-4" />
      </button>
    </div>

    <!-- Module Content -->
    <div class="min-h-[60px] flex items-center justify-center">
      <!-- 객관식 -->
      <div v-if="module.type === '객관식'" class="w-full">
        <input
          v-model="localProperties.question"
          type="text"
          placeholder="질문을 입력하세요"
          class="w-full text-sm border-0 border-b border-gray-200 focus:border-primary focus:ring-0 mb-2"
        />
        <div class="space-y-1">
          <div v-for="(option, index) in localProperties.options" :key="index" class="flex items-center">
            <input
              v-model="localProperties.options[index]"
              type="text"
              :placeholder="`선택지 ${index + 1}`"
              class="flex-1 text-xs border-0 border-b border-gray-100 focus:border-primary focus:ring-0"
            />
          </div>
        </div>
      </div>

      <!-- 주관식 -->
      <div v-else-if="module.type === '주관식'" class="w-full">
        <input
          v-model="localProperties.question"
          type="text"
          placeholder="질문을 입력하세요"
          class="w-full text-sm border-0 border-b border-gray-200 focus:border-primary focus:ring-0 mb-2"
        />
        <div class="border border-gray-200 rounded p-2 text-xs text-text-muted">
          답안 입력 영역
        </div>
      </div>

      <!-- 이미지표시 -->
      <div v-else-if="module.type === '이미지표시'" class="w-full">
        <div class="border-2 border-dashed border-gray-200 rounded p-4 text-center">
          <div class="text-2xl mb-2">🖼️</div>
          <div class="text-xs text-text-muted">이미지 업로드</div>
        </div>
      </div>

      <!-- 기타 모듈 -->
      <div v-else class="text-center text-text-muted">
        <div class="text-2xl mb-2">{{ getModuleIcon(module.type) }}</div>
        <div class="text-xs">{{ module.type }}</div>
      </div>
    </div>

    <!-- Properties Panel (선택 시 표시) -->
    <div v-if="showProperties" class="mt-4 pt-4 border-t border-gray-200">
      <div class="space-y-2">
        <label class="flex items-center text-xs">
          <input
            v-model="localModule.checkAnswer"
            type="checkbox"
            class="mr-2"
          />
          정답 확인
        </label>
        <div v-if="localModule.checkAnswer">
          <input
            v-model="localModule.answer"
            type="text"
            placeholder="정답을 입력하세요"
            class="w-full text-xs border border-gray-200 rounded px-2 py-1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import type { Module } from '@/types'
import { XMarkIcon } from '@heroicons/vue/24/outline'

interface Props {
  module: Module
}

interface Emits {
  (e: 'update', module: Module): void
  (e: 'delete', moduleId: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localModule = reactive({ ...props.module })
const localProperties = reactive(props.module.properties || {})
const showProperties = ref(false)

// Initialize default properties based on module type
if (props.module.type === '객관식' && !localProperties.options) {
  localProperties.options = ['', '', '', '']
  localProperties.question = ''
}

const moduleStyle = computed(() => ({
  left: `${localModule.position.x}px`,
  top: `${localModule.position.y}px`,
  width: `${localModule.size.width}px`,
  minHeight: `${localModule.size.height}px`
}))

const getModuleIcon = (type: string): string => {
  const icons: Record<string, string> = {
    '각도기': '📐',
    '자': '📏',
    '시계': '🕐',
    '선잇기': '✏️',
    '색칠하기': '🎨',
    '드래그앤드롭': '👆',
    '블록놀이': '🧩',
    '퍼즐': '🧩',
    '수식입력': '📝',
    '동영상': '🎥',
    '음성': '🔊'
  }
  return icons[type] || '📦'
}

const startDrag = (event: MouseEvent) => {
  const startX = event.clientX - localModule.position.x
  const startY = event.clientY - localModule.position.y

  const onMouseMove = (e: MouseEvent) => {
    localModule.position.x = e.clientX - startX
    localModule.position.y = e.clientY - startY
    emitUpdate()
  }

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

const emitUpdate = () => {
  const updatedModule: Module = {
    ...localModule,
    properties: { ...localProperties }
  }
  emit('update', updatedModule)
}

// Watch for changes and emit updates
watch([localModule, localProperties], emitUpdate, { deep: true })
</script>