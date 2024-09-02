import { Graph } from '@antv/x6';
import { NodeNameEnum } from './register';
import { AddOrRemoveParams, DataVoItem } from './enum';

// export const render = (graph: Graph, data: Model) => {
// const dagreLayout = new DagreLayout({
//     type: 'dagre',
//     rankdir: 'LR',
//     align: 'UL',
//     ranksep: 30,
//     nodesep: 15,
//     controlPoints: true,
// });
// const model = dagreLayout.layout(data);
// graph.fromJSON(model);
// };
// interface OperateObjVo {
//     type: 'add' | 'remove';
//     data?: DataVoItem[];
//     groupIndex?: number;
//     removeId?: string;
// }
export interface ParamsVo {
    graph: Graph;
    data: DataVoItem[];
    isCenter?: boolean;
}

export const render = (params: ParamsVo) => {
    const { data, graph, isCenter = false } = params;
    const nodeHeight = 40;
    const nodeWidth = 300;
    const groupLength = 500;
    data.forEach((v, index) => {
        const useIndex = index;
        const group = graph.addNode({
            id: v.id,
            y: 0,
            x: (useIndex - 1) * groupLength,
            width: nodeWidth,
            height: v.children.length * nodeHeight + 40,
            shape: NodeNameEnum.GroupNode,
            data: {
                ...v,
            },
        });
        v.children.forEach((x, idx) => {
            const node = graph.addNode({
                x: (useIndex - 1) * groupLength,
                y: idx * nodeHeight + 40,
                width: nodeWidth,
                height: nodeHeight,
                id: x.id,
                label: x.id,
                shape: NodeNameEnum.ItemNode,
                data: {
                    label: x.id,
                    checked: false,
                    parentId: v.id,
                    isOpen: false,
                    parentTarget: x.parentTarget,
                    id: x.id,
                },
            });
            group.addChild(node);
            if (x.parentTarget) {
                x.parentTarget.forEach((y) => {
                    graph.addEdge({
                        shape: 'tree-edge', // 指定使用何种图形，默认值为 'edge'
                        source: y,
                        target: x.id,
                    });
                });
            }
        });
    });
    if (isCenter) {
        graph.centerContent();
    }
};
