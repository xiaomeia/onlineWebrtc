<template>
  <div>
    <svg-icon icon-class="question" @click="goto" />
  </div>
</template>

<script setup>
const url = ref('http://www.niyaowo.com');

function goto() {
  window.open(url.value)
}
</script>