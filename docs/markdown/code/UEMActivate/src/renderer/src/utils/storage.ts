/**
 * window.localStorage 浏览器永久缓存
 * @method setItem 设置缓存
 * @method getItem 获取缓存
 * @method removeItem 移除缓存
 * @method clear 移除全部缓存
 */
export const Storage = {
	setItemJson(key: string, value: any) {
		window.localStorage.setItem(key, JSON.stringify(value))
	},
	setItem(key: string, value: any) {
		window.localStorage.setItem(key, value)
	},
	getItemJson(key: string) {
		let json: any = window.localStorage.getItem(key)
		if (json != null && json != undefined && json != 'undefined' && json) {
			return JSON.parse(json)
		}
		return null
	},
	getItem(key: string) {
		return window.localStorage.getItem(key)
	},
	removeItem(key: string) {
		window.localStorage.removeItem(key)
	},
	clear() {
		window.localStorage.clear()
	}
}

/**
 * window.sessionStorage 浏览器临时缓存
 * @method setItem 设置缓存
 * @method getItem 获取缓存
 * @method removeItem 移除缓存
 * @method clear 移除全部缓存
 */
export const SessionStorage = {
	setItemJson(key: string, value: any) {
		window.sessionStorage.setItem(key, JSON.stringify(value))
	},
	setItem(key: string, value: any) {
		window.sessionStorage.setItem(key, value)
	},
	getItemJson(key: string) {
		let json: any = window.sessionStorage.getItem(key)
		if (json != null && json != undefined && json != 'undefined' && json) {
			return JSON.parse(json)
		} 
		return null
	},
	getItem(key: string) {
		return window.sessionStorage.getItem(key)
	},
	removeItem(key: string) {
		window.sessionStorage.removeItem(key)
	},
	clear() {
		window.sessionStorage.clear()
	}
}
