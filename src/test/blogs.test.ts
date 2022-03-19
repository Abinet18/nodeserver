
import { Beacon } from "../models/beacons";

describe("test create blog", () => {
  const blog: Beacon = {
    id: "test_id",
    metrics: "test"
  };

  test("Should have blog created", async () => {
    const mockCreateBlog = jest.fn((b: Beacon) => {
      console.log("mock create called", b);
      return b;
    });
    const title = await mockCreateBlog(blog).metrics
    expect('test' === title).toBe(true)
  });
});

