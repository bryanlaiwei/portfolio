import { redirect } from "next/navigation";

// The about text now lives in the hero at the top of the home page.
export default function AboutPage() {
  redirect("/");
}
