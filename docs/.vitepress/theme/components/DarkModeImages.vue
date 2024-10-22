<template>
  <div>
    <div v-if="isDark">
      <img width="100%" height="auto" data-zoomable :src="darkSrc" :alt="alt" />
    </div>
    <div v-else>
      <img data-zoomable :src="lightSrc" :alt="alt" />
    </div>
  </div>
</template>

<script setup>
import mediumZoom from 'medium-zoom';
import {nextTick, onMounted,watch} from "vue"
import { useData } from 'vitepress'
const { isDark } = useData()

defineProps({
  darkSrc: String,
  lightSrc: String,
  alt: String
})

const applyZoom = () => {
  mediumZoom('[data-zoomable]', {
    background: isDark.value ? 'rgba(0,0,0, 0.8)' : 'rgba(255,255,255 , 0.8)',
    margin : 20
  });
};

onMounted(() => {
  applyZoom();
});

watch(isDark, () => {
  nextTick(()=>{
    applyZoom();
  })
});
</script>
