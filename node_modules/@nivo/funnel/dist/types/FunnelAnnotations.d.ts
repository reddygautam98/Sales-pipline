/// <reference types="react" />
import { FunnelDatum, FunnelPart } from './types';
interface FunnelAnnotationsProps<D extends FunnelDatum> {
    parts: FunnelPart<D>[];
    annotations: any[];
}
export declare const FunnelAnnotations: <D extends FunnelDatum>({ parts, annotations, }: FunnelAnnotationsProps<D>) => JSX.Element;
export {};
//# sourceMappingURL=FunnelAnnotations.d.ts.map