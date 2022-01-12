<template lang="pug">
#nav
  router-link(:to="{ name: 'Home' }") Home 
  router-link(:to="{ name: 'Page2' }") P2
  router-link(:to="{ name: 'Page3' }") P3
  router-link(:to="{ name: 'Page4' }") P4
</template>
