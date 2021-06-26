/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/load-external/index.js":
/*!*********************************************!*\
  !*** ./node_modules/load-external/index.js ***!
  \*********************************************/
/***/ ((module) => {

function loadExternal(url, mode, callback) {
    var script = undefined;

    if (typeof mode === 'function') {
        callback = mode;
        mode = /css/.test(url) ? 'css' : 'js';
    }

    if (mode === 'css') {
        script = document.createElement( 'link' );
        script.setAttribute( 'href', url );
        script.setAttribute( 'rel', 'stylesheet' );
        script.setAttribute( 'type', 'text/css' );
    } else {
        script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
    }

    if (script.readyState) {
        script.onreadystatechange = function() {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
                script.onreadystatechange = undefined;

                if (typeof callback === 'function') {
                    callback();
                }
            }
        };
    } else {
        script.onload = function() {
            if (typeof callback === 'function') {
                callback();
            }
        };
    }

    document.getElementsByTagName('head')[0].appendChild(script);
}

if (typeof window !== 'undefined') {
    window.loadExternal = window.externalLoader = loadExternal;
}

if (true) {
    module.exports = loadExternal;
}


/***/ }),

/***/ "./src/keycloak.json":
/*!***************************!*\
  !*** ./src/keycloak.json ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"realm":"myrealm","auth-server-url":"http://localhost:8080/auth/","ssl-required":"external","resource":"mybrowserapp","public-client":true,"confidential-port":0}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***********************!*\
  !*** ./src/index.mjs ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var load_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! load-external */ "./node_modules/load-external/index.js");
/* harmony import */ var _keycloak_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keycloak.json */ "./src/keycloak.json");

let keycloak = null;



setAuthenticated(false)

document.getElementById("logout").addEventListener("click", () => {
    keycloak.logout();
})

document.getElementById("showId").addEventListener("click", () => {
    output(keycloak.idTokenParsed)
});

document.getElementById("showAccess").addEventListener("click", () => {
    output(keycloak.idTokenParsed);
});

document.getElementById("refresh").addEventListener("click", () => {
    keycloak.updateToken(-1).then(() => { output(keycloak.idTokenParsed) })
});

function getName(_keyCloak) {
    if (_keyCloak.idTokenParsed.name)
        return _keyCloak.idTokenParsed.name;
    return _keyCloak.idTokenParsed.preferred_username;
}

function showName(name) {
    document.getElementById('name').textContent = 'Hello ' + name;
}

function output(json) {
    const output = document.getElementById("output");
    output.innerText += JSON.stringify(json) + "\n";
}

loadExternal('http://localhost:8080/auth/js/keycloak.js', () => {
    keycloak = new Keycloak({
        realm: _keycloak_json__WEBPACK_IMPORTED_MODULE_1__.realm,
        url: _keycloak_json__WEBPACK_IMPORTED_MODULE_1__["auth-server-url"],
        clientId: _keycloak_json__WEBPACK_IMPORTED_MODULE_1__.resource,
    });

    keycloak.init({ onLoad: "login-required" }).
        then((authenticated) => {
            if (!authenticated) console.log('not authenticated');
            if (authenticated) {
                const name = getName(keycloak);
                console.log(name, 'authenticated');
                showName(name);
            }
            setAuthenticated(authenticated);
        
        }).

        catch(() => {
            console.error('keycloak failed to initialize');
        });
});


function setAuthenticated(_loggedIn) {
    if (_loggedIn) {
        document.getElementById('loggedIn').style.display = 'block';
        document.getElementById('loggedOut').style.display = 'none';
    }
    else {
        document.getElementById('loggedIn').style.display = 'none';
        document.getElementById('loggedOut').style.display = 'block';
    }

}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rZXljbG9hay1zcGEvLi9ub2RlX21vZHVsZXMvbG9hZC1leHRlcm5hbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9rZXljbG9hay1zcGEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8va2V5Y2xvYWstc3BhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va2V5Y2xvYWstc3BhLy4vc3JjL2luZGV4Lm1qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSSxJQUE2QjtBQUNqQztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7VUM5Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7O0FDTnNCO0FBQ3RCOztBQUVxQzs7QUFFckM7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQSx5Q0FBeUMsaUNBQWlDO0FBQzFFLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsaURBQWU7QUFDOUIsYUFBYSw4REFBeUI7QUFDdEMsa0JBQWtCLG9EQUFrQjtBQUNwQyxLQUFLOztBQUVMLG1CQUFtQiwyQkFBMkI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGxvYWRFeHRlcm5hbCh1cmwsIG1vZGUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNjcmlwdCA9IHVuZGVmaW5lZDtcblxuICAgIGlmICh0eXBlb2YgbW9kZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjYWxsYmFjayA9IG1vZGU7XG4gICAgICAgIG1vZGUgPSAvY3NzLy50ZXN0KHVybCkgPyAnY3NzJyA6ICdqcyc7XG4gICAgfVxuXG4gICAgaWYgKG1vZGUgPT09ICdjc3MnKSB7XG4gICAgICAgIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdsaW5rJyApO1xuICAgICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCAnaHJlZicsIHVybCApO1xuICAgICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCAncmVsJywgJ3N0eWxlc2hlZXQnICk7XG4gICAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoICd0eXBlJywgJ3RleHQvY3NzJyApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgICBzY3JpcHQuc3JjID0gdXJsO1xuICAgIH1cblxuICAgIGlmIChzY3JpcHQucmVhZHlTdGF0ZSkge1xuICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoc2NyaXB0LnJlYWR5U3RhdGUgPT09ICdsb2FkZWQnIHx8IHNjcmlwdC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2NyaXB0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzY3JpcHQpO1xufVxuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cubG9hZEV4dGVybmFsID0gd2luZG93LmV4dGVybmFsTG9hZGVyID0gbG9hZEV4dGVybmFsO1xufVxuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGxvYWRFeHRlcm5hbDtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJ2xvYWQtZXh0ZXJuYWwnXG5sZXQga2V5Y2xvYWsgPSBudWxsO1xuXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL2tleWNsb2FrLmpzb25cIjtcblxuc2V0QXV0aGVudGljYXRlZChmYWxzZSlcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvdXRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBrZXljbG9hay5sb2dvdXQoKTtcbn0pXG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hvd0lkXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgb3V0cHV0KGtleWNsb2FrLmlkVG9rZW5QYXJzZWQpXG59KTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaG93QWNjZXNzXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgb3V0cHV0KGtleWNsb2FrLmlkVG9rZW5QYXJzZWQpO1xufSk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVmcmVzaFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGtleWNsb2FrLnVwZGF0ZVRva2VuKC0xKS50aGVuKCgpID0+IHsgb3V0cHV0KGtleWNsb2FrLmlkVG9rZW5QYXJzZWQpIH0pXG59KTtcblxuZnVuY3Rpb24gZ2V0TmFtZShfa2V5Q2xvYWspIHtcbiAgICBpZiAoX2tleUNsb2FrLmlkVG9rZW5QYXJzZWQubmFtZSlcbiAgICAgICAgcmV0dXJuIF9rZXlDbG9hay5pZFRva2VuUGFyc2VkLm5hbWU7XG4gICAgcmV0dXJuIF9rZXlDbG9hay5pZFRva2VuUGFyc2VkLnByZWZlcnJlZF91c2VybmFtZTtcbn1cblxuZnVuY3Rpb24gc2hvd05hbWUobmFtZSkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJykudGV4dENvbnRlbnQgPSAnSGVsbG8gJyArIG5hbWU7XG59XG5cbmZ1bmN0aW9uIG91dHB1dChqc29uKSB7XG4gICAgY29uc3Qgb3V0cHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRwdXRcIik7XG4gICAgb3V0cHV0LmlubmVyVGV4dCArPSBKU09OLnN0cmluZ2lmeShqc29uKSArIFwiXFxuXCI7XG59XG5cbmxvYWRFeHRlcm5hbCgnaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvanMva2V5Y2xvYWsuanMnLCAoKSA9PiB7XG4gICAga2V5Y2xvYWsgPSBuZXcgS2V5Y2xvYWsoe1xuICAgICAgICByZWFsbTogY29uZmlnW1wicmVhbG1cIl0sXG4gICAgICAgIHVybDogY29uZmlnW1wiYXV0aC1zZXJ2ZXItdXJsXCJdLFxuICAgICAgICBjbGllbnRJZDogY29uZmlnW1wicmVzb3VyY2VcIl0sXG4gICAgfSk7XG5cbiAgICBrZXljbG9hay5pbml0KHsgb25Mb2FkOiBcImxvZ2luLXJlcXVpcmVkXCIgfSkuXG4gICAgICAgIHRoZW4oKGF1dGhlbnRpY2F0ZWQpID0+IHtcbiAgICAgICAgICAgIGlmICghYXV0aGVudGljYXRlZCkgY29uc29sZS5sb2coJ25vdCBhdXRoZW50aWNhdGVkJyk7XG4gICAgICAgICAgICBpZiAoYXV0aGVudGljYXRlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBnZXROYW1lKGtleWNsb2FrKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhuYW1lLCAnYXV0aGVudGljYXRlZCcpO1xuICAgICAgICAgICAgICAgIHNob3dOYW1lKG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0QXV0aGVudGljYXRlZChhdXRoZW50aWNhdGVkKTtcbiAgICAgICAgXG4gICAgICAgIH0pLlxuXG4gICAgICAgIGNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2tleWNsb2FrIGZhaWxlZCB0byBpbml0aWFsaXplJyk7XG4gICAgICAgIH0pO1xufSk7XG5cblxuZnVuY3Rpb24gc2V0QXV0aGVudGljYXRlZChfbG9nZ2VkSW4pIHtcbiAgICBpZiAoX2xvZ2dlZEluKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dnZWRJbicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9nZ2VkT3V0Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dnZWRJbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dnZWRPdXQnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG5cbn0iXSwic291cmNlUm9vdCI6IiJ9