<script setup lang="ts">
interface Props {
  errorMessage: string
}
const { errorMessage } = defineProps<Props>()
</script>

<template>
  <div class="sticky bottom-8 mx-8">
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      Ошибка: <strong class="font-bold">{{ errorMessage }}</strong>
    </div>
  </div>
</template>
