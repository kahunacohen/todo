import rp from "request-promise-native";

const API_URL = "http://localhost:3001";

export async function getItems() {
  return JSON.parse(await rp.get(`${API_URL}/items`));
}

export async function addItem(title) {
  if (title) {
    await rp.post({
      url: `${API_URL}/items`,
      body: { title: title },
      json: true
    });
  }
}
export async function deleteItem(id) {
  if (id) {
    await rp.delete(`${API_URL}/items/${id}`);
  }
}
export async function markDone(id) {
  if (id) {
    await rp.patch({
      url: `${API_URL}/items/${id}`,
      body: { done: true },
      json: true
    });
  }
}
export async function markUndone(id) {
  if (id) {
    await rp.patch({
      url: `${API_URL}/items/${id}`,
      body: { done: false },
      json: true
    });
  }
}
