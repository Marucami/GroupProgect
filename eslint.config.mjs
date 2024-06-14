import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  {"rules":
    {"no-console": "off",
    "import/extensions": ["error", "ignorePackages", {
    "js": "always"
    }]
    }
    }
];