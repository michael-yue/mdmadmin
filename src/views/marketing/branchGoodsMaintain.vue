<template>
  <div class="branchGoodsList">
    <div ref="critheader" style="display:flex; justify-content: space-between; margin:5px; padding: 10px 10px 0 0 ">
      <MarketingActivitySelector typeclass="open" @ActivityChanged="ActivityChanged" />
      <el-button size="small" type="primary" @click="save">保存</el-button>
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
            <div v-if="activied === true">
              <el-input v-focus-next-on-enter v-model="props.row.qty" :ref= "props.row.goods.goodsId" size="small" @focus="focus($event)" />
            </div>
            <div v-else>
              {{ props.row.qty }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="goods.price" label="图片" header-align="left" align="left">
          <template slot-scope="props">
            <div v-if="hasImage(props.row.goods)">
              <el-button type="text" size="small" @click="showImage(props.row)">查看</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :visible.sync="dialogImageVisible"
      :fullscreen="false"
      :modal="true"
      :show-close="false"
      :loading="loadingImageDialog"
      title="图片"
      top="5vh">
      <div>
        <img :src="image1" class="img" alt="">
        <img :src="image2" class="img" alt="">
        <img :src="image3" class="img" alt="">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="closeImageForm">取 消</el-button>
      </span>
    </el-dialog>

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
            console.log(vnode)
            console.log(value)
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
      selectedBranch: '',
      activied: false,
      dialogImageVisible: false,
      loadingImageDialog: false,
      image1: '',
      image2: '',
      image3: ''
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
        this.activied = res.activied
        this.loading = false
      })
    },
    ActivityChanged(event) {
      this.selectActivityId = event.activityId
    },
    focus: function(event) {
      event.currentTarget.select()
    },
    hasImage(goods) {
      if (goods.image1 !== '' || goods.image2 !== '' || goods.image3 !== '') {
        return true
      } else {
        return false
      }
    },
    showImage(item) {
      console.log(item)
      this.image1 = item.goods.image1
      this.image2 = item.goods.image2
      this.image3 = item.goods.image3
      this.dialogImageVisible = true
    },
    closeImageForm() {
      this.dialogImageVisible = false
    },
    save() {
      var param = {
        activityId: this.selectActivityId,
        branchId: store.getters.branches,
        goodsqty: this.goodsList
      }
      saveBranchGoods(param).then(res => {
        if (res.code === 20000) {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.img {
  width:100%
}
</style>
