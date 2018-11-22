<template>
  <div class="branchmain">
    <!-- 左右布局，左边为所有门店，右侧为门店详细信息 -->
    <el-card>
      <ul>
        <li>
          <div>{{item.code}}</div>
          <div>{{item.name}}</div>
        </li>
      </ul>
    </el-card>
    <el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'branchedit',
  data() {
    return {
      s: '',
      branchlist: []
    }
  }
}
</script>
