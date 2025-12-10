// 获取DOM元素
const hourHand = document.getElementById('hourHand');
const minuteHand = document.getElementById('minuteHand');
const secondHand = document.getElementById('secondHand');
const digitalTime = document.getElementById('digitalTime');
const dateDisplay = document.getElementById('dateDisplay');

// 星期映射
const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

/**
 * 更新时钟显示
 */
function updateClock() {
    // 获取当前时间
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    // 计算指针旋转角度
    // 秒针: 每秒6度 (360度 / 60秒)
    // 添加毫秒使秒针移动更平滑
    const secondDegrees = ((seconds + milliseconds / 1000) * 6);

    // 分针: 每分钟6度,加上秒针的影响
    const minuteDegrees = ((minutes + seconds / 60) * 6);

    // 时针: 每小时30度 (360度 / 12小时),加上分针的影响
    const hourDegrees = ((hours % 12 + minutes / 60) * 30);

    // 应用旋转变换
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;

    // 更新数字时间显示
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    digitalTime.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    // 更新日期显示
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const weekDay = weekDays[now.getDay()];
    dateDisplay.textContent = `${year}年${month}月${date}日 ${weekDay}`;
}

/**
 * 初始化时钟
 */
function initClock() {
    // 立即更新一次
    updateClock();

    // 每秒更新一次
    setInterval(updateClock, 1000);
}

// 页面加载完成后初始化时钟
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initClock);
} else {
    initClock();
}

// 添加页面可见性变化监听,确保页面重新可见时时钟是准确的
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        updateClock();
    }
});
