// 获取按钮列表数据
export interface getListInt {
  pid?: string; // 可选参数 传递查询当前id的子集
}

// 获取到期人员列表数据
export interface getExpireListInt {
  is_asc?: number; // 排序
}
// 获取分类下人员列表数据
export interface getUserListInt {
  categoryId: number; // id
}
