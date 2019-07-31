<template>
  <div class="branchGoodsList">
    <div ref="critheader" style="display:flex; justify-content: space-between; margin:5px; padding: 10px 10px 0 0 ">
      <MarketingActivitySelector typeclass="open" @ActivityChanged="ActivityChanged" />
      <!-- <el-button size="small" type="primary" @click="query">查询</el-button> -->
    </div>
    <el-card :style="{height: myHeight}" style="margin:10px">
      <el-table :data="goodsList" size="small">
        <el-table-column prop="goods.goodsId" label="编码" header-align="left" align="left" />
        <el-table-column prop="goods.name" label="名称" header-align="left" align="left" />
        <el-table-column prop="goods.category" label="种类" header-align="left" align="left" />
        <el-table-column prop="goods.specification" label="规格" header-align="left" align="left" />
        <el-table-column prop="goods.material" label="材料" header-align="left" align="left" />
        <el-table-column prop="goods.price" label="单价" header-align="left" align="left" />
        <el-table-column prop="qty" label="数量" header-align="left" align="left">
          <template slot-scope="props">
            <!-- <el-input v-focus-next-on-enter v-model= "props.row.qty" :ref= "props.row.qty" size="mini" @focus="focus($event)" @keyup.enter.native="updateQty(props.row)"/> -->
            <el-input v-focus-next-on-enter v-model="props.row.qty" size="small" @keyup.enter.native="updateQty(props.row)" @focus="focus($event)" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
import { listAllGoodsByBranch, saveBranchGoods } from '@/api/marketing'
import MarketingActivitySelector from '@/components/widgets/MarketingActivitySelector'
export default {
  name: 'BranchGoodsList',
  components: {
    MarketingActivitySelector
  },
  directives: {
    focusNextOnEnter: {
      bind: function(el, { value }, vnode) {
        el.addEventListener('keyup', (ev) => {
          if (ev.keyCode === 13) {
            // console.log('------------------------vnode-------------')
            // console.log(vnode)
            // console.log(value)
            const nextInput = vnode.context.$refs[value]
            // const nextInput = vnode.elm
            console.log(nextInput)
            if (nextInput && typeof nextInput.focus === 'function') {
              nextInput.focus()
              nextInput.select()
            }
          }
        })
      }
    }
  },
  data() {
    return {
      loading: false,
      myHeight: '',
      goodsList: [],
      selectActivityId: 0,
      selectedBranch: ''
    }
  },
  watch: {
    selectActivityId: function(val, oldval) {
      if (this.selectActivityId !== '0') {
        this.retrieveData()
      }
    }
  },
  mounted() {
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const critheaderheight = this.$refs.critheader.offsetHeight
    this.myHeight = (h - critheaderheight - 80) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      that.myHeight = (h - critheaderheight - 80) + 'px'
    }
  },
  created: function() {
    if (store.getters.roles.includes('branch')) {
      this.selectedBranch = store.getters.branches
    }
  },
  methods: {
    retrieveData() {
      this.loading = true
      listAllGoodsByBranch(this.selectedBranch, this.selectActivityId).then(res => {
        this.goodsList = res.data
        this.loading = false
      })
    },
    ActivityChanged(event) {
      this.selectActivityId = event.activityId
    },
    focus: function(event) {
      console.log(event)
      event.currentTarget.select()
    },
    updateQty(item) {
      console.log(item)
      var param = {
        activityId: this.selectActivityId,
        goodsId: item.goods.id,
        qty: item.qty
      }
      console.log(param)
      saveBranchGoods(param).then(res => {
        this.goodsList = res.data
      })
    }
  }
}
</script>
