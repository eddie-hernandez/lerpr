import * as sandboxesAPI from './sandboxes-api'
import * as curvesAPI from './curves-api'

export function sample100points(curve) {
  const subsamples = []

  // sample 101 points to create 100 segments of the curve, equally distributed in parameter space
  for (let i = 0; i < 101; i++) {
    const samplePoint = i / 100

    // rename variables to the traditional mathematical symbols to condense the coming formulas
    const A = curve.startPoint
    const B = curve.control1
    const C = curve.control2
    const D = curve.endPoint
    const t = samplePoint

    // calculate (x,y) coordinates at this sample point using the polynomial form of quadratic Bezier Curve
    const x =
      A.x * (1 - t) ** 3 +
      B.x * 3 * (1 - t) ** 2 * t +
      C.x * 3 * (1 - t) * t ** 2 +
      t ** 3 * D.x
    const y =
      A.y * (1 - t) ** 3 +
      B.y * 3 * (1 - t) ** 2 * t +
      C.y * 3 * (1 - t) * t ** 2 +
      t ** 3 * D.y
    subsamples.push({ x, y })
  }
  return subsamples
}

export async function clearAllCurves(sandbox) {
  sandbox.curves = [
    {
      startPoint: { x: 0, y: 600, solid: true },
      endPoint: { x: 900, y: 0, solid: true },
      control1: { x: 300, y: 400, solid: false },
      control2: { x: 600, y: 200, solid: false },
    },
  ]
  await sandboxesAPI.updateSandbox(sandbox._id, sandbox)

  return sandbox
}
