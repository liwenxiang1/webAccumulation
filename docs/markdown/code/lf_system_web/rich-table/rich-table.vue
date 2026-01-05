<template>
  <div class="rich-table">
    <table>
      <tr class="header-text">
        <th>知 识 点</th>
        <th>答 题 速 度</th>
        <th>答 题 准 确 度</th>
        <th>掌 握 程 度</th>
      </tr>
      <tr v-for="(item,index) in tableList" class="content-text">
        <td class="single-line">{{ item.title }}</td>
        <td>
          <progress-line-span :value="item.speedP"></progress-line-span>
        </td>
        <td>
          <progress-line :value="item.rightP"></progress-line>
        </td>
        <td class="hold-text" :style="getHoldStyle(item.holdP)">{{ getHoldStr(item.holdP) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import ProgressLine from "./progress-line"
import ProgressLineSpan from "./progress-line-span"

export default {
  name: "rich-table",
  components: {
    ProgressLine,
    ProgressLineSpan,
  },
  props: {
    tableList: {
      type: Array,
      // default: () => {
      //   return [
      //     {title: '二次提取公因数--二次提取公因数', speedP: 1, rightP: 2, holdP: 3},
      //     {title: '二次提取公因数--二次提取公因数', speedP: 2, rightP: 3, holdP: 2},
      //     {title: '二次提取公因数--二次提取公因数', speedP: 3, rightP: 1, holdP: 1},
      //     {title: '二次提取公因数--二次提取公因数', speedP: 1, rightP: 2, holdP: 3},
      //     {title: '二次提取公因数--二次提取公因数', speedP: 2, rightP: 3, holdP: 2},
      //     {title: '二次提取公因数--二次提取公因数', speedP: 3, rightP: 1, holdP: 1},
      //   ]
      // }
    }
  },
  methods: {
    getHoldStr(hold) {
      let holdStr = ["未掌握", "基本掌握", "完全掌握"][hold - 1]
      return holdStr
    },
    getHoldStyle(hold) {
      let color = ["#FF5340", "#8693A3", "#1CB648",][hold - 1]
      return {color}
    }
  }
}
</script>

<style>
.rich-table > table {
  margin: auto;
  margin-top: 33px;
  width: calc(100% - 33px);
  border-radius: 20px;
  border-spacing: 0;
  border: 2px solid #0F4786;
}

.rich-table > table th {
  width: 202px;
  font-weight: 400;
  background: #195497;
  border-right: 3px double white;
}

.rich-table > table th:first-child {
  width: 290px;
  border-top-left-radius: 17px;
}

.rich-table > table th:last-child {
  border-right: 0;
  border-top-right-radius: 17px;
}

.rich-table > table td {
  text-align: center;
  border-right: 1px dashed #195497;
  border-bottom: 1px dashed #195497;
}

.rich-table > table tr:nth-child(2n+1) {
  background: rgba(82, 139, 255, 0.1);
}

.rich-table > table td:last-child {
  border-right: 0;
}

.rich-table > table tr:last-child td {
  border-bottom: 0;
}

.header-text {
  height: 50px;
  font-size: 20px;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
}

.content-text {
  height: 50px;
  font-size: 14px;
  font-weight: 400;
  color: #3B4859;
  line-height: 20px;
  text-align: center;
  font-family: PingFangSC-Regular, PingFang SC;
}

.hold-text {
  font-size: 16px;
  font-weight: bold;
  font-family: PingFangSC-Medium, PingFang SC;
}

@media (max-width: 770px) {
  .rich-table > table {
    margin: auto;
    margin-top: calc(33px / 3);
    width: calc(100% - 33px / 3);
    border-radius: calc(20px / 3);
    border-width: 1px;
    table-layout: fixed;
  }

  .rich-table > table th {
    width: calc(202px / 3);
    border-right-width: 1px;
  }

  .rich-table > table th:first-child {
    width: calc(290px / 3);
    border-top-left-radius: calc(17px / 3);
  }

  .rich-table > table th:last-child {
    border-top-right-radius: calc(17px / 3);
  }

  .rich-table > table td {
    border-right: 1px dashed #195497;
    border-bottom: 1px dashed #195497;
  }

  .rich-table > table tr:nth-child(2n+1) {
    background: rgba(82, 139, 255, 0.1);
  }

  .rich-table > table td:last-child {
    border-right: 0;
  }

  .rich-table > table tr:last-child td {
    border-bottom: 0;
  }

  .header-text {
    height: calc(50px / 1.5);
    font-size: calc(20px / 3);
    line-height: calc(28px / 1.5);
  }

  .content-text {
    height: calc(50px / 1.5);
    font-size: calc(14px / 3);
    line-height: calc(20px / 1.5);
  }

  .hold-text {
    font-size: calc(16px / 3);
  }
}
</style>
