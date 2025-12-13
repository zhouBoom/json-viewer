// 获取 DOM 元素
const amountButtons = document.querySelectorAll('.amount-btn');
const customInput = document.getElementById('customAmount');
const selectedAmountDiv = document.getElementById('selectedAmount');
const selectedValueSpan = document.getElementById('selectedValue');
const payBtn = document.getElementById('payBtn');
const successModal = document.getElementById('successModal');
const successAmountSpan = document.getElementById('successAmount');
const closeBtn = document.getElementById('closeBtn');

// 当前选择的金额
let currentAmount = 0;

// 预设金额按钮点击事件
amountButtons.forEach(button => {
    button.addEventListener('click', function () {
        // 移除所有按钮的激活状态
        amountButtons.forEach(btn => btn.classList.remove('active'));

        // 添加当前按钮的激活状态
        this.classList.add('active');

        // 获取金额
        currentAmount = parseInt(this.dataset.amount);

        // 清空自定义输入
        customInput.value = '';

        // 更新显示
        updateSelectedAmount();
    });
});

// 自定义金额输入事件
customInput.addEventListener('input', function () {
    // 移除所有按钮的激活状态
    amountButtons.forEach(btn => btn.classList.remove('active'));

    // 获取输入的金额
    let inputValue = parseFloat(this.value);

    // 限制最大值
    if (inputValue > 99999999) {
        inputValue = 99999999;
        this.value = 99999999;
    }

    if (inputValue && inputValue > 0) {
        currentAmount = inputValue;
    } else {
        currentAmount = 0;
    }

    // 更新显示
    updateSelectedAmount();
});

// 更新选择金额显示
function updateSelectedAmount() {
    if (currentAmount > 0) {
        selectedValueSpan.textContent = `¥${currentAmount}`;
        selectedAmountDiv.classList.add('has-value');
        payBtn.disabled = false;
    } else {
        selectedValueSpan.textContent = '请选择金额';
        selectedAmountDiv.classList.remove('has-value');
        payBtn.disabled = true;
    }
}

// 支付按钮点击事件
payBtn.addEventListener('click', function () {
    if (currentAmount > 0) {
        // 显示成功提示
        successAmountSpan.textContent = `¥${currentAmount}`;
        successModal.classList.add('show');

        // 重置选择
        setTimeout(() => {
            resetSelection();
        }, 300);
    }
});

// 关闭成功提示
closeBtn.addEventListener('click', function () {
    successModal.classList.remove('show');
});

// 点击模态框背景关闭
successModal.addEventListener('click', function (e) {
    if (e.target === successModal) {
        successModal.classList.remove('show');
    }
});

// 重置选择状态
function resetSelection() {
    currentAmount = 0;
    amountButtons.forEach(btn => btn.classList.remove('active'));
    customInput.value = '';
    selectedValueSpan.textContent = '请选择金额';
    selectedAmountDiv.classList.remove('has-value');
    payBtn.disabled = true;
}

// 防止输入负数和小数点后超过2位
customInput.addEventListener('keydown', function (e) {
    // 允许: backspace, delete, tab, escape, enter
    if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
        // 允许: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // 允许: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        return;
    }

    // 确保只能输入数字
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function () {
    console.log('捐赠页面已加载完成');
});
