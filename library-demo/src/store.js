// 简单的状态管理工具
export const bookingStore = {
    // 获取所有预约
    getBookings() {
        const bookings = localStorage.getItem('library_bookings')
        return bookings ? JSON.parse(bookings) : []
    },

    // 添加预约
    addBooking(booking) {
        const bookings = this.getBookings()
        const newBooking = {
            id: Date.now(),
            ...booking,
            createdAt: new Date().toISOString()
        }
        bookings.push(newBooking)
        localStorage.setItem('library_bookings', JSON.stringify(bookings))
        return newBooking
    },

    // 删除预约
    removeBooking(id) {
        const bookings = this.getBookings()
        const filtered = bookings.filter(b => b.id !== id)
        localStorage.setItem('library_bookings', JSON.stringify(filtered))
        return filtered
    },

    // 检查座位是否已被预约
    isSeatBooked(seatId, date, timeSlot) {
        const bookings = this.getBookings()
        return bookings.some(b =>
            b.seat === seatId &&
            b.date === date &&
            (b.timeSlot === timeSlot || b.timeSlot === 'allday' || timeSlot === 'allday')
        )
    },

    // 获取已预约的座位列表
    getBookedSeats(date, timeSlot) {
        const bookings = this.getBookings()
        return bookings
            .filter(b =>
                b.date === date &&
                (b.timeSlot === timeSlot || b.timeSlot === 'allday' || timeSlot === 'allday')
            )
            .map(b => b.seat)
    }
}
