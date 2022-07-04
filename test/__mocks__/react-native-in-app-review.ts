module.exports = {
  RequestInAppReview: jest.fn(() => Promise.resolve(true)),
  isAvailable: jest.fn(() => true),
}
