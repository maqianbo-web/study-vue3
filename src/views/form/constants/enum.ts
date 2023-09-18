export type SearchType = 'input' | 'select' | 'radio';
export interface SearchItemOptionsVO {
    label: string;
    value: number | string;
    disabled?: boolean;
}
export interface ChangeParamsVO {
    prop: string;
    val: unknown;
}
export interface SearchItemVO {
    label: string;
    prop: string;
    type: SearchType;
    elColSpan?: number; // 展示列的长度，默认一行 24
    options?: SearchItemOptionsVO[]; // select的选项
    onChange?: (changeParams: ChangeParamsVO) => void; // 搜索框更改事件
    config?: Record<string, unknown>;
}
