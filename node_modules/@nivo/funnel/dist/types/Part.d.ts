/// <reference types="react" />
import { FunnelDatum, FunnelPartWithHandlers, FunnelAreaGenerator, FunnelBorderGenerator } from './types';
export interface PartProps<D extends FunnelDatum> {
    part: FunnelPartWithHandlers<D>;
    areaGenerator: FunnelAreaGenerator;
    borderGenerator: FunnelBorderGenerator;
}
export declare const Part: <D extends FunnelDatum>({ part, areaGenerator, borderGenerator, }: PartProps<D>) => JSX.Element;
//# sourceMappingURL=Part.d.ts.map