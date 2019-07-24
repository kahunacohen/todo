import sinon from "sinon";
import rp from "request-promise-native";

import api from './api';


describe("api", () => {
  afterEach(() => {
    sinon.restore();
  });
  describe("getItems", () => {
    it("returns a promise with valid item JSON", async done => {
      sinon.replace(
        rp,
        "get",
        sinon.fake(async () => '[{"title": "foo","id": 1}]')
      );
      const items = await api.getItems();
      expect(items[0].title === "foo" && items[0].id === 1).toBe(true);
      done();
    });
  });
  describe("addItem", () => {
    it("Doesn't make request if no title is passed", async done => {
      const fakePost = sinon.fake();
      sinon.replace(rp, "post", fakePost);
      await api.addItem();
      expect(fakePost.notCalled).toBe(true);
      done();
    });
    it("Makes post request when title is defined", async done => {
      const fakePost = sinon.fake();
      sinon.replace(rp, "post", fakePost);
      await api.addItem("Title");
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
      await api.deleteItem();
      expect(fakeDelete.notCalled).toBe(true);
      done();
    });
    it("Makes delete request when id is defined", async done => {
      const fakeDelete = sinon.fake();
      sinon.replace(rp, "delete", fakeDelete);
      await api.deleteItem(1);
      expect(fakeDelete.calledOnce).toBe(true);
      done();
    });
  });
  describe("markDone", () => {
    it("Doesn't make request if no id is passed", async done => {
      const fakePatch = sinon.fake();
      sinon.replace(rp, "patch", fakePatch);
      await api.markDone();
      expect(fakePatch.notCalled).toBe(true);
      done();
    });
    it("Makes patch request when id is defined", async done => {
      const fakePatch = sinon.fake();
      sinon.replace(rp, "patch", fakePatch);
      await api.markDone(1);
      expect(
        fakePatch.calledOnceWithExactly({
          url: "http://localhost:3001/items/1",
          body: { done: true },
          json: true
        })
      ).toBe(true);
      done();
    });
  });
  describe("marUndone", () => {
    it("Doesn't make request if no id is passed", async done => {
      const fakePatch = sinon.fake();
      sinon.replace(rp, "patch", fakePatch);
      await api.markUndone();
      expect(fakePatch.notCalled).toBe(true);
      done();
    });
    it("Makes patch request when id is defined", async done => {
      const fakePatch = sinon.fake();
      sinon.replace(rp, "patch", fakePatch);
      await api.markUndone(1);
      expect(
        fakePatch.calledOnceWithExactly({
          url: "http://localhost:3001/items/1",
          body: { done: false },
          json: true
        })
      ).toBe(true);
      done();
    });
  });
});
