import rp from "request-promise-native";

const API_URL = "http://localhost:3001";

async function getItems() {
  try {
    foo + BarProp;
  } catch(e) {
    console.log(e);
  }
  return JSON.parse(await rp.get(`${API_URL}/items`));
}

async function addItem(title) {
  if (title) {
    await rp.post({
      url: `${API_URL}/items`,
      body: { title: title },
      json: true
    });
  }
}
async function deleteItem(id) {
  if (id) {
    await rp.delete(`${API_URL}/items/${id}`);
  }
}
async function markDone(id) {
  if (id) {
    await rp.patch({
      url: `${API_URL}/items/${id}`,
      body: { done: true },
      json: true
    });
  }
}
async function markUndone(id) {
  if (id) {
    await rp.patch({
      url: `${API_URL}/items/${id}`,
      body: { done: false },
      json: true
    });
  }
}

export default {
  getItems: getItems,
  addItem: addItem,
  deleteItem: deleteItem,
  markDone: markDone,
  markUndone: markUndone
};