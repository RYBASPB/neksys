<script setup lang="ts">

import type { Entity } from '@/models/entity'

interface Props {
  filteredEntities: Entity[]
}

const { filteredEntities } = defineProps<Props>()

defineEmits<{
  (e: 'deleteEntity', id: number): void
}>()

interface TableColumn {
  id: string
  name: string
  class?: string
}

const tableColumns: TableColumn[] = [
  {
    id: 'id',
    name: 'ID',
    class: 'p-2 hidden md:table-cell',
  },
  {
    id: 'title',
    name: 'Title',
    class: 'p-2 w-3/4 md:w-1/4',
  },
  {
    id: 'description',
    name: 'Description',
    class: 'p-2 hidden md:table-cell',
  },
  {
    id: 'published',
    name: 'Published',
    class: 'p-2 hidden md:table-cell',
  },
  {
    id: 'published_from',
    name: 'Published from',
    class: 'p-2 hidden md:table-cell',
  },
]

</script>
<template>
  <div class="min-w-40 relative container overflow-x-auto flex flex-col items-center">
    <template v-if="filteredEntities.length === 0">
      <p class="text-xl text-center my-2">Нет доступных элементов</p>
      <RouterLink to="/create" class="py-2 px-4 mx-auto bg-blue-200 hover:bg-blue-400 rounded-2xl">
        Создать новую запись
      </RouterLink>
    </template>
    <template v-else>
      <h1 class="w-full text-xl text-center my-2">Все элементы</h1>
      <table class="w-full table-auto overflow-auto">
        <thead>
        <tr>
          <th
            v-for="tc in tableColumns"
            :key="tc.id"
            :class="tc.class"
          >
            {{ tc.name }}
          </th>
          <th class="">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr
          :key="entity.id" v-for="entity in filteredEntities"
          class="[&>td]:text-center [&>td]:text-wrap"
        >
          <td class="hidden md:table-cell">{{ entity.id }}</td>
          <td>{{ entity.title }}</td>
          <td class="hidden md:table-cell">{{ entity.description.substring(0, 97) + '...' }}</td>
          <td class="hidden md:table-cell">
            <span v-if="entity.published">✅</span>
            <span v-else>❌</span>
          </td>
          <td class="hidden md:table-cell">{{ entity.published_from && entity.published_from.toLocaleString() }}</td>
          <td>
            <div class="inline-flex m-2">
              <RouterLink class="btn bg-emerald-200 hover:bg-emerald-400 rounded-l-2xl" :to="`edit/${entity.id}`">Edit
              </RouterLink>
              <button class="btn bg-red-200 hover:bg-red-400 rounded-r-2xl" @click="$emit('deleteEntity', entity.id)">
                Delete
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<style scoped>
.btn {
  @apply
    p-1
    md:p-2
    w-12
    sm:w-14
    flex
    justify-center
    items-center
    text-xs
    sm:text-sm;
}
</style>
