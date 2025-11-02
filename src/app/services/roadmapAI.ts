export async function fetchAIRoadmap(description: string) {
  const res = await fetch("/api/roadmap", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: description }),
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    throw new Error(data.error || "Failed to fetch AI roadmap");
  }

  return data.result; // string JSON from AI
}
