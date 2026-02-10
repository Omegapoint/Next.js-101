# Comprehensive Guide to Parallel Routes in Next.js

## Table of Contents
- [Introduction](#introduction)
- [What Are Parallel Routes?](#what-are-parallel-routes)
- [Why Use Parallel Routes?](#why-use-parallel-routes)
- [Key Concepts](#key-concepts)
- [Basic Implementation](#basic-implementation)
- [Examples from This Project](#examples-from-this-project)
- [Advanced Features](#advanced-features)
- [Best Practices](#best-practices)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

## Introduction

Parallel Routes is a powerful feature in Next.js App Router that allows you to simultaneously render multiple pages within the same layout. This enables sophisticated UI patterns where different sections of a page can be independently loaded, updated, and managed.

## What Are Parallel Routes?

Parallel Routes allow you to render one or more pages simultaneously in the same layout. Each parallel route is defined using a **slot**, which is a folder name that starts with the `@` symbol (e.g., `@analytics`, `@team`, `@todos`).

Think of slots as "placeholders" in your layout that can be filled with different content, each with its own loading states, error boundaries, and routing logic.

## Why Use Parallel Routes?

Parallel Routes are beneficial for:

1. **Independent Loading States**: Each slot can have its own loading UI, improving perceived performance
2. **Isolated Error Handling**: Errors in one slot don't affect others
3. **Conditional Rendering**: Show/hide slots based on conditions (authentication, user roles, etc.)
4. **Split Views**: Create dashboard-like interfaces with multiple independent sections
5. **Modal-like Experiences**: Implement intercepting routes for modals and overlays
6. **Better Code Organization**: Separate concerns into distinct route segments

## Key Concepts

### Slots
- Folders named with the `@` prefix (e.g., `@dashboard`, `@analytics`)
- Not part of the URL structure
- Act as props passed to the parent layout

### Default Files (`default.tsx`)
- Fallback content when a slot doesn't have a matching route
- Required when navigating to routes where the slot shouldn't render
- Prevents the "404" error for slots when navigating

### Layout Props
- Slots are passed as props to the parent layout
- The prop name matches the slot name (without `@`)
- Regular `children` prop represents the main content

## Basic Implementation

### Step 1: Create the Directory Structure

```
app/
  dashboard/
    @analytics/
      page.tsx
      loading.tsx
      error.tsx
      default.tsx
    @team/
      page.tsx
      loading.tsx
      error.tsx
      default.tsx
    layout.tsx
    page.tsx
```

### Step 2: Create the Parent Layout

The parent layout receives each slot as a prop:

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
      <div className="grid grid-cols-2 gap-4">
        <div>{analytics}</div>
        <div>{team}</div>
      </div>
    </div>
  );
}
```

### Step 3: Create Slot Pages

Each slot has its own `page.tsx`:

```tsx
// app/dashboard/@analytics/page.tsx
export default function AnalyticsSlot() {
  return (
    <div>
      <h2>Analytics</h2>
      <p>Your analytics content here</p>
    </div>
  );
}

// app/dashboard/@team/page.tsx
export default function TeamSlot() {
  return (
    <div>
      <h2>Team</h2>
      <p>Your team content here</p>
    </div>
  );
}
```

### Step 4: Create the Main Page

```tsx
// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Main dashboard content</p>
    </div>
  );
}
```

### Step 5: Add Default Files

Default files prevent errors when navigating:

```tsx
// app/dashboard/@analytics/default.tsx
export default function DefaultAnalytics() {
  return null; // or return some default content
}

// app/dashboard/@team/default.tsx
export default function DefaultTeam() {
  return null;
}
```

## Examples from This Project

This repository includes two practical examples of parallel routes:

### Example 1: Dashboard with My Tasks

Location: `/src/app/dashboard/`

**Structure:**
```
dashboard/
  @myTasks/
    page.tsx        # Shows user's personal tasks
    loading.tsx     # Loading state for tasks
    error.tsx       # Error boundary for tasks
    default.tsx     # Fallback when navigating away
  layout.tsx        # Combines children and myTasks slot
  page.tsx          # Main dashboard content
```

**Key Features:**
- The `@myTasks` slot displays tasks specific to the logged-in user
- Independent loading state for the tasks list
- Isolated error handling
- Uses a `default.tsx` to handle navigation scenarios

**Code Snippet:**
```tsx
// dashboard/layout.tsx
export default function DashboardLayout({
  children,
  myTasks,
}: {
  children: React.ReactNode;
  myTasks: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="flex gap-2">
        <Paper>
          <h2>Your tasks</h2>
          {myTasks}
        </Paper>
        {/* Other dashboard sections */}
      </div>
    </>
  );
}
```

### Example 2: Todos Page with Todos Slot

Location: `/src/app/todos/`

**Structure:**
```
todos/
  @todos/
    page.tsx        # Displays all todos
    loading.tsx     # Loading state
    error.tsx       # Error handling
  layout.tsx        # Combines children and todos slot
  page.tsx          # Main todos page content
```

**Key Features:**
- The `@todos` slot shows the complete todo list
- Separate from the main page content
- Can have different revalidation strategies
- Independent error states

## Advanced Features

### 1. Loading States

Each slot can have its own loading UI:

```tsx
// app/dashboard/@analytics/loading.tsx
export default function Loading() {
  return <div>Loading analytics...</div>;
}
```

### 2. Error Handling

Each slot can have isolated error boundaries:

```tsx
// app/dashboard/@analytics/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong in analytics!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### 3. Conditional Rendering

Render slots based on conditions:

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,
  team,
  admin,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
  admin: React.ReactNode;
}) {
  const user = getUser();
  
  return (
    <div>
      {children}
      {analytics}
      {team}
      {user.isAdmin && admin}  {/* Conditionally show admin panel */}
    </div>
  );
}
```

### 4. Nested Routes

Slots can have nested routes:

```
dashboard/
  @analytics/
    page.tsx          # /dashboard
    reports/
      page.tsx        # /dashboard/reports
    charts/
      page.tsx        # /dashboard/charts
```

### 5. Independent Data Fetching

Each slot can fetch its own data independently:

```tsx
// app/dashboard/@analytics/page.tsx
async function AnalyticsSlot() {
  const data = await fetchAnalytics();  // Independent fetch
  
  return <AnalyticsDisplay data={data} />;
}

// app/dashboard/@team/page.tsx
async function TeamSlot() {
  const team = await fetchTeam();  // Another independent fetch
  
  return <TeamDisplay team={team} />;
}
```

## Best Practices

### 1. Always Include Default Files

**Why:** Prevents 404 errors when navigating to routes where a slot shouldn't render.

```tsx
// app/dashboard/@slot/default.tsx
export default function Default() {
  return null;
}
```

### 2. Use Meaningful Slot Names

**Good:**
- `@analytics` - Clear what content it contains
- `@userProfile` - Descriptive and specific
- `@notifications` - Self-explanatory

**Avoid:**
- `@slot1` - Not descriptive
- `@data` - Too generic
- `@section` - Unclear purpose

### 3. Handle Loading and Error States

Always provide loading and error boundaries for better UX:

```tsx
// loading.tsx - improves perceived performance
// error.tsx - graceful error handling
// default.tsx - prevents navigation errors
```

### 4. Keep Slots Independent

Each slot should be self-contained:
- Own data fetching
- Own error handling
- Own loading states
- Minimal dependencies on other slots

### 5. Use TypeScript for Type Safety

```tsx
interface LayoutProps {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}

export default function Layout({ children, analytics, team }: LayoutProps) {
  // Layout implementation
}
```

### 6. Consider Performance

- Use streaming for slots with slow data fetching
- Implement proper caching strategies
- Use Suspense boundaries appropriately

## Common Patterns

### Pattern 1: Split Dashboard

Perfect for dashboards with multiple independent sections:

```tsx
export default function DashboardLayout({
  children,
  analytics,
  sales,
  inventory,
}: LayoutProps) {
  return (
    <div className="dashboard">
      <header>{children}</header>
      <div className="grid grid-cols-3 gap-4">
        <section>{analytics}</section>
        <section>{sales}</section>
        <section>{inventory}</section>
      </div>
    </div>
  );
}
```

### Pattern 2: Sidebar with Main Content

Great for apps with persistent sidebars:

```tsx
export default function AppLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="w-64">{sidebar}</aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
```

### Pattern 3: Modal-like Overlays

Combine with intercepting routes for modals:

```tsx
export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}  {/* Renders above main content */}
    </>
  );
}
```

### Pattern 4: Conditional Panels

Show/hide sections based on user state:

```tsx
export default function Layout({
  children,
  premium,
}: {
  children: React.ReactNode;
  premium: React.ReactNode;
}) {
  const user = useUser();
  
  return (
    <div>
      {children}
      {user.isPremium ? premium : <UpgradePrompt />}
    </div>
  );
}
```

### Pattern 5: A/B Testing

Different slots for experiments:

```tsx
export default function Layout({
  children,
  variantA,
  variantB,
}: LayoutProps) {
  const variant = useABTest();
  
  return (
    <div>
      {children}
      {variant === 'A' ? variantA : variantB}
    </div>
  );
}
```

## Troubleshooting

### Problem 1: Getting 404 for Slots When Navigating

**Symptom:** Slots show 404 errors when navigating to different routes.

**Solution:** Add `default.tsx` files to all slots:

```tsx
// app/dashboard/@slot/default.tsx
export default function Default() {
  return null;
}
```

### Problem 2: Slots Not Updating

**Symptom:** Slot content doesn't update when it should.

**Solution:** Check these common issues:
1. Ensure proper revalidation settings
2. Verify data fetching logic
3. Check if you're using proper cache controls

```tsx
// Force revalidation
export const revalidate = 0;
```

### Problem 3: TypeScript Errors with Slot Props

**Symptom:** TypeScript complains about slot props in layout.

**Solution:** Properly type your layout props:

```tsx
interface LayoutProps {
  children: React.ReactNode;
  slotName: React.ReactNode;  // Use exact slot name without @
}
```

### Problem 4: Slots Showing Unexpected Content

**Symptom:** Slots display content from wrong routes.

**Solution:** 
1. Check your folder structure (use `@` prefix)
2. Verify route matching
3. Review `default.tsx` implementation

### Problem 5: Performance Issues

**Symptom:** Page loads slowly with multiple slots.

**Solution:**
1. Use streaming and Suspense:
```tsx
<Suspense fallback={<Loading />}>
  {slot}
</Suspense>
```
2. Optimize data fetching
3. Implement proper caching

### Problem 6: Layout Not Receiving Slot Props

**Symptom:** Slot props are undefined in layout.

**Solution:** Ensure:
1. Slot folders are named correctly (with `@` prefix)
2. Slot folders are at the same level as `layout.tsx`
3. Props match slot names (without `@`)

## Additional Resources

- [Next.js Parallel Routes Documentation](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes) - Often used with Parallel Routes
- [Loading UI and Streaming](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
- [Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)

## Conclusion

Parallel Routes are a powerful feature that enables complex UI patterns in Next.js applications. By understanding slots, default files, and best practices, you can create sophisticated, performant, and maintainable applications.

Remember:
- ✅ Use meaningful slot names
- ✅ Always include `default.tsx` files
- ✅ Implement loading and error states
- ✅ Keep slots independent
- ✅ Consider performance implications
- ✅ Test navigation scenarios

Start with simple examples (like those in this repository) and gradually build more complex patterns as you become comfortable with the concept.

Happy coding! 🚀
