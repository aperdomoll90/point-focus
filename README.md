# 🚀 point-focus

**point-focus** is a modern, highly customizable, and SSR-friendly React image magnifier and zoom component. Add intuitive zoom, drag, and pan capabilities to your images—ideal for product galleries, portfolios, or any app that demands detailed inspection. Designed with performance, accessibility, and developer experience in mind.

## ✨ Features

- **SSR Friendly** – Seamlessly compatible with Next.js, Gatsby, and other server-rendering frameworks.
- **Click, Hover, or Programmatic Zoom Activation** – Fully customizable interaction types.
- **Smooth Drag & Inertia** – Physics-based panning with momentum.
- **Responsive & Touch Ready** – Optimized for both desktop and mobile experiences.
- **Accessible** – Full ARIA support and keyboard navigation.
- **Custom Loading & Error UI** – Placeholders for both base and zoomed images.
- **External Zoom State Control** – Fully controlled or uncontrolled behavior.
- **Easy Styling:** Modern, modular CSS/SCSS for effortless customization.
- **Lightweight** – No external dependencies except React.

## 🛠️ Technologies

- **React** – Declarative UI
- **TypeScript** – Safer development
- **SCSS Modules** – Scoped styling

**Requirements:**

- React 17+
- Node.js with npm or yarn

## ⚙️ Installation

```bash
npm install point-focus
# or
yarn add point-focus
```

## 🚀 Usage

```tsx
import ImageMagnifier from 'point-focus'

function Example() {
  return <ImageMagnifier src='/images/sample.jpg' zoomSrc='/images/sample-large.jpg' moveType='drag' zoomType='click' alt='Image alt' zoomScale={2} />
}
```

## 🔧 Props Overview

| Prop                      | Type                     | Default      | Description                            |
| ----------------------    | ------------------------ | ------------ | -------------------------------------- |
| `src`                     | `string`                 | — (required) | Main image source                      |
| `zoomSrc`                 | `string`                 | `src`        | High-res zoom source                   |
| `sources`                 | `array`                  | —            | `<source>` tags for `<picture>`        |
| `width` / `height`        | `number`                 | —            | Container dimensions                   |
| `zoomScale`               | `number`                 | `1`          | Magnification ratio                    |
| `zoomPreload`             | `boolean`                | `false`      | Preload zoom image on mount            |
| `fadeDuration`            | `number`                 | `150`        | Animation duration in ms               |
| `moveType`                | `follow`, `drag`, `pinch`| `follow`     | Pan behavior during zoom               |
| `zoomType`                | `click`, `hover`         | `click`      | How zoom is activated                  |
| `clickToZoomOut`          | `boolean`                | `false`      | Allow clicking image to zoom out       |
| `hideCloseButton`         | `boolean`                | `false`      | Hide zoom-close button                 |
| `alt`                     | `string`                 | `''`         | Alt text for both images               |
| `tabIndex`                | `number`                 | `0`          | Keyboard navigation index              |
| `containerClassName`      | `string`                 | —            | Extra class for the wrapper            |
| `baseImageClassName`      | `string`                 | —            | Extra class for the base image         |
| `zoomImageClassName`      | `string`                 | —            | Extra class for zoom image             |
| `closeButtonClassName`    | `string`                 | —            | Custom class for close button          |
| `containerAriaLabel`      | `string`                 | —            | Accessibility label for container      |
| `zoomImageAriaLabel`      | `string`                 | —            | ARIA label for zoom image              |
| `closeButtonAriaLabel`    | `string`                 | —            | ARIA label for close button            |
| `closeButtonContent`      | `ReactNode`              | `X` icon     | Replace the default close icon         |
| `overlay`                 | `ReactNode`              | —            | Optional overlay inside zoom container |
| `loadingPlaceholder`      | `ReactNode`              | —            | Shown while zoom image loads           |
| `disableLoadingFallbacks` | `boolean`                | `false`      | Prevents/Disables loading fallbacks    |
| `errorPlaceholder`        | `ReactNode`              | —            | Shown if zoom image fails              |
| `disableErrorFallbacks`   | `boolean`                | `false`      | Prevents/Disables error fallbacks      |
| `externalZoomState`       | `boolean`                | —            | For controlled zoom state              |
| `setExternalZoomState`    | `(val: boolean) => void` | —            | Setter for external zoom state         |
| `onMouseEnter`            | `() => void`             | —            | Called on hover enter                  |
| `onMouseLeave`            | `() => void`             | —            | Called on hover leave                  |
| `onClickImage`            | `() => void`             | —            | Called when image is clicked           |
| `onZoom`                  | `() => void`             | —            | Called when zoom starts                |
| `onClose`                 | `() => void`             | —            | Called when zoom closes                |
| `afterZoomImgLoaded`      | `() => void`             | —            | Called when zoom image loads           |
| `afterZoomOut`            | `() => void`             | —            | Called after zoom exits                |
| `onBaseImageError`        | `() => void`             | —            | Called if base image fails to load     |
| `onZoomImageError`        | `() => void`             | —            | Called if zoom image fails to load     |
| `onDragStart`             | `() => void`             | —            | Called on drag start                   |
| `onDragEnd`               | `() => void`             | —            | Called on drag end                     |

## 🧭 Roadmap

### ✅ Already Implemented

- SSR support (Next.js, Gatsby)
- Click or hover zoom trigger
- Follow mouse or drag pan
- Inertia and momentum
- Touch & mobile compatibility
- Custom placeholders (loading/error)
- Close button toggle
- External zoom state (controlled usage)
- ARIA and keyboard support
- Custom class names for styling
- `picture` element support for responsive images
- Custom overlays, labels, and alt text
- Programmatic zoom positioning setup via `onLoadCallback`

### 🚧 Planned Features

- [ ] **Pinch-to-zoom** for touch devices
- [ ] **Zoom lens / magnifier glass** effect
- [ ] **Zoom on scroll / mouse wheel**
- [ ] **Double-click or double-tap to zoom**
- [ ] **Animated transitions with easing customization**
- [ ] **Programmatic zoom in/out methods**
- [ ] **Granular keyboard navigation**
- [ ] **Fallback UI for broken zoom images**
- [ ] **Built-in modal/lightbox integration**

## 🤝 Contributing

PRs and issues welcome!

1. Fork it
2. Create a branch (`git checkout -b feature/myFeature`)
3. Commit your changes
4. Push to your branch
5. Open a pull request

## 📄 License

MIT License.

## 📞 Contact

**Adrian Perdomo**  
GitHub: [aperdomoll90/point-focus](https://github.com/aperdomoll90/point-focus)
