import type { Route } from "./+types/about";

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="text-center p-4">
      <h1 className="text-2xl">Hello About, {loaderData.name || "name"}</h1>
      <a
        className="block mt-2 text-blue-500 underline hover:text-blue-600"
        href="https://reactrouter.com/docs"
      >
        React Router Docs
      </a>
    </div>
  );
}