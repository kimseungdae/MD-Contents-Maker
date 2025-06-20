<template>
  <div class="min-h-screen bg-surface">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-text-primary">MD Contents Maker</h1>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="$router.push('/problems/new')"
              class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
            >
              <PlusIcon class="w-5 h-5 mr-2" />
              새 문제 만들기
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search and Filters -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Search -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-text-secondary mb-2">검색</label>
            <div class="relative">
              <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="문제 제목이나 내용을 검색하세요..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <!-- Grade Filter -->
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-2">학년</label>
            <select
              v-model="selectedGrade"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option :value="null">모든 학년</option>
              <option v-for="grade in [1, 2, 3, 4, 5, 6]" :key="grade" :value="grade">
                {{ grade }}학년
              </option>
            </select>
          </div>

          <!-- Subject Filter -->
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-2">과목</label>
            <select
              v-model="selectedSubject"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option :value="null">모든 과목</option>
              <option v-for="subject in subjects" :key="subject" :value="subject">
                {{ subject }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex justify-between items-center mt-4">
          <div class="text-sm text-text-secondary">
            총 {{ filteredProblems.length }}개의 문제
          </div>
          <button
            v-if="hasActiveFilters"
            @click="clearFilters"
            class="text-sm text-primary hover:text-blue-600"
          >
            필터 초기화
          </button>
        </div>
      </div>

      <!-- Problems Grid -->
      <div v-if="filteredProblems.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="problem in filteredProblems"
          :key="problem.id"
          class="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
          @click="$router.push(`/problems/${problem.id}/edit`)"
        >
          <div class="p-6">
            <div class="flex justify-between items-start mb-3">
              <h3 class="text-lg font-semibold text-text-primary line-clamp-2">
                {{ problem.title }}
              </h3>
              <div class="flex space-x-1">
                <button
                  @click.stop="$router.push(`/problems/${problem.id}/preview`)"
                  class="p-2 text-text-muted hover:text-primary transition-colors"
                  title="미리보기"
                >
                  <EyeIcon class="w-4 h-4" />
                </button>
                <button
                  @click.stop="deleteProblem(problem.id)"
                  class="p-2 text-text-muted hover:text-danger transition-colors"
                  title="삭제"
                >
                  <TrashIcon class="w-4 h-4" />
                </button>
              </div>
            </div>

            <p class="text-text-secondary text-sm mb-4 line-clamp-3">
              {{ problem.question }}
            </p>

            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                {{ problem.grade }}학년
              </span>
              <span class="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                {{ problem.subject }}
              </span>
              <span class="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                {{ getDifficultyLabel(problem.difficulty) }}
              </span>
            </div>

            <div class="flex justify-between items-center text-xs text-text-muted">
              <span>{{ formatDate(problem.updatedAt) }}</span>
              <span>모듈 {{ problem.modules.length }}개</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="w-24 h-24 mx-auto mb-4 text-text-muted">
          <DocumentIcon class="w-full h-full" />
        </div>
        <h3 class="text-lg font-medium text-text-primary mb-2">
          {{ searchQuery || hasActiveFilters ? '검색 결과가 없습니다' : '아직 문제가 없습니다' }}
        </h3>
        <p class="text-text-secondary mb-6">
          {{ searchQuery || hasActiveFilters 
            ? '다른 검색어나 필터를 시도해보세요.' 
            : '첫 번째 학습 문제를 만들어보세요!' 
          }}
        </p>
        <button
          v-if="!searchQuery && !hasActiveFilters"
          @click="$router.push('/problems/new')"
          class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          첫 문제 만들기
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useProblemsStore } from '@/stores/problems'
import type { Subject, Difficulty } from '@/types'
import {
  PlusIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  TrashIcon,
  DocumentIcon
} from '@heroicons/vue/24/outline'

const problemsStore = useProblemsStore()
const {
  filteredProblems,
  searchQuery,
  selectedGrade,
  selectedSubject
} = storeToRefs(problemsStore)

const subjects: Subject[] = ['수학', '국어', '과학', '사회']

const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedGrade.value || selectedSubject.value
})

const getDifficultyLabel = (difficulty: Difficulty): string => {
  const labels = {
    easy: '쉬움',
    medium: '보통',
    hard: '어려움'
  }
  return labels[difficulty]
}

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

const { clearFilters, deleteProblem } = problemsStore
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>