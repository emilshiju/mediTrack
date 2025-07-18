
# 🩺 MediTrack Admin Dashboard

A modern and scalable Admin Dashboard built using **Next.js** and **Tailwind CSS** for managing Patients, Medications, and Assignments efficiently.

## 🚀 Features

### ✅ Scalable File Organization
The project is structured for scalability and readability:



---

### ✅ Admin Dashboard Layout
- Sidebar navigation with routes for:
  - Add/List **Patients**
  - Add/List **Medications**
  - Add/List **Assignments**
- Responsive and clean layout powered by **Tailwind CSS**

---

### ✅ Forms & Validations
- Used **Formik** for structured form handling
- Integrated **Yup** for schema-based form validations
- Provides real-time error feedback for a better user experience
- Highly reusable form logic across modules

---

### ✅ Axios Interceptors
Centralized API communication via a custom `axiosClient`:
- Base URL configuration
- Global request/response handling
- Error interception and logging

---

### ✅ UI/UX Enhancements
To provide a seamless experience:
- **Skeleton Loaders** during data fetching
- **Submission Loaders** during edits or deletes
- **Toast Notifications** and inline feedback for actions

---

### ✅ Optimistic UI Updates
- After delete actions, local state (`useState`) is updated optimistically
- No need to refetch the entire dataset
- Reduces API load and improves frontend responsiveness

---

## 🖥️ Getting Started

1. **Clone the repo**
   
git clone https://github.com/your-username/meditrack-frontend.git
cd mediTrack


Install Dependencies
npm install


Run the Server
npm run dev



