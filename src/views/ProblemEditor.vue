<template>
  <div class="min-h-screen bg-surface">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <button
              @click="$router.push('/problems')"
              class="p-2 text-text-muted hover:text-text-primary transition-colors"
            >
              <ArrowLeftIcon class="w-5 h-5" />
            </button>
            <h1 class="text-xl font-semibold text-text-primary">
              {{ isEdit ? '문제 편집' : '새 문제 만들기' }}
            </h1>
          </div>
          <div class="flex items-center space-x-3">
            <span class="text-sm text-text-muted">자동 저장됨</span>
            <button
              @click="previewProblem"
              class="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors"
            >
              미리보기
            </button>
            <button
              @click="saveProblem"
              class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="flex h-[calc(100vh-4rem)]">
      <!-- Module Palette -->
      <div class="w-80 bg-white border-r overflow-y-auto">
        <div class="p-4">
          <h2 class="text-lg font-semibold text-text-primary mb-4">모듈 팔레트</h2>
          
          <!-- Module Categories -->
          <div class="space-y-4">
            <div>
              <h3 class="text-sm font-medium text-text-secondary mb-2">답안 입력</h3>
              <div class="grid grid-cols-2 gap-2">
                <ModulePaletteItem
                  v-for="module in answerModules"
                  :key="module.type"
                  :module="module"
                  @drag-start="onModuleDragStart"
                />
              </div>
            </div>

            <div>
              <h3 class="text-sm font-medium text-text-secondary mb-2">도구</h3>
              <div class="grid grid-cols-2 gap-2">
                <ModulePaletteItem
                  v-for="module in toolModules"
                  :key="module.type"
                  :module="module"
                  @drag-start="onModuleDragStart"
                />
              </div>
            </div>

            <div>
              <h3 class="text-sm font-medium text-text-secondary mb-2">미디어</h3>
              <div class="grid grid-cols-2 gap-2">
                <ModulePaletteItem
                  v-for="module in mediaModules"
                  :key="module.type"
                  :module="module"
                  @drag-start="onModuleDragStart"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Work Canvas -->
      <div class="flex-1 flex flex-col">
        <!-- Problem Info Form -->
        <div class="bg-white border-b p-4">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-text-secondary mb-1">문제 제목</label>
              <input
                v-model="problemForm.title"
                type="text"
                placeholder="문제 제목을 입력하세요"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1">학년</label>
              <select
                v-model="problemForm.grade"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option v-for="grade in [1, 2, 3, 4, 5, 6]" :key="grade" :value="grade">
                  {{ grade }}학년
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1">과목</label>
              <select
                v-model="problemForm.subject"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option v-for="subject in subjects" :key="subject" :value="subject">
                  {{ subject }}
                </option>
              </select>
            </div>
          </div>
          
          <div class="mt-4">
            <label class="block text-sm font-medium text-text-secondary mb-1">문제 내용</label>
            <textarea
              v-model="problemForm.question"
              rows="3"
              placeholder="문제 내용을 입력하세요"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>
        </div>

        <!-- Canvas Area -->
        <div
          class="flex-1 p-4 relative overflow-auto"
          @drop="onCanvasDrop"
          @dragover="onCanvasDragOver"
        >
          <div class="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-200 min-h-full p-8 relative">
            <div
              v-if="problemForm.modules.length === 0"
              class="absolute inset-0 flex items-center justify-center text-text-muted"
            >
              <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-4">
                  <CubeIcon class="w-full h-full" />
                </div>
                <p>왼쪽 팔레트에서 모듈을 드래그해서 추가하세요</p>
              </div>
            </div>

            <!-- Modules -->
            <ModuleComponent
              v-for="module in problemForm.modules"
              :key="module.id"
              :module="module"
              @update="updateModule"
              @delete="deleteModule"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProblemsStore } from '@/stores/problems'
import type { Problem, Module, ModuleType, Subject } from '@/types'
import { ArrowLeftIcon, CubeIcon } from '@heroicons/vue/24/outline'
import ModulePaletteItem from '@/components/editor/ModulePaletteItem.vue'
import ModuleComponent from '@/components/editor/ModuleComponent.vue'

const route = useRoute()
const router = useRouter()
const problemsStore = useProblemsStore()

const isEdit = computed(() => route.name === 'problem-edit')
const subjects: Subject[] = ['수학', '국어', '과학', '사회']

// Form data
const problemForm = ref<Problem>({
  id: '',
  title: '',
  question: '',
  grade: 1,
  subject: '수학',
  modules: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  tags: [],
  difficulty: 'medium'
})

// Module palette data
const answerModules = [
  { type: '객관식' as ModuleType, icon: '📝', name: '객관식' },
  { type: '주관식' as ModuleType, icon: '✏️', name: '주관식' },
  { type: '서술형' as ModuleType, icon: '📋', name: '서술형' }
]

const toolModules = [
  { type: '각도기' as ModuleType, icon: '📐', name: '각도기' },
  { type: '자' as ModuleType, icon: '📏', name: '자' },
  { type: '시계' as ModuleType, icon: '🕐', name: '시계' }
]

const mediaModules = [
  { type: '이미지표시' as ModuleType, icon: '🖼️', name: '이미지' },
  { type: '동영상' as ModuleType, icon: '🎥', name: '동영상' },
  { type: '음성' as ModuleType, icon: '🔊', name: '음성' }
]

// Drag and Drop
const onModuleDragStart = (moduleType: ModuleType) => {
  // Store the module type for drop handling
  window.draggedModuleType = moduleType
}

const onCanvasDragOver = (event: DragEvent) => {
  event.preventDefault()
}

const onCanvasDrop = (event: DragEvent) => {
  event.preventDefault()
  
  const moduleType = window.draggedModuleType as ModuleType
  if (!moduleType) return

  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const newModule: Module = {
    id: `module_${Date.now()}`,
    type: moduleType,
    position: { x, y },
    size: { width: 200, height: 100 },
    checkAnswer: false,
    properties: {}
  }

  problemForm.value.modules.push(newModule)
}

const updateModule = (updatedModule: Module) => {
  const index = problemForm.value.modules.findIndex(m => m.id === updatedModule.id)
  if (index !== -1) {
    problemForm.value.modules[index] = updatedModule
  }
}

const deleteModule = (moduleId: string) => {
  const index = problemForm.value.modules.findIndex(m => m.id === moduleId)
  if (index !== -1) {
    problemForm.value.modules.splice(index, 1)
  }
}

const saveProblem = () => {
  problemForm.value.updatedAt = new Date()
  
  if (isEdit.value) {
    problemsStore.updateProblem(problemForm.value)
  } else {
    problemForm.value.id = `prob_${Date.now()}`
    problemForm.value.createdAt = new Date()
    problemsStore.addProblem(problemForm.value)
  }
  
  router.push('/problems')
}

const previewProblem = () => {
  // Save current state first
  saveProblem()
  router.push(`/problems/${problemForm.value.id}/preview`)
}

// Initialize form data
onMounted(() => {
  if (isEdit.value) {
    const problemId = route.params.id as string
    const existingProblem = problemsStore.getProblemById(problemId)
    
    if (existingProblem) {
      problemForm.value = { ...existingProblem }
    } else {
      router.push('/problems')
    }
  }
})

// Global type declaration for drag and drop
declare global {
  interface Window {
    draggedModuleType: ModuleType
  }
}
</script>