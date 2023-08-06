# Онлайн мессенджер

## Описание

Онлайн мессенджер является веб-приложением, которое позволяет пользователям обмениваться сообщениями
в режиме реального времени. Приложение включает несколько страниц, включая страницы для входа,
регистрации, просмотра сообщений, редактирования профиля и страницы с именем пользователя для
просмотра сообщений.

## Версия: 0.4 (Проект закончен)

Текущая версия находится в процессе разработки и представляет собой макет с ограниченной
функциональностью.

## Дезайн и адрес прототипа

Дезайн для версии 0.1 можно найти по ссылке на
[Figma](https://www.figma.com/file/3fadPRCD38XteX6sDx6hNk/Messenger?type=design&node-id=0%3A1&t=PYURXJQ9XpU48Zk7-1).
Прототип версии 0.4 на [Netlify](https://https://brilliant-sptint4.netlify.app/)

## Установка

1.  Склонируйте репозиторий с помощью команды:  
    `git clone https://github.com/MIdkhat/middle.messenger.praktikum.yandex.git` branch sprint_4
2.  Перейдите в каталог проекта: `cd middle.messenger.praktikum.yandex`
3.  Установите зависимости, выполнив следующую команду (optional для разработчиков): `npm install`
4.  Запустите приложение, выполнив команду: `npm run start`
5.  Откройте веб-браузер и перейдите по адресу [http://localhost:3000](http://localhost:3000), чтобы
    открыть приложение.

## Команды для разработчиков

- `npm run dev` — запуск для разраотчика,
- `npm run build` — сборка приложения
- `npm run preview` — превью собраного приложения
- `npm run start` — сборка приложения и запуск превью
- `npm run test`: - тестирование
- `npm run precommit`: - скрипт который запускается перед каждым коммитом

## Примеры использования

### Страница входа (Login)

[/login](http://localhost:3000/login) На странице входа пользователь может ввести свои учетные
данные (логин и пароль) для входа в систему.

### Страница регистрации (Register)

[/register](http://localhost:3000/register) На странице регистрации пользователь может создать новую
учетную запись, указав свои данные (логин, пароль, адрес электронной почты и т.д.).

### Страница профиля (Profile)

[/profile](http://localhost:3000/profile) Можно посмотреть данные пользователя.

### Страница редактирования профиля (Edit Profile)

[/profileedit](http://localhost:3000/profileedit) На странице редактирования профиля пользователь
может изменить свои данные профиля, такие как имя, фотография и пароль.

### Страница просмотра сообщений (Messages)

[/messages](http://localhost:3000/messenger) На странице просмотра сообщений пользователь может
видеть список всех чатов и полученных сообщений. Через панель инструментов добавлять/удалять чаты и
их участнков

### Изменения от версии 0.3

Добавлен precommit
Добавлены тесты:

- для вспомогательных функций в utils
- для HTTPTransport
- для шаблонизатора
- для роутера
- для компонентов
