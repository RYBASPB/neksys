<script setup lang="ts">
import { isTableView } from '@/state/ui'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header class="sticky top-0 m-0 h-16 pt-4 pb-2 z-10 bg-white rounded-b-2xl">
    <div class="h-full max-w-screen-xl mx-2 md:mx-4 xl:mx-auto flex flex-col justify-center z-20 border-2 rounded-2xl bg-emerald-50">
      <nav class="flex items-center justify-center gap-4 md:gap-8">
        <RouterLink to="/" class="underline-offset-4 hover:underline">На главную</RouterLink>
        <RouterLink to="/create" class="underline-offset-4 hover:underline">Создать</RouterLink>
        <button
          v-if="route.name === 'home'"
          class="underline-offset-4 hover:underline"
          @click="isTableView = !isTableView"
        >Вид: {{ isTableView ? 'Таблица' : 'Сетка' }}</button>
      </nav>
    </div>
  </header>
</template>
