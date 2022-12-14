<template>
  <li class="nav-item">
    <a href="#" class="nav-link text-light">
      <i :class="icon"></i>
      <p>
        {{ title }}
        <i class="right fas fa-angle-left"></i>
      </p>
    </a>
    <ul class="nav nav-treeview">
      <menu-item
        v-for="item in items"
        v-show="authorities.includes(item.authority)"
        :key="item.link"
        :text="item.text"
        :icon="item.icon"
        :link="item.link"
      />
    </ul>
  </li>
</template>

<script>
import MenuItem from "./MenuItem";
import store from "../../../../modules/users/store";

export default {
  name: "MenuList",
  props: ["title", "items", "icon"],
  components: { MenuItem },
  data() {
    return {
      authorities: store.state.authorities,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
