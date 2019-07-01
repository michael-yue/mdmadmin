<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">{{ name }}</div> -->
    <!-- <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div> -->
    <div v-show="roles.includes('branch')">
      <section class="wx">
        <span>微信</span>
        <ul>
          <li @click="goLink('/wx/wxUpdateProduct')"><span>微信产品</span></li>
          <li @click="goLink('/wx/wxOrderList')"><span>微信订单</span></li>
        </ul>
      </section>
      <section class="mt">
        <span>美团</span>
        <ul>
          <li @click="goLink('/mt/mtUpdateProduct')"><span>美团产品</span></li>
          <li @click="goLink('/mt/mtOrderList')"><span>美团订单</span></li>
        </ul>
      </section>
      <section class="report">
        <span>营运报表</span>
        <ul>
          <li @click="goLink('/sales/cashreport')"><span>营业收入报表</span></li>
          <li @click="goLink('/sales/cashperiodreport')"><span>现金收入报表</span></li>
          <li @click="goLink('/sales/salesreport')"><span>产品销售表</span></li>
        </ul>
      </section>
    </div>
    <div v-show="roles.includes('admin')">
      管理员用户
    </div>
    <div v-show="roles.includes('marketing')">
      市场部用户
    </div>
    <div v-show="roles.includes('finance')" class="hljs">
      <h4>利润表使用说明：</h4>
      <p>点击左侧“利润报表”，下方将展开三个菜单项，其中:<br >
        <ul>
          <li><span style="color:blue;font-weight:600">利润报表</span>
            是最终报表结果，可以选择时间段，门店，报表类型（明细或者汇总）来显示完成的利润报表结果</li>
          <li><span style="color:blue;font-weight:600">利润表维护</span>
            是做每个月的计划和实际金额的录入和修改的维护，选择门店和月份，确定后，表项目会在下方列出，
            直接录入后保存即可</li>
          <li><span style="color:blue;font-weight:600">利润表项目</span>
            是系统初始设置的利润表项目，其中展示的是各个项目的属性<br >
            1. 输入项目金额可以在维护中录入，计算项目是根据公式计算所得，不能输入。<br>
            2. 级别是在表中显示的缩进，对应原来报表中的子项目列，0是最顶层，相应类推。<br>
            3. 公式是按系统编号的四则运算规则
          </li>
        </ul>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  methods: {
    goLink: function(address) {
      this.$router.push(address)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  @media screen and (max-width: 420px) {
    margin: 10px;
  }
}
</style>
<style scoped>
p{ line-height:30px}
.hljs {
  line-height: 1.8;
  /* font-family: Menlo,Monaco,Consolas,Courier,monospace; */
  font-size: 12px;
  padding: 18px 24px;
  background-color: #fafafa;
  border: 1px solid #eaeefb;
  margin-bottom: 25px;
  border-radius: 4px;
  -webkit-font-smoothing: auto;
  color:#000
}
section {display:flex; flex-direction: column}
section span {margin: 10px 0}
section ul{display: flex;}
section ul li{flex: 0 0 33%; height: 60px; max-width:200px; display: flex; background: #66b1ff; margin:0 2px; color:white; border-radius: 5px}
section ul li span { margin: auto}
</style>
