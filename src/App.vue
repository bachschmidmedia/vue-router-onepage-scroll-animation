<template lang="pug">
  #app
    #nav
      router-link(to="/") Home 
      router-link(to="/page2") P2 
      router-link(to="/page3") P3 
      router-link(to="/page4") P4 
    transition(name="slide" mode="out-in")
      router-view
</template>

<style lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: 0.75s ease-out;
}

.slide-leave-to {
  transform: translateY(-100%);
}
.slide-leave-from {
  transform: translateY(0%);
}

.slide-enter-active {
  transform: translateY(100%);
}

.slide-enter-to {
  transform: translateY(0%);
}



html,body {
  padding: 0;
  margin: 0;
}

main {
  padding: 50px 25px;
  font: 18px helvetica;
  height: 100vh;
  width: 100vw;
}

#nav {
  position: fixed;
  top: 0;
  z-index: 9;
}

</style>
