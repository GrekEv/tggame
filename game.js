// Игровые данные
const gameData = {
    players: {
        kirill: {
            name: 'КИРИЛЛ',
            level: 1,
            xp: 0,
            coins: 0,
            hairColor: '#8B4513',
            clothesColor: '#3498db',
            accessories: [],
            completedAchievements: [],
            defeatedBosses: [],
            unlockedLocations: ['forest']
        },
        yulya: {
            name: 'ЮЛЯ',
            level: 1,
            xp: 0,
            coins: 0,
            hairColor: '#FFD700',
            clothesColor: '#e91e63',
            accessories: [],
            completedAchievements: [],
            defeatedBosses: [],
            unlockedLocations: ['forest']
        }
    },
    currentPlayer: 'kirill',
    
    achievements: [
        { id: 'wake_early', name: 'Ранняя пташка', desc: 'Проснуться до 7 утра', points: 10, difficulty: 'easy' },
        { id: 'exercise', name: 'Зарядка', desc: 'Сделать зарядку', points: 15, difficulty: 'easy' },
        { id: 'read_book', name: 'Книжный червь', desc: 'Прочитать 10 страниц', points: 20, difficulty: 'easy' },
        { id: 'meditation', name: 'Дзен', desc: 'Помедитировать 10 минут', points: 15, difficulty: 'easy' },
        { id: 'healthy_meal', name: 'Здоровое питание', desc: 'Съесть здоровый обед', points: 12, difficulty: 'easy' },
        { id: 'water_intake', name: 'Водный баланс', desc: 'Выпить 2 литра воды', points: 10, difficulty: 'easy' },
        { id: 'no_social', name: 'Цифровой детокс', desc: 'Не заходить в соцсети до обеда', points: 25, difficulty: 'medium' },
        { id: 'learn_skill', name: 'Новый навык', desc: 'Учить новый навык 1 час', points: 30, difficulty: 'medium' },
        { id: 'workout', name: 'Тренировка', desc: 'Тренировка в зале', points: 35, difficulty: 'medium' },
        { id: 'cook_meal', name: 'Шеф-повар', desc: 'Приготовить новое блюдо', points: 20, difficulty: 'medium' },
        { id: 'write_journal', name: 'Дневник', desc: 'Написать в дневнике', points: 15, difficulty: 'medium' },
        { id: 'help_someone', name: 'Доброе дело', desc: 'Помочь кому-то', points: 25, difficulty: 'medium' },
        { id: 'project_progress', name: 'Прогресс проекта', desc: 'Сделать значительный прогресс в проекте', points: 50, difficulty: 'hard' },
        { id: 'marathon', name: 'Марафонец', desc: 'Пробежать 5 км', points: 60, difficulty: 'hard' },
        { id: 'master_class', name: 'Мастер-класс', desc: 'Провести мастер-класс', points: 75, difficulty: 'hard' },
        { id: 'big_goal', name: 'Большая цель', desc: 'Достичь крупной цели', points: 100, difficulty: 'hard' },
        { id: 'week_streak', name: 'Неделя подряд', desc: 'Выполнять достижения 7 дней подряд', points: 80, difficulty: 'hard' },
        { id: 'month_streak', name: 'Месяц силы', desc: 'Выполнять достижения 30 дней подряд', points: 200, difficulty: 'hard' }
    ],
    
    shopItems: {
        upgrades: [
            { id: 'xp_boost', name: 'Усилитель опыта', desc: '+20% опыта за достижения', price: 100, type: 'upgrade' },
            { id: 'coin_boost', name: 'Усилитель монет', desc: '+30% монет за уровень', price: 150, type: 'upgrade' },
            { id: 'double_xp', name: 'Двойной опыт', desc: 'Двойной опыт на 24 часа', price: 200, type: 'consumable' }
        ],
        items: [
            { id: 'health_potion', name: 'Зелье здоровья', desc: 'Восстанавливает здоровье в битве', price: 50, type: 'item' },
            { id: 'strength_potion', name: 'Зелье силы', desc: '+10 к силе в битве', price: 75, type: 'item' },
            { id: 'defense_shield', name: 'Щит защиты', desc: '+15 к защите в битве', price: 120, type: 'item' },
            { id: 'lucky_charm', name: 'Талисман удачи', desc: '+5% к шансу критического удара', price: 200, type: 'item' }
        ],
        cosmetics: [
            { id: 'hat_crown', name: 'Корона', desc: 'Золотая корона', price: 300, type: 'cosmetic' },
            { id: 'hat_cap', name: 'Кепка', desc: 'Стильная кепка', price: 150, type: 'cosmetic' },
            { id: 'glasses', name: 'Очки', desc: 'Крутые очки', price: 100, type: 'cosmetic' },
            { id: 'cape', name: 'Плащ', desc: 'Геройский плащ', price: 250, type: 'cosmetic' }
        ]
    },
    
    bosses: [
        { id: 'lazy_boss', name: 'Босс Лени', level: 5, sprite: '😴', reward: 100 },
        { id: 'procrastination_boss', name: 'Босс Прокрастинации', level: 10, sprite: '⏰', reward: 200 },
        { id: 'doubt_boss', name: 'Босс Сомнений', level: 15, sprite: '🤔', reward: 300 },
        { id: 'fear_boss', name: 'Босс Страха', level: 20, sprite: '👻', reward: 500 },
        { id: 'final_boss', name: 'Финальный Босс', level: 30, sprite: '👹', reward: 1000 }
    ],
    
    locations: [
        { id: 'forest', name: 'Лес', level: 1, sprite: '🌲', unlocked: true },
        { id: 'mountain', name: 'Гора', level: 5, sprite: '⛰️', unlocked: false },
        { id: 'ocean', name: 'Океан', level: 10, sprite: '🌊', unlocked: false },
        { id: 'desert', name: 'Пустыня', level: 15, sprite: '🏜️', unlocked: false },
        { id: 'castle', name: 'Замок', level: 20, sprite: '🏰', unlocked: false },
        { id: 'space', name: 'Космос', level: 25, sprite: '🚀', unlocked: false }
    ]
};

// Инициализация игры
function initGame() {
    loadGameData();
    setupEventListeners();
    renderAchievements();
    renderCharacter();
    renderShop();
    renderBosses();
    renderLocations();
    updatePlayerStats();
}

// Загрузка данных из localStorage
function loadGameData() {
    const saved = localStorage.getItem('ochivki_game_data');
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(gameData.players, parsed.players || {});
        gameData.currentPlayer = parsed.currentPlayer || 'kirill';
    }
}

// Сохранение данных в localStorage
function saveGameData() {
    localStorage.setItem('ochivki_game_data', JSON.stringify({
        players: gameData.players,
        currentPlayer: gameData.currentPlayer
    }));
}

// Получение текущего игрока
function getCurrentPlayer() {
    return gameData.players[gameData.currentPlayer];
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Переключение персонажей
    document.getElementById('selectKirill').addEventListener('click', () => switchPlayer('kirill'));
    document.getElementById('selectYulya').addEventListener('click', () => switchPlayer('yulya'));
    
    // Навигация по вкладкам
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tab = e.target.dataset.tab;
            switchTab(tab);
        });
    });
    
    // Фильтры достижений
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const filter = e.target.dataset.filter;
            renderAchievements(filter);
        });
    });
    
    // Категории магазина
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const category = e.target.dataset.category;
            renderShop(category);
        });
    });
    
    // Модальное окно
    const modal = document.getElementById('achievementModal');
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    document.getElementById('confirmAchievement').addEventListener('click', confirmAchievement);
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Переключение персонажа
function switchPlayer(playerId) {
    gameData.currentPlayer = playerId;
    document.querySelectorAll('.player-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`select${playerId.charAt(0).toUpperCase() + playerId.slice(1)}`).classList.add('active');
    updatePlayerStats();
    renderAchievements();
    renderCharacter();
    saveGameData();
}

// Переключение вкладок
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-${tabName}`).classList.add('active');
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}

// Обновление статистики игрока
function updatePlayerStats() {
    const player = getCurrentPlayer();
    document.getElementById('playerLevel').textContent = player.level;
    document.getElementById('playerXP').textContent = player.xp;
    document.getElementById('playerXPNeeded').textContent = getXPNeeded(player.level);
    document.getElementById('playerCoins').textContent = player.coins;
    document.getElementById('characterName').textContent = player.name;
}

// Получение необходимого опыта для уровня
function getXPNeeded(level) {
    return Math.floor(100 * Math.pow(1.5, level - 1));
}

// Добавление опыта
function addXP(amount) {
    const player = getCurrentPlayer();
    player.xp += amount;
    
    // Проверка повышения уровня
    while (player.xp >= getXPNeeded(player.level)) {
        player.xp -= getXPNeeded(player.level);
        player.level++;
        const coinsEarned = Math.floor(50 * player.level);
        player.coins += coinsEarned;
        
        // Анимация повышения уровня
        showLevelUpAnimation(coinsEarned);
    }
    
    updatePlayerStats();
    saveGameData();
}

// Анимация повышения уровня
function showLevelUpAnimation(coins) {
    const levelEl = document.getElementById('playerLevel');
    levelEl.classList.add('level-up');
    setTimeout(() => levelEl.classList.remove('level-up'), 500);
    
    // Показываем уведомление
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 2000;
        font-weight: bold;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;
    notification.textContent = `🎉 Уровень повышен! +${coins} монет`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Рендеринг достижений
function renderAchievements(filter = 'all') {
    const container = document.getElementById('achievementsList');
    const player = getCurrentPlayer();
    container.innerHTML = '';
    
    let filteredAchievements = gameData.achievements;
    if (filter !== 'all') {
        filteredAchievements = gameData.achievements.filter(a => a.difficulty === filter);
    }
    
    filteredAchievements.forEach(achievement => {
        const isCompleted = player.completedAchievements.some(ca => ca.id === achievement.id);
        const card = document.createElement('div');
        card.className = `achievement-card ${isCompleted ? 'completed' : ''}`;
        
        const completedInfo = isCompleted 
            ? player.completedAchievements.find(ca => ca.id === achievement.id)
            : null;
        
        card.innerHTML = `
            <div class="achievement-info">
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.desc}</div>
                <div class="achievement-meta">
                    <span class="difficulty-badge difficulty-${achievement.difficulty}">
                        ${achievement.difficulty === 'easy' ? 'Легко' : achievement.difficulty === 'medium' ? 'Средне' : 'Сложно'}
                    </span>
                    <span class="achievement-points">+${achievement.points} очков</span>
                    ${completedInfo ? `<span>✅ Выполнено: ${new Date(completedInfo.date).toLocaleDateString('ru-RU')}</span>` : ''}
                </div>
            </div>
            <div class="achievement-actions">
                ${!isCompleted ? `<button class="btn-primary" onclick="openAchievementModal('${achievement.id}')">Отметить</button>` : ''}
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Открытие модального окна для отметки достижения
function openAchievementModal(achievementId) {
    const achievement = gameData.achievements.find(a => a.id === achievementId);
    const modal = document.getElementById('achievementModal');
    
    document.getElementById('modalAchievementName').textContent = achievement.name;
    document.getElementById('modalAchievementDesc').textContent = achievement.desc;
    document.getElementById('achievementDate').value = new Date().toISOString().split('T')[0];
    modal.dataset.achievementId = achievementId;
    
    modal.classList.add('active');
}

// Подтверждение выполнения достижения
function confirmAchievement() {
    const modal = document.getElementById('achievementModal');
    const achievementId = modal.dataset.achievementId;
    const date = document.getElementById('achievementDate').value;
    
    if (!date) {
        alert('Выберите дату выполнения!');
        return;
    }
    
    const player = getCurrentPlayer();
    const achievement = gameData.achievements.find(a => a.id === achievementId);
    
    // Проверка, не выполнено ли уже сегодня
    const today = new Date().toDateString();
    const todayCompleted = player.completedAchievements.some(ca => 
        ca.id === achievementId && new Date(ca.date).toDateString() === today
    );
    
    if (todayCompleted) {
        alert('Это достижение уже выполнено сегодня!');
        modal.classList.remove('active');
        return;
    }
    
    // Добавление достижения
    player.completedAchievements.push({
        id: achievementId,
        date: date,
        points: achievement.points
    });
    
    // Добавление опыта
    addXP(achievement.points);
    
    modal.classList.remove('active');
    renderAchievements();
    saveGameData();
    
    // Уведомление
    showNotification(`✅ Достижение "${achievement.name}" выполнено! +${achievement.points} опыта`);
}

// Рендеринг персонажа
function renderCharacter() {
    const player = getCurrentPlayer();
    const sprite = document.getElementById('characterSprite');
    
    // Простой пиксельный спрайт (можно заменить на реальные спрайты)
    sprite.style.background = player.clothesColor;
    sprite.innerHTML = '👤';
    
    // Цвета волос
    const hairPicker = document.getElementById('hairColorPicker');
    hairPicker.innerHTML = '';
    const hairColors = ['#8B4513', '#000000', '#FFD700', '#FF69B4', '#00CED1', '#FF4500'];
    hairColors.forEach(color => {
        const option = document.createElement('div');
        option.className = `color-option ${player.hairColor === color ? 'selected' : ''}`;
        option.style.background = color;
        option.addEventListener('click', () => {
            player.hairColor = color;
            document.querySelectorAll('#hairColorPicker .color-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            saveGameData();
        });
        hairPicker.appendChild(option);
    });
    
    // Цвета одежды
    const clothesPicker = document.getElementById('clothesColorPicker');
    clothesPicker.innerHTML = '';
    const clothesColors = ['#3498db', '#e91e63', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
    clothesColors.forEach(color => {
        const option = document.createElement('div');
        option.className = `color-option ${player.clothesColor === color ? 'selected' : ''}`;
        option.style.background = color;
        option.addEventListener('click', () => {
            player.clothesColor = color;
            document.querySelectorAll('#clothesColorPicker .color-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            sprite.style.background = color;
            saveGameData();
        });
        clothesPicker.appendChild(option);
    });
    
    // Аксессуары
    const accessoriesList = document.getElementById('accessoriesList');
    accessoriesList.innerHTML = '';
    const allAccessories = [
        { id: 'none', name: 'Нет', price: 0 },
        ...gameData.shopItems.cosmetics
    ];
    
    allAccessories.forEach(acc => {
        const item = document.createElement('div');
        const isOwned = acc.price === 0 || player.accessories.includes(acc.id);
        const isEquipped = player.accessories.includes(acc.id);
        
        item.className = `accessory-item ${isOwned ? 'owned' : ''} ${isEquipped ? 'equipped' : ''}`;
        item.textContent = acc.name;
        
        if (isOwned) {
            item.addEventListener('click', () => {
                if (isEquipped) {
                    player.accessories = player.accessories.filter(a => a !== acc.id);
                } else {
                    if (acc.id !== 'none') {
                        player.accessories.push(acc.id);
                    }
                }
                renderCharacter();
                saveGameData();
            });
        } else {
            item.style.opacity = '0.5';
            item.textContent += ` (${acc.price}💰)`;
        }
        
        accessoriesList.appendChild(item);
    });
}

// Рендеринг магазина
function renderShop(category = 'upgrades') {
    const container = document.getElementById('shopItems');
    const player = getCurrentPlayer();
    container.innerHTML = '';
    
    const items = gameData.shopItems[category] || [];
    
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'shop-item';
        
        const isOwned = player.accessories && player.accessories.includes(item.id);
        
        card.innerHTML = `
            <div class="shop-item-info">
                <div class="shop-item-name">${item.name}</div>
                <div class="shop-item-desc">${item.desc}</div>
                <div class="shop-item-price">💰 ${item.price} монет</div>
            </div>
            <div class="shop-item-actions">
                <button class="btn-primary" ${player.coins < item.price || isOwned ? 'disabled' : ''} 
                    onclick="buyItem('${item.id}', '${category}')">
                    ${isOwned ? 'Куплено' : 'Купить'}
                </button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Покупка предмета
function buyItem(itemId, category) {
    const player = getCurrentPlayer();
    const items = gameData.shopItems[category];
    const item = items.find(i => i.id === itemId);
    
    if (!item) return;
    
    if (player.coins < item.price) {
        showNotification('Недостаточно монет!');
        return;
    }
    
    player.coins -= item.price;
    
    if (category === 'cosmetics') {
        if (!player.accessories) player.accessories = [];
        player.accessories.push(itemId);
    }
    
    updatePlayerStats();
    renderShop(category);
    renderCharacter();
    saveGameData();
    
    showNotification(`✅ Куплено: ${item.name}`);
}

// Рендеринг боссов
function renderBosses() {
    const container = document.getElementById('bossesList');
    const player = getCurrentPlayer();
    container.innerHTML = '';
    
    gameData.bosses.forEach(boss => {
        const isDefeated = player.defeatedBosses && player.defeatedBosses.includes(boss.id);
        const canFight = player.level >= boss.level;
        
        const card = document.createElement('div');
        card.className = `boss-card ${isDefeated ? 'defeated' : ''}`;
        
        card.innerHTML = `
            <div class="boss-sprite">${boss.sprite}</div>
            <div class="boss-name">${boss.name}</div>
            <div class="boss-level">Уровень: ${boss.level}</div>
            <div style="margin-top: 10px;">
                ${isDefeated ? '<span style="color: #27ae60;">✅ Побежден</span>' : 
                  canFight ? `<button class="btn-primary" onclick="fightBoss('${boss.id}')">Сразиться</button>` :
                  '<span style="color: #e74c3c;">Требуется уровень ' + boss.level + '</span>'}
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Битва с боссом
function fightBoss(bossId) {
    const player = getCurrentPlayer();
    const boss = gameData.bosses.find(b => b.id === bossId);
    
    if (player.level < boss.level) {
        showNotification('Недостаточный уровень!');
        return;
    }
    
    if (player.defeatedBosses && player.defeatedBosses.includes(bossId)) {
        showNotification('Этот босс уже побежден!');
        return;
    }
    
    // Простая механика битвы (можно улучшить)
    const winChance = Math.min(0.5 + (player.level - boss.level) * 0.1, 0.9);
    const won = Math.random() < winChance;
    
    if (won) {
        if (!player.defeatedBosses) player.defeatedBosses = [];
        player.defeatedBosses.push(bossId);
        player.coins += boss.reward;
        addXP(boss.reward);
        showNotification(`🎉 Победа над ${boss.name}! +${boss.reward} монет и опыта`);
        renderBosses();
        updatePlayerStats();
        saveGameData();
    } else {
        showNotification(`💔 Поражение от ${boss.name}. Попробуйте еще раз!`);
    }
}

// Рендеринг локаций
function renderLocations() {
    const container = document.getElementById('locationsList');
    const player = getCurrentPlayer();
    container.innerHTML = '';
    
    gameData.locations.forEach(location => {
        const isUnlocked = player.unlockedLocations && player.unlockedLocations.includes(location.id);
        const canUnlock = player.level >= location.level && !isUnlocked;
        
        const card = document.createElement('div');
        card.className = `location-card ${isUnlocked ? 'unlocked' : ''}`;
        
        card.innerHTML = `
            <div class="location-sprite">${location.sprite}</div>
            <div class="location-name">${location.name}</div>
            <div class="location-level">Уровень: ${location.level}</div>
            ${isUnlocked ? '<span style="color: #27ae60;">✅ Открыта</span>' :
              canUnlock ? `<button class="btn-primary" onclick="unlockLocation('${location.id}')">Открыть</button>` :
              '<span style="color: #7f8c8d;">Требуется уровень ' + location.level + '</span>'}
        `;
        
        container.appendChild(card);
    });
}

// Открытие локации
function unlockLocation(locationId) {
    const player = getCurrentPlayer();
    const location = gameData.locations.find(l => l.id === locationId);
    
    if (player.level < location.level) {
        showNotification('Недостаточный уровень!');
        return;
    }
    
    if (player.unlockedLocations && player.unlockedLocations.includes(locationId)) {
        showNotification('Локация уже открыта!');
        return;
    }
    
    if (!player.unlockedLocations) player.unlockedLocations = [];
    player.unlockedLocations.push(locationId);
    
    showNotification(`🗺️ Локация "${location.name}" открыта!`);
    renderLocations();
    saveGameData();
}

// Показ уведомления
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2c3e50;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 2000;
        font-weight: bold;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', initGame);