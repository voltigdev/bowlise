import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("Add adapter", {
    description:
      "This generator creates a new database adapter package for bowlise.",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the package?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "packages/{{name}}/src/index.ts",
        templateFile: "templates/index.ts.hbs",
      },
      {
        type: "add",
        path: "packages/{{name}}/package.json",
        templateFile: "templates/package.json.hbs",
      },
      {
        type: "add",
        path: "packages/{{name}}/.eslintrc.js",
        templateFile: "templates/.eslintrc.js.hbs",
      },
      {
        type: "add",
        path: "packages/{{name}}/tsconfig.json",
        templateFile: "templates/tsconfig.json.hbs",
      },
    ],
  });
}
