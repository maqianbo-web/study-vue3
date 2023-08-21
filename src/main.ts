import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import './style/index.less';
import 'element-plus/dist/index.css';

const app = createApp(App);

app.use(store).use(router).use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.mount('#app');

app.config.errorHandler = (err) => {
    /* 处理错误 */
    console.log('监听错误', err);
};
