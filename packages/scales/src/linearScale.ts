import { scaleLinear } from 'd3-scale'
import { ScaleLinearSpec, ScaleLinear, ComputedSerieAxis, ScaleAxis } from './types'

export const createLinearScale = <Output>(
    { min = 0, max = 'auto', stacked = false, reverse = false, clamp = false }: ScaleLinearSpec,
    data: ComputedSerieAxis<Output>,
    size: number,
    axis: ScaleAxis
) => {
    let minValue: number
    if (min === 'auto') {
        minValue = stacked === true ? data.minStacked : data.min
    } else {
        minValue = min
    }

    let maxValue: number
    if (max === 'auto') {
        maxValue = stacked === true ? data.maxStacked : data.max
    } else {
        maxValue = max
    }

    const scale = scaleLinear<number, Output>()
        .rangeRound(axis === 'x' ? [0, size] : [size, 0])
        .clamp(clamp)

    if (reverse === true) {
        scale.domain([maxValue, minValue])
    } else {
        scale.domain([minValue, maxValue])
    }

    const typedScale = scale as ScaleLinear<number>
    typedScale.type = 'linear'
    typedScale.stacked = stacked

    return typedScale
}
