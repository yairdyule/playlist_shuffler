import { alphabetize, sortInput } from "../utils";

function dataBuilder(data: string[]): sortInput[] {
  return data.map((letter) => {
    return {
      toCompare: letter,
      uri: "",
    };
  });
}


describe("Utility tests", () => {
  it("Should alphabetize properly formed data", () => {
    let data = ["b", "a", "d", "ba", "ar", "zo", "a", "nl", "sl", "za", "e"];
    let alphData = alphabetize(dataBuilder(data));
    let sorted = true;

    for (let i = alphData.length-1; i > 1; i--) {
      let after = alphData[i].toCompare;
      let before = alphData[i-1].toCompare;
      if (after < before) {
        sorted = false;
      }
    }

    expect(sorted).toBe(true)

  });

  it("Should slice properly, even with out of bounds index", () => {
    let data = [1,2,3,4,5]
    let sliced = data.slice(0,20)

    expect(sliced.length).toEqual(data.length)
  })



});

