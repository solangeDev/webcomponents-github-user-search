import { fetchGithubUser } from './githubService';
global.fetch = jest.fn();

describe('fetchGithubUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería retornar datos para un usuario válido', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ login: 'solangeDev', name: 'Solange Dev' }),
    });

    const user = await fetchGithubUser('solangeDev');
    expect(user).toHaveProperty('login', 'solangeDev');
    expect(user).toHaveProperty('name', 'Solange Dev');
  });

  it('debería retornar error para usuario inexistente', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: 'Not Found' }),
    });

    const user = await fetchGithubUser('usuario-inexistente-123');
    expect(user.error).toBeDefined();
  });
});