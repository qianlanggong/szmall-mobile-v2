// 全局事件总线，发布$mit,订阅$on
import Vue from "vue";
export const EventBus = new Vue();
// 使用：
// import { EventBus } from './event-bus.js';

// // 触发事件
// EventBus.$emit('event-name', eventData);

// // 监听事件
// EventBus.$on('event-name', eventData => {
//   // 处理事件
// });
