<script setup lang="ts">

import type { Entity } from '@/models/entity'

interface Props {
  allEntities: Entity[]
  filteredEntities: Entity[]
  isSearchActive: boolean
}

const { filteredEntities, allEntities } = defineProps<Props>()

defineEmits<{
  (e: 'deleteEntity', id: number): void
}>()

</script>
<template>
  <div class="min-w-40 relative container">
    <div v-if="allEntities.length === 0" class="flex flex-col justify-center gap-4">
      <p class="text-xl text-center my-2">Нет доступных элементов</p>
      <RouterLink to="/create" class="py-2 px-4 mx-auto bg-blue-200 hover:bg-blue-400 rounded-2xl">
        Создать новую запись
      </RouterLink>
    </div>
    <template v-else>
      <h1 class="w-full text-xl text-center my-2">Все элементы</h1>
      <div class="grid gap-4 lg:gap-8 lg:grid-cols-2">
        <div class="relative" :key="entity.id" v-for="entity in isSearchActive ? filteredEntities : allEntities">
          <div class="relative h-10 w-10 mx-auto flex justify-center items-center text-center bg-emerald-100 rounded-full">{{ entity.id }}</div>
          <h2 class="mb-4 text-center text-lg">{{ entity.title }}</h2>
          <div class="text-justify mb-2">{{ entity.description }}</div>
          <div class="mb-2">
            Опубликовано: <span v-if="entity.published">✅</span>
            <span v-else>❌</span></div>
          <div v-if="entity.published_from" class="mb-2">Дата публикации: {{ entity.published_from }}</div>
          <div class="inline-flex gap-2 m-2 items-center">
            <RouterLink class="btn bg-emerald-200 hover:bg-emerald-400 rounded-2xl" :to="`edit/${entity.id}`">Изменить
            </RouterLink>
            <button class="btn bg-red-200 hover:bg-red-400 rounded-2xl" @click="$emit('deleteEntity', entity.id)">
              Удалить
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.btn {
  @apply
  p-1
  md:p-2
  lg:px-4
  flex
  justify-center
  items-center
  text-xs
  sm:text-sm;
}
</style>
