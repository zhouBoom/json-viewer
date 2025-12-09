<template>
  <div class="booking-page">
    <div class="container">
      <div class="page-header fade-in">
        <h1>💺 座位预约</h1>
        <p>选择您喜欢的座位和时间段</p>
      </div>

      <div class="booking-controls card fade-in">
        <div class="control-group">
          <label>📅 选择日期</label>
          <input type="date" v-model="selectedDate" class="input-field" />
        </div>
        <div class="control-group">
          <label>⏰ 时间段</label>
          <select v-model="selectedTimeSlot" class="input-field">
            <option value="morning">上午 (09:00-12:00)</option>
            <option value="afternoon">下午 (14:00-18:00)</option>
            <option value="evening">晚上 (19:00-22:00)</option>
            <option value="allday">全天 (09:00-22:00)</option>
          </select>
        </div>
      </div>

      <div class="seat-map-container card fade-in">
        <h3>🗺️ 座位地图</h3>
        <div class="legend">
          <span class="legend-item">
            <span class="legend-color available"></span> 可用
          </span>
          <span class="legend-item">
            <span class="legend-color occupied"></span> 已占用
          </span>
          <span class="legend-item">
            <span class="legend-color selected"></span> 已选择
          </span>
          <span class="legend-item">
            <span class="legend-color maintenance"></span> 维护中
          </span>
        </div>
        
        <div class="seat-map">
          <div v-for="row in seatRows" :key="row.name" class="seat-row">
            <div class="row-label">{{ row.name }}</div>
            <div class="seats">
              <div
                v-for="seat in row.seats"
                :key="seat.id"
                class="seat"
                :class="[seat.status, { selected: selectedSeat === seat.id }]"
                @click="selectSeat(seat)"
              >
                {{ seat.number }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="selectedSeat" class="booking-summary card fade-in">
        <h3>📝 预约信息</h3>
        <div class="summary-content">
          <div class="summary-item">
            <span class="label">座位号:</span>
            <span class="value">{{ selectedSeat }}</span>
          </div>
          <div class="summary-item">
            <span class="label">日期:</span>
            <span class="value">{{ selectedDate }}</span>
          </div>
          <div class="summary-item">
            <span class="label">时间段:</span>
            <span class="value">{{ getTimeSlotLabel(selectedTimeSlot) }}</span>
          </div>
        </div>
        <div class="action-buttons">
          <button class="btn btn-primary" @click="confirmBooking">确认预约</button>
          <button class="btn btn-outline" @click="cancelSelection">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { bookingStore } from '../store.js'

const selectedDate = ref(new Date().toISOString().split('T')[0])
const selectedTimeSlot = ref('morning')
const selectedSeat = ref(null)

// 初始座位数据（固定的维护状态）
const baseSeatData = [
  {
    name: 'A区',
    seats: [
      { id: 'A-01', number: '01' },
      { id: 'A-02', number: '02' },
      { id: 'A-03', number: '03' },
      { id: 'A-04', number: '04' },
      { id: 'A-05', number: '05' },
      { id: 'A-06', number: '06' },
      { id: 'A-07', number: '07' },
      { id: 'A-08', number: '08' }
    ]
  },
  {
    name: 'B区',
    seats: [
      { id: 'B-01', number: '01' },
      { id: 'B-02', number: '02' },
      { id: 'B-03', number: '03' },
      { id: 'B-04', number: '04' },
      { id: 'B-05', number: '05', maintenance: true },
      { id: 'B-06', number: '06' },
      { id: 'B-07', number: '07' },
      { id: 'B-08', number: '08' }
    ]
  },
  {
    name: 'C区',
    seats: [
      { id: 'C-01', number: '01' },
      { id: 'C-02', number: '02' },
      { id: 'C-03', number: '03' },
      { id: 'C-04', number: '04' },
      { id: 'C-05', number: '05' },
      { id: 'C-06', number: '06' },
      { id: 'C-07', number: '07' },
      { id: 'C-08', number: '08' }
    ]
  },
  {
    name: 'D区',
    seats: [
      { id: 'D-01', number: '01' },
      { id: 'D-02', number: '02' },
      { id: 'D-03', number: '03' },
      { id: 'D-04', number: '04' },
      { id: 'D-05', number: '05' },
      { id: 'D-06', number: '06' },
      { id: 'D-07', number: '07' },
      { id: 'D-08', number: '08', maintenance: true }
    ]
  }
]

// 计算座位状态（根据预约情况动态更新）
const seatRows = computed(() => {
  const bookedSeats = bookingStore.getBookedSeats(selectedDate.value, selectedTimeSlot.value)
  
  return baseSeatData.map(row => ({
    ...row,
    seats: row.seats.map(seat => ({
      ...seat,
      status: seat.maintenance 
        ? 'maintenance' 
        : bookedSeats.includes(seat.id) 
          ? 'occupied' 
          : 'available'
    }))
  }))
})

const selectSeat = (seat) => {
  if (seat.status === 'available') {
    selectedSeat.value = seat.id
  }
}

const cancelSelection = () => {
  selectedSeat.value = null
}

const confirmBooking = () => {
  // 保存预约到store
  const booking = bookingStore.addBooking({
    seat: selectedSeat.value,
    date: selectedDate.value,
    timeSlot: selectedTimeSlot.value,
    time: getTimeSlotLabel(selectedTimeSlot.value)
  })
  
  alert(`预约成功！\n座位: ${selectedSeat.value}\n日期: ${selectedDate.value}\n时间: ${getTimeSlotLabel(selectedTimeSlot.value)}`)
  selectedSeat.value = null
}

const getTimeSlotLabel = (slot) => {
  const labels = {
    morning: '上午 (09:00-12:00)',
    afternoon: '下午 (14:00-18:00)',
    evening: '晚上 (19:00-22:00)',
    allday: '全天 (09:00-22:00)'
  }
  return labels[slot]
}

// 当日期或时间段改变时，清除选择
watch([selectedDate, selectedTimeSlot], () => {
  selectedSeat.value = null
})
</script>

<style scoped>
.booking-page {
  padding: 40px 0;
  min-height: calc(100vh - 60px);
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
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

.booking-controls {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.control-group {
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-group label {
  font-weight: 600;
  font-size: 14px;
}

.input-field {
  padding: 12px 16px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: 14px;
  transition: var(--transition);
}

.input-field:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.seat-map-container {
  margin-bottom: 24px;
}

.seat-map-container h3 {
  margin-bottom: 16px;
  font-size: 20px;
}

.legend {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.legend-color {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 2px solid var(--border-color);
}

.legend-color.available {
  background: linear-gradient(135deg, #10b981, #059669);
}

.legend-color.occupied {
  background: #9ca3af;
}

.legend-color.selected {
  background: linear-gradient(135deg, var(--primary-color), #2563eb);
}

.legend-color.maintenance {
  background: linear-gradient(135deg, var(--accent-color), #d97706);
}

.seat-map {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.seat-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.row-label {
  font-weight: 700;
  font-size: 18px;
  min-width: 60px;
  color: var(--primary-color);
}

.seats {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.seat {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  border: 2px solid transparent;
}

.seat.available {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.seat.available:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-lg);
}

.seat.occupied {
  background: #9ca3af;
  color: white;
  cursor: not-allowed;
}

.seat.maintenance {
  background: linear-gradient(135deg, var(--accent-color), #d97706);
  color: white;
  cursor: not-allowed;
}

.seat.selected {
  background: linear-gradient(135deg, var(--primary-color), #2563eb);
  color: white;
  border-color: #1d4ed8;
  transform: scale(1.1);
  box-shadow: var(--shadow-xl);
}

.booking-summary h3 {
  margin-bottom: 20px;
  font-size: 20px;
}

.summary-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(16, 185, 129, 0.05));
  border-radius: var(--radius-sm);
}

.summary-item .label {
  font-weight: 600;
}

.summary-item .value {
  color: var(--primary-color);
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.action-buttons .btn {
  flex: 1;
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 28px;
  }
  
  .booking-controls {
    flex-direction: column;
  }
  
  .seat {
    width: 50px;
    height: 50px;
    font-size: 14px;
  }
  
  .row-label {
    min-width: 50px;
    font-size: 16px;
  }
}
</style>
