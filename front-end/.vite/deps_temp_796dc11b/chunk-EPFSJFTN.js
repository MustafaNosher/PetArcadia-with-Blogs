import {
  GlobalStyles,
  ThemeContext,
  borders_default,
  clsx_default,
  compose_default,
  createStyled,
  createTheme_default,
  createUnarySpacing,
  cssGrid_default,
  defaultSxConfig_default,
  extendSxProp,
  getValue,
  handleBreakpoints,
  init_Grid,
  init_Unstable_Grid,
  init_borders,
  init_breakpoints,
  init_clsx,
  init_compose,
  init_createBreakpoints,
  init_createSpacing,
  init_createStyled,
  init_createTheme,
  init_cssGrid,
  init_palette,
  init_responsivePropType,
  init_shape,
  init_sizing,
  init_spacing,
  init_style,
  init_styleFunctionSx,
  init_styled,
  init_styled_engine,
  init_useTheme,
  init_useThemeProps,
  init_useThemeWithoutDefault,
  mergeBreakpointsInOrder,
  palette_default,
  resolveBreakpointValues,
  shouldForwardProp,
  sizing_default,
  spacing_default,
  styleFunctionSx_default,
  style_default,
  styled,
  styled_default,
  useThemeProps,
  useThemeWithoutDefault_default,
  useTheme_default
} from "./chunk-YVPDQO7T.js";
import {
  _extends,
  _objectWithoutPropertiesLoose,
  capitalize,
  composeClasses,
  deepmerge,
  exactProp,
  generateUtilityClass,
  generateUtilityClasses,
  init_esm,
  init_extends,
  init_objectWithoutPropertiesLoose,
  require_jsx_runtime,
  require_prop_types
} from "./chunk-GOL4A234.js";
import {
  __esm,
  __toESM,
  require_react
} from "./chunk-2FATVHAI.js";

// node_modules/@mui/system/esm/colorManipulator.js
function clamp(value, min = 0, max = 1) {
  if (true) {
    if (value < min || value > max) {
      console.error(`MUI: The value provided ${value} is out of range [${min}, ${max}].`);
    }
  }
  return Math.min(Math.max(min, value), max);
}
function hexToRgb(color) {
  color = color.slice(1);
  const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, "g");
  let colors = color.match(re);
  if (colors && colors[0].length === 1) {
    colors = colors.map((n) => n + n);
  }
  return colors ? `rgb${colors.length === 4 ? "a" : ""}(${colors.map((n, index) => {
    return index < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3;
  }).join(", ")})` : "";
}
function intToHex(int) {
  const hex = int.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}
function decomposeColor(color) {
  if (color.type) {
    return color;
  }
  if (color.charAt(0) === "#") {
    return decomposeColor(hexToRgb(color));
  }
  const marker = color.indexOf("(");
  const type = color.substring(0, marker);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(type) === -1) {
    throw new Error(true ? `MUI: Unsupported \`${color}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : formatMuiErrorMessage(9, color));
  }
  let values = color.substring(marker + 1, color.length - 1);
  let colorSpace;
  if (type === "color") {
    values = values.split(" ");
    colorSpace = values.shift();
    if (values.length === 4 && values[3].charAt(0) === "/") {
      values[3] = values[3].slice(1);
    }
    if (["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(colorSpace) === -1) {
      throw new Error(true ? `MUI: unsupported \`${colorSpace}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : formatMuiErrorMessage(10, colorSpace));
    }
  } else {
    values = values.split(",");
  }
  values = values.map((value) => parseFloat(value));
  return {
    type,
    values,
    colorSpace
  };
}
function recomposeColor(color) {
  const {
    type,
    colorSpace
  } = color;
  let {
    values
  } = color;
  if (type.indexOf("rgb") !== -1) {
    values = values.map((n, i) => i < 3 ? parseInt(n, 10) : n);
  } else if (type.indexOf("hsl") !== -1) {
    values[1] = `${values[1]}%`;
    values[2] = `${values[2]}%`;
  }
  if (type.indexOf("color") !== -1) {
    values = `${colorSpace} ${values.join(" ")}`;
  } else {
    values = `${values.join(", ")}`;
  }
  return `${type}(${values})`;
}
function rgbToHex(color) {
  if (color.indexOf("#") === 0) {
    return color;
  }
  const {
    values
  } = decomposeColor(color);
  return `#${values.map((n, i) => intToHex(i === 3 ? Math.round(255 * n) : n)).join("")}`;
}
function hslToRgb(color) {
  color = decomposeColor(color);
  const {
    values
  } = color;
  const h = values[0];
  const s = values[1] / 100;
  const l = values[2] / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  let type = "rgb";
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
  if (color.type === "hsla") {
    type += "a";
    rgb.push(values[3]);
  }
  return recomposeColor({
    type,
    values: rgb
  });
}
function getLuminance(color) {
  color = decomposeColor(color);
  let rgb = color.type === "hsl" || color.type === "hsla" ? decomposeColor(hslToRgb(color)).values : color.values;
  rgb = rgb.map((val) => {
    if (color.type !== "color") {
      val /= 255;
    }
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
}
function getContrastRatio(foreground, background) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
function alpha(color, value) {
  color = decomposeColor(color);
  value = clamp(value);
  if (color.type === "rgb" || color.type === "hsl") {
    color.type += "a";
  }
  if (color.type === "color") {
    color.values[3] = `/${value}`;
  } else {
    color.values[3] = value;
  }
  return recomposeColor(color);
}
function private_safeAlpha(color, value, warning) {
  try {
    return alpha(color, value);
  } catch (error) {
    if (warning && true) {
      console.warn(warning);
    }
    return color;
  }
}
function darken(color, coefficient) {
  color = decomposeColor(color);
  coefficient = clamp(coefficient);
  if (color.type.indexOf("hsl") !== -1) {
    color.values[2] *= 1 - coefficient;
  } else if (color.type.indexOf("rgb") !== -1 || color.type.indexOf("color") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color.values[i] *= 1 - coefficient;
    }
  }
  return recomposeColor(color);
}
function private_safeDarken(color, coefficient, warning) {
  try {
    return darken(color, coefficient);
  } catch (error) {
    if (warning && true) {
      console.warn(warning);
    }
    return color;
  }
}
function lighten(color, coefficient) {
  color = decomposeColor(color);
  coefficient = clamp(coefficient);
  if (color.type.indexOf("hsl") !== -1) {
    color.values[2] += (100 - color.values[2]) * coefficient;
  } else if (color.type.indexOf("rgb") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color.values[i] += (255 - color.values[i]) * coefficient;
    }
  } else if (color.type.indexOf("color") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color.values[i] += (1 - color.values[i]) * coefficient;
    }
  }
  return recomposeColor(color);
}
function private_safeLighten(color, coefficient, warning) {
  try {
    return lighten(color, coefficient);
  } catch (error) {
    if (warning && true) {
      console.warn(warning);
    }
    return color;
  }
}
function emphasize(color, coefficient = 0.15) {
  return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
}
function private_safeEmphasize(color, coefficient, warning) {
  try {
    return private_safeEmphasize(color, coefficient);
  } catch (error) {
    if (warning && true) {
      console.warn(warning);
    }
    return color;
  }
}
var colorChannel, private_safeColorChannel;
var init_colorManipulator = __esm({
  "node_modules/@mui/system/esm/colorManipulator.js"() {
    init_esm();
    colorChannel = (color) => {
      const decomposedColor = decomposeColor(color);
      return decomposedColor.values.slice(0, 3).map((val, idx) => decomposedColor.type.indexOf("hsl") !== -1 && idx !== 0 ? `${val}%` : val).join(" ");
    };
    private_safeColorChannel = (color, warning) => {
      try {
        return colorChannel(color);
      } catch (error) {
        if (warning && true) {
          console.warn(warning);
        }
        return color;
      }
    };
  }
});

// node_modules/@mui/system/esm/GlobalStyles/GlobalStyles.js
function GlobalStyles2({
  styles,
  themeId,
  defaultTheme: defaultTheme4 = {}
}) {
  const upperTheme = useTheme_default(defaultTheme4);
  const globalStyles = typeof styles === "function" ? styles(themeId ? upperTheme[themeId] || upperTheme : upperTheme) : styles;
  return (0, import_jsx_runtime.jsx)(GlobalStyles, {
    styles: globalStyles
  });
}
var React, import_prop_types, import_jsx_runtime, GlobalStyles_default;
var init_GlobalStyles = __esm({
  "node_modules/@mui/system/esm/GlobalStyles/GlobalStyles.js"() {
    "use client";
    React = __toESM(require_react());
    import_prop_types = __toESM(require_prop_types());
    init_styled_engine();
    init_useTheme();
    import_jsx_runtime = __toESM(require_jsx_runtime());
    true ? GlobalStyles2.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * @ignore
       */
      defaultTheme: import_prop_types.default.object,
      /**
       * @ignore
       */
      styles: import_prop_types.default.oneOfType([import_prop_types.default.array, import_prop_types.default.func, import_prop_types.default.number, import_prop_types.default.object, import_prop_types.default.string, import_prop_types.default.bool]),
      /**
       * @ignore
       */
      themeId: import_prop_types.default.string
    } : void 0;
    GlobalStyles_default = GlobalStyles2;
  }
});

// node_modules/@mui/system/esm/GlobalStyles/index.js
var init_GlobalStyles2 = __esm({
  "node_modules/@mui/system/esm/GlobalStyles/index.js"() {
    "use client";
    init_GlobalStyles();
    init_GlobalStyles();
  }
});

// node_modules/@mui/system/esm/display.js
var displayPrint, displayRaw, overflow, textOverflow, visibility, whiteSpace, display_default;
var init_display = __esm({
  "node_modules/@mui/system/esm/display.js"() {
    init_style();
    init_compose();
    displayPrint = style_default({
      prop: "displayPrint",
      cssProperty: false,
      transform: (value) => ({
        "@media print": {
          display: value
        }
      })
    });
    displayRaw = style_default({
      prop: "display"
    });
    overflow = style_default({
      prop: "overflow"
    });
    textOverflow = style_default({
      prop: "textOverflow"
    });
    visibility = style_default({
      prop: "visibility"
    });
    whiteSpace = style_default({
      prop: "whiteSpace"
    });
    display_default = compose_default(displayPrint, displayRaw, overflow, textOverflow, visibility, whiteSpace);
  }
});

// node_modules/@mui/system/esm/flexbox.js
var flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf, flexbox, flexbox_default;
var init_flexbox = __esm({
  "node_modules/@mui/system/esm/flexbox.js"() {
    init_style();
    init_compose();
    flexBasis = style_default({
      prop: "flexBasis"
    });
    flexDirection = style_default({
      prop: "flexDirection"
    });
    flexWrap = style_default({
      prop: "flexWrap"
    });
    justifyContent = style_default({
      prop: "justifyContent"
    });
    alignItems = style_default({
      prop: "alignItems"
    });
    alignContent = style_default({
      prop: "alignContent"
    });
    order = style_default({
      prop: "order"
    });
    flex = style_default({
      prop: "flex"
    });
    flexGrow = style_default({
      prop: "flexGrow"
    });
    flexShrink = style_default({
      prop: "flexShrink"
    });
    alignSelf = style_default({
      prop: "alignSelf"
    });
    justifyItems = style_default({
      prop: "justifyItems"
    });
    justifySelf = style_default({
      prop: "justifySelf"
    });
    flexbox = compose_default(flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf);
    flexbox_default = flexbox;
  }
});

// node_modules/@mui/system/esm/positions.js
var position, zIndex, top, right, bottom, left, positions_default;
var init_positions = __esm({
  "node_modules/@mui/system/esm/positions.js"() {
    init_style();
    init_compose();
    position = style_default({
      prop: "position"
    });
    zIndex = style_default({
      prop: "zIndex",
      themeKey: "zIndex"
    });
    top = style_default({
      prop: "top"
    });
    right = style_default({
      prop: "right"
    });
    bottom = style_default({
      prop: "bottom"
    });
    left = style_default({
      prop: "left"
    });
    positions_default = compose_default(position, zIndex, top, right, bottom, left);
  }
});

// node_modules/@mui/system/esm/shadows.js
var boxShadow, shadows_default;
var init_shadows = __esm({
  "node_modules/@mui/system/esm/shadows.js"() {
    init_style();
    boxShadow = style_default({
      prop: "boxShadow",
      themeKey: "shadows"
    });
    shadows_default = boxShadow;
  }
});

// node_modules/@mui/system/esm/typography.js
var fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, textTransform, lineHeight, textAlign, typographyVariant, typography, typography_default;
var init_typography = __esm({
  "node_modules/@mui/system/esm/typography.js"() {
    init_style();
    init_compose();
    fontFamily = style_default({
      prop: "fontFamily",
      themeKey: "typography"
    });
    fontSize = style_default({
      prop: "fontSize",
      themeKey: "typography"
    });
    fontStyle = style_default({
      prop: "fontStyle",
      themeKey: "typography"
    });
    fontWeight = style_default({
      prop: "fontWeight",
      themeKey: "typography"
    });
    letterSpacing = style_default({
      prop: "letterSpacing"
    });
    textTransform = style_default({
      prop: "textTransform"
    });
    lineHeight = style_default({
      prop: "lineHeight"
    });
    textAlign = style_default({
      prop: "textAlign"
    });
    typographyVariant = style_default({
      prop: "typography",
      cssProperty: false,
      themeKey: "typography"
    });
    typography = compose_default(typographyVariant, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign, textTransform);
    typography_default = typography;
  }
});

// node_modules/@mui/system/esm/getThemeValue.js
var filterPropsMapping, styleFunctionMapping, propToStyleFunction;
var init_getThemeValue = __esm({
  "node_modules/@mui/system/esm/getThemeValue.js"() {
    init_borders();
    init_display();
    init_flexbox();
    init_cssGrid();
    init_positions();
    init_palette();
    init_shadows();
    init_sizing();
    init_spacing();
    init_typography();
    filterPropsMapping = {
      borders: borders_default.filterProps,
      display: display_default.filterProps,
      flexbox: flexbox_default.filterProps,
      grid: cssGrid_default.filterProps,
      positions: positions_default.filterProps,
      palette: palette_default.filterProps,
      shadows: shadows_default.filterProps,
      sizing: sizing_default.filterProps,
      spacing: spacing_default.filterProps,
      typography: typography_default.filterProps
    };
    styleFunctionMapping = {
      borders: borders_default,
      display: display_default,
      flexbox: flexbox_default,
      grid: cssGrid_default,
      positions: positions_default,
      palette: palette_default,
      shadows: shadows_default,
      sizing: sizing_default,
      spacing: spacing_default,
      typography: typography_default
    };
    propToStyleFunction = Object.keys(filterPropsMapping).reduce((acc, styleFnName) => {
      filterPropsMapping[styleFnName].forEach((propName) => {
        acc[propName] = styleFunctionMapping[styleFnName];
      });
      return acc;
    }, {});
  }
});

// node_modules/@mui/system/esm/createBox.js
function createBox(options = {}) {
  const {
    themeId,
    defaultTheme: defaultTheme4,
    defaultClassName = "MuiBox-root",
    generateClassName
  } = options;
  const BoxRoot = styled("div", {
    shouldForwardProp: (prop) => prop !== "theme" && prop !== "sx" && prop !== "as"
  })(styleFunctionSx_default);
  const Box2 = React2.forwardRef(function Box3(inProps, ref) {
    const theme = useTheme_default(defaultTheme4);
    const _extendSxProp = extendSxProp(inProps), {
      className,
      component = "div"
    } = _extendSxProp, other = _objectWithoutPropertiesLoose(_extendSxProp, _excluded);
    return (0, import_jsx_runtime2.jsx)(BoxRoot, _extends({
      as: component,
      ref,
      className: clsx_default(className, generateClassName ? generateClassName(defaultClassName) : defaultClassName),
      theme: themeId ? theme[themeId] || theme : theme
    }, other));
  });
  return Box2;
}
var React2, import_jsx_runtime2, _excluded;
var init_createBox = __esm({
  "node_modules/@mui/system/esm/createBox.js"() {
    "use client";
    init_extends();
    init_objectWithoutPropertiesLoose();
    React2 = __toESM(require_react());
    init_clsx();
    init_styled_engine();
    init_styleFunctionSx();
    init_useTheme();
    import_jsx_runtime2 = __toESM(require_jsx_runtime());
    _excluded = ["className", "component"];
  }
});

// node_modules/@mui/system/esm/Box/Box.js
var import_prop_types2, Box;
var init_Box = __esm({
  "node_modules/@mui/system/esm/Box/Box.js"() {
    "use client";
    import_prop_types2 = __toESM(require_prop_types());
    init_createBox();
    Box = createBox();
    true ? Box.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit the d.ts file and run "yarn proptypes"     |
      // ----------------------------------------------------------------------
      /**
       * @ignore
       */
      children: import_prop_types2.default.node,
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: import_prop_types2.default.elementType,
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx: import_prop_types2.default.oneOfType([import_prop_types2.default.arrayOf(import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object, import_prop_types2.default.bool])), import_prop_types2.default.func, import_prop_types2.default.object])
    } : void 0;
  }
});

// node_modules/@mui/system/esm/Box/index.js
var init_Box2 = __esm({
  "node_modules/@mui/system/esm/Box/index.js"() {
    "use client";
    init_Box();
  }
});

// node_modules/@mui/private-theming/useTheme/ThemeContext.js
var React3, ThemeContext2, ThemeContext_default;
var init_ThemeContext = __esm({
  "node_modules/@mui/private-theming/useTheme/ThemeContext.js"() {
    React3 = __toESM(require_react());
    ThemeContext2 = React3.createContext(null);
    if (true) {
      ThemeContext2.displayName = "ThemeContext";
    }
    ThemeContext_default = ThemeContext2;
  }
});

// node_modules/@mui/private-theming/useTheme/useTheme.js
function useTheme() {
  const theme = React4.useContext(ThemeContext_default);
  if (true) {
    React4.useDebugValue(theme);
  }
  return theme;
}
var React4;
var init_useTheme2 = __esm({
  "node_modules/@mui/private-theming/useTheme/useTheme.js"() {
    React4 = __toESM(require_react());
    init_ThemeContext();
  }
});

// node_modules/@mui/private-theming/useTheme/index.js
var init_useTheme3 = __esm({
  "node_modules/@mui/private-theming/useTheme/index.js"() {
    init_useTheme2();
  }
});

// node_modules/@mui/private-theming/ThemeProvider/nested.js
var hasSymbol, nested_default;
var init_nested = __esm({
  "node_modules/@mui/private-theming/ThemeProvider/nested.js"() {
    hasSymbol = typeof Symbol === "function" && Symbol.for;
    nested_default = hasSymbol ? Symbol.for("mui.nested") : "__THEME_NESTED__";
  }
});

// node_modules/@mui/private-theming/ThemeProvider/ThemeProvider.js
function mergeOuterLocalTheme(outerTheme, localTheme) {
  if (typeof localTheme === "function") {
    const mergedTheme = localTheme(outerTheme);
    if (true) {
      if (!mergedTheme) {
        console.error(["MUI: You should return an object from your theme function, i.e.", "<ThemeProvider theme={() => ({})} />"].join("\n"));
      }
    }
    return mergedTheme;
  }
  return _extends({}, outerTheme, localTheme);
}
function ThemeProvider(props) {
  const {
    children,
    theme: localTheme
  } = props;
  const outerTheme = useTheme();
  if (true) {
    if (outerTheme === null && typeof localTheme === "function") {
      console.error(["MUI: You are providing a theme function prop to the ThemeProvider component:", "<ThemeProvider theme={outerTheme => outerTheme} />", "", "However, no outer theme is present.", "Make sure a theme is already injected higher in the React tree or provide a theme object."].join("\n"));
    }
  }
  const theme = React5.useMemo(() => {
    const output = outerTheme === null ? localTheme : mergeOuterLocalTheme(outerTheme, localTheme);
    if (output != null) {
      output[nested_default] = outerTheme !== null;
    }
    return output;
  }, [localTheme, outerTheme]);
  return (0, import_jsx_runtime3.jsx)(ThemeContext_default.Provider, {
    value: theme,
    children
  });
}
var React5, import_prop_types3, import_jsx_runtime3, ThemeProvider_default;
var init_ThemeProvider = __esm({
  "node_modules/@mui/private-theming/ThemeProvider/ThemeProvider.js"() {
    init_extends();
    React5 = __toESM(require_react());
    import_prop_types3 = __toESM(require_prop_types());
    init_esm();
    init_ThemeContext();
    init_useTheme3();
    init_nested();
    import_jsx_runtime3 = __toESM(require_jsx_runtime());
    true ? ThemeProvider.propTypes = {
      /**
       * Your component tree.
       */
      children: import_prop_types3.default.node,
      /**
       * A theme object. You can provide a function to extend the outer theme.
       */
      theme: import_prop_types3.default.oneOfType([import_prop_types3.default.object, import_prop_types3.default.func]).isRequired
    } : void 0;
    if (true) {
      true ? ThemeProvider.propTypes = exactProp(ThemeProvider.propTypes) : void 0;
    }
    ThemeProvider_default = ThemeProvider;
  }
});

// node_modules/@mui/private-theming/ThemeProvider/index.js
var init_ThemeProvider2 = __esm({
  "node_modules/@mui/private-theming/ThemeProvider/index.js"() {
    init_ThemeProvider();
    init_nested();
  }
});

// node_modules/@mui/private-theming/index.js
var init_private_theming = __esm({
  "node_modules/@mui/private-theming/index.js"() {
    init_ThemeProvider2();
    init_ThemeProvider2();
    init_useTheme3();
  }
});

// node_modules/@mui/system/esm/ThemeProvider/ThemeProvider.js
function useThemeScoping(themeId, upperTheme, localTheme, isPrivate = false) {
  return React6.useMemo(() => {
    const resolvedTheme = themeId ? upperTheme[themeId] || upperTheme : upperTheme;
    if (typeof localTheme === "function") {
      const mergedTheme = localTheme(resolvedTheme);
      const result = themeId ? _extends({}, upperTheme, {
        [themeId]: mergedTheme
      }) : mergedTheme;
      if (isPrivate) {
        return () => result;
      }
      return result;
    }
    return themeId ? _extends({}, upperTheme, {
      [themeId]: localTheme
    }) : _extends({}, upperTheme, localTheme);
  }, [themeId, upperTheme, localTheme, isPrivate]);
}
function ThemeProvider2(props) {
  const {
    children,
    theme: localTheme,
    themeId
  } = props;
  const upperTheme = useThemeWithoutDefault_default(EMPTY_THEME);
  const upperPrivateTheme = useTheme() || EMPTY_THEME;
  if (true) {
    if (upperTheme === null && typeof localTheme === "function" || themeId && upperTheme && !upperTheme[themeId] && typeof localTheme === "function") {
      console.error(["MUI: You are providing a theme function prop to the ThemeProvider component:", "<ThemeProvider theme={outerTheme => outerTheme} />", "", "However, no outer theme is present.", "Make sure a theme is already injected higher in the React tree or provide a theme object."].join("\n"));
    }
  }
  const engineTheme = useThemeScoping(themeId, upperTheme, localTheme);
  const privateTheme = useThemeScoping(themeId, upperPrivateTheme, localTheme, true);
  return (0, import_jsx_runtime4.jsx)(ThemeProvider_default, {
    theme: privateTheme,
    children: (0, import_jsx_runtime4.jsx)(ThemeContext.Provider, {
      value: engineTheme,
      children
    })
  });
}
var React6, import_prop_types4, import_jsx_runtime4, EMPTY_THEME, ThemeProvider_default2;
var init_ThemeProvider3 = __esm({
  "node_modules/@mui/system/esm/ThemeProvider/ThemeProvider.js"() {
    "use client";
    init_extends();
    React6 = __toESM(require_react());
    import_prop_types4 = __toESM(require_prop_types());
    init_private_theming();
    init_esm();
    init_styled_engine();
    init_useThemeWithoutDefault();
    import_jsx_runtime4 = __toESM(require_jsx_runtime());
    EMPTY_THEME = {};
    true ? ThemeProvider2.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit the d.ts file and run "yarn proptypes"     |
      // ----------------------------------------------------------------------
      /**
       * Your component tree.
       */
      children: import_prop_types4.default.node,
      /**
       * A theme object. You can provide a function to extend the outer theme.
       */
      theme: import_prop_types4.default.oneOfType([import_prop_types4.default.func, import_prop_types4.default.object]).isRequired,
      /**
       * The design system's unique id for getting the corresponded theme when there are multiple design systems.
       */
      themeId: import_prop_types4.default.string
    } : void 0;
    if (true) {
      true ? ThemeProvider2.propTypes = exactProp(ThemeProvider2.propTypes) : void 0;
    }
    ThemeProvider_default2 = ThemeProvider2;
  }
});

// node_modules/@mui/system/esm/ThemeProvider/index.js
var init_ThemeProvider4 = __esm({
  "node_modules/@mui/system/esm/ThemeProvider/index.js"() {
    "use client";
    init_ThemeProvider3();
  }
});

// node_modules/@mui/system/esm/cssVars/getInitColorSchemeScript.js
function getInitColorSchemeScript(options) {
  const {
    defaultMode = "light",
    defaultLightColorScheme = "light",
    defaultDarkColorScheme = "dark",
    modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    attribute = DEFAULT_ATTRIBUTE,
    colorSchemeNode = "document.documentElement"
  } = options || {};
  return (0, import_jsx_runtime5.jsx)("script", {
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML: {
      __html: `(function() {
try {
  var mode = localStorage.getItem('${modeStorageKey}') || '${defaultMode}';
  var colorScheme = '';
  if (mode === 'system') {
    // handle system mode
    var mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      colorScheme = localStorage.getItem('${colorSchemeStorageKey}-dark') || '${defaultDarkColorScheme}';
    } else {
      colorScheme = localStorage.getItem('${colorSchemeStorageKey}-light') || '${defaultLightColorScheme}';
    }
  }
  if (mode === 'light') {
    colorScheme = localStorage.getItem('${colorSchemeStorageKey}-light') || '${defaultLightColorScheme}';
  }
  if (mode === 'dark') {
    colorScheme = localStorage.getItem('${colorSchemeStorageKey}-dark') || '${defaultDarkColorScheme}';
  }
  if (colorScheme) {
    ${colorSchemeNode}.setAttribute('${attribute}', colorScheme);
  }
} catch(e){}})();`
    }
  }, "mui-color-scheme-init");
}
var React7, import_jsx_runtime5, DEFAULT_MODE_STORAGE_KEY, DEFAULT_COLOR_SCHEME_STORAGE_KEY, DEFAULT_ATTRIBUTE;
var init_getInitColorSchemeScript = __esm({
  "node_modules/@mui/system/esm/cssVars/getInitColorSchemeScript.js"() {
    React7 = __toESM(require_react());
    import_jsx_runtime5 = __toESM(require_jsx_runtime());
    DEFAULT_MODE_STORAGE_KEY = "mode";
    DEFAULT_COLOR_SCHEME_STORAGE_KEY = "color-scheme";
    DEFAULT_ATTRIBUTE = "data-color-scheme";
  }
});

// node_modules/@mui/system/esm/cssVars/useCurrentColorScheme.js
function getSystemMode(mode) {
  if (typeof window !== "undefined" && mode === "system") {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    if (mql.matches) {
      return "dark";
    }
    return "light";
  }
  return void 0;
}
function processState(state, callback) {
  if (state.mode === "light" || state.mode === "system" && state.systemMode === "light") {
    return callback("light");
  }
  if (state.mode === "dark" || state.mode === "system" && state.systemMode === "dark") {
    return callback("dark");
  }
  return void 0;
}
function getColorScheme(state) {
  return processState(state, (mode) => {
    if (mode === "light") {
      return state.lightColorScheme;
    }
    if (mode === "dark") {
      return state.darkColorScheme;
    }
    return void 0;
  });
}
function initializeValue(key, defaultValue) {
  if (typeof window === "undefined") {
    return void 0;
  }
  let value;
  try {
    value = localStorage.getItem(key) || void 0;
    if (!value) {
      localStorage.setItem(key, defaultValue);
    }
  } catch (e) {
  }
  return value || defaultValue;
}
function useCurrentColorScheme(options) {
  const {
    defaultMode = "light",
    defaultLightColorScheme,
    defaultDarkColorScheme,
    supportedColorSchemes = [],
    modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    storageWindow = typeof window === "undefined" ? void 0 : window
  } = options;
  const joinedColorSchemes = supportedColorSchemes.join(",");
  const [state, setState] = React8.useState(() => {
    const initialMode = initializeValue(modeStorageKey, defaultMode);
    const lightColorScheme = initializeValue(`${colorSchemeStorageKey}-light`, defaultLightColorScheme);
    const darkColorScheme = initializeValue(`${colorSchemeStorageKey}-dark`, defaultDarkColorScheme);
    return {
      mode: initialMode,
      systemMode: getSystemMode(initialMode),
      lightColorScheme,
      darkColorScheme
    };
  });
  const colorScheme = getColorScheme(state);
  const setMode = React8.useCallback((mode) => {
    setState((currentState) => {
      if (mode === currentState.mode) {
        return currentState;
      }
      const newMode = !mode ? defaultMode : mode;
      try {
        localStorage.setItem(modeStorageKey, newMode);
      } catch (e) {
      }
      return _extends({}, currentState, {
        mode: newMode,
        systemMode: getSystemMode(newMode)
      });
    });
  }, [modeStorageKey, defaultMode]);
  const setColorScheme = React8.useCallback((value) => {
    if (!value) {
      setState((currentState) => {
        try {
          localStorage.setItem(`${colorSchemeStorageKey}-light`, defaultLightColorScheme);
          localStorage.setItem(`${colorSchemeStorageKey}-dark`, defaultDarkColorScheme);
        } catch (e) {
        }
        return _extends({}, currentState, {
          lightColorScheme: defaultLightColorScheme,
          darkColorScheme: defaultDarkColorScheme
        });
      });
    } else if (typeof value === "string") {
      if (value && !joinedColorSchemes.includes(value)) {
        console.error(`\`${value}\` does not exist in \`theme.colorSchemes\`.`);
      } else {
        setState((currentState) => {
          const newState = _extends({}, currentState);
          processState(currentState, (mode) => {
            try {
              localStorage.setItem(`${colorSchemeStorageKey}-${mode}`, value);
            } catch (e) {
            }
            if (mode === "light") {
              newState.lightColorScheme = value;
            }
            if (mode === "dark") {
              newState.darkColorScheme = value;
            }
          });
          return newState;
        });
      }
    } else {
      setState((currentState) => {
        const newState = _extends({}, currentState);
        const newLightColorScheme = value.light === null ? defaultLightColorScheme : value.light;
        const newDarkColorScheme = value.dark === null ? defaultDarkColorScheme : value.dark;
        if (newLightColorScheme) {
          if (!joinedColorSchemes.includes(newLightColorScheme)) {
            console.error(`\`${newLightColorScheme}\` does not exist in \`theme.colorSchemes\`.`);
          } else {
            newState.lightColorScheme = newLightColorScheme;
            try {
              localStorage.setItem(`${colorSchemeStorageKey}-light`, newLightColorScheme);
            } catch (error) {
            }
          }
        }
        if (newDarkColorScheme) {
          if (!joinedColorSchemes.includes(newDarkColorScheme)) {
            console.error(`\`${newDarkColorScheme}\` does not exist in \`theme.colorSchemes\`.`);
          } else {
            newState.darkColorScheme = newDarkColorScheme;
            try {
              localStorage.setItem(`${colorSchemeStorageKey}-dark`, newDarkColorScheme);
            } catch (error) {
            }
          }
        }
        return newState;
      });
    }
  }, [joinedColorSchemes, colorSchemeStorageKey, defaultLightColorScheme, defaultDarkColorScheme]);
  const handleMediaQuery = React8.useCallback((e) => {
    if (state.mode === "system") {
      setState((currentState) => _extends({}, currentState, {
        systemMode: e != null && e.matches ? "dark" : "light"
      }));
    }
  }, [state.mode]);
  const mediaListener = React8.useRef(handleMediaQuery);
  mediaListener.current = handleMediaQuery;
  React8.useEffect(() => {
    const handler = (...args) => mediaListener.current(...args);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addListener(handler);
    handler(media);
    return () => media.removeListener(handler);
  }, []);
  React8.useEffect(() => {
    const handleStorage = (event) => {
      const value = event.newValue;
      if (typeof event.key === "string" && event.key.startsWith(colorSchemeStorageKey) && (!value || joinedColorSchemes.match(value))) {
        if (event.key.endsWith("light")) {
          setColorScheme({
            light: value
          });
        }
        if (event.key.endsWith("dark")) {
          setColorScheme({
            dark: value
          });
        }
      }
      if (event.key === modeStorageKey && (!value || ["light", "dark", "system"].includes(value))) {
        setMode(value || defaultMode);
      }
    };
    if (storageWindow) {
      storageWindow.addEventListener("storage", handleStorage);
      return () => storageWindow.removeEventListener("storage", handleStorage);
    }
    return void 0;
  }, [setColorScheme, setMode, modeStorageKey, colorSchemeStorageKey, joinedColorSchemes, defaultMode, storageWindow]);
  return _extends({}, state, {
    colorScheme,
    setMode,
    setColorScheme
  });
}
var React8;
var init_useCurrentColorScheme = __esm({
  "node_modules/@mui/system/esm/cssVars/useCurrentColorScheme.js"() {
    "use client";
    init_extends();
    React8 = __toESM(require_react());
    init_getInitColorSchemeScript();
  }
});

// node_modules/@mui/system/esm/cssVars/createCssVarsProvider.js
function createCssVarsProvider(options) {
  const {
    themeId,
    /**
     * This `theme` object needs to follow a certain structure to
     * be used correctly by the finel `CssVarsProvider`. It should have a
     * `colorSchemes` key with the light and dark (and any other) palette.
     * It should also ideally have a vars object created using `prepareCssVars`.
     */
    theme: defaultTheme4 = {},
    attribute: defaultAttribute = DEFAULT_ATTRIBUTE,
    modeStorageKey: defaultModeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey: defaultColorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    defaultMode: designSystemMode = "light",
    defaultColorScheme: designSystemColorScheme,
    disableTransitionOnChange: designSystemTransitionOnChange = false,
    resolveTheme,
    excludeVariablesFromRoot
  } = options;
  if (!defaultTheme4.colorSchemes || typeof designSystemColorScheme === "string" && !defaultTheme4.colorSchemes[designSystemColorScheme] || typeof designSystemColorScheme === "object" && !defaultTheme4.colorSchemes[designSystemColorScheme == null ? void 0 : designSystemColorScheme.light] || typeof designSystemColorScheme === "object" && !defaultTheme4.colorSchemes[designSystemColorScheme == null ? void 0 : designSystemColorScheme.dark]) {
    console.error(`MUI: \`${designSystemColorScheme}\` does not exist in \`theme.colorSchemes\`.`);
  }
  const ColorSchemeContext = React9.createContext(void 0);
  const useColorScheme = () => {
    const value = React9.useContext(ColorSchemeContext);
    if (!value) {
      throw new Error(true ? `MUI: \`useColorScheme\` must be called under <CssVarsProvider />` : formatMuiErrorMessage(19));
    }
    return value;
  };
  function CssVarsProvider({
    children,
    theme: themeProp = defaultTheme4,
    modeStorageKey = defaultModeStorageKey,
    colorSchemeStorageKey = defaultColorSchemeStorageKey,
    attribute = defaultAttribute,
    defaultMode = designSystemMode,
    defaultColorScheme = designSystemColorScheme,
    disableTransitionOnChange = designSystemTransitionOnChange,
    storageWindow = typeof window === "undefined" ? void 0 : window,
    documentNode = typeof document === "undefined" ? void 0 : document,
    colorSchemeNode = typeof document === "undefined" ? void 0 : document.documentElement,
    colorSchemeSelector = ":root",
    disableNestedContext = false,
    disableStyleSheetGeneration = false
  }) {
    const hasMounted = React9.useRef(false);
    const upperTheme = useTheme();
    const ctx = React9.useContext(ColorSchemeContext);
    const nested = !!ctx && !disableNestedContext;
    const scopedTheme = themeProp[themeId];
    const _ref = scopedTheme || themeProp, {
      colorSchemes = {},
      components = {},
      generateCssVars = () => ({
        vars: {},
        css: {}
      }),
      cssVarPrefix
    } = _ref, restThemeProp = _objectWithoutPropertiesLoose(_ref, _excluded2);
    const allColorSchemes = Object.keys(colorSchemes);
    const defaultLightColorScheme2 = typeof defaultColorScheme === "string" ? defaultColorScheme : defaultColorScheme.light;
    const defaultDarkColorScheme2 = typeof defaultColorScheme === "string" ? defaultColorScheme : defaultColorScheme.dark;
    const {
      mode: stateMode,
      setMode,
      systemMode,
      lightColorScheme,
      darkColorScheme,
      colorScheme: stateColorScheme,
      setColorScheme
    } = useCurrentColorScheme({
      supportedColorSchemes: allColorSchemes,
      defaultLightColorScheme: defaultLightColorScheme2,
      defaultDarkColorScheme: defaultDarkColorScheme2,
      modeStorageKey,
      colorSchemeStorageKey,
      defaultMode,
      storageWindow
    });
    let mode = stateMode;
    let colorScheme = stateColorScheme;
    if (nested) {
      mode = ctx.mode;
      colorScheme = ctx.colorScheme;
    }
    const calculatedMode = (() => {
      if (mode) {
        return mode;
      }
      if (defaultMode === "system") {
        return designSystemMode;
      }
      return defaultMode;
    })();
    const calculatedColorScheme = (() => {
      if (!colorScheme) {
        if (calculatedMode === "dark") {
          return defaultDarkColorScheme2;
        }
        return defaultLightColorScheme2;
      }
      return colorScheme;
    })();
    const {
      css: rootCss,
      vars: rootVars
    } = generateCssVars();
    const theme = _extends({}, restThemeProp, {
      components,
      colorSchemes,
      cssVarPrefix,
      vars: rootVars,
      getColorSchemeSelector: (targetColorScheme) => `[${attribute}="${targetColorScheme}"] &`
    });
    const defaultColorSchemeStyleSheet = {};
    const otherColorSchemesStyleSheet = {};
    Object.entries(colorSchemes).forEach(([key, scheme]) => {
      const {
        css: css2,
        vars
      } = generateCssVars(key);
      theme.vars = deepmerge(theme.vars, vars);
      if (key === calculatedColorScheme) {
        Object.keys(scheme).forEach((schemeKey) => {
          if (scheme[schemeKey] && typeof scheme[schemeKey] === "object") {
            theme[schemeKey] = _extends({}, theme[schemeKey], scheme[schemeKey]);
          } else {
            theme[schemeKey] = scheme[schemeKey];
          }
        });
        if (theme.palette) {
          theme.palette.colorScheme = key;
        }
      }
      const resolvedDefaultColorScheme = (() => {
        if (typeof defaultColorScheme === "string") {
          return defaultColorScheme;
        }
        if (defaultMode === "dark") {
          return defaultColorScheme.dark;
        }
        return defaultColorScheme.light;
      })();
      if (key === resolvedDefaultColorScheme) {
        if (excludeVariablesFromRoot) {
          const excludedVariables = {};
          excludeVariablesFromRoot(cssVarPrefix).forEach((cssVar) => {
            excludedVariables[cssVar] = css2[cssVar];
            delete css2[cssVar];
          });
          defaultColorSchemeStyleSheet[`[${attribute}="${key}"]`] = excludedVariables;
        }
        defaultColorSchemeStyleSheet[`${colorSchemeSelector}, [${attribute}="${key}"]`] = css2;
      } else {
        otherColorSchemesStyleSheet[`${colorSchemeSelector === ":root" ? "" : colorSchemeSelector}[${attribute}="${key}"]`] = css2;
      }
    });
    theme.vars = deepmerge(theme.vars, rootVars);
    React9.useEffect(() => {
      if (colorScheme && colorSchemeNode) {
        colorSchemeNode.setAttribute(attribute, colorScheme);
      }
    }, [colorScheme, attribute, colorSchemeNode]);
    React9.useEffect(() => {
      let timer;
      if (disableTransitionOnChange && hasMounted.current && documentNode) {
        const css2 = documentNode.createElement("style");
        css2.appendChild(documentNode.createTextNode(DISABLE_CSS_TRANSITION));
        documentNode.head.appendChild(css2);
        (() => window.getComputedStyle(documentNode.body))();
        timer = setTimeout(() => {
          documentNode.head.removeChild(css2);
        }, 1);
      }
      return () => {
        clearTimeout(timer);
      };
    }, [colorScheme, disableTransitionOnChange, documentNode]);
    React9.useEffect(() => {
      hasMounted.current = true;
      return () => {
        hasMounted.current = false;
      };
    }, []);
    const contextValue = React9.useMemo(() => ({
      mode,
      systemMode,
      setMode,
      lightColorScheme,
      darkColorScheme,
      colorScheme,
      setColorScheme,
      allColorSchemes
    }), [allColorSchemes, colorScheme, darkColorScheme, lightColorScheme, mode, setColorScheme, setMode, systemMode]);
    let shouldGenerateStyleSheet = true;
    if (disableStyleSheetGeneration || nested && (upperTheme == null ? void 0 : upperTheme.cssVarPrefix) === cssVarPrefix) {
      shouldGenerateStyleSheet = false;
    }
    const element = (0, import_jsx_runtime7.jsxs)(React9.Fragment, {
      children: [shouldGenerateStyleSheet && (0, import_jsx_runtime7.jsxs)(React9.Fragment, {
        children: [(0, import_jsx_runtime6.jsx)(GlobalStyles, {
          styles: {
            [colorSchemeSelector]: rootCss
          }
        }), (0, import_jsx_runtime6.jsx)(GlobalStyles, {
          styles: defaultColorSchemeStyleSheet
        }), (0, import_jsx_runtime6.jsx)(GlobalStyles, {
          styles: otherColorSchemesStyleSheet
        })]
      }), (0, import_jsx_runtime6.jsx)(ThemeProvider_default2, {
        themeId: scopedTheme ? themeId : void 0,
        theme: resolveTheme ? resolveTheme(theme) : theme,
        children
      })]
    });
    if (nested) {
      return element;
    }
    return (0, import_jsx_runtime6.jsx)(ColorSchemeContext.Provider, {
      value: contextValue,
      children: element
    });
  }
  true ? CssVarsProvider.propTypes = {
    /**
     * The body attribute name to attach colorScheme.
     */
    attribute: import_prop_types5.default.string,
    /**
     * The component tree.
     */
    children: import_prop_types5.default.node,
    /**
     * The node used to attach the color-scheme attribute
     */
    colorSchemeNode: import_prop_types5.default.any,
    /**
     * The CSS selector for attaching the generated custom properties
     */
    colorSchemeSelector: import_prop_types5.default.string,
    /**
     * localStorage key used to store `colorScheme`
     */
    colorSchemeStorageKey: import_prop_types5.default.string,
    /**
     * The initial color scheme used.
     */
    defaultColorScheme: import_prop_types5.default.oneOfType([import_prop_types5.default.string, import_prop_types5.default.object]),
    /**
     * The initial mode used.
     */
    defaultMode: import_prop_types5.default.string,
    /**
     * If `true`, the provider creates its own context and generate stylesheet as if it is a root `CssVarsProvider`.
     */
    disableNestedContext: import_prop_types5.default.bool,
    /**
     * If `true`, the style sheet won't be generated.
     *
     * This is useful for controlling nested CssVarsProvider behavior.
     */
    disableStyleSheetGeneration: import_prop_types5.default.bool,
    /**
     * Disable CSS transitions when switching between modes or color schemes.
     */
    disableTransitionOnChange: import_prop_types5.default.bool,
    /**
     * The document to attach the attribute to.
     */
    documentNode: import_prop_types5.default.any,
    /**
     * The key in the local storage used to store current color scheme.
     */
    modeStorageKey: import_prop_types5.default.string,
    /**
     * The window that attaches the 'storage' event listener.
     * @default window
     */
    storageWindow: import_prop_types5.default.any,
    /**
     * The calculated theme object that will be passed through context.
     */
    theme: import_prop_types5.default.object
  } : void 0;
  const defaultLightColorScheme = typeof designSystemColorScheme === "string" ? designSystemColorScheme : designSystemColorScheme.light;
  const defaultDarkColorScheme = typeof designSystemColorScheme === "string" ? designSystemColorScheme : designSystemColorScheme.dark;
  const getInitColorSchemeScript2 = (params) => getInitColorSchemeScript(_extends({
    attribute: defaultAttribute,
    colorSchemeStorageKey: defaultColorSchemeStorageKey,
    defaultMode: designSystemMode,
    defaultLightColorScheme,
    defaultDarkColorScheme,
    modeStorageKey: defaultModeStorageKey
  }, params));
  return {
    CssVarsProvider,
    useColorScheme,
    getInitColorSchemeScript: getInitColorSchemeScript2
  };
}
var React9, import_prop_types5, import_jsx_runtime6, import_jsx_runtime7, _excluded2, DISABLE_CSS_TRANSITION;
var init_createCssVarsProvider = __esm({
  "node_modules/@mui/system/esm/cssVars/createCssVarsProvider.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_esm();
    React9 = __toESM(require_react());
    import_prop_types5 = __toESM(require_prop_types());
    init_esm();
    init_styled_engine();
    init_private_theming();
    init_ThemeProvider4();
    init_getInitColorSchemeScript();
    init_useCurrentColorScheme();
    import_jsx_runtime6 = __toESM(require_jsx_runtime());
    import_jsx_runtime7 = __toESM(require_jsx_runtime());
    _excluded2 = ["colorSchemes", "components", "generateCssVars", "cssVarPrefix"];
    DISABLE_CSS_TRANSITION = "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
  }
});

// node_modules/@mui/system/esm/cssVars/createGetCssVar.js
function createGetCssVar(prefix = "") {
  function appendVar(...vars) {
    if (!vars.length) {
      return "";
    }
    const value = vars[0];
    if (typeof value === "string" && !value.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/)) {
      return `, var(--${prefix ? `${prefix}-` : ""}${value}${appendVar(...vars.slice(1))})`;
    }
    return `, ${value}`;
  }
  const getCssVar = (field, ...fallbacks) => {
    return `var(--${prefix ? `${prefix}-` : ""}${field}${appendVar(...fallbacks)})`;
  };
  return getCssVar;
}
var init_createGetCssVar = __esm({
  "node_modules/@mui/system/esm/cssVars/createGetCssVar.js"() {
  }
});

// node_modules/@mui/system/esm/cssVars/cssVarsParser.js
function cssVarsParser(theme, options) {
  const {
    prefix,
    shouldSkipGeneratingVar
  } = options || {};
  const css2 = {};
  const vars = {};
  const varsWithDefaults = {};
  walkObjectDeep(
    theme,
    (keys, value, arrayKeys) => {
      if (typeof value === "string" || typeof value === "number") {
        if (!shouldSkipGeneratingVar || !shouldSkipGeneratingVar(keys, value)) {
          const cssVar = `--${prefix ? `${prefix}-` : ""}${keys.join("-")}`;
          Object.assign(css2, {
            [cssVar]: getCssValue(keys, value)
          });
          assignNestedKeys(vars, keys, `var(${cssVar})`, arrayKeys);
          assignNestedKeys(varsWithDefaults, keys, `var(${cssVar}, ${value})`, arrayKeys);
        }
      }
    },
    (keys) => keys[0] === "vars"
    // skip 'vars/*' paths
  );
  return {
    css: css2,
    vars,
    varsWithDefaults
  };
}
var assignNestedKeys, walkObjectDeep, getCssValue;
var init_cssVarsParser = __esm({
  "node_modules/@mui/system/esm/cssVars/cssVarsParser.js"() {
    assignNestedKeys = (obj, keys, value, arrayKeys = []) => {
      let temp = obj;
      keys.forEach((k, index) => {
        if (index === keys.length - 1) {
          if (Array.isArray(temp)) {
            temp[Number(k)] = value;
          } else if (temp && typeof temp === "object") {
            temp[k] = value;
          }
        } else if (temp && typeof temp === "object") {
          if (!temp[k]) {
            temp[k] = arrayKeys.includes(k) ? [] : {};
          }
          temp = temp[k];
        }
      });
    };
    walkObjectDeep = (obj, callback, shouldSkipPaths) => {
      function recurse(object, parentKeys = [], arrayKeys = []) {
        Object.entries(object).forEach(([key, value]) => {
          if (!shouldSkipPaths || shouldSkipPaths && !shouldSkipPaths([...parentKeys, key])) {
            if (value !== void 0 && value !== null) {
              if (typeof value === "object" && Object.keys(value).length > 0) {
                recurse(value, [...parentKeys, key], Array.isArray(value) ? [...arrayKeys, key] : arrayKeys);
              } else {
                callback([...parentKeys, key], value, arrayKeys);
              }
            }
          }
        });
      }
      recurse(obj);
    };
    getCssValue = (keys, value) => {
      if (typeof value === "number") {
        if (["lineHeight", "fontWeight", "opacity", "zIndex"].some((prop) => keys.includes(prop))) {
          return value;
        }
        const lastKey = keys[keys.length - 1];
        if (lastKey.toLowerCase().indexOf("opacity") >= 0) {
          return value;
        }
        return `${value}px`;
      }
      return value;
    };
  }
});

// node_modules/@mui/system/esm/cssVars/prepareCssVars.js
function prepareCssVars(theme, parserConfig) {
  const {
    colorSchemes = {}
  } = theme, otherTheme = _objectWithoutPropertiesLoose(theme, _excluded3);
  const {
    vars: rootVars,
    css: rootCss,
    varsWithDefaults: rootVarsWithDefaults
  } = cssVarsParser(otherTheme, parserConfig);
  let themeVars = rootVarsWithDefaults;
  const colorSchemesMap = {};
  const {
    light: light2
  } = colorSchemes, otherColorSchemes = _objectWithoutPropertiesLoose(colorSchemes, _excluded22);
  Object.entries(otherColorSchemes || {}).forEach(([key, scheme]) => {
    const {
      vars,
      css: css2,
      varsWithDefaults
    } = cssVarsParser(scheme, parserConfig);
    themeVars = deepmerge(themeVars, varsWithDefaults);
    colorSchemesMap[key] = {
      css: css2,
      vars
    };
  });
  if (light2) {
    const {
      css: css2,
      vars,
      varsWithDefaults
    } = cssVarsParser(light2, parserConfig);
    themeVars = deepmerge(themeVars, varsWithDefaults);
    colorSchemesMap.light = {
      css: css2,
      vars
    };
  }
  const generateCssVars = (colorScheme) => {
    if (!colorScheme) {
      return {
        css: _extends({}, rootCss),
        vars: rootVars
      };
    }
    return {
      css: _extends({}, colorSchemesMap[colorScheme].css),
      vars: colorSchemesMap[colorScheme].vars
    };
  };
  return {
    vars: themeVars,
    generateCssVars
  };
}
var _excluded3, _excluded22, prepareCssVars_default;
var init_prepareCssVars = __esm({
  "node_modules/@mui/system/esm/cssVars/prepareCssVars.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_esm();
    init_cssVarsParser();
    _excluded3 = ["colorSchemes", "components"];
    _excluded22 = ["light"];
    prepareCssVars_default = prepareCssVars;
  }
});

// node_modules/@mui/system/esm/cssVars/createCssVarsTheme.js
var init_createCssVarsTheme = __esm({
  "node_modules/@mui/system/esm/cssVars/createCssVarsTheme.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_prepareCssVars();
  }
});

// node_modules/@mui/system/esm/Container/createContainer.js
function createContainer(options = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent = defaultCreateStyledComponent,
    useThemeProps: useThemeProps3 = useThemePropsDefault,
    componentName = "MuiContainer"
  } = options;
  const ContainerRoot = createStyledComponent(({
    theme,
    ownerState
  }) => _extends({
    width: "100%",
    marginLeft: "auto",
    boxSizing: "border-box",
    marginRight: "auto",
    display: "block"
  }, !ownerState.disableGutters && {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    // @ts-ignore module augmentation fails if custom breakpoints are used
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    }
  }), ({
    theme,
    ownerState
  }) => ownerState.fixed && Object.keys(theme.breakpoints.values).reduce((acc, breakpointValueKey) => {
    const breakpoint = breakpointValueKey;
    const value = theme.breakpoints.values[breakpoint];
    if (value !== 0) {
      acc[theme.breakpoints.up(breakpoint)] = {
        maxWidth: `${value}${theme.breakpoints.unit}`
      };
    }
    return acc;
  }, {}), ({
    theme,
    ownerState
  }) => _extends({}, ownerState.maxWidth === "xs" && {
    // @ts-ignore module augmentation fails if custom breakpoints are used
    [theme.breakpoints.up("xs")]: {
      // @ts-ignore module augmentation fails if custom breakpoints are used
      maxWidth: Math.max(theme.breakpoints.values.xs, 444)
    }
  }, ownerState.maxWidth && // @ts-ignore module augmentation fails if custom breakpoints are used
  ownerState.maxWidth !== "xs" && {
    // @ts-ignore module augmentation fails if custom breakpoints are used
    [theme.breakpoints.up(ownerState.maxWidth)]: {
      // @ts-ignore module augmentation fails if custom breakpoints are used
      maxWidth: `${theme.breakpoints.values[ownerState.maxWidth]}${theme.breakpoints.unit}`
    }
  }));
  const Container2 = React10.forwardRef(function Container3(inProps, ref) {
    const props = useThemeProps3(inProps);
    const {
      className,
      component = "div",
      disableGutters = false,
      fixed = false,
      maxWidth = "lg"
    } = props, other = _objectWithoutPropertiesLoose(props, _excluded4);
    const ownerState = _extends({}, props, {
      component,
      disableGutters,
      fixed,
      maxWidth
    });
    const classes = useUtilityClasses(ownerState, componentName);
    return (
      // @ts-ignore theme is injected by the styled util
      (0, import_jsx_runtime8.jsx)(ContainerRoot, _extends({
        as: component,
        ownerState,
        className: clsx_default(classes.root, className),
        ref
      }, other))
    );
  });
  true ? Container2.propTypes = {
    children: import_prop_types6.default.node,
    classes: import_prop_types6.default.object,
    className: import_prop_types6.default.string,
    component: import_prop_types6.default.elementType,
    disableGutters: import_prop_types6.default.bool,
    fixed: import_prop_types6.default.bool,
    maxWidth: import_prop_types6.default.oneOfType([import_prop_types6.default.oneOf(["xs", "sm", "md", "lg", "xl", false]), import_prop_types6.default.string]),
    sx: import_prop_types6.default.oneOfType([import_prop_types6.default.arrayOf(import_prop_types6.default.oneOfType([import_prop_types6.default.func, import_prop_types6.default.object, import_prop_types6.default.bool])), import_prop_types6.default.func, import_prop_types6.default.object])
  } : void 0;
  return Container2;
}
var React10, import_prop_types6, import_jsx_runtime8, _excluded4, defaultTheme, defaultCreateStyledComponent, useThemePropsDefault, useUtilityClasses;
var init_createContainer = __esm({
  "node_modules/@mui/system/esm/Container/createContainer.js"() {
    init_objectWithoutPropertiesLoose();
    init_extends();
    React10 = __toESM(require_react());
    import_prop_types6 = __toESM(require_prop_types());
    init_clsx();
    init_esm();
    init_useThemeProps();
    init_styled();
    init_createTheme();
    import_jsx_runtime8 = __toESM(require_jsx_runtime());
    _excluded4 = ["className", "component", "disableGutters", "fixed", "maxWidth", "classes"];
    defaultTheme = createTheme_default();
    defaultCreateStyledComponent = styled_default("div", {
      name: "MuiContainer",
      slot: "Root",
      overridesResolver: (props, styles) => {
        const {
          ownerState
        } = props;
        return [styles.root, styles[`maxWidth${capitalize(String(ownerState.maxWidth))}`], ownerState.fixed && styles.fixed, ownerState.disableGutters && styles.disableGutters];
      }
    });
    useThemePropsDefault = (inProps) => useThemeProps({
      props: inProps,
      name: "MuiContainer",
      defaultTheme
    });
    useUtilityClasses = (ownerState, componentName) => {
      const getContainerUtilityClass = (slot) => {
        return generateUtilityClass(componentName, slot);
      };
      const {
        classes,
        fixed,
        disableGutters,
        maxWidth
      } = ownerState;
      const slots = {
        root: ["root", maxWidth && `maxWidth${capitalize(String(maxWidth))}`, fixed && "fixed", disableGutters && "disableGutters"]
      };
      return composeClasses(slots, getContainerUtilityClass, classes);
    };
  }
});

// node_modules/@mui/system/esm/Container/Container.js
var import_prop_types7, Container;
var init_Container = __esm({
  "node_modules/@mui/system/esm/Container/Container.js"() {
    "use client";
    import_prop_types7 = __toESM(require_prop_types());
    init_createContainer();
    Container = createContainer();
    true ? Container.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * @ignore
       */
      children: import_prop_types7.default.node,
      /**
       * Override or extend the styles applied to the component.
       */
      classes: import_prop_types7.default.object,
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: import_prop_types7.default.elementType,
      /**
       * If `true`, the left and right padding is removed.
       * @default false
       */
      disableGutters: import_prop_types7.default.bool,
      /**
       * Set the max-width to match the min-width of the current breakpoint.
       * This is useful if you'd prefer to design for a fixed set of sizes
       * instead of trying to accommodate a fully fluid viewport.
       * It's fluid by default.
       * @default false
       */
      fixed: import_prop_types7.default.bool,
      /**
       * Determine the max-width of the container.
       * The container width grows with the size of the screen.
       * Set to `false` to disable `maxWidth`.
       * @default 'lg'
       */
      maxWidth: import_prop_types7.default.oneOfType([import_prop_types7.default.oneOf(["xs", "sm", "md", "lg", "xl", false]), import_prop_types7.default.string]),
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx: import_prop_types7.default.oneOfType([import_prop_types7.default.arrayOf(import_prop_types7.default.oneOfType([import_prop_types7.default.func, import_prop_types7.default.object, import_prop_types7.default.bool])), import_prop_types7.default.func, import_prop_types7.default.object])
    } : void 0;
  }
});

// node_modules/@mui/system/esm/Container/containerClasses.js
var containerClasses;
var init_containerClasses = __esm({
  "node_modules/@mui/system/esm/Container/containerClasses.js"() {
    init_esm();
    containerClasses = generateUtilityClasses("MuiContainer", ["root", "disableGutters", "fixed", "maxWidthXs", "maxWidthSm", "maxWidthMd", "maxWidthLg", "maxWidthXl"]);
  }
});

// node_modules/@mui/system/esm/Container/index.js
var init_Container2 = __esm({
  "node_modules/@mui/system/esm/Container/index.js"() {
    "use client";
    init_Container();
    init_containerClasses();
    init_containerClasses();
  }
});

// node_modules/@mui/system/esm/Stack/createStack.js
function useThemePropsDefault2(props) {
  return useThemeProps({
    props,
    name: "MuiStack",
    defaultTheme: defaultTheme2
  });
}
function joinChildren(children, separator) {
  const childrenArray = React11.Children.toArray(children).filter(Boolean);
  return childrenArray.reduce((output, child, index) => {
    output.push(child);
    if (index < childrenArray.length - 1) {
      output.push(React11.cloneElement(separator, {
        key: `separator-${index}`
      }));
    }
    return output;
  }, []);
}
function createStack(options = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent = defaultCreateStyledComponent2,
    useThemeProps: useThemeProps3 = useThemePropsDefault2,
    componentName = "MuiStack"
  } = options;
  const useUtilityClasses2 = () => {
    const slots = {
      root: ["root"]
    };
    return composeClasses(slots, (slot) => generateUtilityClass(componentName, slot), {});
  };
  const StackRoot = createStyledComponent(style);
  const Stack2 = React11.forwardRef(function Grid(inProps, ref) {
    const themeProps = useThemeProps3(inProps);
    const props = extendSxProp(themeProps);
    const {
      component = "div",
      direction = "column",
      spacing = 0,
      divider,
      children,
      className,
      useFlexGap = false
    } = props, other = _objectWithoutPropertiesLoose(props, _excluded5);
    const ownerState = {
      direction,
      spacing,
      useFlexGap
    };
    const classes = useUtilityClasses2();
    return (0, import_jsx_runtime9.jsx)(StackRoot, _extends({
      as: component,
      ownerState,
      ref,
      className: clsx_default(classes.root, className)
    }, other, {
      children: divider ? joinChildren(children, divider) : children
    }));
  });
  true ? Stack2.propTypes = {
    children: import_prop_types8.default.node,
    direction: import_prop_types8.default.oneOfType([import_prop_types8.default.oneOf(["column-reverse", "column", "row-reverse", "row"]), import_prop_types8.default.arrayOf(import_prop_types8.default.oneOf(["column-reverse", "column", "row-reverse", "row"])), import_prop_types8.default.object]),
    divider: import_prop_types8.default.node,
    spacing: import_prop_types8.default.oneOfType([import_prop_types8.default.arrayOf(import_prop_types8.default.oneOfType([import_prop_types8.default.number, import_prop_types8.default.string])), import_prop_types8.default.number, import_prop_types8.default.object, import_prop_types8.default.string]),
    sx: import_prop_types8.default.oneOfType([import_prop_types8.default.arrayOf(import_prop_types8.default.oneOfType([import_prop_types8.default.func, import_prop_types8.default.object, import_prop_types8.default.bool])), import_prop_types8.default.func, import_prop_types8.default.object])
  } : void 0;
  return Stack2;
}
var React11, import_prop_types8, import_jsx_runtime9, _excluded5, defaultTheme2, defaultCreateStyledComponent2, getSideFromDirection, style;
var init_createStack = __esm({
  "node_modules/@mui/system/esm/Stack/createStack.js"() {
    init_objectWithoutPropertiesLoose();
    init_extends();
    React11 = __toESM(require_react());
    import_prop_types8 = __toESM(require_prop_types());
    init_clsx();
    init_esm();
    init_styled();
    init_useThemeProps();
    init_styleFunctionSx();
    init_createTheme();
    init_breakpoints();
    init_spacing();
    import_jsx_runtime9 = __toESM(require_jsx_runtime());
    _excluded5 = ["component", "direction", "spacing", "divider", "children", "className", "useFlexGap"];
    defaultTheme2 = createTheme_default();
    defaultCreateStyledComponent2 = styled_default("div", {
      name: "MuiStack",
      slot: "Root",
      overridesResolver: (props, styles) => styles.root
    });
    getSideFromDirection = (direction) => {
      return {
        row: "Left",
        "row-reverse": "Right",
        column: "Top",
        "column-reverse": "Bottom"
      }[direction];
    };
    style = ({
      ownerState,
      theme
    }) => {
      let styles = _extends({
        display: "flex",
        flexDirection: "column"
      }, handleBreakpoints({
        theme
      }, resolveBreakpointValues({
        values: ownerState.direction,
        breakpoints: theme.breakpoints.values
      }), (propValue) => ({
        flexDirection: propValue
      })));
      if (ownerState.spacing) {
        const transformer = createUnarySpacing(theme);
        const base = Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
          if (typeof ownerState.spacing === "object" && ownerState.spacing[breakpoint] != null || typeof ownerState.direction === "object" && ownerState.direction[breakpoint] != null) {
            acc[breakpoint] = true;
          }
          return acc;
        }, {});
        const directionValues = resolveBreakpointValues({
          values: ownerState.direction,
          base
        });
        const spacingValues = resolveBreakpointValues({
          values: ownerState.spacing,
          base
        });
        if (typeof directionValues === "object") {
          Object.keys(directionValues).forEach((breakpoint, index, breakpoints) => {
            const directionValue = directionValues[breakpoint];
            if (!directionValue) {
              const previousDirectionValue = index > 0 ? directionValues[breakpoints[index - 1]] : "column";
              directionValues[breakpoint] = previousDirectionValue;
            }
          });
        }
        const styleFromPropValue = (propValue, breakpoint) => {
          if (ownerState.useFlexGap) {
            return {
              gap: getValue(transformer, propValue)
            };
          }
          return {
            // The useFlexGap={false} implement relies on each child to give up control of the margin.
            // We need to reset the margin to avoid double spacing.
            "& > :not(style):not(style)": {
              margin: 0
            },
            "& > :not(style) ~ :not(style)": {
              [`margin${getSideFromDirection(breakpoint ? directionValues[breakpoint] : ownerState.direction)}`]: getValue(transformer, propValue)
            }
          };
        };
        styles = deepmerge(styles, handleBreakpoints({
          theme
        }, spacingValues, styleFromPropValue));
      }
      styles = mergeBreakpointsInOrder(theme.breakpoints, styles);
      return styles;
    };
  }
});

// node_modules/@mui/system/esm/Stack/Stack.js
var import_prop_types9, Stack;
var init_Stack = __esm({
  "node_modules/@mui/system/esm/Stack/Stack.js"() {
    "use client";
    import_prop_types9 = __toESM(require_prop_types());
    init_createStack();
    Stack = createStack();
    true ? Stack.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * The content of the component.
       */
      children: import_prop_types9.default.node,
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: import_prop_types9.default.elementType,
      /**
       * Defines the `flex-direction` style property.
       * It is applied for all screen sizes.
       * @default 'column'
       */
      direction: import_prop_types9.default.oneOfType([import_prop_types9.default.oneOf(["column-reverse", "column", "row-reverse", "row"]), import_prop_types9.default.arrayOf(import_prop_types9.default.oneOf(["column-reverse", "column", "row-reverse", "row"])), import_prop_types9.default.object]),
      /**
       * Add an element between each child.
       */
      divider: import_prop_types9.default.node,
      /**
       * Defines the space between immediate children.
       * @default 0
       */
      spacing: import_prop_types9.default.oneOfType([import_prop_types9.default.arrayOf(import_prop_types9.default.oneOfType([import_prop_types9.default.number, import_prop_types9.default.string])), import_prop_types9.default.number, import_prop_types9.default.object, import_prop_types9.default.string]),
      /**
       * The system prop, which allows defining system overrides as well as additional CSS styles.
       */
      sx: import_prop_types9.default.oneOfType([import_prop_types9.default.arrayOf(import_prop_types9.default.oneOfType([import_prop_types9.default.func, import_prop_types9.default.object, import_prop_types9.default.bool])), import_prop_types9.default.func, import_prop_types9.default.object]),
      /**
       * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
       *
       * While CSS `gap` removes the [known limitations](https://mui.com/joy-ui/react-stack/#limitations),
       * it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.
       *
       * To enable this flag globally, follow the theme's default props configuration.
       * @default false
       */
      useFlexGap: import_prop_types9.default.bool
    } : void 0;
  }
});

// node_modules/@mui/system/esm/Stack/StackProps.js
var init_StackProps = __esm({
  "node_modules/@mui/system/esm/Stack/StackProps.js"() {
  }
});

// node_modules/@mui/system/esm/Stack/stackClasses.js
var stackClasses;
var init_stackClasses = __esm({
  "node_modules/@mui/system/esm/Stack/stackClasses.js"() {
    init_esm();
    stackClasses = generateUtilityClasses("MuiStack", ["root"]);
  }
});

// node_modules/@mui/system/esm/Stack/index.js
var init_Stack2 = __esm({
  "node_modules/@mui/system/esm/Stack/index.js"() {
    "use client";
    init_Stack();
    init_createStack();
    init_StackProps();
    init_stackClasses();
    init_stackClasses();
  }
});

// node_modules/@mui/system/esm/index.js
var init_esm2 = __esm({
  "node_modules/@mui/system/esm/index.js"() {
    "use client";
    init_esm();
    init_styled_engine();
    init_GlobalStyles2();
    init_borders();
    init_borders();
    init_breakpoints();
    init_breakpoints();
    init_compose();
    init_display();
    init_flexbox();
    init_flexbox();
    init_cssGrid();
    init_cssGrid();
    init_palette();
    init_palette();
    init_positions();
    init_positions();
    init_shadows();
    init_sizing();
    init_sizing();
    init_spacing();
    init_spacing();
    init_style();
    init_typography();
    init_typography();
    init_styleFunctionSx();
    init_getThemeValue();
    init_Box2();
    init_createBox();
    init_createStyled();
    init_createStyled();
    init_styled();
    init_createTheme();
    init_createBreakpoints();
    init_createSpacing();
    init_shape();
    init_useThemeProps();
    init_useTheme();
    init_useThemeWithoutDefault();
    init_colorManipulator();
    init_ThemeProvider4();
    init_createCssVarsProvider();
    init_createGetCssVar();
    init_cssVarsParser();
    init_prepareCssVars();
    init_createCssVarsTheme();
    init_responsivePropType();
    init_createContainer();
    init_Container2();
    init_Container2();
    init_Grid();
    init_Unstable_Grid();
    init_Stack();
    init_Stack2();
  }
});

// node_modules/@mui/material/generateUtilityClass/index.js
var init_generateUtilityClass = __esm({
  "node_modules/@mui/material/generateUtilityClass/index.js"() {
    init_esm();
  }
});

// node_modules/@mui/material/styles/createTypography.js
function round(value) {
  return Math.round(value * 1e5) / 1e5;
}
function createTypography(palette, typography2) {
  const _ref = typeof typography2 === "function" ? typography2(palette) : typography2, {
    fontFamily: fontFamily2 = defaultFontFamily,
    // The default font size of the Material Specification.
    fontSize: fontSize2 = 14,
    // px
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize = 16,
    // Apply the CSS properties to all the variants.
    allVariants,
    pxToRem: pxToRem2
  } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded6);
  if (true) {
    if (typeof fontSize2 !== "number") {
      console.error("MUI: `fontSize` is required to be a number.");
    }
    if (typeof htmlFontSize !== "number") {
      console.error("MUI: `htmlFontSize` is required to be a number.");
    }
  }
  const coef = fontSize2 / 14;
  const pxToRem = pxToRem2 || ((size) => `${size / htmlFontSize * coef}rem`);
  const buildVariant = (fontWeight2, size, lineHeight2, letterSpacing2, casing) => _extends({
    fontFamily: fontFamily2,
    fontWeight: fontWeight2,
    fontSize: pxToRem(size),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: lineHeight2
  }, fontFamily2 === defaultFontFamily ? {
    letterSpacing: `${round(letterSpacing2 / size)}em`
  } : {}, casing, allVariants);
  const variants = {
    h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return deepmerge(_extends({
    htmlFontSize,
    pxToRem,
    fontFamily: fontFamily2,
    fontSize: fontSize2,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold
  }, variants), other, {
    clone: false
    // No need to clone deep
  });
}
var _excluded6, caseAllCaps, defaultFontFamily;
var init_createTypography = __esm({
  "node_modules/@mui/material/styles/createTypography.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_esm();
    _excluded6 = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
    caseAllCaps = {
      textTransform: "uppercase"
    };
    defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
  }
});

// node_modules/@mui/material/styles/createTransitions.js
function formatMs(milliseconds) {
  return `${Math.round(milliseconds)}ms`;
}
function getAutoHeightDuration(height) {
  if (!height) {
    return 0;
  }
  const constant = height / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}
function createTransitions(inputTransitions) {
  const mergedEasing = _extends({}, easing, inputTransitions.easing);
  const mergedDuration = _extends({}, duration, inputTransitions.duration);
  const create = (props = ["all"], options = {}) => {
    const {
      duration: durationOption = mergedDuration.standard,
      easing: easingOption = mergedEasing.easeInOut,
      delay = 0
    } = options, other = _objectWithoutPropertiesLoose(options, _excluded7);
    if (true) {
      const isString = (value) => typeof value === "string";
      const isNumber = (value) => !isNaN(parseFloat(value));
      if (!isString(props) && !Array.isArray(props)) {
        console.error('MUI: Argument "props" must be a string or Array.');
      }
      if (!isNumber(durationOption) && !isString(durationOption)) {
        console.error(`MUI: Argument "duration" must be a number or a string but found ${durationOption}.`);
      }
      if (!isString(easingOption)) {
        console.error('MUI: Argument "easing" must be a string.');
      }
      if (!isNumber(delay) && !isString(delay)) {
        console.error('MUI: Argument "delay" must be a number or a string.');
      }
      if (typeof options !== "object") {
        console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join("\n"));
      }
      if (Object.keys(other).length !== 0) {
        console.error(`MUI: Unrecognized argument(s) [${Object.keys(other).join(",")}].`);
      }
    }
    return (Array.isArray(props) ? props : [props]).map((animatedProp) => `${animatedProp} ${typeof durationOption === "string" ? durationOption : formatMs(durationOption)} ${easingOption} ${typeof delay === "string" ? delay : formatMs(delay)}`).join(",");
  };
  return _extends({
    getAutoHeightDuration,
    create
  }, inputTransitions, {
    easing: mergedEasing,
    duration: mergedDuration
  });
}
var _excluded7, easing, duration;
var init_createTransitions = __esm({
  "node_modules/@mui/material/styles/createTransitions.js"() {
    init_objectWithoutPropertiesLoose();
    init_extends();
    _excluded7 = ["duration", "easing", "delay"];
    easing = {
      // This is the most common easing curve.
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
    };
    duration = {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195
    };
  }
});

// node_modules/@mui/material/styles/createMixins.js
function createMixins(breakpoints, mixins) {
  return _extends({
    toolbar: {
      minHeight: 56,
      [breakpoints.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [breakpoints.up("sm")]: {
        minHeight: 64
      }
    }
  }, mixins);
}
var init_createMixins = __esm({
  "node_modules/@mui/material/styles/createMixins.js"() {
    init_extends();
  }
});

// node_modules/@mui/material/colors/common.js
var common, common_default;
var init_common = __esm({
  "node_modules/@mui/material/colors/common.js"() {
    common = {
      black: "#000",
      white: "#fff"
    };
    common_default = common;
  }
});

// node_modules/@mui/material/colors/grey.js
var grey, grey_default;
var init_grey = __esm({
  "node_modules/@mui/material/colors/grey.js"() {
    grey = {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#f5f5f5",
      A200: "#eeeeee",
      A400: "#bdbdbd",
      A700: "#616161"
    };
    grey_default = grey;
  }
});

// node_modules/@mui/material/colors/purple.js
var purple, purple_default;
var init_purple = __esm({
  "node_modules/@mui/material/colors/purple.js"() {
    purple = {
      50: "#f3e5f5",
      100: "#e1bee7",
      200: "#ce93d8",
      300: "#ba68c8",
      400: "#ab47bc",
      500: "#9c27b0",
      600: "#8e24aa",
      700: "#7b1fa2",
      800: "#6a1b9a",
      900: "#4a148c",
      A100: "#ea80fc",
      A200: "#e040fb",
      A400: "#d500f9",
      A700: "#aa00ff"
    };
    purple_default = purple;
  }
});

// node_modules/@mui/material/colors/red.js
var red, red_default;
var init_red = __esm({
  "node_modules/@mui/material/colors/red.js"() {
    red = {
      50: "#ffebee",
      100: "#ffcdd2",
      200: "#ef9a9a",
      300: "#e57373",
      400: "#ef5350",
      500: "#f44336",
      600: "#e53935",
      700: "#d32f2f",
      800: "#c62828",
      900: "#b71c1c",
      A100: "#ff8a80",
      A200: "#ff5252",
      A400: "#ff1744",
      A700: "#d50000"
    };
    red_default = red;
  }
});

// node_modules/@mui/material/colors/orange.js
var orange, orange_default;
var init_orange = __esm({
  "node_modules/@mui/material/colors/orange.js"() {
    orange = {
      50: "#fff3e0",
      100: "#ffe0b2",
      200: "#ffcc80",
      300: "#ffb74d",
      400: "#ffa726",
      500: "#ff9800",
      600: "#fb8c00",
      700: "#f57c00",
      800: "#ef6c00",
      900: "#e65100",
      A100: "#ffd180",
      A200: "#ffab40",
      A400: "#ff9100",
      A700: "#ff6d00"
    };
    orange_default = orange;
  }
});

// node_modules/@mui/material/colors/blue.js
var blue, blue_default;
var init_blue = __esm({
  "node_modules/@mui/material/colors/blue.js"() {
    blue = {
      50: "#e3f2fd",
      100: "#bbdefb",
      200: "#90caf9",
      300: "#64b5f6",
      400: "#42a5f5",
      500: "#2196f3",
      600: "#1e88e5",
      700: "#1976d2",
      800: "#1565c0",
      900: "#0d47a1",
      A100: "#82b1ff",
      A200: "#448aff",
      A400: "#2979ff",
      A700: "#2962ff"
    };
    blue_default = blue;
  }
});

// node_modules/@mui/material/colors/lightBlue.js
var lightBlue, lightBlue_default;
var init_lightBlue = __esm({
  "node_modules/@mui/material/colors/lightBlue.js"() {
    lightBlue = {
      50: "#e1f5fe",
      100: "#b3e5fc",
      200: "#81d4fa",
      300: "#4fc3f7",
      400: "#29b6f6",
      500: "#03a9f4",
      600: "#039be5",
      700: "#0288d1",
      800: "#0277bd",
      900: "#01579b",
      A100: "#80d8ff",
      A200: "#40c4ff",
      A400: "#00b0ff",
      A700: "#0091ea"
    };
    lightBlue_default = lightBlue;
  }
});

// node_modules/@mui/material/colors/green.js
var green, green_default;
var init_green = __esm({
  "node_modules/@mui/material/colors/green.js"() {
    green = {
      50: "#e8f5e9",
      100: "#c8e6c9",
      200: "#a5d6a7",
      300: "#81c784",
      400: "#66bb6a",
      500: "#4caf50",
      600: "#43a047",
      700: "#388e3c",
      800: "#2e7d32",
      900: "#1b5e20",
      A100: "#b9f6ca",
      A200: "#69f0ae",
      A400: "#00e676",
      A700: "#00c853"
    };
    green_default = green;
  }
});

// node_modules/@mui/material/styles/createPalette.js
function addLightOrDark(intent, direction, shade, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset;
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === "light") {
      intent.light = lighten(intent.main, tonalOffsetLight);
    } else if (direction === "dark") {
      intent.dark = darken(intent.main, tonalOffsetDark);
    }
  }
}
function getDefaultPrimary(mode = "light") {
  if (mode === "dark") {
    return {
      main: blue_default[200],
      light: blue_default[50],
      dark: blue_default[400]
    };
  }
  return {
    main: blue_default[700],
    light: blue_default[400],
    dark: blue_default[800]
  };
}
function getDefaultSecondary(mode = "light") {
  if (mode === "dark") {
    return {
      main: purple_default[200],
      light: purple_default[50],
      dark: purple_default[400]
    };
  }
  return {
    main: purple_default[500],
    light: purple_default[300],
    dark: purple_default[700]
  };
}
function getDefaultError(mode = "light") {
  if (mode === "dark") {
    return {
      main: red_default[500],
      light: red_default[300],
      dark: red_default[700]
    };
  }
  return {
    main: red_default[700],
    light: red_default[400],
    dark: red_default[800]
  };
}
function getDefaultInfo(mode = "light") {
  if (mode === "dark") {
    return {
      main: lightBlue_default[400],
      light: lightBlue_default[300],
      dark: lightBlue_default[700]
    };
  }
  return {
    main: lightBlue_default[700],
    light: lightBlue_default[500],
    dark: lightBlue_default[900]
  };
}
function getDefaultSuccess(mode = "light") {
  if (mode === "dark") {
    return {
      main: green_default[400],
      light: green_default[300],
      dark: green_default[700]
    };
  }
  return {
    main: green_default[800],
    light: green_default[500],
    dark: green_default[900]
  };
}
function getDefaultWarning(mode = "light") {
  if (mode === "dark") {
    return {
      main: orange_default[400],
      light: orange_default[300],
      dark: orange_default[700]
    };
  }
  return {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: orange_default[500],
    dark: orange_default[900]
  };
}
function createPalette(palette) {
  const {
    mode = "light",
    contrastThreshold = 3,
    tonalOffset = 0.2
  } = palette, other = _objectWithoutPropertiesLoose(palette, _excluded8);
  const primary = palette.primary || getDefaultPrimary(mode);
  const secondary = palette.secondary || getDefaultSecondary(mode);
  const error = palette.error || getDefaultError(mode);
  const info = palette.info || getDefaultInfo(mode);
  const success = palette.success || getDefaultSuccess(mode);
  const warning = palette.warning || getDefaultWarning(mode);
  function getContrastText(background) {
    const contrastText = getContrastRatio(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;
    if (true) {
      const contrast = getContrastRatio(background, contrastText);
      if (contrast < 3) {
        console.error([`MUI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join("\n"));
      }
    }
    return contrastText;
  }
  const augmentColor = ({
    color,
    name,
    mainShade = 500,
    lightShade = 300,
    darkShade = 700
  }) => {
    color = _extends({}, color);
    if (!color.main && color[mainShade]) {
      color.main = color[mainShade];
    }
    if (!color.hasOwnProperty("main")) {
      throw new Error(true ? `MUI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${mainShade}\` property.` : formatMuiErrorMessage(11, name ? ` (${name})` : "", mainShade));
    }
    if (typeof color.main !== "string") {
      throw new Error(true ? `MUI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(color.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : formatMuiErrorMessage(12, name ? ` (${name})` : "", JSON.stringify(color.main)));
    }
    addLightOrDark(color, "light", lightShade, tonalOffset);
    addLightOrDark(color, "dark", darkShade, tonalOffset);
    if (!color.contrastText) {
      color.contrastText = getContrastText(color.main);
    }
    return color;
  };
  const modes = {
    dark,
    light
  };
  if (true) {
    if (!modes[mode]) {
      console.error(`MUI: The palette mode \`${mode}\` is not supported.`);
    }
  }
  const paletteOutput = deepmerge(_extends({
    // A collection of common colors.
    common: _extends({}, common_default),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode,
    // The colors used to represent primary interface elements for a user.
    primary: augmentColor({
      color: primary,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: augmentColor({
      color: secondary,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: augmentColor({
      color: error,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: augmentColor({
      color: warning,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: augmentColor({
      color: info,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: augmentColor({
      color: success,
      name: "success"
    }),
    // The grey colors.
    grey: grey_default,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText,
    // Generate a rich color object.
    augmentColor,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset
  }, modes[mode]), other);
  return paletteOutput;
}
var _excluded8, light, dark;
var init_createPalette = __esm({
  "node_modules/@mui/material/styles/createPalette.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_esm();
    init_esm();
    init_esm2();
    init_common();
    init_grey();
    init_purple();
    init_red();
    init_orange();
    init_blue();
    init_lightBlue();
    init_green();
    _excluded8 = ["mode", "contrastThreshold", "tonalOffset"];
    light = {
      // The colors used to style the text.
      text: {
        // The most important text.
        primary: "rgba(0, 0, 0, 0.87)",
        // Secondary text.
        secondary: "rgba(0, 0, 0, 0.6)",
        // Disabled text have even lower visual prominence.
        disabled: "rgba(0, 0, 0, 0.38)"
      },
      // The color used to divide different elements.
      divider: "rgba(0, 0, 0, 0.12)",
      // The background colors used to style the surfaces.
      // Consistency between these values is important.
      background: {
        paper: common_default.white,
        default: common_default.white
      },
      // The colors used to style the action elements.
      action: {
        // The color of an active action like an icon button.
        active: "rgba(0, 0, 0, 0.54)",
        // The color of an hovered action.
        hover: "rgba(0, 0, 0, 0.04)",
        hoverOpacity: 0.04,
        // The color of a selected action.
        selected: "rgba(0, 0, 0, 0.08)",
        selectedOpacity: 0.08,
        // The color of a disabled action.
        disabled: "rgba(0, 0, 0, 0.26)",
        // The background color of a disabled action.
        disabledBackground: "rgba(0, 0, 0, 0.12)",
        disabledOpacity: 0.38,
        focus: "rgba(0, 0, 0, 0.12)",
        focusOpacity: 0.12,
        activatedOpacity: 0.12
      }
    };
    dark = {
      text: {
        primary: common_default.white,
        secondary: "rgba(255, 255, 255, 0.7)",
        disabled: "rgba(255, 255, 255, 0.5)",
        icon: "rgba(255, 255, 255, 0.5)"
      },
      divider: "rgba(255, 255, 255, 0.12)",
      background: {
        paper: "#121212",
        default: "#121212"
      },
      action: {
        active: common_default.white,
        hover: "rgba(255, 255, 255, 0.08)",
        hoverOpacity: 0.08,
        selected: "rgba(255, 255, 255, 0.16)",
        selectedOpacity: 0.16,
        disabled: "rgba(255, 255, 255, 0.3)",
        disabledBackground: "rgba(255, 255, 255, 0.12)",
        disabledOpacity: 0.38,
        focus: "rgba(255, 255, 255, 0.12)",
        focusOpacity: 0.12,
        activatedOpacity: 0.24
      }
    };
  }
});

// node_modules/@mui/material/styles/shadows.js
function createShadow(...px) {
  return [`${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`, `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`, `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`].join(",");
}
var shadowKeyUmbraOpacity, shadowKeyPenumbraOpacity, shadowAmbientShadowOpacity, shadows, shadows_default2;
var init_shadows2 = __esm({
  "node_modules/@mui/material/styles/shadows.js"() {
    shadowKeyUmbraOpacity = 0.2;
    shadowKeyPenumbraOpacity = 0.14;
    shadowAmbientShadowOpacity = 0.12;
    shadows = ["none", createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];
    shadows_default2 = shadows;
  }
});

// node_modules/@mui/material/styles/zIndex.js
var zIndex2, zIndex_default;
var init_zIndex = __esm({
  "node_modules/@mui/material/styles/zIndex.js"() {
    zIndex2 = {
      mobileStepper: 1e3,
      fab: 1050,
      speedDial: 1050,
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500
    };
    zIndex_default = zIndex2;
  }
});

// node_modules/@mui/material/styles/createTheme.js
function createTheme(options = {}, ...args) {
  const {
    mixins: mixinsInput = {},
    palette: paletteInput = {},
    transitions: transitionsInput = {},
    typography: typographyInput = {}
  } = options, other = _objectWithoutPropertiesLoose(options, _excluded9);
  if (options.vars) {
    throw new Error(true ? `MUI: \`vars\` is a private field used for CSS variables support.
Please use another name.` : formatMuiErrorMessage(18));
  }
  const palette = createPalette(paletteInput);
  const systemTheme = createTheme_default(options);
  let muiTheme = deepmerge(systemTheme, {
    mixins: createMixins(systemTheme.breakpoints, mixinsInput),
    palette,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: shadows_default2.slice(),
    typography: createTypography(palette, typographyInput),
    transitions: createTransitions(transitionsInput),
    zIndex: _extends({}, zIndex_default)
  });
  muiTheme = deepmerge(muiTheme, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  if (true) {
    const stateClasses = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"];
    const traverse = (node, component) => {
      let key;
      for (key in node) {
        const child = node[key];
        if (stateClasses.indexOf(key) !== -1 && Object.keys(child).length > 0) {
          if (true) {
            const stateClass = generateUtilityClass("", key);
            console.error([`MUI: The \`${component}\` component increases the CSS specificity of the \`${key}\` internal state.`, "You can not override it like this: ", JSON.stringify(node, null, 2), "", `Instead, you need to use the '&.${stateClass}' syntax:`, JSON.stringify({
              root: {
                [`&.${stateClass}`]: child
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join("\n"));
          }
          node[key] = {};
        }
      }
    };
    Object.keys(muiTheme.components).forEach((component) => {
      const styleOverrides = muiTheme.components[component].styleOverrides;
      if (styleOverrides && component.indexOf("Mui") === 0) {
        traverse(styleOverrides, component);
      }
    });
  }
  muiTheme.unstable_sxConfig = _extends({}, defaultSxConfig_default, other == null ? void 0 : other.unstable_sxConfig);
  muiTheme.unstable_sx = function sx(props) {
    return styleFunctionSx_default({
      sx: props,
      theme: this
    });
  };
  return muiTheme;
}
function createMuiTheme(...args) {
  if (true) {
    if (!warnedOnce) {
      warnedOnce = true;
      console.error(["MUI: the createMuiTheme function was renamed to createTheme.", "", "You should use `import { createTheme } from '@mui/material/styles'`"].join("\n"));
    }
  }
  return createTheme(...args);
}
var _excluded9, warnedOnce, createTheme_default2;
var init_createTheme2 = __esm({
  "node_modules/@mui/material/styles/createTheme.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_esm();
    init_esm();
    init_esm2();
    init_generateUtilityClass();
    init_createMixins();
    init_createPalette();
    init_createTypography();
    init_shadows2();
    init_createTransitions();
    init_zIndex();
    _excluded9 = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
    warnedOnce = false;
    createTheme_default2 = createTheme;
  }
});

// node_modules/@mui/material/styles/identifier.js
var identifier_default;
var init_identifier = __esm({
  "node_modules/@mui/material/styles/identifier.js"() {
    identifier_default = "$$material";
  }
});

// node_modules/@mui/material/styles/defaultTheme.js
var defaultTheme3, defaultTheme_default;
var init_defaultTheme = __esm({
  "node_modules/@mui/material/styles/defaultTheme.js"() {
    "use client";
    init_createTheme2();
    defaultTheme3 = createTheme_default2();
    defaultTheme_default = defaultTheme3;
  }
});

// node_modules/@mui/material/styles/useThemeProps.js
function useThemeProps2({
  props,
  name
}) {
  return useThemeProps({
    props,
    name,
    defaultTheme: defaultTheme_default,
    themeId: identifier_default
  });
}
var init_useThemeProps2 = __esm({
  "node_modules/@mui/material/styles/useThemeProps.js"() {
    "use client";
    init_esm2();
    init_defaultTheme();
    init_identifier();
  }
});

// node_modules/@mui/material/styles/styled.js
var rootShouldForwardProp, slotShouldForwardProp, styled2, styled_default2;
var init_styled2 = __esm({
  "node_modules/@mui/material/styles/styled.js"() {
    "use client";
    init_esm2();
    init_defaultTheme();
    init_identifier();
    rootShouldForwardProp = (prop) => shouldForwardProp(prop) && prop !== "classes";
    slotShouldForwardProp = shouldForwardProp;
    styled2 = createStyled({
      themeId: identifier_default,
      defaultTheme: defaultTheme_default,
      rootShouldForwardProp
    });
    styled_default2 = styled2;
  }
});

export {
  GlobalStyles_default,
  createBox,
  hexToRgb,
  decomposeColor,
  private_safeColorChannel,
  recomposeColor,
  rgbToHex,
  hslToRgb,
  getLuminance,
  getContrastRatio,
  alpha,
  private_safeAlpha,
  darken,
  private_safeDarken,
  lighten,
  private_safeLighten,
  emphasize,
  private_safeEmphasize,
  ThemeProvider_default2 as ThemeProvider_default,
  createCssVarsProvider,
  createGetCssVar,
  prepareCssVars_default,
  createContainer,
  createStack,
  init_esm2 as init_esm,
  init_generateUtilityClass,
  common_default,
  init_common,
  grey_default,
  init_grey,
  purple_default,
  init_purple,
  red_default,
  init_red,
  orange_default,
  init_orange,
  blue_default,
  init_blue,
  lightBlue_default,
  init_lightBlue,
  green_default,
  init_green,
  createTypography,
  init_createTypography,
  easing,
  duration,
  init_createTransitions,
  createMuiTheme,
  createTheme_default2 as createTheme_default,
  init_createTheme2 as init_createTheme,
  defaultTheme_default,
  init_defaultTheme,
  identifier_default,
  init_identifier,
  useThemeProps2 as useThemeProps,
  init_useThemeProps2 as init_useThemeProps,
  rootShouldForwardProp,
  slotShouldForwardProp,
  styled_default2 as styled_default,
  init_styled2 as init_styled
};
/*! Bundled license information:

@mui/private-theming/index.js:
  (**
   * @mui/private-theming v5.14.18
   *
   * @license MIT
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=chunk-EPFSJFTN.js.map
