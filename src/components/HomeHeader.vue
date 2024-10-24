<script setup lang="ts">

</script>

<template>
  <header class="sticky top-0 m-0 h-16 pt-4 pb-2 bg-white opacity-95 rounded-b-2xl">
    <div class="h-full max-w-screen-xl mx-2 md:mx-4 xl:mx-auto flex flex-col justify-center border-2 rounded-2xl">
      <nav class="flex items-center justify-center gap-4">
        <RouterLink to="/" class="underline-offset-4 hover:underline">Home</RouterLink>
        <RouterLink to="/create" class="underline-offset-4 hover:underline">Создать</RouterLink>
      </nav>
    </div>
  </header>
</template>
