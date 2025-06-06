import React from 'react'
import { IZoomImageTypes } from '../ImageMagnifier.types'
import styles from '../styles.module.scss'
import { CloseIcon, FallbackImage } from '../assets/svgCollection'

const ZoomImage = React.forwardRef<HTMLImageElement, IZoomImageTypes>(
  (
    {
      src,
      fadeDuration,
      top,
      left,
      isZoomed,
      onLoad,
      onDragStart,
      onDragEnd,
      onClose,
      onFadeOut,
      closeButtonRef,
      onTouchStart,
      onTouchEnd,
      zoomImageClassName,
      closeButtonClassName,
      alt,
      closeButtonAriaLabel,
      zoomImageAriaLabel,
      onKeyDown,
      closeButtonContent,
      onError,
      loadingPlaceholder,
      errorPlaceholder,
      zoomScale,
      disableLoadingFallbacks = false,
      disableErrorFallbacks = false,
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [hasError, setHasError] = React.useState(false)

    React.useEffect(() => {
      if (!isZoomed) {
        setIsLoading(true)
        setHasError(false)
      }
    }, [isZoomed])

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setIsLoading(false)
      onLoad?.(e)
    }

    const handleError = () => {
      setIsLoading(false)
      setHasError(true)
      onError?.()
    }

    const zoomImgClass = [styles['c-point-focus__zoom-img'], zoomImageClassName].filter(Boolean).join(' ')

    return (
      <>
        <img
          ref={ref}
          data-testid='pf-zoom-image'
          data-visible={isZoomed}
          className={zoomImgClass}
          style={{
            transform: `translate(${left}px, ${top}px)  scale(${zoomScale})`,
            transformOrigin: 'top left',
            transition: `opacity ${fadeDuration}ms linear, visibility ${fadeDuration}ms linear`,
          }}
          src={src}
          onLoad={handleLoad}
          onError={handleError}
          onMouseDown={onDragStart}
          onMouseUp={onDragEnd}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTransitionEnd={onFadeOut}
          draggable={false}
          alt={`${alt} zoomed`}
          aria-label={zoomImageAriaLabel}
          onKeyDown={onKeyDown}
          tabIndex={0}
        />

        {!disableErrorFallbacks && hasError && isZoomed && (
          <div className={styles['c-point-focus__placeholder']} data-testid='pf-zoom-error'>
            {errorPlaceholder ?? <FallbackImage />}
          </div>
        )}

        {!disableLoadingFallbacks && isLoading && !hasError && isZoomed && (
          <div className={styles['c-point-focus__placeholder']} data-testid='pf-zoom-loading'>
            {loadingPlaceholder ?? <span className={styles['c-point-focus__loader']} />}
          </div>
        )}

        {onClose && (
          <button
            type='button'
            ref={closeButtonRef}
            title='Close Zoom'
            data-testid='pf-close-button'
            aria-label={closeButtonAriaLabel ?? 'Zoom out'}
            data-visible={isZoomed}
            data-action-type='close'
            className={closeButtonClassName || styles['c-point-focus__button']}
            style={{
              transition: `opacity ${fadeDuration}ms linear, visibility ${fadeDuration}ms linear`,
            }}
            onClick={() => onClose?.('click')}
            onKeyDown={onKeyDown}>
            {closeButtonContent ?? <CloseIcon />}
          </button>
        )}
      </>
    )
  }
)

ZoomImage.displayName = 'ZoomImage'
export default ZoomImage
