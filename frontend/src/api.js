// src/api.js
console.log('API_BASE_URL:', process.env.REACT_APP_API_BASE_URL);
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || '';

export async function getSurveys() {
  const res = await fetch(`${API_BASE_URL}/api/surveys`);
  if (!res.ok) throw new Error('Failed to fetch surveys');
  return res.json();
}

export async function createSurvey(data) {
  const res = await fetch(`${API_BASE_URL}/api/surveys`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create survey');
  return res.json();
}

export async function updateSurvey(id, data) {
  const res = await fetch(`${API_BASE_URL}/api/surveys/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update survey');
  return res.json();
}

export async function deleteSurvey(id) {
  const res = await fetch(`${API_BASE_URL}/api/surveys/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete survey');
}
