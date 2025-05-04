import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CreateListingPage from "./pages/CreateListingPage";
import ListingDetailPage from "./pages/ListingDetails";
import MarketplacePage from "./pages/MarketplacePage";
import Account from "./pages/Accout";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import CartPage from "./pages/CartPage";
import Dashboard from "./pages/Dashboard";
import SimilarItemsPage from "./pages/SimilarItemsPage";
import ProfilePage from "./pages/ProfilePage";
import PasswordResetPage from "./pages/PasswordResetPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserProfile, verifyToken } from "./redux/slices/authSlice";

// Import profile form components
import StudentProfileForm from "./pages/profile/forms/StudentProfileForm";
import MerchantProfileForm from "./pages/profile/forms/MerchantProfileForm";
import TutorProfileForm from "./pages/profile/forms/TutorProfileForm";
import SignupCompletionHandler from "./components/SignupCompletionHandler";

// Routes where Navbar and Footer should be hidden
const noNavbarRoutes = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/profile/student/create",
  "/profile/student/edit",
  "/profile/merchant/create",
  "/profile/merchant/edit",
  "/profile/tutor/create",
  "/profile/tutor/edit",
  "/signup/complete",
];

// AppContent component to access route location
function AppContent() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Check if the current path or its parent path is in the noNavbarRoutes list
  const shouldShowNavbar = !noNavbarRoutes.some(
    (route) =>
      location.pathname === route || location.pathname.startsWith(route + "/")
  );

  // Fetch user profile and verify token on app initialization
  useEffect(() => {
    if (isAuthenticated) {
      // Verify token and fetch user profile
      dispatch(verifyToken());
      console.log("App initialized, fetching user profile");
      dispatch(fetchUserProfile());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/listings" element={<MarketplacePage />} />
          <Route path="/listing/:id" element={<ListingDetailPage />} />
          <Route path="/similar/:id" element={<SimilarItemsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Password Reset Routes */}
          <Route path="/forgot-password" element={<PasswordResetPage />} />
          <Route path="/reset-password" element={<PasswordResetPage />} />
          <Route
            path="/reset-password/:uidb64/:token"
            element={<PasswordResetPage />}
          />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateListingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/merchant-dashboard"
            element={
              <PrivateRoute requiredRoles={["merchant"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/tutor-dashboard"
            element={
              <PrivateRoute requiredRoles={["tutor"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute requiredRoles={["campus_admin"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Add signup completion routes */}
          <Route
            path="/signup/complete"
            element={<SignupCompletionHandler />}
          />
          <Route
            path="/profile/student/create"
            element={
              <PrivateRoute>
                <StudentProfileForm mode="create" />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/merchant/create"
            element={
              <PrivateRoute>
                <MerchantProfileForm mode="create" />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/tutor/create"
            element={
              <PrivateRoute>
                <TutorProfileForm mode="create" />
              </PrivateRoute>
            }
          />

          {/* Edit profile routes */}
          <Route
            path="/profile/student/edit"
            element={
              <PrivateRoute requiredRoles={["student"]}>
                <StudentProfileForm mode="edit" />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/merchant/edit"
            element={
              <PrivateRoute requiredRoles={["merchant"]}>
                <MerchantProfileForm mode="edit" />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/tutor/edit"
            element={
              <PrivateRoute requiredRoles={["tutor"]}>
                <TutorProfileForm mode="edit" />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      {shouldShowNavbar && <Footer />}
    </>
  );
}

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

export default App;
