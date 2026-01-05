import {defineStore} from 'pinia'
import cache from "../utils/cache";
import {IUser} from "../utils/beans";

export const appStore = defineStore('app', {
  state: () => ({
    user: {
      name: '',
      sex: 0,
      avatar: '',
      remark: '',
      is_super: 0
    } as IUser,
    token: cache.getToken(),
    phoneBrand: cache.getPhoneBrand(),//手机型号
    installStepIndex: 0,//安装步骤编号
  }),
  actions: {
    setUser(val: any) {
      this.user = val || {
        name: '',
        sex: 0,
        avatar: '',
        remark: '',
        is_super: 0
      }
    },
    setPhoneBrand(val: any) {
      this.phoneBrand = val
      cache.setPhoneBrand(val)
    },
    setInstallStepIndex(val: any) {
      this.installStepIndex = val
    }
  }
})
