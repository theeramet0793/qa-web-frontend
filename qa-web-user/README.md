# Question and Answer Website for Finding Movies

Project Question and Answer Website for Finding Movies has 5 repository
1. qa-web-frontend: เป็นโค้ดฝั่ง frontend (หลัก) ที่เอาไว้สร้าง web UI สำหรับผู้ใช้ทั่วไป 
2. qa-web-admin: เป็นโค้ดฝั่ง frontend ที่เอาไว้สร้าง web UI สำหรับผู้ใช้ที่เป็นแอดมิน(ซึ่งหมายถึงผู้พัฒนาโครงงานนี้เอง)สำหรับใช้ในการควบคุม API ของ qa-web-ml
3. qawebBackend: เป็นโค้ดฝั่ง Backend (หลัก) ที่เอาไว้สร้าง API สำหรับ qa-web-frontend
4. qa-web-ml: เป็นโค้ดฝั่ง Backend ที่เอาไว้สร้าง API สำหรับ Machine Learning ของระบบตอบชื่อภาพยนตร์อัตโนมัติในเว็บไซต์ 
5. qa-web-ml-resource: เป็นโค้ดที่เอาไว้จัดการข้อมูลเพื่อป้อนข้อมูลภาพยนตร์ในช่วงเริ่มต้นให้กับระบบแนะนำชื่อภาพยนตร์

## Description for this repository (qawebBackend)

### Install
npm install

### Running the app
npm start

# Getting Started with My Project Folder Structure

assets = keeping image, picture, svg, etc.\
components = keeping my react component.\
data = global const variable.\
feature = similar to pages but grouping by feature.\
hooks = keeping my react hooks such as Debounce.\
layouts = keeping my base layout.\
lib = keeping my various different library such as Axios.\
services = keeping my external APIs.\
utils = keeping my utility function sach as formatter.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
