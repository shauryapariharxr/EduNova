# EduNova

EduNova is a front-end online learning platform — a marketing site plus a full student dashboard, built with plain HTML, CSS, and JavaScript (no framework, no build step).

## Features

- **Marketing site** — home, course catalog, course details, about, contact, legal pages, login/register
- **Student dashboard** — sidebar navigation, stats, "Continue learning" cards, learning roadmap, achievements
- **My Courses** — grid of enrolled courses with progress bars
- **Live Classes / Assignments / Certificates / Messages / Settings** — dedicated dashboard pages
- **Profile page** — cover photo, bio, learning stats, achievement badges
- **Light / dark mode** — toggle in the topbar, choice remembered across visits
- **Auth flow** — register/login with session stored in `localStorage`, protected dashboard routes

## Project structure

```
EduNova/
├── index.html              # Landing page (project root)
└── src/
    ├── css/                 # One stylesheet per page/section
    │   ├── home.css
    │   ├── dashboard.css
    │   ├── auth.css
    │   ├── course.css
    │   ├── course-details.css
    │   ├── about.css
    │   ├── contact.css
    │   ├── legal.css
    │   ├── register.css
    │   └── student.css
    ├── html/                # All other pages
    │   ├── course.html / course-details.html
    │   ├── about.html / contact.html
    │   ├── login.html / register.html
    │   ├── dashboard.html / my-courses.html
    │   ├── live-classes.html / assignments.html
    │   ├── certificates.html / messages.html
    │   ├── settings.html / profile.html
    │   ├── privacy-policy.html / refund.html / term-condition.html
    │   └── student.html
    ├── javascript/
    │   ├── auth.js          # register / login / session / logout
    │   ├── course.js        # course page interactions
    │   └── theme.js         # light/dark mode toggle
    ├── images/               # Logo + social icons
    └── utils/                # Shared header/footer partials
```

## Getting started

This is a static site — no install or build step required.

1. Clone or download the project.
2. Open `index.html` directly in a browser, **or** serve it locally for correct relative paths on all pages:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8000
   ```
3. Visit the local URL shown in your terminal.

## Notes

- Auth is a front-end demo only — sessions are stored in `localStorage`, not a real backend.
- Dashboard pages call `EduNovaAuth.requireAuth()` and redirect to `login.html` if no session is found.
- Every dashboard page shares the same sidebar/topbar shell; only the `<main class="content">` section differs between them.
