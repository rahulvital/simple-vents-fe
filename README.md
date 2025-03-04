# eVents

Welcome to **eVents**, an event platform application that enables users to:

- Browse and register for events.
- Add events directly to their Google Calendars.

In the current version, authorized Google users can also: 
- create events and add them to the Supabase database.
- View their created events.

# Hosted website
- https://rahulvital.github.io/simple-vents-fe/

**Test Account for Event Creation:**

- **Email**: ventsprojectdev@gmail.com
- **Password**: Vents@123

Please do watch this youtube video to see the application in action!
https://youtu.be/hOxKwtkMwQc


# Tech Stack

The application utilizes the following technologies:

- **Package Manager**: pnpm (v9.12.3)
- **Build Tool**: Vite (v5.4.8)
- **Frontend Library**: React (v18.3.1)
- **Backend**: Supabase (v2.48.1)
- **Authentication**: Google OAuth
- **CSS Framework**: Tailwind CSS

# System Requirements

- **Node.js**: v18 or higher (recommended)
- **pnpm**: Install using `npm install -g pnpm`

# Setting Up the Project Locally

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/rahulvital/simple-vents-fe.git
   cd simple-vents-fe

2. **Install Dependencies:**
    ```bash
    pnpm install

    Ensure following packages are in your package.jsons:
    - @supabase/supabase-js
    - @tailwindcss/typography
    - framer-motion
    - lucide-react
    - react
    - react-dom
    - react-router-dom

    If there are any missing, use the following to install them:

    ```bash
    pnpm add package-name

3. **Configure Environment Variables:**
    Create a .env file in the root directory with the following:
    
    ```bash
    VITE_GOOGLE_CLIENT_ID=574613942514-164dugut9t2p8i8gllfl6nbtjpdqrteb.apps.googleusercontent.com
    VITE_GOOGLE_CLIENT_SECRET=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
    VITE_SUPABASE_URL=https://udnadjjbhxqyuqhtkpal.supabase.co
    VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkbmFkampiaHhxeXVxaHRrcGFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNTM5NzUsImV4cCI6MjA1MzgyOTk3NX0.TImDkhNqzCicMLrdKPYgl-zzKt4NZNVF84VHCwIaa-A
    VITE_SITE_URL=https://rahulvital.github.io/simple-vents-fe       

4. **Run the Application**
 **Development mode**
    ```bash
    pnpm dev

 **Production mode**
   ```bash
   pnpm build
   pnpm preview
