import {
  Paper_default
} from "./chunk-JFKK4E66.js";
import {
  init_composeClasses
} from "./chunk-D6NXNXP4.js";
import {
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
  chainPropTypes,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
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

// node_modules/@mui/material/Card/Card.js
init_extends();
init_objectWithoutPropertiesLoose();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx();
init_esm();
init_composeClasses();
init_styled();
init_useThemeProps();

// node_modules/@mui/material/Card/cardClasses.js
init_esm();
init_generateUtilityClass();
function getCardUtilityClass(slot) {
  return generateUtilityClass("MuiCard", slot);
}
var cardClasses = generateUtilityClasses("MuiCard", ["root"]);
var cardClasses_default = cardClasses;

// node_modules/@mui/material/Card/Card.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["className", "raised"];
var useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getCardUtilityClass, classes);
};
var CardRoot = styled_default(Paper_default, {
  name: "MuiCard",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})(() => {
  return {
    overflow: "hidden"
  };
});
var Card = React.forwardRef(function Card2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiCard"
  });
  const {
    className,
    raised = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    raised
  });
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(CardRoot, _extends({
    className: clsx_default(classes.root, className),
    elevation: raised ? 8 : void 0,
    ref,
    ownerState
  }, other));
});
true ? Card.propTypes = {
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
   * If `true`, the card will use raised styling.
   * @default false
   */
  raised: chainPropTypes(import_prop_types.default.bool, (props) => {
    if (props.raised && props.variant === "outlined") {
      return new Error('MUI: Combining `raised={true}` with `variant="outlined"` has no effect.');
    }
    return null;
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var Card_default = Card;

export {
  getCardUtilityClass,
  cardClasses_default,
  Card_default
};
//# sourceMappingURL=chunk-TLMZ3YXW.js.map
