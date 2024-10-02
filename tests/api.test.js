const request = require('supertest');
const { app } = require('../index');
const { getAllBooks, getBookById } = require('../books');
const http = require('http');

jest.mock('../books', () => ({
  ...jest.requireActual('../books'),
  getAllBooks: jest.fn(),
  getBookById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Book API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /books should return all books with status 200', async () => {
    const mockBooks = [
      {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
      {
        bookId: 2,
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
      },
    ];
    getAllBooks.mockReturnValue(mockBooks);

    const response = await request(server).get('/books');
    expect(response.status).toBe(200);
    expect(response.body.books).toEqual(mockBooks);
  });

  it('GET /books/details/:id should return a specific book by ID with status 200', async () => {
    const mockBook = {
      bookId: 1,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
    };
    getBookById.mockReturnValue(mockBook);

    const response = await request(server).get('/books/details/1');
    expect(response.status).toBe(200);
    expect(response.body.book).toEqual(mockBook);
  });

  it('GET /books should correctly invoke the getAllBooks function', async () => {
    const mockBooks = [
      {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
    ];
    getAllBooks.mockReturnValue(mockBooks);

    const response = await request(server).get('/books');
    expect(getAllBooks).toHaveBeenCalled();
    expect(response.body.books).toEqual(mockBooks);
  });
});
