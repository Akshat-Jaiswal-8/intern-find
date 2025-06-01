# Intern Find

This project is a web application built for an assignment, focusing on finding
internships. It utilizes a modern tech stack including React, TypeScript, and
Vite.

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS, Shadcn/UI
- **Routing:** React Router
- **State Management:** Tanstack Query
- **Linting:** ESLint
- **Package Manager:** Bun

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Bun](https://bun.sh/) (optional, but recommended for faster performance)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Akshat-Jaiswal-8/intern-find
   ```
2. Navigate to the project directory:
   ```bash
   cd intern-find
   ```
3. Install dependencies:
   ```bash
   bun install
   ```

### Running the Project

To start the development server, run:

```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) (or the port shown in your
terminal) in your browser to view the application.

## Available Scripts

In the project directory, you can run the following scripts:

- `bun run dev`: Runs the app in development mode.
- `bun run build`: Builds the app for production.
- `bun run lint`: Lints the codebase using ESLint.
- `bun run preview`: Serves the production build locally for preview.

## Folder Structure

```
intern-find/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # Shadcn/UI components
│   ├── features/            # Feature-specific modules (e.g., internships, home)
│   ├── lib/                 # Utility functions and API helpers
│   ├── pages/               # Page-level components
│   ├── services/            # API service integrations
│   ├── types/               # TypeScript type definitions
│   ├── App.tsx              # Main application component
│   ├── index.css            # Global styles
│   ├── main.tsx             # Entry point of the application
│   └── vite-env.d.ts        # Vite environment type definitions
├── eslint.config.js         # ESLint configuration
├── index.html               # Main HTML file
├── package.json             # Project metadata and dependencies
├── tsconfig.json            # TypeScript configuration
├── tsconfig.node.json       # TypeScript configuration for Node.js
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```
