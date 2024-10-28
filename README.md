# Тестовое задание для Нексис

Демо: https://neksys.vercel.app/

## Технологии

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Vitest](https://img.shields.io/badge/-Vitest-252529?style=for-the-badge&logo=vitest&logoColor=FCC72B)
![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)

## Функционал
 
+ Список-таблица с переходом на редактирование и создание с фильтром по title
![Список-таблица](screenshots/main_table.png)

+ Список-сетка со всеми отображаемыми полями с фильтром по title
![Список-сетка](screenshots/main_grid.png)

+ Удаление с попап-подтверждением
![Удаление](screenshots/delete.png)

+ Страница создания и редактирования (в зависимости от пути)
+ ![Страница создания](screenshots/create.png)

+ В DEV окружении подключается faker и создает заданное количество сущностей (по умолчанию = 100)
+ Зависимости для создания формы, её валидации, определения путей:
```json
{
  "vee-validate": "^4.14.3",
  "@vee-validate/zod": "^4.14.3",
  "zod": "^3.23.8",
  "vue-router": "^4.4.5"
}
```
+ в ветке infinite-scroll частично реализовал подгрузку значений при скролле

## Запуск проекта в режиме разработки

```sh
pnpm install
pnpm dev
```

