import { useUserStore } from "../store/user";

interface Response {
  code: number;
  data: object;
  message: string;
}

const requestObj = {
  isLock: false,
  http({ url = "", data = {}, isPost = true, isSinglePost = false }) {
    const that = this;
    const userStore = useUserStore();
    console.log(userStore.token, that.isLock);
    return new Promise(function (resolve, reject) {
      if (isSinglePost && that.isLock) {
        reject({ message: "加载中" });
      }
      that.isLock = true;

      if (import.meta.env.MODE == "development") {
        url = "/apis" + url;
      } else if (url.indexOf("http") == -1) {
        url = import.meta.env.VITE_APP_BASE_URL + url;
      }

      let header = {
        "content-type": "application/json",
        token: "",
      };
      if (userStore.token) {
        header["token"] = userStore.token;
      }

      uni.request({
        url,
        header,
        data,
        method: isPost ? "POST" : "GET",
        success(res) {
          let data = res.data as Response;

          if (res.statusCode == 200) {
            if (data.code == 20000) {
              resolve(res.data);
            } else {
              resolve(res.data);
              uni.showToast({ title: data.message, icon: "none" });
            }
          } else {
            uni.showToast({ title: "响应错误", icon: "none" });
            reject({ message: "响应错误" });
          }
        },
        fail() {
          uni.showToast({ title: "网络错误", icon: "none" });
          reject({ message: "网络错误" });
        },
        complete() {
          that.isLock = false;
        },
      });
    });
  },
};

export const request = requestObj;
