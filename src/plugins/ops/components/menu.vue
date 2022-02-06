<template lang="pug">
.ops__menu
  router-link.link(
    v-for="page in pages"
    :to="{ name: page }"
    :title="page"
  )
    .bobble
</template>

<script>
export default {
  props: {
    pages: {
      type: Array,
      require: true,
    },
  },

  mounted() {
    console.log(this.$route);
  },
};
</script>

<style lang="scss">
.ops__menu {
  z-index: 2;
  position: fixed;
  right: 6px;
  top: 0;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  justify-content: center;
  align-self: center;
  height: 100vh;
  padding: 0;

  &:hover {
    .link.router-link-active:not(:hover) .bobble {
      transform: scale(1);
    }
  }

  .link {
    padding: 6px 6px;
    .bobble {
      background: black;
      width: 14px;
      height: 14px;
      border-radius: 100%;
      overflow: hidden;
      opacity: 0.7;
      transition: 200ms;
    }

    &:hover {
      .bobble {
        transform: scale(1.2);
        opacity: 1;
      }
    }

    &.router-link-active {
      .bobble {
        opacity: 1;
        transform: scale(1.2);
      }
    }
  }
}
</style>
