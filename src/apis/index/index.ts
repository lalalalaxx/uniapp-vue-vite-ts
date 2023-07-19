import { request } from "@/utils/http";
import type { getListInt, getExpireListInt, getUserListInt } from "./type";
// 获取首页按钮列表
export function getList(data?: getListInt) {
  return request.http({
    url: "/api/v1.Category/getList",
    data,
  });
}
// 获取到期用户统计信息
export function getExpire() {
  return request.http({
    url: "/api/v1.user/getExpire",
  });
}

// 获取到期用户统计信息列表
export function getExpireList(data?: getExpireListInt) {
  return request.http({
    url: "/api/v1.user/getExpireList",
    data,
  });
}

// 获取分类下人员列表
export function geUserList(data:getUserListInt) {
  return request.http({
    url: "/api/v1.user/getList",
    data,
  });
}
