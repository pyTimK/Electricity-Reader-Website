// @ts-nocheck

import React, { memo, useState, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import Draggable from "@azabraao/react-draggable";
import clsx from "clsx";
import { useCallbackRef } from "use-callback-ref";

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
let myDocument: Document | undefined =
  typeof window === "undefined" ? undefined : document;
var __assign = function () {
  __assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return __assign.apply(this, arguments);
};

var lockBodyScroll = function () {
  var scrollingElement = myDocument?.scrollingElement || myDocument?.body;
  scrollingElement.style.overflow = "hidden";
};
var unlockBodyScroll = function () {
  var scrollingElement = myDocument?.scrollingElement || myDocument?.body;
  scrollingElement.style.overflow = "auto";
};

var Backdrop = function (_a) {
  var onClick = _a.onClick,
    _b = _a.style,
    style = _b === void 0 ? {} : _b,
    _c = _a.className,
    className = _c === void 0 ? "" : _c,
    _d = _a.isActive,
    isActive = _d === void 0 ? false : _d;
  return React.createElement("div", {
    onClick: onClick,
    "data-testid": "backdrop",
    className: clsx(
      "BottomSheet__backdrop",
      {
        "BottomSheet__backdrop--active": isActive,
      },
      className
    ),
    style: style,
  });
};
var Backdrop$1 = memo(Backdrop);

var DragIndicator = function (_a) {
  var _b = _a.className,
    className =
      _b === void 0
        ? {
            wrap: "",
            indicator: "",
          }
        : _b,
    _c = _a.style,
    style =
      _c === void 0
        ? {
            wrap: {},
            indicator: {},
          }
        : _c;
  return React.createElement(
    "div",
    {
      className: clsx("BottomSheet__drag-indicator-wrap", className.wrap),
      style: style.wrap,
    },
    React.createElement("div", {
      className: clsx("BottomSheet__drag-indicator", className.indicator),
      style: style.indicator,
    })
  );
};
var DragIndicator$1 = memo(DragIndicator);

var useIsDesktop = function (desktopBreakpoint) {
  return window.innerWidth >= desktopBreakpoint;
};

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === "undefined") {
    return;
  }

  var head = myDocument?.head || myDocument?.getElementsByTagName("head")[0];
  var style = myDocument?.createElement("style");
  style.type = "text/css";

  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(myDocument?.createTextNode(css));
  }
}

var css_248z =
  ".BottomSheet {\n  position: fixed;\n  display: flex;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 20;\n  transition-property: opacity;\n  justify-content: center;\n  align-items: flex-end;\n  color: #0f0e17;\n}\n\n.BottomSheet--modalOnDesktop {\n  align-items: center;\n}\n\n.BottomSheet--modalOnDesktop .BottomSheet__draggable {\n  pointer-events: none;\n}\n\n.BottomSheet--modalOnDesktop .BottomSheet__window {\n  pointer-events: all;\n}\n\n.BottomSheet--open {\n  pointer-events: auto;\n  opacity: 1;\n}\n\n.BottomSheet--closed {\n  transition-delay: 300ms;\n  opacity: 0;\n}\n\n.BottomSheet--closed,\n.BottomSheet--closed.BottomSheet--modalOnDesktop .BottomSheet__window,\n.BottomSheet--closed * {\n  pointer-events: none;\n}\n\n.BottomSheet__backdrop {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 20;\n  transition-property: opacity;\n  transition-duration: 500ms;\n  pointer-events: none;\n  opacity: 0;\n}\n\n.BottomSheet__backdrop--active {\n  pointer-events: auto;\n  opacity: 1;\n  background-color: #000;\n  opacity: 0.7;\n}\n\n.BottomSheet__draggable {\n  transition-property: transform;\n  transition-duration: 300ms;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  width: 100%;\n  max-width: 72rem;\n}\n\n.BottomSheet__window-wrap {\n  display: flex;\n  position: relative;\n  z-index: 40;\n  flex-direction: column;\n  max-height: 100vh;\n  background-color: #fff;\n}\n\n.BottomSheet__drag-indicator-wrap {\n  display: flex;\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n  justify-content: center;\n  align-items: center;\n}\n\n.BottomSheet__drag-indicator {\n  width: 2.5rem;\n  height: 2px;\n  background-color: #0f0e17;\n}\n\n.BottomSheet__window {\n  overflow-y: auto;\n}\n\n.BottomSheet__window::-webkit-scrollbar {\n  display: none;\n}\n";
styleInject(css_248z);

var body = myDocument?.querySelector("body");
var UnderBody = function (_a) {
  var children = _a.children;
  return createPortal(children, body);
};
var BottomSheet = function (_a) {
  var _b, _c, _d, _e;
  var children = _a.children,
    isOpen = _a.isOpen,
    close = _a.close,
    onBackdropClick = _a.onBackdropClick,
    _f = _a.onDrag,
    onDrag = _f === void 0 ? function () {} : _f,
    _g = _a.onStart,
    onStart = _g === void 0 ? function () {} : _g,
    _h = _a.onMouseDown,
    onMouseDown = _h === void 0 ? function () {} : _h,
    _j = _a.modalOnDesktop,
    modalOnDesktop = _j === void 0 ? false : _j,
    _k = _a.desktopBreakpoint,
    desktopBreakpoint = _k === void 0 ? 1024 : _k,
    _l = _a.styles,
    styles = _l === void 0 ? {} : _l,
    _m = _a.disabled,
    disabled = _m === void 0 ? false : _m,
    _o = _a.classNames,
    classNames =
      _o === void 0
        ? {
            bottomSheet: "",
            backdrop: "",
            draggable: "",
            window: {
              wrap: "",
              content: "",
            },
            dragIndicator: {
              wrap: "",
              indicator: "",
            },
          }
        : _o;
  var isDesktop = useIsDesktop(desktopBreakpoint);
  var _p = useState(),
    rect = _p[0],
    setRect = _p[1];
  var ref = useCallbackRef(null, function (ref) {
    setRect(
      ref === null || ref === void 0 ? void 0 : ref.getBoundingClientRect()
    );
  });
  useEffect(
    function () {
      if (isOpen) lockBodyScroll();
      else unlockBodyScroll();
    },
    [isOpen]
  );
  var onDragging = useCallback(
    function (event, data) {
      onDrag(event, data);
      if (ref === null || ref === void 0 ? void 0 : ref.current) {
        ref.current.style.transition = "none";
      }
    },
    [ref]
  );
  var handleStopDragging = useCallback(
    function (_, _a) {
      var _b;
      var y = _a.y;
      if (ref.current) {
        ref.current.style.transition = "transform 0.3s ease-in-out";
        var elementHeight =
          ((_b = ref.current) === null || _b === void 0
            ? void 0
            : _b.offsetHeight) | 0;
        var elementHeightHalf = elementHeight / 2;
        var shouldClose = y > elementHeightHalf;
        if (shouldClose) close();
      }
    },
    [ref]
  );
  var position = useMemo(
    function () {
      return {
        x: 0,
        y: isOpen
          ? 0
          : (rect === null || rect === void 0 ? void 0 : rect.height) || 10000,
      };
    },
    [isOpen, rect]
  );
  return React.createElement(
    UnderBody,
    null,
    React.createElement(
      "div",
      {
        className: clsx(
          "BottomSheet",
          isOpen ? "BottomSheet--open" : "BottomSheet--closed",
          modalOnDesktop && isDesktop && "BottomSheet--modalOnDesktop",
          classNames.bottomSheet
        ),
        style: styles.bottomSheet,
      },
      React.createElement(Backdrop$1, {
        onClick: function (event) {
          if (onBackdropClick) onBackdropClick(event);
          close();
        },
        className: classNames.backdrop,
        style: styles.backdrop,
        isActive: isOpen,
      }),
      React.createElement(
        Draggable,
        {
          axis: "y",
          bounds: __assign(
            { top: 0 },
            isDesktop && modalOnDesktop && { bottom: 0 }
          ),
          position: position,
          defaultClassName: clsx(
            "BottomSheet__draggable",
            classNames.draggable
          ),
          onStop: handleStopDragging,
          onDrag: onDragging,
          onMouseDown: onMouseDown,
          onStart: onStart,
          disabled: disabled,
          nodeRef: ref,
          cancel: "[data-no-drag]",
        },
        React.createElement(
          "div",
          {
            ref: ref,
            className: clsx(
              "BottomSheet__window-wrap",
              (_b = classNames.window) === null || _b === void 0
                ? void 0
                : _b.wrap
            ),
            style:
              (_c = styles.window) === null || _c === void 0 ? void 0 : _c.wrap,
          },
          !modalOnDesktop &&
            !isDesktop &&
            React.createElement(DragIndicator$1, {
              className:
                classNames === null || classNames === void 0
                  ? void 0
                  : classNames.dragIndicator,
              style: styles.dragIndicator,
            }),
          React.createElement(
            "div",
            {
              className: clsx(
                "BottomSheet__window",
                (_d = classNames.window) === null || _d === void 0
                  ? void 0
                  : _d.content
              ),
              style:
                (_e = styles.window) === null || _e === void 0
                  ? void 0
                  : _e.content,
            },
            children
          )
        )
      )
    )
  );
};

// var ModifiedMottomSheet = BottomSheet;
// export default ModifiedMottomSheet;

var ModifiedBottomSheet = memo(BottomSheet);
export default ModifiedBottomSheet;
//# sourceMappingURL=index.js.map
