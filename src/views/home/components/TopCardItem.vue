<template>
  <div class="col-12 col-sm-6 col-md-3">
    <div class="info-box">
      <span :class="'info-box-icon  elevation-1 '+type"
        ><i :class="icon"></i
      ></span>

      <div class="info-box-content">
        <span class="info-box-text">{{ label}}</span>
        <span class="info-box-number"> MT {{ amount }} </span>
      </div>
      <!-- /.info-box-content -->
    </div>
    <!-- /.info-box -->
  </div>
</template>

<script>
export default {
    name: 'TopCardItem',
    props: ['type', 'amount', 'label', 'icon'],
 
}
</script>