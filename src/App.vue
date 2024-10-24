<script setup lang="ts">
import { RouterView } from 'vue-router'
import './index.css'
import HomeHeader from '@/components/HomeHeader.vue'
import { onMounted, ref } from 'vue'
import { loadEntities } from '@/state/entities'
import type { EntityApi } from '@/api/entity'
import ShowError from '@/components/ShowError.vue'

interface Props {
  apiLoader: EntityApi
}
const { apiLoader } = defineProps<Props>()

const errorMessage = ref('')
const errorHandler = (error: Error) => {
  errorMessage.value = error.message
  setTimeout(() => {
    errorMessage.value = ''
  }, 1000 * 5)
}

onMounted(() => {
  loadEntities(apiLoader, errorHandler)
})
</script>

<template>
  <HomeHeader/>
  <main class="mx-2 md:mx-4">
    <RouterView />
    <ShowError v-if="errorMessage" :error-message="errorMessage"/>
  </main>
</template>
