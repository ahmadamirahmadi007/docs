<template>
  <div id="remark42" ref="remark42"></div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, before } from "vue"
import { useRoute } from "vitepress"

// const uniquePageId = ref(null)
const remark42 = ref('')
const remark42Instance = ref('')
const route = useRoute()



function initRemark42() {
  if (window.REMARK42) {
    if (remark42Instance.value) {
      remark42Instance.value.destroy()
    }
    remark42Instance.value = window.REMARK42.createInstance({
      node: remark42.value as HTMLElement,
      ...window.remark42_config  // See <https://github.com/patarapolw/remark42#setup-on-your-website>
    })
  }
}

onMounted(() => {
  // uniquePageId.value = `remark42__comment-${route.path}`;
  if (window.REMARK42) {
    initRemark42()
  } else {
    window.addEventListener('REMARK42::ready', () => {
      initRemark42()
    })
  }

  // Initialize Remark42 with the unique page ID
  // window.remark_config = {
  //   // loaders: [
  //   // {
  //   // id: uniquePageId.value,
  //   // src: "http://85.9.104.13:8080/web/",
  //   host: "http://85.9.104.13:8080",
  //   // secret: 'fooRai5w',
  //   site_id: 'remark',
  //   // }
  //   // ]
  // };

  // !function (e, n) { for (var o = 0; o < e.length; o++) { var r = n.createElement("script"), c = ".js", d = n.head || n.body; "noModule" in r ? (r.type = "module", c = ".mjs") : r.async = !0, r.defer = !0, r.src = remark_config.host + "/web/" + e[o] + c, d.appendChild(r) } }(remark_config.components || ["embed"], document);

  // Load Remark42 comments
  // const scriptTag = document.createElement("script");
  // scriptTag.setAttribute("src", "http://85.9.104.13:8080/web/embed.js");
  // document.body.appendChild(scriptTag);
})

onUnmounted(() => {
  if (remark42Instance.value) {
    remark42Instance.value.destroy()
  }
})

watch(() => route.path, initRemark42)
</script>
