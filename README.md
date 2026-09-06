# Multi-Platform Social Content Calendar(socialhub)

> A dynamic, interactive React application designed to streamline multi-platform social media scheduling and campaign planning.

---

## 📌 Problem Statement & Solution

* **Problem Statement:** Marketing teams and content creators struggle with fragmented social media schedules across multiple platforms (LinkedIn, Twitter, Instagram, Facebook, TikTok). Managing dates manually often leads to missed posting deadlines, disjointed campaigns, and inefficient content organization.
* **Solution:** The **Multi-Platform Social Content Calendar** provides a centralized, visual-first dashboard. It empowers marketing teams to schedule, edit, and organize content seamlessly through interactive drag-and-drop mechanics, platform-specific tagging, and flexible calendar views.

---

## ✨ Key Features

* **Interactive Drag-and-Drop Grid:** Effortlessly drag content cards across calendar dates or from the backlog to reschedule campaigns in real time.
* **Multi-Platform Tagging:** Color-coded badges and filtering for distinct social media platforms (Pinterest, TikTok, Facebook, Twitter, YouTube).
* **Side Panel Editor:** Slide-over modal/panel to quickly update post titles, scheduled times, descriptions, platform tags, and media attachments.
* **Unscheduled Backlog Column:** Dedicated draft column to hold content ideas before scheduling them onto the calendar grid.
* **Weekly / Monthly View Toggle:** Dynamic view switcher enabling high-level monthly strategy overview or detailed weekly execution views.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React.js (Vite)
* **Languages:** JavaScript (ES6+), HTML5, CSS3
* **Drag and Drop Engine:** HTML5 Drag & Drop API / Interactivity
* **Version Control & Deployment:** Git, GitHub, GitHub Pages (`gh-pages`)

---

## 💡 Challenges & Solutions

### 1. Date Matching & Timezone Offsets
* **Challenge:** JavaScript `Date` object discrepancies caused posts to shift to incorrect dates when drag-and-drop items were dropped across different timezone offsets.
* **Solution:** Implemented standardized ISO date strings (`YYYY-MM-DD`) and created a date-normalizer utility function to ensure consistent rendering regardless of the user's local timezone.

### 2. Week View Layout Overflow
* **Challenge:** High volume of scheduled posts on specific days caused CSS grid columns in the weekly view to break alignment and overflow vertically.
* **Solution:** Implemented responsive CSS Flexbox/Grid bounds with auto-scrolling containers (`overflow-y: auto`) and custom scrollbars to maintain structural alignment.

---

## 🚀 Future Scope

* **Backend Integration:** Full Node.js/Express.js and MongoDB database integration for persistent data storage and user authentication.
* **Social Media API Posting:** Auto-publishing and draft syncing directly to social platforms via official APIs (Meta, X/Twitter, Pinterest).
* **Analytics Dashboard:** Post-performance tracking and engagement metrics for published content.

---

## 👩‍💻 Author

**Areesha Asmat**
* **GitHub:** [@areeshy-ITdeveloper](https://github.com/areeshy-ITdeveloper)
* **Live Demo:** (https://areeshy-itdeveloper.github.io/socialhub/)
