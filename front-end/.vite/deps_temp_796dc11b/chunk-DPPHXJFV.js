import {
  ButtonGroupButtonContext_default,
  ButtonGroupContext_default
} from "./chunk-2ZZMVFNY.js";
import {
  capitalize_default,
  init_capitalize
} from "./chunk-TGRCAVX2.js";
import {
  init_composeClasses
} from "./chunk-D6NXNXP4.js";
import {
  alpha,
  init_esm as init_esm2,
  init_generateUtilityClass,
  init_styled,
  init_useThemeProps,
  styled_default,
  useThemeProps
} from "./chunk-EPFSJFTN.js";
import {
  clsx_default,
  init_clsx
} from "./chunk-YVPDQO7T.js";
import {
  _extends,
  _objectWithoutPropertiesLoose,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  getValidReactChildren,
  init_esm,
  init_extends,
  init_objectWithoutPropertiesLoose,
  require_jsx_runtime,
  require_prop_types
} from "./chunk-GOL4A234.js";
import {
  __toESM,
  require_react
} from "./chunk-2FATVHAI.js";

// node_modules/@mui/material/ButtonGroup/ButtonGroup.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx();
init_composeClasses();
init_esm2();
init_esm();
init_capitalize();
init_styled();
init_useThemeProps();

// node_modules/@mui/material/ButtonGroup/buttonGroupClasses.js
init_esm();
init_generateUtilityClass();
function getButtonGroupUtilityClass(slot) {
  return generateUtilityClass("MuiButtonGroup", slot);
}
var buttonGroupClasses = generateUtilityClasses("MuiButtonGroup", ["root", "contained", "outlined", "text", "disableElevation", "disabled", "firstButton", "fullWidth", "vertical", "grouped", "groupedHorizontal", "groupedVertical", "groupedText", "groupedTextHorizontal", "groupedTextVertical", "groupedTextPrimary", "groupedTextSecondary", "groupedOutlined", "groupedOutlinedHorizontal", "groupedOutlinedVertical", "groupedOutlinedPrimary", "groupedOutlinedSecondary", "groupedContained", "groupedContainedHorizontal", "groupedContainedVertical", "groupedContainedPrimary", "groupedContainedSecondary", "lastButton", "middleButton"]);
var buttonGroupClasses_default = buttonGroupClasses;

// node_modules/@mui/material/ButtonGroup/ButtonGroup.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["children", "className", "color", "component", "disabled", "disableElevation", "disableFocusRipple", "disableRipple", "fullWidth", "orientation", "size", "variant"];
var overridesResolver = (props, styles) => {
  const {
    ownerState
  } = props;
  return [{
    [`& .${buttonGroupClasses_default.grouped}`]: styles.grouped
  }, {
    [`& .${buttonGroupClasses_default.grouped}`]: styles[`grouped${capitalize_default(ownerState.orientation)}`]
  }, {
    [`& .${buttonGroupClasses_default.grouped}`]: styles[`grouped${capitalize_default(ownerState.variant)}`]
  }, {
    [`& .${buttonGroupClasses_default.grouped}`]: styles[`grouped${capitalize_default(ownerState.variant)}${capitalize_default(ownerState.orientation)}`]
  }, {
    [`& .${buttonGroupClasses_default.grouped}`]: styles[`grouped${capitalize_default(ownerState.variant)}${capitalize_default(ownerState.color)}`]
  }, {
    [`& .${buttonGroupClasses_default.firstButton}`]: styles.firstButton
  }, {
    [`& .${buttonGroupClasses_default.lastButton}`]: styles.lastButton
  }, {
    [`& .${buttonGroupClasses_default.middleButton}`]: styles.middleButton
  }, styles.root, styles[ownerState.variant], ownerState.disableElevation === true && styles.disableElevation, ownerState.fullWidth && styles.fullWidth, ownerState.orientation === "vertical" && styles.vertical];
};
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    color,
    disabled,
    disableElevation,
    fullWidth,
    orientation,
    variant
  } = ownerState;
  const slots = {
    root: ["root", variant, orientation === "vertical" && "vertical", fullWidth && "fullWidth", disableElevation && "disableElevation"],
    grouped: ["grouped", `grouped${capitalize_default(orientation)}`, `grouped${capitalize_default(variant)}`, `grouped${capitalize_default(variant)}${capitalize_default(orientation)}`, `grouped${capitalize_default(variant)}${capitalize_default(color)}`, disabled && "disabled"],
    firstButton: ["firstButton"],
    lastButton: ["lastButton"],
    middleButton: ["middleButton"]
  };
  return composeClasses(slots, getButtonGroupUtilityClass, classes);
};
var ButtonGroupRoot = styled_default("div", {
  name: "MuiButtonGroup",
  slot: "Root",
  overridesResolver
})(({
  theme,
  ownerState
}) => _extends({
  display: "inline-flex",
  borderRadius: (theme.vars || theme).shape.borderRadius
}, ownerState.variant === "contained" && {
  boxShadow: (theme.vars || theme).shadows[2]
}, ownerState.disableElevation && {
  boxShadow: "none"
}, ownerState.fullWidth && {
  width: "100%"
}, ownerState.orientation === "vertical" && {
  flexDirection: "column"
}, {
  [`& .${buttonGroupClasses_default.grouped}`]: _extends({
    minWidth: 40,
    "&:hover": _extends({}, ownerState.variant === "contained" && {
      boxShadow: "none"
    })
  }, ownerState.variant === "contained" && {
    boxShadow: "none"
  }),
  [`& .${buttonGroupClasses_default.firstButton},& .${buttonGroupClasses_default.middleButton}`]: _extends({}, ownerState.orientation === "horizontal" && {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  }, ownerState.orientation === "vertical" && {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  }, ownerState.variant === "text" && ownerState.orientation === "horizontal" && {
    borderRight: theme.vars ? `1px solid rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)` : `1px solid ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"}`,
    [`&.${buttonGroupClasses_default.disabled}`]: {
      borderRight: `1px solid ${(theme.vars || theme).palette.action.disabled}`
    }
  }, ownerState.variant === "text" && ownerState.orientation === "vertical" && {
    borderBottom: theme.vars ? `1px solid rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)` : `1px solid ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"}`,
    [`&.${buttonGroupClasses_default.disabled}`]: {
      borderBottom: `1px solid ${(theme.vars || theme).palette.action.disabled}`
    }
  }, ownerState.variant === "text" && ownerState.color !== "inherit" && {
    borderColor: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / 0.5)` : alpha(theme.palette[ownerState.color].main, 0.5)
  }, ownerState.variant === "outlined" && ownerState.orientation === "horizontal" && {
    borderRightColor: "transparent"
  }, ownerState.variant === "outlined" && ownerState.orientation === "vertical" && {
    borderBottomColor: "transparent"
  }, ownerState.variant === "contained" && ownerState.orientation === "horizontal" && {
    borderRight: `1px solid ${(theme.vars || theme).palette.grey[400]}`,
    [`&.${buttonGroupClasses_default.disabled}`]: {
      borderRight: `1px solid ${(theme.vars || theme).palette.action.disabled}`
    }
  }, ownerState.variant === "contained" && ownerState.orientation === "vertical" && {
    borderBottom: `1px solid ${(theme.vars || theme).palette.grey[400]}`,
    [`&.${buttonGroupClasses_default.disabled}`]: {
      borderBottom: `1px solid ${(theme.vars || theme).palette.action.disabled}`
    }
  }, ownerState.variant === "contained" && ownerState.color !== "inherit" && {
    borderColor: (theme.vars || theme).palette[ownerState.color].dark
  }, {
    "&:hover": _extends({}, ownerState.variant === "outlined" && ownerState.orientation === "horizontal" && {
      borderRightColor: "currentColor"
    }, ownerState.variant === "outlined" && ownerState.orientation === "vertical" && {
      borderBottomColor: "currentColor"
    })
  }),
  [`& .${buttonGroupClasses_default.lastButton},& .${buttonGroupClasses_default.middleButton}`]: _extends({}, ownerState.orientation === "horizontal" && {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  }, ownerState.orientation === "vertical" && {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0
  }, ownerState.variant === "outlined" && ownerState.orientation === "horizontal" && {
    marginLeft: -1
  }, ownerState.variant === "outlined" && ownerState.orientation === "vertical" && {
    marginTop: -1
  })
}));
var ButtonGroup = React.forwardRef(function ButtonGroup2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiButtonGroup"
  });
  const {
    children,
    className,
    color = "primary",
    component = "div",
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    disableRipple = false,
    fullWidth = false,
    orientation = "horizontal",
    size = "medium",
    variant = "outlined"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    color,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    disableRipple,
    fullWidth,
    orientation,
    size,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  const context = React.useMemo(() => ({
    className: classes.grouped,
    color,
    disabled,
    disableElevation,
    disableFocusRipple,
    disableRipple,
    fullWidth,
    size,
    variant
  }), [color, disabled, disableElevation, disableFocusRipple, disableRipple, fullWidth, size, variant, classes.grouped]);
  const validChildren = getValidReactChildren(children);
  const childrenCount = validChildren.length;
  const getButtonPositionClassName = (index) => {
    const isFirstButton = index === 0;
    const isLastButton = index === childrenCount - 1;
    if (isFirstButton && isLastButton) {
      return "";
    }
    if (isFirstButton) {
      return classes.firstButton;
    }
    if (isLastButton) {
      return classes.lastButton;
    }
    return classes.middleButton;
  };
  return (0, import_jsx_runtime.jsx)(ButtonGroupRoot, _extends({
    as: component,
    role: "group",
    className: clsx_default(classes.root, className),
    ref,
    ownerState
  }, other, {
    children: (0, import_jsx_runtime.jsx)(ButtonGroupContext_default.Provider, {
      value: context,
      children: validChildren.map((child, index) => {
        return (0, import_jsx_runtime.jsx)(ButtonGroupButtonContext_default.Provider, {
          value: getButtonPositionClassName(index),
          children: child
        }, index);
      })
    })
  }));
});
true ? ButtonGroup.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["inherit", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types.default.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: import_prop_types.default.bool,
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: import_prop_types.default.bool,
  /**
   * If `true`, the button keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: import_prop_types.default.bool,
  /**
   * If `true`, the button ripple effect is disabled.
   * @default false
   */
  disableRipple: import_prop_types.default.bool,
  /**
   * If `true`, the buttons will take up the full width of its container.
   * @default false
   */
  fullWidth: import_prop_types.default.bool,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: import_prop_types.default.oneOf(["horizontal", "vertical"]),
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["small", "medium", "large"]), import_prop_types.default.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["contained", "outlined", "text"]), import_prop_types.default.string])
} : void 0;
var ButtonGroup_default = ButtonGroup;

export {
  getButtonGroupUtilityClass,
  buttonGroupClasses_default,
  ButtonGroup_default
};
//# sourceMappingURL=chunk-DPPHXJFV.js.map
