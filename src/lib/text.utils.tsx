// test-utils.jsx
import React, { ReactNode } from 'react'
import {BrowserRouter as Router} from 'react-router-dom';
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../app/store';

function render(
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
) {
  function Wrapper({ children }: {children: ReactNode}) {
    return (
      <Provider store={store}>
        <Router>
          {children}
        </Router>
      </Provider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper  })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }