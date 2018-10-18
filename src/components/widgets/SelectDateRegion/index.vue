<template>
  <div class="dialog">
    <div class="mask"></div>
    <div class="dialog-content">
        <h3 class="title">{{ modal.title }}</h3>
        <p class="text">{{ modal.text }}</p>
        <div class="btn-group">
            <div class="btn" @click="cancel">{{ modal.cancelButtonText }}</div>
            <div class="btn" @click="submit">{{ modal.confirmButtonText }}</div>
        </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'dialog',
  props: {
    dialogOption: Object
  },
  data() {
    return {
      resolve: '',
      reject: '',
      promise: '', // 保存promise对象
    }
  }
}
</script>