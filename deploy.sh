#!/bin/bash

# Скрипт для деплоя на Vercel

echo "🚀 Подготовка к деплою..."

# Проверка наличия Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 Установка Vercel CLI..."
    npm install -g vercel
fi

echo "📁 Текущая директория: $(pwd)"
echo "📋 Файлы для деплоя:"
ls -la | grep -E "\.(html|js|css|json)$"

echo ""
echo "🔐 Вход в Vercel..."
vercel login

echo ""
echo "🚀 Деплой на Vercel..."
vercel --prod

echo ""
echo "✅ Деплой завершен!"
echo "📋 Скопируйте URL проекта и используйте его в BotFather"