# 🚀 point-focus

**point-focus** is a modern, highly customizable, and SSR-friendly React image magnifier and zoom component. Effortlessly add interactive zoom, drag, and pan capabilities to your images-perfect for product galleries, portfolios, or any application that demands a closer look. Designed for performance, accessibility, and seamless integration into any React project.

## ✨ Features

- **SSR Friendly:** Works seamlessly with Next.js, Gatsby, and other SSR frameworks.
- **Customizable Zoom:** Choose between click or hover to activate zoom.
- **Smooth Drag & Inertia:** Natural, momentum-based dragging experience.
- **Responsive & Touch Ready:** Works beautifully on desktop and mobile devices. On touch devices, drag-to-pan is always enabled for the zoomed image, regardless of configuration.
- **Accessible:** Keyboard and ARIA support for inclusive user experiences.
- **Easy Styling:** Modern, modular CSS/SCSS for effortless customization.
- **Lightweight:** No external dependencies except React.

## 🛠️ Technologies Used

- **React** – Modern JavaScript UI library
- **TypeScript** – Type-safe development
- **SASS/SCSS** – Modular and maintainable styling

**Requirements:**

- React 17 or newer
- Node.js and npm/yarn

## ⚙️ Installation

Install with npm or yarn:

`npm install point-focus `

or

`yarn add point-focus`

## 🚀 Usage

Import and use the component in your React app:

```js
import ImageMagnifier from "point-focus";

function Example() {
   return (
      <ImageMagnifier
         src="/images/sample.jpg"
         zoomSrc="/images/sample-large.jpg"
         width={400}
         height={300}
         zoomScale={2}
         fadeDuration={300}
         moveType="drag"
         zoomType="click"
         afterZoomIn={() => console.log("Zoomed in!")}
         afterZoomOut={() => console.log("Zoomed out!")}
      />
   );
}
```

**Basic Props:**

| Prop           | Type     | Default  | Description                           |
| -------------- | -------- | -------- | ------------------------------------- |
| `src`          | string   | required | Main image source                     |
| `zoomSrc`      | string   | optional | High-res image for zoom               |
| `width`        | number   | optional | Container width                       |
| `height`       | number   | optional | Container height                      |
| `zoomScale`    | number   | 1        | Magnification scale                   |
| `fadeDuration` | number   | 150      | Fade-in/out duration (ms)             |
| `moveType`     | string   | 'follow' | 'follow', 'drag', or 'pinch' movement |
| `zoomType`     | string   | 'click'  | 'click' or 'hover' to activate zoom   |
| `afterZoomIn`  | function | optional | Callback after zoom in                |
| `afterZoomOut` | function | optional | Callback after zoom out               |

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

Please see the [issues page](https://github.com/aperdomoll90/point-focus/issues) for open issues and feature requests.

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

Your Name – Adrian Perdomo
Project Link: [https://github.com/aperdomoll90/point-focus](https://github.com/aperdomoll90/point-focus)

## 🗺️ Roadmap of Implemented and Planned Features

### ✅ Implemented Features

- [x] **SSR Support**  
       Fully compatible with server-side rendering frameworks like Next.js and Gatsby.

- [x] **Customizable Zoom Activation**  
       Zoom can be triggered by click or hover.

- [x] **Drag & Inertia**  
       Drag the zoomed image with smooth, momentum-based movement.

- [x] **Follow Mouse Movement**  
       Option for the zoomed area to follow the user's mouse pointer.

- [x] **Touch & Mobile Support**  
      Drag-to-pan is always enabled on touch devices for a natural mobile experience. Pinch-to-zoom is planned for a future update.

- [x] **Keyboard Accessibility**  
       Full keyboard navigation and ARIA support.

- [x] **Customizable Scale & Animation**  
       Easily adjust zoom scale and fade animation duration.

- [x] **Responsive & Flexible**  
       Adapts to various container sizes and image aspect ratios.

- [x] **High-Resolution Zoom Support**  
       Use a separate, high-resolution image for the zoomed view.

- [x] **Customizable Styles**  
       Modern default styles, easily overridden with your own CSS/SCSS.

- [x] **Callback Hooks**  
       `afterZoomIn` and `afterZoomOut` props for custom event handling.

- [x] **Hideable Close Button**  
       Option to show or hide the close button in zoom mode.

### 🚧 Planned / Missing Features

- [ ] **Pinch-to-zoom gesture for mobile**  
       Support for intuitive pinch-in and pinch-out gestures to zoom with two fingers on touch devices[2][3][4][5].

- [ ] **Wheel zoom support**  
       Allow users to zoom in and out using the mouse wheel.

- [ ] **Double-click/double-tap to zoom**  
       Enable zooming with a double-click (desktop) or double-tap (mobile).

- [ ] **Zoom on scroll**  
       Support zooming in/out with mouse scroll or trackpad gestures.

- [ ] **Zoom lens or magnifier glass effect**  
       Movable lens that magnifies a portion of the image instead of full-image zoom.

- [ ] **Animated zoom transitions and more easing options**  
       More customizable and smoother zoom-in/out animations.

- [ ] **Advanced accessibility features**  
       Enhanced screen reader support and more granular keyboard navigation.

- [ ] **Error handling and fallback UI**  
       Custom components or messages if the zoom image fails to load.

- [ ] **Customizable loading states**  
       Spinners or placeholders while high-res images load.

- [ ] **Programmatic control**  
       Methods or props to programmatically trigger zoom in/out from parent components.

## ❓ FAQ

### How do I apply zoom to a specific image or gallery?

You can apply zoom by simply using the `<ImageMagnifier />` component and passing the desired image source as the `src` prop. For advanced integration, you can target specific images or galleries by wrapping them in the component or by using CSS selectors if you extend the functionality[5].

### Can I use this with page builders or in custom layouts?

Yes, you can use `point-focus` in any React-based layout, including custom grids, galleries, or even with page builder frameworks. Just import and use the component where needed in your JSX[5].

### Is it possible to use a zoom lens or magnifier glass effect?

Currently, `point-focus` supports full-image zoom with drag and inertia. A movable lens or magnifier glass effect is planned for future releases (see Roadmap)[1].

### Does it support touch and mobile devices?

Yes, touch and mobile support is implemented, including drag and tap-to-zoom features. Pinch-to-zoom is planned for a future update.

### How do I customize the zoom behavior?

You can control activation (click or hover), zoom scale, animation duration, and more via component props. See the Usage section for examples.

### What happens if the zoom image fails to load?

At the moment, there is no custom error handling or fallback UI. This feature is planned for a future release.

### Can I use this in a modal or overlay?

Yes, the component can be rendered inside a modal or overlay. Dedicated modal integration and lightbox support are planned for future versions.

### Is programmatic control available?

Not yet. Programmatic zoom in/out methods are on the roadmap.

---

For more questions, feature requests, or troubleshooting, please open an issue on the [GitHub repository](https://github.com/aperdomoll90/point-focus/issues).
