document.addEventListener('DOMContentLoaded', () => {
    // 自动读取并加载学生反馈
    loadStudentFeedback();
});

// 读取本地 xsfk.json 并渲染
function loadStudentFeedback() {
    const container = document.getElementById('feedback-list');
    
    fetch('xsfk.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('无法读取反馈数据文件');
            }
            return response.json();
        })
        .then(data => {
            if (!data || data.length === 0) {
                container.innerHTML = '<p class="loading-text">暂无学生反馈数据。</p>';
                return;
            }
            
            // 清空加载提示
            container.innerHTML = '';
            
            // 循环遍历数据渲染到页面
            data.forEach(item => {
                const feedbackHtml = `
                    <div class="feedback-item">
                        <div class="feedback-header">
                            <div>
                                <span class="feedback-user">${escapeHtml(item.author || '匿名学生')}</span>
                                ${item.campus ? `<span class="feedback-tag">${escapeHtml(item.campus)}</span>` : ''}
                            </div>
                            <span class="feedback-time">${escapeHtml(item.time || '')}</span>
                        </div>
                        <div class="feedback-content">
                            ${escapeHtml(item.content)}
                        </div>
                    </div>
                `;
                container.innerHTML += feedbackHtml;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            container.innerHTML = '<p class="error-text">❌ 反馈数据加载失败，请检查 xsfk.json 是否配置文件或路径正确。</p>';
        });
}

// 简单的防止XSS注入的转义函数
function escapeHtml(string) {
    return String(string).replace(/[&<>"']/g, function (s) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s];
    });
}

// 原有的发邮件逻辑
document.getElementById('rage-btn').addEventListener('click', function() {
    const mailtoUrl = "mailto:admin@cnm34zhongxue.cc.cd?subject=34中吐槽投稿&body=我的吐槽/建议内容：%0A%0A（请在这里写下你的反馈，越详细越好）%0A%0A匿名投稿也可";
    window.location.href = mailtoUrl;
    
    document.body.classList.add('flash-effect');
    setTimeout(() => {
        document.body.classList.remove('flash-effect');
    }, 500);
});
