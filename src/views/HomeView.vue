<script setup lang="ts">
import AllEntities from '@/components/AllEntities.vue'
import { allEntities } from '@/state/entities'
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <AllEntities @deleteEntity="id => allEntities.delete(id)"/>
  </div>
</template>
