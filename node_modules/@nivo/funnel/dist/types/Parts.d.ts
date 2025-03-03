/// <reference types="react" />
import { FunnelPartWithHandlers, FunnelAreaGenerator, FunnelBorderGenerator, FunnelDatum } from './types';
interface PartsProps<D extends FunnelDatum> {
    parts: FunnelPartWithHandlers<D>[];
    areaGenerator: FunnelAreaGenerator;
    borderGenerator: FunnelBorderGenerator;
}
export declare const Parts: <D extends FunnelDatum>({ parts, areaGenerator, borderGenerator, }: PartsProps<D>) => JSX.Element;
export {};
//# sourceMappingURL=Parts.d.ts.map