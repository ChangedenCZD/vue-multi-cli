##Install
```commandline
npm i -g vue-multi-cli
```

##Create Project
```text
vues create <project-name>
// eg: vues create demo
```

##Init Project
```text
// Install vue-cli-3.0 at first.
npm install -g @vue/cli

// Open Project Dir
cd <project-name>

// Init
yarn install 
```

##Add Module
####Remark: Used in the project root directory.
```text
vues add -m <module-title> -p <module-path>
// eg: vues add -m module1 -p /mobile/page/index
// Html-Title: module1
// Html-Url: localhost:port/mobile/page/index
```

##Add Component
####Remark: Used in the project root directory.
```text
vues add -c <component-path>
// eg: vues add -c /home/index
// Import: import Component from '@/components/home/index'
```
