export interface DataVoItem {
    id: string;
    label: string;
    children: Array<{ id: string; parentTarget?: Array<string> }>;
}

export interface AddOrRemoveParams {
    id: string;
    parentId: string;
    isOpen: boolean;
}
