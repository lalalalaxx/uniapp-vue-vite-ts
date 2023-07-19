import { ref } from "vue";
import { getExpireList } from "@/apis/index";
// 类型
import type { listInt } from "./type";

export let list = ref<listInt>({
  level_four: [],
  level_three: [],
  level_two: [],
  level_one: [],
});
export let num = ref<number>(0);
// 获取列表数据
export const getList = (is_asc?: number) => {
  getExpireList({ is_asc }).then((res: any) => {
    num.value = 0;
    list.value = res.data;
    for (let datum in res.data) {
      console.log("datum", datum);
      num.value += res.data[datum].length;
    }
  });
};
