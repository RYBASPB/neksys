<script setup lang="ts">
import { RouterView } from 'vue-router'
import './index.css'
import HomeHeader from '@/components/HomeHeader.vue'
</script>

<template>
  <HomeHeader/>
  <main>
    <RouterView />
  </main>
</template>
