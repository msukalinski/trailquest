# TrailQuest

TrailQuest is a React project for the SoftUni React JS Regular Exam 2026. 
It is a single-page application for discovering and sharing hiking trails across Bulgaria. Users can explore routes, compare trail information, create and manage their own trails, and save favourites for future hikes.

### Live Demo: 
https://trailquest.msukalinski.workers.dev/

### GitHub Repository: 
https://github.com/msukalinski/trailquest

Demo users:
- email: stamat@abv.bg, password: asdasd;
- email: pesho@abv.bg, password: asdasd;
- email: gosho@abv.bg, password: asdasd;

## Documentation

### Technologies

- React and JavaScript
- Vite
- React Router
- Supabase Authentication and PostgreSQL
- Bootstrap and Bootstrap Icons
- React Hot Toast
- Cloudflare hosting

### Main Features

- Public trail catalog with search, filters, sorting and pagination.
- Detailed trail pages with descriptions, images and author information.
- User registration, login, logout and persistent sessions.
- Creation, editing and deletion of trails, with author ownership checks.
- Saving and removing favourite trails.
- Personal pages for managing created trails and viewing saved trails.
- Controlled forms with validation, loading indicators and error messages.
- Protected routes for authenticated users and guest-only authentication pages.

The Installation section explains how to run the project locally. The Functional Guide describes user permissions, application flows, data operations and error handling.

## Architecture

The application separates page rendering, shared state, form logic and backend communication.

| Folder | Responsibility |
| --- | --- |
| `src/components/` | Pages, layouts, forms, cards and shared UI components. |
| `src/context/` | Authentication Context definition. |
| `src/providers/` | Authentication state and Supabase session subscription. |
| `src/guards/` | Access control for private and guest-only routes. |
| `src/hooks/` | Reusable authentication and form hooks. |
| `src/services/` | Supabase authentication, trail and favourite operations. |
| `src/lib/` | Shared Supabase client configuration. |
| `src/validation/` | Trail validation rules. |
| `public/` | Static images and icons. |

`MainLayout` provides the shared Header, Footer and page outlet. React Router renders the appropriate page inside this layout.

`UserProvider` subscribes to Supabase authentication changes and shares the current user through Context. Components access this state through `useUser`, while `AuthGuard` and `GuestGuard` control route access.

Page components call service functions to communicate with Supabase. The backend stores trail records, public profiles and favourite associations, with Row Level Security policies controlling database access.

Create and Edit share `TrailForm` and `useTrailForm` to keep their fields, validation and submission behaviour consistent. Components use external CSS files alongside Bootstrap for styling.


# Installation and Local Development

**Prerequisites:** Node.js 22.12 or newer, npm and Git.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/msukalinski/trailquest.git
   cd trailquest
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Configure the environment:**

   Create a `.env.local` file in the project root, alongside `package.json`:

   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
   ```

   Replace the example values with the URL and publishable key of the configured TrailQuest Supabase project.

   The backend must contain the `trails`, `profiles` and `favourites` tables, their relationships, the profile creation trigger and the required Row Level Security policies. Supabase hosts the backend, so no separate backend server needs to run locally.

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   Open the URL displayed in the terminal, usually `http://localhost:5173`.

   Restart the development server after changing environment variables.

5. **Build and preview the production version:**

   ```bash
   npm run build
   npm run preview
   ```

   The build is generated in `dist`. The preview command uses the project's Cloudflare Wrangler configuration; open the address displayed in the terminal.

# Functional Guide

## 1. Project Overview

**Application Name:** TrailQuest

**Application Category / Topic:** Hiking trail discovery and sharing platform.

**Main Purpose:** TrailQuest helps users discover hiking trails across Bulgaria. The application brings trail information and personal hiking collections together in one place.

## 2. User Access & Permissions

### Guest (Not Authenticated)

Guests can access the Home, Explore, Trail Details, About, Terms and Privacy pages. They can also open Login and Register.

**Available routes:** `/`, `/trails`, `/trails/:trailId/details`, `/about`, `/terms`, `/privacy`, `/login` and `/register`.

**Public data shown:** The latest trails on Home, searchable and filterable catalog results, and individual trail descriptions, images, statistics and available author information.

Guests cannot open Create Trail, Edit Trail, My Trails or Saved Trails. Attempting to open a private route redirects them to Login with an explanatory message.

### Authenticated User

Authenticated users can browse all public content and access:

- **Create Trail:** Share a new trail.
- **My Trails:** View and sort their own trails, see favourite counts, and access management actions.
- **Saved Trails:** View trails they have saved, sort by saved date and remove a save.
- **Trail Details:** Read trail information and save or unsave another user's trail.
- **Edit / Delete:** Manage only trails they own.

The trail author's ID is stored in `ownerId`. Edit and Delete controls are shown only when it matches the authenticated user's ID. Edit also checks ownership after loading the trail. Supabase Row Level Security policies control database access.

Authenticated users are redirected to Home if they try to open Login or Register. Users cannot save their own trails.

## 3. Authentication & Session Handling

### Authentication Flow

1. **Application load:** `UserProvider` starts with `user = null` and `initializing = true`, then subscribes to Supabase authentication changes.
2. **Session check:** Supabase restores any available session and emits `INITIAL_SESSION`. The provider sets the current user and finishes initialization. Route guards show a loader while this check is running.
3. **Login:** After form validation, `signInWithPassword()` checks the credentials. A successful authentication updates the shared user through the auth listener and the application navigates to Home.
4. **Registration:** The form validates the username, email, password and confirmation, then calls `signUp()`. The username is submitted as user metadata. With email confirmation disabled in the project's Supabase settings, successful registration creates a session and navigates to Home. If registration returns no session, the form asks the user to log in.
5. **Logout:** The Header returns the user to Home and calls `signOut()`. The authentication listener clears the shared user, and private links disappear. A logout failure is displayed in the Header.

### Session Persistence

Supabase Auth manages session persistence using the SDK's default browser storage, normally `localStorage`, and refreshes tokens automatically.

React Context shares the current user and initialization state across components. Context itself does not provide persistent storage: Supabase restores the session after a refresh and updates Context through the authentication listener, so an existing valid session does not require another manual login.

## 4. Routing Structure

### Route Guards Logic

All page routes are children of `MainLayout`, which renders the Header, Footer and an `Outlet`.

- Public routes are accessible to guests and authenticated users.
- `GuestGuard` wraps Login and Register. Authenticated users are redirected to Home.
- `AuthGuard` wraps private routes. Guests are redirected to Login.
- Both guards wait for session initialization before deciding access.

### Main Routes

The application has 12 named page routes and a wildcard Not Found route.

| Route | Page | Access |
| --- | --- | --- |
| `/` | Home with latest trails | Public |
| `/trails` | Explore / trail catalog | Public |
| `/trails/:trailId/details` | Trail Details | Public |
| `/about` | About | Public |
| `/terms` | Terms | Public |
| `/privacy` | Privacy | Public |
| `/login` | Login | Guests |
| `/register` | Register | Guests |
| `/trails/create` | Create Trail | Authenticated users |
| `/trails/:trailId/edit` | Edit Trail | Trail author |
| `/my-trails` | My Trails | Authenticated users |
| `/favourite-trails` | Saved Trails | Authenticated users |
| `*` | Not Found | All users |

### Nested & Parameterized Routes

`MainLayout` provides nested layout routing, and the guards provide additional route groups with their own `Outlet`.

The Details and Edit routes use the `:trailId` URL parameter. Their components read it using `useParams()` and fetch the matching trail from Supabase.

Home, Explore, Details, My Trails and Saved Trails display data fetched from the backend.

## 5. List → Details Flow

### Catalog / List Page

Explore displays trail cards containing an image, title, location, description preview, difficulty, distance, duration and elevation.

Users can:

- Search by trail title.
- Filter by mountain/region and difficulty.
- Sort by newest, oldest, shortest distance or longest distance.
- Navigate through pages of six trails.

Filters, ordering, pagination and the matching total count are handled through Supabase queries. Submitting new search criteria resets pagination to the first page.

### Details Page

Catalog, My Trails and Saved Trails use React Router `Link` components to open Details. Home trail cards use a click handler with `useNavigate()`.

The URL supplies the trail ID, rather than the complete trail object. Details uses that ID to load the trail, its favourite count and available owner profile. The page displays the trail image, description, location, difficulty, distance, duration, elevation and author information.

Authors see Edit and Delete controls. Other authenticated users can save or unsave the trail. Saved status is fetched for the current user and trail.

## 6. Data Source & Backend

**Backend Type:** Real hosted backend using Supabase as a Backend-as-a-Service platform.

Supabase provides PostgreSQL data storage and authentication. The React application communicates with it through `@supabase/supabase-js`.

The application uses these tables:

| Table | Purpose |
| --- | --- |
| `trails` | Main collection containing trail information and `ownerId`. Supports all CRUD operations. |
| `profiles` | Public author information, including the username and membership date. |
| `favourites` | Associations between users and saved trails, including the saved date. |

Authentication accounts are managed by Supabase Auth. Trail and favourite records are persisted in the hosted database.

The Supabase client reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from the Vite environment. Frontend hosting is configured through Cloudflare with SPA route fallback.

## 7. Data Operations (CRUD)

The `trails` table is the collection used to demonstrate all four required operations.

### Create (POST)

An authenticated user opens Create Trail and completes the shared `TrailForm`. After validation, the application trims text values and converts numeric inputs.

`createTrail()` checks the authenticated user and inserts the trail with that user's ID as `ownerId`. The inserted record is returned, and the application navigates to its Details page.

### Read (GET)

Service functions fetch data for:

- Home: the three latest trails.
- Explore: searched, filtered, sorted and paginated trails.
- Details: one trail, its favourite count and available author profile.
- My Trails: trails owned by the current user, including favourite counts.
- Saved Trails: the current user's saved trails, ordered by saved date.

Components display loading, error and empty states around these requests.

### Update (PATCH)

The author opens Edit from Details or My Trails. The application loads the record, checks ownership and initializes `TrailForm` with its existing values.

After validation, `updateTrail()` updates the matching database record and returns its ID. The application navigates to Details, where the updated information is fetched and displayed.

### Delete (DELETE)

The author can delete a trail from Details or My Trails after confirming the action in a confirmation dialog.

`deleteTrail()` deletes the matching record and checks the returned result. On Details, successful deletion navigates to Explore. In My Trails, the deleted card is removed from local state immediately after success, then the received-favourites total is refreshed. A failed deletion and a failed count refresh have separate error messages.

### Additional Interaction: Favourites

Authenticated users can save and unsave another user's trail through the API. `saveTrail()` inserts a favourite association, and `unsaveTrail()` removes it.

Saved Trails loads these associations with their related trail records. Removing a save updates the list without a page reload. My Trails shows per-trail counts and the total number of saves received.

## 8. Forms & Validation

### Forms Used

- **Login:** Email and password.
- **Register:** Username, email, password and password confirmation.
- **Create Trail:** Shared `TrailForm`.
- **Edit Trail:** The same form, initialized with existing trail data.
- **Catalog search:** Search text, region, difficulty and sorting.

My Trails and Saved Trails also use controlled sorting selectors.

`useForm` binds input values to React state and updates them through synthetic `onChange` events. Forms submit through React form actions. `useFormStatus` provides pending state so authentication and trail forms can disable their fields while submitting.

### Validation Rules

Text values are trimmed before trail validation and submission.

| Field | Validation |
| --- | --- |
| Trail title | Required; at least 3 characters after trimming. |
| Location | Required; at least 3 characters after trimming. |
| Difficulty | Must be `Easy`, `Moderate` or `Hard`. |
| Distance | Required; must be a finite number greater than zero. |
| Duration | Required; must be a finite number greater than zero. |
| Elevation | Optional; when provided, must be a finite number of zero or greater. An empty value is stored as `null`. |
| Image URL | Required; must be a valid URL using HTTP or HTTPS. |
| Description | At least 5 characters after trimming. |
| Registration username | Required after trimming. |
| Authentication email | Required after trimming; must match the email-format check. |
| Password and confirmation | Required; registration passwords must match. Further authentication rules are handled by Supabase. |

Trail errors are shown after a field is blurred or after submission is attempted. Invalid trail data is rejected before a database request is sent. API failures are also displayed in the form.

## 9. React-Specific Techniques

### Hooks & Component Lifecycle

- `useState` manages forms, request results, loading, errors, pagination, sorting and pending actions.
- `useEffect` loads remote data and subscribes to authentication changes.
- `useContext` is used by `useUser` to access authentication state.
- `useRef` in GuestGuard tracks whether the visitor entered as a guest, helping avoid an inappropriate notification after successful authentication.
- Router hooks such as `useParams`, `useNavigate` and `useLocation` handle route data, navigation and redirect messages.
- `useFormStatus` exposes pending form submission state.

**Custom hooks:** `useUser` accesses Context, `useForm` manages controlled inputs, and `useTrailForm` shares trail initialization, validation, touched fields and submission handling.

**Lifecycle example:** When My Trails mounts for an authenticated user, its effect fetches the user's trails and favourite total. Changing the sorting option or user ID causes an updated request. When the effect is replaced or the component unmounts, its cleanup aborts the previous requests. The authentication provider also unsubscribes from its auth listener during cleanup.

### Context API

`UserContext` and `UserProvider` share `user`, `initializing` and the authentication service functions. The Header, route guards and user-specific pages consume this state through `useUser` to display appropriate navigation, check permissions and request the current user's data.

### Component Styling

The application uses external component CSS files alongside Bootstrap for layout and utility classes. Bootstrap Icons provide interface icons, and React Hot Toast displays notifications.

### Project Architecture

| Location | Responsibility |
| --- | --- |
| `src/components/` | Pages, layouts, forms, cards and shared UI components. |
| `src/guards/` | Guest and authenticated route access. |
| `src/context/` and `src/providers/` | Shared authentication state and provider lifecycle. |
| `src/hooks/` | Reusable form and Context logic. |
| `src/services/` | Supabase authentication, trail and favourite operations. |
| `src/lib/` | Supabase client initialization. |
| `src/validation/` | Trail validation rules. |
| `public/` | Static images and icons. |

Pages coordinate data fetching and navigation, services handle backend calls, custom hooks share stateful logic, and reusable components render the interface.

## 10. Typical User Flow

1. A guest opens Home, visits Explore, searches or filters trails and opens a trail's Details page.
2. The guest registers or logs in. The shared authentication state updates and private navigation becomes available.
3. The user creates a trail, views it in My Trails, edits its information or deletes it after confirmation.
4. The user saves another author's trail, revisits it through Saved Trails and can remove the save. Logging out returns the application to guest access.

## 11. Error & Edge Case Handling

### Authentication Errors

Login and registration validate required fields and email format. Registration also checks password confirmation. Supabase errors are displayed in the forms, and logout errors are shown in the Header.

Guards wait for session initialization to avoid premature redirects. Guests attempting private routes receive a Login redirect message, while authenticated users attempting Login or Register are redirected to Home.

### Network or Data Errors

Service functions check Supabase errors and throw them to the calling component. Components catch request failures and display an error message.

Loaders indicate pending fetches, and form or action controls are disabled during relevant operations. AbortController cleanup prevents cancelled fetches from updating active request results. Favourite status is matched to both the current user ID and trail ID to avoid showing another user's or trail's result.

After successful deletion from My Trails, a failed favourite-count refresh is reported separately from deletion failure.

### Empty or Missing Data

Explore, Home, My Trails and Saved Trails display empty states when no records are available. A missing trail displays a not-found state, and unmatched application routes render Not Found.

If an author profile or username is unavailable, Details displays `TrailQuest member` with a `TQ` avatar fallback. The membership date is displayed only when a valid date exists. Missing elevation is handled with an explanatory fallback on Details.

### Invalid Input and Permissions

Invalid trail input is rejected before creation or update. Shared validation keeps Create and Edit consistent.

Ownership checks hide management actions from other users and prevent them from opening an Edit form. Saved-trail actions are available only to authenticated users viewing someone else's trail.

## Deployment
The frontend is deployed with Cloudflare:
https://trailquest.msukalinski.workers.dev/
The backend is hosted by Supabase.
No separate custom backend server deployment is required because the project uses Supabase as a hosted Backend-as-a-Service.