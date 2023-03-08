import http from "./http.js";

let apiFun = {
  user: {},
  content: {},
  sensitive: {},
  comment: {},
  product: {},
};

/** 登录 */
/** 密码登录 */
apiFun.login = (params) => {
  return http.postParams("/user/login/password", params);
};

/** 获取用户列表 */
apiFun.user.list = (params) => {
  return http.get("/admin/users", params);
};

/** 获取用户信息 */
apiFun.user.get = (params) => {
  return http.get();
};

/** 修改用户信息 */
apiFun.user.update = (params) => {
  return http.put();
};

/** 删除用户 */
apiFun.user.delete = (params) => {
  return http.delete("/admin/user/" + params);
};

/** 获取文章列表 */
apiFun.content.list = (params) => {
  return http.get("/admin/materials", params);
};

/** 获取敏感词列表 */
apiFun.sensitive.list = (params) => {
  return http.get("/admin/sensitive/words", params);
};

/** 获取文章信息 */
apiFun.content.get = (params) => {
  return http.get();
};

/** 修改文章信息 */
apiFun.content.update = (params) => {
  return http.put();
};

/** 删除文章 */
apiFun.content.delete = (params) => {
  return http.delete();
};

/** 审核文章 */
apiFun.content.check = (id) => {
  return http.put("/admin/materials/" + id + "/pass");
};

apiFun.product.add = (params) => {
  return http.post("/exchange", params);
};

apiFun.getProductList = () => {
  return http.get("/exchanges");
};

apiFun.delSensitive = (params) => {
  return http.delete(`/admin/sensitive/word/${params}`);
};

export default apiFun;
