"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
function dataBuilder(data) {
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
        let alphData = (0, utils_1.alphabetize)(dataBuilder(data));
        let sorted = true;
        for (let i = alphData.length - 1; i > 1; i--) {
            let after = alphData[i].toCompare;
            let before = alphData[i - 1].toCompare;
            if (after < before) {
                sorted = false;
            }
        }
        expect(sorted).toBe(true);
    });
    it("Should slice properly, even with out of bounds index", () => {
        let data = [1, 2, 3, 4, 5];
        let sliced = data.slice(0, 20);
        expect(sliced.length).toEqual(data.length);
    });
});
