import {Storage} from '../storage'
import CacheKey from './key'

// 缓存
class Cache {
  getToken = (): string => {
    return Storage.getItem(CacheKey.TokenKey) || ''
  }

  setToken = (value: string) => {
    Storage.setItem(CacheKey.TokenKey, value)
  }

  getPhoneBrand = (): string => {
    return Storage.getItem(CacheKey.PhoneBrandKey) || ''
  }

  setPhoneBrand = (value: string) => {
    Storage.setItem(CacheKey.PhoneBrandKey, value)
  }
}

export default new Cache()
