import FirebaseApi from "@/api/FirebaseApi";

describe("FirebaseApi.js", () => {
  let api;
  beforeEach(() => {
    api = new FirebaseApi();
  });

  describe("FirebaseApi.fetchTable", () => {
    it("returns a promise if no API error is encountered", () => {
      expect(api.fetchTable() instanceof Promise).toBe(true);
    });
    it("returns an array of 100 objects to the then block if no error is thrown", done => {
      api.fetchTable().then(res => {
        expect(res instanceof Array).toBe(true);
        for (let row of res) {
          expect(row instanceof Object).toBe(true);
        }
        expect(res.length).toEqual(100);
        done();
      });
    });
  });
});
