import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BASE_API_URL } from '../../api/client';
import HomeScreen from './index';
import { render, screen } from '../../lib/text.utils';

const MOCK = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496"
      }
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets"
    }
  },
];

export const handlers = [
  rest.get(`${BASE_API_URL}/users`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(MOCK)
    )
  })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen({
  onUnhandledRequest: 'error',
}))

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('Home screen', () => {
  test('Should render and show user list', async () => {
    render(
      <HomeScreen />
    )

    // should show loading indicator
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
    expect(
      await screen.findByText(/Leanne Graham/i)
    ).toBeInTheDocument();
  })
})