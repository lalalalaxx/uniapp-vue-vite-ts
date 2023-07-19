import { request } from "@/utils/http";
import type { userInfoInt } from "./type";
export function login(data: userInfoInt) {
  return request.http({
    url: "/api/v1.login/index",
    data,
    isSinglePost: true, // 是否是单例模式默认可不传de
  });
}
