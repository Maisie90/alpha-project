const userController = require('../backend/controllers/user');
const User = require('../backend/models/user');

// Mocking response methods
const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(() => ({ 
  send: mockSend, 
  json: mockJson, 
  end: mockEnd 
}));

describe('User controller', () => {
  beforeEach(() => jest.clearAllMocks())

  afterAll(() => jest.resetAllMocks())

  describe('index', () => {
    it('should return goats with a status code 200', async () => {
      const testUser = ['g1', 'g2']
      jest.spyOn(User, 'getAll').mockResolvedValue(testUser)

      await userController.index(null, mockRes)
      
      expect(User.getAll).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(200)
      expect(mockSend).toHaveBeenCalledWith({ data: testUser })
    })

    it('should return an error upon failure', async () => {
      jest.spyOn(User, 'getAll').mockRejectedValue(new Error('Something happened to your db'))

      await userController.index(null, mockRes)
      
      expect(User.getAll).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(500)
      expect(mockSend).toHaveBeenCalledWith({ error: 'Something happened to your db' })
    })
  })
})


