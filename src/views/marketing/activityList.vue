<template>
  <div class="activityList">
    <div ref="critheader" style="display:flex; justify-content: flex-end; padding:5px">
      <el-button type="primary" size="small" @click="showCreate">新建</el-button>
    </div>
    <el-card :style="{height: myHeight}">
      <el-table :data="activityList" size="small" height="100%">
        <el-table-column prop="activityId" label="代码" width="150" header-align="center" align="left" />
        <el-table-column prop="name" label="名称" width="150" header-align="center" align="left" />
        <el-table-column prop="sumbmitDeadLine" label="截止日期" width="150" header-align="center" align="left" />
        <el-table-column prop="note" label="说明" header-align="center" align="left" />
        <el-table-column prop="status" label="状态" width="100" header-align="center" align="left" />
        <el-table-column prop="id" label="" width="100" header-align="center" align="left">
          <template slot="id">
            <el-button size="small" @click="showDialog(id)"><i class="el-icon-edit"></i>修改</el-button>
            <el-button size="small" @click="deleteActivity(id)"><i class="el-icon-delete"></i>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:10px; text-align: right">
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
      :loading="refundloading"
      title="活动信息"
      top="5vh">
      <div>
        <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="120px">
          <el-form-item label="编码" prop="typeId">
            <el-input v-model="editForm.typeId" size="small" maxlength="20"/>
          </el-form-item>
          <el-form-item label="名称" prop="typeName">
            <el-input v-model="editForm.typeName" size="small" maxlength="20"/>
          </el-form-item>
          <el-form-item label="截止日期" prop="orderSeq">
            <el-input v-model="editForm.orderSeq" size="small" maxlength="20"/>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="editForm.status">
              <el-radio label="1">在售</el-radio>
              <el-radio label="0">停售</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="说明" prop="note">
            <el-input v-model="editForm.note" size="small" maxlength="20"/>
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
import { listAllActivities } from '@/api/marketing'
export default {
  name: 'ActivityList',
  data() {
    return {
      loading: false,
      myHeight: '',
      activityList: [],
      stauts: 0,
      name: '',
      dialogFormVisible: false,
      dialogFormStatus: '',
      editForm: {},
      pagenum: 1,
      pagesize: 10
    }
  },
  mounted() {
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const critheaderheight = this.$refs.critheader.offsetHeight
    this.myHeight = (h - critheaderheight - 50) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      that.myHeight = (h - critheaderheight - 50) + 'px'
    }
  },
  created() {
    this.listAllActivities()
  },
  methods: {
    listAllActivities() {
      listAllActivities(this.pagenum, this.pagesize).then(res => {
        this.activityList = res.data
      })
    },
    showCreate() {
      this.dialogFormVisible = true
    },
    closeFormDialog() {
      this.dialogFormVisible = false
    },
    createActivity() {
      console.log('create')
    },
    updateActivity() {
      console.log('create')
    },
    showDialog(item) {
      this.dialogFormStatus = 'update'
      this.dialogFormVisible = true
    }
  }
}
</script>
