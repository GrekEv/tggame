// Игровые данные
const gameData = {
    gameMode: null, // 'single' или 'competition'
    isRegistered: false, // Зарегистрирован ли пользователь
    playerId: null, // Уникальный ID игрока
    telegramUser: null, // Данные пользователя из Telegram
    tutorialCompleted: false, // Пройден ли гайд
    player: {
        name: '',
        level: 1,
        xp: 0,
        coins: 0,
        // Расширенная кастомизация персонажа
        customization: {
            // Лицо
            face: {
                skinColor: '#FDBCB4', // Цвет кожи
                eyeType: 'normal', // Тип глаз: normal, big, small, closed, wink
                eyeColor: '#4A90E2', // Цвет глаз
                eyebrowType: 'normal', // Тип бровей: normal, thick, thin, angry
                noseType: 'normal', // Тип носа: normal, small, big
                mouthType: 'smile', // Тип рта: smile, neutral, open, bigSmile
                // Старые поля для совместимости
                hairColor: '#8B4513',
                clothesColor: '#3498db'
            },
            // Волосы
            hair: {
                style: 'short', // Стиль: short, medium, long, ponytail, bun, mohawk, afro, bald
                color: '#8B4513' // Цвет волос
            },
            // Одежда
            clothing: {
                top: 'tshirt', // Тип верха: tshirt, shirt, tank, dress, jacket
                topColor: '#3498db', // Цвет верха
                bottom: 'pants', // Тип низа: pants, shorts, skirt
                bottomColor: '#2c3e50', // Цвет низа
                shoes: 'sneakers', // Тип обуви: sneakers, boots, sandals, heels
                shoesColor: '#1a1a1a' // Цвет обуви
            },
            // Аксессуары
            accessories: []
        },
        accessories: [], // Старое поле для совместимости
        completedAchievements: [],
        customAchievements: [], // Пользовательские достижения
        inProgressAchievements: [], // Достижения в процессе выполнения (для режима соревнования)
        // Структура: { id: achievementId, startedAt: timestamp, reportSent: false }
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
        currentEnemyHp: null, // HP текущего врага (для сохранения)
        accumulatedDamage: 0 // Накопленный урон за достижения
    },
    partnerId: null, // ID партнера для режима соревнования
    player2: null, // Данные второго игрока (только в режиме соревнования)
    currentPlayerId: 'player1', // 'player1' или 'player2' (только в режиме соревнования)
    
    // Система друзей
    friends: [], // Список друзей
    // Структура друга: { id: playerId, name: имя, telegramId: telegram id (если есть), addedAt: timestamp }
    friendRequests: [], // Заявки в друзья
    // Структура заявки: { id: requestId, friendId: ID друга, status: 'pending'|'accepted'|'rejected', sentAt: timestamp }
    
    // Система приглашений на партнерство
    partnerInvitations: [], // Приглашения на партнерство
    // Структура приглашения: { id: invitationId, fromPlayerId: ID отправителя, fromPlayerName: имя отправителя, toPlayerId: ID получателя, status: 'pending'|'accepted'|'rejected', createdAt: timestamp }
    
    // Общие данные для режима соревнования
    sharedBosses: [], // Общий список побежденных боссов в режиме соревнования
    
    // Система отчетов/чата
    reports: [], // Массив отчетов о достижениях
    // Структура отчета:
    // {
    //   id: уникальный ID,
    //   playerId: 'player1' или 'player2',
    //   playerName: имя игрока,
    //   achievementId: ID достижения,
    //   achievementName: название достижения,
    //   photo: base64 строка фото (или null),
    //   timestamp: время отправки,
    //   status: 'pending' | 'approved' | 'rejected' (только для соревнования),
    //   reviewedBy: 'player1' или 'player2' (кто одобрил/отклонил)
    // }
    
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
    
    // Правила начисления за достижения
    achievementRewards: {
        easy: { xp: 5, coins: 3, damage: 5 },
        medium: { xp: 15, coins: 6, damage: 15 },
        hard: { xp: 30, coins: 10, damage: 30 }
    },
    
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

// Генерация уникального ID игрока
function generatePlayerId() {
    // Генерируем уникальный ID на основе времени и случайных символов
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 9);
    return `P${timestamp}${random}`.toUpperCase();
}

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
        
        // Получаем данные пользователя из Telegram
        const user = tg.initDataUnsafe?.user;
        if (user) {
            gameData.telegramUser = {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name || '',
                username: user.username || null,
                languageCode: user.language_code || 'ru'
            };
        }
    }
    
    loadGameData();
    setupEventListeners();
    
    // Проверяем регистрацию
    if (!gameData.isRegistered) {
        showRegistrationModal();
        return;
    }
    
    // Показываем гайд при первом входе
    if (!gameData.tutorialCompleted) {
        showTutorial();
        return; // Не продолжаем инициализацию до завершения гайда
    }
    
    // Проверяем, выбран ли режим игры
    if (!gameData.gameMode) {
        // Показываем модальное окно выбора режима
        showGameModeSelection();
        return; // Не продолжаем инициализацию до выбора режима
    }
    
    // Обновляем интерфейс для текущего режима
    updateUIForGameMode();
    
    // Инициализация боя
    const player = getCurrentPlayer();
    
    // Восстанавливаем HP врага если есть сохраненный враг
    if (player.currentEnemy && player.currentEnemyHp !== null && player.currentEnemyHp !== undefined) {
        const enemy = gameData.enemies.find(e => e.id === player.currentEnemy);
        if (enemy) {
            enemy.hp = Math.min(player.currentEnemyHp, enemy.maxHp);
        }
    } else if (!player.currentEnemy) {
        startCombat();
    }
    
    renderCombat();
    renderAchievements();
    renderReports();
    renderCharacter();
    renderEquipment();
    renderShop();
    renderBosses();
    updatePlayerStats();
    updateUIForGameMode();
}

// Загрузка данных из localStorage
function loadGameData() {
    const saved = localStorage.getItem('ochivki_game_data');
    if (saved) {
        const parsed = JSON.parse(saved);
        
        // Загружаем данные регистрации (сохраняем существующие значения)
        if (parsed.isRegistered !== undefined) gameData.isRegistered = parsed.isRegistered;
        if (parsed.playerId !== undefined) gameData.playerId = parsed.playerId;
        if (parsed.telegramUser !== undefined) gameData.telegramUser = parsed.telegramUser;
        if (parsed.partnerId !== undefined) gameData.partnerId = parsed.partnerId;
        if (parsed.partnerInvitations !== undefined) gameData.partnerInvitations = parsed.partnerInvitations;
        if (parsed.tutorialCompleted !== undefined) gameData.tutorialCompleted = parsed.tutorialCompleted;
        
        // Загружаем режим игры
        if (parsed.gameMode !== undefined) gameData.gameMode = parsed.gameMode;
        if (parsed.currentPlayerId !== undefined) gameData.currentPlayerId = parsed.currentPlayerId;
        
        // Миграция старых данных (если есть два персонажа)
        if (parsed.players) {
            // Старая структура - конвертируем в новый формат
            const currentPlayerId = parsed.currentPlayer || 'kirill';
            const oldPlayer = parsed.players[currentPlayerId] || parsed.players.kirill || parsed.players.yulya;
            if (oldPlayer) {
                Object.assign(gameData.player, oldPlayer);
            }
            // Если есть второй игрок, сохраняем его
            const otherPlayerId = currentPlayerId === 'kirill' ? 'yulya' : 'kirill';
            if (parsed.players[otherPlayerId]) {
                gameData.player2 = { ...parsed.players[otherPlayerId] };
                gameData.gameMode = 'competition';
            } else {
                gameData.gameMode = 'single';
            }
        } else if (parsed.player) {
            // Новая структура данных
            // Сохраняем текущее имя перед загрузкой
            const currentName = gameData.player.name;
            Object.assign(gameData.player, parsed.player);
            // Восстанавливаем имя из сохраненных данных, если оно есть
            if (parsed.player.name !== undefined && parsed.player.name !== null && parsed.player.name !== '') {
                gameData.player.name = parsed.player.name;
            } else if (currentName && currentName !== 'Игрок') {
                // Если в сохраненных данных нет имени, но есть текущее имя, сохраняем его
                gameData.player.name = currentName;
            }
            
            // Миграция старых данных кастомизации
            if (!gameData.player.customization) {
                gameData.player.customization = {
                    face: {
                        skinColor: '#FDBCB4',
                        eyeType: 'normal',
                        eyeColor: '#4A90E2',
                        eyebrowType: 'normal',
                        noseType: 'normal',
                        mouthType: 'smile',
                        hairColor: gameData.player.hairColor || '#8B4513',
                        clothesColor: gameData.player.clothesColor || '#3498db'
                    },
                    hair: {
                        style: 'short',
                        color: gameData.player.hairColor || '#8B4513'
                    },
                    clothing: {
                        top: 'tshirt',
                        topColor: gameData.player.clothesColor || '#3498db',
                        bottom: 'pants',
                        bottomColor: '#2c3e50',
                        shoes: 'sneakers',
                        shoesColor: '#1a1a1a'
                    },
                    accessories: gameData.player.accessories || []
                };
            }
            
            if (parsed.player2) {
                gameData.player2 = parsed.player2;
                // Миграция для player2 тоже
                if (!gameData.player2.customization) {
                    gameData.player2.customization = {
                        face: {
                            skinColor: '#FDBCB4',
                            eyeType: 'normal',
                            eyeColor: '#4A90E2',
                            eyebrowType: 'normal',
                            noseType: 'normal',
                            mouthType: 'smile',
                            hairColor: gameData.player2.hairColor || '#8B4513',
                            clothesColor: gameData.player2.clothesColor || '#3498db'
                        },
                        hair: {
                            style: 'short',
                            color: gameData.player2.hairColor || '#8B4513'
                        },
                        clothing: {
                            top: 'tshirt',
                            topColor: gameData.player2.clothesColor || '#3498db',
                            bottom: 'pants',
                            bottomColor: '#2c3e50',
                            shoes: 'sneakers',
                            shoesColor: '#1a1a1a'
                        },
                        accessories: gameData.player2.accessories || []
                    };
                }
            }
        }
        
        // Загружаем отчеты (чат между партнерами)
        if (parsed.reports && Array.isArray(parsed.reports)) {
            gameData.reports = parsed.reports;
        } else {
            gameData.reports = [];
        }
        
        // Загружаем общих боссов для режима соревнования
        if (parsed.sharedBosses && Array.isArray(parsed.sharedBosses)) {
            gameData.sharedBosses = parsed.sharedBosses;
        } else {
            gameData.sharedBosses = [];
        }
        
        // Загружаем общие данные для режима дуо
        if (parsed.sharedData && gameData.gameMode === 'competition') {
            // Восстанавливаем общие данные если они есть
            // Примечание: общий урон и монеты вычисляются из данных игроков
            // Но можем использовать sharedData для отображения
            if (parsed.sharedData.sharedAchievements) {
                // Обновляем достижения игроков на основе общих
                syncAchievementsFromShared(parsed.sharedData.sharedAchievements);
            }
        }
        
        // Загружаем список друзей
        if (parsed.friends && Array.isArray(parsed.friends)) {
            gameData.friends = parsed.friends;
        } else {
            gameData.friends = [];
        }
        
        // Инициализация базовых полей для первого игрока
        initPlayerData(gameData.player);
        
        // Инициализация базовых полей для второго игрока (если есть)
        if (gameData.player2) {
            initPlayerData(gameData.player2);
        }
        
        // В режиме дуо инициализируем общих боссов если их нет
        if (gameData.gameMode === 'competition' && (!gameData.sharedBosses || gameData.sharedBosses.length === 0)) {
            gameData.sharedBosses = gameData.bosses.map(boss => ({
                id: boss.id,
                isDefeated: false
            }));
        }
        
        saveGameData(); // Сохраняем мигрированные данные
    }
}

// Синхронизация достижений из общих данных
function syncAchievementsFromShared(sharedAchievements) {
    if (gameData.gameMode !== 'competition' || !gameData.player2) return;
    
    // Обновляем достижения первого игрока
    if (!gameData.player.completedAchievements) {
        gameData.player.completedAchievements = [];
    }
    
    // Обновляем достижения второго игрока
    if (!gameData.player2.completedAchievements) {
        gameData.player2.completedAchievements = [];
    }
    
    // Синхронизируем достижения на основе общих данных
    sharedAchievements.forEach(sharedAch => {
        const player1Has = gameData.player.completedAchievements.find(a => a.id === sharedAch.id);
        const player2Has = gameData.player2.completedAchievements.find(a => a.id === sharedAch.id);
        
        if (sharedAch.completedBy === 'player1' || sharedAch.completedBy === 'both') {
            if (!player1Has) {
                gameData.player.completedAchievements.push({
                    id: sharedAch.id,
                    date: sharedAch.completedAt ? new Date(sharedAch.completedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                    timestamp: sharedAch.completedAt || new Date().toISOString(),
                    difficulty: sharedAch.difficulty
                });
            }
        }
        
        if (sharedAch.completedBy === 'player2' || sharedAch.completedBy === 'both') {
            if (!player2Has) {
                gameData.player2.completedAchievements.push({
                    id: sharedAch.id,
                    date: sharedAch.completedAt ? new Date(sharedAch.completedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                    timestamp: sharedAch.completedAt || new Date().toISOString(),
                    difficulty: sharedAch.difficulty
                });
            }
        }
    });
}

// Инициализация данных игрока
function initPlayerData(player) {
    // Не перезаписываем имя если оно уже есть
    if (!player.name || player.name === '' || player.name === 'Игрок') {
        // Устанавливаем имя по умолчанию только если его действительно нет
        // Но не перезаписываем существующее имя
        if (!player.name || player.name === '') {
            player.name = 'Игрок';
        }
    }
    if (!player.completedAchievements) player.completedAchievements = [];
    if (!player.customAchievements) player.customAchievements = [];
    if (!player.inProgressAchievements) player.inProgressAchievements = [];
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
    if (player.currentEnemyHp === undefined) player.currentEnemyHp = null;
    if (!player.hairColor) player.hairColor = '#8B4513';
    if (!player.clothesColor) player.clothesColor = '#3498db';
    if (!player.accessories) player.accessories = [];
    if (!player.defeatedBosses) player.defeatedBosses = [];
    if (!player.unlockedLocations) player.unlockedLocations = ['forest'];
    
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
}

// Сохранение данных в localStorage
function saveGameData() {
    // Сохраняем имя перед инициализацией, чтобы не потерять его
    const savedPlayerName = gameData.player.name;
    
    // Убеждаемся, что все данные инициализированы перед сохранением
    initPlayerData(gameData.player);
    
    // Восстанавливаем сохраненное имя если оно было установлено пользователем
    if (savedPlayerName && savedPlayerName !== 'Игрок' && savedPlayerName !== '' && savedPlayerName !== null && savedPlayerName !== undefined) {
        gameData.player.name = savedPlayerName;
    }
    
    if (gameData.player2) {
        const savedPlayer2Name = gameData.player2.name;
        initPlayerData(gameData.player2);
        if (savedPlayer2Name && savedPlayer2Name !== 'Партнер' && savedPlayer2Name !== '' && savedPlayer2Name !== null && savedPlayer2Name !== undefined) {
            gameData.player2.name = savedPlayer2Name;
        }
    }
    
    const dataToSave = {
        isRegistered: gameData.isRegistered,
        playerId: gameData.playerId,
        telegramUser: gameData.telegramUser,
        partnerId: gameData.partnerId,
        tutorialCompleted: gameData.tutorialCompleted,
        gameMode: gameData.gameMode,
        currentPlayerId: gameData.currentPlayerId,
        player: {
            ...gameData.player,
            // Явно сохраняем имя - используем текущее значение
            name: gameData.player.name || 'Игрок',
            level: gameData.player.level || 1,
            xp: gameData.player.xp || 0,
            coins: gameData.player.coins || 0,
            accumulatedDamage: gameData.player.accumulatedDamage || 0,
            completedAchievements: gameData.player.completedAchievements || [],
            customAchievements: gameData.player.customAchievements || [],
            inProgressAchievements: gameData.player.inProgressAchievements || [],
            defeatedBosses: gameData.player.defeatedBosses || [],
            unlockedLocations: gameData.player.unlockedLocations || ['forest'],
            stats: gameData.player.stats || {
                attack: 25,
                defense: 10,
                health: 100,
                maxHealth: 100,
                crit: 5
            },
            equipment: gameData.player.equipment || {
                weapon: null,
                helmet: null,
                armor: null,
                boots: null,
                accessory: null
            },
            inventory: gameData.player.inventory || [],
            customization: gameData.player.customization || {
                face: { skinColor: '#FDBCB4', eyeType: 'normal', eyeColor: '#4A90E2', eyebrowType: 'normal', noseType: 'normal', mouthType: 'smile' },
                hair: { style: 'short', color: '#8B4513' },
                clothing: { top: 'tshirt', topColor: '#3498db', bottom: 'pants', bottomColor: '#2c3e50', shoes: 'sneakers', shoesColor: '#1a1a1a' },
                accessories: []
            }
        },
        // В режиме дуо сохраняем данные второго игрока
        player2: (gameData.gameMode === 'competition' && gameData.player2) ? {
            ...gameData.player2,
            name: gameData.player2.name || 'Партнер',
            level: gameData.player2.level || 1,
            xp: gameData.player2.xp || 0,
            coins: gameData.player2.coins || 0,
            accumulatedDamage: gameData.player2.accumulatedDamage || 0,
            completedAchievements: gameData.player2.completedAchievements || [],
            customAchievements: gameData.player2.customAchievements || [],
            inProgressAchievements: gameData.player2.inProgressAchievements || [],
            defeatedBosses: gameData.player2.defeatedBosses || [],
            unlockedLocations: gameData.player2.unlockedLocations || ['forest'],
            stats: gameData.player2.stats || {
                attack: 25,
                defense: 10,
                health: 100,
                maxHealth: 100,
                crit: 5
            },
            equipment: gameData.player2.equipment || {
                weapon: null,
                helmet: null,
                armor: null,
                boots: null,
                accessory: null
            },
            inventory: gameData.player2.inventory || [],
            customization: gameData.player2.customization || {
                face: { skinColor: '#FDBCB4', eyeType: 'normal', eyeColor: '#4A90E2', eyebrowType: 'normal', noseType: 'normal', mouthType: 'smile' },
                hair: { style: 'short', color: '#8B4513' },
                clothing: { top: 'tshirt', topColor: '#3498db', bottom: 'pants', bottomColor: '#2c3e50', shoes: 'sneakers', shoesColor: '#1a1a1a' },
                accessories: []
            }
        } : null,
        // Общие данные для режима дуо
        reports: gameData.reports || [], // Чат/отчеты между партнерами
        sharedBosses: gameData.sharedBosses || [], // Общие боссы
        sharedData: gameData.gameMode === 'competition' ? {
            // Общие достижения (достижения, которые выполнил хотя бы один из партнеров)
            sharedAchievements: getSharedAchievements(),
            // Общий урон боссу (сумма урона обоих игроков)
            sharedDamage: (gameData.player.accumulatedDamage || 0) + (gameData.player2?.accumulatedDamage || 0),
            // Общие монеты (сумма монет обоих игроков для отображения)
            sharedCoins: (gameData.player.coins || 0) + (gameData.player2?.coins || 0),
            // Общий опыт (сумма опыта обоих игроков)
            sharedXP: (gameData.player.xp || 0) + (gameData.player2?.xp || 0)
        } : null,
        friends: gameData.friends || [],
        friendRequests: gameData.friendRequests || []
    };
    
    try {
        localStorage.setItem('ochivki_game_data', JSON.stringify(dataToSave));
        console.log('Game data saved successfully', {
            mode: dataToSave.gameMode,
            playerXP: dataToSave.player.xp,
            playerCoins: dataToSave.player.coins,
            player2XP: dataToSave.player2?.xp,
            player2Coins: dataToSave.player2?.coins,
            reportsCount: dataToSave.reports.length,
            sharedBossesCount: dataToSave.sharedBosses.length,
            sharedDamage: dataToSave.sharedData?.sharedDamage
        });
    } catch (e) {
        console.error('Error saving game data:', e);
        alert('Ошибка сохранения данных! Проверьте, разрешен ли доступ к localStorage.');
    }
}

// Получение общих достижений (объединение достижений обоих игроков)
function getSharedAchievements() {
    if (gameData.gameMode !== 'competition' || !gameData.player2) {
        return gameData.player.completedAchievements || [];
    }
    
    const player1Achievements = gameData.player.completedAchievements || [];
    const player2Achievements = gameData.player2.completedAchievements || [];
    
    // Объединяем достижения, убирая дубликаты
    const sharedMap = new Map();
    
    player1Achievements.forEach(ach => {
        sharedMap.set(ach.id, {
            ...ach,
            completedBy: 'player1',
            completedAt: ach.timestamp || ach.date
        });
    });
    
    player2Achievements.forEach(ach => {
        const existing = sharedMap.get(ach.id);
        if (existing) {
            // Если оба выполнили, отмечаем как общее
            existing.completedBy = 'both';
            // Берем более раннюю дату
            const existingDate = new Date(existing.completedAt);
            const newDate = new Date(ach.timestamp || ach.date);
            if (newDate < existingDate) {
                existing.completedAt = ach.timestamp || ach.date;
            }
        } else {
            sharedMap.set(ach.id, {
                ...ach,
                completedBy: 'player2',
                completedAt: ach.timestamp || ach.date
            });
        }
    });
    
    return Array.from(sharedMap.values());
}

// Получение текущего игрока
function getCurrentPlayer() {
    // В режиме соревнования каждый игрок управляет только своим аккаунтом
    // player1 всегда управляет gameData.player, player2 управляет gameData.player2
    // Но так как это локальное хранилище, каждый видит только свои данные
    // Для режима соревнования всегда возвращаем player (свой аккаунт)
    return gameData.player;
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Регистрация
    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
        registerBtn.addEventListener('click', registerPlayer);
    }
    
    // Выбор режима игры
    const singlePlayerModeBtn = document.getElementById('singlePlayerMode');
    const competitionModeBtn = document.getElementById('competitionMode');
    if (singlePlayerModeBtn) {
        singlePlayerModeBtn.addEventListener('click', () => selectGameMode('single'));
    }
    if (competitionModeBtn) {
        competitionModeBtn.addEventListener('click', () => {
            // В режиме соревнования нужно ввести ID партнера
            showPartnerIdModal();
        });
    }
    
    // Подключение к партнеру
    const connectPartnerBtn = document.getElementById('connectPartnerBtn');
    if (connectPartnerBtn) {
        connectPartnerBtn.addEventListener('click', connectToPartner);
    }
    
    const partnerIdInput = document.getElementById('partnerIdInput');
    if (partnerIdInput) {
        partnerIdInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                connectToPartner();
            }
        });
    }
    
    // Переключение между игроками в режиме соревнования
    const selectPlayer1Btn = document.getElementById('selectPlayer1');
    const selectPlayer2Btn = document.getElementById('selectPlayer2');
    if (selectPlayer1Btn) {
        selectPlayer1Btn.addEventListener('click', () => switchPlayer('player1'));
    }
    if (selectPlayer2Btn) {
        selectPlayer2Btn.addEventListener('click', () => switchPlayer('player2'));
    }
    
    // Изменение имени игрока
    const nameInput = document.getElementById('playerNameInput');
    const saveNameBtn = document.getElementById('saveNameBtn');
    
    if (nameInput) {
        // Сохранение при нажатии Enter
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                savePlayerName();
            }
        });
        
        // Сохранение при клике на кнопку
        if (saveNameBtn) {
            saveNameBtn.addEventListener('click', savePlayerName);
        }
    }
    
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
    
    // Обработчики для гайда
    const tutorialNextBtn = document.getElementById('tutorialNextBtn');
    const tutorialPrevBtn = document.getElementById('tutorialPrevBtn');
    const tutorialSkipBtn = document.getElementById('tutorialSkipBtn');
    
    if (tutorialNextBtn) {
        tutorialNextBtn.addEventListener('click', nextTutorialStep);
    }
    if (tutorialPrevBtn) {
        tutorialPrevBtn.addEventListener('click', prevTutorialStep);
    }
    if (tutorialSkipBtn) {
        tutorialSkipBtn.addEventListener('click', skipTutorial);
    }
    
    // Модальное окно
    const modal = document.getElementById('achievementModal');
    const closeBtn = document.querySelector('.close');
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    const confirmAchievementBtn = document.getElementById('confirmAchievement');
    if (confirmAchievementBtn) {
        confirmAchievementBtn.addEventListener('click', confirmAchievement);
    }
    
    // Модальное окно создания достижения
    const createModal = document.getElementById('createAchievementModal');
    const closeCreateBtn = document.querySelector('.close-create');
    if (closeCreateBtn) {
        closeCreateBtn.addEventListener('click', () => {
            createModal.classList.remove('active');
        });
    }
    
    const addAchievementBtn = document.getElementById('addAchievementBtn');
    if (addAchievementBtn && createModal) {
        addAchievementBtn.addEventListener('click', () => {
            createModal.classList.add('active');
            // Сброс формы
            const nameInput = document.getElementById('newAchievementName');
            const descInput = document.getElementById('newAchievementDesc');
            if (nameInput) nameInput.value = '';
            if (descInput) descInput.value = '';
            document.querySelectorAll('.difficulty-option').forEach(btn => btn.classList.remove('selected'));
        });
    }
    
    // Выбор сложности при создании достижения
    document.querySelectorAll('.difficulty-option').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.difficulty-option').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });
    
    const createAchievementBtn = document.getElementById('createAchievementBtn');
    if (createAchievementBtn) {
        createAchievementBtn.addEventListener('click', createCustomAchievement);
    }
    
    // Обработчики для системы отчетов
    const reportPhotoInput = document.getElementById('reportPhotoInput');
    if (reportPhotoInput) {
        reportPhotoInput.addEventListener('change', handlePhotoSelect);
    }
    
    const sendReportBtn = document.getElementById('sendReportBtn');
    if (sendReportBtn) {
        sendReportBtn.addEventListener('click', sendReport);
    }
    
    window.addEventListener('click', (e) => {
        // Закрываем только модальное окно достижений, не режима игры
        const gameModeModal = document.getElementById('gameModeModal');
        if (e.target === modal && (!gameModeModal || !gameModeModal.classList.contains('active'))) {
            modal.classList.remove('active');
        }
        if (e.target === createModal) {
            createModal.classList.remove('active');
        }
    });
}

// Регистрация игрока
function registerPlayer() {
    // Генерируем уникальный ID если его нет
    if (!gameData.playerId) {
        gameData.playerId = generatePlayerId();
    }
    
    // Устанавливаем имя из Telegram или по умолчанию
    if (gameData.telegramUser) {
        gameData.player.name = gameData.telegramUser.firstName || 'Игрок';
        if (gameData.telegramUser.lastName) {
            gameData.player.name += ' ' + gameData.telegramUser.lastName;
        }
    } else {
        gameData.player.name = 'Игрок';
    }
    
    gameData.isRegistered = true;
    
    // Закрываем модальное окно регистрации
    const registrationModal = document.getElementById('registrationModal');
    if (registrationModal) {
        registrationModal.classList.remove('active');
    }
    
    saveGameData();
    updatePlayerStats();
    renderCharacter();
    
    // Показываем выбор режима игры
    showGameModeSelection();
}

// Показать модальное окно регистрации
function showRegistrationModal() {
    const modal = document.getElementById('registrationModal');
    const infoDiv = document.getElementById('registrationInfo');
    
    if (!modal || !infoDiv) return;
    
    // Заполняем информацию о пользователе
    if (gameData.telegramUser) {
        infoDiv.innerHTML = `
            <p>Вы вошли через Telegram как:</p>
            <div class="telegram-user-info">
                <strong>${gameData.telegramUser.firstName} ${gameData.telegramUser.lastName || ''}</strong>
                ${gameData.telegramUser.username ? `<div>@${gameData.telegramUser.username}</div>` : ''}
            </div>
        `;
    } else {
        infoDiv.innerHTML = `
            <p>Для игры необходимо войти через Telegram</p>
            <p class="telegram-warning">Откройте игру через Telegram бота</p>
        `;
    }
    
    modal.classList.add('active');
}

// Показать модальное окно выбора режима
function showGameModeSelection() {
    const modal = document.getElementById('gameModeModal');
    if (modal) {
        modal.classList.add('active');
    }
}

// Показать модальное окно ввода ID партнера
function showPartnerIdModal() {
    const modal = document.getElementById('partnerIdModal');
    if (!modal) return;
    
    modal.classList.add('active');
    
    // Очищаем поле ввода
    const input = document.getElementById('partnerIdInput');
    if (input) {
        input.value = '';
        input.focus();
    }
    
    // Рендерим список друзей для выбора
    const friendsSelectList = document.getElementById('friendsSelectList');
    if (friendsSelectList && gameData.friends && gameData.friends.length > 0) {
        friendsSelectList.innerHTML = '';
        
        gameData.friends.forEach(friend => {
            const friendOption = document.createElement('div');
            friendOption.className = 'friend-select-option';
            friendOption.innerHTML = `
                <div class="friend-select-info">
                    <strong>${friend.name || `Друг (${friend.id})`}</strong>
                    <span class="friend-select-id">${friend.id}</span>
                </div>
                <button class="btn-primary btn-small" onclick="selectFriendAsPartner('${friend.id}')">Выбрать</button>
            `;
            friendsSelectList.appendChild(friendOption);
        });
    }
}

// Выбрать друга как партнера
function selectFriendAsPartner(friendId) {
    const friend = gameData.friends.find(f => f.id === friendId);
    if (!friend) return;
    
    // Создаем приглашение на партнерство
    createPartnerInvitation(friendId);
    
    gameData.partnerId = friendId;
    
    // Закрываем модальное окно
    const modal = document.getElementById('partnerIdModal');
    if (modal) {
        modal.classList.remove('active');
    }
    
    // Выбираем режим соревнования
    selectGameMode('competition');
    
    showNotification(`📤 Приглашение на партнерство отправлено ${friend.name || friendId}!`);
}

// Подключение к партнеру
function connectToPartner() {
    const partnerIdInput = document.getElementById('partnerIdInput');
    if (!partnerIdInput) return;
    
    const partnerId = partnerIdInput.value.trim().toUpperCase();
    
    if (!partnerId) {
        showNotification('Введите ID код партнера!');
        return;
    }
    
    if (partnerId === gameData.playerId) {
        showNotification('Нельзя играть с самим собой!');
        return;
    }
    
    // Создаем приглашение на партнерство
    createPartnerInvitation(partnerId);
    
    // Сохраняем ID партнера
    gameData.partnerId = partnerId;
    
    // Закрываем модальное окно
    const modal = document.getElementById('partnerIdModal');
    if (modal) {
        modal.classList.remove('active');
    }
    
    // Выбираем режим соревнования
    selectGameMode('competition');
    
    showNotification(`📤 Приглашение на партнерство отправлено игроку ${partnerId}!`);
}

// Создание приглашения на партнерство
function createPartnerInvitation(toPlayerId) {
    if (!gameData.partnerInvitations) {
        gameData.partnerInvitations = [];
    }
    
    // Проверяем, нет ли уже активного приглашения этому игроку
    const existingInvitation = gameData.partnerInvitations.find(inv => 
        inv.toPlayerId === toPlayerId && inv.status === 'pending'
    );
    
    if (existingInvitation) {
        console.log('Invitation already exists for this player');
        return;
    }
    
    const invitation = {
        id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        fromPlayerId: gameData.playerId,
        fromPlayerName: gameData.player.name || 'Игрок',
        toPlayerId: toPlayerId,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    gameData.partnerInvitations.push(invitation);
    saveGameData();
    
    console.log('Partner invitation created:', invitation);
    
    // Обновляем отображение приглашений
    renderPartnerInvitations();
}

// Рендеринг приглашений на партнерство
function renderPartnerInvitations() {
    const container = document.getElementById('partnerInvitations');
    if (!container) return;
    
    if (!gameData.partnerInvitations || gameData.partnerInvitations.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    // Фильтруем только активные приглашения (pending)
    const pendingInvitations = gameData.partnerInvitations.filter(inv => inv.status === 'pending');
    
    if (pendingInvitations.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    container.innerHTML = '<h4 style="margin-top: 15px; margin-bottom: 10px; color: #667eea;">📨 Приглашения на партнерство:</h4>';
    
    pendingInvitations.forEach(invitation => {
        const invitationCard = document.createElement('div');
        invitationCard.className = 'partner-invitation-card';
        invitationCard.style.cssText = `
            background: #f8f9fa;
            border: 2px solid #667eea;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
        `;
        
        invitationCard.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>${invitation.fromPlayerName}</strong> (ID: ${invitation.fromPlayerId})
                    <div style="font-size: 12px; color: #7f8c8d; margin-top: 5px;">
                        Приглашение отправлено: ${new Date(invitation.createdAt).toLocaleString('ru-RU')}
                    </div>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="btn-success btn-small" onclick="acceptPartnerInvitation('${invitation.id}')">✅ Принять</button>
                    <button class="btn-danger btn-small" onclick="rejectPartnerInvitation('${invitation.id}')">❌ Отклонить</button>
                </div>
            </div>
        `;
        
        container.appendChild(invitationCard);
    });
}

// Принятие приглашения на партнерство
function acceptPartnerInvitation(invitationId) {
    const invitation = gameData.partnerInvitations.find(inv => inv.id === invitationId);
    if (!invitation) {
        showNotification('Приглашение не найдено!');
        return;
    }
    
    if (invitation.status !== 'pending') {
        showNotification('Это приглашение уже обработано!');
        return;
    }
    
    // Устанавливаем партнера
    gameData.partnerId = invitation.fromPlayerId;
    
    // Отмечаем приглашение как принятое
    invitation.status = 'accepted';
    invitation.acceptedAt = new Date().toISOString();
    
    // Переключаемся в режим соревнования
    selectGameMode('competition');
    
    saveGameData();
    updatePartnerInfo();
    
    showNotification(`✅ Вы приняли приглашение от ${invitation.fromPlayerName}! Теперь вы играете вместе.`);
}

// Отклонение приглашения на партнерство
function rejectPartnerInvitation(invitationId) {
    const invitation = gameData.partnerInvitations.find(inv => inv.id === invitationId);
    if (!invitation) {
        showNotification('Приглашение не найдено!');
        return;
    }
    
    if (invitation.status !== 'pending') {
        showNotification('Это приглашение уже обработано!');
        return;
    }
    
    // Отмечаем приглашение как отклоненное
    invitation.status = 'rejected';
    invitation.rejectedAt = new Date().toISOString();
    
    saveGameData();
    renderPartnerInvitations();
    
    showNotification(`❌ Вы отклонили приглашение от ${invitation.fromPlayerName}.`);
}

// Экспорт функций для использования в HTML
window.acceptPartnerInvitation = acceptPartnerInvitation;
window.rejectPartnerInvitation = rejectPartnerInvitation;

// Копирование ID игрока
function copyPlayerId() {
    if (!gameData.playerId) return;
    
    navigator.clipboard.writeText(gameData.playerId).then(() => {
        showNotification('✅ ID код скопирован!');
    }).catch(() => {
        // Fallback для старых браузеров
        const textArea = document.createElement('textarea');
        textArea.value = gameData.playerId;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('✅ ID код скопирован!');
    });
}

// Рендеринг списка друзей
function renderFriends() {
    const friendsList = document.getElementById('friendsList');
    if (!friendsList) return;
    
    friendsList.innerHTML = '';
    
    if (!gameData.friends || gameData.friends.length === 0) {
        friendsList.innerHTML = '<div class="empty-friends">Пока нет друзей. Добавьте друга по ID коду!</div>';
        return;
    }
    
    gameData.friends.forEach(friend => {
        const friendCard = document.createElement('div');
        friendCard.className = 'friend-card';
        
        const isPartner = friend.id === gameData.partnerId;
        
        friendCard.innerHTML = `
            <div class="friend-info">
                <div class="friend-name">${friend.name || `Друг (${friend.id})`}</div>
                <div class="friend-id">ID: ${friend.id}</div>
                ${friend.telegramId ? `<div class="friend-telegram">Telegram ID: ${friend.telegramId}</div>` : ''}
                <div class="friend-added">Добавлен: ${new Date(friend.addedAt).toLocaleDateString('ru-RU')}</div>
            </div>
            <div class="friend-actions">
                ${isPartner ? '<span class="partner-badge">👥 Текущий партнер</span>' : ''}
                <button class="btn-success btn-small" onclick="playWithFriend('${friend.id}')" ${isPartner ? 'disabled' : ''}>
                    ${isPartner ? '✅ Играете вместе' : '🎮 Играть вместе'}
                </button>
                <button class="btn-danger btn-small" onclick="removeFriend('${friend.id}')">🗑️</button>
            </div>
        `;
        
        friendsList.appendChild(friendCard);
    });
}

// Добавление друга
function addFriend() {
    const friendIdInput = document.getElementById('friendIdInput');
    if (!friendIdInput) return;
    
    const friendId = friendIdInput.value.trim().toUpperCase();
    
    if (!friendId) {
        showNotification('Введите ID код друга!');
        return;
    }
    
    if (friendId === gameData.playerId) {
        showNotification('Нельзя добавить себя в друзья!');
        friendIdInput.value = '';
        return;
    }
    
    // Проверяем, не добавлен ли уже этот друг
    if (gameData.friends && gameData.friends.find(f => f.id === friendId)) {
        showNotification('Этот друг уже добавлен!');
        friendIdInput.value = '';
        return;
    }
    
    // Проверяем, не отправлена ли уже заявка этому другу
    if (gameData.friendRequests && gameData.friendRequests.find(r => r.friendId === friendId && r.status === 'pending')) {
        showNotification('Заявка этому другу уже отправлена!');
        friendIdInput.value = '';
        return;
    }
    
    // Создаем заявку в друзья
    if (!gameData.friendRequests) {
        gameData.friendRequests = [];
    }
    
    const newRequest = {
        id: `request_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        friendId: friendId,
        status: 'pending',
        sentAt: new Date().toISOString()
    };
    
    gameData.friendRequests.push(newRequest);
    
    // Очищаем поле ввода
    friendIdInput.value = '';
    
    saveGameData();
    renderFriends();
    showNotification(`📤 Заявка в друзья отправлена ${friendId}!`);
}

// Отмена заявки в друзья
function cancelFriendRequest(requestId) {
    if (!gameData.friendRequests) return;
    
    const request = gameData.friendRequests.find(r => r.id === requestId);
    if (!request) return;
    
    gameData.friendRequests = gameData.friendRequests.filter(r => r.id !== requestId);
    
    saveGameData();
    renderFriends();
    showNotification('✅ Заявка отменена');
}

// Принятие заявки в друзья (для будущего использования, если будет система подтверждения)
function acceptFriendRequest(requestId) {
    if (!gameData.friendRequests) return;
    
    const request = gameData.friendRequests.find(r => r.id === requestId);
    if (!request) return;
    
    // Обновляем статус заявки
    request.status = 'accepted';
    
    // Добавляем друга в список друзей
    if (!gameData.friends) {
        gameData.friends = [];
    }
    
    // Проверяем, не добавлен ли уже этот друг
    if (!gameData.friends.find(f => f.id === request.friendId)) {
        const newFriend = {
            id: request.friendId,
            name: `Друг (${request.friendId})`,
            telegramId: null,
            addedAt: new Date().toISOString()
        };
        
        gameData.friends.push(newFriend);
    }
    
    saveGameData();
    renderFriends();
    showNotification(`✅ Заявка от ${request.friendId} принята!`);
}

// Удаление друга
function removeFriend(friendId) {
    if (!confirm('Удалить этого друга из списка?')) {
        return;
    }
    
    if (!gameData.friends) return;
    
    gameData.friends = gameData.friends.filter(f => f.id !== friendId);
    
    // Если это был текущий партнер, отключаем режим соревнования
    if (gameData.partnerId === friendId) {
        gameData.partnerId = null;
        gameData.gameMode = 'single';
        gameData.player2 = null;
        gameData.currentPlayerId = 'player1';
        showNotification('Режим соревнования отключен, так как партнер удален из друзей.');
        updateUIForGameMode();
    }
    
    saveGameData();
    renderFriends();
    showNotification('✅ Друг удален');
}

// Играть с другом
function playWithFriend(friendId) {
    // Создаем приглашение на партнерство
    createPartnerInvitation(friendId);
    
    // Устанавливаем партнера
    gameData.partnerId = friendId;
    
    // Выбираем режим соревнования
    selectGameMode('competition');
    
    const friend = gameData.friends.find(f => f.id === friendId);
    showNotification(`📤 Приглашение на партнерство отправлено ${friend?.name || friendId}!`);
}

// Выбор режима игры
function selectGameMode(mode) {
    gameData.gameMode = mode;
    
    if (mode === 'competition') {
        // Проверяем, что введен ID партнера
        if (!gameData.partnerId) {
            showPartnerIdModal();
            return;
        }
        
        // Инициализируем общий список боссов для соревнования
        if (!gameData.sharedBosses) {
            gameData.sharedBosses = [];
        }
        
        // В режиме соревнования каждый игрок управляет только своим аккаунтом
        // player2 используется только для хранения данных партнера (если нужно)
        // Но управление доступно только для своего аккаунта (player)
        // Общение происходит через отчеты
        gameData.currentPlayerId = 'player1'; // Всегда свой аккаунт
    } else {
        // Одиночный режим - удаляем второго игрока
        gameData.player2 = null;
        gameData.currentPlayerId = 'player1';
    }
    
    // Скрываем модальное окно
    const modal = document.getElementById('gameModeModal');
    if (modal) {
        modal.classList.remove('active');
    }
    
    saveGameData();
    updateUIForGameMode();
    
    // Продолжаем инициализацию игры
    const player = getCurrentPlayer();
    
    // Восстанавливаем HP врага если есть сохраненный враг
    if (player.currentEnemy && player.currentEnemyHp !== null && player.currentEnemyHp !== undefined) {
        const enemy = gameData.enemies.find(e => e.id === player.currentEnemy);
        if (enemy) {
            enemy.hp = Math.min(player.currentEnemyHp, enemy.maxHp);
        }
    } else if (!player.currentEnemy) {
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

// Переключение между игроками отключено в режиме соревнования
// Каждый игрок управляет только своим аккаунтом
function switchPlayer(playerId) {
    // Функция отключена - каждый игрок видит только свои данные
    // В режиме соревнования можно обмениваться только сообщениями через отчеты
    showNotification('В режиме соревнования вы управляете только своим аккаунтом. Общайтесь с партнером через отчеты!');
}

// Обновление интерфейса в зависимости от режима игры
function updateUIForGameMode() {
    const playerSelector = document.getElementById('playerSelector');
    const singlePlayerNameSection = document.getElementById('singlePlayerNameSection');
    
    if (gameData.gameMode === 'competition') {
        // Показываем переключатель игроков
        if (playerSelector) playerSelector.style.display = 'flex';
        if (singlePlayerNameSection) singlePlayerNameSection.style.display = 'none'; // Скрываем поле ввода имени в дуо
        
        // Обновляем названия кнопок
        const player1Btn = document.getElementById('selectPlayer1');
        const player2Btn = document.getElementById('selectPlayer2');
        if (player1Btn) player1Btn.textContent = gameData.player.name || 'Вы';
        if (player2Btn && gameData.player2) {
            player2Btn.textContent = gameData.player2.name || `Партнер (${gameData.partnerId})`;
        }
        
        // Обновляем активную кнопку
        document.querySelectorAll('.player-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtnId = gameData.currentPlayerId === 'player1' ? 'selectPlayer1' : 'selectPlayer2';
        const activeBtn = document.getElementById(activeBtnId);
        if (activeBtn) activeBtn.classList.add('active');
    } else {
        // Скрываем переключатель игроков
        if (playerSelector) playerSelector.style.display = 'none';
        if (singlePlayerNameSection) singlePlayerNameSection.style.display = 'flex';
    }
    
    // Обновляем поле ввода имени (только в одиночной игре)
    if (gameData.gameMode !== 'competition') {
        const nameInput = document.getElementById('playerNameInput');
        if (nameInput) {
            nameInput.value = getCurrentPlayer().name || 'Игрок';
        }
    }
}

// Сохранение имени игрока
function savePlayerName() {
    const nameInput = document.getElementById('playerNameInput');
    if (!nameInput) return;
    
    const newName = nameInput.value.trim();
    if (newName === '') {
        showNotification('Имя не может быть пустым!');
        nameInput.value = getCurrentPlayer().name || 'Игрок';
        return;
    }
    
    if (newName.length > 20) {
        showNotification('Имя слишком длинное! Максимум 20 символов.');
        nameInput.value = getCurrentPlayer().name || 'Игрок';
        return;
    }
    
    const player = getCurrentPlayer();
    // Сохраняем имя как есть, без преобразования в верхний регистр
    player.name = newName;
    
    // Обновляем кнопку переключения если в режиме соревнования
    if (gameData.gameMode === 'competition') {
        const btnId = gameData.currentPlayerId === 'player1' ? 'selectPlayer1' : 'selectPlayer2';
        const btn = document.getElementById(btnId);
        if (btn) btn.textContent = player.name;
    }
    
    updatePlayerStats();
    renderCharacter();
    updateUIForGameMode();
    saveGameData();
    
    showNotification(`✅ Имя изменено на "${player.name}"`);
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
    
    // Если переключились на вкладку отчетов, обновляем список
    if (tabName === 'reports') {
        renderReports();
    }
    
    // Если переключились на вкладку персонажа, обновляем отображение
    if (tabName === 'character') {
        renderCharacter();
    }
    
    // Если переключились на вкладку экипировки, обновляем список
    if (tabName === 'equipment') {
        renderEquipment();
    }
    
    // Если переключились на вкладку магазина, обновляем список
    if (tabName === 'shop') {
        renderShop();
    }
    
    // Если переключились на вкладку боссов, обновляем список
    if (tabName === 'bosses') {
        renderBosses();
    }
}

// Обновление статистики игрока
function updatePlayerStats() {
    const player = getCurrentPlayer();
    const totalStats = calculateTotalStats(player);
    
    document.getElementById('playerLevel').textContent = player.level;
    // В режиме дуо показываем общий прогресс
    if (gameData.gameMode === 'competition' && gameData.player2) {
        const sharedDamage = (gameData.player.accumulatedDamage || 0) + (gameData.player2.accumulatedDamage || 0);
        const sharedCoins = (gameData.player.coins || 0) + (gameData.player2.coins || 0);
        const sharedXP = (gameData.player.xp || 0) + (gameData.player2.xp || 0);
        
        document.getElementById('playerXP').textContent = `${player.xp} (общий: ${sharedXP})`;
        document.getElementById('playerXPNeeded').textContent = getXPNeeded(player.level);
        document.getElementById('playerCoins').textContent = `${player.coins} (общий: ${sharedCoins})`;
    } else {
        document.getElementById('playerXP').textContent = player.xp;
        document.getElementById('playerXPNeeded').textContent = getXPNeeded(player.level);
        document.getElementById('playerCoins').textContent = player.coins;
    }
    document.getElementById('characterName').textContent = player.name;
    
    // Обновляем поле ввода имени
    const nameInput = document.getElementById('playerNameInput');
    if (nameInput) {
        nameInput.value = player.name;
    }
    
    // Обновляем боевые статы если они есть
    if (document.getElementById('playerAttack')) {
        document.getElementById('playerAttack').textContent = totalStats.attack;
        document.getElementById('playerDefense').textContent = totalStats.defense;
        document.getElementById('playerHealth').textContent = player.stats.health;
        document.getElementById('playerMaxHealth').textContent = player.stats.maxHealth;
        document.getElementById('playerCrit').textContent = totalStats.crit;
    }
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
    
    // Объединяем стандартные и пользовательские достижения
    let allAchievements = [...gameData.achievements];
    if (player.customAchievements && player.customAchievements.length > 0) {
        allAchievements = [...allAchievements, ...player.customAchievements];
    }
    
    let filteredAchievements = allAchievements;
    if (filter !== 'all') {
        filteredAchievements = allAchievements.filter(a => a.difficulty === filter);
    }
    
    filteredAchievements.forEach(achievement => {
        const lastCompletion = player.completedAchievements.find(ca => ca.id === achievement.id);
        const isAvailable = isAchievementAvailable(achievement.id);
        const timeLeft = getTimeUntilAvailable(achievement.id);
        const isCustom = achievement.isCustom || false;
        const rewards = gameData.achievementRewards[achievement.difficulty];
        
        // Проверяем статус в режиме соревнования
        const inProgress = gameData.gameMode === 'competition' && 
                          player.inProgressAchievements && 
                          player.inProgressAchievements.find(ipa => ipa.id === achievement.id);
        
        // Проверяем, есть ли ожидающий проверки отчет для этого достижения
        const pendingReport = gameData.gameMode === 'competition' && gameData.reports && 
                            gameData.reports.find(r => r.achievementId === achievement.id && 
                            r.playerId === gameData.currentPlayerId && r.status === 'pending');
        
        // Проверяем, есть ли отклоненный отчет
        const rejectedReport = gameData.gameMode === 'competition' && gameData.reports && 
                              gameData.reports.find(r => r.achievementId === achievement.id && 
                              r.playerId === gameData.currentPlayerId && r.status === 'rejected');
        
        const card = document.createElement('div');
        let statusClass = '';
        if (lastCompletion && !isAvailable) statusClass = 'completed';
        else if (inProgress) statusClass = 'in-progress';
        else if (rejectedReport) statusClass = 'rejected';
        else if (isAvailable) statusClass = 'available';
        else statusClass = 'cooldown';
        
        card.className = `achievement-card ${statusClass} ${isCustom ? 'custom-achievement' : ''}`;
        
        // Формируем кнопки действий
        let actionButtons = '';
        if (gameData.gameMode === 'competition') {
            // Режим соревнования
            if (rejectedReport) {
                // Отклоненный отчет - показываем кнопки отказаться/переделать
                actionButtons = `
                    <button class="btn-danger btn-small" onclick="cancelAchievement('${achievement.id}')">Отказаться</button>
                    <button class="btn-primary" onclick="restartAchievement('${achievement.id}')">🔄 Переделать</button>
                `;
            } else if (pendingReport) {
                // Отчет отправлен, ждем проверки
                actionButtons = `<button class="btn-primary" disabled>⏳ Ожидает проверки</button>`;
            } else if (inProgress) {
                // В процессе выполнения - нужно отправить отчет
                actionButtons = `<button class="btn-warning" onclick="openReportModal('${achievement.id}')">📸 Отправить отчет</button>`;
            } else if (isAvailable) {
                // Можно начать выполнение
                actionButtons = `<button class="btn-primary" onclick="startAchievement('${achievement.id}')">▶️ Начать выполнять</button>`;
            } else {
                actionButtons = `<button class="btn-primary" disabled>⏳ Ожидание (${timeLeft})</button>`;
            }
        } else {
            // Одиночная игра - обычная логика
            if (isAvailable) {
                actionButtons = `<button class="btn-primary" onclick="openAchievementModal('${achievement.id}')">Отметить</button>`;
            } else {
                actionButtons = `<button class="btn-primary" disabled>⏳ Ожидание (${timeLeft})</button>`;
            }
        }
        
        if (isCustom) {
            actionButtons += `<button class="btn-small btn-delete" onclick="deleteCustomAchievement('${achievement.id}')">🗑️</button>`;
        }
        
        card.innerHTML = `
            <div class="achievement-info">
                <div class="achievement-name">
                    ${achievement.name}
                    ${isCustom ? '<span class="custom-badge">✏️</span>' : ''}
                    ${inProgress ? '<span class="in-progress-badge">🔄 В процессе</span>' : ''}
                    ${rejectedReport ? '<span class="rejected-badge">❌ Отклонено</span>' : ''}
                </div>
                <div class="achievement-desc">${achievement.desc || ''}</div>
                ${rejectedReport && rejectedReport.rejectionReason ? `
                    <div class="rejection-reason">
                        <strong>Причина отклонения:</strong> ${rejectedReport.rejectionReason}
                    </div>
                ` : ''}
                <div class="achievement-meta">
                    <span class="difficulty-badge difficulty-${achievement.difficulty}">
                        ${achievement.difficulty === 'easy' ? 'Простое' : achievement.difficulty === 'medium' ? 'Среднее' : 'Сложное'}
                    </span>
                    <span class="achievement-points">+${rewards.xp} опыта, +${rewards.coins} монет</span>
                    ${lastCompletion ? `<span>✅ Выполнено: ${new Date(lastCompletion.date).toLocaleDateString('ru-RU')}</span>` : ''}
                    ${!isAvailable && timeLeft ? `<span class="cooldown-timer">⏰ Доступно через: ${timeLeft}</span>` : ''}
                </div>
            </div>
            <div class="achievement-actions">
                ${actionButtons}
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
    console.log('openAchievementModal called:', achievementId, 'gameMode:', gameData.gameMode);
    
    // В режиме соревнования не используем это окно напрямую
    if (gameData.gameMode === 'competition') {
        // Предлагаем отправить отчет
        console.log('Competition mode - redirecting to report modal');
        openReportModal(achievementId);
        return;
    }
    
    const player = getCurrentPlayer();
    
    // Ищем достижение в стандартных или пользовательских
    let achievement = gameData.achievements.find(a => a.id === achievementId);
    if (!achievement && player.customAchievements) {
        achievement = player.customAchievements.find(a => a.id === achievementId);
    }
    
    if (!achievement) {
        console.error('Achievement not found:', achievementId);
        showNotification('Достижение не найдено!');
        return;
    }
    
    const modal = document.getElementById('achievementModal');
    if (!modal) {
        console.error('Achievement modal not found in DOM');
        showNotification('Ошибка: модальное окно не найдено');
        return;
    }
    
    const nameEl = document.getElementById('modalAchievementName');
    const descEl = document.getElementById('modalAchievementDesc');
    const dateEl = document.getElementById('achievementDate');
    
    if (!nameEl || !descEl || !dateEl) {
        console.error('Modal elements not found');
        return;
    }
    
    nameEl.textContent = achievement.name;
    descEl.textContent = achievement.desc || '';
    dateEl.value = new Date().toISOString().split('T')[0];
    modal.dataset.achievementId = achievementId;
    
    modal.classList.add('active');
    console.log('Modal opened for achievement:', achievement.name);
}

// Начать выполнение достижения (режим соревнования)
function startAchievement(achievementId) {
    console.log('startAchievement called:', achievementId);
    
    const player = getCurrentPlayer();
    
    if (!player.inProgressAchievements) {
        player.inProgressAchievements = [];
    }
    
    // Проверяем, не начато ли уже
    if (player.inProgressAchievements.find(ipa => ipa.id === achievementId)) {
        showNotification('Это достижение уже в процессе выполнения!');
        console.log('Achievement already in progress');
        return;
    }
    
    // Ищем достижение
    let achievement = gameData.achievements.find(a => a.id === achievementId);
    if (!achievement && player.customAchievements) {
        achievement = player.customAchievements.find(a => a.id === achievementId);
    }
    
    if (!achievement) {
        showNotification('Достижение не найдено!');
        console.error('Achievement not found:', achievementId);
        return;
    }
    
    console.log('Found achievement:', achievement.name);
    
    // Добавляем в процесс выполнения
    player.inProgressAchievements.push({
        id: achievementId,
        startedAt: new Date().toISOString(),
        reportSent: false
    });
    
    console.log('Added to inProgressAchievements. Total:', player.inProgressAchievements.length);
    
    // Сохраняем данные
    saveGameData();
    
    // Обновляем интерфейс
    renderAchievements();
    
    // Показываем напоминание
    setTimeout(() => {
        showReminderModal(achievement);
    }, 100); // Небольшая задержка для корректного отображения
    
    showNotification(`✅ Начато выполнение "${achievement.name}"! Не забудьте отправить отчет!`);
}

// Показать напоминание об отчете
function showReminderModal(achievement) {
    console.log('Showing reminder modal for:', achievement.name);
    
    // Удаляем существующее модальное окно если есть
    const existingModal = document.querySelector('.reminder-modal')?.closest('.modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const reminderModal = document.createElement('div');
    reminderModal.className = 'modal active';
    reminderModal.style.zIndex = '2000';
    reminderModal.style.display = 'flex';
    reminderModal.innerHTML = `
        <div class="modal-content reminder-modal" style="max-width: 500px; margin: auto;">
            <h2>⚠️ Напоминание!</h2>
            <div class="reminder-content">
                <p><strong>Вы начали выполнение достижения:</strong></p>
                <p class="reminder-achievement-name" style="font-size: 18px; font-weight: bold; color: #667eea; margin: 10px 0;">${achievement.name}</p>
                <div class="reminder-warning" style="background: #fff3cd; border: 2px solid #ffc107; border-radius: 8px; padding: 15px; margin: 15px 0;">
                    <strong style="color: #856404;">⚠️ ОБЯЗАТЕЛЬНО СДЕЛАЙТЕ ОТЧЕТ СВОЕМУ ПАРТНЕРУ!</strong>
                    <p style="margin-top: 10px; color: #856404;">Только после одобрения партнером задание будет считаться выполненным.</p>
                </div>
                <p style="margin-top: 15px;">📸 Не забудьте отправить фото или видео-отчет в разделе "Отчеты"!</p>
            </div>
            <div style="margin-top: 20px;">
                <button class="btn-primary" onclick="this.closest('.modal').remove(); console.log('Reminder modal closed');">Понятно</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(reminderModal);
    
    // Закрытие при клике вне модального окна (но не закрываем автоматически)
    reminderModal.addEventListener('click', (e) => {
        if (e.target === reminderModal) {
            // Можно закрыть кликом вне, но лучше оставить только кнопку
            // reminderModal.remove();
        }
    });
    
    console.log('Reminder modal added to DOM');
}

// Открыть модальное окно для отправки отчета
function openReportModal(achievementId) {
    const player = getCurrentPlayer();
    
    // Проверяем, что достижение в процессе выполнения
    if (!player.inProgressAchievements || !player.inProgressAchievements.find(ipa => ipa.id === achievementId)) {
        showNotification('Сначала начните выполнение достижения!');
        return;
    }
    
    // Переключаемся на вкладку отчетов
    switchTab('reports');
    
    // Устанавливаем выбранное достижение в форме
    const achievementSelect = document.getElementById('reportAchievementSelect');
    if (achievementSelect) {
        achievementSelect.value = achievementId;
        // Скроллим к форме
        setTimeout(() => {
            const reportForm = document.querySelector('.report-form');
            if (reportForm) {
                reportForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 100);
    }
    
    showNotification('📸 Выберите фото и отправьте отчет партнеру!');
}

// Отказаться от задания
function cancelAchievement(achievementId) {
    if (!confirm('Отказаться от этого задания на сегодня? Оно будет доступно снова через 24 часа.')) {
        return;
    }
    
    const player = getCurrentPlayer();
    
    // Удаляем из процесса выполнения
    if (player.inProgressAchievements) {
        player.inProgressAchievements = player.inProgressAchievements.filter(ipa => ipa.id !== achievementId);
    }
    
    // Удаляем отклоненные отчеты для этого достижения
    if (gameData.reports) {
        gameData.reports = gameData.reports.filter(r => 
            !(r.achievementId === achievementId && r.playerId === gameData.currentPlayerId && r.status === 'rejected')
        );
    }
    
    saveGameData();
    renderAchievements();
    renderReports();
    showNotification('✅ Задание отменено. Будет доступно через 24 часа.');
}

// Переделать задание
function restartAchievement(achievementId) {
    const player = getCurrentPlayer();
    
    // Удаляем отклоненные отчеты
    if (gameData.reports) {
        gameData.reports = gameData.reports.filter(r => 
            !(r.achievementId === achievementId && r.playerId === gameData.currentPlayerId && r.status === 'rejected')
        );
    }
    
    // Добавляем в процесс выполнения заново
    if (!player.inProgressAchievements) {
        player.inProgressAchievements = [];
    }
    
    // Удаляем старую запись если есть
    player.inProgressAchievements = player.inProgressAchievements.filter(ipa => ipa.id !== achievementId);
    
    // Добавляем новую
    player.inProgressAchievements.push({
        id: achievementId,
        startedAt: new Date().toISOString(),
        reportSent: false
    });
    
    saveGameData();
    renderAchievements();
    renderReports();
    
    // Показываем напоминание
    let achievement = gameData.achievements.find(a => a.id === achievementId);
    if (!achievement && player.customAchievements) {
        achievement = player.customAchievements.find(a => a.id === achievementId);
    }
    
    if (achievement) {
        showReminderModal(achievement);
    }
    
    showNotification('🔄 Задание отправлено на переделку! Не забудьте отправить отчет с фото!');
}

// Расчет урона за достижение (старая функция, оставлена для совместимости)
function calculateAchievementDamage(achievement, player) {
    if (!achievement || !player) {
        console.error('calculateAchievementDamage: achievement or player is missing');
        return { damage: 0, isCrit: false };
    }
    
    // Используем новые правила начисления урона
    const rewards = gameData.achievementRewards[achievement.difficulty];
    if (!rewards) {
        return { damage: 0, isCrit: false };
    }
    
    const baseDamage = rewards.damage;
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
    if (player.accumulatedDamage === undefined || player.accumulatedDamage === null || player.accumulatedDamage <= 0) {
        showNotification('Нет накопленного урона! Выполните достижения, чтобы накопить урон.');
        return;
    }
    
    const enemy = gameData.enemies.find(e => e.id === player.currentEnemy);
    if (!enemy) {
        startCombat();
        return;
    }
    
    // Используем весь накопленный урон для атаки
    const damage = player.accumulatedDamage;
    const totalStats = calculateTotalStats(player);
    
    // Проверка крита (шанс зависит от стата крита)
    const isCrit = Math.random() * 100 < totalStats.crit;
    const finalDamage = isCrit ? Math.floor(damage * 1.5) : damage;
    
    // Наносим урон
    enemy.hp = Math.max(0, enemy.hp - finalDamage);
    
    // Сохраняем HP врага в данных игрока
    player.currentEnemyHp = enemy.hp;
    
    // Урон НЕ сбрасывается после атаки - продолжает накапливаться
    // Это позволяет игроку накапливать урон между сессиями и использовать его когда нужно
    // Опыт, монеты и урон сохраняются между сессиями и не сбрасываются автоматически
    
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
    
    // Сохраняем HP врага в данных игрока
    player.currentEnemyHp = enemy.hp;
    
    const hpBar = document.getElementById('enemyHpBar');
    const hpText = document.getElementById('enemyHpText');
    
    if (hpBar) {
        const percent = (enemy.hp / enemy.maxHp) * 100;
        hpBar.style.width = `${percent}%`;
    }
    
    if (hpText) {
        hpText.textContent = `${enemy.hp}/${enemy.maxHp} HP`;
    }
    
    // Сохраняем данные после обновления HP
    saveGameData();
}

// Начало боя (выбор нового врага)
function startCombat() {
    const player = getCurrentPlayer();
    
    // Инициализация накопленного урона если его нет (но не сбрасываем существующий!)
    if (player.accumulatedDamage === undefined || player.accumulatedDamage === null) {
        player.accumulatedDamage = 0;
    }
    // Урон сохраняется и накапливается между сессиями, не сбрасывается
    
    // Выбираем врага по уровню игрока
    const availableEnemies = gameData.enemies.filter(e => e.level <= player.level + 2);
    let selectedEnemy;
    
    if (availableEnemies.length === 0) {
        selectedEnemy = gameData.enemies[0];
        player.currentEnemy = selectedEnemy.id;
    } else {
        const randomEnemy = availableEnemies[Math.floor(Math.random() * availableEnemies.length)];
        selectedEnemy = randomEnemy;
        player.currentEnemy = randomEnemy.id;
    }
    
    // Восстанавливаем или загружаем HP врага
    const enemy = gameData.enemies.find(e => e.id === selectedEnemy.id);
    if (enemy) {
        // Если есть сохраненное HP и это тот же враг, восстанавливаем его
        if (player.currentEnemyHp !== null && player.currentEnemyHp !== undefined && player.currentEnemy === selectedEnemy.id) {
            enemy.hp = Math.min(player.currentEnemyHp, enemy.maxHp);
        } else {
            // Иначе полное HP
            enemy.hp = enemy.maxHp;
            player.currentEnemyHp = enemy.maxHp;
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
    player.currentEnemyHp = null;
    
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
    
    // Ищем достижение в стандартных или пользовательских
    let achievement = gameData.achievements.find(a => a.id === achievementId);
    if (!achievement && player.customAchievements) {
        achievement = player.customAchievements.find(a => a.id === achievementId);
    }
    
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
    
    console.log('Confirming achievement:', {
        achievementId: achievementId,
        achievementName: achievement.name,
        date: date,
        playerName: player.name
    });
    
    // Сохранение timestamp выполнения
    const timestamp = new Date().toISOString();
    
    // Обновление или добавление достижения
    const existingIndex = player.completedAchievements.findIndex(ca => ca.id === achievementId);
    if (existingIndex >= 0) {
        player.completedAchievements[existingIndex] = {
            id: achievementId,
            date: date,
            timestamp: timestamp,
            difficulty: achievement.difficulty
        };
    } else {
        player.completedAchievements.push({
            id: achievementId,
            date: date,
            timestamp: timestamp,
            difficulty: achievement.difficulty
        });
    }
    
    // Получаем награды по уровню сложности
    const rewards = gameData.achievementRewards[achievement.difficulty];
    if (!rewards) {
        console.error('Rewards not found for difficulty:', achievement.difficulty);
        modal.classList.remove('active');
        return;
    }
    
    // НАКАПЛИВАЕМ УРОН ЗА ДОСТИЖЕНИЕ!
    const totalStats = calculateTotalStats(player);
    const baseDamage = rewards.damage;
    const attackBonus = totalStats.attack;
    const totalDamage = baseDamage + attackBonus;
    
    // Проверка крита
    const isCrit = Math.random() * 100 < totalStats.crit;
    const finalDamage = isCrit ? Math.floor(totalDamage * 1.5) : totalDamage;
    
    // Накапливаем урон - он сохраняется между сессиями и не сбрасывается
    if (player.accumulatedDamage === undefined || player.accumulatedDamage === null) {
        player.accumulatedDamage = 0;
    }
    // Урон накапливается постоянно и не сбрасывается автоматически
    player.accumulatedDamage += finalDamage;
    
    // Добавление опыта и монет по новым правилам
    addXP(rewards.xp);
    
    // Добавление монет
    if (player.coins === undefined || player.coins === null) {
        player.coins = 0;
    }
    player.coins += rewards.coins;
    
    // Сохраняем данные ПЕРЕД закрытием модального окна
    saveGameData();
    
    // Закрываем модальное окно
    modal.classList.remove('active');
    
    // Обновляем интерфейс
    renderAchievements();
    renderCombat(); // Обновляем интерфейс боя для показа накопленного урона
    updatePlayerStats(); // Обновляем статы
    
    // В режиме дуо показываем общий прогресс
    if (gameData.gameMode === 'competition' && gameData.player2) {
        const sharedDamage = (gameData.player.accumulatedDamage || 0) + (gameData.player2.accumulatedDamage || 0);
        const sharedCoins = (gameData.player.coins || 0) + (gameData.player2.coins || 0);
        const sharedXP = (gameData.player.xp || 0) + (gameData.player2.xp || 0);
        
        const critText = isCrit ? ' 💥 КРИТ!' : '';
        showNotification(`✅ Достижение "${achievement.name}" выполнено! Накоплено ${finalDamage} урона${critText} (ваш урон: ${player.accumulatedDamage}, общий с партнером: ${sharedDamage})! +${rewards.xp} опыта, +${rewards.coins} монет (общий опыт: ${sharedXP}, общие монеты: ${sharedCoins})`);
    } else {
        const critText = isCrit ? ' 💥 КРИТ!' : '';
        showNotification(`✅ Достижение "${achievement.name}" выполнено! Накоплено ${finalDamage} урона${critText} (всего: ${player.accumulatedDamage})! +${rewards.xp} опыта, +${rewards.coins} монет`);
    }
    
    console.log('Achievement completed successfully:', {
        achievement: achievement.name,
        achievementId: achievementId,
        difficulty: achievement.difficulty,
        xp: rewards.xp,
        coins: rewards.coins,
        damage: finalDamage,
        totalDamage: player.accumulatedDamage,
        isCrit: isCrit,
        completedAchievementsCount: player.completedAchievements.length
    });
}

// Создание пользовательского достижения
function createCustomAchievement() {
    const nameInput = document.getElementById('newAchievementName');
    const descInput = document.getElementById('newAchievementDesc');
    const selectedDifficulty = document.querySelector('.difficulty-option.selected');
    
    if (!nameInput || !nameInput.value.trim()) {
        alert('Введите название достижения!');
        return;
    }
    
    if (!selectedDifficulty) {
        alert('Выберите уровень сложности!');
        return;
    }
    
    const difficulty = selectedDifficulty.dataset.difficulty;
    const player = getCurrentPlayer();
    
    if (!player.customAchievements) {
        player.customAchievements = [];
    }
    
    // Создаем уникальный ID
    const newId = `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const newAchievement = {
        id: newId,
        name: nameInput.value.trim(),
        desc: descInput.value.trim() || '',
        difficulty: difficulty,
        isCustom: true
    };
    
    player.customAchievements.push(newAchievement);
    
    // Закрываем модальное окно
    document.getElementById('createAchievementModal').classList.remove('active');
    
    // Очищаем форму
    nameInput.value = '';
    descInput.value = '';
    document.querySelectorAll('.difficulty-option').forEach(btn => btn.classList.remove('selected'));
    
    // Обновляем список достижений
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    renderAchievements(activeFilter);
    saveGameData();
    
    showNotification(`✅ Достижение "${newAchievement.name}" создано!`);
}

// Удаление пользовательского достижения
function deleteCustomAchievement(achievementId) {
    if (!confirm('Удалить это достижение?')) {
        return;
    }
    
    const player = getCurrentPlayer();
    if (!player.customAchievements) {
        return;
    }
    
    const index = player.customAchievements.findIndex(a => a.id === achievementId);
    if (index >= 0) {
        player.customAchievements.splice(index, 1);
        renderAchievements();
        saveGameData();
        showNotification('✅ Достижение удалено');
    }
}

// Рендеринг персонажа на Canvas
function renderCharacter() {
    const player = getCurrentPlayer();
    const canvas = document.getElementById('characterCanvas');
    
    if (!canvas) return;
    
    // Обновляем отображение ID в личном кабинете
    const playerIdDisplay = document.getElementById('playerIdDisplay');
    if (playerIdDisplay) {
        // Генерируем ID если его нет
        if (!gameData.playerId) {
            gameData.playerId = generatePlayerId();
            saveGameData();
        }
        playerIdDisplay.textContent = gameData.playerId || '-';
    }
    
    // Обновляем информацию о Telegram
    const telegramInfo = document.getElementById('telegramInfo');
    const telegramUserName = document.getElementById('telegramUserName');
    if (telegramInfo && telegramUserName && gameData.telegramUser) {
        let telegramText = gameData.telegramUser.firstName || '';
        if (gameData.telegramUser.lastName) {
            telegramText += ' ' + gameData.telegramUser.lastName;
        }
        if (gameData.telegramUser.username) {
            telegramText += `<div>@${gameData.telegramUser.username}</div>`;
        }
        telegramUserName.innerHTML = telegramText;
        telegramInfo.style.display = 'block';
    } else if (telegramInfo) {
        telegramInfo.style.display = 'none';
    }
    
    // Рендерим список друзей
    renderFriends();
    
    // Обновляем отображение режима игры
    updateGameModeDisplay();
    
    // Инициализируем кастомизацию если её нет
    if (!player.customization) {
        player.customization = {
            face: {
                skinColor: '#FDBCB4',
                eyeType: 'normal',
                eyeColor: '#4A90E2',
                eyebrowType: 'normal',
                noseType: 'normal',
                mouthType: 'smile',
                hairColor: player.hairColor || '#8B4513',
                clothesColor: player.clothesColor || '#3498db'
            },
            hair: {
                style: 'short',
                color: player.hairColor || '#8B4513'
            },
            clothing: {
                top: 'tshirt',
                topColor: player.clothesColor || '#3498db',
                bottom: 'pants',
                bottomColor: '#2c3e50',
                shoes: 'sneakers',
                shoesColor: '#1a1a1a'
            },
            accessories: player.accessories || []
        };
    }
    
    const ctx = canvas.getContext('2d');
    const cust = player.customization;
    
    // Очищаем canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Рисуем персонажа по слоям
    drawCharacterOnCanvas(ctx, cust, canvas.width, canvas.height);
    
    // Рендерим UI кастомизации
    renderCustomizationUI(player);
}

// Отрисовка персонажа на Canvas
function drawCharacterOnCanvas(ctx, cust, width, height) {
    // Используем фиксированный размер для пиксельной графики
    const pixelSize = 2; // Размер одного пикселя
    const baseWidth = 200;
    const baseHeight = 300;
    const scaleX = width / baseWidth;
    const scaleY = height / baseHeight;
    
    // Функция для рисования пикселей
    const pixel = (x, y, size = 1) => {
        ctx.fillRect(x * scaleX, y * scaleY, size * scaleX, size * scaleY);
    };
    
    // Функция для рисования области
    const fillArea = (startX, startY, endX, endY) => {
        for (let y = startY; y <= endY; y++) {
            for (let x = startX; x <= endX; x++) {
                pixel(x, y, 1);
            }
        }
    };
    
    // Тело (нижний слой)
    ctx.fillStyle = cust.clothing.bottomColor || '#2c3e50';
    // Ноги/низ
    if (cust.clothing.bottom === 'pants') {
        // Штаны
        for (let y = 200; y < 280; y++) {
            for (let x = 70; x < 90; x++) pixel(x, y, 1);
            for (let x = 110; x < 130; x++) pixel(x, y, 1);
        }
    } else if (cust.clothing.bottom === 'shorts') {
        // Шорты
        for (let y = 200; y < 240; y++) {
            for (let x = 70; x < 90; x++) pixel(x, y, 1);
            for (let x = 110; x < 130; x++) pixel(x, y, 1);
        }
        // Ноги
        ctx.fillStyle = cust.face.skinColor || '#FDBCB4';
        for (let y = 240; y < 280; y++) {
            for (let x = 70; x < 90; x++) pixel(x, y, 1);
            for (let x = 110; x < 130; x++) pixel(x, y, 1);
        }
    } else if (cust.clothing.bottom === 'skirt') {
        // Юбка
        for (let y = 200; y < 240; y++) {
            for (let x = 80; x < 120; x++) pixel(x, y, 1);
        }
        // Ноги
        ctx.fillStyle = cust.face.skinColor || '#FDBCB4';
        for (let y = 240; y < 280; y++) {
            for (let x = 75; x < 95; x++) pixel(x, y, 1);
            for (let x = 105; x < 125; x++) pixel(x, y, 1);
        }
    }
    
    // Обувь
    ctx.fillStyle = cust.clothing.shoesColor || '#1a1a1a';
    if (cust.clothing.shoes === 'sneakers') {
        fillArea(65, 275, 95, 285);
        fillArea(105, 275, 135, 285);
    } else if (cust.clothing.shoes === 'boots') {
        fillArea(65, 270, 95, 285);
        fillArea(105, 270, 135, 285);
    } else if (cust.clothing.shoes === 'sandals') {
        fillArea(70, 278, 90, 285);
        fillArea(110, 278, 130, 285);
    } else if (cust.clothing.shoes === 'heels') {
        fillArea(70, 275, 85, 285);
        fillArea(115, 275, 130, 285);
        pixel(85, 280, 1);
        pixel(125, 280, 1);
    }
    
    // Торс
    ctx.fillStyle = cust.clothing.topColor || '#3498db';
    if (cust.clothing.top === 'tshirt' || cust.clothing.top === 'shirt') {
        // Футболка/рубашка
        for (let y = 140; y < 200; y++) {
            for (let x = 75; x < 125; x++) pixel(x, y, 1);
        }
        // Руки
        ctx.fillStyle = cust.face.skinColor || '#FDBCB4';
        for (let y = 150; y < 200; y++) {
            for (let x = 65; x < 75; x++) pixel(x, y, 1);
            for (let x = 125; x < 135; x++) pixel(x, y, 1);
        }
    } else if (cust.clothing.top === 'tank') {
        // Майка
        for (let y = 150; y < 200; y++) {
            for (let x = 80; x < 120; x++) pixel(x, y, 1);
        }
        // Руки
        ctx.fillStyle = cust.face.skinColor || '#FDBCB4';
        for (let y = 150; y < 200; y++) {
            for (let x = 65; x < 80; x++) pixel(x, y, 1);
            for (let x = 120; x < 135; x++) pixel(x, y, 1);
        }
    } else if (cust.clothing.top === 'dress') {
        // Платье
        for (let y = 140; y < 240; y++) {
            for (let x = 80; x < 120; x++) pixel(x, y, 1);
        }
        // Руки
        ctx.fillStyle = cust.face.skinColor || '#FDBCB4';
        for (let y = 150; y < 200; y++) {
            for (let x = 65; x < 80; x++) pixel(x, y, 1);
            for (let x = 120; x < 135; x++) pixel(x, y, 1);
        }
    } else if (cust.clothing.top === 'jacket') {
        // Куртка
        for (let y = 140; y < 200; y++) {
            for (let x = 70; x < 130; x++) pixel(x, y, 1);
        }
        // Руки
        ctx.fillStyle = cust.clothing.topColor || '#3498db';
        for (let y = 150; y < 200; y++) {
            for (let x = 60; x < 70; x++) pixel(x, y, 1);
            for (let x = 130; x < 140; x++) pixel(x, y, 1);
        }
    }
    
    // Голова (более круглая и человечная форма)
    ctx.fillStyle = cust.face.skinColor || '#FDBCB4';
    const headCenterX = 100;
    const headCenterY = 90; // Сместили центр немного ниже для более естественного вида
    const headRadiusX = 35; // Увеличили радиус по X для более круглой формы
    const headRadiusY = 50; // Уменьшили радиус по Y для более пропорциональной формы
    
    // Рисуем круглую голову
    for (let y = 30; y < 150; y++) {
        for (let x = 60; x < 140; x++) {
            const dx = (x - headCenterX) / headRadiusX;
            const dy = (y - headCenterY) / headRadiusY;
            if (dx * dx + dy * dy < 1) {
                pixel(x, y, 1);
            }
        }
    }
    
    // Шея
    ctx.fillStyle = cust.face.skinColor || '#FDBCB4';
    fillArea(90, 150, 110, 160);
    
    // Волосы (рисуются поверх головы, но под элементами лица)
    ctx.fillStyle = cust.hair.color || '#8B4513';
    drawHair(ctx, pixel, cust.hair.style || 'short', headCenterX, headCenterY);
    
    // Брови (выше глаз, не накладываются)
    ctx.fillStyle = '#2c3e50';
    drawEyebrows(ctx, pixel, cust.face.eyebrowType || 'normal', headCenterX, headCenterY);
    
    // Глаза (посередине лица, не накладываются на брови)
    ctx.fillStyle = cust.face.eyeColor || '#4A90E2';
    drawEyes(ctx, pixel, cust.face.eyeType || 'normal', headCenterX, headCenterY);
    
    // Нос (между глазами и ртом, не накладывается)
    ctx.fillStyle = cust.face.skinColor || '#FDBCB4';
    drawNose(ctx, pixel, cust.face.noseType || 'normal', headCenterX, headCenterY);
    
    // Рот (ниже носа, не накладывается)
    ctx.fillStyle = '#8B0000';
    drawMouth(ctx, pixel, cust.face.mouthType || 'smile', headCenterX, headCenterY);
}

// Рисование волос
function drawHair(ctx, pixel, style, centerX, centerY) {
    const hairColor = ctx.fillStyle;
    const headRadiusX = 35;
    const headRadiusY = 50;
    
    if (style === 'short') {
        // Короткие волосы - рисуются поверх головы, но не закрывают лицо
        for (let y = 30; y < 110; y++) {
            for (let x = 60; x < 140; x++) {
                const dx = (x - centerX) / (headRadiusX + 3);
                const dy = (y - centerY) / (headRadiusY + 5);
                // Волосы только сверху и по бокам, не закрывают лицо
                if (dx * dx + dy * dy < 1 && y < 105 && (y < 70 || Math.abs(x - centerX) > 20)) {
                    pixel(x, y, 1);
                }
            }
        }
    } else if (style === 'medium') {
        // Средние волосы
        for (let y = 30; y < 130; y++) {
            for (let x = 60; x < 140; x++) {
                const dx = (x - centerX) / (headRadiusX + 3);
                const dy = (y - centerY) / (headRadiusY + 8);
                if (dx * dx + dy * dy < 1 && y < 125 && (y < 70 || Math.abs(x - centerX) > 20)) {
                    pixel(x, y, 1);
                }
            }
        }
    } else if (style === 'long') {
        // Длинные волосы
        for (let y = 30; y < 150; y++) {
            for (let x = 60; x < 140; x++) {
                const dx = (x - centerX) / (headRadiusX + 3);
                const dy = (y - centerY) / (headRadiusY + 10);
                if (dx * dx + dy * dy < 1 && y < 145 && (y < 70 || Math.abs(x - centerX) > 20)) {
                    pixel(x, y, 1);
                }
            }
        }
    } else if (style === 'ponytail') {
        // Хвост - короткие волосы сверху
        for (let y = 30; y < 110; y++) {
            for (let x = 60; x < 140; x++) {
                const dx = (x - centerX) / (headRadiusX + 3);
                const dy = (y - centerY) / (headRadiusY + 5);
                if (dx * dx + dy * dy < 1 && y < 105 && (y < 70 || Math.abs(x - centerX) > 20)) {
                    pixel(x, y, 1);
                }
            }
        }
        // Хвост сзади
        for (let y = 110; y < 150; y++) {
            for (let x = 95; x < 105; x++) {
                pixel(x, y, 1);
            }
        }
    } else if (style === 'bun') {
        // Пучок - короткие волосы
        for (let y = 30; y < 110; y++) {
            for (let x = 60; x < 140; x++) {
                const dx = (x - centerX) / (headRadiusX + 3);
                const dy = (y - centerY) / (headRadiusY + 5);
                if (dx * dx + dy * dy < 1 && y < 105 && (y < 70 || Math.abs(x - centerX) > 20)) {
                    pixel(x, y, 1);
                }
            }
        }
        // Пучок сверху
        for (let y = 25; y < 40; y++) {
            for (let x = 90; x < 110; x++) {
                const dx = (x - centerX) / 10;
                const dy = (y - 32) / 7;
                if (dx * dx + dy * dy < 1) {
                    pixel(x, y, 1);
                }
            }
        }
    } else if (style === 'mohawk') {
        // Ирокез - только по центру
        for (let y = 30; y < 110; y++) {
            for (let x = 95; x < 105; x++) {
                pixel(x, y, 1);
            }
        }
    } else if (style === 'afro') {
        // Афро - большая круглая форма
        for (let y = 25; y < 115; y++) {
            for (let x = 55; x < 145; x++) {
                const dx = (x - centerX) / (headRadiusX + 8);
                const dy = (y - centerY) / (headRadiusY + 8);
                if (dx * dx + dy * dy < 1.1 && y < 110 && (y < 70 || Math.abs(x - centerX) > 25)) {
                    pixel(x, y, 1);
                }
            }
        }
    }
    // bald - просто не рисуем волосы
}

// Рисование бровей (выше глаз, не накладываются)
function drawEyebrows(ctx, pixel, type, centerX, centerY) {
    const browY = centerY - 25; // Брови выше центра лица
    const leftBrowStartX = centerX - 18;
    const leftBrowEndX = centerX - 5;
    const rightBrowStartX = centerX + 5;
    const rightBrowEndX = centerX + 18;
    
    if (type === 'normal') {
        // Обычные брови
        for (let x = leftBrowStartX; x < leftBrowEndX; x++) pixel(x, browY, 1);
        for (let x = rightBrowStartX; x < rightBrowEndX; x++) pixel(x, browY, 1);
    } else if (type === 'thick') {
        // Толстые брови
        for (let x = leftBrowStartX; x < leftBrowEndX; x++) {
            pixel(x, browY - 1, 1);
            pixel(x, browY, 1);
        }
        for (let x = rightBrowStartX; x < rightBrowEndX; x++) {
            pixel(x, browY - 1, 1);
            pixel(x, browY, 1);
        }
    } else if (type === 'thin') {
        // Тонкие брови
        for (let x = leftBrowStartX + 3; x < leftBrowEndX - 3; x++) pixel(x, browY, 1);
        for (let x = rightBrowStartX + 3; x < rightBrowEndX - 3; x++) pixel(x, browY, 1);
    } else if (type === 'angry') {
        // Сердитые брови (наклоненные вниз)
        for (let x = leftBrowStartX; x < leftBrowEndX; x++) {
            const offset = Math.floor((x - leftBrowStartX) * 0.3);
            pixel(x, browY - offset, 1);
        }
        for (let x = rightBrowStartX; x < rightBrowEndX; x++) {
            const offset = Math.floor((rightBrowEndX - x) * 0.3);
            pixel(x, browY - offset, 1);
        }
    }
}

// Рисование глаз (посередине лица, ниже бровей, не накладываются)
function drawEyes(ctx, pixel, type, centerX, centerY) {
    const eyeColor = ctx.fillStyle;
    const eyeY = centerY - 5; // Глаза немного выше центра лица
    const leftEyeX = centerX - 12;
    const rightEyeX = centerX + 12;
    const eyeSize = 6; // Размер глаза
    
    if (type === 'normal' || type === 'big') {
        // Обычные/большие глаза
        const size = type === 'big' ? eyeSize + 2 : eyeSize;
        // Левый глаз
        for (let x = leftEyeX - size/2; x < leftEyeX + size/2; x++) {
            for (let y = eyeY - size/2; y < eyeY + size/2; y++) {
                pixel(x, y, 1);
            }
        }
        // Правый глаз
        for (let x = rightEyeX - size/2; x < rightEyeX + size/2; x++) {
            for (let y = eyeY - size/2; y < eyeY + size/2; y++) {
                pixel(x, y, 1);
            }
        }
        // Зрачки
        ctx.fillStyle = '#000';
        pixel(leftEyeX, eyeY, 1);
        pixel(rightEyeX, eyeY, 1);
        ctx.fillStyle = eyeColor;
    } else if (type === 'small') {
        // Маленькие глаза
        const smallSize = eyeSize - 2;
        for (let x = leftEyeX - smallSize/2; x < leftEyeX + smallSize/2; x++) {
            for (let y = eyeY - smallSize/2; y < eyeY + smallSize/2; y++) {
                pixel(x, y, 1);
            }
        }
        for (let x = rightEyeX - smallSize/2; x < rightEyeX + smallSize/2; x++) {
            for (let y = eyeY - smallSize/2; y < eyeY + smallSize/2; y++) {
                pixel(x, y, 1);
            }
        }
        ctx.fillStyle = '#000';
        pixel(leftEyeX, eyeY, 1);
        pixel(rightEyeX, eyeY, 1);
        ctx.fillStyle = eyeColor;
    } else if (type === 'closed') {
        // Закрытые глаза (линия)
        for (let x = leftEyeX - eyeSize/2; x < leftEyeX + eyeSize/2; x++) pixel(x, eyeY, 1);
        for (let x = rightEyeX - eyeSize/2; x < rightEyeX + eyeSize/2; x++) pixel(x, eyeY, 1);
    } else if (type === 'wink') {
        // Подмигивание - левый глаз закрыт, правый открыт
        for (let x = leftEyeX - eyeSize/2; x < leftEyeX + eyeSize/2; x++) pixel(x, eyeY, 1);
        // Правый глаз открыт
        for (let x = rightEyeX - eyeSize/2; x < rightEyeX + eyeSize/2; x++) {
            for (let y = eyeY - eyeSize/2; y < eyeY + eyeSize/2; y++) {
                pixel(x, y, 1);
            }
        }
        ctx.fillStyle = '#000';
        pixel(rightEyeX, eyeY, 1);
        ctx.fillStyle = eyeColor;
    }
}

// Рисование носа (между глазами и ртом, не накладывается)
function drawNose(ctx, pixel, type, centerX, centerY) {
    const noseY = centerY + 10; // Нос ниже центра лица
    const noseX = centerX;
    
    if (type === 'normal') {
        // Обычный нос - две ноздри и кончик
        pixel(noseX - 2, noseY, 1);
        pixel(noseX + 2, noseY, 1);
        pixel(noseX, noseY + 2, 1);
    } else if (type === 'small') {
        // Маленький нос - только кончик
        pixel(noseX, noseY + 1, 1);
    } else if (type === 'big') {
        // Большой нос - более выраженный
        pixel(noseX - 3, noseY - 1, 1);
        pixel(noseX + 3, noseY - 1, 1);
        pixel(noseX - 2, noseY, 1);
        pixel(noseX + 2, noseY, 1);
        pixel(noseX, noseY + 3, 1);
    }
}

// Рисование рта (ниже носа, не накладывается)
function drawMouth(ctx, pixel, type, centerX, centerY) {
    const mouthY = centerY + 25; // Рот ниже центра лица, под носом
    const mouthX = centerX;
    
    if (type === 'smile') {
        // Улыбка - изогнутая линия вверх
        for (let x = mouthX - 8; x < mouthX + 8; x++) {
            const offset = Math.floor(Math.sin((x - mouthX) * 0.2) * 2);
            pixel(x, mouthY - offset, 1);
        }
    } else if (type === 'neutral') {
        // Нейтральный - прямая линия
        for (let x = mouthX - 6; x < mouthX + 6; x++) {
            pixel(x, mouthY, 1);
        }
    } else if (type === 'open') {
        // Открытый рот - овал
        for (let x = mouthX - 5; x < mouthX + 5; x++) {
            for (let y = mouthY - 2; y < mouthY + 2; y++) {
                const dx = (x - mouthX) / 5;
                const dy = (y - mouthY) / 2;
                if (dx * dx + dy * dy < 1) {
                    pixel(x, y, 1);
                }
            }
        }
    } else if (type === 'bigSmile') {
        // Широкая улыбка - большая изогнутая линия
        for (let x = mouthX - 12; x < mouthX + 12; x++) {
            const offset = Math.floor(Math.sin((x - mouthX) * 0.15) * 3);
            pixel(x, mouthY - offset, 1);
        }
    }
}

// Рендеринг UI кастомизации
function renderCustomizationUI(player) {
    const cust = player.customization;
    
    // Рендерим вкладки лица
    renderFaceCustomization(player, cust);
    
    // Рендерим вкладки волос
    renderHairCustomization(player, cust);
    
    // Рендерим вкладки одежды
    renderClothingCustomization(player, cust);
    
    // Аксессуары (старая система)
    const accessoriesList = document.getElementById('accessoriesList');
    if (accessoriesList) {
        accessoriesList.innerHTML = '';
        const allAccessories = [
            { id: 'none', name: 'Нет', price: 0 },
            ...(gameData.shopItems?.cosmetics || [])
        ];
        
        allAccessories.forEach(acc => {
            const item = document.createElement('div');
            const isOwned = acc.price === 0 || (cust.accessories && cust.accessories.includes(acc.id));
            const isEquipped = cust.accessories && cust.accessories.includes(acc.id);
            
            item.className = `accessory-item ${isOwned ? 'owned' : ''} ${isEquipped ? 'equipped' : ''}`;
            item.textContent = acc.name;
            
            if (isOwned) {
                item.addEventListener('click', () => {
                    if (!cust.accessories) cust.accessories = [];
                    
                    if (isEquipped) {
                        cust.accessories = cust.accessories.filter(a => a !== acc.id);
                    } else {
                        if (acc.id !== 'none') {
                            cust.accessories.push(acc.id);
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

// Рендеринг кастомизации лица
function renderFaceCustomization(player, cust) {
    const container = document.getElementById('faceCustomization');
    if (!container) return;
    
    // Получаем активную вкладку
    const activeTab = container.getAttribute('data-active-tab') || 'skin';
    container.setAttribute('data-active-tab', activeTab);
    
    container.innerHTML = '';
    
    if (activeTab === 'skin') {
        // Цвет кожи
        const skinColors = ['#FDBCB4', '#F1C27D', '#E0AC69', '#C68642', '#8D5524', '#654321'];
        skinColors.forEach(color => {
            const option = document.createElement('div');
            option.className = `color-option ${cust.face.skinColor === color ? 'selected' : ''}`;
            option.style.background = color;
            option.addEventListener('click', () => {
                cust.face.skinColor = color;
                renderCharacter();
                saveGameData();
            });
            container.appendChild(option);
        });
    } else if (activeTab === 'eyes') {
        // Тип и цвет глаз
        const eyeTypes = [
            { id: 'normal', name: 'Обычные' },
            { id: 'big', name: 'Большие' },
            { id: 'small', name: 'Маленькие' },
            { id: 'closed', name: 'Закрытые' },
            { id: 'wink', name: 'Подмигивание' }
        ];
        
        eyeTypes.forEach(type => {
            const option = document.createElement('div');
            option.className = `style-option ${cust.face.eyeType === type.id ? 'selected' : ''}`;
            option.textContent = type.name;
            option.addEventListener('click', () => {
                cust.face.eyeType = type.id;
                renderCharacter();
                saveGameData();
            });
            container.appendChild(option);
        });
        
        const colorLabel = document.createElement('div');
        colorLabel.className = 'custom-label';
        colorLabel.textContent = 'Цвет глаз:';
        colorLabel.style.marginTop = '15px';
        container.appendChild(colorLabel);
        
        const eyeColors = ['#4A90E2', '#2E7D32', '#8B4513', '#000000', '#FFD700', '#FF69B4'];
        eyeColors.forEach(color => {
            const option = document.createElement('div');
            option.className = `color-option ${cust.face.eyeColor === color ? 'selected' : ''}`;
            option.style.background = color;
            option.addEventListener('click', () => {
                cust.face.eyeColor = color;
                renderCharacter();
                saveGameData();
            });
            container.appendChild(option);
        });
    } else if (activeTab === 'eyebrows') {
        const eyebrowTypes = [
            { id: 'normal', name: 'Обычные' },
            { id: 'thick', name: 'Толстые' },
            { id: 'thin', name: 'Тонкие' },
            { id: 'angry', name: 'Сердитые' }
        ];
        
        eyebrowTypes.forEach(type => {
            const option = document.createElement('div');
            option.className = `style-option ${cust.face.eyebrowType === type.id ? 'selected' : ''}`;
            option.textContent = type.name;
            option.addEventListener('click', () => {
                cust.face.eyebrowType = type.id;
                renderCharacter();
                saveGameData();
            });
            container.appendChild(option);
        });
    } else if (activeTab === 'nose') {
        const noseTypes = [
            { id: 'normal', name: 'Обычный' },
            { id: 'small', name: 'Маленький' },
            { id: 'big', name: 'Большой' }
        ];
        
        noseTypes.forEach(type => {
            const option = document.createElement('div');
            option.className = `style-option ${cust.face.noseType === type.id ? 'selected' : ''}`;
            option.textContent = type.name;
            option.addEventListener('click', () => {
                cust.face.noseType = type.id;
                renderCharacter();
                saveGameData();
            });
            container.appendChild(option);
        });
    } else if (activeTab === 'mouth') {
        const mouthTypes = [
            { id: 'smile', name: 'Улыбка' },
            { id: 'neutral', name: 'Нейтральный' },
            { id: 'open', name: 'Открытый' },
            { id: 'bigSmile', name: 'Широкая улыбка' }
        ];
        
        mouthTypes.forEach(type => {
            const option = document.createElement('div');
            option.className = `style-option ${cust.face.mouthType === type.id ? 'selected' : ''}`;
            option.textContent = type.name;
            option.addEventListener('click', () => {
                cust.face.mouthType = type.id;
                renderCharacter();
                saveGameData();
            });
            container.appendChild(option);
        });
    }
}

// Рендеринг кастомизации волос
function renderHairCustomization(player, cust) {
    const container = document.getElementById('hairCustomization');
    if (!container) return;
    
    const activeTab = container.getAttribute('data-active-tab') || 'hairStyle';
    container.setAttribute('data-active-tab', activeTab);
    
    container.innerHTML = '';
    
    if (activeTab === 'hairStyle') {
        const hairStyles = [
            { id: 'short', name: 'Короткие' },
            { id: 'medium', name: 'Средние' },
            { id: 'long', name: 'Длинные' },
            { id: 'ponytail', name: 'Хвост' },
            { id: 'bun', name: 'Пучок' },
            { id: 'mohawk', name: 'Ирокез' },
            { id: 'afro', name: 'Афро' },
            { id: 'bald', name: 'Лысый' }
        ];
        
        hairStyles.forEach(style => {
            const option = document.createElement('div');
            option.className = `style-option ${cust.hair.style === style.id ? 'selected' : ''}`;
            option.textContent = style.name;
            option.addEventListener('click', () => {
                cust.hair.style = style.id;
                renderCharacter();
                saveGameData();
            });
            container.appendChild(option);
        });
    } else if (activeTab === 'hairColor') {
        const hairColors = ['#8B4513', '#000000', '#FFD700', '#FF69B4', '#00CED1', '#FF4500', '#FFFFFF', '#654321'];
        hairColors.forEach(color => {
            const option = document.createElement('div');
            option.className = `color-option ${cust.hair.color === color ? 'selected' : ''}`;
            option.style.background = color;
            option.addEventListener('click', () => {
                cust.hair.color = color;
                renderCharacter();
                saveGameData();
            });
            container.appendChild(option);
        });
    }
}

// Рендеринг кастомизации одежды
function renderClothingCustomization(player, cust) {
    const container = document.getElementById('clothingCustomization');
    if (!container) return;
    
    const activeTab = container.getAttribute('data-active-tab') || 'top';
    container.setAttribute('data-active-tab', activeTab);
    
    container.innerHTML = '';
    
    if (activeTab === 'top') {
        const topTypes = [
            { id: 'tshirt', name: 'Футболка' },
            { id: 'shirt', name: 'Рубашка' },
            { id: 'tank', name: 'Майка' },
            { id: 'dress', name: 'Платье' },
            { id: 'jacket', name: 'Куртка' }
        ];
        
        topTypes.forEach(type => {
            const option = document.createElement('div');
            option.className = `style-option ${cust.clothing.top === type.id ? 'selected' : ''}`;
            option.textContent = type.name;
            option.addEventListener('click', () => {
                cust.clothing.top = type.id;
                renderCharacter();
                saveGameData();
            });
            container.appendChild(option);
        });
        
        const colorLabel = document.createElement('div');
        colorLabel.className = 'custom-label';
        colorLabel.textContent = 'Цвет верха:';
        colorLabel.style.marginTop = '15px';
        container.appendChild(colorLabel);
        
        const topColors = ['#3498db', '#e91e63', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e74c3c', '#34495e'];
        topColors.forEach(color => {
            const option = document.createElement('div');
            option.className = `color-option ${cust.clothing.topColor === color ? 'selected' : ''}`;
            option.style.background = color;
            option.addEventListener('click', () => {
                cust.clothing.topColor = color;
                renderCharacter();
                saveGameData();
            });
            container.appendChild(option);
        });
    } else if (activeTab === 'bottom') {
        const bottomTypes = [
            { id: 'pants', name: 'Штаны' },
            { id: 'shorts', name: 'Шорты' },
            { id: 'skirt', name: 'Юбка' }
        ];
        
        bottomTypes.forEach(type => {
            const option = document.createElement('div');
            option.className = `style-option ${cust.clothing.bottom === type.id ? 'selected' : ''}`;
            option.textContent = type.name;
            option.addEventListener('click', () => {
                cust.clothing.bottom = type.id;
                renderCharacter();
                saveGameData();
            });
            container.appendChild(option);
        });
        
        const colorLabel = document.createElement('div');
        colorLabel.className = 'custom-label';
        colorLabel.textContent = 'Цвет низа:';
        colorLabel.style.marginTop = '15px';
        container.appendChild(colorLabel);
        
        const bottomColors = ['#2c3e50', '#34495e', '#7f8c8d', '#95a5a6', '#bdc3c7', '#ecf0f1', '#3498db', '#e74c3c'];
        bottomColors.forEach(color => {
            const option = document.createElement('div');
            option.className = `color-option ${cust.clothing.bottomColor === color ? 'selected' : ''}`;
            option.style.background = color;
            option.addEventListener('click', () => {
                cust.clothing.bottomColor = color;
                renderCharacter();
                saveGameData();
            });
            container.appendChild(option);
        });
    } else if (activeTab === 'shoes') {
        const shoeTypes = [
            { id: 'sneakers', name: 'Кроссовки' },
            { id: 'boots', name: 'Ботинки' },
            { id: 'sandals', name: 'Сандалии' },
            { id: 'heels', name: 'Каблуки' }
        ];
        
        shoeTypes.forEach(type => {
            const option = document.createElement('div');
            option.className = `style-option ${cust.clothing.shoes === type.id ? 'selected' : ''}`;
            option.textContent = type.name;
            option.addEventListener('click', () => {
                cust.clothing.shoes = type.id;
                renderCharacter();
                saveGameData();
            });
            container.appendChild(option);
        });
        
        const colorLabel = document.createElement('div');
        colorLabel.className = 'custom-label';
        colorLabel.textContent = 'Цвет обуви:';
        colorLabel.style.marginTop = '15px';
        container.appendChild(colorLabel);
        
        const shoeColors = ['#1a1a1a', '#2c3e50', '#7f8c8d', '#8B4513', '#e74c3c', '#3498db', '#f39c12', '#FFFFFF'];
        shoeColors.forEach(color => {
            const option = document.createElement('div');
            option.className = `color-option ${cust.clothing.shoesColor === color ? 'selected' : ''}`;
            option.style.background = color;
            option.addEventListener('click', () => {
                cust.clothing.shoesColor = color;
                renderCharacter();
                saveGameData();
            });
            container.appendChild(option);
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
    
    // В режиме соревнования используем общий список боссов
    let defeatedBossesList = [];
    if (gameData.gameMode === 'competition') {
        defeatedBossesList = gameData.sharedBosses || [];
    } else {
        defeatedBossesList = player.defeatedBosses || [];
    }
    
    // Проверяем уровень для возможности сразиться
    // В режиме соревнования проверяем уровень обоих игроков
    let maxLevel = player.level;
    if (gameData.gameMode === 'competition' && gameData.player2) {
        maxLevel = Math.max(player.level, gameData.player2.level);
    }
    
    gameData.bosses.forEach(boss => {
        const isDefeated = defeatedBossesList.includes(boss.id);
        const canFight = maxLevel >= boss.level;
        
        // Определяем, кто победил босса (в режиме соревнования)
        let defeatedBy = '';
        if (isDefeated && gameData.gameMode === 'competition') {
            // Можно добавить информацию о том, кто победил, если нужно
            defeatedBy = ' (общий)';
        }
        
        const card = document.createElement('div');
        card.className = `boss-card ${isDefeated ? 'defeated' : ''}`;
        
        card.innerHTML = `
            <div class="boss-sprite">${boss.sprite}</div>
            <div class="boss-name">${boss.name}</div>
            <div class="boss-level">Уровень: ${boss.level}</div>
            ${gameData.gameMode === 'competition' ? '<div style="font-size: 12px; color: #7f8c8d; margin-top: 5px;">👥 Общий босс</div>' : ''}
            <div style="margin-top: 10px;">
                ${isDefeated ? `<span style="color: #27ae60;">✅ Побежден${defeatedBy}</span>` : 
                  canFight ? `<button class="btn-primary" onclick="fightBoss('${boss.id}')">Сразиться</button>` :
                  `<span style="color: #e74c3c;">Требуется уровень ${boss.level}</span>`}
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Рендеринг отчетов/чата
function renderReports() {
    const container = document.getElementById('reportsList');
    const formTitle = document.getElementById('reportFormTitle');
    const player = getCurrentPlayer();
    
    if (!container) {
        console.error('reportsList container not found');
        return;
    }
    
    // Очищаем только список отчетов, но не трогаем форму (она в другом месте)
    container.innerHTML = '';
    
    // Обновляем заголовок формы
    if (formTitle) {
        if (gameData.gameMode === 'competition') {
            formTitle.textContent = '📸 Отправить отчет партнеру';
        } else {
            formTitle.textContent = '📸 Добавить отчет в архив';
        }
    }
    
    // Заполняем список достижений для выбора (только те, что в процессе выполнения в режиме соревнования)
    const achievementSelect = document.getElementById('reportAchievementSelect');
    if (achievementSelect) {
        achievementSelect.innerHTML = '<option value="">-- Выберите достижение --</option>';
        
        if (gameData.gameMode === 'competition') {
            // В режиме соревнования показываем только достижения в процессе выполнения
            if (player.inProgressAchievements && player.inProgressAchievements.length > 0) {
                player.inProgressAchievements.forEach(ipa => {
                    // Ищем достижение
                    let achievement = gameData.achievements.find(a => a.id === ipa.id);
                    if (!achievement && player.customAchievements) {
                        achievement = player.customAchievements.find(a => a.id === ipa.id);
                    }
                    
                    if (achievement) {
                        const option = document.createElement('option');
                        option.value = achievement.id;
                        option.textContent = achievement.name + (achievement.isCustom ? ' (✏️)' : '');
                        achievementSelect.appendChild(option);
                    }
                });
            }
        } else {
            // В одиночной игре показываем все достижения
            gameData.achievements.forEach(achievement => {
                const option = document.createElement('option');
                option.value = achievement.id;
                option.textContent = achievement.name;
                achievementSelect.appendChild(option);
            });
            
            // Пользовательские достижения
            if (player.customAchievements && player.customAchievements.length > 0) {
                player.customAchievements.forEach(achievement => {
                    const option = document.createElement('option');
                    option.value = achievement.id;
                    option.textContent = achievement.name + ' (✏️)';
                    achievementSelect.appendChild(option);
                });
            }
        }
    }
    
    // Сортируем отчеты по времени (новые сверху)
    const sortedReports = [...(gameData.reports || [])].sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
    });
    
    // Если нет отчетов, показываем сообщение
    if (sortedReports.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'empty-reports';
        emptyMsg.innerHTML = '<div style="padding: 20px; text-align: center; color: #7f8c8d;">Пока нет отчетов. Отправьте первый отчет!</div>';
        container.appendChild(emptyMsg);
        // НЕ возвращаемся - форма должна быть видна ниже
    }
    
    sortedReports.forEach(report => {
        const reportCard = document.createElement('div');
        reportCard.className = `report-card ${report.status || 'pending'}`;
        
        // В режиме соревнования определяем, от кого отчет
        // playerId === 'player1' означает свой отчет, иначе - от партнера
        // Также проверяем senderPlayerId для более точной идентификации
        const isOwnReport = (report.playerId === 'player1' && 
                            (!report.senderPlayerId || report.senderPlayerId === gameData.playerId)) ||
                           (report.senderPlayerId && report.senderPlayerId === gameData.playerId);
        const isCompetition = gameData.gameMode === 'competition';
        // Можем проверять только отчеты партнера (не свои)
        // Отчет от партнера: playerId === 'partner' ИЛИ senderPlayerId !== gameData.playerId
        const isPartnerReport = isCompetition && 
                               (report.playerId === 'partner' || 
                                (report.senderPlayerId && report.senderPlayerId !== gameData.playerId));
        const canReview = isCompetition && isPartnerReport && report.status === 'pending';
        
        let statusBadge = '';
        if (isCompetition) {
            if (report.status === 'approved') {
                statusBadge = '<span class="status-badge approved">✅ Одобрено</span>';
            } else if (report.status === 'rejected') {
                statusBadge = '<span class="status-badge rejected">❌ Отклонено</span>';
            } else {
                statusBadge = '<span class="status-badge pending">⏳ Ожидает проверки</span>';
            }
        } else {
            statusBadge = '<span class="status-badge archived">📁 В архиве</span>';
        }
        
        // Определяем имя отправителя
        let senderName = report.playerName || 'Неизвестно';
        let senderInfo = '';
        if (isCompetition) {
            if (isOwnReport) {
                senderName = 'Вы';
                senderInfo = '<span style="color: #667eea; font-weight: bold;">(Ваш отчет)</span>';
            } else if (isPartnerReport) {
                // Отчет от партнера
                const partnerName = gameData.player2?.name || `Партнер (${gameData.partnerId || 'ID'})`;
                senderName = partnerName;
                senderInfo = '<span style="color: #e74c3c; font-weight: bold;">(От партнера)</span>';
            } else {
                // Неизвестный отправитель
                senderName = report.playerName || 'Неизвестно';
                senderInfo = '';
            }
        }
        
        reportCard.innerHTML = `
            <div class="report-header">
                <div class="report-author">
                    <strong>${senderName}</strong> ${senderInfo}
                    <span class="report-time">${new Date(report.timestamp).toLocaleString('ru-RU')}</span>
                </div>
                ${statusBadge}
            </div>
            <div class="report-achievement">
                <strong>Достижение:</strong> ${report.achievementName}
            </div>
            ${report.media || report.photo ? `
                <div class="report-photo-container">
                    ${(report.mediaType === 'video' || (!report.mediaType && report.media && report.media.startsWith('data:video'))) ? `
                        <video src="${report.media || report.photo}" controls class="report-video" onclick="event.stopPropagation(); viewFullPhoto('${report.id}')" style="max-width: 100%; max-height: 300px; border-radius: 8px; border: 2px solid #34495e; cursor: pointer;"></video>
                        ${report.videoDuration ? `<div style="font-size: 12px; color: #7f8c8d; margin-top: 5px;">🎥 ${report.videoDuration.toFixed(1)} сек</div>` : ''}
                    ` : `
                        <img src="${report.media || report.photo}" alt="Фото отчета" class="report-photo" onclick="viewFullPhoto('${report.id}')" />
                    `}
                </div>
            ` : '<div class="report-no-photo">📷 Медиа не прикреплено</div>'}
            ${canReview ? `
                <div class="report-actions">
                    <button class="btn-success" onclick="approveReport('${report.id}')">✅ Одобрить</button>
                    <button class="btn-danger" onclick="rejectReport('${report.id}')">❌ Отклонить</button>
                </div>
            ` : ''}
            ${isOwnReport && isPending ? `
                <div class="report-info" style="padding: 10px; background: #e8f4f8; border-radius: 5px; margin-top: 10px;">
                    <p style="margin: 0; color: #2c3e50;">⏳ Ваш отчет ожидает проверки партнером</p>
                </div>
            ` : ''}
            ${report.rejectionReason ? `
                <div class="rejection-reason-box">
                    <strong>❌ Причина отклонения:</strong>
                    <p>${report.rejectionReason}</p>
                    ${isOwnReport && report.status === 'rejected' ? `
                        <div class="report-actions" style="margin-top: 10px;">
                            <button class="btn-primary" onclick="restartAchievement('${report.achievementId}')">🔄 Переделать</button>
                            <button class="btn-secondary" onclick="cancelAchievement('${report.achievementId}')">❌ Отказаться</button>
                        </div>
                    ` : ''}
                </div>
            ` : ''}
            ${report.reviewedBy && isCompetition ? `
                <div class="report-review-info">
                    Проверено: ${report.reviewedBy === 'player1' ? 'Вы' : 'Партнер'}
                </div>
            ` : ''}
        `;
        
        container.appendChild(reportCard);
    });
}

// Обработка выбора фото или видео
function handlePhotoSelect(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('reportPhotoPreview');
    
    if (!file || !preview) return;
    
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (!isImage && !isVideo) {
        showNotification('Пожалуйста, выберите изображение или видео!');
        event.target.value = '';
        return;
    }
    
    // Ограничение размера файла (10MB для видео, 5MB для фото)
    const maxSize = isVideo ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
        showNotification(`Файл слишком большой! Максимум ${isVideo ? '10MB' : '5MB'}.`);
        event.target.value = '';
        return;
    }
    
    if (isVideo) {
        // Проверяем длительность видео
        const video = document.createElement('video');
        video.preload = 'metadata';
        
        video.onloadedmetadata = function() {
            window.URL.revokeObjectURL(video.src);
            const duration = video.duration;
            
            if (duration > 10) {
                showNotification('Видео слишком длинное! Максимум 10 секунд.');
                event.target.value = '';
                preview.innerHTML = '';
                return;
            }
            
            // Показываем предпросмотр видео
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.innerHTML = `
                    <video src="${e.target.result}" controls class="video-preview" style="max-width: 200px; max-height: 200px; border-radius: 8px; border: 2px solid #34495e;"></video>
                    <div style="margin-top: 5px; font-size: 12px; color: #7f8c8d;">Длительность: ${duration.toFixed(1)} сек</div>
                    <button type="button" class="btn-small btn-remove-photo" onclick="removePhotoPreview()">✕</button>
                `;
            };
            reader.readAsDataURL(file);
        };
        
        video.onerror = function() {
            showNotification('Ошибка при загрузке видео!');
            event.target.value = '';
            preview.innerHTML = '';
        };
        
        video.src = URL.createObjectURL(file);
    } else {
        // Обработка фото
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `
                <img src="${e.target.result}" alt="Предпросмотр" class="photo-preview-img" />
                <button type="button" class="btn-small btn-remove-photo" onclick="removePhotoPreview()">✕</button>
            `;
        };
        reader.readAsDataURL(file);
    }
}

// Удаление предпросмотра фото
function removePhotoPreview() {
    const preview = document.getElementById('reportPhotoPreview');
    const input = document.getElementById('reportPhotoInput');
    if (preview) preview.innerHTML = '';
    if (input) input.value = '';
}

// Отправка отчета
function sendReport() {
    console.log('sendReport called');
    const achievementSelect = document.getElementById('reportAchievementSelect');
    const photoInput = document.getElementById('reportPhotoInput');
    const preview = document.getElementById('reportPhotoPreview');
    
    if (!achievementSelect || !achievementSelect.value) {
        showNotification('Выберите достижение!');
        console.log('No achievement selected');
        return;
    }
    
    const achievementId = achievementSelect.value;
    const player = getCurrentPlayer();
    
    console.log('Achievement ID:', achievementId);
    console.log('Game mode:', gameData.gameMode);
    
    // Находим достижение
    let achievement = gameData.achievements.find(a => a.id === achievementId);
    if (!achievement && player.customAchievements) {
        achievement = player.customAchievements.find(a => a.id === achievementId);
    }
    
    if (!achievement) {
        showNotification('Достижение не найдено!');
        console.log('Achievement not found');
        return;
    }
    
    console.log('Achievement found:', achievement.name);
    
    // Проверяем наличие медиа
    const hasMedia = photoInput && photoInput.files && photoInput.files[0];
    
    // В режиме соревнования медиа обязательно
    if (gameData.gameMode === 'competition' && !hasMedia) {
        showNotification('В режиме соревнования необходимо прикрепить фото или видео!');
        console.log('Competition mode requires media');
        return;
    }
    
    // Если есть медиа, обрабатываем его
    if (hasMedia) {
        const file = photoInput.files[0];
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');
        
        if (!isImage && !isVideo) {
            showNotification('Пожалуйста, выберите изображение или видео!');
            return;
        }
        
        // Проверка размера
        const maxSize = isVideo ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
        if (file.size > maxSize) {
            showNotification(`Файл слишком большой! Максимум ${isVideo ? '10MB' : '5MB'}.`);
            return;
        }
        
        // Для видео проверяем длительность
        if (isVideo) {
            const video = document.createElement('video');
            video.preload = 'metadata';
            
            video.onloadedmetadata = function() {
                window.URL.revokeObjectURL(video.src);
                const duration = video.duration;
                
                if (duration > 10) {
                    showNotification('Видео слишком длинное! Максимум 10 секунд.');
                    // Очищаем input
                    if (photoInput) photoInput.value = '';
                    if (preview) preview.innerHTML = '';
                    return;
                }
                
                console.log('Video duration OK:', duration, 'seconds');
                
                // Читаем видео
                const reader = new FileReader();
                reader.onload = function(e) {
                    console.log('Video file read successfully, size:', e.target.result.length, 'bytes');
                    console.log('Creating report with video data');
                    createReport(achievement, e.target.result, 'video', duration);
                };
                reader.onerror = function(error) {
                    console.error('Error reading video file:', error);
                    showNotification('Ошибка при чтении видео!');
                    // Очищаем input
                    if (photoInput) photoInput.value = '';
                    if (preview) preview.innerHTML = '';
                };
                reader.onprogress = function(e) {
                    if (e.lengthComputable) {
                        const percentLoaded = Math.round((e.loaded / e.total) * 100);
                        console.log('Video loading progress:', percentLoaded + '%');
                    }
                };
                reader.readAsDataURL(file);
            };
            
            video.onerror = function(error) {
                console.error('Error loading video metadata:', error);
                showNotification('Ошибка при загрузке видео! Проверьте формат файла.');
                // Очищаем input
                if (photoInput) photoInput.value = '';
                if (preview) preview.innerHTML = '';
            };
            
            // Добавляем обработчик для случая, когда метаданные не загружаются
            video.addEventListener('loadedmetadata', function() {
                console.log('Video metadata loaded successfully');
            }, { once: true });
            
            video.src = URL.createObjectURL(file);
            console.log('Video source set, waiting for metadata...');
            return; // Асинхронная обработка видео
        } else {
            // Читаем фото
            const reader = new FileReader();
            reader.onload = function(e) {
                console.log('Photo loaded, creating report');
                createReport(achievement, e.target.result, 'image');
            };
            reader.onerror = function() {
                console.error('Error reading photo');
                showNotification('Ошибка при чтении фото!');
            };
            reader.readAsDataURL(file);
            return; // Асинхронная обработка фото
        }
    } else {
        // В одиночном режиме можно отправить отчет без медиа
        console.log('No media, creating report without media (single mode)');
        createReport(achievement, null, 'image');
    }
}

// Создание отчета
function createReport(achievement, mediaData, mediaType = 'image', videoDuration = null) {
    console.log('createReport called', {
        achievementName: achievement.name,
        achievementId: achievement.id,
        mediaType: mediaType,
        hasMedia: !!mediaData,
        gameMode: gameData.gameMode,
        currentReportsCount: gameData.reports ? gameData.reports.length : 0
    });
    
    const player = getCurrentPlayer();
    
    // Инициализируем массив отчетов если его нет
    if (!gameData.reports) {
        gameData.reports = [];
        console.log('Initialized reports array');
    }
    
    // В режиме соревнования проверяем, что достижение в процессе выполнения
    if (gameData.gameMode === 'competition') {
        if (!player.inProgressAchievements || 
            !player.inProgressAchievements.find(ipa => ipa.id === achievement.id)) {
            showNotification('Сначала начните выполнение достижения!');
            console.log('Achievement not in progress');
            return;
        }
        
        // Удаляем старые отклоненные отчеты для этого достижения
        // В режиме соревнования playerId всегда 'player1' (свой аккаунт)
        gameData.reports = gameData.reports.filter(r => 
            !(r.achievementId === achievement.id && r.playerId === 'player1' && r.status === 'rejected')
        );
        
        // Обновляем статус в процессе выполнения
        const inProgress = player.inProgressAchievements.find(ipa => ipa.id === achievement.id);
        if (inProgress) {
            inProgress.reportSent = true;
        }
    }
    
    // Определяем playerId для отчета
    // В режиме соревнования: 'player1' = свой отчет, 'partner' = отчет от партнера
    // Но так как это локальная система, все отчеты создаются с playerId = 'player1' (свой аккаунт)
    // Партнер будет видеть отчеты с playerId = 'partner' (которые мы создадим локально для имитации)
    const reportPlayerId = 'player1'; // Всегда свой аккаунт при создании
    
    const report = {
        id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        playerId: reportPlayerId,
        playerName: player.name,
        achievementId: achievement.id,
        achievementName: achievement.name,
        media: mediaData, // Медиа данные (фото или видео)
        mediaType: mediaType, // 'image' или 'video'
        videoDuration: videoDuration, // Длительность видео в секундах (если видео)
        timestamp: new Date().toISOString(),
        status: gameData.gameMode === 'competition' ? 'pending' : 'archived',
        reviewedBy: null,
        rejectionReason: null,
        rejectedAt: null,
        // Добавляем ID отправителя для идентификации в локальной системе
        senderPlayerId: gameData.playerId, // ID игрока, который отправил отчет
        partnerId: gameData.partnerId, // ID партнера, которому отправлен отчет
        // Для обратной совместимости
        photo: mediaType === 'image' ? mediaData : null
    };
    
    // Добавляем отчет в массив
    gameData.reports.push(report);
    console.log('Report pushed to array. Total reports:', gameData.reports.length);
    
    // В режиме соревнования создаем также отчет для партнера (локально)
    // Это позволяет партнеру видеть отчеты в своем аккаунте
    if (gameData.gameMode === 'competition' && gameData.partnerId) {
        // Создаем копию отчета для партнера с другим playerId
        const partnerReport = {
            ...report,
            id: `partner_${report.id}`, // Уникальный ID для отчета партнера
            playerId: 'partner', // Отчет от партнера
            senderPlayerId: gameData.playerId, // ID отправителя (ваш ID)
            partnerId: gameData.partnerId, // ID партнера
            // Важно: копируем медиа данные для партнера
            media: report.media, // Копируем видео/фото данные
            mediaType: report.mediaType, // Копируем тип медиа
            videoDuration: report.videoDuration, // Копируем длительность видео
            photo: report.photo, // Для обратной совместимости
            // Партнер видит этот отчет как от вас
        };
        
        console.log('Creating partner report:', {
            id: partnerReport.id,
            mediaType: partnerReport.mediaType,
            hasMedia: !!partnerReport.media,
            videoDuration: partnerReport.videoDuration
        });
        
        // Проверяем, нет ли уже такого отчета
        const existingPartnerReport = gameData.reports.find(r => 
            r.id === partnerReport.id || 
            (r.achievementId === partnerReport.achievementId && 
             r.senderPlayerId === partnerReport.senderPlayerId &&
             r.status === 'pending')
        );
        
        if (!existingPartnerReport) {
            gameData.reports.push(partnerReport);
            console.log('Partner report created successfully. Total reports:', gameData.reports.length);
        } else {
            console.log('Partner report already exists, skipping');
        }
    }
    
    // Сохраняем данные СРАЗУ после добавления отчета
    try {
        saveGameData();
        console.log('Game data saved after report creation');
    } catch (e) {
        console.error('Error saving game data:', e);
        showNotification('Ошибка при сохранении отчета!');
    }
    
    // Очищаем форму
    const achievementSelect = document.getElementById('reportAchievementSelect');
    const photoInput = document.getElementById('reportPhotoInput');
    const preview = document.getElementById('reportPhotoPreview');
    if (achievementSelect) achievementSelect.value = '';
    if (photoInput) photoInput.value = '';
    if (preview) preview.innerHTML = '';
    
    // Обновляем интерфейс
    renderReports();
    renderAchievements();
    
    if (gameData.gameMode === 'competition') {
        showNotification('📤 Отчет отправлен партнеру на проверку! Партнер увидит его в разделе "Отчеты"');
    } else {
        showNotification('📁 Отчет добавлен в архив!');
    }
    
    console.log('Report created successfully:', {
        id: report.id,
        achievementName: report.achievementName,
        mediaType: report.mediaType,
        hasMedia: !!report.media,
        status: report.status,
        reportsCount: gameData.reports.length,
        timestamp: report.timestamp
    });
}

// Одобрение отчета
function approveReport(reportId) {
    const report = gameData.reports.find(r => r.id === reportId);
    if (!report) return;
    
    // Проверяем, что это отчет партнера (не свой)
    const isOwnReport = (report.playerId === 'player1' && 
                        (!report.senderPlayerId || report.senderPlayerId === gameData.playerId)) ||
                       (report.senderPlayerId && report.senderPlayerId === gameData.playerId);
    
    if (isOwnReport) {
        showNotification('Нельзя одобрить свой собственный отчет!');
        return;
    }
    
    report.status = 'approved';
    report.reviewedBy = 'player1'; // Вы одобрили отчет партнера
    
    // В режиме соревнования:
    // - Отчеты партнера видны вам, вы можете их одобрять/отклонять
    // - Награды начисляются партнеру в его аккаунте (локально у него)
    // - Здесь мы просто отмечаем отчет как одобренный для отображения
    // - Партнер увидит одобрение в своем аккаунте и получит награды
    
    // Для отображения используем свой аккаунт
    const targetPlayer = gameData.player;
    
    if (!targetPlayer) {
        console.error('Target player not found');
        return;
    }
    
    // Ищем достижение для получения наград
    let achievement = gameData.achievements.find(a => a.id === report.achievementId);
    if (!achievement && targetPlayer.customAchievements) {
        achievement = targetPlayer.customAchievements.find(a => a.id === report.achievementId);
    }
    
    if (!achievement) {
        console.error('Achievement not found');
        return;
    }
    
    const rewards = gameData.achievementRewards[achievement.difficulty];
    if (!rewards) {
        console.error('Rewards not found');
        return;
    }
    
    // В режиме соревнования:
    // - Награды начисляются партнеру в его аккаунте (локально у него)
    // - Здесь мы просто отмечаем отчет как одобренный для отображения
    // - Партнер получит награды когда откроет свой аккаунт
    // - Мы НЕ начисляем награды себе за одобрение чужого отчета
    
    // Отмечаем отчет как одобренный (для истории)
    // Награды партнер получит в своем аккаунте автоматически
    
    saveGameData();
    renderReports();
    renderAchievements();
    showNotification('✅ Отчет партнера одобрен! Партнер получит награды в своем аккаунте.');
}

// Отклонение отчета
function rejectReport(reportId) {
    const report = gameData.reports.find(r => r.id === reportId);
    if (!report) return;
    
    // Показываем модальное окно для ввода причины отклонения
    const rejectModal = document.createElement('div');
    rejectModal.className = 'modal active';
    rejectModal.style.zIndex = '2000';
    rejectModal.innerHTML = `
        <div class="modal-content reject-modal">
            <h2>❌ Отклонить отчет</h2>
            <p><strong>Достижение:</strong> ${report.achievementName}</p>
            <div class="form-group">
                <label>Причина отклонения:</label>
                <textarea id="rejectionReason" class="form-textarea" placeholder="Опишите причину отклонения..." maxlength="500"></textarea>
            </div>
            <div class="modal-actions">
                <button class="btn-secondary" onclick="this.closest('.modal').remove()">Отмена</button>
                <button class="btn-danger" onclick="confirmRejectReport('${reportId}')">Отклонить</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(rejectModal);
    
    // Закрытие при клике вне модального окна
    rejectModal.addEventListener('click', (e) => {
        if (e.target === rejectModal) {
            rejectModal.remove();
        }
    });
}

// Подтверждение отклонения отчета с причиной
function confirmRejectReport(reportId) {
    const reasonInput = document.getElementById('rejectionReason');
    const reason = reasonInput ? reasonInput.value.trim() : '';
    
    if (!reason) {
        showNotification('Пожалуйста, укажите причину отклонения!');
        return;
    }
    
    const report = gameData.reports.find(r => r.id === reportId);
    if (!report) return;
    
    // Проверяем, что это отчет партнера (не свой)
    const isOwnReport = (report.playerId === 'player1' && 
                        (!report.senderPlayerId || report.senderPlayerId === gameData.playerId)) ||
                       (report.senderPlayerId && report.senderPlayerId === gameData.playerId);
    
    if (isOwnReport) {
        showNotification('Нельзя отклонить свой собственный отчет!');
        const rejectModal = document.querySelector('.reject-modal')?.closest('.modal');
        if (rejectModal) {
            rejectModal.remove();
        }
        return;
    }
    
    report.status = 'rejected';
    report.reviewedBy = 'player1'; // Вы отклонили отчет партнера
    report.rejectionReason = reason;
    report.rejectedAt = new Date().toISOString();
    
    // Закрываем модальное окно
    const rejectModal = document.querySelector('.reject-modal')?.closest('.modal');
    if (rejectModal) {
        rejectModal.remove();
    }
    
    saveGameData();
    renderReports();
    renderAchievements();
    showNotification('❌ Отчет отклонен. Партнер получит уведомление с причиной.');
}

// Просмотр фото или видео в полном размере
function viewFullPhoto(reportId) {
    const report = gameData.reports.find(r => r.id === reportId);
    if (!report || (!report.media && !report.photo)) return;
    
    const mediaData = report.media || report.photo;
    const isVideo = report.mediaType === 'video' || (!report.mediaType && mediaData && mediaData.startsWith('data:video'));
    
    // Создаем модальное окно для просмотра медиа
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.style.zIndex = '2000';
    modal.innerHTML = `
        <div class="modal-content photo-viewer-modal">
            <span class="close-photo-viewer" onclick="this.closest('.modal').remove()">&times;</span>
            <h3>${isVideo ? '🎥 Видео' : '📷 Фото'} отчета: ${report.achievementName}</h3>
            ${isVideo ? `
                <video src="${mediaData}" controls autoplay class="full-photo-view" style="max-width: 90vw; max-height: 80vh; border-radius: 8px; background: #000;"></video>
                ${report.videoDuration ? `<div style="text-align: center; color: #7f8c8d; margin-top: 5px;">Длительность: ${report.videoDuration.toFixed(1)} сек</div>` : ''}
            ` : `
                <img src="${mediaData}" alt="Фото отчета" class="full-photo-view" />
            `}
            <div class="photo-viewer-info">
                <p><strong>От:</strong> ${report.playerName}</p>
                <p><strong>Дата:</strong> ${new Date(report.timestamp).toLocaleString('ru-RU')}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Закрытие при клике вне медиа
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Битва с боссом
function fightBoss(bossId) {
    const player = getCurrentPlayer();
    const boss = gameData.bosses.find(b => b.id === bossId);
    
    if (!boss) {
        showNotification('Босс не найден!');
        return;
    }
    
    // Проверка уровня - в режиме соревнования проверяем уровень обоих игроков
    let maxLevel = player.level;
    if (gameData.gameMode === 'competition' && gameData.player2) {
        maxLevel = Math.max(player.level, gameData.player2.level);
    }
    
    if (maxLevel < boss.level) {
        showNotification('Недостаточный уровень!');
        return;
    }
    
    // Проверка, побежден ли босс
    let isDefeated = false;
    if (gameData.gameMode === 'competition') {
        isDefeated = gameData.sharedBosses && gameData.sharedBosses.includes(bossId);
    } else {
        isDefeated = player.defeatedBosses && player.defeatedBosses.includes(bossId);
    }
    
    if (isDefeated) {
        showNotification('Этот босс уже побежден!');
        return;
    }
    
    // Простая механика битвы (можно улучшить)
    // В режиме соревнования используем максимальный уровень
    const winChance = Math.min(0.5 + (maxLevel - boss.level) * 0.1, 0.9);
    const won = Math.random() < winChance;
    
    if (won) {
        // В режиме соревнования добавляем в общий список
        if (gameData.gameMode === 'competition') {
            if (!gameData.sharedBosses) gameData.sharedBosses = [];
            if (!gameData.sharedBosses.includes(bossId)) {
                gameData.sharedBosses.push(bossId);
            }
            // Награды получает только тот, кто сражался
            player.coins += boss.reward;
            addXP(boss.reward);
            showNotification(`🎉 Победа над ${boss.name}! +${boss.reward} монет и опыта (общий босс)`);
        } else {
            // В одиночной игре добавляем в личный список
            if (!player.defeatedBosses) player.defeatedBosses = [];
            player.defeatedBosses.push(bossId);
            player.coins += boss.reward;
            addXP(boss.reward);
            showNotification(`🎉 Победа над ${boss.name}! +${boss.reward} монет и опыта`);
        }
        
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
    
    // Инициализация накопленного урона если его нет (но не сбрасываем существующий!)
    if (player.accumulatedDamage === undefined || player.accumulatedDamage === null) {
        player.accumulatedDamage = 0;
    }
    // Урон сохраняется и накапливается между сессиями, не сбрасывается
    
    // Восстанавливаем HP врага из сохраненных данных
    if (player.currentEnemy && player.currentEnemyHp !== null && player.currentEnemyHp !== undefined) {
        const enemy = gameData.enemies.find(e => e.id === player.currentEnemy);
        if (enemy) {
            enemy.hp = Math.min(player.currentEnemyHp, enemy.maxHp);
        }
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
        // В режиме дуо показываем общий урон
        if (gameData.gameMode === 'competition' && gameData.player2) {
            const sharedDamage = (gameData.player.accumulatedDamage || 0) + (gameData.player2.accumulatedDamage || 0);
            accumulatedDamageEl.textContent = `${player.accumulatedDamage || 0} (общий: ${sharedDamage})`;
        } else {
            accumulatedDamageEl.textContent = player.accumulatedDamage || 0;
        }
        
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


// Убеждаемся, что все функции доступны глобально для onclick обработчиков
window.attackEnemy = attackEnemy;
window.startCombat = startCombat;
window.openAchievementModal = openAchievementModal;
window.showReminderModal = showReminderModal;
window.cancelAchievement = cancelAchievement;
window.deleteCustomAchievement = deleteCustomAchievement;
window.buyItem = buyItem;
window.fightBoss = fightBoss;
window.viewFullPhoto = viewFullPhoto;
window.approveReport = approveReport;
window.rejectReport = rejectReport;
window.removePhotoPreview = removePhotoPreview;
window.equipItem = equipItem;
window.unequipItem = unequipItem;
window.unlockLocation = unlockLocation;
window.startAchievement = startAchievement;
window.openReportModal = openReportModal;
window.cancelAchievement = cancelAchievement;
window.restartAchievement = restartAchievement;
window.confirmRejectReport = confirmRejectReport;
window.copyPlayerId = copyPlayerId;
window.cancelFriendRequest = cancelFriendRequest;
window.acceptFriendRequest = acceptFriendRequest;
window.addFriend = addFriend;
window.removeFriend = removeFriend;
window.playWithFriend = playWithFriend;
window.selectFriendAsPartner = selectFriendAsPartner;
window.switchGameMode = switchGameMode;

// Переключение режима игры из личного кабинета
function switchGameMode(newMode) {
    if (newMode === gameData.gameMode) {
        showNotification('Вы уже находитесь в этом режиме!');
        return;
    }
    
    if (newMode === 'competition') {
        // Переход в режим соревнования - нужен партнер
        if (!gameData.partnerId) {
            showPartnerIdModal();
            return;
        }
        
        // В режиме соревнования каждый игрок управляет только своим аккаунтом
        // player2 не нужен для управления, только для отображения данных партнера (если нужно)
        // Общение происходит через отчеты
        
        // Инициализируем общих боссов если их нет
        if (!gameData.sharedBosses || gameData.sharedBosses.length === 0) {
            gameData.sharedBosses = gameData.bosses.map(boss => ({
                id: boss.id,
                isDefeated: false
            }));
        }
    } else if (newMode === 'single') {
        // Переход в одиночный режим
        // Сохраняем данные player2 перед переходом
        if (gameData.player2) {
            // Данные сохраняются в localStorage
        }
    }
    
    gameData.gameMode = newMode;
    gameData.currentPlayerId = 'player1';
    
    updateUIForGameMode();
    updateGameModeDisplay();
    saveGameData();
    
    showNotification(`✅ Режим изменен на: ${newMode === 'single' ? 'Одиночный' : 'Соревнование'}`);
}

// Обновление отображения режима игры
function updateGameModeDisplay() {
    const currentModeText = document.getElementById('currentModeText');
    const switchToSingleBtn = document.getElementById('switchToSingleMode');
    const switchToCompetitionBtn = document.getElementById('switchToCompetitionMode');
    
    if (currentModeText) {
        const modeName = gameData.gameMode === 'single' ? 'Одиночный' : 
                        gameData.gameMode === 'competition' ? 'Соревнование' : 'Не выбран';
        currentModeText.textContent = modeName;
    }
    
    if (switchToSingleBtn) {
        if (gameData.gameMode === 'single') {
            switchToSingleBtn.classList.add('active');
            switchToSingleBtn.disabled = true;
        } else {
            switchToSingleBtn.classList.remove('active');
            switchToSingleBtn.disabled = false;
        }
    }
    
    if (switchToCompetitionBtn) {
        if (gameData.gameMode === 'competition') {
            switchToCompetitionBtn.classList.add('active');
            switchToCompetitionBtn.disabled = true;
        } else {
            switchToCompetitionBtn.classList.remove('active');
            switchToCompetitionBtn.disabled = false;
        }
    }
    
    // Обновляем информацию о партнере
    updatePartnerInfo();
    renderPartnerInvitations();
}

// Обновление информации о партнере в личном кабинете
function updatePartnerInfo() {
    const partnerInfo = document.getElementById('partnerInfo');
    if (!partnerInfo) return;
    
    if (gameData.gameMode === 'competition' && gameData.partnerId) {
        const partnerFriend = gameData.friends.find(f => f.id === gameData.partnerId);
        const partnerName = partnerFriend ? partnerFriend.name : `Партнер (${gameData.partnerId})`;
        
        partnerInfo.style.display = 'block';
        partnerInfo.innerHTML = `
            <div style="margin-top: 10px; padding: 10px; background: rgba(102, 126, 234, 0.1); border-radius: 5px; border: 1px solid #667eea;">
                <strong style="color: #667eea;">👥 Текущий партнер:</strong>
                <div style="margin-top: 5px;">
                    <span style="font-weight: bold;">${partnerName}</span>
                    <div style="font-size: 12px; color: #7f8c8d; margin-top: 3px;">ID: ${gameData.partnerId}</div>
                </div>
            </div>
        `;
    } else {
        partnerInfo.style.display = 'none';
    }
}

// Инициализация обработчиков вкладок кастомизации после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.custom-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = btn.getAttribute('data-tab');
                const section = btn.closest('.custom-section');
                
                if (!section) return;
                
                // Убираем активность у всех вкладок в этой секции
                section.querySelectorAll('.custom-tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Обновляем активную вкладку в контейнере
                const container = section.querySelector('.customization-content');
                if (container) {
                    container.setAttribute('data-active-tab', tabName);
                    renderCharacter(); // Перерисовываем UI
                }
            });
        });
    }, 100);
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', initGame);

// Очистка интервалов при закрытии страницы
window.addEventListener('beforeunload', () => {
    if (window.achievementUpdateInterval) {
        clearInterval(window.achievementUpdateInterval);
    }
});