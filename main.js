!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(0);function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=function(){function e(t,n,r,o,i,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._item=t,this._templateSelector=n,this._handleCardClick=r,this._handleDelete=i,this._handleLike=a,this._currentUserId=o}var t,n,o;return t=e,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(!0)}},{key:"generateCard",value:function(){var e=this;return this._card=this._getTemplate(),this._cardImage=this._card.querySelector(".element__image"),this._cardLike=this._card.querySelector(".element__like"),this._cardLikeCount=this._card.querySelector(".element__like-number"),this._cardDeleteButton=this._card.querySelector(".element__delete"),this._cardImage.src=this._item.link,this._cardImage.alt=this._item.name,this._card.querySelector(".element__name").textContent=this._item.name,this._cardLikeCount.textContent=this._item.likes.length,this._item.likes.find((function(t){return t._id===e._currentUserId}))&&this._cardLike.classList.add("element__like_active"),this._currentUserId!==this._item.owner._id&&this._cardDeleteButton.remove(),this._setEventListener(),this._card}},{key:"_setEventListener",value:function(){var e=this;this._cardLike.addEventListener("click",(function(){e._handleLike(e._item._id)})),this._cardDeleteButton&&this._cardDeleteButton.addEventListener("click",(function(){e._handleDelete({card:e,cardId:e._item._id})})),this._cardImage.addEventListener("click",(function(){e._handleCardClick(e._item.name,e._item.link)}))}},{key:"likeCard",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this._cardLike.classList.toggle("element__like_active"),this._cardLikeCount.textContent=e}},{key:"isLiked",value:function(){return this._cardLike.classList.contains("element__like_active")}},{key:"remove",value:function(){this._card.remove(),this._card=null}}])&&r(t.prototype,n),o&&r(t,o),e}();function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._selectors=t,this._form=n,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass}var t,n,r;return t=e,(n=[{key:"_showInputError",value:function(e,t){var n=this._form.querySelector("#".concat(e.id,"-error"));e.classList.add(this._inputErrorClass),n.textContent=t,n.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(e){var t=this._form.querySelector("#".concat(e.id,"-error"));e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass),t.textContent=""}},{key:"_isValid",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_setEventListener",value:function(){var e=this,t=Array.from(this._form.querySelectorAll(this._inputSelector)),n=this._form.querySelector(this._submitButtonSelector);t.forEach((function(r){r.addEventListener("input",(function(){e._isValid(r),e._toggleButtonState(t,n)}))}))}},{key:"_hasInvalidInput",value:function(e){return e.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(e,t){this._hasInvalidInput(e)?t.classList.add(this._inactiveButtonClass):(t.disabled=!1,t.classList.remove(this._inactiveButtonClass))}},{key:"enableValidation",value:function(){this._form.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListener()}},{key:"clearFormErrors",value:function(){var e=this;this._form.querySelectorAll(".popup__form-input_error").forEach((function(t){t.classList.remove("popup__form-input_error");var n=e._form.querySelector("#".concat(t.id,"-error"));n.classList.remove(".popup__form-input-error_active"),n.textContent=""}))}}])&&i(t.prototype,n),r&&i(t,r),e}();function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=r,this._renderer=o,this._container=document.querySelector(n)}var t,n,r;return t=e,(n=[{key:"renderItems",value:function(){var e=this;this._items.forEach((function(t){e.addItem(e._renderer(t))}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&u(t.prototype,n),r&&u(t,r),e}();function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._closeButton=this._popup.querySelector(".popup__close"),this._handleEscClose=this._handleEscClose.bind(this),this._handleOverlayClose=this._handleOverlayClose.bind(this)}var t,n,r;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("click",this._handleOverlayClose),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){document.removeEventListener("click",this._handleOverlayClose),document.removeEventListener("keydown",this._handleEscClose),this._popup.classList.remove("popup_opened")}},{key:"_handleEscClose",value:function(e){27===e.keyCode&&this.close()}},{key:"_handleOverlayClose",value:function(e){e.target.classList.contains("popup_opened")&&this.close()}},{key:"setEventListener",value:function(){var e=this;this._closeButton.addEventListener("click",(function(){e.close()}))}}])&&s(t.prototype,n),r&&s(t,r),e}();function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e,t,n){return(d="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=v(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function h(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=v(e);if(t){var o=v(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return m(this,n)}}function m(e,t){return!t||"object"!==f(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function v(e){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var y=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}(i,e);var t,n,r,o=h(i);function i(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),(t=o.call(this,e))._popupName=t._popup.querySelector(".popup-card__name"),t._popupImage=t._popup.querySelector(".popup-card__image"),t}return t=i,(n=[{key:"open",value:function(e,t){this._popupName.textContent=e,this._popupImage.src=t,d(v(i.prototype),"open",this).call(this)}}])&&p(t.prototype,n),r&&p(t,r),i}(l);function b(e){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function k(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function g(e,t,n){return(g="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=O(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function C(e,t){return(C=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function S(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=O(e);if(t){var o=O(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return E(this,n)}}function E(e,t){return!t||"object"!==b(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function O(e){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var w=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&C(e,t)}(i,e);var t,n,r,o=S(i);function i(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),(n=o.call(this,e))._handleFormSubmit=t,n._popupForm=n._popup.querySelector(".popup__form"),n}return t=i,(n=[{key:"open",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};g(O(i.prototype),"open",this).call(this),this._submitParams=e}},{key:"_getInputValues",value:function(){var e=this;return this._inputList=this._popupForm.querySelectorAll(".popup__form-input"),this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"setEventListener",value:function(){var e=this;g(O(i.prototype),"setEventListener",this).call(this),this._popup.addEventListener("submit",(function(t){t.preventDefault(),e._handleFormSubmit(e._getInputValues(),e._submitParams)}))}},{key:"clearForm",value:function(){this._popupForm.reset()}}])&&k(t.prototype,n),r&&k(t,r),i}(l);function L(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var j=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userName=document.querySelector(t),this._userInfo=document.querySelector(n),this._userImage=document.querySelector(r)}var t,n,r;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._userName.textContent,info:this._userInfo.textContent}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.info;this._userName.textContent=t,this._userInfo.textContent=n}},{key:"setUserAvatar",value:function(e){this._userImage.src=e}}])&&L(t.prototype,n),r&&L(t,r),e}();function P(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function q(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function I(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var x=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._options=t,this._fetch=function(e,t){return fetch("".concat(n._options.baseUrl).concat(e),function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?P(Object(n),!0).forEach((function(t){q(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({headers:n._options.headers},t)).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}}var t,n,r;return t=e,(n=[{key:"getInitialCards",value:function(){return this._fetch("/cards")}},{key:"getUser",value:function(){return this._fetch("/users/me")}},{key:"editUser",value:function(e,t){return this._fetch("/users/me",{method:"PATCH",body:JSON.stringify({name:e,about:t})})}},{key:"addNewCard",value:function(e,t){return this._fetch("/cards",{method:"POST",body:JSON.stringify({name:e,link:t})})}},{key:"deleteCard",value:function(e){return this._fetch("/cards/".concat(e),{method:"DELETE"})}},{key:"likeCard",value:function(e){return this._fetch("/cards/likes/".concat(e),{method:"PUT"})}},{key:"unLikeCard",value:function(e){return this._fetch("/cards/likes/".concat(e),{method:"DELETE"})}},{key:"updateAvatar",value:function(e){return this._fetch("/users/me/avatar",{method:"PATCH",body:JSON.stringify({avatar:e})})}}])&&I(t.prototype,n),r&&I(t,r),e}(),T=new w(".popup__edit-profile",(function(e){var t=e.name,n=e.value;t&&n&&(G.disabled=!0,G.textContent="Загрузка...",ee.editUser(t,n).then((function(e){A.setUserInfo({name:e.name,info:e.about}),T.clearForm(),G.disabled=!1,G.textContent="Сохранить"})).catch((function(e){return console.error("Error edit user ".concat(e))})).finally((function(){return T.close()})))})),D=new w(".popup__add-card",(function(e){var t=e.name,n=e.value;t&&n&&(W.disabled=!0,W.textContent="Загрузка...",ee.addNewCard(t,n).then((function(e){var t=new o(e,"#element",oe,$,ae,(function(e){return ue(e,t)})),n=t.generateCard();!function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];e[n?"prepend":"appendChild"](t)}(F,n,!0),D.clearForm(),W.disabled=!1,W.textContent="Сохранить"})).catch((function(e){return console.error("Error add new card ".concat(e))})).finally((function(){return D.close()})))})),R=new y(".popup-card"),U=new w(".popup__delete",(function(e,t){ee.deleteCard(t.cardId).then((function(){return t.card.remove()})).catch((function(e){return console.error("Error delete card ".concat(e))})).finally((function(){return U.close()}))})),B=new w(".popup__avatar",(function(e){var t=e.avatar;K.disabled=!0,K.textContent="Загрузка...",ee.updateAvatar(t).then((function(e){A.setUserAvatar(e.avatar),B.clearForm(),K.disabled=!1,K.textContent="Сохранить"})).catch((function(e){return console.error("Error update avatar ".concat(e))})).finally((function(){return B.close()}))}));T.setEventListener(),D.setEventListener(),R.setEventListener(),U.setEventListener(),B.setEventListener();var F=document.querySelector(".elements"),A=new j(".profile__title",".profile__subtitle",".profile__avatar"),N=document.querySelector(".profile__edit-button"),V=document.querySelector(".profile__add-button"),M=document.querySelector(".popup__edit-profile .popup__form"),J=M.querySelector('.popup__form-input[name="name"]'),H=M.querySelector('.popup__form-input[name="value"]'),z=document.querySelector(".popup__avatar .popup__form"),G=document.querySelector(".popup__edit-profile .popup__form-submit"),K=document.querySelector(".popup__avatar .popup__form-submit"),Q=document.querySelector(".popup__add-card .popup__form"),W=Q.querySelector(".popup__form-submit"),X=Q.querySelector('.popup__form-input[name="name"]'),Y=Q.querySelector('.popup__form-input[name="value"]'),Z=document.querySelector(".profile__avatar"),$=null,ee=new x({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-13",headers:{authorization:"92793e11-3eaf-472b-8353-57e23ae30eee","Content-Type":"application/json"}});N.addEventListener("click",(function(){var e=A.getUserInfo(),t=e.name,n=e.info;ne.clearFormErrors(),J.value=t,H.value=n,T.open()}));V.addEventListener("click",(function(){W.classList.add("popup__form-submit_disabled"),W.disabled=!0,re.clearFormErrors(),X.value="",Y.value="",D.open()}));var te={inputSelector:".popup__form-input",submitButtonSelector:".popup__form-submit",inactiveButtonClass:"popup__form-submit_disabled",inputErrorClass:"popup__form-input_error",errorClass:"popup__form-input-error_active"},ne=new a(te,M),re=new a(te,Q);function oe(e,t){R.open(e,t)}ne.enableValidation(),re.enableValidation(),Z.addEventListener("click",(function(){ie.clearFormErrors(),B.clearForm(),B.open()}));var ie=new a(te,z);function ae(e){U.open(e)}function ue(e,t){var n=t.isLiked()?"unLikeCard":"likeCard";ee[n](e).then((function(e){t.likeCard(e.likes.length)}))}ie.enableValidation(),ee.getUser().then((function(e){return $=e._id,A.setUserInfo({name:e.name,info:e.about}),A.setUserAvatar(e.avatar),e})).then((function(){ee.getInitialCards().then((function(e){new c({items:e,renderer:function(e){var t=new o(e,"#element",oe,$,ae,(function(e){return ue(e,t)}));return t.generateCard()}},".elements").renderItems()})).catch((function(e){return console.error("Error fetching initial cards: ".concat(e))}))}))}]);