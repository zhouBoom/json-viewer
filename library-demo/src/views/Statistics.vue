<template>
  <div class="statistics-page">
    <div class="container">
      <div class="page-header fade-in">
        <h1>📊 数据统计分析</h1>
        <p>全面了解图书馆座位使用情况</p>
      </div>

      <div class="charts-grid">
        <!-- 月度数据 -->
        <div class="chart-card card fade-in" style="animation-delay: 0.1s">
          <h3>📈 月度预约趋势</h3>
          <div ref="monthlyChart" class="chart"></div>
        </div>

        <!-- 用户来源 -->
        <div class="chart-card card fade-in" style="animation-delay: 0.2s">
          <h3>👥 用户来源分布</h3>
          <div ref="userSourceChart" class="chart"></div>
        </div>

        <!-- 周活跃量 -->
        <div class="chart-card card fade-in" style="animation-delay: 0.3s">
          <h3>📅 周活跃量统计</h3>
          <div ref="weeklyActiveChart" class="chart"></div>
        </div>

        <!-- 用户增长 -->
        <div class="chart-card card fade-in" style="animation-delay: 0.4s">
          <h3>📊 用户增长趋势</h3>
          <div ref="userGrowthChart" class="chart"></div>
        </div>

        <!-- 累计用户量 -->
        <div class="chart-card card fade-in" style="animation-delay: 0.5s">
          <h3>👤 累计用户量</h3>
          <div ref="totalUsersChart" class="chart"></div>
        </div>

        <!-- 消息发送概况 -->
        <div class="chart-card card fade-in" style="animation-delay: 0.6s">
          <h3>💬 消息发送概况</h3>
          <div ref="messageChart" class="chart"></div>
        </div>

        <!-- 接口分析 -->
        <div class="chart-card card fade-in" style="animation-delay: 0.7s">
          <h3>🔌 接口调用分析</h3>
          <div ref="apiChart" class="chart"></div>
        </div>

        <!-- 响应时间 -->
        <div class="chart-card card fade-in" style="animation-delay: 0.8s">
          <h3>⚡ 接口响应时间</h3>
          <div ref="responseTimeChart" class="chart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const monthlyChart = ref(null)
const userSourceChart = ref(null)
const weeklyActiveChart = ref(null)
const userGrowthChart = ref(null)
const totalUsersChart = ref(null)
const messageChart = ref(null)
const apiChart = ref(null)
const responseTimeChart = ref(null)

onMounted(() => {
  initMonthlyChart()
  initUserSourceChart()
  initWeeklyActiveChart()
  initUserGrowthChart()
  initTotalUsersChart()
  initMessageChart()
  initApiChart()
  initResponseTimeChart()
})

const initMonthlyChart = () => {
  const chart = echarts.init(monthlyChart.value)
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320, 1450, 1520, 1680, 1790, 1850],
      type: 'line',
      smooth: true,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(59, 130, 246, 0.5)' },
          { offset: 1, color: 'rgba(59, 130, 246, 0.1)' }
        ])
      },
      lineStyle: {
        color: '#3b82f6',
        width: 3
      },
      itemStyle: {
        color: '#3b82f6'
      }
    }]
  }
  chart.setOption(option)
  window.addEventListener('resize', () => chart.resize())
}

const initUserSourceChart = () => {
  const chart = echarts.init(userSourceChart.value)
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: '5%',
      left: 'center'
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '本科生', itemStyle: { color: '#3b82f6' } },
        { value: 735, name: '研究生', itemStyle: { color: '#10b981' } },
        { value: 580, name: '教职工', itemStyle: { color: '#f59e0b' } },
        { value: 484, name: '访客', itemStyle: { color: '#06b6d4' } }
      ]
    }]
  }
  chart.setOption(option)
  window.addEventListener('resize', () => chart.resize())
}

const initWeeklyActiveChart = () => {
  const chart = echarts.init(weeklyActiveChart.value)
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [320, 302, 341, 374, 390, 280, 220],
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#10b981' },
          { offset: 1, color: '#059669' }
        ]),
        borderRadius: [8, 8, 0, 0]
      },
      barWidth: '60%'
    }]
  }
  chart.setOption(option)
  window.addEventListener('resize', () => chart.resize())
}

const initUserGrowthChart = () => {
  const chart = echarts.init(userGrowthChart.value)
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['新增用户', '取消关注']
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '新增用户',
        type: 'bar',
        data: [120, 132, 101, 134, 90, 130],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#3b82f6' },
            { offset: 1, color: '#2563eb' }
          ])
        }
      },
      {
        name: '取消关注',
        type: 'bar',
        data: [20, 25, 18, 22, 15, 19],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#ef4444' },
            { offset: 1, color: '#dc2626' }
          ])
        }
      }
    ]
  }
  chart.setOption(option)
  window.addEventListener('resize', () => chart.resize())
}

const initTotalUsersChart = () => {
  const chart = echarts.init(totalUsersChart.value)
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [500, 620, 701, 813, 883, 994, 1124, 1274, 1454, 1668, 1839, 1950],
      type: 'line',
      smooth: true,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(16, 185, 129, 0.5)' },
          { offset: 1, color: 'rgba(16, 185, 129, 0.1)' }
        ])
      },
      lineStyle: {
        color: '#10b981',
        width: 3
      },
      itemStyle: {
        color: '#10b981'
      }
    }]
  }
  chart.setOption(option)
  window.addEventListener('resize', () => chart.resize())
}

const initMessageChart = () => {
  const chart = echarts.init(messageChart.value)
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: '5%',
      left: 'center'
    },
    series: [{
      type: 'pie',
      radius: '65%',
      data: [
        { value: 335, name: '预约确认', itemStyle: { color: '#3b82f6' } },
        { value: 234, name: '取消通知', itemStyle: { color: '#ef4444' } },
        { value: 154, name: '提醒消息', itemStyle: { color: '#f59e0b' } },
        { value: 135, name: '系统公告', itemStyle: { color: '#10b981' } }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  }
  chart.setOption(option)
  window.addEventListener('resize', () => chart.resize())
}

const initApiChart = () => {
  const chart = echarts.init(apiChart.value)
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['预约接口', '查询接口', '用户接口']
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '预约接口',
        type: 'line',
        data: [120, 132, 301, 434, 590, 330],
        smooth: true,
        lineStyle: { color: '#3b82f6' },
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: '查询接口',
        type: 'line',
        data: [220, 282, 401, 534, 690, 430],
        smooth: true,
        lineStyle: { color: '#10b981' },
        itemStyle: { color: '#10b981' }
      },
      {
        name: '用户接口',
        type: 'line',
        data: [150, 232, 201, 254, 390, 230],
        smooth: true,
        lineStyle: { color: '#f59e0b' },
        itemStyle: { color: '#f59e0b' }
      }
    ]
  }
  chart.setOption(option)
  window.addEventListener('resize', () => chart.resize())
}

const initResponseTimeChart = () => {
  const chart = echarts.init(responseTimeChart.value)
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['预约', '查询', '登录', '注销', '更新', '删除']
    },
    yAxis: {
      type: 'value',
      name: '毫秒(ms)'
    },
    series: [{
      data: [45, 32, 28, 35, 52, 38],
      type: 'bar',
      itemStyle: {
        color: (params) => {
          const colors = ['#3b82f6', '#10b981', '#06b6d4', '#f59e0b', '#8b5cf6', '#ec4899']
          return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: colors[params.dataIndex] },
            { offset: 1, color: colors[params.dataIndex] + 'aa' }
          ])
        },
        borderRadius: [8, 8, 0, 0]
      },
      barWidth: '50%'
    }]
  }
  chart.setOption(option)
  window.addEventListener('resize', () => chart.resize())
}
</script>

<style scoped>
.statistics-page {
  padding: 40px 0;
  min-height: calc(100vh - 60px);
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  font-size: 36px;
  margin-bottom: 8px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-header p {
  color: var(--text-secondary);
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 24px;
}

.chart-card h3 {
  margin-bottom: 20px;
  font-size: 18px;
  color: var(--text-primary);
}

.chart {
  width: 100%;
  height: 350px;
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 28px;
  }
  
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .chart {
    height: 300px;
  }
}
</style>
