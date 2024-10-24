<script setup lang="ts">
console.log()
</script>

<template>
  <div class="w-full max-w-screen-xl min-w-[200px] mx-auto pb-1">
    <input
      class="search animation"
      type="text"
      placeholder="Найти ..."
      @input="$emit('searchValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<style scoped>
.search {
  @apply
    w-full
    bg-transparent
    placeholder:text-slate-400
    text-slate-700
    text-sm border
    border-slate-200
    rounded-md
    px-3
    py-2
}
.animation {
  @apply
    transition
    duration-300
    ease-in-out
    focus:outline-none
    focus:border-slate-400
    hover:border-slate-300
    shadow-sm
    focus:shadow
}
</style>
