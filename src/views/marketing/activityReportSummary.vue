<template>
  <div class="activityList">
    <div ref="critheader" style="display:flex; justify-content: space-between;margin:10px">
      <MarketingActivitySelector typeclass="all" @ActivityChanged="ActivityChanged" />
      <div>
        <el-button type="primary" size="small" @click="query">查询</el-button>
        <el-button :loading="downloading" type="primary" size="small" icon="document" @click="handleDownload">导出excel</el-button>
      </div>
    </div>
    <el-card :style="{height: myHeight}" style="margin:10px">
      <el-table v-loading="loading" id="datatable" :data="data" border size="small">
        <el-table-column fixed prop="goodsName" label="名称" header-align="center" align="left" />
        <el-table-column fixed prop="category" label="种类" header-align="center" align="left" />
        <el-table-column fixed prop="specification" label="规格" header-align="center" align="left" />
        <el-table-column fixed prop="material" label="材质" header-align="center" align="left" />
        <el-table-column fixed prop="summary" label="合计" header-align="center" align="right" />
        <el-table-column
          v-for="item in tableHeader"
          :label="item.label"
          :prop="item.prop"
          :key="item.id"
          width="120px"
          header-align="center"
          align="right" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { listActivitiesReport } from '@/api/marketing'
import MarketingActivitySelector from '@/components/widgets/MarketingActivitySelector'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: 'ActivityList',
  components: {
    MarketingActivitySelector
  },
  data() {
    return {
      loading: false,
      selectedActivityId: '',
      data: [],
      tableHeader: [],
      myHeight: '',
      downloading: false
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
  methods: {
    query() {
      this.loading = true
      listActivitiesReport(this.selectedActivityId).then(res => {
        this.data = res.data.tableData
        this.tableHeader = res.data.tableHeader
        this.loading = false
      })
    },
    ActivityChanged(event) {
      this.selectedActivityId = event.activityId
    },
    handleDownload() {
      this.downloading = true
      var fix = document.querySelector('.el-table__fixed')
      var wb
      if (fix) {
        wb = XLSX.utils.table_to_book(document.querySelector('#datatable').removeChild(fix))
        document.querySelector('#datatable').appendChild(fix)
      } else {
        wb = XLSX.utils.table_to_book(document.querySelector('#datatable'))
      }

      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], {
            type: 'application/octet-stream'
          }),
          '宣传品统计.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      this.downloading = false
      return wbout
    }
  }
}
</script>

<style scoped>
.el-card >>> .el-card__body {height: 100%}
</style>
