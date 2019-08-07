<template>
  <div class="activityList">
    <div ref="critheader" style="display:flex; justify-content: flex-end; padding:10px 10px 0 0 ">
      <el-button type="primary" size="small" @click="showCreateDialog">新建</el-button>
    </div>
    <el-card style="margin:10px">
      <el-table :style="{height: myHeight}" :data="activityList" size="small">
        <el-table-column prop="activityId" label="代码" header-align="left" align="left" />
        <el-table-column prop="name" label="名称" header-align="left" align="left" />
        <el-table-column prop="submitDeadLine" label="截止日期" align="left">
          <template slot-scope="props">
            <div>{{ props.row.submitDeadLine.time | formatDate }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" header-align="left" align="left">
          <template slot-scope="props">
            <div v-if="props.row.status === '1'">未开始</div>
            <div v-else-if = "props.row.status === '2'">申报中</div>
            <div v-else-if = "props.row.status === '3'">结束申报</div>
            <div v-else-if = "props.row.status === '4'">关闭</div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="" header-align="center" align="left">
          <template slot-scope="props">
            <div v-if="props.row.status === '1'">
              <el-button type="text" size="small" @click="showUpdateDialog(props.row)"><i class="el-icon-edit" />修改</el-button>
              <el-button type="text" size="small" @click="deleteActivity(props.row)"><i class="el-icon-delete" />删除</el-button>
              <el-button type="text" size="small" @click="startActivity(props.row)">开始申报</el-button>
            </div>
            <div v-else-if="props.row.status === '2'">
              <el-button type="text" size="small" @click="stopActivity(props.row)">结束申报</el-button>
            </div>
            <div v-else-if="props.row.status === '3'">
              <el-button type="text" size="small" @click="startActivity(props.row)">重开始申报</el-button>
              <el-button type="text" size="small" @click="closeActivity(props.row)">关闭</el-button>
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
      title="活动信息"
      top="5vh">
      <div>
        <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="120px">
          <el-form-item label="编码" prop="activityId">
            <el-input v-model="editForm.activityId" size="small" maxlength="20"/>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="editForm.name" size="small" maxlength="20"/>
          </el-form-item>
          <el-form-item label="截止日期" prop="submitDeadLine1">
            <el-date-picker
              v-model="submitDeadLine1"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"/>
          </el-form-item>
          <el-form-item label="说明" prop="note">
            <el-input v-model="editForm.note" :rows="3" size="small" type="textarea" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="closeFormDialog">取 消</el-button>
        <el-button v-if="dialogFormStatus =='create'" type="primary" @click="createActivity">新建</el-button>
        <el-button v-else type="primary" @click="updateActivity">修改保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { listAllActivities, createActivity, updateActivity, deleteActivity, startActivity, stopActivity, closeActivity } from '@/api/marketing'
import { parseTime } from '@/utils'
export default {
  name: 'ActivityList',
  filters: {
    formatDate(time) {
      const date = new Date(time)
      return parseTime(date, '{y}-{m}-{d}')
    }
  },
  data() {
    return {
      loading: false,
      myHeight: '',
      activityList: [],
      stauts: 0,
      currentPage: 1,
      limit: 10,
      totalcount: 0,
      name: '',
      dialogFormVisible: false,
      dialogFormStatus: '',
      editForm: {},
      loadingForm: false,
      editFormRules: {
        activityId: [{ required: true, message: '请输入代码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
        // submitDeadLine: [{ required: true, message: '请输入截止日期', trigger: 'blur' }]
      },
      submitDeadLine1: ''
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
  created() {
    this.listAllActivities()
  },
  methods: {
    listAllActivities() {
      this.loading = true
      listAllActivities(this.currentPage, this.limit).then(res => {
        this.activityList = res.data
        this.totalcount = res.totalcount
        this.loading = false
      })
    },
    showCreateDialog() {
      this.editForm.id = 0
      // this.editForm.activityId = ''
      // this.editForm.name = ''
      // this.editForm.note = ''
      // this.editForm.status = 0
      // this.submitDeadLine1 = ''
      this.dialogFormStatus = 'create'
      this.dialogFormVisible = true
    },
    showUpdateDialog(item) {
      this.editForm.id = item.id
      this.editForm.activityId = item.activityId
      this.editForm.name = item.name
      this.editForm.note = item.note
      this.editForm.status = item.status
      var date = new Date(item.submitDeadLine.time)
      // this.editForm.submitDeadLine = date
      this.submitDeadLine1 = date
      this.dialogFormStatus = 'update'
      this.dialogFormVisible = true
    },
    closeFormDialog() {
      this.dialogFormVisible = false
    },
    createActivity() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {})
            .then(() => {
              const para = Object.assign({}, this.editForm)
              this.loadingForm = true
              para.submitDeadLine = this.submitDeadLine1
              createActivity(para).then(res => {
                if (res.code === 20000) {
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  })
                }
                this.$refs['editForm'].resetFields()
                this.loadingForm = false
                this.listAllActivities()
                this.dialogFormVisible = false
              })
            })
            .catch(e => {
              console.log(e)
            })
        }
      })
    },
    updateActivity() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {})
            .then(() => {
              const para = Object.assign({}, this.editForm)
              para.submitDeadLine = this.submitDeadLine1
              this.loadingForm = true
              updateActivity(para).then(res => {
                if (res.code === 20000) {
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  })
                }
                this.$refs['editForm'].resetFields()
                this.loadingForm = false
                this.listAllActivities()
                this.dialogFormVisible = false
              })
            })
            .catch(e => {
              console.log(e)
            })
        }
      })
    },
    deleteActivity(row) {
      var param = { activityId: row.id }
      deleteActivity(param).then(res => {
        this.listAllActivities()
      }).catch(e => {
        console.log(e)
      })
    },
    startActivity(row) {
      var param = { activityId: row.id }
      startActivity(param).then(res => {
        console.log(res)
        this.listAllActivities()
      })
    },
    stopActivity(row) {
      var param = { activityId: row.id }
      stopActivity(param).then(res => {
        console.log(res)
        this.listAllActivities()
      })
    },
    closeActivity(row) {
      var param = { activityId: row.id }
      closeActivity(param).then(res => {
        console.log(res)
        this.listAllActivities()
      })
    },
    // 分页处理
    pagechange: function(currentPage) {
      this.currentPage = currentPage
      this.retrieveData()
    },
    handleSizeChange: function(currentSize) {
      this.limit = currentSize
      this.retrieveData()
    }
  }
}
</script>
<style scoped>
.el-card >>> .el-card__body {height: 100%}
</style>
