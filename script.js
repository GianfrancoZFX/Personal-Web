document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM完全加载，开始初始化...');
    
    // 初始化轮播图
    initCarousel();
    
    // 初始化数据可视化图表
    console.log('开始初始化图表...');
    initCharts();
    console.log('图表初始化完成');
    
    // 初始化社交媒体图标点击事件
    initSocialIcons();
    
    // 初始化AI聊天功能
    initAIChat();
});

// 轮播图功能
function initCarousel() {
    // 轮播图数据 - 周方雄的代表作品
    const carouselData = [
        {
            image: 'images/carousel/creative_video.jpg',
            title: '《民大版"爱情公寓"》',
            description: '创意短视频',
            link: 'https://v.douyin.com/i5XP4B53/'
        },
        {
            image: 'images/carousel/data_news.jpg',
            title: '《2024民大新媒成绩单》',
            description: '数据新闻',
            link: 'https://dycharts.com/xshow/index.html?id=d56111e01c0f948fa72418d66ae60755'
        },
        {
            image: 'images/carousel/snow_video.jpg',
            title: '《初雪·民大》',
            description: '风景短视频',
            link: 'https://v.douyin.com/i5XPDXkB/'
        },
        {
            image: 'images/carousel/news_report.jpg',
            title: '《兰州11·6交通事故调查》',
            description: '融合新闻',
            link: 'https://g.h5gdvip.com/p/dafj4hfh'
        },
        {
            image: 'images/carousel/travel_poster.jpg',
            title: '《一碗面·一座城》',
            description: '文旅海报',
            link: 'https://h5.clewm.net/?url=qr61.cn%2Fos73LX%2FqomUMPS'
        }
    ];
    
    const carousel = document.querySelector('.carousel');
    let currentIndex = 0;
    
    // 生成轮播图内容
    carouselData.forEach(item => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        carouselItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="carousel-item-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        
        // 添加点击事件，跳转到对应链接
        carouselItem.addEventListener('click', function() {
            window.open(item.link, '_blank');
        });
        
        carousel.appendChild(carouselItem);
    });
    
    // 轮播图控制按钮
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    // 上一张
    prevButton.addEventListener('click', function(e) {
        e.stopPropagation(); // 阻止事件冒泡
        currentIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
        updateCarousel();
    });
    
    // 下一张
    nextButton.addEventListener('click', function(e) {
        e.stopPropagation(); // 阻止事件冒泡
        currentIndex = (currentIndex + 1) % carouselData.length;
        updateCarousel();
    });
    
    // 自动轮播
    let autoplayInterval = setInterval(function() {
        currentIndex = (currentIndex + 1) % carouselData.length;
        updateCarousel();
    }, 5000);
    
    // 鼠标悬停时暂停自动轮播
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', function() {
        clearInterval(autoplayInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', function() {
        autoplayInterval = setInterval(function() {
            currentIndex = (currentIndex + 1) % carouselData.length;
            updateCarousel();
        }, 5000);
    });
    
    // 更新轮播图位置
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
}

// 数据可视化图表
function initCharts() {
    // 作品类型分布图表
    const workTypeCtx = document.getElementById('workTypeChart').getContext('2d');
    const workTypeChart = new Chart(workTypeCtx, {
        type: 'pie',
        data: {
            labels: ['视频作品', '推文作品', 'H5作品', 'AI作品'],
            datasets: [{
                data: [73.5, 9.5, 9.5, 7.5],
                backgroundColor: [
                    '#3498db',
                    '#2ecc71',
                    '#f1c40f',
                    '#e74c3c'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.2,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 13
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(44, 62, 80, 0.95)',
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });
    
    // 观众互动数据展示
    const engagementContainer = document.querySelector('.engagement-stats');
    const stats = [
        { 
            label: '播放量', 
            value: '2,748,923', 
            rawValue: 2748923,
            detail: '日均增长: 约3,500次播放',
            trend: '+15.2%' 
        },
        { 
            label: '点赞量', 
            value: '26,216', 
            rawValue: 26216,
            detail: '点赞率: 0.95%',
            trend: '+8.7%' 
        },
        { 
            label: '评论量', 
            value: '2,094', 
            rawValue: 2094,
            detail: '互动率: 0.08%',
            trend: '+12.3%' 
        },
        { 
            label: '收藏量', 
            value: '12,710', 
            rawValue: 12710,
            detail: '收藏率: 0.46%',
            trend: '+10.5%' 
        }
    ];
    
    engagementContainer.innerHTML = stats.map(stat => `
        <div class="stat-item" data-value="${stat.rawValue}" data-detail="${stat.detail}" data-trend="${stat.trend}">
            <div class="stat-value" style="font-size: 1.8rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
            <div class="stat-detail">
                <div class="stat-full-value">总计: ${stat.value}</div>
                <div class="stat-trend">${stat.trend}</div>
                <div class="stat-extra-info">${stat.detail}</div>
            </div>
        </div>
    `).join('');
    
    // 年度作品数量图表
    const yearlyProductionCtx = document.getElementById('yearlyProductionChart').getContext('2d');
    const yearlyProductionChart = new Chart(yearlyProductionCtx, {
        type: 'line',
        data: {
            labels: ['2023', '2024', '2025'],
            datasets: [{
                label: '作品数量',
                data: [8, 25, 19],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(44, 62, 80, 0.95)',
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        title: function(context) {
                            return `${context[0].label}年度数据`;
                        },
                        label: function(context) {
                            const value = context.raw;
                            return `作品总数: ${value} 件`;
                        },
                        afterLabel: function(context) {
                            const year = context.label;
                            const value = context.raw;
                            const details = {
                                '2023': '主要作品类型: 短视频 (75%)',
                                '2024': '主要作品类型: 短视频 (60%), H5作品 (20%)',
                                '2025': '预计作品类型: 短视频 (50%), AI作品 (30%)'
                            };
                            const growth = {
                                '2023': '',
                                '2024': `同比增长: +${((25-8)/8*100).toFixed(1)}%`,
                                '2025': `预计同比: ${((19-25)/25*100).toFixed(1)}%`
                            };
                            return [details[year], growth[year]].filter(Boolean);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// 社交媒体图标点击事件
function initSocialIcons() {
    const socialIcons = document.querySelectorAll('.social-icon');
    const contactPopup = document.getElementById('contactPopup');
    const popupTitle = document.getElementById('popupTitle');
    const popupContent = document.getElementById('popupContent');
    const closePopup = document.querySelector('.close-popup');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-platform');
            const contact = this.getAttribute('data-contact');
            
            popupTitle.textContent = `${platform}联系方式`;
            popupContent.textContent = contact;
            
            contactPopup.style.display = 'flex';
        });
    });
    
    closePopup.addEventListener('click', function() {
        contactPopup.style.display = 'none';
    });
    
    // 点击弹窗外部区域关闭弹窗
    contactPopup.addEventListener('click', function(e) {
        if (e.target === contactPopup) {
            contactPopup.style.display = 'none';
        }
    });
}

// AI聊天功能
function initAIChat() {
    const chatMessages = document.getElementById('chatMessages');
    const userMessageInput = document.getElementById('userMessage');
    const sendMessageButton = document.getElementById('sendMessage');
    
    // 发送消息事件
    function sendMessage() {
        const userMessage = userMessageInput.value.trim();
        if (userMessage === '') return;
        
        // 添加用户消息到聊天窗口
        addMessage(userMessage, 'user');
        
        // 清空输入框
        userMessageInput.value = '';
        
        // 显示加载状态
        const loadingElement = document.createElement('div');
        loadingElement.className = 'message ai loading';
        loadingElement.innerHTML = '<p>思考中...</p>';
        chatMessages.appendChild(loadingElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // 尝试调用DeepSeek API获取回复，如果失败则使用本地回复
        callDeepseekAPI(userMessage).then(response => {
            // 移除加载状态
            chatMessages.removeChild(loadingElement);
            // 添加AI回复
            addMessage(response, 'ai');
        }).catch(error => {
            console.error('API调用失败，使用本地回复:', error);
            // 移除加载状态
            chatMessages.removeChild(loadingElement);
            // 使用本地回复
            const localResponse = getAIResponse(userMessage);
            addMessage(localResponse, 'ai');
        });
    }
    
    // 添加消息到聊天窗口
    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}`;
        messageElement.innerHTML = `<p>${message}</p>`;
        
        chatMessages.appendChild(messageElement);
        
        // 滚动到最新消息
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // 模拟AI回复（实际项目中应替换为deepseek API调用）
    function getAIResponse(userMessage) {
        // 这里是简单的模拟回复逻辑
        // 实际项目中应该替换为API调用
        const responses = {
            '你好': '你好！很高兴为你提供帮助。',
            '你是谁': '我是AI助手，可以回答关于这位传媒工作者的相关问题。',
            '联系方式': '您可以通过页面底部的社交媒体图标查看联系方式。',
            '作品': '您可以在作品展示区查看精选作品，点击图片可以查看详情。',
            '经历': '这位传媒工作者有多年行业经验，参与过多个重要项目，获得过多项行业奖项。'
        };
        
        // 检查是否有匹配的关键词
        for (const keyword in responses) {
            if (userMessage.includes(keyword)) {
                return responses[keyword];
            }
        }
        
        // 默认回复
        return '感谢您的提问。这个问题很有趣，我需要更多信息来提供准确的回答。您可以尝试询问关于作品、经历或联系方式的问题。';
    }
    
    // 发送按钮点击事件
    sendMessageButton.addEventListener('click', sendMessage);
    
    // 输入框回车事件
    userMessageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // DeepSeek API调用函数
    async function callDeepseekAPI(userMessage) {
        try {
            const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer sk-5c497d87ee8a4af092d6e1e763598394'
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: [
                        {role: 'system', content: '你是周方雄的AI助手，可以回答关于他的作品、经历、技能和专业知识的问题。请提供友好、专业且有帮助的回答。'},
                        {role: 'user', content: userMessage}
                    ],
                    temperature: 0.7,
                    max_tokens: 800
                })
            });
            
            if (!response.ok) {
                throw new Error(`API响应错误: ${response.status}`);
            }
            
            const data = await response.json();
            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                throw new Error('API返回数据格式错误');
            }
            
            return data.choices[0].message.content;
        } catch (error) {
            console.error('调用API出错:', error);
            throw error; // 向上抛出错误，让调用者处理
        }
    }
}