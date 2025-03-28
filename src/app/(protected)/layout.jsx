// app/(protected)/layout.jsx
"use client";

import PrivateRoute from "../PrivateRoute";

export default function ProtectedLayout({ children }) {
  return <PrivateRoute>{children}</PrivateRoute>;
}
