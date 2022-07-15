<p align="center">
  <a href="https://festivalpass.com">
    <img alt="festivalPass" src="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1566025698/fp-content/fp-18_ovytfj.svg" />
  </a>
</p>

[FestivalPass website](https://festivalpass.com) using Gatsby

# 🚀 Quick start

1. **Set up nvm**

   This ensures that everyone uses the same node version for this project as specified by the `.nvmrc` file and [explained here](https://medium.com/@faith__ngetich/locking-down-a-project-to-a-specific-node-version-using-nvmrc-and-or-engines-e5fd19144245).

   ```shell
   nvm use
   ```

2. **Install dependencies**

   ```shell
   yarn
   ```

3. **Start developing.**

   ```shell
   yarn start
   ```

   The site is now running at [`http://localhost:8000`](http://localhost:8000).

   _Note: You'll also see a second link: _[`http://localhost:8000/___graphql`](http://localhost:8000/___graphql)_. This is a tool you can use to experiment with querying your data. Learn more [here](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

# 🔦 Project setup documentation

## Setting up eslint

Install dev dependencies for `eslint` in combination with `React`:

```shell
yarn add -D -E eslint
	eslint-config-react-app
	eslint-plugin-flowtype
	eslint-plugin-import
	eslint-plugin-jsx-a11y
	eslint-plugin-react
	eslint-plugin-react-hooks
	babel-eslint
	@typescript-eslint/parser
	@typescript-eslint/eslint-plugin
```

And finally configure `eslint` with a `.eslintrc.json` file:

```json
{
  "extends": ["react-app"],
  "rules": {}
}
```

So most of the configuration work is done by `eslint-config-react-app`, but it does have several `peerDependencies` as specified [here](https://github.com/facebook/create-react-app/blob/master/packages/eslint-config-react-app/package.json). Those are installed as `devDependencies` above. In theory, those are already included indirectly because they are dependencies of `gatsby`, however we include them either way so it's explicitly clear when inspecting the `.eslintrc.json` of the project for example. We also maintain control over the versions in this way.

## Setting up prettier

### Default setup

Install dev dependencies to install `prettier`:

```shell
yarn add -D -E prettier
```

We add a `.prettierignore` file to specify which files `prettier` should ignore:

```
.cache
package.json
package-lock.json
public
```

We include our rules for `prettier` in the `package.json` file:

```json
{
  "prettier": {
    "singleQuote": true,
    "printWidth": 100
  }
}
```

### Add eslint integration

Install dev dependencies to integrate `prettier` with eslint:

```shell
yarn add -D -E eslint-config-prettier eslint-plugin-prettier
```

We extend the `.eslintrc.json` file to include `prettier`:

```json
{
  "extends": ["react-app", "prettier", "prettier/react"],
  "rules": {}
}
```

### Format script

Prettier formatting can now already be applied with a common rule set. There are several ways of doing this. The most convenient way is to install an editor [plugins](https://prettier.io/docs/en/editors.html), which will identify the rules as specified by the project and apply it for example upon saving a file.

We can also add a script to the `package.json` file:

```json
{
  "scripts": {
    "format": "prettier --write '**/*.{js,jsx,ts,tsx,md,json,yaml,html}'"
  }
}
```

Now we can apply formatting to all the relevant project files by running `yarn format`

### Pre-commit script

To still get the benefits of a consitently formatted codebase we include a pre-commit script so that committed files have the formatting applied no matter which editor it was edited in.

Let's install the devDependencies:

```shell
yarn add -D -E husky pretty-quick
```

And add the following to the `package.json` file:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "pretty-quick --staged"
    }
  }
}
```

Now each time a developer commits code to the repo, the staged files will have the code formatting applied.

## Typescript

### Default setup

We install the dev dependencies for Typescript:

```shell
yarn add -D -E typescript
	@types/node
	@types/react
	@types/react-dom
```

Typescript can be configured more specifically using the `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "declaration": false,
    "esModuleInterop": true,
    "importHelpers": true,
    "jsx": "react",
    "lib": ["dom", "es2015", "es2017"],
    "module": "commonjs",
    "noEmitHelpers": false,
    "noImplicitAny": true,
    "noResolve": false,
    "noUnusedLocals": true,
    "noUnusedParameters": false,
    "preserveConstEnums": true,
    "removeComments": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strictNullChecks": true,
    "target": "esnext"
  },
  "include": ["./src/**/*"]
}
```

The above one seems to work for us, however I am not 100% sure what the ideal setup is so there's room for tweaking if we want that.

### Types for other dependencies

Many projects have types included in the project so don't need work to enable it.

Other projects have their types managed by the community through the the [definitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) repo, which can be installed with the `@types/project-name` syntax. For example `styled-components` is a dependency so we install the types like so:

```shell
yarn add -D -E @types/styled-components
```

Most projects with some degree of adoption have types available. However, they can be missing and in that case, they can be declared in our project in a `declarations.d.ts` file (see [more info](https://github.com/gatsbyjs/gatsby/blob/master/examples/using-typescript/src/declarations.d.ts)).

### Typescript with Gatsby

Typescript is [supported out of the box](https://www.gatsbyjs.org/docs/typescript/) by Gatsby. It however [does not take care of type checking](https://www.gatsbyjs.org/packages/gatsby-plugin-typescript/#type-checking) itself. That part is handled well by the editor, VS Code is very good at it. However, we can still include type checking in the `package.json` file:

```json
{
  "scripts": {
    "type-check": "tsc --noEmit",
    "type-check:watch": "npm run type-check -- --watch"
  }
}
```

So in case a developer prefers to use any editor that without Typescript type checking, he can have a terminal tab opened, running `yarn type-check:watch`.
