<template>
  <div class="activityGoodsList">
    <div ref="critheader" style="display:flex; justify-content: space-between; margin:5px; padding: 10px 10px 0 0 ">
      <MarketingActivitySelector typeclass="notclosed" @ActivityChanged="ActivityChanged" />
      <div v-if="!activied">
        <el-button size="small" @click="openTemplateDialog">从模版选择</el-button>
        <el-button size="small" type="primary" @click="goCreate">新建</el-button>
      </div>
    </div>
    <el-card style="margin:10px">
      <el-table :style="{height: myHeight}" :data="goodsList" size="small" >
        <el-table-column prop="goodsId" label="编码" header-align="left" align="left" />
        <el-table-column prop="name" label="名称" header-align="left" align="left" />
        <el-table-column prop="category" label="种类" header-align="left" align="left" />
        <el-table-column prop="specification" label="规格" header-align="left" align="left" />
        <el-table-column prop="material" label="材料" header-align="left" align="left" />
        <el-table-column prop="price" label="单价" header-align="left" align="left" />
        <el-table-column prop="id" label="" header-align="center" align="left">
          <template slot-scope="props">
            <div v-if="!activied">
              <el-button type="text" size="small" @click="edit(props.row)">修改</el-button>
              <el-button type="text" size="small" @click="deleteGoods(props.row)"><i class="el-icon-delete" />删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:10px; text-align: right;">
        <el-pagination
          :current-page="currentPage"
          :page-size="limit"
          :total="totalcount"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="pagechange" />
      </div>
    </el-card>
    <el-dialog
      :visible.sync="dialogFormVisible"
      :fullscreen="false"
      :modal="true"
      :show-close="false"
      :loading="loadingForm"
      title="活动宣传品信息"
      width="80%"
      top="5vh">
      <div>
        <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="60px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="编码" prop="goodsId">
                <el-input v-model="editForm.goodsId" size="small" maxlength="20"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="名称" prop="name">
                <el-input v-model="editForm.name" size="small" maxlength="20"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="种类" prop="category">
                <el-input v-model="editForm.category" size="small" maxlength="20"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="规格" prop="specification">
                <el-input v-model="editForm.specification" size="small" maxlength="20"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="材质" prop="material">
                <el-input v-model="editForm.material" size="small" maxlength="20"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单价" prop="price">
                <el-input v-model="editForm.price" size="small" maxlength="20"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="图片" prop="image">
            <!-- <el-input v-model="editForm.image" size="small" type="textarea" /> -->
            <el-upload
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
              :file-list="filelist"
              :data="imgdata"
              :limit="3"
              action="http://mdm.cchkxx.com/api/marketing/uploadGoodsImages"
              list-type="picture-card">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="说明" prop="note">
            <el-input v-model="editForm.note" :rows="3" size="small" type="textarea" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="closeFormDialog">取 消</el-button>
        <el-button v-if="dialogFormStatus =='create'" type="primary" @click="createGoods">新建</el-button>
        <el-button v-else type="primary" @click="updateGoods">修改保存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogFormTemplate"
      :fullscreen="false"
      :modal="true"
      :show-close="false"
      :loading="loadingForm"
      title="活动宣传品模版"
      width="80%"
      top="5vh">
      <div>
        <el-table ref="selectTemplateTable" :data="templateData" size="small" @selection-change="handleTemplateSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="goodsId" label="编码" header-align="left" align="left" />
          <el-table-column prop="name" label="名称" header-align="left" align="left" />
          <el-table-column prop="category" label="种类" header-align="left" align="left" />
          <el-table-column prop="specification" label="规格" header-align="left" align="left" />
          <el-table-column prop="material" label="材料" header-align="left" align="left" />
          <el-table-column prop="price" label="单价" header-align="left" align="left" />
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="dialogFormTemplate=false">取 消</el-button>
        <el-button type="primary" @click="confirmTemplateCopy">确认复制</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { listAllGoods, createGoods, updateGoods, deleteGoods, listAllTemplateGoods, createGoodsFromTemplate } from '@/api/marketing'
import MarketingActivitySelector from '@/components/widgets/MarketingActivitySelector'
export default {
  name: 'ActivityGoodsList',
  components: {
    MarketingActivitySelector
  },
  data() {
    return {
      loading: false,
      myHeight: '',
      goodsList: [],
      totalcount: 0,
      currentPage: 1,
      limit: 10,
      selectActivityId: 0,
      loadingForm: false,
      dialogFormVisible: false,
      dialogFormStatus: '',
      dialogFormTemplate: false,
      editForm: {},
      activied: false,
      editFormRules: {
        goodsId: [{ required: true, message: '请输入代码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },
      filelist: [],
      filelisturl: [],
      imgdata: {},
      templateData: [],
      multipleSelection: []
    }
  },
  watch: {
    selectActivityId(newval, oldval) {
      this.listAllGoods()
    }
  },
  mounted() {
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const critheaderheight = this.$refs.critheader.offsetHeight
    this.myHeight = (h - critheaderheight - 160) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      that.myHeight = (h - critheaderheight - 160) + 'px'
    }
  },
  methods: {
    listAllGoods() {
      listAllGoods(this.selectActivityId, this.currentPage, this.limit).then(res => {
        this.goodsList = res.data
        this.activied = res.activied
        this.totalcount = res.totalcount
      })
    },
    ActivityChanged(event) {
      this.selectActivityId = event.activityId
    },
    goCreate() {
      if (this.selectActivityId === 0) {
        this.$message.error('需要先选择一活动')
        return false
      }
      this.editForm = {
        goodsId: '',
        name: '',
        category: '',
        specification: '',
        material: '',
        price: '',
        note: ''
      }
      this.filelist = []
      this.dialogFormStatus = 'create'
      this.dialogFormVisible = true
    },
    edit(item) {
      this.editForm = item
      this.filelist = []
      if (item.image1 !== '') {
        var image1 = { name: 'image1', url: item.image1 }
        this.filelist.push(image1)
      }
      if (item.image2 !== '') {
        const image2 = { name: 'image2', url: item.image2 }
        this.filelist.push(image2)
      }
      if (item.image3 !== '') {
        var image3 = { name: 'image3', url: item.image3 }
        this.filelist.push(image3)
      }
      this.dialogFormStatus = 'update'
      this.dialogFormVisible = true
    },
    closeFormDialog() {
      this.dialogFormVisible = false
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    beforeUpload(file) {
      // this.filelist.append('file', file)
      // console.log(this.filelist)
      // return false
    },
    handleSuccess(response, file, filelist) {
      if (response.code === 20000) {
        console.log(response.url)
        var image = { image: response.url }
        this.filelisturl.push(image)
        console.log(this.filelisturl)
      }
    },
    createGoods() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {})
            .then(() => {
              const para = Object.assign({}, this.editForm)
              para.activityId = this.selectActivityId
              para.filelist = this.filelisturl
              this.loadingForm = true
              createGoods(para).then(res => {
                if (res.code === 20000) {
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  })
                }
                this.$refs['editForm'].resetFields()
                this.filelisturl = []
                this.loadingForm = false
                this.listAllGoods()
                this.dialogFormVisible = false
              })
            })
            .catch(e => {
              console.log(e)
            })
        }
      })
    },
    updateGoods() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {})
            .then(() => {
              const para = Object.assign({}, this.editForm)
              para.filelist = this.filelisturl
              this.loadingForm = true
              updateGoods(para).then(res => {
                if (res.code === 20000) {
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  })
                }
                this.$refs['editForm'].resetFields()
                this.loadingForm = false
                this.listAllGoods()
                this.dialogFormVisible = false
              })
            })
            .catch(e => {
              console.log(e)
            })
        }
      })
    },
    deleteGoods(item) {
      this.$confirm('确认删除吗？', '提示', {})
        .then(() => {
          deleteGoods(item.id).then(res => {
            if (res.code === 20000) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            }
            this.listAllGoods()
          })
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 分页处理
    pagechange: function(currentPage) {
      this.currentPage = currentPage
      this.listAllGoods()
    },
    handleSizeChange: function(currentSize) {
      this.limit = currentSize
      this.listAllGoods()
    },
    openTemplateDialog() {
      if (this.selectActivityId === 0) {
        this.$message.error('需要先选择一活动')
        return false
      }
      listAllTemplateGoods().then(res => {
        this.templateData = res.data
      })
      this.dialogFormTemplate = true
    },
    confirmTemplateCopy() {
      console.log(this.multipleSelection)
      var param = {
        activityId: this.selectActivityId,
        templateGoods: this.multipleSelection
      }
      createGoodsFromTemplate(param).then(res => {
        console.log(res)
        if (res.code === 20000) {
          this.dialogFormTemplate = false
          this.multipleSelection = []
          this.listAllGoods()
        }
      })
    },
    handleTemplateSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped>
.el-card >>> .el-card__body {height: 100%}
</style>
