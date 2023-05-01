import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/styles";
import { HelmetProvider } from "react-helmet-async";
import "react-datepicker/dist/react-datepicker.css"
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import theme from "./utils/Theme";
import { Loader, ScrollToTop } from "./components";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/i18n/i18n";
// import '@react-pdf-viewer/core/lib/styles/index.css';
import 'rsuite/dist/rsuite-no-reset.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <HelmetProvider>
              <App />
              <ScrollToTop />
            </HelmetProvider>
            <ToastContainer
              position='top-right'
              autoClose={2000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable={false}
              pauseOnHover
              theme='colored'
            />
          </Router>
        </Provider>
      </ThemeProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals())
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
