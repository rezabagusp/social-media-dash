import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event'
import { BASE_API_URL } from '../../api/client';
import UserPost from './index';
import { render, screen, waitFor } from '../../lib/text.utils';

const MOCK_USER = {
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
}

const MOCK_USER_POSTS = [
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
];

export const handlers = [
  rest.get(`${BASE_API_URL}/users/:id`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(MOCK_USER)
    )
  }),
  rest.get(`${BASE_API_URL}/users/:id/posts`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(MOCK_USER_POSTS)
    )
  }),
  rest.delete(`${BASE_API_URL}/posts/:id`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({}),
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

describe('User post screen', () => {
  test('Should render user info', async () => {
    render(
      <UserPost />
    )

    expect(
      await screen.findByText(/Leanne Graham/i)
    ).toBeInTheDocument();
  })
  test('Should render user posts', async () => {
    render(
      <UserPost />
    )

    expect(
      await screen.findByText(/qui est esse/i)
    ).toBeInTheDocument();
  })
  test('Delete post', async () => {
    render(
      <UserPost />
    )

    expect(
      await screen.findByText(/qui est esse/i)
    ).toBeInTheDocument();

    const deleteBtn = await screen.findByRole('button', {  name: /delete/i});
    userEvent.click(deleteBtn);

    await waitFor(() => {
      expect(screen.getByRole('heading', {  name: /are sure want to delete this post \?/i})).toBeInTheDocument()
    })

    const yesBtn = await screen.findByRole('button', {  name: /yes/i});

    userEvent.click(yesBtn);

    await waitFor(() => {
      expect(screen.getByText(/No post found/i)).toBeInTheDocument()
    })
  })
  test('show new post modal', async () => {
    render(
      <UserPost />
      )
      
    // show modal after click 'add new post' btn
    const addBtn = await screen.findByRole('button', {  name: /add new post/i});
    userEvent.click(addBtn);

    expect(await screen.findByRole('heading', {  name: /user post/i})).toBeInTheDocument();
  })

  test('show edit new post modal', async () => {
    render(
      <UserPost />
      )
      
    // show modal after click 'add new post' btn
    const addBtn = await screen.findByRole('button', {  name: /edit/i});
    userEvent.click(addBtn);

    expect(await screen.findByRole('heading', {  name: /Edit Post/i})).toBeInTheDocument();
  })
})