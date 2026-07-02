declare module "roughjs/bundled/rough.esm.js" {
  interface RoughSVG {
    rectangle(
      x: number,
      y: number,
      width: number,
      height: number,
      options?: Record<string, unknown>,
    ): SVGElement;
    linearPath(points: [number, number][], options?: Record<string, unknown>): SVGElement;
    circle(x: number, y: number, diameter: number, options?: Record<string, unknown>): SVGElement;
    line(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      options?: Record<string, unknown>,
    ): SVGElement;
    ellipse(
      x: number,
      y: number,
      width: number,
      height: number,
      options?: Record<string, unknown>,
    ): SVGElement;
  }

  function svg(element: SVGElement | SVGSVGElement): RoughSVG;

  export { svg, RoughSVG };
}
