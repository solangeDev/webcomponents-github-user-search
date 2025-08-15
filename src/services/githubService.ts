// src/services/githubService.ts
const API_URL = import.meta.env.VITE_GITHUB_API_URL;
export async function fetchGithubUser(username: string) {
  try {
    const response = await fetch(`${API_URL}/${username}`);
    if (!response.ok) {
      throw new Error('Usuario no encontrado');
    }
    return await response.json();
  } catch (error) {
    return { error: (error as Error).message };
  }
}
