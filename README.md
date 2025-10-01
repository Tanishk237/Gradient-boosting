# Gradient Boosting Presentation

An interactive React-based presentation about Gradient Boosting with a modern dark theme and shadcn/ui components.

## Features

- 🎨 **Dark Theme**: Beautiful dark gradient background with modern UI
- 🎯 **Interactive Navigation**: Keyboard and mouse navigation controls
- 📱 **Responsive Design**: Works on all screen sizes
- 🎪 **10 Slides**: Ready for content with placeholder slides
- ⚡ **Modern Tech Stack**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui

## Navigation Controls

- **Arrow Keys**: Navigate between slides
- **Spacebar**: Go to next slide
- **Home**: Go to first slide
- **End**: Go to last slide
- **Mouse**: Click navigation buttons and dots

## Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── slides/             # Individual slide components
│   │   ├── TitleSlide.tsx
│   │   └── PlaceholderSlide.tsx
│   └── Presentation.tsx    # Main presentation component
├── lib/
│   └── utils.ts           # Utility functions
└── App.tsx                # Main app component
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the provided local URL

## Customizing Slides

To add content to slides, edit the `App.tsx` file and replace the `PlaceholderSlide` components with your custom slide components.

Example:
```tsx
{
  id: 2,
  title: "Your Slide Title",
  content: <YourCustomSlideComponent />
}
```

## Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Lucide React** for icons
- **Radix UI** for accessible components

## License

MIT License# Gradient-boosting
