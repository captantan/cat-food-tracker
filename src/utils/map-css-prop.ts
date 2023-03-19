import { CSSProperties } from '@mui/styled-engine';
import { fromPairs } from 'ramda';

export function mapCssProp<
  TFrom extends keyof CSSProperties,
  TTo extends keyof CSSProperties,
>(
  from: TFrom,
  to: string,
  css: CSSProperties,
  transform?: (prop: CSSProperties[TFrom]) => CSSProperties[TTo],
): CSSProperties {
  return fromPairs(
    Object.entries(css)
      .filter(([key]) => key === from || key.startsWith('@'))
      .map(([key, value]) => {
        if (key === from) {
          return [to, transform ? transform(value) : value];
        } else {
          return [key, mapCssProp(from, to, value, transform)];
        }
      }),
  );
}
