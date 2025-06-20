import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Problem, Grade, Subject, Difficulty } from '@/types'
import { sampleProblems } from '@/utils/sampleData'

export const useProblemsStore = defineStore('problems', () => {
  const problems = ref<Problem[]>(sampleProblems)
  const currentProblem = ref<Problem | null>(null)
  
  // Filters
  const searchQuery = ref('')
  const selectedGrade = ref<Grade | null>(null)
  const selectedSubject = ref<Subject | null>(null)
  const selectedDifficulty = ref<Difficulty | null>(null)
  const selectedTags = ref<string[]>([])

  // Computed
  const filteredProblems = computed(() => {
    return problems.value.filter(problem => {
      const matchesSearch = !searchQuery.value || 
        problem.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        problem.question.toLowerCase().includes(searchQuery.value.toLowerCase())
      
      const matchesGrade = !selectedGrade.value || problem.grade === selectedGrade.value
      const matchesSubject = !selectedSubject.value || problem.subject === selectedSubject.value
      const matchesDifficulty = !selectedDifficulty.value || problem.difficulty === selectedDifficulty.value
      const matchesTags = selectedTags.value.length === 0 || 
        selectedTags.value.some(tag => problem.tags.includes(tag))

      return matchesSearch && matchesGrade && matchesSubject && matchesDifficulty && matchesTags
    })
  })

  const allTags = computed(() => {
    const tags = new Set<string>()
    problems.value.forEach(problem => {
      problem.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags)
  })

  // Actions
  const addProblem = (problem: Problem) => {
    problems.value.push(problem)
  }

  const updateProblem = (updatedProblem: Problem) => {
    const index = problems.value.findIndex(p => p.id === updatedProblem.id)
    if (index !== -1) {
      problems.value[index] = updatedProblem
    }
  }

  const deleteProblem = (problemId: string) => {
    const index = problems.value.findIndex(p => p.id === problemId)
    if (index !== -1) {
      problems.value.splice(index, 1)
    }
  }

  const getProblemById = (id: string): Problem | undefined => {
    return problems.value.find(p => p.id === id)
  }

  const setCurrentProblem = (problem: Problem | null) => {
    currentProblem.value = problem
  }

  const clearFilters = () => {
    searchQuery.value = ''
    selectedGrade.value = null
    selectedSubject.value = null
    selectedDifficulty.value = null
    selectedTags.value = []
  }

  return {
    // State
    problems,
    currentProblem,
    searchQuery,
    selectedGrade,
    selectedSubject,
    selectedDifficulty,
    selectedTags,
    
    // Computed
    filteredProblems,
    allTags,
    
    // Actions
    addProblem,
    updateProblem,
    deleteProblem,
    getProblemById,
    setCurrentProblem,
    clearFilters
  }
})