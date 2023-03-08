<template>
  <div class="main">
    <div class="cs-main">
      <header >
        <Topper></Topper>
      </header>
      <div class="cs-content">
        <aside class="cs-aside">
          <Aside></Aside>
        </aside>
        <article class="cs-article">
          
          <router-view/>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Aside from '@/components/Aside.vue'
import Topper from '@/components/Topper.vue'
import Bar from '@/components/Bar.vue'

export default {
  name: 'main',
  components: {
    Aside,
    Topper,
    Bar
  }
}
</script>

<style scoped>
  .cs-main {
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
  }
  .cs-content {
    display: flex;
    flex-flow: row nowrap;
    overflow: auto;
    width: 100%;
  }
  .cs-aside {
    min-width: 20rem;
  }
  .cs-article{
    box-sizing: border-box;
    width: 100%; 
    background:#F8F9FB;
    overflow: hidden;
  }
</style>