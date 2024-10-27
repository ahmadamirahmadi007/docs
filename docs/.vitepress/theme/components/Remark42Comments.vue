<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useData } from "vitepress";

const remark42 = ref("");
const remark42Instance = ref("");
const route = useRoute();
const { isDark } = useData();

function initRemark42() {
  console.log("Initializing Remark42...");

  if (window.REMARK42 && !import.meta.env.SSR) {
    if (remark42Instance.value) {
      remark42Instance.value.destroy();
    }
    remark42Instance.value = window.REMARK42.createInstance({
      node: remark42.value,
      url: window.location.origin + route.path,
      ...window.remark_config,
    });
  }
}

function loadRemarkScript() {
  const existingScript = document.querySelector("script[src*='embed.js']");
  if (existingScript) existingScript.remove(); // Remove any existing script first

  const scriptTag = document.createElement("script");
  scriptTag.src = window.remark_config.host + "/web/embed.js";
  scriptTag.defer = true;
  document.body.appendChild(scriptTag);
}

onMounted(() => {
  window.remark_config = {
    host: "https://comment.docs.dev.virakcloud.net", // Update to your host
    site_id: "remark",
    theme: isDark.value ? "dark" : "light",
  };

  if (window.REMARK42) {
    initRemark42();
  } else {
    loadRemarkScript();
    window.addEventListener("REMARK42::ready", initRemark42);
  }
});

onUnmounted(() => {
  if (remark42Instance.value) {
    remark42Instance.value.destroy();
  }
});

watch(()=>route.path, initRemark42); // Reinitialize on route change

// Watch for theme changes, update remark_config, reload script, and reinitialize
watch(isDark, (newVal) => {
  nextTick(() => {
    window.remark_config.theme = newVal ? "dark" : "light";
    console.log("Theme updated in remark_config:", window.remark_config.theme);

    if (remark42Instance.value) {
      remark42Instance.value.destroy();
    }

    loadRemarkScript();
    window.addEventListener("REMARK42::ready", initRemark42);
  });
});
</script>

<template>
  <div id="remark42" ref="remark42"></div>
</template>


<!-- <template>
  <div id="remark42" ref="remark42"></div>
</template>
<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue"
import { useRoute, useData } from "vitepress"

// const uniquePageId = ref(null)
const remark42 = ref('')
const remark42Instance = ref('')
const route = useRoute()
const { isDark } = useData()



function initRemark42() {
  console.log('initRemark run');

  if (window.REMARK42 && !import.meta.env.SSR) {
    if (remark42Instance.value) {
      remark42Instance.value.destroy()
    }
    remark42Instance.value = window.REMARK42.createInstance({
      node: remark42.value,
      url: window.origin + route.path,
      ...window.remark_config  // See <https://github.com/patarapolw/remark42#setup-on-your-website>
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

watch([() => route.path], initRemark42)
watch(isDark, (newVal) => {
  nextTick( () => {
    window.remark_config = {
      theme: newVal ? 'dark' : 'light',
      ...window.remark_config,
      // secret: 'fooRai5w',
    };

    console.log('window.remark_config' , window.remark_config);

     initRemark42()
  })
})
</script> -->
