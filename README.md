# 啟動說明 ****How To Use****

1. [部署好的網址](https://git-repo-delta.vercel.app/)
2. local 端
```js
// Clone repo 
git clone git@github.com:jesChung/search-github-repo.git

// Change directories to this repository
cd search-github-repo

// Run React app
npm install
npm start
```
# ****程式架構設計 Code Skeleton****

- index.js : program Entry
- App.js : for direct route
- Home.jsx : a search bar for user to input GitHub username
- api.js : store the link of Github API
- RepoList.jsx : <Route = '/users/:username/repos'>
    
    display GitHub user’s name ＆ his/her all repositories
    
- RepoDetail.jsx : <Route = '/users/:username/repos/:repoName'>
    
    display repository details, by clicking Github icon navigate to the repo on Github
    
## **功能與實作 Features and implementation**

- 使用 react-router-dom 做routing
- 使用 useEffect, useState等react hook 處理生命週期
- 使用 axios 串接Github REST API
- 使用 react-infinite-scroll-component 實作滾動載入
- 使用 antd + Tailwinds.css 美化介面
