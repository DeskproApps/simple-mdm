import { getUsersFullName } from "../getUsersFullName";

const user1 = {
  "type": "device_user",
  "id": 5,
  "attributes": {
    "username": "userone",
    "full_name": "User One",
    "uid": 501,
  }
};
const user2 = {
  "type": "device_user",
  "id": 6,
  "attributes": {
    "username": "usertwo",
    "full_name": "User Two",
    "uid": 502,
  },
};
const user3 = {
  "type": "device_user",
  "id": 6,
  "attributes": {
    "username": "usertwo",
    "full_name": "",
    "uid": 502,
  },
};


describe("getUsersFullName", () => {
  test("should return names", () => {
    expect(getUsersFullName([user1] as never)).toEqual("User One");
    expect(getUsersFullName([user1, user3] as never)).toEqual("User One");
    expect(getUsersFullName([user1, user2, user3] as never)).toEqual("User One, User Two");
  });

  test("should return dash if user haven't fullName", () => {
    expect(getUsersFullName([user3] as never)).toEqual("-");
  });

  test("should return dash if haven't users", () => {
    expect(getUsersFullName([] as never)).toEqual("-");
  });

  test.each(
    [undefined, null, "", 0, true, false, {}]
  )("should return dash if users is wrong value: %p", (value) => {
    expect(getUsersFullName(value as never)).toEqual("-");
  });
});
