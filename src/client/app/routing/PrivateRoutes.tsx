import { lazy, FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";
import Customers from "../pages/customers/Customers";
import Orders from "../pages/orders/Orders";
import Products from "../pages/products/Products";
import CustomerProfile from "../pages/customers/components/profile/CustomerProfile";

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import("../modules/profile/ProfilePage"));

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="customers" element={<Customers />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        {/* Lazy Modules */}
        <Route
          path="crafted/pages/profile/*"
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path="customers/profile/overview*"
          element={
            <SuspensedView>
              <CustomerProfile />
            </SuspensedView>
          }
        />
        <Route
          path="customers/profile/empty-containers*"
          element={
            <SuspensedView>
              <CustomerProfile />
            </SuspensedView>
          }
        />
        <Route
          path="customers/profile/customerorders*"
          element={
            <SuspensedView>
              <CustomerProfile />
            </SuspensedView>
          }
        />
        <Route
          path="customers/profile/notes*"
          element={
            <SuspensedView>
              <CustomerProfile />
            </SuspensedView>
          }
        />

        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
