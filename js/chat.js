// 添加移动端适配功能
function initMobileOptimization() {
  // 处理软键盘弹出时的视口调整
  const chatInput = document.querySelector && document.querySelector('.chat-input');
  const chatMessages = document.querySelector && document.querySelector('.chat-messages');
  
  if (chatInput && chatMessages) {
    // 监听输入框聚焦事件
    chatInput.addEventListener('focus', () => {
      // 给内容区域添加额外底部padding，防止键盘覆盖
      setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 300);
    });

    // 监听窗口大小变化
    window.addEventListener('resize', () => {
      setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 100);
    });
  }
  
  // 检测设备类型
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) {
    document.body.classList.add('mobile-device');
  }
  
  // 适配全面屏
  function setupSafeArea() {
    document.documentElement.style.setProperty(
      '--safe-area-inset-bottom', 
      'env(safe-area-inset-bottom)'
    );
  }
  
  setupSafeArea();
}

// 添加触摸反馈效果
function addTouchFeedback() {
  const buttons = document.querySelectorAll && document.querySelectorAll('button, .clickable-item');
  
  buttons.forEach(button => {
    button.addEventListener('touchstart', () => {
      button.classList.add('touch-active');
    });
    
    ['touchend', 'touchcancel'].forEach(event => {
      button.addEventListener(event, () => {
        button.classList.remove('touch-active');
      });
    });
  });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  // ...existing code...
  
  // 调用移动端优化函数
  initMobileOptimization();
  addTouchFeedback();
});