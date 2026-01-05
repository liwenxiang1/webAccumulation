import { appStore } from './app'

const store: any = {}

export const registerStore = () => {
	store.appStore = appStore()
}

export default store
