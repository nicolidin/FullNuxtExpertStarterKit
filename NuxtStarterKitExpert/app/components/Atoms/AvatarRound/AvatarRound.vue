<template>
  <!-- 2️⃣ Taille Fixe 300px -->
  <nuxt-img
    alt="nicolas_picture_profil"
    :src="props.imgPath"
    class="circle"
    width="300"
    height="300"
    sizes="300px"
  ></nuxt-img>
  <!--  size 300 because if ~100px amplify change the size -->
</template>

<script setup lang="ts">
const props = defineProps<{
  imgPath: string;
}>();
</script>

<style scoped lang="scss">
.circle {
  --circle-size: 100px;
  width: var(--circle-size);
  height: var(--circle-size);
  border-radius: 50%;
}
</style>
