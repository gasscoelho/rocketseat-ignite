# Chapter II

In this chapter, we created an application using important concepts and tools such as `Styled Components`, `Mirage JS`, `Context API`, `hooks`, `Axios`, and more.

## Table of Contents

1. [Application Structure](#application-structure)
   1. [Create React App](#create-react-app)
   2. [Installing Styled Components](#installing-styled-components)
   3. [Creating Global Styles](#creating-global-styles)
   4. [Adding Fonts](#adding-fonts)
2. [Fetching API](#fetching-api)
   1. [Creating a Front-end without Back-end](#creating-a-front-end-without-back-end)
   2. [Configuring Mirage JS](#configuring-mirage-js)
3. [Modals](#modals)
4. [Context and Hooks](#context-and-hooks)

## Application Structure

Before we begin, is important to mention that all the examples provided in the next sections are a simplified code version. For a full version, we need to go to the source code of the application.

### Create React App

The `Create React App` is a comfortable environment for learning React and is the best way to start building a new single-page application in React.

Create React App doesn't handle backend logic or databases; It just creates a frontend build pipeline, so we can use it with any backend we want. Under the hood, it uses `Babel` and `webpack`.

To start a new project using `create-react-app` we can use the following command:

```sh
yarn create react-app <project_name> --template typescript
```

Once created, we can clean a little the project by deleting some files and folders. For example:

* Delete all files from `public` folder but `index.html`;
   * Remove the references from `manifest.json` and `png` files in the `index.html`;
* Delete all files from `src` folder but `App.tsx`, `index.tsx`, `react.app-env.d.ts`;
   * Remove the references from `index.tsx` and `App.tsx`;

Example on how the files should look like:

App.tsx

```tsx
export default function App() {
  return <div>Hello World</div>;
}
```

index.tsx

```tsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```
As mentioned before, the `babel` and `webpack` configurations are handled by the `create-react-app`. All of those configurations are encapsulated in a package called `react-scripts`.

By default, the `create-react-app` adds all the packages in the dependencies script. But some of those don't make sense to be used in a production environment. Because of that, I moved some of them to the `devDependencies` script.

package.json

```json
...
"devDependencies": {
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "@types/jest": "^26.0.15",
    "@types/node": "^12.0.0",
    "@types/react": "^17.0.0",
    "@types/react-dom": "^17.0.0",
    "typescript": "^4.1.2"
  },
...
```

**[⬆ back to top](#table-of-contents)**

### Installing Styled Components

Utilizing tagged template literals (a recent addition to JavaScript) and the power of CSS, `styled-components` allow us to write actual CSS code to style our components. It has a lot of features like chaining styles and etc.

```sh
yarn add styled-components
```

```sh
yarn add -D @types/styled-components
```

Example of a component with `styled-components`:

```tsx
import styled from "styled-components";

const Title = styled.h1`
  color: #8257e6;
`;

export default function App() {
  return <Title>Hello World</Title>;
}
```

**[⬆ back to top](#table-of-contents)**

### Creating Global Styles

Create a `./src/styles/global.ts` file:

```ts
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #F0F2F5;
    --red: #E52E4D;
    --blue: #5429CC;

    --blue-light: #6933FF;
    
    --text-title: #363F5F;
    --text-body: #969CB3;

    --background: #F0F2F5;
    --shape: #FFFFFF;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%; // 15px
    }

    @media (max-width: 720px) {
      font-size: 87.5%; // 14px
    }
  }

  body {
    background: var(---background);
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
```

After that, we can import it in our application:

App.tsx

```tsx
import { GlobalStyle } from "./styles/global";

export default function App() {
  return (
    <>
      <h1>Hello World</h1>
      <GlobalStyle />
    </>
  );
}
```

**[⬆ back to top](#table-of-contents)**

### Adding Fonts

For this application we are using the `Poppins` font from Google Fonts. To install, we need to get the `<link>` and add it in our `index.html` file: 

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link rel="shortcut icon" href="favicon.png" type="image/png" />

    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
      rel="stylesheet"
    />

    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

Then, we can reference it in our `global.ts`:

```ts
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --red: #E52E4D;
    --blue: #5429CC;
    --green: #33CC95;

    --blue-light: #6933FF;
    
    --text-title: #363F5F;
    --text-body: #969CB3;

    --background: #F0F2F5;
    --shape: #FFFFFF;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%; // 15px
    }

    @media (max-width: 720px) {
      font-size: 87.5%; // 14px
    }
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
```

**[⬆ back to top](#table-of-contents)**

## Fetching API

### Creating a Front-end without Back-end

When working on a project with different teams, is really common that in a moment the Front-end will finish a feature that's still a work in progress in the back-end. This means, the front-end kind of gets blocked because of that. So, to avoid that, we can mock fake APIs and use them until the endpoint is ready in the back-end. That's really good because enables us to test a full feature using an HTTP request, which is really different from just use simple static data.

Mirage JS is an API mocking library that lets you build, test, and share a complete working JavaScript application without having to rely on any backend services.

```sh
yarn add -D miragejs
```

`Axios` is a promise-based HTTP client for the browser and node.js.

```sh
yarn add axios
```

Once installed, we can create a `service` to encapsulate some default configurations for the `axios`:

./src/services/api.ts

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});
```

**[⬆ back to top](#table-of-contents)**

### Configuring Mirage JS

For this application two endpoints were created to fake a request. To do that, we had to add some configurations for `Mirage JS` in the `index.tsx` file:

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { createServer, Model } from "miragejs";
import App from "./App";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Freelance Website",
          type: "deposit",
          category: "Dev",
          amount: 6000,
          createdAt: new Date("2021-02-12 09:00:00"),
        },
        {
          id: 2,
          title: "Rent",
          type: "withdraw",
          category: "Home",
          amount: 1200,
          createdAt: new Date("2021-02-15 09:00:00"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create("transaction", data);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

Understanding the configurations:

* `createServer` creates the serve for the fake API;
* `Model` is a generic class used to create "entities";
* `seeds()` is a function used to load data. In this case, we are loading data with 2 transactions. 
* `routes()` is a function used to create the endpoints of our fake API.

**[⬆ back to top](#table-of-contents)**

## Modals

To facilitate the development we are using the `react-modal` that is a generic component used for `modals`.

```sh
yarn add react-modal
```

```sh
yarn add -D @types/react-modal
```

In the documentation of the components, is recommended to set an "App Element".

App.tsx

```tsx
import { useCallback, useState } from "react";
import { GlobalStyle } from "./styles/global";

import Modal from "react-modal";

...

Modal.setAppElement("#root");

export default function App() {
...
```

We can create custom css clases to overwrite the default styles of the component. 

* `overlayClassName`
* `className`

Since these styles would be used for every modal, the classes were created in the global styles. See the source code of `NewTransactionModal` for a full detailed example.

**[⬆ back to top](#table-of-contents)**

## Context and Hooks

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

In a typical React application, data is passed top-down (parent to child) via props, but such usage can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.

A full example can be found in the `useTransactions.tsx` where I'm creating a hook for the "transaction" to be used across different components.

In short, we need a `createContext` to create the context and then use the `Provider` passing the `value` that will be accessible for other components.

Once created, we need to add the `Provider` to the `App.tsx` file, so every component that is inside of the `Provider` will be able to use its `values`.

App.tsx

```tsx
import { useCallback, useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";

import Modal from "react-modal";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";

Modal.setAppElement("#root");

export default function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  const handleOpenNewTransactionModal = useCallback(() => {
    setIsNewTransactionModalOpen(true);
  }, []);

  const handleCloseNewTransactionModal = useCallback(() => {
    setIsNewTransactionModalOpen(false);
  }, []);

  return (
    <TransactionsProvider>
      <Header onOpenNewTransaction={handleOpenNewTransactionModal} />
      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </TransactionsProvider>
  );
}
```

To simplify the usage, I created a hook for the transaction. So, if we need to get information about a transaction we can easily use the `useTransaction()`.

For instance:

```tsx
...
export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

...

  await createTransaction({
      title,
      amount: value,
      category,
      type,
  });

...
```

```tsx
...
export function Summary() {
  const { transactions } = useTransactions();
...
```

**[⬆ back to top](#table-of-contents)**