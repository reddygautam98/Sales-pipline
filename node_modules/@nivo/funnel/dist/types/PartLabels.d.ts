/// <reference types="react" />
import { FunnelDatum, FunnelPart } from './types';
interface PartLabelsProps<D extends FunnelDatum> {
    parts: FunnelPart<D>[];
}
export declare const PartLabels: <D extends FunnelDatum>({ parts }: PartLabelsProps<D>) => JSX.Element;
export {};
//# sourceMappingURL=PartLabels.d.ts.map