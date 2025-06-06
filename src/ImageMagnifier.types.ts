export type ImageSource = React.SourceHTMLAttributes<HTMLSourceElement>

export type IInteractionTYpe = 'click' | 'hover' | 'keyboard' | 'external'

export interface IImageMagnifierTypes {
  // Core
  src: string
  sources?: ImageSource[]
  width?: number | undefined
  height?: number | undefined
  zoomSrc?: string | undefined
  zoomScale?: number | undefined
  zoomPreload?: boolean | undefined
  fadeDuration?: number | undefined
  moveType?: 'follow' | 'drag' | 'pinch'
  zoomType?: 'click' | 'hover'

  // State control
  externalZoomState?: boolean | undefined
  setExternalZoomState?: (value: boolean) => void | undefined
  clickToZoomOut?: boolean | undefined

  // Styling
  containerClassName?: string | undefined
  baseImageClassName?: string | undefined
  zoomImageClassName?: string | undefined
  closeButtonClassName?: string | undefined

  // Accessibility
  alt: string
  containerAriaLabel?: string
  closeButtonAriaLabel?: string
  zoomImageAriaLabel?: string
  tabIndex?: number

  // Customization
  hideCloseButton?: boolean | undefined
  closeButtonContent?: React.ReactNode | undefined
  overlay?: React.ReactNode | undefined
  baseImageStyle?: React.CSSProperties | undefined

  // Callbacks
  onMouseEnter?: (info: { source: 'mouse' | 'touch' }) => void
  onMouseLeave?: (info: { source: 'mouse' | 'touch' }) => void
  onClickImage?: (info: { x: number; y: number; source: 'mouse' | 'touch' }) => void
  onZoom?: (info: { at: { x: number; y: number }; method: IInteractionTYpe }) => void
  onClose?: (info: { triggeredBy: IInteractionTYpe }) => void
  afterZoomImgLoaded?: () => void
  afterZoomOut?: () => void
  onBaseImageError?: () => void
  onZoomImageError?: () => void
  onDragStart?: (info: { start: { x: number; y: number }; source: 'mouse' | 'touch' }) => void
  onDragEnd?: (info: { velocity: { vx: number; vy: number }; final: { x: number; y: number } }) => void
  onZoomedMouseMove?: (info: { x: number; y: number; bounds: DOMRect }) => void

  // Advanced
  disableMobile?: boolean
  disableDrag?: boolean
  disableInertia?: boolean
  loadingPlaceholder?: React.ReactNode
  disableLoadingFallbacks?: boolean
  errorPlaceholder?: React.ReactNode
  disableErrorFallbacks?: boolean
}

type ICoordinateObject = { x: number; y: number }

export type IImageTypes = {
  onLoadCallback: (() => void) | null
  bounds: DOMRect | Record<string, number>
  offsets: ICoordinateObject
  ratios: ICoordinateObject
  scaledDimensions: { width: number; height: number }
  wasDragging: boolean
  velocity: { vx: number; vy: number } | null
  dragStartCoords: ICoordinateObject
  prevDragCoords: { x: number; y: number; time: number } | null
  lastDragCoords: { x: number; y: number; time: number } | null
  rafId?: number | null
  lastMoveEvent?: { x: number; y: number; bounds: DOMRect } | null
}

export type IZoomImageTypes = {
  src: string
  fadeDuration: number
  top: number
  left: number
  isZoomed: boolean
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void
  onError?: () => void
  onClose?: (method: IInteractionTYpe) => void
  onFadeOut?: (e: React.TransitionEvent<HTMLImageElement>) => void
  closeButtonRef: React.RefObject<HTMLButtonElement>
  onDragStart?: (e: React.MouseEvent | React.TouchEvent) => void | undefined
  onDragEnd?: (e: React.MouseEvent | React.TouchEvent) => void | undefined
  onTouchStart: (e: React.MouseEvent | React.TouchEvent) => void
  onTouchEnd: (e: React.MouseEvent | React.TouchEvent) => void
  zoomImageClassName?: string | undefined
  closeButtonClassName?: string | undefined
  alt: string
  closeButtonAriaLabel?: string
  zoomImageAriaLabel?: string
  onKeyDown: (e: React.KeyboardEvent) => void
  closeButtonContent?: React.ReactNode | undefined
  loadingPlaceholder?: React.ReactNode
  disableLoadingFallbacks?: boolean
  errorPlaceholder?: React.ReactNode
  disableErrorFallbacks?: boolean
  zoomScale: number
}

export type IBaseImageTypes = {
  src: string
  sources?: ImageSource[]
  width?: number
  height?: number
  baseImageClassName?: string
  baseImageStyle?: React.CSSProperties
  isZoomed?: boolean
  fadeDuration?: number
  alt: string
  loadingPlaceholder?: React.ReactNode
  disableLoadingFallbacks?: boolean
  errorPlaceholder?: React.ReactNode
  disableErrorFallbacks?: boolean
  onError?: (() => void) | undefined
}

export type InertiaOptions = {
  initialLeft: number
  initialTop: number
  velocity: { vx: number; vy: number }
  setLeft: (left: number) => void
  setTop: (top: number) => void
  bounds: { minLeft: number; maxLeft: number; minTop: number; maxTop: number }
  friction?: number
  minVelocity?: number
  onEnd?: () => void
}

export type ZoomFallbackBoundaryProps = {
  fallback: React.ReactNode
  children: React.ReactNode
}

export type ZoomFallbackBoundaryState = {
  hasError: boolean
}
