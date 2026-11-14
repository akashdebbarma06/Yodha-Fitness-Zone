"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="p-8">
      <h2>Something went wrong.</h2>
      <button className="mt-4 underline" onClick={() => reset()}>Try again</button>
    </main>
  );
}
