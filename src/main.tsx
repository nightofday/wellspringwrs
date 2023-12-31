import { createRoot } from "react-dom/client";
// Axios
import axios from "axios";
import { Chart, registerables } from "chart.js";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
// Apps
import { MetronicI18nProvider } from "./client/_metronic/i18n/Metronici18n";
import "./client/_metronic/assets/sass/style.react.scss";
import "./client/_metronic/assets/fonticon/fonticon.css";
import "./client/_metronic/assets/keenicons/duotone/style.css";
import "./client/_metronic/assets/keenicons/outline/style.css";
import "./client/_metronic/assets/keenicons/solid/style.css";
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './client/_metronic/assets/css/style.rtl.css'
 **/
import "./client/_metronic/assets/sass/style.scss";
import "./client/_metronic/assets/sass/plugins.scss";
import { AppRoutes } from "./client/app/routing/AppRoutes";
import { AuthProvider, setupAxios } from "./client/app/modules/auth";
/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */
/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
setupAxios(axios);
Chart.register(...registerables);

const queryClient = new QueryClient();
const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <MetronicI18nProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </MetronicI18nProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
