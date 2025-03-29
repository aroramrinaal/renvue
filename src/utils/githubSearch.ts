import { Octokit } from "@octokit/rest";

interface GitHubResult {
  name: string;
  url: string;
  description: string;
  stars: number;
  language: string;
}

export async function searchGitHub(query: string): Promise<GitHubResult[]> {
  if (!process.env.GITHUB_ACCESS_TOKEN) {
    console.warn("GITHUB_ACCESS_TOKEN not configured, skipping GitHub search");
    return [];
  }

  const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
  });

  try {
    const response = await octokit.search.repos({
      q: query,
      sort: "stars",
      order: "desc",
      per_page: 5,
    });

    const results = response.data.items.map(repo => ({
      name: repo.name,
      url: repo.homepage || repo.html_url,
      description: repo.description || "",
      stars: repo.stargazers_count,
      language: repo.language || "Not specified"
    }));

    console.log("GitHub Search Results:", results);
    return results;
  } catch (error) {
    console.error("GitHub search error:", error);
    return [];
  }
} 