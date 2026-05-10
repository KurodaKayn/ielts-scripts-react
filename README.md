# IELTS Speaking Universal Scripts (React Rewrite)

A modern, interactive web application to help you prepare for the IELTS Speaking test using a "Universal Scripts" approach. Originally a monolithic HTML file, this project has been completely rewritten using **React**, **Vite**, **TypeScript**, and **shadcn/ui** for a much better user experience.

## ✨ Features

- **Focus Mode**: Only one script or question bank is shown at a time to prevent cognitive overload.
- **Smart Translation Hover**: Hover over highlighted high-level vocabulary (Band 7+ expressions) to instantly see their original English forms and Chinese translations.
- **Interactive Q&A (Part 3)**: Part 3 question banks use an accordion layout. You can read the question, think about your answer, and then click to reveal the suggested response.
- **Mobile Friendly**: Includes a responsive sidebar (hamburger menu on mobile) for easy navigation.
- **Dark Mode Ready**: The UI is built with shadcn/ui and Tailwind CSS, giving it a clean, modern aesthetic with consistent spacing and typography.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) via [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/) (using Radix UI primitives)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed. This project uses [pnpm](https://pnpm.io/) as its package manager.

### Installation

1. Clone or navigate to the repository:
   \`\`\`bash
   cd ielts-scripts-react
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   pnpm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   pnpm run dev
   \`\`\`

4. Open your browser and visit the local URL (usually \`http://localhost:5173\`).

### Building for Production

To create a production-ready build:
\`\`\`bash
pnpm run build
\`\`\`
The bundled files will be placed in the \`dist/\` directory.

## 📖 How to Use the Scripts

The core philosophy of this tool is to master **5 flexible stories** that can be adapted to cover up to 27 different Part 2 cue cards.

1. **Part 2**: Read the core story. Note the "Adaptation Tip" and the "Cue cards covered" sections at the bottom of each script.
2. **Band 7+ Vocab**: Pay special attention to the highlighted texts. Hover over them to reinforce your memory.
3. **Part 3**: Use the related Question Banks. They use a *Position → Reason → Example → Counterpoint* structure. Try answering the questions before expanding the accordion to see the suggested response.

---
*Good luck with your IELTS preparation!*