<script setup lang="ts">

</script>

<template>
  <header class="sticky top-0 bg-white m-0 h-16 pt-4 pb-2 rounded-b-2xl">
    <div class="h-full mx-2 md:mx-8 flex flex-col justify-center border-2 rounded-2xl">
      <nav class="flex items-center justify-center gap-4">
        <RouterLink to="/" class="underline-offset-4 hover:underline">Home</RouterLink>
        <RouterLink to="/create" class="underline-offset-4 hover:underline">Создать</RouterLink>
      </nav>
    </div>
  </header>
</template>
