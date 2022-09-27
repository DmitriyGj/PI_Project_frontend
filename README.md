# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# Meeting manager / Менеджер встреч 
## Функционал
- Регистрация 
-	JWT-авторизация (+Keycloack)*
-	Возможность просматривать встречи, в которых пользователь является участником
-	Отдельный просмотр встреч, где пользователь является организатором 
-	Ролевой доступ к API
-	Ролевой доступ
-	CRUD по встречам
-	Возможность экспорта в EXCEL всех встреч с подробной информацией
-	Возможность экспорта в EXCEL отчетной информации о встрече, о пользователе
-	Построение графиков на основе отчетной информации (посещаемость встреч, частота проведения встреч)
-	Возможность раскрашивать плашки со встречами
-	Привязка встреч к месту проведения
- - Additional: Формат проведения встречи, может быть как очный, так и удаленный. В случае очного формата – указывается адрес, в случае удаленного - ссылка к месту проведения встречи.
-	Обеспечить проверку корректности указанной ссылки, прикрепленной к встрече в случае удаленного формата проведения встречи 
-	Darg & Drop

## Папочная структура

### pages - страницы приложения
### public/src/components (@components) - компоненты приложения
### public/src/hooks (@hooks) - кастомные хуки 
### public/src/media (@media) - картинки, иконки и т.данных
### public/src/models (@modles) - общие типы приложения
### public/src/store (@store) - папка в которой хранятся стор и все его слайсы
### public/src/utils (@utils) - вспомогательные функции и константы 
### public/src/styles (@styles) - возможно реиспользуемые стили  global - миксины, классы и общие классы, variables - общие переменные (цвета, размеры), index.ts - возможно будем использовать для реэкспорта стилей в компоненты 
# Workflow
Ветка main предназначена для деплоя на удаленный сервер
Ветка develop - актуальная сборка всех изменений, которая мержится с main-ом 

Для того чтоб выполнить свою задачу неоходимо создать ветку из develop при помощи команды 
barnch_name - название ветки 
```
git branch [branch_name]
```
Чтоб создать ветку и сразу на нее переключиться необходимо воспользоваться командой 
```
git checkout -b [branch_name]
```

## Правила именования веток и наполнения коммитов
Cоздается ветка из develop 
В случае если вы делаете какую-то фичу название ветки будет feature/[branch_name]/[task_number]
если фиксите баг fix/[branch_name]/[task_number] 
branch_name должен кратко и ясно описывать выполняемую задачу
Например задача по инициализации начального проекта будет feature/proj_init/1 

## Создание компонентов, слайсов и прочего 
Компоненты будут двух типов atoms и molecules 
atoms - совсем мелкие компоненты а-ля дэйтпикер, инпут или карточка
molecules - компоненты побольше типо сайдбара, таба или формы, которые могут включать в себя molecules
pages - корневая папка проекта со страницами приложения, которые состоят из molecules

### components
Каждый компонент создается в отдельной папке, которая состоит из которая имменуется через - ловеркейсом, например папка формы авторизации будет называться form-registration
```
components
  |__index.ts (реэкспорт)
  |__atoms
  |    |__index.ts (экспорт)
  |    |__[atom-name]
  |         |__index.tsx
  |         |__type.ts
  |         |__style.module.less
  |
  |__molecules
        |__index.ts (экспорт, импорт)
        |__[molecule-name]
              |__index.tsx
              |__type.ts
              |__style.module.less
          
```
- index.tsx - код самого компонента
- style.module.less - стили компонента
- type.ts - типы используемые компонентои

### store
Данные правила актуальны также для создания слайсов, каждый слайс создается в отедльной папке, которая имменуется через - ловеркейсом, только состоять он будет из
```
store
  |__index.ts (вносим редьюсер в стор)
  |__[slice-name]
      |__index.ts (экспорт)
      |__selectors.ts
      |__thunk.ts
      |__types.ts
```

- selectors.ts - селекторы
- index.ts - сам слайс (редьюсер) со всем к нему идущим
- thunk.ts - санк-экшины (асинхронные экшины)
- types.ts - типы слайса 

В index папки store - содержится сам стор со всеми его редьюсерами (слайсами), реэкспортировать код других слайсов **не нужно**

### pages
В данном пункте будем следовать [документации](https://nextjs.org/docs/basic-features/pages)
Как в ней сказано, роутинг совпадает с папочной структурой.
Если страница не требует создания папки ( у нее нет страниц с параметром id), то достаточно создать файл, который будет называться так, как мы планируем заполнять адресную строку.
Например, мы хотим создаться базовую страницу, это будет выглядеть следующим образом.
```
pages
  |__api
  |__app.tsx
  |__index.tsx
  |__home.tsx
``` 
Страница будет доступна по маршруту localhost:3000/home

Но если нужно создать страницу, у которой будут айдишники и другие маршруты, то уже нужно создавать папку со следующей структурой
Пусть это будет cards
```
pages
  |__api
  |__app.tsx
  |__index.tsx
  |__cards
      |__index.tsx 
      |__types.ts 
      |__add.tsx 
      |__style.module.less 
      |__[id] 
          |__index.tsx 
          |__types.ts
          |__edit.tsx
          |__style.module.less
```  
- cards/index.tsx - код самой страницы, на которой отображаются все карточки  localhost:3000/cards 
- cards/types.ts - типы, используемы для страницы
- cards/add.tsx - страница добавления новой карточки localhost:3000/cards/add (также можно вынести в папку, как в примере с [id])
- cards/style.module.less - стили страницы
- cards/[id] - папка описывающая страницу конкретной карточки 
- cards/[id]/index.tsx - код страницы с карточкой по маршруту localhost:3000/cards/[id]
- cards/[id]/edit.tsx - код страницы описывающий страницу редактирования карточки ocalhost:3000/cards/[id]/edit

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Во всех остальных папках создается отдельный **файл** с нужным названием через - и реэкспортируется через index.ts папки.


После создания компонента и все к нему прилагающиеся реэкспортируются через корневой index файл папки, также все это реэспортируются через корневой index в соответствующей папке 
Пример с файлами
```
[dierctory-name]
  |__index.ts (реэкспорт)
  |__[smth-name1].ts
  |__[smth-name2].ts
```
Пример с папками
```
[dierctory-name]
  |__index.ts (реэкспорт)
  |__[smth-folder-name].ts
      |__index.ts (экспорт)
      |__types.ts
```

____________________________________________________________________________________________________
Примечания:
1. При работе с формамми используем [Formik в связке с Yup](https://formik.org/docs/tutorial), также одобряется использование хука useForm из antd
2. Не пишите слишком больше компоненты, если весь код компонента занимает больше 200 строк без учета импортов, задумайтесь над его декомпозицией
3. Старайтесь создавать максимально универасльные типы и компоненты, которые в дальнейшем нужно переиспользоваться 
4. Все должно реэкспортироваться через корневой index.ts
5. Пиветствуется дефолтный экспорт **НО** в корневом файле папки должно быть наименование через as 
6. По-максимуму используем возможности библиотеки [classNames](https://www.npmjs.com/package/classnames)  
7. Важно не забывать про module при создании файлов, т.к. в них создаются захешированные названия стилей, чтоб стили не переплетались 

## Порядок работы 
1. Создаете ветку соответствующую своей задаче
2. Выполняете задачу
```
git add . 
```
3. Коммиты - контрольные точки, старайтесь не делать коммиты слишком большими
Не более 200 изменений на коммит
```
git commit -m 'текст комментария - кратко описать что уже было сделано'
```
В случае если хотите отменить изменения воспользуйтесь командой 
```
git stash
```
Или можете перепрыгнуть на последний коммит при помощи команды 
```
git checkout [commit_hash]
```
ну или вовсе отменить последний коммит, где n - количество коммитов 
```
git reset HEAD~[n]
```
4. Если изменения еще ни разу отправлялись на сервер командой, то загрузить изменения можно следующей командой 
```
git push --set-upstream origin [branch_name]
```
Иначе 
```
git push
```
5. После того как, выполните задачу создаете pull request в develop, ревьюером ставите DmitriyGj 

# Развертывание проекта 
Для работы необходимо установить последнюю версию [NodeJs](https://nodejs.org/en/) 
Также должны быть установлены глобально пакетные менеджеры yarn и npm 
Чтоб установить глобально **npm**, выполните команду в консоли 
```
npm i -g  npm 
```
Чтоб установить глобально **yarn**, выполните команду в консоли 
```
npm i -g yarn 
```
Чтоб запустить проект в режиме разработки 
```
npm run dev
```
или 
```
yarn run dev
```

##  Frontend (NextJs + TypeScript + Redux (Toolkit, Thunk))
1. Склонировать репозиторий командой в консоли
```
git clone https://github.com/DmitriyGj/PI_Project_frontend.git
```
2. Открыть папку консоли в терменале ввести команду 
  ```
npm
```
или
```
yarn
``` 
3. Чтоб запустить проект нужно выполнить команду 
```
npm run dev
```
или
```
yarn run dev
```
4. Проект развернется на localhost:3000

## Backend ( NestJs + PostgreSQL )
1. Склонировать репозиторий командой в консоли
```
git clone https://github.com/DmitriyGj/PI_Project_backend.git
```
2. Открыть папку консоли в терменале ввести команду 
```
npm
``` 
3. Чтоб запустить проект нужно выполнить команду 
```
npm run start
``` 
4. Проект развернется на localhost:8080

## DB
1. DB_backup - файл базы данных
2. При помощи восстановления базы данных загружаем базу данных 
3. Запускаем базу, развертывается по адресу 'localhost:5432'

# Feature 
1. Создать контейнер с беком и бд )
2. Микросервисная архитектура
3. Деплой на сервер Heroku
4. Использование переменного окружения .env