document.getElementById('rage-btn').addEventListener('click', function() {
    window.location.href = "mailto:admin@cnm34zhongxue.cc.cd?subject=34中吐槽投稿&body=我的吐槽/建议内容：%0A%0A（请在这里写下你的反馈，越详细越好）%0A%0A匿名投稿也可";
    
    // 点击后的轻微视觉反馈
    document.body.style.transition = 'background 0.4s';
    document.body.style.background = '#331111';
    setTimeout(() => {
        document.body.style.background = '#1f0a0a';
    }, 400);
});