import { defineStore } from 'pinia'

const useLayoutSettingStore = defineStore('SettingStore', {
  state: (): any => {
    return {
      fold: false,
    }
  },
})

export default useLayoutSettingStore
