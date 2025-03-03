/// <reference types="react" />
import { ScaleLinear } from 'd3-scale';
import { TooltipActionsContextData } from '@nivo/tooltip';
import { PartTooltipProps } from './PartTooltip';
import { FunnelDatum, FunnelCommonProps, FunnelDataProps, FunnelPart, SeparatorProps, FunnelCustomLayerProps, FunnelAreaGenerator, FunnelBorderGenerator } from './types';
export declare const computeShapeGenerators: <D extends FunnelDatum>(interpolation: "smooth" | "linear", direction: import("./types").FunnelDirection) => [FunnelAreaGenerator, FunnelBorderGenerator];
interface CustomBandScale {
    (index: number): number;
    bandwidth: number;
}
export declare const computeScales: <D extends FunnelDatum>({ data, direction, width, height, spacing, }: {
    data: D[];
    direction: import("./types").FunnelDirection;
    width: number;
    height: number;
    spacing: number;
}) => [CustomBandScale, ScaleLinear<number, number>];
export declare const computeSeparators: <D extends FunnelDatum>({ parts, direction, width, height, spacing, enableBeforeSeparators, beforeSeparatorOffset, enableAfterSeparators, afterSeparatorOffset, }: {
    parts: FunnelPart<D>[];
    direction: import("./types").FunnelDirection;
    width: number;
    height: number;
    spacing: number;
    enableBeforeSeparators: boolean;
    beforeSeparatorOffset: number;
    enableAfterSeparators: boolean;
    afterSeparatorOffset: number;
}) => SeparatorProps[][];
export declare const computePartsHandlers: <D extends FunnelDatum>({ parts, setCurrentPartId, isInteractive, onMouseEnter, onMouseLeave, onMouseMove, onClick, showTooltipFromEvent, hideTooltip, tooltip, }: {
    parts: FunnelPart<D>[];
    setCurrentPartId: (id: string | number | null) => void;
    isInteractive: boolean;
    onMouseEnter?: import("./types").FunnelPartEventHandler<D> | undefined;
    onMouseLeave?: import("./types").FunnelPartEventHandler<D> | undefined;
    onMouseMove?: import("./types").FunnelPartEventHandler<D> | undefined;
    onClick?: import("./types").FunnelPartEventHandler<D> | undefined;
    showTooltipFromEvent: TooltipActionsContextData['showTooltipFromEvent'];
    hideTooltip: () => void;
    tooltip?: ((props: PartTooltipProps<D>) => JSX.Element) | undefined;
}) => FunnelPart<D>[];
/**
 * Creates required layout to generate a funnel chart,
 * it uses almost the same parameters as the Funnel component.
 *
 * For purpose/constrains on the parameters, please have a look
 * at the component's props.
 */
export declare const useFunnel: <D extends FunnelDatum>({ data, width, height, direction, interpolation, spacing, shapeBlending: rawShapeBlending, valueFormat, colors, fillOpacity, borderWidth, borderColor, borderOpacity, labelColor, enableBeforeSeparators, beforeSeparatorLength, beforeSeparatorOffset, enableAfterSeparators, afterSeparatorLength, afterSeparatorOffset, isInteractive, currentPartSizeExtension, currentBorderWidth, onMouseEnter, onMouseMove, onMouseLeave, onClick, tooltip, }: {
    data: D[];
    width: number;
    height: number;
    direction?: import("./types").FunnelDirection | undefined;
    interpolation?: "smooth" | "linear" | undefined;
    spacing?: number | undefined;
    shapeBlending?: number | undefined;
    valueFormat?: import("@nivo/core").ValueFormat<number, void> | undefined;
    colors?: import("@nivo/colors").OrdinalColorScaleConfig<D> | undefined;
    fillOpacity?: number | undefined;
    borderWidth?: number | undefined;
    borderColor?: import("@nivo/colors").InheritedColorConfig<FunnelPart<D>> | undefined;
    borderOpacity?: number | undefined;
    labelColor?: import("@nivo/colors").InheritedColorConfig<FunnelPart<D>> | undefined;
    enableBeforeSeparators?: boolean | undefined;
    beforeSeparatorLength?: number | undefined;
    beforeSeparatorOffset?: number | undefined;
    enableAfterSeparators?: boolean | undefined;
    afterSeparatorLength?: number | undefined;
    afterSeparatorOffset?: number | undefined;
    isInteractive?: boolean | undefined;
    currentPartSizeExtension?: number | undefined;
    currentBorderWidth?: number | undefined;
    onMouseEnter?: import("./types").FunnelPartEventHandler<D> | undefined;
    onMouseMove?: import("./types").FunnelPartEventHandler<D> | undefined;
    onMouseLeave?: import("./types").FunnelPartEventHandler<D> | undefined;
    onClick?: import("./types").FunnelPartEventHandler<D> | undefined;
    tooltip?: ((props: PartTooltipProps<D>) => JSX.Element) | undefined;
}) => {
    parts: FunnelPart<D>[];
    areaGenerator: FunnelAreaGenerator;
    borderGenerator: FunnelBorderGenerator;
    beforeSeparators: SeparatorProps[];
    afterSeparators: SeparatorProps[];
    setCurrentPartId: import("react").Dispatch<import("react").SetStateAction<string | number | null>>;
    currentPartId: string | number | null;
    customLayerProps: FunnelCustomLayerProps<D>;
};
export declare const useFunnelAnnotations: <D extends FunnelDatum>(parts: FunnelPart<D>[], annotations: import("@nivo/annotations").AnnotationMatcher<FunnelPart<D>>[]) => import("@nivo/annotations").BoundAnnotation<FunnelPart<D>>[];
export {};
//# sourceMappingURL=hooks.d.ts.map