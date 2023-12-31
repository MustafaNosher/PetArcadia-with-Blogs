import {
  defaultTheme_default,
  identifier_default,
  init_defaultTheme,
  init_esm,
  init_identifier
} from "./chunk-EPFSJFTN.js";
import {
  useTheme_default
} from "./chunk-YVPDQO7T.js";
import {
  __toESM,
  require_react
} from "./chunk-2FATVHAI.js";

// node_modules/@mui/material/styles/useTheme.js
var React = __toESM(require_react());
init_esm();
init_defaultTheme();
init_identifier();
function useTheme() {
  const theme = useTheme_default(defaultTheme_default);
  if (true) {
    React.useDebugValue(theme);
  }
  return theme[identifier_default] || theme;
}

export {
  useTheme
};
//# sourceMappingURL=chunk-6CNKWJGL.js.map
