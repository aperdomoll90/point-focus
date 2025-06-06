import React from 'react'
import { getBounds, getDefaults, getOffsets, getPageCoords, getRatios, isTouchEvent, ZoomFallbackBoundary } from './utils/globalUtils'
import { applyMouseMove, initializeFollowZoomPosition, applyDragMove } from './utils/movementUtils'
import { IImageMagnifierTypes, IImageTypes, IInteractionTYpe, IZoomImageTypes } from './ImageMagnifier.types'
import styles from './styles.module.scss'

import BaseImage from './components/BaseImage'
import ZoomImage from './components/ZoomImage'
import { startInertia } from './utils/animations'
import { FallbackImage } from './assets/svgCollection'

const ImageMagnifier = ({
  src,
  sources,
  width,
  height,
  zoomSrc,
  zoomScale = 1,
  zoomPreload,
  fadeDuration = 150,
  moveType = 'follow',
  zoomType = 'click',
  baseImageStyle,
  hideCloseButton,
  containerClassName,
  baseImageClassName,
  zoomImageClassName,
  closeButtonClassName,
  onMouseEnter,
  onZoomedMouseMove,
  onMouseLeave,
  onClickImage,
  onZoom,
  onClose,
  afterZoomImgLoaded,
  afterZoomOut,
  onBaseImageError,
  onZoomImageError,
  onDragStart,
  onDragEnd,
  alt,
  containerAriaLabel,
  closeButtonAriaLabel,
  zoomImageAriaLabel,
  tabIndex = 0,
  closeButtonContent,
  overlay,
  disableDrag,
  disableInertia,
  loadingPlaceholder,
  errorPlaceholder,
  clickToZoomOut = false,
  externalZoomState,
  setExternalZoomState,
  disableMobile,
  disableLoadingFallbacks,
  disableErrorFallbacks,
}: IImageMagnifierTypes) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null)
  const zoomedImgRef = React.useRef<HTMLImageElement | null>(null)
  const zoomContextRef = React.useRef<IImageTypes>(getDefaults())

  const isControlled = externalZoomState !== undefined
  const [internalZoom, setInternalZoom] = React.useState(false)
  const isZoomed = isControlled ? externalZoomState : internalZoom

  const [isActive, setIsActive] = React.useState<boolean | undefined>(zoomPreload)
  const [isDragging, setIsDragging] = React.useState<boolean>(false)
  const [isFading, setIsFading] = React.useState<boolean>(false)
  const [left, setLeft] = React.useState<number>(0)
  const [top, setTop] = React.useState<number>(0)

  const safeZoomScale = Math.max(1, Math.min(zoomScale, 5))

  const updateZoomState = (val: boolean) => {
    if (isControlled) {
      setExternalZoomState?.(val)
    } else {
      setInternalZoom(val)
    }
  }

  const zoomIn = (pageX: number, pageY: number, method: IInteractionTYpe) => {
    updateZoomState(true)
    initializeFollowZoomPosition(pageX, pageY, containerRef.current, zoomContextRef, setLeft, setTop)
    onZoom?.({ at: { x: pageX, y: pageY }, method: method })

    setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 0)
  }

  const zoomOut = () => {
    if (!zoomPreload) {
      setIsFading(true)
    }

    zoomContextRef.current.onLoadCallback = null
    zoomContextRef.current.wasDragging = false
    zoomContextRef.current.dragStartCoords = { x: 0, y: 0 }
    zoomContextRef.current.velocity = null
    zoomContextRef.current.prevDragCoords = null
    zoomContextRef.current.lastDragCoords = null

    setLeft(0)
    setTop(0)
    updateZoomState(false)
  }

  const handleDragStart = React.useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isZoomed || disableDrag || (disableMobile && isTouchEvent(e))) return

      if (zoomContextRef.current.rafId != null) {
        cancelAnimationFrame(zoomContextRef.current.rafId)
        zoomContextRef.current.rafId = null
      }

      const { x, y } = getPageCoords(e)
      setIsDragging(true)
      zoomContextRef.current.dragStartCoords = getOffsets(x, y, left, top)
      onDragStart?.({
        start: { x, y },
        source: isTouchEvent(e) ? 'touch' : 'mouse',
      })
    },
    [isZoomed, disableDrag, disableMobile, left, top, onDragStart]
  )

  const handleDragMove = React.useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return
      const { x, y } = getPageCoords(e)
      applyDragMove(x, y, zoomContextRef, setLeft, setTop)
      if ('touches' in e) e.preventDefault?.()
    },
    [isDragging, setLeft, setTop]
  )

  const handleDragEnd = React.useCallback(() => {
    setIsDragging(false)
    zoomContextRef.current.dragStartCoords = { x: 0, y: 0 }

    // Animation on end
    // Calculate velocity
    const last = zoomContextRef.current.lastDragCoords
    const prev = zoomContextRef.current.prevDragCoords

    let vx = 0,
      vy = 0
    if (last && prev) {
      const dt = (last.time - prev.time) / 1000
      if (dt > 0) {
        vx = (last.x - prev.x) / dt
        vy = (last.y - prev.y) / dt
      }
    }
    zoomContextRef.current.velocity = { vx, vy }

    // Calculate bounds
    const { width, height } = zoomContextRef.current.bounds
    const maxLeft = 0
    const minLeft = width * -zoomContextRef.current.ratios.x
    const maxTop = 0
    const minTop = height * -zoomContextRef.current.ratios.y

    if (!disableInertia) {
      startInertia({
        initialLeft: left,
        initialTop: top,
        velocity: { vx, vy },
        setLeft,
        setTop,
        bounds: { minLeft, maxLeft, minTop, maxTop },
        friction: 0.95,
        minVelocity: 10,
        onEnd: () => {
          // Optionally, snap to bounds or do something else
        },
        contextRef: zoomContextRef,
      })
    }
    onDragEnd?.({
      velocity: { vx, vy },
      final: { x: left, y: top },
    })
  }, [disableInertia, left, top, setLeft, setTop, onDragEnd])

  const applyImageLoad = (el: HTMLImageElement) => {
    const naturalDimensions = {
      width: el.naturalWidth,
      height: el.naturalHeight,
    }

    const bounds = getBounds(containerRef.current)

    zoomedImgRef.current = el

    zoomContextRef.current.scaledDimensions = {
      width: naturalDimensions.width * safeZoomScale,
      height: naturalDimensions.height * safeZoomScale,
    }

    zoomContextRef.current.bounds = bounds
    zoomContextRef.current.ratios = getRatios(bounds, naturalDimensions, safeZoomScale)

    if (zoomContextRef.current.onLoadCallback) {
      zoomContextRef.current.onLoadCallback()
      zoomContextRef.current.onLoadCallback = null
    }
  }

  const handleLoad = React.useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      applyImageLoad(e.currentTarget)
      afterZoomImgLoaded?.()
    },
    [applyImageLoad, afterZoomImgLoaded]
  )

  const handleClose = React.useCallback(
    (method: IInteractionTYpe) => {
      onClose?.({ triggeredBy: method })
      zoomOut()
    },
    [onClose, zoomOut]
  )

  const handleClick = React.useCallback(
    (e: React.MouseEvent | React.TouchEvent, method: IInteractionTYpe) => {
      if (disableMobile && isTouchEvent(e)) return

      const { x, y } = getPageCoords(e)
      onClickImage?.({ x, y, source: isTouchEvent(e) ? 'touch' : 'mouse' })

      if (zoomContextRef.current.wasDragging) {
        zoomContextRef.current.wasDragging = false
        return
      }

      if (isZoomed) {
        if (clickToZoomOut) {
          handleClose(method)
        }
        return
      } // is important to keep it to avoid issues when dragging the image with the animation

      if (zoomedImgRef.current) {
        applyImageLoad(zoomedImgRef.current)
        zoomIn(x, y, method)
      } else {
        zoomContextRef.current.onLoadCallback = () => zoomIn(x, y, method)
      }
    },
    [disableMobile, isTouchEvent, getPageCoords, onClickImage, isZoomed, clickToZoomOut, handleClose, applyImageLoad, zoomIn]
  )

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !isZoomed) {
        e.preventDefault()
        const { x, y } = getPageCoords(e, containerRef.current)
        zoomIn(x, y, 'keyboard')
      }

      if (e.key === 'Escape' && isZoomed) {
        e.preventDefault()
        handleClose('keyboard')
      }
    },
    [isZoomed, getPageCoords, zoomIn, handleClose]
  )

  const handleZoomLayerKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape' && isZoomed) {
        e.preventDefault()
        handleClose('keyboard')
      }
    },
    [isZoomed, handleClose]
  )

  const throttledZoomedMouseMove = React.useCallback(
    (x: number, y: number, bounds: DOMRect) => {
      zoomContextRef.current.lastMoveEvent = { x, y, bounds }
      if (zoomContextRef.current.rafId == null) {
        zoomContextRef.current.rafId = window.requestAnimationFrame(() => {
          const evt = zoomContextRef.current.lastMoveEvent
          if (evt && onZoomedMouseMove) {
            onZoomedMouseMove(evt)
          }
          zoomContextRef.current.rafId = null
        })
      }
    },
    [onZoomedMouseMove]
  )

  const handleMouseEnter = React.useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      setIsActive(true)
      setIsFading(false)
      onMouseEnter?.({ source: isTouchEvent(e) ? 'touch' : 'mouse' })
      if (zoomType === 'hover' && !isZoomed && !(disableMobile && isTouchEvent(e))) {
        handleClick(e, 'hover')
      }
    },
    [setIsActive, setIsFading, onMouseEnter, zoomType, isZoomed, disableMobile, handleClick]
  )
  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (moveType === 'follow' && isZoomed) {
        const { x, y } = getPageCoords(e)
        const bounds = zoomContextRef.current.bounds as DOMRect
        if (!bounds || typeof bounds.left !== 'number') return
        throttledZoomedMouseMove(x, y, zoomContextRef.current.bounds as DOMRect)
        applyMouseMove(x, y, zoomContextRef, setLeft, setTop)
      }
    },
    [moveType, isZoomed, throttledZoomedMouseMove, setLeft, setTop]
  )

  const handleMouseLeave = React.useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      onMouseLeave?.({ source: isTouchEvent(e) ? 'touch' : 'mouse' })
      handleClose('hover')
    },
    [onMouseLeave, handleClose]
  )

  const handleFadeOut = React.useCallback(
    (e?: React.TransitionEvent<HTMLImageElement> | TransitionEvent, noTransition?: boolean) => {
      if (noTransition || (e && 'propertyName' in e && e.propertyName === 'opacity' && containerRef?.current?.contains(e.target as Node))) {
        if (!zoomPreload) {
          zoomedImgRef.current = null
          zoomContextRef.current = getDefaults()
          setIsActive(false)
        }
        setIsFading(false)
        afterZoomOut?.()
      }
    },
    [zoomPreload, setIsActive, setIsFading, afterZoomOut]
  )

  React.useEffect(() => {
    zoomContextRef.current = getDefaults()
    return () => {
      if (zoomContextRef.current.rafId != null) {
        cancelAnimationFrame(zoomContextRef.current.rafId)
        zoomContextRef.current.rafId = null
      }
    }
  }, [])

  React.useEffect(() => {
    if (isDragging && !disableDrag) {
      window.addEventListener('mousemove', handleDragMove)
      window.addEventListener('mouseup', handleDragEnd)
      window.addEventListener('touchmove', handleDragMove, { passive: false })
      window.addEventListener('touchend', handleDragEnd)
      return () => {
        window.removeEventListener('mousemove', handleDragMove)
        window.removeEventListener('mouseup', handleDragEnd)
        window.removeEventListener('touchmove', handleDragMove)
        window.removeEventListener('touchend', handleDragEnd)
      }
    }
  }, [isDragging])

  const zoomImageProps: IZoomImageTypes = {
    src: zoomSrc || src,
    fadeDuration: fadeDuration,
    top,
    left,
    isZoomed,
    onLoad: handleLoad,
    onError: onZoomImageError,
    onDragStart: moveType === 'drag' && !disableDrag ? handleDragStart : undefined,
    onDragEnd: moveType === 'drag' && !disableDrag ? handleDragEnd : undefined,
    onTouchStart: handleDragStart,
    onTouchEnd: handleDragEnd,
    onClose: !hideCloseButton ? handleClose : undefined,
    onFadeOut: isFading ? handleFadeOut : undefined,
    closeButtonRef: closeButtonRef,
    zoomImageClassName: zoomImageClassName,
    closeButtonClassName: closeButtonClassName,
    alt: alt,
    closeButtonAriaLabel: closeButtonAriaLabel,
    zoomImageAriaLabel: zoomImageAriaLabel,
    onKeyDown: handleZoomLayerKeyDown,
    closeButtonContent: closeButtonContent,
    loadingPlaceholder: loadingPlaceholder,
    errorPlaceholder: errorPlaceholder,
    zoomScale: safeZoomScale,
    disableLoadingFallbacks: disableLoadingFallbacks,
    disableErrorFallbacks: disableErrorFallbacks,
  }

  const containerClass = [styles['c-point-focus'], containerClassName].filter(Boolean).join(' ')

  return (
    <figure
      role='group'
      ref={containerRef}
      tabIndex={tabIndex}
      data-movetype={moveType}
      data-testid='pf-image-magnifier-container'
      aria-label={containerAriaLabel ?? 'Zoomable image'}
      className={containerClass}
      style={{ width: width, height: height }}
      onClick={e => handleClick(e, 'hover')}
      onTouchStart={e => {
        if (disableMobile) {
          e.preventDefault()
        }
      }}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseMove={isZoomed ? handleMouseMove : undefined}
      onMouseLeave={handleMouseLeave}>
      <BaseImage
        src={src}
        alt={alt}
        sources={sources}
        width={width}
        height={height}
        baseImageStyle={baseImageStyle}
        baseImageClassName={baseImageClassName}
        fadeDuration={fadeDuration}
        isZoomed={isZoomed}
        onError={onBaseImageError}
        loadingPlaceholder={loadingPlaceholder}
        errorPlaceholder={errorPlaceholder}
        disableLoadingFallbacks={disableLoadingFallbacks}
        disableErrorFallbacks={disableErrorFallbacks}
      />
      {isActive && (
        <>
          {overlay && (
            <div className={styles['c-point-focus__overlay']} data-testid='pf-overlay'>
              {overlay}
            </div>
          )}
          <ZoomFallbackBoundary fallback={errorPlaceholder ?? <FallbackImage />}>
            <ZoomImage key={isZoomed && clickToZoomOut ? 'zoomed' : 'unzoomed'} ref={zoomedImgRef} {...zoomImageProps} />
          </ZoomFallbackBoundary>
        </>
      )}
    </figure>
  )
}

export default ImageMagnifier
