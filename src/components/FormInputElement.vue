<script setup lang="ts">
interface Props {
  label: string
  errors?: string | undefined
}

const { label, errors } = defineProps<Props>()

</script>

<template>
  <div class="w-full max-w-screen-xl min-w-[200px]">
    <label class="block mb-2 text-sm text-slate-600">
      {{ label }}
    </label>
    <slot name="input" />
    <p v-if="errors" class="text-red-500 text-xs italic">{{ errors }}</p>
  </div>
</template>

<style scoped>

</style>
