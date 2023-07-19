// api
import { ref } from "vue";
import { getList, getExpire } from "@/apis/index";
import type { getListInt } from "@/apis/index/type";

// 类型
import type { getExpireInt } from "@/pages/index/type";

// 获取到期统计数量
const expire = ref<getExpireInt>({
  level_four: 0,
  level_three: 0,
  level_two: 0,
  level_one: 0,
});

// 提示统计
export let noticeType = ref(0);
export let noticeNum = ref(0);
export const getExpireInfo = () => {
  getExpire().then((res: any) => {
    expire.value = res.data;
    if (expire.value.level_four > 0) {
      noticeNum.value = expire.value.level_four;
    } else if (expire.value.level_three > 0) {
      noticeType.value = 1;
      noticeNum.value = expire.value.level_three;
    } else if (expire.value.level_two > 0) {
      noticeType.value = 2;
      noticeNum.value = expire.value.level_two;
    } else if (expire.value.level_one > 0) {
      noticeType.value = 3;
      noticeNum.value = expire.value.level_one;
    }
  });
};
// -----------------------------------------
// 菜单相关
export interface listInt {
  icon: string;
  name: string;
  id: number;
}
// 菜单按钮列表相关
export const list = ref<listInt[]>([]);
export const listNum = ref(0);
// 获取菜单列表
export const getMenuList = (obj?: getListInt) => {
  getList(obj).then((res: any) => {
    list.value = res?.data?.list;
    listNum.value = res?.data?.num;
  });
};

// 获取菜单和通知消息
export const getAllInfo = () => {
  getMenuList();
  getExpireInfo();
};
