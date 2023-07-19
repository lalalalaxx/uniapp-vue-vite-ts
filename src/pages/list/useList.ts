// api
import { ref, watch, nextTick } from "vue";
import { getList, geUserList } from "@/apis/index";
import type { getListInt } from "@/apis/index/type";

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
// 分类下人员列表

// 折叠框
// const collapse = ref();
export const collapseValue = ref<number>(-1);
export const userList = ref<any[]>([]);
export const collapseOpen = (activeNames: number) => {
  collapseValue.value = activeNames;
  geUserList({ categoryId: activeNames }).then((res: any) => {
    userList.value = res.data;
    // setTimeout(() => {
    // }, 200);
  });
};
