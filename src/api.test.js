import sinon from "sinon";
import rp from "request-promise-native";

import { addItem, deleteItem, getItems } from "./api";

describe("api", () => {
  afterEach(() => {
    sinon.restore();
  });
  describe("getItems", () => {
    beforeEach(() => {
      sinon.replace(
        rp,
        "get",
        sinon.fake(async () => {
          return `[
          {
            "title": "foo",
            "id": 1
          }
        ]`;
        })
      );
    });
    it("returns a promise with valid item JSON", async done => {
      const items = await getItems();
      expect(items[0].title === "foo" && items[0].id === 1).toBe(true);
      done();
    });
  });
  describe("addItem", () => {
    it("Doesn't make request if no title is passed", async done => {
      const fakePost = sinon.fake();
      sinon.replace(rp, "post", fakePost);
      await addItem();
      expect(fakePost.notCalled).toBe(true);
      done();
    });
    it("Makes post request when title is defined", async done => {
      const fakePost = sinon.fake();
      sinon.replace(rp, "post", fakePost);
      await addItem("Title");
      expect(
        fakePost.calledOnceWithExactly({
          url: "http://localhost:3001/items",
          body: { title: "Title" },
          json: true
        })
      ).toBe(true);
      done();
    });
  });
  describe("deleteItem", () => {
    it("Doesn't make request if no id is passed", async done => {
      const fakeDelete = sinon.fake();
      sinon.replace(rp, "delete", fakeDelete);
      await deleteItem();
      expect(fakeDelete.notCalled).toBe(true);
      done();
    });
    it("Makes delete request when id is defined", async done => {
      const fakeDelete = sinon.fake();
      sinon.replace(rp, "delete", fakeDelete);
      await deleteItem(1);
      expect(fakeDelete.calledOnce).toBe(true);
      done();
    });
  });
});
