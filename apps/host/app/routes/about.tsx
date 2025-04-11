import type { Route } from "./+types/home";
import { lazy, Suspense } from "react";
// @ts-ignore
const RemoteAbout = lazy(() => import("remote/About"));

export function clientLoader() {
  return { name: "React Router" };
}

export default function About({ loaderData }: Route.ComponentProps) {
  return (
    <RemoteAbout loaderData={loaderData} />
  );
}
