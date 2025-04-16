(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 7967:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./node_modules/next/script.js
var script = __webpack_require__(4298);
var script_default = /*#__PURE__*/__webpack_require__.n(script);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
;// CONCATENATED MODULE: external "redux"
const external_redux_namespaceObject = require("redux");
;// CONCATENATED MODULE: external "redux-thunk"
const external_redux_thunk_namespaceObject = require("redux-thunk");
var external_redux_thunk_default = /*#__PURE__*/__webpack_require__.n(external_redux_thunk_namespaceObject);
;// CONCATENATED MODULE: ./store/reducers/homeReducer.js
const initialState = {
    data: {},
    loading: {},
    error: {}
};
const homeReducer = (state = initialState, action)=>{
    const { type , payload , error  } = action;
    // Handle loading state
    if (type.startsWith("FETCH_") && type.endsWith("_REQUEST")) {
        const apiName = type.split("_")[1].toLowerCase();
        return {
            ...state,
            loading: {
                ...state.loading,
                [apiName]: true
            },
            error: {
                ...state.error,
                [apiName]: null
            }
        };
    }
    // Handle success state
    if (type.startsWith("SET_") && type.endsWith("_DATA")) {
        const apiName1 = type.split("_")[1].toLowerCase();
        return {
            ...state,
            data: {
                ...state.data,
                [apiName1]: payload
            },
            loading: {
                ...state.loading,
                [apiName1]: false
            }
        };
    }
    // Handle error state
    if (type.startsWith("FETCH_") && type.endsWith("_FAILURE")) {
        const apiName2 = type.split("_")[1].toLowerCase();
        return {
            ...state,
            loading: {
                ...state.loading,
                [apiName2]: false
            },
            error: {
                ...state.error,
                [apiName2]: error
            }
        };
    }
    return state;
};
/* harmony default export */ const reducers_homeReducer = (homeReducer);

;// CONCATENATED MODULE: ./store/reducers/reducers.js


const rootReducer = (0,external_redux_namespaceObject.combineReducers)({
    apiData: reducers_homeReducer
});
/* harmony default export */ const reducers = (rootReducer);

;// CONCATENATED MODULE: external "next-redux-wrapper"
const external_next_redux_wrapper_namespaceObject = require("next-redux-wrapper");
;// CONCATENATED MODULE: ./store/store.js




// Define makeStore as a function that creates the store
const store = ()=>(0,external_redux_namespaceObject.createStore)(reducers, (0,external_redux_namespaceObject.applyMiddleware)((external_redux_thunk_default())));
// Pass store function to createWrapper
const wrapper = (0,external_next_redux_wrapper_namespaceObject.createWrapper)(store);
/* harmony default export */ const store_store = ((/* unused pure expression or super */ null && (store)));

// EXTERNAL MODULE: ./store/actions/authActions.js + 1 modules
var authActions = __webpack_require__(7923);
// EXTERNAL MODULE: ./styles/globals.css
var globals = __webpack_require__(6764);
;// CONCATENATED MODULE: ./pages/_app.js


// import { Provider } from 'react-redux';




 // Adjusted import

function MyApp({ Component , pageProps  }) {
    const dispatch = (0,external_react_redux_.useDispatch)();
    (0,external_react_.useEffect)(()=>{
        dispatch((0,authActions/* loadUserFromLocalStorage */.A9)());
    }, [
        dispatch
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((head_default()), {
                children: /*#__PURE__*/ jsx_runtime_.jsx("link", {
                    rel: "shortcut icon",
                    type: "image/x-icon",
                    href: "/assets/img/favicon.ico"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((script_default()), {
                src: "https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js",
                strategy: "beforeInteractive"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((script_default()), {
                src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js",
                strategy: "lazyOnload"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((script_default()), {
                src: "/lib/wow/wow.min.js",
                strategy: "lazyOnload"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((script_default()), {
                src: "/lib/easing/easing.min.js",
                strategy: "lazyOnload"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((script_default()), {
                src: "/lib/waypoints/waypoints.min.js" // Fixed typo from 'jss' to 'js'
                ,
                strategy: "lazyOnload"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((script_default()), {
                src: "/lib/counterup/counterup.min.js",
                strategy: "lazyOnload"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((script_default()), {
                src: "/lib/lightbox/js/lightbox.min.js",
                strategy: "lazyOnload"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((script_default()), {
                src: "/js/main.js",
                strategy: "lazyOnload"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            })
        ]
    });
}
/* harmony default export */ const _app = (wrapper.withRedux(MyApp));


/***/ }),

/***/ 6764:
/***/ (() => {



/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ 6022:
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [298,923], () => (__webpack_exec__(7967)));
module.exports = __webpack_exports__;

})();