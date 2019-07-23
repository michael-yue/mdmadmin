<template>
  <div class="marketingactivityselect">
    <div v-if="show">
      <div class="inlinelabel">活动</div>
      <el-select v-model="selectedActivityId" size="small" class="text-left">
        <el-option v-for="item in activities" :value="item.activityId" :label="item.name" :key="item.id" name="activity" placeholder="请选择活动">
          {{ item.name }}
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { getAllActivites, getOpenActivity } from '@/api/marketing'
export default {
  name: 'SelectActivity',
  props: {
    activityId: {
      default: '',
      type: String
    },
    typeclass: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      selectedActivityId: '',
      activities: [],
      show: true
    }
  },
  watch: {
    selectedActivityId(val, oldval) {
      this.$emit('ActivityChanged', { activityId: this.selectedActivityId })
    }
  },
  created: function() {
    const roles = store.getters.roles
    if (roles.includes('branch')) {
      this.show = false
    } else {
      this.show = true
      this.retriveActivity()
    }
  },
  methods: {
    // 这里不对，权限
    retriveActivity: function() {
      var that = this
      if (this.typeclass === 'open') {
        getOpenActivity().then(response => {
          that.activities = response.data
        }).catch(error => {
          console.log(error)
        })
      } else if (this.typeclass === 'all') {
        getAllActivity().then(response => {
          that.activities = response.data
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
}
</script>

<style scope>
.branchselect{display:inline-block;margin:0px 5px}
.inlinelabel {position:relative;font-size:14px;display:inline-block;margin:0px 10px}
</style>
