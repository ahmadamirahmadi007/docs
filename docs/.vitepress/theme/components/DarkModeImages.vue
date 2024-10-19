<template>
  <div>
    <div v-if="isDark">
      <img :src="darkSrc" :alt="alt" />
    </div>
    <div v-else>
      <img :src="lightSrc" :alt="alt" />
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
const { isDark } = useData()

defineProps({
  darkSrc: String,
  lightSrc: String,
  alt: String
})
</script>
