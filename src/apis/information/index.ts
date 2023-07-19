import { request } from "@/utils/http";
import type { detailInt, infoInt } from "./type";
// 详情接口
export function getDetail(data: detailInt) {
  return request.http({
    url: "/api/v1.user/getDetail",
    data
  });
}
// 删除用户
export function deleteInfo(data: detailInt) {
  return request.http({
    url: "/api/v1.user/delete",
    data
  });
}
// 编辑用户
export function updateInfo(data: infoInt) {
  return request.http({
    url: "/api/v1.user/update",
    data
  });
}
