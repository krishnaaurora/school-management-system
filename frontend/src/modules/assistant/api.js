import ApiClient from '../../services/apiClient';

export const assistantApi = {
  query: async (prompt) => ApiClient.post('/ai/query', { prompt }),
};
