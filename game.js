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
            unlockedLocations: ['forest'],
            // Боевые статы
            stats: {
                attack: 25,
                defense: 10,
                health: 100,
                maxHealth: 100,
                crit: 5 // шанс крита в %
            },
            equipment: {
                weapon: null,
                helmet: null,
                armor: null,
                boots: null,
                accessory: null
            },
            inventory: [],
            currentEnemy: null,
            accumulatedDamage: 0 // Накопленный урон за достижения
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
            unlockedLocations: ['forest'],
            // Боевые статы
            stats: {
                attack: 25,
                defense: 10,
                health: 100,
                maxHealth: 100,
                crit: 5
            },
            equipment: {
                weapon: null,
                helmet: null,
                armor: null,
                boots: null,
                accessory: null
            },
            inventory: [],
            currentEnemy: null,
            accumulatedDamage: 0 // Накопленный урон за достижения
        }
    },
    currentPlayer: 'kirill',
    
    achievements: [
        // Легкие достижения (5-7 очков)
        { id: 'morning_exercise', name: 'Утренняя зарядка', desc: 'Утренняя зарядка, растяжка', points: 5, difficulty: 'easy' },
        { id: 'vitamins', name: 'Витамины', desc: 'Выпить витамины', points: 5, difficulty: 'easy' },
        { id: 'healthy_nutrition', name: 'Правильное питание', desc: 'Правильно питаться день', points: 7, difficulty: 'easy' },
        { id: 'win_game', name: 'Победитель', desc: 'Выиграть в шахматы/шашки/уголки', points: 5, difficulty: 'easy' },
        
        // Средние достижения (10-15 очков)
        { id: 'screen_time', name: 'Цифровой контроль', desc: 'Экранное время на телефоне меньше 2 часов', points: 10, difficulty: 'medium' },
        { id: 'sleep_8h', name: 'Здоровый сон', desc: 'Сон 8 часов (ночью)', points: 10, difficulty: 'medium' },
        { id: 'fun_fact', name: 'Фактолог', desc: 'Узнать какой-то мега крутой фан факт и рассказать другому', points: 10, difficulty: 'medium' },
        { id: 'close_debt', name: 'Закрыть долг', desc: 'Закрыть один долг по учебе', points: 10, difficulty: 'medium' },
        { id: 'new_skill', name: 'Новый навык', desc: 'Освоить любой новый навык', points: 15, difficulty: 'medium' },
        
        // Сложные достижения (20+ очков)
        { id: 'learn_language', name: 'Полиглот', desc: 'Выучить новый язык на начальном уровне', points: 20, difficulty: 'hard' }
    ],
    
    shopItems: {
        chests: [
            { id: 'common_chest', name: 'Обычный сундук', desc: 'Случайная обычная экипировка', price: 50, type: 'chest', rarity: 'common' },
            { id: 'rare_chest', name: 'Редкий сундук', desc: 'Случайная редкая экипировка', price: 150, type: 'chest', rarity: 'rare' },
            { id: 'epic_chest', name: 'Эпический сундук', desc: 'Случайная эпическая экипировка', price: 300, type: 'chest', rarity: 'epic' },
            { id: 'legendary_chest', name: 'Легендарный сундук', desc: 'Случайная легендарная экипировка', price: 500, type: 'chest', rarity: 'legendary' }
        ],
        upgrades: [
            { id: 'xp_boost', name: 'Усилитель опыта', desc: '+20% опыта за достижения', price: 100, type: 'upgrade' },
            { id: 'coin_boost', name: 'Усилитель монет', desc: '+30% монет за уровень', price: 150, type: 'upgrade' }
        ],
        items: [
            { id: 'health_potion', name: 'Зелье здоровья', desc: 'Восстанавливает 50 HP', price: 50, type: 'item' },
            { id: 'strength_potion', name: 'Зелье силы', desc: '+10 к атаке на 1 час', price: 75, type: 'item' }
        ],
        cosmetics: [
            { id: 'hat_crown', name: 'Корона', desc: 'Золотая корона', price: 300, type: 'cosmetic' },
            { id: 'hat_cap', name: 'Кепка', desc: 'Стильная кепка', price: 150, type: 'cosmetic' },
            { id: 'glasses', name: 'Очки', desc: 'Крутые очки', price: 100, type: 'cosmetic' },
            { id: 'cape', name: 'Плащ', desc: 'Геройский плащ', price: 250, type: 'cosmetic' }
        ]
    },
    
    enemies: [
        { id: 'lazy_enemy', name: 'Лень', level: 1, sprite: '😴', hp: 100, maxHp: 100, reward: { coins: 10, xp: 20 } },
        { id: 'procrastination_enemy', name: 'Прокрастинация', level: 3, sprite: '⏰', hp: 200, maxHp: 200, reward: { coins: 25, xp: 50 } },
        { id: 'doubt_enemy', name: 'Сомнения', level: 5, sprite: '🤔', hp: 350, maxHp: 350, reward: { coins: 50, xp: 100 } },
        { id: 'fear_enemy', name: 'Страх', level: 8, sprite: '👻', hp: 500, maxHp: 500, reward: { coins: 100, xp: 200 } },
        { id: 'apathy_enemy', name: 'Апатия', level: 12, sprite: '😑', hp: 800, maxHp: 800, reward: { coins: 150, xp: 300 } },
        { id: 'final_boss', name: 'Финальный Босс', level: 20, sprite: '👹', hp: 2000, maxHp: 2000, reward: { coins: 500, xp: 1000 } }
    ],
    
    bosses: [
        { id: 'lazy_boss', name: 'Босс Лени', level: 5, sprite: '😴', reward: 100 },
        { id: 'procrastination_boss', name: 'Босс Прокрастинации', level: 10, sprite: '⏰', reward: 200 },
        { id: 'doubt_boss', name: 'Босс Сомнений', level: 15, sprite: '🤔', reward: 300 },
        { id: 'fear_boss', name: 'Босс Страха', level: 20, sprite: '👻', reward: 500 },
        { id: 'final_boss', name: 'Финальный Босс', level: 30, sprite: '👹', reward: 1000 }
    ],
    
    // Типы экипировки
    equipmentTypes: {
        weapon: { name: 'Оружие', stat: 'attack', icon: '🔫' },
        helmet: { name: 'Шлем', stat: 'defense', icon: '🪖' },
        armor: { name: 'Броня', stat: 'defense', icon: '🛡️' },
        boots: { name: 'Ботинки', stat: 'defense', icon: '👢' },
        accessory: { name: 'Аксессуар', stat: 'crit', icon: '💍' }
    },
    
    // Шаблоны экипировки для сундуков
    equipmentTemplates: [
        // Оружие
        { type: 'weapon', name: 'Пистолет', rarity: 'common', attack: 5, icon: '🔫' },
        { type: 'weapon', name: 'Автомат', rarity: 'rare', attack: 12, icon: '🔫' },
        { type: 'weapon', name: 'Снайперка', rarity: 'epic', attack: 20, icon: '🔫' },
        { type: 'weapon', name: 'Легендарное оружие', rarity: 'legendary', attack: 35, icon: '🔫' },
        // Шлемы
        { type: 'helmet', name: 'Каска', rarity: 'common', defense: 3, icon: '🪖' },
        { type: 'helmet', name: 'Боевой шлем', rarity: 'rare', defense: 7, icon: '🪖' },
        { type: 'helmet', name: 'Элитный шлем', rarity: 'epic', defense: 12, icon: '🪖' },
        { type: 'helmet', name: 'Легендарный шлем', rarity: 'legendary', defense: 20, icon: '🪖' },
        // Броня
        { type: 'armor', name: 'Жилет', rarity: 'common', defense: 5, icon: '🛡️' },
        { type: 'armor', name: 'Бронежилет', rarity: 'rare', defense: 10, icon: '🛡️' },
        { type: 'armor', name: 'Тяжелая броня', rarity: 'epic', defense: 18, icon: '🛡️' },
        { type: 'armor', name: 'Легендарная броня', rarity: 'legendary', defense: 30, icon: '🛡️' },
        // Ботинки
        { type: 'boots', name: 'Кроссовки', rarity: 'common', defense: 2, icon: '👢' },
        { type: 'boots', name: 'Ботинки', rarity: 'rare', defense: 5, icon: '👢' },
        { type: 'boots', name: 'Боевые ботинки', rarity: 'epic', defense: 8, icon: '👢' },
        { type: 'boots', name: 'Легендарные ботинки', rarity: 'legendary', defense: 15, icon: '👢' },
        // Аксессуары
        { type: 'accessory', name: 'Кольцо', rarity: 'common', crit: 2, icon: '💍' },
        { type: 'accessory', name: 'Амулет', rarity: 'rare', crit: 5, icon: '💍' },
        { type: 'accessory', name: 'Талисман', rarity: 'epic', crit: 10, icon: '💍' },
        { type: 'accessory', name: 'Легендарный артефакт', rarity: 'legendary', crit: 20, icon: '💍' }
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
    // Инициализация Telegram Web App (если доступно)
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
        tg.enableClosingConfirmation();
        
        // Установка цвета темы
        tg.setHeaderColor('#667eea');
        tg.setBackgroundColor('#667eea');
    }
    
    loadGameData();
    setupEventListeners();
    
    // Инициализация боя
    const player = getCurrentPlayer();
    if (!player.currentEnemy) {
        startCombat();
    }
    
    renderCombat();
    renderAchievements();
    renderCharacter();
    renderEquipment();
    renderShop();
    renderBosses();
    updatePlayerStats();
}

// Загрузка данных из localStorage
function loadGameData() {
    const saved = localStorage.getItem('ochivki_game_data');
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(gameData.players, parsed.players || {});
        gameData.currentPlayer = parsed.currentPlayer || 'kirill';
        
        // Миграция старых данных: добавляем timestamp к старым достижениям и accumulatedDamage
        Object.values(gameData.players).forEach(player => {
            // Инициализация базовых полей
            if (!player.completedAchievements) player.completedAchievements = [];
            if (player.accumulatedDamage === undefined) player.accumulatedDamage = 0;
            if (!player.stats) {
                player.stats = {
                    attack: 25,
                    defense: 10,
                    health: 100,
                    maxHealth: 100,
                    crit: 5
                };
            }
            if (!player.equipment) {
                player.equipment = {
                    weapon: null,
                    helmet: null,
                    armor: null,
                    boots: null,
                    accessory: null
                };
            }
            if (!player.inventory) player.inventory = [];
            if (player.xp === undefined) player.xp = 0;
            if (player.level === undefined) player.level = 1;
            if (player.coins === undefined) player.coins = 0;
            
            if (player.completedAchievements) {
                player.completedAchievements = player.completedAchievements.map(ca => {
                    if (!ca.timestamp && ca.date) {
                        // Если нет timestamp, создаем его из даты (устанавливаем на начало дня)
                        const date = new Date(ca.date);
                        date.setHours(0, 0, 0, 0);
                        ca.timestamp = date.toISOString();
                    }
                    return ca;
                });
            }
        });
        saveGameData(); // Сохраняем мигрированные данные
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
    
    // Инициализация первой вкладки (Бой)
    switchTab('combat');
    
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
    const btnId = playerId === 'kirill' ? 'selectKirill' : 'selectYulya';
    const btn = document.getElementById(btnId);
    if (btn) btn.classList.add('active');
    
    updatePlayerStats();
    renderAchievements();
    renderCharacter();
    renderCombat();
    saveGameData();
}

// Переключение вкладок
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-${tabName}`).classList.add('active');
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Если переключились на вкладку достижений, обновляем таймеры
    if (tabName === 'achievements') {
        const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
        renderAchievements(activeFilter);
    }
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
    if (!amount || amount <= 0) {
        console.warn('addXP: invalid amount', amount);
        return;
    }
    
    const player = getCurrentPlayer();
    if (!player) {
        console.error('addXP: player not found');
        return;
    }
    
    // Инициализация XP если его нет
    if (player.xp === undefined || player.xp === null) {
        player.xp = 0;
    }
    if (player.level === undefined || player.level === null) {
        player.level = 1;
    }
    
    const oldLevel = player.level;
    player.xp += amount;
    
    console.log(`Adding ${amount} XP. Current: ${player.xp - amount} -> ${player.xp}`);
    
    // Проверка повышения уровня
    while (player.xp >= getXPNeeded(player.level)) {
        player.xp -= getXPNeeded(player.level);
        player.level++;
        const coinsEarned = Math.floor(50 * player.level);
        
        // Инициализация монет если их нет
        if (player.coins === undefined || player.coins === null) {
            player.coins = 0;
        }
        player.coins += coinsEarned;
        
        // Анимация повышения уровня
        showLevelUpAnimation(coinsEarned);
    }
    
    if (player.level > oldLevel) {
        console.log(`Level up! ${oldLevel} -> ${player.level}`);
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

// Проверка доступности достижения (прошло ли 24 часа)
function isAchievementAvailable(achievementId) {
    const player = getCurrentPlayer();
    const lastCompletion = player.completedAchievements.find(ca => ca.id === achievementId);
    
    if (!lastCompletion || !lastCompletion.timestamp) {
        return true; // Никогда не выполнялось
    }
    
    const lastTime = new Date(lastCompletion.timestamp).getTime();
    const now = new Date().getTime();
    const hoursPassed = (now - lastTime) / (1000 * 60 * 60);
    
    return hoursPassed >= 24;
}

// Получение времени до следующего доступного выполнения
function getTimeUntilAvailable(achievementId) {
    const player = getCurrentPlayer();
    const lastCompletion = player.completedAchievements.find(ca => ca.id === achievementId);
    
    if (!lastCompletion || !lastCompletion.timestamp) {
        return null; // Доступно сейчас
    }
    
    const lastTime = new Date(lastCompletion.timestamp).getTime();
    const now = new Date().getTime();
    const hoursPassed = (now - lastTime) / (1000 * 60 * 60);
    
    if (hoursPassed >= 24) {
        return null; // Доступно сейчас
    }
    
    const hoursLeft = 24 - hoursPassed;
    const hours = Math.floor(hoursLeft);
    const minutes = Math.floor((hoursLeft - hours) * 60);
    
    if (hours > 0) {
        return `${hours}ч ${minutes}м`;
    } else {
        return `${minutes}м`;
    }
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
        const lastCompletion = player.completedAchievements.find(ca => ca.id === achievement.id);
        const isAvailable = isAchievementAvailable(achievement.id);
        const timeLeft = getTimeUntilAvailable(achievement.id);
        
        const card = document.createElement('div');
        card.className = `achievement-card ${lastCompletion && !isAvailable ? 'completed' : ''} ${isAvailable ? 'available' : 'cooldown'}`;
        
        card.innerHTML = `
            <div class="achievement-info">
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.desc}</div>
                <div class="achievement-meta">
                    <span class="difficulty-badge difficulty-${achievement.difficulty}">
                        ${achievement.difficulty === 'easy' ? 'Легко' : achievement.difficulty === 'medium' ? 'Средне' : 'Сложно'}
                    </span>
                    <span class="achievement-points">+${achievement.points} очков</span>
                    ${lastCompletion ? `<span>✅ Выполнено: ${new Date(lastCompletion.date).toLocaleDateString('ru-RU')}</span>` : ''}
                    ${!isAvailable && timeLeft ? `<span class="cooldown-timer">⏰ Доступно через: ${timeLeft}</span>` : ''}
                </div>
            </div>
            <div class="achievement-actions">
                ${isAvailable ? `<button class="btn-primary" onclick="openAchievementModal('${achievement.id}')">Отметить</button>` : 
                  `<button class="btn-primary" disabled>⏳ Ожидание (${timeLeft})</button>`}
            </div>
        `;
        
        container.appendChild(card);
    });
    
    // Автоматическое обновление каждые 30 секунд для обновления таймеров
    if (window.achievementUpdateInterval) {
        clearInterval(window.achievementUpdateInterval);
    }
    window.achievementUpdateInterval = setInterval(() => {
        // Обновляем только если вкладка достижений активна
        const achievementsTab = document.getElementById('tab-achievements');
        if (achievementsTab && achievementsTab.classList.contains('active')) {
            const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
            renderAchievements(activeFilter);
        }
    }, 30000); // Обновление каждые 30 секунд
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

// Расчет урона за достижение
function calculateAchievementDamage(achievement, player) {
    if (!achievement || !player) {
        console.error('calculateAchievementDamage: achievement or player is missing');
        return { damage: 0, isCrit: false };
    }
    
    const baseDamage = achievement.points * 2; // Базовый урон = очки * 2
    const totalStats = calculateTotalStats(player);
    const attackBonus = totalStats.attack;
    const totalDamage = baseDamage + attackBonus;
    
    // Проверка крита (используем общий стат крита с экипировкой)
    const isCrit = Math.random() * 100 < totalStats.crit;
    const finalDamage = isCrit ? Math.floor(totalDamage * 1.5) : totalDamage;
    
    return { damage: finalDamage, isCrit };
}

// Атака врага (расходует накопленный урон)
function attackEnemy() {
    const player = getCurrentPlayer();
    
    // Проверка наличия врага
    if (!player.currentEnemy) {
        showNotification('Сначала выберите врага!');
        startCombat();
        return;
    }
    
    // Проверка накопленного урона
    if (!player.accumulatedDamage || player.accumulatedDamage <= 0) {
        showNotification('Нет накопленного урона! Выполните достижения, чтобы накопить урон.');
        return;
    }
    
    const enemy = gameData.enemies.find(e => e.id === player.currentEnemy);
    if (!enemy) {
        startCombat();
        return;
    }
    
    // Расходуем весь накопленный урон
    const damage = player.accumulatedDamage;
    const totalStats = calculateTotalStats(player);
    
    // Проверка крита (шанс зависит от стата крита)
    const isCrit = Math.random() * 100 < totalStats.crit;
    const finalDamage = isCrit ? Math.floor(damage * 1.5) : damage;
    
    // Наносим урон
    enemy.hp = Math.max(0, enemy.hp - finalDamage);
    
    // Обнуляем накопленный урон
    player.accumulatedDamage = 0;
    
    // Визуализация урона
    showDamageIndicator(finalDamage, isCrit);
    
    // Обновление HP бара врага
    updateEnemyHealthBar();
    
    // Обновляем интерфейс
    renderCombat();
    saveGameData();
    
    // Проверка победы
    if (enemy.hp <= 0) {
        defeatEnemy(enemy);
    } else {
        showNotification(`⚔️ Нанесено ${finalDamage} урона! ${isCrit ? '💥 КРИТИЧЕСКИЙ УДАР!' : ''}`);
    }
}

// Нанесение урона текущему врагу (старая функция, оставлена для совместимости)
function dealDamageToEnemy(damage, isCrit) {
    const player = getCurrentPlayer();
    if (!player.currentEnemy) {
        startCombat();
        return;
    }
    
    const enemy = gameData.enemies.find(e => e.id === player.currentEnemy);
    if (!enemy) {
        startCombat();
        return;
    }
    
    enemy.hp = Math.max(0, enemy.hp - damage);
    
    // Визуализация урона
    showDamageIndicator(damage, isCrit);
    
    // Обновление HP бара врага
    updateEnemyHealthBar();
    
    // Проверка победы
    if (enemy.hp <= 0) {
        defeatEnemy(enemy);
    }
    
    saveGameData();
}

// Визуализация урона
function showDamageIndicator(damage, isCrit) {
    const enemySprite = document.getElementById('enemySprite');
    if (!enemySprite) return;
    
    const damageText = document.createElement('div');
    damageText.className = 'damage-indicator';
    damageText.textContent = `-${damage}`;
    if (isCrit) {
        damageText.classList.add('crit');
        damageText.textContent = `💥 КРИТ! -${damage}`;
    }
    
    damageText.style.cssText = `
        position: absolute;
        top: 50%;
        right: 20%;
        font-size: ${isCrit ? '28px' : '24px'};
        font-weight: bold;
        color: ${isCrit ? '#ff0000' : '#ffff00'};
        text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
        z-index: 1000;
        animation: damageFloat 1s ease-out forwards;
        pointer-events: none;
    `;
    
    const combatArea = document.getElementById('combatArea');
    if (combatArea) {
        combatArea.appendChild(damageText);
        setTimeout(() => damageText.remove(), 1000);
    }
}

// Обновление HP бара врага
function updateEnemyHealthBar() {
    const player = getCurrentPlayer();
    if (!player.currentEnemy) return;
    
    const enemy = gameData.enemies.find(e => e.id === player.currentEnemy);
    if (!enemy) return;
    
    const hpBar = document.getElementById('enemyHpBar');
    const hpText = document.getElementById('enemyHpText');
    
    if (hpBar) {
        const percent = (enemy.hp / enemy.maxHp) * 100;
        hpBar.style.width = `${percent}%`;
    }
    
    if (hpText) {
        hpText.textContent = `${enemy.hp}/${enemy.maxHp} HP`;
    }
}

// Начало боя (выбор нового врага)
function startCombat() {
    const player = getCurrentPlayer();
    
    // Инициализация накопленного урона если его нет
    if (player.accumulatedDamage === undefined) {
        player.accumulatedDamage = 0;
    }
    
    // Выбираем врага по уровню игрока
    const availableEnemies = gameData.enemies.filter(e => e.level <= player.level + 2);
    if (availableEnemies.length === 0) {
        player.currentEnemy = gameData.enemies[0].id;
    } else {
        const randomEnemy = availableEnemies[Math.floor(Math.random() * availableEnemies.length)];
        player.currentEnemy = randomEnemy.id;
        
        // Восстанавливаем HP врага
        const enemy = gameData.enemies.find(e => e.id === randomEnemy.id);
        if (enemy) {
            enemy.hp = enemy.maxHp;
        }
    }
    
    renderCombat();
    saveGameData();
    
    showNotification('🔄 Выбран новый враг! Выполняйте достижения, чтобы накопить урон для атаки.');
}

// Победа над врагом
function defeatEnemy(enemy) {
    const player = getCurrentPlayer();
    
    // Награды
    player.coins += enemy.reward.coins;
    addXP(enemy.reward.xp);
    
    // Шанс на сундук (30%)
    if (Math.random() < 0.3) {
        openChest();
    }
    
    // Сброс текущего врага
    player.currentEnemy = null;
    
    // Накопленный урон НЕ сбрасывается - можно использовать на следующего врага
    
    showNotification(`🎉 Победа над ${enemy.name}! +${enemy.reward.coins} монет, +${enemy.reward.xp} опыта`);
    
    updatePlayerStats();
    renderCombat();
    saveGameData();
    
    // Автоматически создаем нового врага через 2 секунды
    setTimeout(() => {
        startCombat();
        if (player.accumulatedDamage > 0) {
            showNotification(`💡 У вас есть ${player.accumulatedDamage} накопленного урона! Можете сразу атаковать нового врага.`);
        }
    }, 2000);
}

// Подтверждение выполнения достижения
function confirmAchievement() {
    const modal = document.getElementById('achievementModal');
    if (!modal) {
        console.error('Modal not found');
        return;
    }
    
    const achievementId = modal.dataset.achievementId;
    if (!achievementId) {
        console.error('Achievement ID not found');
        alert('Ошибка: ID достижения не найден');
        return;
    }
    
    const dateInput = document.getElementById('achievementDate');
    if (!dateInput) {
        console.error('Date input not found');
        return;
    }
    
    const date = dateInput.value;
    if (!date) {
        alert('Выберите дату выполнения!');
        return;
    }
    
    const player = getCurrentPlayer();
    if (!player) {
        console.error('Player not found');
        return;
    }
    
    const achievement = gameData.achievements.find(a => a.id === achievementId);
    if (!achievement) {
        console.error('Achievement not found:', achievementId);
        alert('Ошибка: достижение не найдено');
        modal.classList.remove('active');
        return;
    }
    
    // Инициализация массива достижений если его нет
    if (!player.completedAchievements) {
        player.completedAchievements = [];
    }
    
    // Проверка, прошло ли 24 часа с последнего выполнения
    const lastCompletion = player.completedAchievements.find(ca => ca.id === achievementId);
    if (lastCompletion && lastCompletion.timestamp) {
        const lastTime = new Date(lastCompletion.timestamp).getTime();
        const now = new Date().getTime();
        const hoursPassed = (now - lastTime) / (1000 * 60 * 60);
        
        if (hoursPassed < 24) {
            const hoursLeft = Math.ceil(24 - hoursPassed);
            alert(`Это достижение можно выполнить снова через ${hoursLeft} ${hoursLeft === 1 ? 'час' : hoursLeft < 5 ? 'часа' : 'часов'}!`);
            modal.classList.remove('active');
            return;
        }
    }
    
    // Сохранение timestamp выполнения
    const timestamp = new Date().toISOString();
    
    // Обновление или добавление достижения
    const existingIndex = player.completedAchievements.findIndex(ca => ca.id === achievementId);
    if (existingIndex >= 0) {
        player.completedAchievements[existingIndex] = {
            id: achievementId,
            date: date,
            timestamp: timestamp,
            points: achievement.points
        };
    } else {
        player.completedAchievements.push({
            id: achievementId,
            date: date,
            timestamp: timestamp,
            points: achievement.points
        });
    }
    
    // НАКАПЛИВАЕМ УРОН ЗА ДОСТИЖЕНИЕ!
    const { damage, isCrit } = calculateAchievementDamage(achievement, player);
    
    // Накапливаем урон вместо немедленного нанесения
    if (player.accumulatedDamage === undefined || player.accumulatedDamage === null) {
        player.accumulatedDamage = 0;
    }
    player.accumulatedDamage += damage;
    
    // Добавление опыта
    if (achievement.points && achievement.points > 0) {
        addXP(achievement.points);
    }
    
    modal.classList.remove('active');
    renderAchievements();
    renderCombat(); // Обновляем интерфейс боя для показа накопленного урона
    updatePlayerStats(); // Обновляем статы
    saveGameData();
    
    // Уведомление
    const critText = isCrit ? ' 💥 КРИТ!' : '';
    showNotification(`✅ Достижение "${achievement.name}" выполнено! Накоплено ${damage} урона${critText} (всего: ${player.accumulatedDamage})! +${achievement.points} опыта`);
    
    console.log('Achievement completed:', {
        achievement: achievement.name,
        points: achievement.points,
        damage: damage,
        totalDamage: player.accumulatedDamage,
        isCrit: isCrit
    });
}

// Рендеринг персонажа
function renderCharacter() {
    const player = getCurrentPlayer();
    const sprite = document.getElementById('characterSprite');
    
    if (!sprite) return; // Если элемента нет, выходим
    
    // Простой пиксельный спрайт (можно заменить на реальные спрайты)
    sprite.style.background = player.clothesColor || '#3498db';
    sprite.innerHTML = '👤';
    
    // Цвета волос
    const hairPicker = document.getElementById('hairColorPicker');
    if (hairPicker) {
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
    }
    
    // Цвета одежды
    const clothesPicker = document.getElementById('clothesColorPicker');
    if (clothesPicker) {
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
                if (sprite) sprite.style.background = color;
                saveGameData();
            });
            clothesPicker.appendChild(option);
        });
    }
    
    // Аксессуары
    const accessoriesList = document.getElementById('accessoriesList');
    if (accessoriesList) {
        accessoriesList.innerHTML = '';
        const allAccessories = [
            { id: 'none', name: 'Нет', price: 0 },
            ...(gameData.shopItems.cosmetics || [])
        ];
        
        allAccessories.forEach(acc => {
            const item = document.createElement('div');
            const isOwned = acc.price === 0 || (player.accessories && player.accessories.includes(acc.id));
            const isEquipped = player.accessories && player.accessories.includes(acc.id);
            
            item.className = `accessory-item ${isOwned ? 'owned' : ''} ${isEquipped ? 'equipped' : ''}`;
            item.textContent = acc.name;
            
            if (isOwned) {
                item.addEventListener('click', () => {
                    if (!player.accessories) player.accessories = [];
                    
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
}

// Рендеринг магазина
function renderShop(category = 'chests') {
    const container = document.getElementById('shopItems');
    const player = getCurrentPlayer();
    container.innerHTML = '';
    
    const items = gameData.shopItems[category] || [];
    
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'shop-item';
        
        if (item.type === 'chest') {
            const rarityColors = {
                common: '#95a5a6',
                rare: '#3498db',
                epic: '#9b59b6',
                legendary: '#f39c12'
            };
            card.style.borderColor = rarityColors[item.rarity] || '#95a5a6';
        }
        
        card.innerHTML = `
            <div class="shop-item-info">
                <div class="shop-item-name">${item.name}</div>
                <div class="shop-item-desc">${item.desc}</div>
                <div class="shop-item-price">💰 ${item.price} монет</div>
            </div>
            <div class="shop-item-actions">
                <button class="btn-primary" ${player.coins < item.price ? 'disabled' : ''} 
                    onclick="buyItem('${item.id}', '${category}')">
                    Купить
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
    
    if (item.type === 'chest') {
        // Открываем сундук
        openChestByRarity(item.rarity);
    } else if (item.type === 'item' && itemId === 'health_potion') {
        // Зелье здоровья
        player.stats.health = Math.min(player.stats.maxHealth, player.stats.health + 50);
        showNotification(`✅ Восстановлено 50 HP!`);
        renderCombat();
    } else if (category === 'cosmetics') {
        if (!player.accessories) player.accessories = [];
        player.accessories.push(itemId);
    }
    
    updatePlayerStats();
    renderShop(category);
    renderEquipment();
    saveGameData();
    
    if (item.type !== 'chest') {
        showNotification(`✅ Куплено: ${item.name}`);
    }
}

// Открытие сундука определенной редкости
function openChestByRarity(rarity) {
    const player = getCurrentPlayer();
    
    const availableItems = gameData.equipmentTemplates.filter(t => t.rarity === rarity);
    const randomItem = { ...availableItems[Math.floor(Math.random() * availableItems.length)] };
    
    randomItem.id = `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    if (!player.inventory) player.inventory = [];
    player.inventory.push(randomItem);
    
    saveGameData();
    renderEquipment();
    
    const rarityNames = {
        common: 'Обычная',
        rare: 'Редкая',
        epic: 'Эпическая',
        legendary: 'Легендарная'
    };
    
    showNotification(`📦 Открыт сундук! Получена ${rarityNames[rarity]} экипировка: ${randomItem.name}!`);
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

// Рендеринг боевой системы
function renderCombat() {
    const player = getCurrentPlayer();
    
    // Инициализация накопленного урона если его нет
    if (player.accumulatedDamage === undefined) {
        player.accumulatedDamage = 0;
    }
    
    // Обновление статов игрока
    const totalStats = calculateTotalStats(player);
    if (document.getElementById('playerAttack')) {
        document.getElementById('playerAttack').textContent = totalStats.attack;
        document.getElementById('playerDefense').textContent = totalStats.defense;
        document.getElementById('playerHealth').textContent = player.stats.health;
        document.getElementById('playerMaxHealth').textContent = player.stats.maxHealth;
        document.getElementById('playerCrit').textContent = totalStats.crit;
    }
    
    // Обновление накопленного урона
    const accumulatedDamageEl = document.getElementById('accumulatedDamage');
    if (accumulatedDamageEl) {
        accumulatedDamageEl.textContent = player.accumulatedDamage || 0;
        
        // Визуальное выделение если есть урон
        if (player.accumulatedDamage > 0) {
            accumulatedDamageEl.style.color = '#e74c3c';
            accumulatedDamageEl.style.fontWeight = 'bold';
            accumulatedDamageEl.style.fontSize = '24px';
        } else {
            accumulatedDamageEl.style.color = '#7f8c8d';
            accumulatedDamageEl.style.fontWeight = 'normal';
            accumulatedDamageEl.style.fontSize = '20px';
        }
    }
    
    // Обновление кнопки атаки
    const attackButton = document.getElementById('attackButton');
    if (attackButton) {
        if (player.accumulatedDamage > 0) {
            attackButton.disabled = false;
            attackButton.textContent = `⚔️ Атаковать (${player.accumulatedDamage} урона)`;
        } else {
            attackButton.disabled = true;
            attackButton.textContent = '⚔️ Атаковать (нет урона)';
        }
    }
    
    // Обновление врага
    if (player.currentEnemy) {
        const enemy = gameData.enemies.find(e => e.id === player.currentEnemy);
        if (enemy) {
            if (document.getElementById('enemySprite')) {
                document.getElementById('enemySprite').textContent = enemy.sprite;
                document.getElementById('enemyName').textContent = enemy.name;
                document.getElementById('enemyLevel').textContent = `Уровень: ${enemy.level}`;
            }
            updateEnemyHealthBar();
        }
    } else {
        if (document.getElementById('enemySprite')) {
            document.getElementById('enemySprite').textContent = '❓';
            document.getElementById('enemyName').textContent = 'Нет врага';
            document.getElementById('enemyLevel').textContent = 'Нажмите "Новый враг"';
        }
    }
}

// Расчет общих статов с учетом экипировки
function calculateTotalStats(player) {
    if (!player || !player.stats) {
        console.error('calculateTotalStats: player or stats missing');
        return { attack: 25, defense: 10, health: 100, maxHealth: 100, crit: 5 };
    }
    
    const base = { ...player.stats };
    
    // Добавляем статы из экипировки
    if (player.equipment) {
        Object.values(player.equipment).forEach(item => {
            if (item) {
                if (item.attack) base.attack += item.attack;
                if (item.defense) base.defense += item.defense;
                if (item.crit) base.crit += item.crit;
            }
        });
    }
    
    return base;
}

// Открытие сундука
function openChest() {
    const player = getCurrentPlayer();
    
    // Генерация случайной экипировки
    const rarityChance = Math.random();
    let rarity;
    if (rarityChance < 0.5) rarity = 'common';
    else if (rarityChance < 0.8) rarity = 'rare';
    else if (rarityChance < 0.95) rarity = 'epic';
    else rarity = 'legendary';
    
    const availableItems = gameData.equipmentTemplates.filter(t => t.rarity === rarity);
    const randomItem = { ...availableItems[Math.floor(Math.random() * availableItems.length)] };
    
    // Добавляем уникальный ID
    randomItem.id = `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Добавляем в инвентарь
    if (!player.inventory) player.inventory = [];
    player.inventory.push(randomItem);
    
    saveGameData();
    renderEquipment();
    
    // Показываем что получили
    const rarityNames = {
        common: 'Обычная',
        rare: 'Редкая',
        epic: 'Эпическая',
        legendary: 'Легендарная'
    };
    
    showNotification(`📦 Получена ${rarityNames[rarity]} экипировка: ${randomItem.name}!`);
}

// Рендеринг экипировки
function renderEquipment() {
    const player = getCurrentPlayer();
    
    // Надетое
    const equippedContainer = document.getElementById('equippedItems');
    if (equippedContainer) {
        equippedContainer.innerHTML = '';
        
        Object.entries(gameData.equipmentTypes).forEach(([slot, type]) => {
            const item = player.equipment[slot];
            const slotDiv = document.createElement('div');
            slotDiv.className = 'equipment-slot';
            
            if (item) {
                slotDiv.innerHTML = `
                    <div class="equipped-item">
                        <div class="item-icon">${item.icon || '📦'}</div>
                        <div class="item-name">${item.name}</div>
                        <div class="item-stats">
                            ${item.attack ? `⚔️ +${item.attack}` : ''}
                            ${item.defense ? `🛡️ +${item.defense}` : ''}
                            ${item.crit ? `💥 +${item.crit}%` : ''}
                        </div>
                        <button class="btn-small" onclick="unequipItem('${slot}')">Снять</button>
                    </div>
                `;
            } else {
                slotDiv.innerHTML = `
                    <div class="empty-slot">
                        <div class="slot-icon">${type.icon}</div>
                        <div class="slot-name">${type.name}</div>
                        <div class="slot-empty">Пусто</div>
                    </div>
                `;
            }
            
            equippedContainer.appendChild(slotDiv);
        });
    }
    
    // Инвентарь
    const inventoryContainer = document.getElementById('inventoryItems');
    if (inventoryContainer) {
        inventoryContainer.innerHTML = '';
        
        if (!player.inventory || player.inventory.length === 0) {
            inventoryContainer.innerHTML = '<div class="empty-inventory">Инвентарь пуст. Побеждайте врагов, чтобы получить сундуки!</div>';
        } else {
            player.inventory.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'inventory-item';
                
                const rarityColors = {
                    common: '#95a5a6',
                    rare: '#3498db',
                    epic: '#9b59b6',
                    legendary: '#f39c12'
                };
                
                itemDiv.style.borderColor = rarityColors[item.rarity] || '#95a5a6';
                
                itemDiv.innerHTML = `
                    <div class="item-icon">${item.icon || '📦'}</div>
                    <div class="item-info">
                        <div class="item-name">${item.name}</div>
                        <div class="item-stats">
                            ${item.attack ? `⚔️ +${item.attack}` : ''}
                            ${item.defense ? `🛡️ +${item.defense}` : ''}
                            ${item.crit ? `💥 +${item.crit}%` : ''}
                        </div>
                        <div class="item-rarity">${item.rarity}</div>
                    </div>
                    <button class="btn-primary" onclick="equipItem(${index})">Надеть</button>
                `;
                
                inventoryContainer.appendChild(itemDiv);
            });
        }
    }
}

// Надеть предмет
function equipItem(inventoryIndex) {
    const player = getCurrentPlayer();
    const item = player.inventory[inventoryIndex];
    
    if (!item) return;
    
    // Снимаем текущий предмет этого типа (если есть)
    const currentItem = player.equipment[item.type];
    if (currentItem) {
        player.inventory.push(currentItem);
    }
    
    // Надеваем новый
    player.equipment[item.type] = item;
    player.inventory.splice(inventoryIndex, 1);
    
    // Обновляем статы
    updatePlayerStats();
    renderCombat();
    renderEquipment();
    saveGameData();
    
    showNotification(`✅ Надето: ${item.name}`);
}

// Снять предмет
function unequipItem(slot) {
    const player = getCurrentPlayer();
    const item = player.equipment[slot];
    
    if (!item) return;
    
    if (!player.inventory) player.inventory = [];
    player.inventory.push(item);
    player.equipment[slot] = null;
    
    updatePlayerStats();
    renderCombat();
    renderEquipment();
    saveGameData();
    
    showNotification(`✅ Снято: ${item.name}`);
}

// Обновление статов в интерфейсе
function updatePlayerStats() {
    const player = getCurrentPlayer();
    const totalStats = calculateTotalStats(player);
    
    document.getElementById('playerLevel').textContent = player.level;
    document.getElementById('playerXP').textContent = player.xp;
    document.getElementById('playerXPNeeded').textContent = getXPNeeded(player.level);
    document.getElementById('playerCoins').textContent = player.coins;
    document.getElementById('characterName').textContent = player.name;
    
    // Обновляем боевые статы если они есть
    if (document.getElementById('playerAttack')) {
        document.getElementById('playerAttack').textContent = totalStats.attack;
        document.getElementById('playerDefense').textContent = totalStats.defense;
        document.getElementById('playerHealth').textContent = player.stats.health;
        document.getElementById('playerMaxHealth').textContent = player.stats.maxHealth;
        document.getElementById('playerCrit').textContent = totalStats.crit;
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', initGame);

// Очистка интервалов при закрытии страницы
window.addEventListener('beforeunload', () => {
    if (window.achievementUpdateInterval) {
        clearInterval(window.achievementUpdateInterval);
    }
});