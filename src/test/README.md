# Testing Guide

This project uses **Vitest** and **React Testing Library** for unit and integration testing.

## Test Structure

```
src/
├── __tests__/                  # App integration tests
│   └── App.test.tsx
├── components/
│   ├── common/
│   │   └── __tests__/          # Common component tests
│   │       └── ProtectedRoute.test.tsx (TODO)
│   └── ui/
│       └── __tests__/          # UI component tests
│           ├── Input.test.tsx
│           ├── Icon.test.tsx
│           └── Button.test.tsx (TODO)
├── hooks/
│   └── __tests__/              # Hook tests
│       └── useAuth.test.tsx
├── pages/
│   ├── Photos/
│   │   └── __tests__/          # Page integration tests
│   │       └── Photos.test.tsx
│   └── SignIn/
│       └── __tests__/          # Page integration tests
│           └── SignIn.test.tsx
├── services/
│   └── api/
│       └── __tests__/          # API service tests
│           └── pexels.test.ts
└── test/
    ├── setup.ts                # Test configuration
    ├── vitest.d.ts             # Type definitions
    └── README.md               # This file
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Categories

### 1. **Unit Tests** (`__tests__/`)
- **Components**: Test individual UI components (Input, Icon, Button)
- **Hooks**: Test custom React hooks (useAuth)
- **Services**: Test API calls and business logic (Pexels API)

### 2. **Integration Tests** (`pages/__tests__/`)
- **Pages**: Test complete page functionality (SignIn, Photos)
- **User Flows**: Test multi-step user interactions

### 3. **App Tests** (`src/__tests__/`)
- **App Component**: Test main application routing and structure

### 4. **Test Utilities**
- **setup.ts**: Global test configuration
- **vitest.d.ts**: TypeScript definitions for tests

## Testing Patterns

### Component Testing
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '../Input'

describe('Input Component', () => {
  it('renders with label', () => {
    render(<Input label="Username" value="" onChange={() => {}} />)
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
  })
})
```

### Hook Testing
```tsx
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '../useAuth'

describe('useAuth Hook', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useAuth())
    expect(result.current.isAuthenticated).toBe(false)
  })
})
```

### API Testing
```tsx
import { pexelsService } from '../pexels'

describe('Pexels API', () => {
  it('fetches photos successfully', async () => {
    // Mock fetch response
    const result = await pexelsService.searchPhotos()
    expect(result.photos).toBeDefined()
  })
})
```

## Best Practices

1. **Test Behavior, Not Implementation**
   - Focus on what users see and do
   - Avoid testing internal implementation details

2. **Use Descriptive Test Names**
   - Write tests that read like specifications
   - Use the pattern: "should [expected behavior] when [condition]"

3. **Arrange-Act-Assert Pattern**
   ```tsx
   it('should show error when email is invalid', () => {
     // Arrange
     render(<SignInForm />)
     const emailInput = screen.getByLabelText('Email')
     
     // Act
     fireEvent.change(emailInput, { target: { value: 'invalid' } })
     fireEvent.click(screen.getByText('Submit'))
     
     // Assert
     expect(screen.getByText('Invalid email')).toBeInTheDocument()
   })
   ```

4. **Mock External Dependencies**
   - Mock API calls, localStorage, etc.
   - Use `vi.fn()` for function mocks
   - Use `vi.mock()` for module mocks

5. **Test Accessibility**
   - Use `getByRole`, `getByLabelText` over `getByTestId`
   - Test keyboard navigation
   - Verify ARIA attributes

## Coverage Goals

- **Components**: 90%+ coverage
- **Hooks**: 95%+ coverage
- **Services**: 90%+ coverage
- **Pages**: 80%+ coverage
- **App**: 80%+ coverage

## Current Coverage Status

```
File                                     | % Stmts | % Branch | % Funcs | % Lines
-----------------------------------------|---------|----------|---------|---------
All files                                |   83.17 |    71.13 |   66.66 |   83.17
App.tsx                                  |     100 |      100 |     100 |     100
Input.tsx                                |     100 |    75.86 |     100 |     100
Icon.tsx                                 |      96 |     87.5 |     100 |      96
Button.tsx                               |   97.22 |       50 |     100 |   97.22
Photos.tsx                               |   85.71 |    47.61 |      40 |   85.71
SignIn.tsx                               |   94.44 |    84.61 |     100 |   94.44
useAuth.ts                               |   77.77 |       50 |     100 |   77.77
pexels.ts                                |     100 |      100 |     100 |     100
AuthProvider.tsx                         |     100 |      100 |     100 |     100
```

## Common Test Utilities

### Custom Render Functions
```tsx
// For pages that need routing
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  )
}

// For App component (already has providers)
const renderApp = () => {
  return render(<App />)
}
```

### Mock Data Factories
```tsx
const createMockUser = (overrides = {}) => ({
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  ...overrides
})

const createMockPhoto = (overrides = {}) => ({
  id: 1,
  width: 1000,
  height: 1000,
  url: 'https://example.com/photo1',
  photographer: 'John Doe',
  photographer_url: 'https://example.com/john',
  photographer_id: 1,
  avg_color: '#FF0000',
  src: {
    original: 'https://example.com/photo1.jpg',
    large2x: 'https://example.com/photo1-large.jpg',
    large: 'https://example.com/photo1-large.jpg',
    medium: 'https://example.com/photo1-medium.jpg',
    small: 'https://example.com/photo1-small.jpg',
    portrait: 'https://example.com/photo1-portrait.jpg',
    landscape: 'https://example.com/photo1-landscape.jpg',
    tiny: 'https://example.com/photo1-tiny.jpg',
  },
  liked: false,
  alt: 'Beautiful nature photo',
  ...overrides
})
```

## Debugging Tests

1. **Use `screen.debug()`** to see the rendered output
2. **Use `screen.logTestingPlaygroundURL()`** for interactive debugging
3. **Add `console.log()`** statements in tests
4. **Use `--reporter=verbose`** for detailed output
5. **Use `waitFor()`** for async operations
6. **Check test isolation** with `beforeEach()` cleanup

## Common Issues & Solutions

### Router Issues
```tsx
// ❌ Don't wrap App in BrowserRouter (it already has one)
<BrowserRouter><App /></BrowserRouter>

// ✅ Just render App directly
<App />
```

### Async Testing
```tsx
// ✅ Use waitFor for async operations
await waitFor(() => {
  expect(screen.getByText('Loaded content')).toBeInTheDocument()
})
```

### Mock Configuration
```tsx
// ✅ Clear mocks between tests
beforeEach(() => {
  vi.clearAllMocks()
})
```

## Continuous Integration

Tests run automatically on:
- Pull requests
- Main branch pushes
- Release deployments

All tests must pass before merging code.

## Future Improvements

### TODO: Additional Tests
- [ ] `ProtectedRoute.test.tsx` - Test route protection logic
- [ ] `Button.test.tsx` - Test button component interactions
- [ ] E2E tests with Playwright or Cypress
- [ ] Performance tests
- [ ] Accessibility tests

### Coverage Improvements
- [ ] Increase branch coverage from 71% to 80%+
- [ ] Add tests for edge cases in Photos.tsx
- [ ] Improve useAuth.ts coverage from 77% to 90%+ 