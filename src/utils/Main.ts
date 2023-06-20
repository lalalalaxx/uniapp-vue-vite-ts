import type { goToPageInt } from "@/types/global";

// 公共跳转方法
export const goToPage = (option: goToPageInt) => {
  let urls = option.url;
  // 判断option
  if (option.hasOwnProperty("params") && option.params) {
    urls += "?";
    for (let key in option.params) {
      urls += key + "=" + option.params[key] + "&";
    }
    urls.substring(0, urls.length - 1);
  }
  switch (option.mode) {
    case "navigateTo":
      uni.navigateTo({
        url: urls,
      });
      break;
    case "redirectTo":
      uni.redirectTo({
        url: urls,
      });
      break;
    case "reLaunch":
      uni.reLaunch({
        url: urls,
      });
      break;
    case "switchTab":
      uni.switchTab({
        url: urls,
      });
      break;
  }
};
