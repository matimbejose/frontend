<template>
  <div role="button" :class="'info-box mb-3 '+type">
    <span class="info-box-icon"
      ><i :class="icon"></i
    ></span>

    <div class="info-box-content">
      <span class="info-box-text">{{ label }}</span>
      <span class="info-box-number">{{ amount }}</span>
    </div>
    <!-- /.info-box-content -->
  </div>
</template>

<script>
export default {
  name: "SideCardItem",
  props: ["type", "amount", "label", 'icon'],
};
</script>