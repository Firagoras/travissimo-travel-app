import { daysDiff } from '../src/server/server.js';
  
describe("Testing server functionality", () => {
  test("Testing the daysDiff() function", () => {
    expect(daysDiff).toBeDefined();
    
    const firstDate = new Date(2022, 1, 10).getTime();
    const secondDate = new Date(2022, 1, 25).getTime();
    expect(daysDiff(firstDate, secondDate)).toBe(15);
    expect(daysDiff(secondDate, firstDate)).toBe(15);
  });
});