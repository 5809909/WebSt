/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: Cannot find module 'babel-core'\n    at Function.Module._resolveFilename (module.js:547:15)\n    at Function.Module._load (module.js:474:25)\n    at Module.require (module.js:596:17)\n    at require (C:\\Users\\User\\WebstormProjects\\WebSt\\web\\node_modules\\v8-compile-cache\\v8-compile-cache.js:159:20)\n    at Object.<anonymous> (C:\\Users\\User\\WebstormProjects\\WebSt\\node_modules\\babel-loader\\lib\\index.js:3:13)\n    at Module._compile (C:\\Users\\User\\WebstormProjects\\WebSt\\web\\node_modules\\v8-compile-cache\\v8-compile-cache.js:178:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)\n    at Function.Module._load (module.js:497:3)\n    at Module.require (module.js:596:17)\n    at require (C:\\Users\\User\\WebstormProjects\\WebSt\\web\\node_modules\\v8-compile-cache\\v8-compile-cache.js:159:20)\n    at loadLoader (C:\\Users\\User\\WebstormProjects\\WebSt\\web\\node_modules\\loader-runner\\lib\\loadLoader.js:13:17)\n    at iteratePitchingLoaders (C:\\Users\\User\\WebstormProjects\\WebSt\\web\\node_modules\\loader-runner\\lib\\LoaderRunner.js:169:2)\n    at runLoaders (C:\\Users\\User\\WebstormProjects\\WebSt\\web\\node_modules\\loader-runner\\lib\\LoaderRunner.js:362:2)\n    at NormalModule.doBuild (C:\\Users\\User\\WebstormProjects\\WebSt\\web\\node_modules\\webpack\\lib\\NormalModule.js:225:3)\n    at NormalModule.build (C:\\Users\\User\\WebstormProjects\\WebSt\\web\\node_modules\\webpack\\lib\\NormalModule.js:343:15)\n    at Compilation.buildModule (C:\\Users\\User\\WebstormProjects\\WebSt\\web\\node_modules\\webpack\\lib\\Compilation.js:361:10)\n    at moduleFactory.create (C:\\Users\\User\\WebstormProjects\\WebSt\\web\\node_modules\\webpack\\lib\\Compilation.js:717:12)\n    at factory (C:\\Users\\User\\WebstormProjects\\WebSt\\web\\node_modules\\webpack\\lib\\NormalModuleFactory.js:366:6)\n    at hooks.afterResolve.callAsync (C:\\Users\\User\\WebstormProjects\\WebSt\\web\\node_modules\\webpack\\lib\\NormalModuleFactory.js:143:13)\n    at AsyncSeriesWaterfallHook.eval [as callAsync] (eval at create (C:\\Users\\User\\WebstormProjects\\WebSt\\web\\node_modules\\tapable\\lib\\HookCodeFactory.js:24:12), <anonymous>:6:1)\n    at AsyncSeriesWaterfallHook.lazyCompileHook [as _callAsync] (C:\\Users\\User\\WebstormProjects\\WebSt\\web\\node_modules\\tapable\\lib\\Hook.js:35:21)\n    at resolver (C:\\Users\\User\\WebstormProjects\\WebSt\\web\\node_modules\\webpack\\lib\\NormalModuleFactory.js:126:29)\n    at process.nextTick (C:\\Users\\User\\WebstormProjects\\WebSt\\web\\node_modules\\webpack\\lib\\NormalModuleFactory.js:304:9)\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map