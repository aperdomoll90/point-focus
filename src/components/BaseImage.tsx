import React from 'react'
import { IBaseImageTypes } from '../ImageMagnifier.types'
import styles from '../styles.module.scss'
import { FallbackImage } from '../assets/svgCollection'

const BaseImage = ({
  src,
  sources,
  baseImageStyle = {},
  isZoomed,
  fadeDuration,
  baseImageClassName,
  alt,
  loadingPlaceholder,
  errorPlaceholder,
  onError,
}: IBaseImageTypes) => {
  const imgRef = React.useRef<HTMLImageElement | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    setIsLoading(true)
    setHasError(false)
  }, [src])

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    onError?.()
  }

  React.useEffect(() => {
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth > 0) {
      handleLoad()
    }
  }, [src])

  const imageStyle = React.useMemo(
    () => ({
      '--fade-duration': `${isZoomed ? fadeDuration : 0}ms`,
      ...baseImageStyle,
    }),
    [isZoomed, fadeDuration, baseImageStyle]
  )

  const imageClass = [styles['c-point-focus__img'], baseImageClassName].filter(Boolean).join(' ')

  const defaultImg =
    !hasError && src ? (
      <img
        ref={imgRef}
        alt={alt}
        src={src}
        style={imageStyle}
        onLoad={handleLoad}
        onError={handleError}
        className={imageClass}
        data-hidden={isZoomed}
        data-testid='pf-base-image'
        crossOrigin='anonymous'
      />
    ) : null

  const wrappedImage =
    sources && sources.length > 0 ? (
      <picture style={{ width: '100%', height: '100%' }}>
        {sources
          .filter(s => s.srcSet)
          .map((source, i) => (
            <source key={i} {...source} />
          ))}
        {defaultImg}
      </picture>
    ) : (
      defaultImg
    )

  return (
    <>
      {wrappedImage}

      {isLoading && !hasError && (
        <div className={styles['c-point-focus__placeholder']} style={{ zIndex: 0 }} data-testid='pf-base-loading'>
          {loadingPlaceholder ?? <FallbackImage />}
        </div>
      )}

      {hasError && (
        <div className={styles['c-point-focus__placeholder']} style={{ zIndex: 0 }} data-testid='pf-base-error'>
          {errorPlaceholder ?? <FallbackImage />}
        </div>
      )}
    </>
  )
}

export default BaseImage
