import { Graph } from '@antv/x6';
import './register';

interface OptionsVo {
    container: HTMLElement;
    miniMapContainer: HTMLElement;
    autoResize: boolean | Element | Document;
}

export const initGraph = (options: OptionsVo): Graph => {
    const graph = new Graph({
        container: options.container,
        // 画布是否可拖动
        panning: false,
        async: true,
        autoResize: options.autoResize,
        scroller: {
            enabled: true,
            pannable: true,
            pageVisible: false,
            pageBreak: false,
            padding: 0,
        },
        minimap: {
            enabled: true,
            container: options.miniMapContainer,
            scalable: false,
            width: 150,
            height: 80,
            padding: 10,
        },
        mousewheel: {
            enabled: true,
            modifiers: ['ctrl', 'meta'],
        },
        grid: {
            size: 10,
        },
        interacting: {
            // 禁止节点移动
            nodeMovable: false,
            edgeMovable: false,
        },
        sorting: 'approx',
        connecting: {
            router: 'manhattan',
            connector: {
                name: 'rounded',
                args: {
                    radius: 20,
                },
            },
            allowMulti: 'withPort',
            allowEdge: false,
            highlight: true,
        },
    });
    return graph;
};
