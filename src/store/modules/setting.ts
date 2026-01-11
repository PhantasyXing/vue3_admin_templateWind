import { defineStore } from 'pinia'

const useLayoutSettingStore = defineStore('SettingStore', {
  state: (): any => {
    return {
      fold: false, //用户控制菜单折叠还是收起控制
      refresh: false, //仓库这个属性用于控制刷新效果
    }
  },
})

export default useLayoutSettingStore
