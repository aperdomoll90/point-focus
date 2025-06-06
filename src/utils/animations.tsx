import { InertiaOptions } from '../ImageMagnifier.types'
import { clampToBounds } from './globalUtils'

export function startInertia({
  initialLeft,
  initialTop,
  velocity,
  setLeft,
  setTop,
  bounds,
  friction = 0.95,
  minVelocity = 10,
  onEnd,
  contextRef,
}: InertiaOptions & { contextRef: React.MutableRefObject<any> }) {
  let left = initialLeft
  let top = initialTop
  let vx = velocity.vx
  let vy = velocity.vy

  function step() {
    vx *= friction
    vy *= friction

    left += vx * (1 / 60)
    top += vy * (1 / 60)

    const clamped = clampToBounds(left, top, bounds)
    setLeft(clamped.left)
    setTop(clamped.top)

    if (Math.abs(vx) > minVelocity || Math.abs(vy) > minVelocity) {
      contextRef.current.rafId = requestAnimationFrame(step) // 👈 Store rafId
    } else {
      contextRef.current.rafId = null
      setLeft(clamped.left)
      setTop(clamped.top)
      onEnd?.()
    }
  }

  contextRef.current.rafId = requestAnimationFrame(step)
}
