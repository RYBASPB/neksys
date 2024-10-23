<script setup lang="ts">
import { onMounted, ref } from 'vue'

import AllEntities from '@/components/AllEntities.vue'
import type { EntityApi } from '@/api/entity'
import ShowError from '@/components/ShowError.vue'

// Передаю с props класс для работы с api
interface Props {
  apiLoader: EntityApi
}
const { apiLoader } = defineProps<Props>()

const allEntities = ref()
const errorMessage = ref('')

const loadEntities = async () => {
  allEntities.value = await apiLoader
    .getAll()
    .catch(errorHandler)
}

const errorHandler = (error: Error) => {
  errorMessage.value = error.message
  setTimeout(() => {
    errorMessage.value = ''
  }, 1000 * 5)
}

onMounted(() => {
  loadEntities()
})

</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <AllEntities :entities="allEntities"/>
  </div>
  <ShowError v-if="errorMessage" :error-message="errorMessage"/>
</template>
