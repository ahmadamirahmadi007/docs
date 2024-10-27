<!-- .vitepress/theme/Layout.vue -->
<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide, onMounted, watch } from 'vue'
import mediumZoom from 'medium-zoom';


const { isDark } = useData()


const router = useRoute()

const applyZoom = () => {
  mediumZoom('[data-zoomable]', {
    background: 'rgba(0,0,0, 0.8)',
    margin: 20
  });
};

// const remark_config = computed(()=>{
//     return {
//      host: "https://comment.docs.dev.virakcloud.net",
//       theme : isDark.value,
//         // secret: 'fooRai5w',
//         site_id: 'remark'
//     }
// })

onMounted(() => {
  // console.log('create script run');
  // init comment
  // (function () {

  // window.remark_config = {
  //   host: "https://comment.docs.dev.virakcloud.net",
  //   theme: isDark.value ? 'dark' : 'light',
  //   // secret: 'fooRai5w',
  //   site_id: 'remark'
  // };

  // // var host = 'http://85.9.104.13:8080' // Your remark42 host
  // // var components = ['embed']; // Your choice of remark42 components

  // (function (c) {
  //   for (let i = 0; i < c.length; i++) {
  //     const d = document
  //     const s = d.createElement('script')
  //     s.src = remark_config.host + '/web/' + c[i] + '.js'
  //     s.defer = true
  //       ; (d.head || d.body).appendChild(s)
  //   }
  // })([['embed']])
  // })

  applyZoom();
});

watch([() => isDark.value, () => router.path], () => {
  nextTick(() => {
    applyZoom();
  })
});

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})

</script>
<template>
  <DefaultTheme.Layout />
  <Teleport to="#VPContent .content-container">
    <CommentBox id="remark42"></CommentBox>
  </Teleport>
</template>
<style>
#remark42 {
  margin-top: 30px;
}

.root__copyright {
  display: none;
}

/* ============= Transition dark/light Mode ============= */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

:where([dir="ltr"]) {
  .VPSwitchAppearance {
    margin-left: 0.5rem;
  }
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>
