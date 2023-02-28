"use strict";
exports.id = "component---src-pages-index-tsx";
exports.ids = ["component---src-pages-index-tsx"];
exports.modules = {

/***/ "./src/pages/index.tsx?export=default":
/*!********************************************!*\
  !*** ./src/pages/index.tsx?export=default ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! styled-components */ "../../node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hooks */ "./src/hooks/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components */ "./src/components/index.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");







const Container = styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].div.withConfig({
  displayName: "pages__Container"
})(["display:flex;flex-direction:column;align-items:center;flex:1;margin-top:7.6rem;margin-bottom:7.6rem;", "{padding-left:2.4rem;padding-right:2.4rem;margin-top:2rem;margin-bottom:2rem;width:auto;}"], ({
  theme
}) => theme.mediaQueries.small);
const Heading = styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].h1.withConfig({
  displayName: "pages__Heading"
})(["margin-top:0;margin-bottom:2.4rem;text-align:center;"]);
const Span = styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].span.withConfig({
  displayName: "pages__Span"
})(["color:", ";"], props => props.theme.colors.primary.default);
const Subtitle = styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].p.withConfig({
  displayName: "pages__Subtitle"
})(["font-size:", ";font-weight:500;margin-top:0;margin-bottom:0;", "{font-size:", ";}"], ({
  theme
}) => theme.fontSizes.large, ({
  theme
}) => theme.mediaQueries.small, ({
  theme
}) => theme.fontSizes.text);
const CardContainer = styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].div.withConfig({
  displayName: "pages__CardContainer"
})(["display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-between;max-width:64.8rem;width:100%;height:100%;margin-top:1.5rem;"]);
const Notice = styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].div.withConfig({
  displayName: "pages__Notice"
})(["background-color:", ";border:1px solid ", ";color:", ";border-radius:", ";padding:2.4rem;margin-top:2.4rem;max-width:60rem;width:100%;& > *{margin:0;}", "{margin-top:1.2rem;padding:1.6rem;}"], ({
  theme
}) => theme.colors.background.alternative, ({
  theme
}) => theme.colors.border.default, ({
  theme
}) => theme.colors.text.alternative, ({
  theme
}) => theme.radii.default, ({
  theme
}) => theme.mediaQueries.small);
const ErrorMessage = styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].div.withConfig({
  displayName: "pages__ErrorMessage"
})(["background-color:", ";border:1px solid ", ";color:", ";border-radius:", ";padding:2.4rem;margin-bottom:2.4rem;margin-top:2.4rem;max-width:60rem;width:100%;", "{padding:1.6rem;margin-bottom:1.2rem;margin-top:1.2rem;max-width:100%;}"], ({
  theme
}) => theme.colors.error.muted, ({
  theme
}) => theme.colors.error.default, ({
  theme
}) => theme.colors.error.alternative, ({
  theme
}) => theme.radii.default, ({
  theme
}) => theme.mediaQueries.small);
const Index = () => {
  const {
    0: state,
    1: dispatch
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_hooks__WEBPACK_IMPORTED_MODULE_1__.MetaMaskContext);
  const handleConnectClick = async () => {
    try {
      await (0,_utils__WEBPACK_IMPORTED_MODULE_2__.connectSnap)();
      const installedSnap = await (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getSnap)();
      dispatch({
        type: _hooks__WEBPACK_IMPORTED_MODULE_1__.MetamaskActions.SetInstalled,
        payload: installedSnap
      });
    } catch (e) {
      console.error(e);
      dispatch({
        type: _hooks__WEBPACK_IMPORTED_MODULE_1__.MetamaskActions.SetError,
        payload: e
      });
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(Container, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Heading, {
      children: "Welcome to the Forta snap"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Subtitle, {
      children: "Install the Forta snap below"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(CardContainer, {
      children: [state.error && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(ErrorMessage, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("b", {
          children: "An error happened:"
        }), " ", state.error.message]
      }), !state.isFlask && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components__WEBPACK_IMPORTED_MODULE_3__.Card, {
        content: {
          title: 'Install',
          description: 'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
          button: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components__WEBPACK_IMPORTED_MODULE_3__.InstallFlaskButton, {})
        },
        fullWidth: true
      }), !state.installedSnap && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components__WEBPACK_IMPORTED_MODULE_3__.Card, {
        content: {
          title: 'Connect',
          description: 'Get started by connecting to and installing the example snap.',
          button: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components__WEBPACK_IMPORTED_MODULE_3__.ConnectButton, {
            onClick: handleConnectClick,
            disabled: !state.isFlask
          })
        },
        disabled: !state.isFlask,
        fullWidth: true
      }), (0,_utils__WEBPACK_IMPORTED_MODULE_2__.shouldDisplayReconnectButton)(state.installedSnap) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components__WEBPACK_IMPORTED_MODULE_3__.Card, {
        content: {
          title: 'Reconnect',
          description: 'While connected to a local running snap this button will always be displayed in order to update the snap if a change is made.',
          button: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components__WEBPACK_IMPORTED_MODULE_3__.ReconnectButton, {
            onClick: handleConnectClick,
            disabled: !state.installedSnap
          })
        },
        disabled: !state.installedSnap,
        fullWidth: true
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Index);

/***/ })

};
;
//# sourceMappingURL=component---src-pages-index-tsx.js.map