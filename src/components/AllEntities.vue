<script setup lang="ts">
import type { Entity } from '@/models/entity'

const { entities } = defineProps<{ entities: Entity[] }>()

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
</script>
<template>
  <div class="container overflow-auto">
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
      <tr :key="entity.id" v-for="entity in entities">
        <td>{{ entity.id }}</td>
        <td>{{ entity.title }}</td>
        <td>{{ entity.description.substring(0, 100) }}</td>
        <td>
          <span v-if="entity.published">✅</span>
          <span v-else>❌</span>
        </td>
        <td>{{ entity.published_from!.toLocaleString() }}</td>
        <td>
          <button>Edit</button>
          <button>Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
