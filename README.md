# React Compiler Performance Demo

This project is a demonstration of the React Compiler, a tool that automatically optimizes React applications for better performance. The demo showcases how the compiler can identify and fix performance issues in a simple Vite React app.

The project uses [React Scan](https://react-scan.com/) to identify performance issues, and [React Compiler](https://react.dev/learn/react-compiler) to fix them.

It's based on the demo [compiler-perf-demo](https://github.com/t3dotgg/compiler-perf-demo) by [@t3dotgg](https://github.com/t3dotgg).

## Getting Started

To get started with the demo, follow these steps:

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Steps

1. Open your browser and navigate to `http://localhost:5173`.
2. Open the React DevTools Profiler and start recording.
3. Change the color in the color picker and observe the performance drop.
4. Comment in the the React Scan script in `index.html`, enable it, and observe the unnecessary re-renders.
5. Open Copilot Edits and paste the prompt from React Scan to fix the issue manually.
6. Observe the performance improvement.
7. Remove the manual fix and enable the React Compiler to in `vite.config.ts`.
8. Observe the performance improvement again.
