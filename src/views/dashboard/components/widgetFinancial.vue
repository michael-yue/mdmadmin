<template>
  <div class="widgetFinancial">
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
</template>

<style lang="scss" scoped>
  .widgetFinancial {
    line-height: 1.8;
    /* font-family: Menlo,Monaco,Consolas,Courier,monospace; */
    font-size: 12px;
    padding: 18px 24px;
    background-color: #fafafa;
    border: 1px solid #eaeefb;
    margin-bottom: 25px;
    border-radius: 4px;
    -webkit-font-smoothing: auto;
    color:#000;
    p {
      line-height:30px
    }
  }
</style>