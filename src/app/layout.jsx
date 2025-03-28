"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./redux/store/store";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body id="__next">
        <Provider store={store}>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
