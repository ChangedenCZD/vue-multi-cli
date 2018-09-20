const FileUtils = require('../utils/FileUtils');

const genConfigFile = (configFilePath, fixPath, moduleTitle) => {
  FileUtils.write(configFilePath, `{"redirect-url": "/${fixPath}","page-title": "${moduleTitle}"}`);
};

const genTsFile = (dir, className, isComponent = false) => {
  const key = isComponent ? 'Component' : 'Module';
  const baseClass = `Base${key}`;
  FileUtils.write(`${dir}${key.toLowerCase()}.ts`, `import ${baseClass} from '@/lib/${baseClass}';
class ${key} extends ${baseClass} {
  constructor() {
    super();
    this.setModuleName('${className}');
    this.setProps([]);
    this.setComponent({});
    this.setMethod({
      ...${key}.mapActions([])
    });
    this.setCompute({
      ...${key}.mapGetters({})
    });
    this.setWatch({});
  }
  getData() {
    return {};
  }
  onCreate() {
    super.onCreate(this);
  }
}
export default new ${key}();
`);
};

const genScssFile = (dir, className, srcDir) => {
  FileUtils.write(`${dir}module.scss`, `@import "${FileUtils.relativePath(dir, srcDir)}assets/scss/base";
.${className} {}`);
};

const genModuleVueFile = (dir, className) => {
  FileUtils.write(`${dir}module.vue`, `<section class="${className}"></section>`);
};

const genModuleFiles = (dir, className, fixPath, title, srcDir) => {
  const configFilePath = `${dir}config.json`;
  genConfigFile(configFilePath, fixPath, title);
  genScssFile(dir, className, srcDir);
  genModuleVueFile(dir, className);
  genTsFile(dir, className, false);
};

const genIndexFile = (dir) => {
  FileUtils.write(`${dir}index.ts`, `import Component from './component.vue';
export default Component;`);
};

const ASSETS_SCSS_BASE = 'assets/scss/base';

const genComponentVueFile = (dir, className, srcDir) => {
  FileUtils.write(`${dir}component.vue`, `<template>
  <section class="${className}"></section>
</template>
<script>
  import Component from './component';
  export default Component;
</script>
<style scoped="true" lang="scss">
  @import "${FileUtils.relativePath(dir, srcDir)}${ASSETS_SCSS_BASE}";
  .${className}{}
</style>`);
};

const genComponentFiles = (dir, className, srcDir) => {
  genIndexFile(dir);
  genComponentVueFile(dir, className, srcDir);
  genTsFile(dir, className, true);
};

module.exports = {
  module: {
    config: genConfigFile,
    scss: genScssFile,
    vue: genModuleVueFile,
    ts: genTsFile,
    gen: genModuleFiles
  },
  component: {
    ts: genTsFile,
    index: genIndexFile,
    vue: genComponentVueFile,
    gen: genComponentFiles
  }
};
