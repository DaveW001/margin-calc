# Running the Mission Insights Dashboard Locally

This document provides instructions on how to set up and run the development server for the Mission Insights Dashboard project using PowerShell.

## Prerequisites

*   [Node.js](https://nodejs.org/) (which includes npm/npx)
*   [pnpm](https://pnpm.io/installation) (Package manager used for this project)
*   PowerShell (or a compatible terminal)
*   [Git](https://git-scm.com/)

## Setup

1.  **Clone the repository** (if you haven't already):
    Open PowerShell and run:
    ```powershell
    git clone <your-repository-url> # Replace <your-repository-url> with the actual URL
    cd mission-insights-dashboard
    ```

2.  **Install dependencies:**
    In the same PowerShell window, navigate to the project root directory (`mission-insights-dashboard`) and run:
    ```powershell
    pnpm install
    ```
    This command reads the `pnpm-lock.yaml` file and installs the exact versions of all required packages into the `node_modules` folder.

## Running the Development Server

1.  **Start the server:**
    Once the dependencies are installed, run the following command from the project root directory in PowerShell:
    ```powershell
    pnpm run dev
    ```
    This will start the Next.js development server.

2.  **View the website:**
    The PowerShell output will indicate the local address where the server is running. Typically, this is:
    ```
    http://localhost:3000
    ```
    Open this URL in your web browser to view the dashboard.

    The development server supports **hot reloading**, meaning changes you make to the code (e.g., in `.tsx` or `.css` files) will automatically update in the browser without needing a manual refresh.

## Stopping the Server

To stop the development server, go back to the PowerShell terminal where it's running and press `Ctrl + C`. You may be prompted to confirm; type `Y` and press Enter if necessary. 