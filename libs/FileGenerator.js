const FileUtils = require('../utils/FileUtils');

const ASSETS_SCSS_BASE = 'assets/scss/base';

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
  FileUtils.write(`${dir}module.scss`, `@import "${FileUtils.relativePath(dir, srcDir)}${ASSETS_SCSS_BASE}";
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

const genIndexFile = (dir, fixPath, srcDir) => {
  const componentTempDir = `${srcDir}.components/${fixPath}`;
  FileUtils.mkdir(componentTempDir);
  FileUtils.write(`${componentTempDir}/index.vue`, `<script>export default {};</script>`);
  FileUtils.write(`${dir}index.ts`, `import Component from '@/.components/${fixPath}/index.vue';
export default Component;`);
};

const genComponentVueFile = (dir, className) => {
  FileUtils.write(`${dir}component.vue`, `<section class="${className}"></section>`);
};

const genComponentScssFile = (dir, className, srcDir) => {
  FileUtils.write(`${dir}component.scss`, `@import "${FileUtils.relativePath(dir, srcDir)}${ASSETS_SCSS_BASE}";
.${className} {}`);
};

const genComponentFiles = (dir, className, srcDir, fixPath) => {
  genIndexFile(dir, fixPath, srcDir);
  genComponentVueFile(dir, className);
  genComponentScssFile(dir, className, srcDir);
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
