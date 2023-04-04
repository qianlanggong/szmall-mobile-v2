// clientWidth 处理兼容性 获取视图的宽高
export const getWindowClient = () => {
  return {
    width:
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
    height:
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight,
  };
};
// scrollTop兼容性处理  获取滚轮的滚动距离
export const getScrollTop = () => {
  return window.pageYOffset || document.documentElement.scrollTop;
};
// 内容区视口的窗度
export let viewHight = document.documentElement.clientHeight;
// 自调节内容区视口的高度
/**
 *
 * @param {*} current  vc   VueComponent
 * @param {*} element   内容区dom元素节点
 * @param {*} value     新的整体视口高度
 */
export const adaptContentHeight = (current, element, value) => {
  // 在页面dom元素渲染上去后再设置dom元素的样式，否则会报错
  current.$nextTick(function () {
    current.$refs[element].style.height = value - 54 - 50 + "px";
  });
  console.log("[ current.data ] >", current);
  window.onresize = () => {
    current._data.viewHight = getWindowClient().height;
    console.log("😜🏀[ viewHight ]-23", viewHight);
  };
};
