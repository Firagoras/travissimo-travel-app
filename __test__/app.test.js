const { handleSubmit, postData } = require('../src/client/js/app.js');
  
describe("Testing the submit functionality", () => {
  test("Testing the handleSubmit() function", () => {
    expect(handleSubmit).toBeDefined();
  })

  test("Testing the postData() function", () => {
    expect(postData).toBeDefined();
  })
});