import request from './request';

export const addMultiPlayerGame = async (dataForm) => {
  const { data, status } = await request.post(
    '/api/v1/results/multiplayer',
    dataForm
  );
  return { data, status };
};

export const addPlayerGame = async (dataForm) => {
  const { data, status } = await request.post('/api/v1/results', dataForm);
  return { data, status };
};

export const addSinglePlayerGame = async (dataForm) => {
  const { data, status } = await request.post(
    '/api/v1/results/single-player',
    dataForm
  );
  return { data, status };
};

export const addResultGame = async (id, dataResult) => {
  const { data, status } = await request.patch(
    `/api/v1/results/${id}`,
    dataResult
  );
  return { data, status };
};

export const getResults = async (
  option,
  page,
  numItems = 8,
  sortValue = 'default',
  sortName = 'default'
) => {
  const { data, status } = await request.get(
    `/api/v1/results?option=${option}&page=${page}&numItems=${numItems}&sortValue=${sortValue}&sortName=${sortName}`
  );
  return { data, status };
};

export const updatePlayerOnlineAvailable = async (id, available) => {
  const { data, status } = await request.patch(
    `/api/v1/results/multiplayer/${id}/${available}`
  );
  return { data, status };
};

export const removePlayerOnline = async (idSocket) => {
  await request.delete(
    `/api/v1/results//multiplayer/remove-player/${idSocket}`
  );
};
