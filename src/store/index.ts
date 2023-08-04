import { createPinia } from 'pinia'
import { createUnistorage } from 'pinia-plugin-unistorage'

const store = createPinia()
// 使用该插件
// 关键代码 👇
store.use(createUnistorage())

//导出
export default store
