import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './style/index.less';

const app = createApp(App);
app.use(store).use(router).mount('#app');

app.config.errorHandler = (err) => {
    /* 处理错误 */
    console.log('监听错误', err);
};
