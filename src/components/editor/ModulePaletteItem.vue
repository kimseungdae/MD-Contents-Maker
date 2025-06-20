<template>
  <div
    class="p-3 border border-gray-200 rounded-lg cursor-grab hover:border-primary hover:bg-primary/5 transition-colors"
    draggable="true"
    @dragstart="onDragStart"
  >
    <div class="text-center">
      <div class="text-2xl mb-1">{{ module.icon }}</div>
      <div class="text-xs font-medium text-text-secondary">{{ module.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ModuleType } from '@/types'

interface Props {
  module: {
    type: ModuleType
    icon: string
    name: string
  }
}

interface Emits {
  (e: 'drag-start', moduleType: ModuleType): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const onDragStart = () => {
  emit('drag-start', props.module.type)
}
</script>