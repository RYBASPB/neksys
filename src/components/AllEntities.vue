<script setup lang="ts">

import { allEntities } from '@/state/entities'

const emit = defineEmits<{
  deleteEntity: [id: number]
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
  },
  {
    id: 'title',
    name: 'Title',
  },
  {
    id: 'description',
    name: 'Description',
  },
  {
    id: 'published',
    name: 'Published',
  },
  {
    id: 'published_from',
    name: 'Published from',
  },
]

const handleDelete = (id: number) => {
  emit('deleteEntity', id)
}
</script>
<template>
  <div class="min-w-40 container overflow-auto flex flex-col items-center">
    <h1 class="text-xl text-center my-2">Все элементы</h1>
    <table class="table-auto">
      <thead>
      <tr>
        <th
          v-for="tc in tableColumns"
          :key="tc.id"
        >
          {{ tc.name }}
        </th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr :key="entity.id" v-for="entity in Array.from(allEntities.values())">
        <td>{{ entity.id }}</td>
        <td>{{ entity.title }}</td>
        <td>{{ entity.description.substring(0, 100) }}</td>
        <td>
          <span v-if="entity.published">✅</span>
          <span v-else>❌</span>
        </td>
        <td>{{ entity.published_from && entity.published_from.toLocaleString() }}</td>
        <td>
          <RouterLink :to="`edit/${entity.id}`">Edit</RouterLink>
          <button @click="handleDelete(entity.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
