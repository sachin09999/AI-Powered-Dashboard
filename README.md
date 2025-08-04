# InsightFlow AI: Your Intelligent Data Dashboard

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**InsightFlow AI** is a cutting-edge, AI-powered analytics dashboard built with Next.js, Tailwind CSS, and Genkit. It provides a stunning, dynamic, and feature-rich interface for visualizing and interacting with your data. With a sleek "Cyberpunk Sunset" theme and real-time data simulation, this dashboard is designed to impress.

![InsightFlow AI Dashboard](https://github.com/user-attachments/assets/51349720-5ab2-4b2a-bd06-459fe6502cf5)

*A preview of the stunning, glassmorphic InsightFlow AI dashboard in action.*

## ✨ Key Features

- **Dynamic, Live-Updating Widgets:** All charts and key metrics update in real-time to simulate a live data feed.
- **Stunning Glassmorphic UI:** A beautiful "Cyberpunk Sunset" theme with translucent, blurred card backgrounds for a modern, futuristic look.
- **Interactive AI Assistant:** Chat with an AI data analyst to ask natural language questions about your dataset.
- **Automated AI Insights:** Generate comprehensive data summaries, chart recommendations, and anomaly detection reports with a single click.
- **Fully Functional Interface:** Every button, link, and menu is interactive, from sidebar navigation to card-level actions.
- **Customizable Dashboard:** Easily toggle the visibility of key metric widgets to tailor the dashboard to your needs.
- **Light & Dark Mode:** Instantly switch between themes for optimal viewing comfort.
- **Responsive Design:** A seamless experience across all devices, from mobile to desktop.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Generative AI:** [Genkit](https://firebase.google.com/docs/genkit)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Charts:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm installed on your machine.
* [Node.js](https://nodejs.org/) (v18 or newer recommended)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/insightflow-ai.git
    cd insightflow-ai
    ```
2.  **Install NPM packages:**
    ```bash
    npm install
    ```
3. **Set up environment variables:**
   Create a `.env.local` file in the root of the project and add your Genkit/Google AI API keys:
   ```
   GEMINI_API_KEY=YOUR_API_KEY
   ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 📂 Project Structure

The project is organized with a clear and scalable structure:

```
src
├── app/                  # Next.js App Router pages
├── ai/                   # Genkit flows and AI logic
│   ├── flows/            # Genkit flow definitions
│   └── genkit.ts         # Genkit initialization
├── components/           # Reusable React components
│   ├── ai/               # AI-specific components
│   ├── data/             # Data upload and insights components
│   ├── layout/           # Dashboard layout and sidebar
│   ├── ui/               # ShadCN UI components
│   └── theme-provider.tsx# Theme context
├── context/              # React context providers
├── hooks/                # Custom React hooks
└── lib/                  # Utility functions
```

## 🤖 AI Features

This dashboard leverages the power of **Genkit** to provide three core AI functionalities, located in `src/ai/flows/`:

1.  **`summarize-data-trends.ts`**: Analyzes a given dataset (in CSV format) to provide a natural language summary of key trends and answer user questions.
2.  **`recommend-chart-types.ts`**: Suggests the most effective chart types (e.g., bar, line, pie) to visualize the provided data, along with reasoning.
3.  **`detect-anomalies.ts`**: Scans the dataset for significant outliers or unusual patterns and flags them with a title, description, and severity level.
