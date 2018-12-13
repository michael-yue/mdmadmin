<template>
  <nav>
    <ul class="pagination">
      <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(current - 1)"> « </a></li>
      <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(1)"> 首页 </a></li>
      <li v-for="p in grouplist" :key="p.id" :class="{'active': current == p.val}">
        <a href="javascript:;" @click="setCurrent(p.val)"> {{ p.text }} </a>
      </li>
      <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(page)"> 尾页 </a></li>
      <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(current + 1)"> »</a></li>
    </ul>
  </nav>
</template>

<script type="es6">
export default{
  props: {
    total: {// 数据总条数
      type: Number,
      default: 0
    },
    display: {// 每页显示条数
      type: Number,
      default: 10
    },
    currentPage: {// 当前页码
      type: Number,
      default: 1
    },
    pagegroup: {// 分页条数
      type: Number,
      default: 5,
      coerce: function(v) {
        v = v > 0 ? v : 5
        return v % 2 === 1 ? v : v + 1
      }
    }
  },
  data() {
    return {
      current: this.currentPage
    }
  },
  computed: {
    page: function() { // 总页数
      return Math.ceil(this.total / this.display)
    },
    grouplist: function() { // 获取分页页码
      const len = this.page
      let temp = []
      const list = []
      const count = Math.floor(this.pagegroup / 2)
      let center = this.current
      if (len <= this.pagegroup) {
        for (let i = 1; i <= len; i++) {
          list.push({ text: i, val: i })
        }
        return list
      }
      for (let i = 1; i <= this.page; i++) {
        temp.push(i)
      }
      if (center < count + 1) {
        center = count + 1 // 当前页是开头几页时保持center是count + 1不变
      }
      if (center > this.page - count) {
        center = this.page - count // 当前页是末尾几页时保持center是this.page-count不变
      }
      temp = temp.splice(center - count - 1, this.pagegroup)
      for (let j = 0; j < temp.length; j++) {
        list.push({
          text: temp[j],
          val: temp[j]
        })
      }
      if (this.current > count + 1) {
        list.unshift({ text: '...', val: list[0].val - 1 })
      }
      if (this.current < this.page - count) {
        list.push({ text: '...', val: list[list.length - 1].val + 1 })
      }
      return list
    }
  },
  methods: {
    setCurrent: function(idx) {
      if (this.current !== idx && idx > 0 && idx < this.page + 1) {
        this.current = idx
        this.$emit('pagechange', this.current)
      }
    }
  }
}
</script>

<style>
  .pagination {
    overflow: hidden;
    display: table;
    margin: 0 auto;
    height: 30px;
    border: 1px solid rgb(241, 241, 241);
    border-radius: 5px;
  }
  .pagination li {
    list-style:none;
    float: left;
    height: 30px;
    border-radius: 5px;
    margin: 3px;
  }
  .pagination li:hover {
    background: #000;
  }
  .pagination li:hover a {
    color: #fff;
  }
  .pagination a {
    display: block;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    color: #666;
    text-decoration: none
  }
  /* .pagination li:active {
    background: #000;
  }
      a {
        color: #fff;
      }
    }
  } */
</style>
