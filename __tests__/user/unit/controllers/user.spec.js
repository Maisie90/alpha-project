const userController = require('../../../../backend/controllers/user');
const User = require('../../../../backend/models/user');

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

// mock response object used by controller methods
const mockRes = { status: mockStatus };

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
      expect(mockJson).toHaveBeenCalledWith(testUser)
    })

    it('should return an error upon failure', async () => {
      jest.spyOn(User, 'getAll').mockRejectedValue(new Error('Something happened to your db'))

      await userController.index(null, mockRes)
      
      expect(User.getAll).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(500)
      expect(mockJson).toHaveBeenCalledWith({ error: 'Something happened to your db' })
    })
  })

  describe('register', () => {
    const bcrypt = require('bcrypt')

    it('should create a user and return 201', async () => {
      const req = { body: { username: 'u', password: 'p', name: 'n', role: 'r' } }
      const created = { id: 1, username: 'u' }

      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('salt')
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed')
      jest.spyOn(User, 'create').mockResolvedValue(created)

      await userController.register(req, mockRes)

      expect(bcrypt.genSalt).toHaveBeenCalledTimes(1)
      expect(User.create).toHaveBeenCalledWith(expect.objectContaining({ username: 'u' }))
      expect(mockStatus).toHaveBeenCalledWith(201)
      expect(mockSend).toHaveBeenCalledWith(created)
    })

    it('should return 400 for missing fields', async () => {
      const req = { body: {} }
      await userController.register(req, mockRes)

      expect(mockStatus).toHaveBeenCalledWith(400)
      expect(mockJson).toHaveBeenCalledWith({ error: 'Username, password, name, and role are required.' })
    })

    it('should return 400 on create error', async () => {
      const req = { body: { username: 'u', password: 'p', name: 'n', role: 'r' } }
      const bcrypt = require('bcrypt')
      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('salt')
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed')
      jest.spyOn(User, 'create').mockRejectedValue(new Error('db failure'))

      await userController.register(req, mockRes)

      expect(User.create).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(400)
      expect(mockJson).toHaveBeenCalledWith({ error: 'db failure' })
    })
  })

  describe('login', () => {
    const bcrypt = require('bcrypt')
    const jwt = require('jsonwebtoken')

    it('should return token and role on successful login', async () => {
      const req = { body: { username: 'u', password: 'p' } }
      const user = { username: 'u', password: 'stored', role: 'teacher' }

      jest.spyOn(User, 'getOneByUsername').mockResolvedValue(user)
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true)
      jest.spyOn(jwt, 'sign').mockImplementation((payload, secret, opts, cb) => cb(null, 'tok123'))

      await userController.login(req, mockRes)

      expect(User.getOneByUsername).toHaveBeenCalledWith('u')
      expect(bcrypt.compare).toHaveBeenCalledWith('p', 'stored')
      expect(mockStatus).toHaveBeenCalledWith(200)
      expect(mockJson).toHaveBeenCalledWith({ success: true, token: 'tok123', role: 'teacher' })
    })

    it('should return 401 when authentication fails', async () => {
      const req = { body: { username: 'u', password: 'wrong' } }

      jest.spyOn(User, 'getOneByUsername').mockResolvedValue({ username: 'u', password: 'stored', role: 'r' })
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false)

      await userController.login(req, mockRes)

      expect(mockStatus).toHaveBeenCalledWith(401)
      expect(mockJson).toHaveBeenCalledWith({ error: 'User could not be authenticated' })
    })
  })

  describe('me', () => {
    it('should return profile when user present on req', async () => {
      const req = { user: { username: 'u1' } }
      const user = {
        id: 5,
        username: 'u1',
        password: 'secret',
        name: 'Name',
        role: 'student',
        imageUrl: 'img',
        createdAt: 'now',
      }

      jest.spyOn(User, 'getOneByUsername').mockResolvedValue(user)

      await userController.me(req, mockRes)

      expect(User.getOneByUsername).toHaveBeenCalledWith('u1')
      expect(mockStatus).toHaveBeenCalledWith(200)
      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({ username: 'u1', role: 'student' }))
    })

    it('should return 400 when token payload is invalid', async () => {
      const req = { }
      await userController.me(req, mockRes)

      expect(mockStatus).toHaveBeenCalledWith(400)
      expect(mockJson).toHaveBeenCalledWith({ error: 'Invalid token payload' })
    })
  })
})


