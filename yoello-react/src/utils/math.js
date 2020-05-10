/** Clamps a number between (min, max) */
export default function clamp(value, minValue, maxValue)
{
    return Math.min(Math.max(value, minValue), maxValue);
};