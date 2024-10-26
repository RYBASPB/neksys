<script setup lang="ts">
import { allEntities } from '@/state/entities'
import SearchByTitle from '@/components/SearchByTitle.vue'
import { computed, defineAsyncComponent, ref } from 'vue'
import type { Entity } from '@/models/entity'
import DeletePopup from '@/components/EntityDelete/DeletePopup.vue'
import { isTableView } from '@/state/ui'
import EntitiesLoading from '@/components/EntitiesList/EntitiesLoading.vue'

const AllEntitiesTable = defineAsyncComponent({
  loader: () => import('@/components/EntitiesList/AllEntitiesTable.vue'),
  delay: 200,
  loadingComponent: EntitiesLoading,
})
const AllEntitiesGrid = defineAsyncComponent({
  loader: () => import('@/components/EntitiesList/AllEntitiesGrid.vue'),
  delay: 200,
  loadingComponent: EntitiesLoading,
})

const searchValue = ref<string>('')
const allEntitiesArray = ref(Array.from(allEntities.value.values()))
const filteredEntities = computed(() => {
  return allEntitiesArray.value.filter(entity => entity.title.toLowerCase().includes(searchValue.value.toLowerCase()))
})
const isSearchActive = ref<boolean>(false)

const showDeletePopup = ref<boolean>(false)
const entityToDelete = ref<number>()

const handleSearch = (value: string) => {
  searchValue.value = value
  if (value) {
    isSearchActive.value = true
    return
  }
  isSearchActive.value = false
}

const handleDelete = (id: number) => {
  showDeletePopup.value = true
  entityToDelete.value = id
}

const closePopup = () => {
  showDeletePopup.value = false
  entityToDelete.value = NaN
}

const deleteEntity = () => {
  if (entityToDelete.value) {
    allEntities.value.delete(entityToDelete.value)
    // TODO API: Delete
    entityToDelete.value = NaN
    allEntitiesArray.value = Array.from(allEntities.value.values())
    closePopup()
    return
  }
  alert('Entity doesn\'t exist')
  closePopup()
}
</script>

<template>
  <div class="sticky top-16 bg-white z-20">
    <SearchByTitle @searchValue="handleSearch"/>
  </div>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <div
      v-if="isSearchActive && searchValue.length > 0 && filteredEntities.length === 0"
      class="min-w-40 container overflow-auto flex flex-col items-center"
    >
      Ничего не найдено
    </div>
    <AllEntitiesTable
      v-else-if="isTableView"
      @deleteEntity="handleDelete"
      :allEntities="allEntitiesArray"
      :filteredEntities="filteredEntities"
      :isSearchActive="isSearchActive"
    />
    <AllEntitiesGrid
      v-else
      @deleteEntity="handleDelete"
      :filteredEntities="filteredEntities"
      :isSearchActive="isSearchActive"
    />
  </div>
  <DeletePopup v-if="showDeletePopup" @confirm="deleteEntity" @cancel="closePopup"/>
</template>
