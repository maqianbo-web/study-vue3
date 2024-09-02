import { Graph, Shape, Edge } from '@antv/x6';

import '@antv/x6-vue-shape';
import GroupNode from './GroupNode.vue';
import ItemNode from './ItemNode.vue';

export const enum NodeNameEnum {
    GroupNode = 'GroupNode',
    ItemNode = 'ItemNode',
}

Graph.registerNode(NodeNameEnum.GroupNode, {
    inherit: 'vue-shape',
    component: {
        template: `<group-node />`,
        components: {
            GroupNode,
        },
    },
    zIndex: 1,
});
Graph.registerNode(NodeNameEnum.ItemNode, {
    inherit: 'vue-shape',
    component: {
        template: `<item-node />`,
        components: {
            ItemNode,
        },
    },
    zIndex: 10,
});

// 定义边
class TreeEdge extends Shape.Edge {}

TreeEdge.config({
    zIndex: 1,
    router: {
        name: 'er',
    },
    connector: {
        name: 'rounded',
        args: {
            radius: 20,
        },
    },
    attrs: {
        line: {
            targetMarker: 'classic',
        },
    },
});

Edge.registry.register('tree-edge', TreeEdge, true);
