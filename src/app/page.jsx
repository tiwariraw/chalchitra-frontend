import { redirect } from "next/navigation";

export default function LandingPageRedirect() {
  redirect("/login");
}
