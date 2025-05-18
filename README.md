## Getting Started

### V0 chat

[https://v0.dev/chat/sPd37DuPHy9](https://v0.dev/chat/sPd37DuPHy9)

First, run the development server:

### ENV

.env.local

```bash
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://anjit.digital6.au/index.php?graphql

```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Rationale Document: WordPress Homepage Integration for Educational Platform

1. What Was Implemented

- Updated the homepage with flexible components, including a banner and course sections, to create a dynamic and engaging experience.
- Developed a custom “Course” post type with categories, allowing structured organization of educational materials.
- Utilized WPGraphQL API for efficient data fetching and interaction with the frontend.
- Implemented Advanced Custom Fields (ACF) to manage content blocks flexibly, giving admins full control over updates and layouts.

2. Why This Is the Most Effective and Scalable Solution

- Performance Optimization: Using WPGraphQL enhances content retrieval efficiency, reducing overhead compared to traditional REST APIs.
- Scalability: The custom course post type with categories provides a structured way to expand the catalog without compromising organization.
- Admin Control & Flexibility: ACF empowers content managers to update sections without coding, ensuring long-term maintainability.
- Improved User Experience: The flexible homepage components make it easier for users to access courses, increasing engagement and usability.

This approach ensures a robust, scalable, and user-friendly educational platform while maintaining flexibility for future enhancements.
Let me know if you need refinements!
