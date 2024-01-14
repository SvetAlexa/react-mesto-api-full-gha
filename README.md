# Сервис Mesto (бэкенд + фронтенд)
Репозиторий сервиса **Mesto**. Включает фронтенд и бэкенд части приложения.  
Бэкенд расположен в директории `backend/`, фронтенд - в `frontend/`. 

## Цель проекта
Создать полностью рабочее приложение. Разместить на хостинге API и фронтенд часть.

## Демо сервиса

![Desktop screenshot](https://github.com/SvetAlexa/react-mesto-api-full-gha/blob/main/screenShots/screenshot_mesto.png)

## Функциональность
* регистрация и авторизация пользователей  
* аутентификация пользователя 
* создание и удаление карточек с фотографиями  
* возможность ставить и удалять лайки  
* редактирование данных пользователя  
* валидация форм 
* основной роут защищен от неавторизованных пользователей
* переменные окружения хранятся на сервере в .env-файле

## Используемые технологии
### Бэкэнд
* [Node.js](https://nodejs.org/en)
* [Express](https://expressjs.com/ru/)
* [MongoDB](https://www.mongodb.com/try/download/community)
* [mongoose](https://mongoosejs.com/)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [joi](https://www.npmjs.com/package/joi#joi)
* [celebrate](https://www.npmjs.com/package/celebrate?activeTab=readme)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
* [Helmet](https://www.npmjs.com/package/helmet)
* [validator](https://www.npmjs.com/package/validator)
* [ESLint](https://www.npmjs.com/package/eslint) по стайлгайду [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb-base)
* [Postman](https://www.postman.com/)

### Фронтенд
* HTML5
* CSS3
* JS(ES6)
* React (CRA, портирование разметки в JSX, функциональные компоненты + хуки)
* Адаптивная верстка
* методология БЭМ
* flexbox
* grid layout

## Ссылки на проект

Frontend https://larsik.nomoredomainsrocks.ru

Backend https://api.larsik.nomoredomainsrocks.ru

## Запуск проекта
* склонировать репозиторий  `git clone git@github.com:SvetAlexa/react-mesto-api-full-gha.git`

### Бэкенд
Предварительные требования: [Node.js](https://nodejs.org/en) и [MongoDB](https://www.mongodb.com/try/download/community) версия 4
   
* перейти в папку backend  
* установить зависимости `npm ci`
* запуcтить сервер `npm run start`  
* запустить сервер с hot-reload `npm run dev`  

Сервер слушает порт 3000. Изменить порт можно в файле config.js

### Фронтенд
   
* перейти в папку frontend  
* установить зависимости `npm ci`
* запустить сервер `npm run start`  
* запустить сборку `npm run build`

Приложение запустится на 3001 порту
