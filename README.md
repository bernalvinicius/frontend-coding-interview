# Clever's Assessment

  

👋 Hello!, Hola!, Witam!

## Why?

This project is part of the selection process for [Clever](https://movewithclever.com/). It involves developing a frontend application to render photos from the Pexels API using ReactJS and TypeScript. The application has the following features:

- Sign In Page
- All Photos Page (Protected Route)
- Responsive Design
- Authentication System  

![Application Screenshots](https://i.imgur.com/0auQK8j.png)

*The application features a clean sign-in page with form validation and a responsive photo gallery displaying nature photos from the Pexels API with like/unlike functionality.*

## My Implementation

  

I chose to build this photo gallery app using **React + TypeScript + Vite** because it provides a modern, fast development experience with excellent type safety. Here's what I implemented and why:

  


  

### 🛠️ **Tech Stack Decisions**

  

**Vite over CRA/Next.js**: I went with Vite for its lightning-fast hot reload and build times. Since this is a simple app without SSR needs, Vite was the perfect choice.

  

**TypeScript**: Essential for catching errors early and providing better developer experience. I used strict typing throughout the app.

  

**Tailwind CSS**: For rapid, responsive development. I created a custom color palette in `tailwind.config.js` to match the design system.

  

### 📱 **Pages & Features**

  

#### **Sign In Page**

  

-  **Simple but functional authentication** using localStorage (as requested for this demo)

  

-  **Form validation** with proper error messages and accessibility

  

-  **Responsive design** that works perfectly on mobile and desktop

  

-  **Clean UX** with proper loading states and feedback

  

#### **All Photos Page**

  

-  **Protected route** - redirects to sign in if not authenticated

  

-  **Pexels API integration** with proper error handling

  

-  **10 photos display** as specified in requirements

  

-  **Like/unlike functionality** for user interaction

  

-  **Responsive grid layout** that adapts to screen size

  

-  **Loading states** and error handling for better UX

  

  

### 🎨 **Design Implementation**

  

I paid close attention to the **Figma mocks** provided, ensuring pixel-perfect implementation:

  

-  **Custom icons** using SVG components for crisp rendering

  

-  **Typography** and spacing matching the design system

  

-  **Color scheme** implemented with Tailwind classes

  

-  **Mobile-first responsive design**

  

  

### 🔧 **Code Architecture**

  

I structured the code for **maintainability and scalability**:

  

```
src/
├── components/ui/ # Reusable UI components
├── pages/ # Page components
├── context/ # React Context for auth
├── services/api/ # API service layer
├── hooks/ # Custom hooks
├── types/ # TypeScript definitions
└── test/ # Test setup and utilities
```

  

**Key architectural decisions:**

  

-  **Component composition** for reusability

  

-  **Custom hooks** for business logic separation

  

-  **Type-safe API calls** with proper error handling

  

-  **Context API** for simple state management (appropriate for this scale)

  

### 🧪 **Testing Strategy**

  

I implemented a **comprehensive test suite** with **83%+ coverage**:

  

-  **Unit tests** for all components and hooks

  

-  **Integration tests** for page flows

  

-  **API mocking** for reliable tests

  

-  **Accessibility testing** with proper ARIA attributes

  

**Why testing matters**: Even for a demo, I wanted to show that I understand the importance of code quality and reliability.

  

### 🚀 **Performance Considerations**

  

-  **Lazy loading** for images

  

-  **Optimized bundle** with Vite

  

-  **Efficient re-renders** with React best practices

  

-  **Responsive images** for different screen sizes

  
  

## Project Structure

  

I organized the codebase with **clear separation of concerns**:

  

```
src/
├── components/ # Reusable components
│ ├── ui/ # Basic UI components (Button, Input, Icon)
│ ├── layout/ # Layout components (Header, Footer, etc.)
│ └── common/ # App-specific common components (ProtectedRoute)
├── pages/ # Application pages/routes
│ ├── SignIn/ # Sign in page
│ └── Photos/ # Photos page
├── hooks/ # Custom hooks (useAuth)
├── services/ # Services/APIs
│ └── api/ # API configuration and calls (Pexels)
├── types/ # TypeScript type definitions
├── utils/ # Utility functions
├── constants/ # Application constants (API keys, etc.)
├── assets/ # Static resources (images, icons, etc.)
│ ├── images/
│ └── icons/
├── styles/ # Global styles and configurations
└── context/ # Context API (for authentication)
```

  

**Why this structure?** It's scalable, maintainable, and follows React best practices. Each folder has a clear responsibility.

  

## Getting Started

  

1.  **Install dependencies:**

  

```bash
npm  install
```

  

2.  **Start the development server:**

  

```bash
npm  run  dev
```

  

3.  **Open [http://localhost:5173](http://localhost:5173)** to view it in the browser.

  
  

### 🔑 **How to Login**

  

Since this is a demo application, the authentication is simplified:

  

-  **Email**: Enter any valid email format (e.g., `user@example.com`)

  

-  **Password**: Enter any text (e.g., `password123`)

  

- The login will be successful and redirect you to the photos page

  

## Key Implementation Details

  
  

### 🔐 **Authentication Flow**

  

I implemented a **simple but secure authentication system**:

  

-  **localStorage-based** (as requested for this demo)

  

-  **Protected routes** using React Router

  

-  **Automatic redirects** for unauthenticated users

  

-  **Clean logout functionality**

  

  

### 📸 **Pexels API Integration**

  

I built a **robust API service layer**:

  

-  **Type-safe API calls** with proper error handling

  

-  **Authorization header** with the provided API key

  

-  **Error boundaries** for network failures

  

-  **Loading states** for better UX

  

**API Configuration:**

  

-  **Endpoint**: `https://api.pexels.com/v1/search?query=nature&per_page=10`

  

-  **Authentication**: Authorization header with provided API key

  

-  **Response**: Displays 10 nature photos with photographer details

  

  

### 🎨 **Design System**

  

I created a **consistent design system**:

  

-  **Custom color palette** in Tailwind config

  

-  **Reusable UI components** (Button, Input, Icon)

  

-  **Responsive breakpoints** for mobile-first design

  

-  **Accessibility features** (ARIA labels, keyboard navigation)

  

  

## Testing

  

I implemented a **comprehensive testing strategy** because quality matters:

```bash
# Run all tests
npm  test
# Run tests with coverage
npm  run  test:coverage
# Run tests with UI
npm  run  test:ui
```

  

**My testing approach:**

  

-  **83%+ code coverage** across the entire application

  

-  **Unit tests** for all components and business logic

  

-  **Integration tests** for user flows

  

-  **API mocking** for reliable, fast tests

  

-  **Accessibility testing** with proper ARIA attributes

  

  

**Why I chose Vitest + React Testing Library:**

  

-  **Fast execution** with Vite integration

  

-  **User-centric testing** (testing behavior, not implementation)

  

-  **Excellent developer experience** with watch mode and coverage reports

  

## My Development Process

  

### 🎯 **How I Approached This Challenge**

  

1.  **Started with requirements analysis** - I carefully read the Figma mocks and API documentation

  

2.  **Chose the right tools** - Vite for speed, TypeScript for safety, Tailwind for rapid development

  

3.  **Built incrementally** - Started with basic pages, then added authentication, then API integration

  

4.  **Tested continuously** - Wrote tests as I built features, not after

  

5.  **Refined and polished** - Added error handling, loading states, and accessibility features

  

### 🚀 **What I'm Proud Of**

  

-  **Clean, readable code** that's easy to understand and maintain

  

-  **Comprehensive testing** that gives confidence in the codebase

  

-  **Attention to detail** in matching the Figma designs

  

-  **Performance optimization** with proper image loading and bundle optimization

  

-  **Accessibility features** that make the app usable for everyone

  

### 💡 **Key Learnings**

  

  

This challenge reinforced my belief in:

  

-  **TypeScript's value** for catching errors early

  

-  **Testing's importance** for code quality

  

-  **Component composition** for reusability

  

-  **User experience** as a priority, not an afterthought

  
  

Thanks for this opportunity to showcase my skills! 🚀