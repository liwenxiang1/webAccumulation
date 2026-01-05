const fs = require('fs')
const path = require('path')

//读取本地配置工具类
class FileUtils {

  //判断配置文件是否存在
  isExit() {
    let success = true;
    if (!(localConfig.config && typeof localConfig.config === 'object')) {
      success = this.initConfig();
    }
    return success;
  }

  //初始化config
  initConfig() {
    try {
      const config = this.readConfig();
      if (config) {
        localConfig.config = JSON.parse(config as String);
        return true;
      }
      const defaultConfig = {};
      const content = JSON.stringify(defaultConfig);
      fs.writeFileSync(localConfig.configUrl, content);
      localConfig.config = defaultConfig;
      return true;
    } catch (e) {
      return false;
    }
  }

  //读取文件
  readConfig() {
    try {
      const result = fs.readFileSync(localConfig.configUrl);
      return result;
    } catch (error) {
      return false;
    }
  }

  //写入文件
  writeConfig(value) {
    try {
      const content = JSON.stringify(value);
      fs.writeFileSync(localConfig.configUrl, content);
      return true;
    } catch (e) {
      return false;
    }
  }
}

const fileUtils = new FileUtils()

export const localConfig = {
  config: <any>{} || null,
  configUrl: path.join(__dirname, './localConfig.json'),
  setStoragePath: (path) => {
    localConfig.configUrl = path;
  },
  getStoragePath: () => {
    return localConfig.configUrl;
  },
  getItem: (key) => {
    const success = fileUtils.isExit();
    if (success) {
      const result = localConfig.config[key];
      return result ? result : '';
    }
    return null;
  },
  setItem: (key, value) => {
    let success = fileUtils.isExit();
    if (success) {
      const config = Object.assign({}, localConfig.config);
      config[key] = value;
      const suc = fileUtils.writeConfig(config);
      if (suc) {
        localConfig.config = config;
        console.log("save local file success!")
        return true;
      }
    }
    console.error("save local file error")
    return false;
  },
  getAll: () => {
    let success = fileUtils.isExit();
    if (success) {
      return localConfig.config;
    }
    return null;
  },
  removeItem: (key) => {
    const value = localConfig.getItem(key);
    if (value) {
      const config = Object.assign({}, localConfig.config);
      delete config[key];
      const suc = fileUtils.writeConfig(config);
      if (suc) {
        localConfig.config = config;
        return true;
      }
    }
    return false;
  },
  clear: () => {
    let success = fileUtils.isExit();
    if (success) {
      const suc = fileUtils.writeConfig({});
      if (suc) {
        localConfig.config = {};
        return true;
      }
    }
    return false;
  }
}
