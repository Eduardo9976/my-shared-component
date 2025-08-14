import { d as defineComponent, i as createContext, k as useVModel, l as ref, t as toRefs, r as renderSlot, u as unref, j as useForwardExpose, c as createBlock, o as openBlock, w as withCtx, v as mergeProps, P as Primitive, f as onMounted, h as createVNode, ai as useEmitAsProps, p as createCommentVNode, I as normalizeProps, J as guardReactiveProps, aj as shallowRef, ak as makeDestructurable, al as camelize, a2 as createSharedComposable, e as computed, a4 as reactive, N as useSlots, O as useLocale, Q as useForwardPropsEmits, R as reactivePick, a0 as toRef, S as tv, U as useAppConfig, W as normalizeClass, aa as toHandlers, B as createTextVNode, C as toDisplayString, F as createElementBlock, a as createBaseVNode, Z as _sfc_main$m, am as useModel, q as watch, T as Teleport, an as reactiveOmit, a1 as omit, ao as isArrayOfArray, V as _sfc_main$n, _ as _sfc_main$o, af as get, G as Fragment, Y as renderList, X as resolveDynamicComponent, ap as createSlots, aq as _sfc_main$p, ar as pickLinkProps, as as _sfc_main$q, a9 as defu, ag as defineCustomElement, ah as tailwindStyles } from "./main.js";
import { u as useId, d as getActiveElement, s as _sfc_main$i, t as getOpenState, v as _sfc_main$j, x as useHideOthers, P as Presence, y as useBodyScrollLock, e as _sfc_main$k, l as usePortal, c as _sfc_main$l, D as DropdownMenu, z as _sfc_main$r, A as _sfc_main$s, B as _sfc_main$t, q as _sfc_main$u, o as _sfc_main$v, r as meIconStyles } from "./me-icon.min.js";
const [injectDialogRootContext, provideDialogRootContext] = createContext("DialogRoot");
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "DialogRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: false },
    modal: { type: Boolean, default: true }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const open = useVModel(props, "open", emit, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    const triggerElement = ref();
    const contentElement = ref();
    const { modal } = toRefs(props);
    provideDialogRootContext({
      open,
      modal,
      openModal: () => {
        open.value = true;
      },
      onOpenChange: (value) => {
        open.value = value;
      },
      onOpenToggle: () => {
        open.value = !open.value;
      },
      contentId: "",
      titleId: "",
      descriptionId: "",
      triggerElement,
      contentElement
    });
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default", {
        open: unref(open),
        close: () => open.value = false
      });
    };
  }
});
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "DialogClose",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    const rootContext = injectDialogRootContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        type: _ctx.as === "button" ? "button" : void 0,
        onClick: _cache[0] || (_cache[0] = ($event) => unref(rootContext).onOpenChange(false))
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["type"]);
    };
  }
});
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "DialogContentImpl",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectDialogRootContext();
    const { forwardRef, currentElement: contentElement } = useForwardExpose();
    rootContext.titleId ||= useId(void 0, "reka-dialog-title");
    rootContext.descriptionId ||= useId(void 0, "reka-dialog-description");
    onMounted(() => {
      rootContext.contentElement = contentElement;
      if (getActiveElement() !== document.body)
        rootContext.triggerElement.value = getActiveElement();
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$j), {
        "as-child": "",
        loop: "",
        trapped: props.trapFocus,
        onMountAutoFocus: _cache[5] || (_cache[5] = ($event) => emits("openAutoFocus", $event)),
        onUnmountAutoFocus: _cache[6] || (_cache[6] = ($event) => emits("closeAutoFocus", $event))
      }, {
        default: withCtx(() => [
          createVNode(unref(_sfc_main$i), mergeProps({
            id: unref(rootContext).contentId,
            ref: unref(forwardRef),
            as: _ctx.as,
            "as-child": _ctx.asChild,
            "disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
            role: "dialog",
            "aria-describedby": unref(rootContext).descriptionId,
            "aria-labelledby": unref(rootContext).titleId,
            "data-state": unref(getOpenState)(unref(rootContext).open.value)
          }, _ctx.$attrs, {
            onDismiss: _cache[0] || (_cache[0] = ($event) => unref(rootContext).onOpenChange(false)),
            onEscapeKeyDown: _cache[1] || (_cache[1] = ($event) => emits("escapeKeyDown", $event)),
            onFocusOutside: _cache[2] || (_cache[2] = ($event) => emits("focusOutside", $event)),
            onInteractOutside: _cache[3] || (_cache[3] = ($event) => emits("interactOutside", $event)),
            onPointerDownOutside: _cache[4] || (_cache[4] = ($event) => emits("pointerDownOutside", $event))
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["id", "as", "as-child", "disable-outside-pointer-events", "aria-describedby", "aria-labelledby", "data-state"])
        ]),
        _: 3
      }, 8, ["trapped"]);
    };
  }
});
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "DialogContentModal",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectDialogRootContext();
    const emitsAsProps = useEmitAsProps(emits);
    const { forwardRef, currentElement } = useForwardExpose();
    useHideOthers(currentElement);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$f, mergeProps({ ...props, ...unref(emitsAsProps) }, {
        ref: unref(forwardRef),
        "trap-focus": unref(rootContext).open.value,
        "disable-outside-pointer-events": true,
        onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
          if (!event.defaultPrevented) {
            event.preventDefault();
            unref(rootContext).triggerElement.value?.focus();
          }
        }),
        onPointerDownOutside: _cache[1] || (_cache[1] = (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: _cache[2] || (_cache[2] = (event) => {
          event.preventDefault();
        })
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["trap-focus"]);
    };
  }
});
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "DialogContentNonModal",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const emitsAsProps = useEmitAsProps(emits);
    useForwardExpose();
    const rootContext = injectDialogRootContext();
    const hasInteractedOutsideRef = ref(false);
    const hasPointerDownOutsideRef = ref(false);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$f, mergeProps({ ...props, ...unref(emitsAsProps) }, {
        "trap-focus": false,
        "disable-outside-pointer-events": false,
        onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.value) unref(rootContext).triggerElement.value?.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.value = false;
          hasPointerDownOutsideRef.value = false;
        }),
        onInteractOutside: _cache[1] || (_cache[1] = (event) => {
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.value = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.value = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = unref(rootContext).triggerElement.value?.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.value) {
            event.preventDefault();
          }
        })
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "DialogContent",
  props: {
    forceMount: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectDialogRootContext();
    const emitsAsProps = useEmitAsProps(emits);
    const { forwardRef } = useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Presence), {
        present: _ctx.forceMount || unref(rootContext).open.value
      }, {
        default: withCtx(() => [
          unref(rootContext).modal.value ? (openBlock(), createBlock(_sfc_main$e, mergeProps({
            key: 0,
            ref: unref(forwardRef)
          }, { ...props, ...unref(emitsAsProps), ..._ctx.$attrs }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16)) : (openBlock(), createBlock(_sfc_main$d, mergeProps({
            key: 1,
            ref: unref(forwardRef)
          }, { ...props, ...unref(emitsAsProps), ..._ctx.$attrs }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16))
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "DialogDescription",
  props: {
    asChild: { type: Boolean },
    as: { default: "p" }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    const rootContext = injectDialogRootContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        id: unref(rootContext).descriptionId
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["id"]);
    };
  }
});
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "DialogOverlayImpl",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const rootContext = injectDialogRootContext();
    useBodyScrollLock(true);
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "data-state": unref(rootContext).open.value ? "open" : "closed",
        style: { "pointer-events": "auto" }
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as", "as-child", "data-state"]);
    };
  }
});
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "DialogOverlay",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const rootContext = injectDialogRootContext();
    const { forwardRef } = useForwardExpose();
    return (_ctx, _cache) => {
      return unref(rootContext)?.modal.value ? (openBlock(), createBlock(unref(Presence), {
        key: 0,
        present: _ctx.forceMount || unref(rootContext).open.value
      }, {
        default: withCtx(() => [
          createVNode(_sfc_main$a, mergeProps(_ctx.$attrs, {
            ref: unref(forwardRef),
            as: _ctx.as,
            "as-child": _ctx.asChild
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["as", "as-child"])
        ]),
        _: 3
      }, 8, ["present"])) : createCommentVNode("", true);
    };
  }
});
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "DialogTitle",
  props: {
    asChild: { type: Boolean },
    as: { default: "h2" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectDialogRootContext();
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        id: unref(rootContext).titleId
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["id"]);
    };
  }
});
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "DialogTrigger",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectDialogRootContext();
    const { forwardRef, currentElement } = useForwardExpose();
    rootContext.contentId ||= useId(void 0, "reka-dialog-content");
    onMounted(() => {
      rootContext.triggerElement.value = currentElement.value;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        ref: unref(forwardRef),
        type: _ctx.as === "button" ? "button" : void 0,
        "aria-haspopup": "dialog",
        "aria-expanded": unref(rootContext).open.value || false,
        "aria-controls": unref(rootContext).open.value ? unref(rootContext).contentId : void 0,
        "data-state": unref(rootContext).open.value ? "open" : "closed",
        onClick: unref(rootContext).onOpenToggle
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["type", "aria-expanded", "aria-controls", "data-state", "onClick"]);
    };
  }
});
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "DialogPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    defer: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$k), normalizeProps(guardReactiveProps(props)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});
// @__NO_SIDE_EFFECTS__
function createReusableTemplate(options = {}) {
  const {
    inheritAttrs = true
  } = options;
  const render = shallowRef();
  const define = /* @__PURE__ */ defineComponent({
    setup(_, { slots }) {
      return () => {
        render.value = slots.default;
      };
    }
  });
  const reuse = /* @__PURE__ */ defineComponent({
    inheritAttrs,
    props: options.props,
    setup(props, { attrs, slots }) {
      return () => {
        var _a;
        if (!render.value && false)
          ;
        const vnode = (_a = render.value) == null ? void 0 : _a.call(render, {
          ...options.props == null ? keysToCamelKebabCase(attrs) : props,
          $slots: slots
        });
        return inheritAttrs && (vnode == null ? void 0 : vnode.length) === 1 ? vnode[0] : vnode;
      };
    }
  });
  return makeDestructurable(
    { define, reuse },
    [define, reuse]
  );
}
function keysToCamelKebabCase(obj) {
  const newObj = {};
  for (const key in obj)
    newObj[camelize(key)] = obj[key];
  return newObj;
}
const kbdKeysMap = {
  meta: "",
  ctrl: "",
  alt: "",
  win: "⊞",
  command: "⌘",
  shift: "⇧",
  control: "⌃",
  option: "⌥",
  enter: "↵",
  delete: "⌦",
  backspace: "⌫",
  escape: "⎋",
  tab: "⇥",
  capslock: "⇪",
  arrowup: "↑",
  arrowright: "→",
  arrowdown: "↓",
  arrowleft: "←",
  pageup: "⇞",
  pagedown: "⇟",
  home: "↖",
  end: "↘"
};
const _useKbd = () => {
  const macOS = computed(() => navigator && navigator.userAgent && navigator.userAgent.match(/Macintosh;/));
  const kbdKeysSpecificMap = reactive({
    meta: " ",
    alt: " ",
    ctrl: " "
  });
  onMounted(() => {
    kbdKeysSpecificMap.meta = macOS.value ? kbdKeysMap.command : "Ctrl";
    kbdKeysSpecificMap.ctrl = macOS.value ? kbdKeysMap.control : "Ctrl";
    kbdKeysSpecificMap.alt = macOS.value ? kbdKeysMap.option : "Alt";
  });
  function getKbdKey(value) {
    if (!value) {
      return;
    }
    if (["meta", "alt", "ctrl"].includes(value)) {
      return kbdKeysSpecificMap[value];
    }
    return kbdKeysMap[value] || value.toUpperCase();
  }
  return {
    macOS,
    getKbdKey
  };
};
const useKbd = /* @__PURE__ */ createSharedComposable(_useKbd);
const theme$2 = {
  "slots": {
    "overlay": "fixed inset-0 bg-elevated/75",
    "content": "fixed bg-default divide-y divide-default flex flex-col focus:outline-none",
    "header": "flex items-center gap-1.5 p-4 sm:px-6 min-h-16",
    "wrapper": "",
    "body": "flex-1 overflow-y-auto p-4 sm:p-6",
    "footer": "flex items-center gap-1.5 p-4 sm:px-6",
    "title": "text-highlighted font-semibold",
    "description": "mt-1 text-muted text-sm",
    "close": "absolute top-4 end-4"
  },
  "variants": {
    "transition": {
      "true": {
        "overlay": "data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]",
        "content": "data-[state=open]:animate-[scale-in_200ms_ease-out] data-[state=closed]:animate-[scale-out_200ms_ease-in]"
      }
    },
    "fullscreen": {
      "true": {
        "content": "inset-0"
      },
      "false": {
        "content": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] max-w-lg max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] rounded-lg shadow-lg ring ring-default overflow-hidden"
      }
    }
  }
};
const _sfc_main$5 = {
  __name: "Modal",
  props: {
    title: { type: String, required: false },
    description: { type: String, required: false },
    content: { type: Object, required: false },
    overlay: { type: Boolean, required: false, default: true },
    transition: { type: Boolean, required: false, default: true },
    fullscreen: { type: Boolean, required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    close: { type: [Boolean, Object], required: false, default: true },
    closeIcon: { type: String, required: false },
    dismissible: { type: Boolean, required: false, default: true },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    modal: { type: Boolean, required: false, default: true }
  },
  emits: ["after:leave", "after:enter", "close:prevent", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "open", "defaultOpen", "modal"), emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = toRef(() => props.content);
    const contentEvents = computed(() => {
      const defaultEvents = {
        closeAutoFocus: (e) => e.preventDefault()
      };
      if (!props.dismissible) {
        const events = ["pointerDownOutside", "interactOutside", "escapeKeyDown"];
        return events.reduce((acc, curr) => {
          acc[curr] = (e) => {
            e.preventDefault();
            emits("close:prevent");
          };
          return acc;
        }, defaultEvents);
      }
      return defaultEvents;
    });
    const ui = computed(() => tv({ extend: tv(theme$2), ...appConfig.ui?.modal || {} })({
      transition: props.transition,
      fullscreen: props.fullscreen
    }));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$h), normalizeProps(guardReactiveProps(unref(rootProps))), {
        default: withCtx(({ open, close }) => [
          !!slots.default ? (openBlock(), createBlock(unref(_sfc_main$7), {
            key: 0,
            "as-child": "",
            class: normalizeClass(props.class)
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", { open })
            ]),
            _: 2
          }, 1032, ["class"])) : createCommentVNode("", true),
          createVNode(unref(_sfc_main$6), normalizeProps(guardReactiveProps(unref(portalProps))), {
            default: withCtx(() => [
              __props.overlay ? (openBlock(), createBlock(unref(_sfc_main$9), {
                key: 0,
                class: normalizeClass(ui.value.overlay({ class: props.ui?.overlay }))
              }, null, 8, ["class"])) : createCommentVNode("", true),
              createVNode(unref(_sfc_main$c), mergeProps({
                class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
              }, contentProps.value, {
                onAfterEnter: _cache[0] || (_cache[0] = ($event) => emits("after:enter")),
                onAfterLeave: _cache[1] || (_cache[1] = ($event) => emits("after:leave"))
              }, toHandlers(contentEvents.value)), {
                default: withCtx(() => [
                  !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (openBlock(), createBlock(unref(_sfc_main$l), { key: 0 }, {
                    default: withCtx(() => [
                      __props.title || !!slots.title ? (openBlock(), createBlock(unref(_sfc_main$8), { key: 0 }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "title", {}, () => [
                            createTextVNode(toDisplayString(__props.title), 1)
                          ])
                        ]),
                        _: 3
                      })) : createCommentVNode("", true),
                      __props.description || !!slots.description ? (openBlock(), createBlock(unref(_sfc_main$b), { key: 1 }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "description", {}, () => [
                            createTextVNode(toDisplayString(__props.description), 1)
                          ])
                        ]),
                        _: 3
                      })) : createCommentVNode("", true)
                    ]),
                    _: 3
                  })) : createCommentVNode("", true),
                  renderSlot(_ctx.$slots, "content", { close }, () => [
                    !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: normalizeClass(ui.value.header({ class: props.ui?.header }))
                    }, [
                      renderSlot(_ctx.$slots, "header", { close }, () => [
                        createBaseVNode("div", {
                          class: normalizeClass(ui.value.wrapper({ class: props.ui?.wrapper }))
                        }, [
                          __props.title || !!slots.title ? (openBlock(), createBlock(unref(_sfc_main$8), {
                            key: 0,
                            class: normalizeClass(ui.value.title({ class: props.ui?.title }))
                          }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "title", {}, () => [
                                createTextVNode(toDisplayString(__props.title), 1)
                              ])
                            ]),
                            _: 3
                          }, 8, ["class"])) : createCommentVNode("", true),
                          __props.description || !!slots.description ? (openBlock(), createBlock(unref(_sfc_main$b), {
                            key: 1,
                            class: normalizeClass(ui.value.description({ class: props.ui?.description }))
                          }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "description", {}, () => [
                                createTextVNode(toDisplayString(__props.description), 1)
                              ])
                            ]),
                            _: 3
                          }, 8, ["class"])) : createCommentVNode("", true)
                        ], 2),
                        renderSlot(_ctx.$slots, "actions"),
                        props.close || !!slots.close ? (openBlock(), createBlock(unref(_sfc_main$g), {
                          key: 0,
                          "as-child": ""
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "close", {
                              close,
                              ui: ui.value
                            }, () => [
                              props.close ? (openBlock(), createBlock(_sfc_main$m, mergeProps({
                                key: 0,
                                icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                color: "neutral",
                                variant: "ghost",
                                "aria-label": unref(t)("modal.close")
                              }, typeof props.close === "object" ? props.close : {}, {
                                class: ui.value.close({ class: props.ui?.close })
                              }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 2
                        }, 1024)) : createCommentVNode("", true)
                      ])
                    ], 2)) : createCommentVNode("", true),
                    !!slots.body ? (openBlock(), createElementBlock("div", {
                      key: 1,
                      class: normalizeClass(ui.value.body({ class: props.ui?.body }))
                    }, [
                      renderSlot(_ctx.$slots, "body", { close })
                    ], 2)) : createCommentVNode("", true),
                    !!slots.footer ? (openBlock(), createElementBlock("div", {
                      key: 2,
                      class: normalizeClass(ui.value.footer({ class: props.ui?.footer }))
                    }, [
                      renderSlot(_ctx.$slots, "footer", { close })
                    ], 2)) : createCommentVNode("", true)
                  ])
                ]),
                _: 2
              }, 1040, ["class"])
            ]),
            _: 2
          }, 1040)
        ]),
        _: 3
      }, 16);
    };
  }
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "TestModal",
  props: {
    "open": {
      type: Boolean,
      default: false
    },
    "openModifiers": {}
  },
  emits: ["update:open"],
  setup(__props) {
    const first = useModel(__props, "open");
    const second = ref(false);
    watch(first, (newValue) => {
      console.log("First changed", newValue);
    });
    return (_ctx, _cache) => {
      const _component_UButton = _sfc_main$m;
      const _component_UModal = _sfc_main$5;
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        createVNode(_component_UModal, {
          open: first.value,
          "onUpdate:open": _cache[3] || (_cache[3] = ($event) => first.value = $event),
          title: "First modal",
          ui: { footer: "justify-end" }
        }, {
          footer: withCtx(() => [
            createVNode(_component_UButton, {
              label: "Close",
              color: "neutral",
              variant: "outline",
              onClick: _cache[0] || (_cache[0] = ($event) => first.value = false)
            }),
            createVNode(_component_UModal, {
              open: second.value,
              "onUpdate:open": _cache[2] || (_cache[2] = ($event) => second.value = $event),
              title: "Second modal",
              ui: { footer: "justify-end" }
            }, {
              footer: withCtx(() => [
                createVNode(_component_UButton, {
                  label: "Close",
                  color: "neutral",
                  variant: "outline",
                  onClick: _cache[1] || (_cache[1] = ($event) => second.value = false)
                })
              ]),
              default: withCtx(() => [
                createVNode(_component_UButton, {
                  label: "Open second",
                  color: "neutral"
                })
              ]),
              _: 1
            }, 8, ["open"])
          ]),
          default: withCtx(() => [
            createVNode(_component_UButton, {
              color: "neutral",
              variant: "subtle",
              label: "Open"
            })
          ]),
          _: 1
        }, 8, ["open"])
      ]);
    };
  }
});
const theme$1 = {
  "base": "inline-flex items-center justify-center px-1 rounded-sm font-medium font-sans",
  "variants": {
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "solid": "",
      "outline": "",
      "soft": "",
      "subtle": ""
    },
    "size": {
      "sm": "h-4 min-w-[16px] text-[10px]",
      "md": "h-5 min-w-[20px] text-[11px]",
      "lg": "h-6 min-w-[24px] text-[12px]"
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": "text-inverted bg-primary"
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": "text-inverted bg-secondary"
    },
    {
      "color": "success",
      "variant": "solid",
      "class": "text-inverted bg-success"
    },
    {
      "color": "info",
      "variant": "solid",
      "class": "text-inverted bg-info"
    },
    {
      "color": "warning",
      "variant": "solid",
      "class": "text-inverted bg-warning"
    },
    {
      "color": "error",
      "variant": "solid",
      "class": "text-inverted bg-error"
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": "ring ring-inset ring-primary/50 text-primary"
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": "ring ring-inset ring-secondary/50 text-secondary"
    },
    {
      "color": "success",
      "variant": "outline",
      "class": "ring ring-inset ring-success/50 text-success"
    },
    {
      "color": "info",
      "variant": "outline",
      "class": "ring ring-inset ring-info/50 text-info"
    },
    {
      "color": "warning",
      "variant": "outline",
      "class": "ring ring-inset ring-warning/50 text-warning"
    },
    {
      "color": "error",
      "variant": "outline",
      "class": "ring ring-inset ring-error/50 text-error"
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": "text-primary bg-primary/10"
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": "text-secondary bg-secondary/10"
    },
    {
      "color": "success",
      "variant": "soft",
      "class": "text-success bg-success/10"
    },
    {
      "color": "info",
      "variant": "soft",
      "class": "text-info bg-info/10"
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": "text-warning bg-warning/10"
    },
    {
      "color": "error",
      "variant": "soft",
      "class": "text-error bg-error/10"
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": "text-primary ring ring-inset ring-primary/25 bg-primary/10"
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": "text-secondary ring ring-inset ring-secondary/25 bg-secondary/10"
    },
    {
      "color": "success",
      "variant": "subtle",
      "class": "text-success ring ring-inset ring-success/25 bg-success/10"
    },
    {
      "color": "info",
      "variant": "subtle",
      "class": "text-info ring ring-inset ring-info/25 bg-info/10"
    },
    {
      "color": "warning",
      "variant": "subtle",
      "class": "text-warning ring ring-inset ring-warning/25 bg-warning/10"
    },
    {
      "color": "error",
      "variant": "subtle",
      "class": "text-error ring ring-inset ring-error/25 bg-error/10"
    },
    {
      "color": "neutral",
      "variant": "solid",
      "class": "text-inverted bg-inverted"
    },
    {
      "color": "neutral",
      "variant": "outline",
      "class": "ring ring-inset ring-accented text-default bg-default"
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": "text-default bg-elevated"
    },
    {
      "color": "neutral",
      "variant": "subtle",
      "class": "ring ring-inset ring-accented text-default bg-elevated"
    }
  ],
  "defaultVariants": {
    "variant": "outline",
    "color": "neutral",
    "size": "md"
  }
};
const _sfc_main$3 = {
  __name: "Kbd",
  props: {
    as: { type: null, required: false, default: "kbd" },
    value: { type: null, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    class: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const { getKbdKey } = useKbd();
    const appConfig = useAppConfig();
    const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.kbd || {} }));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        as: __props.as,
        class: normalizeClass(ui.value({ class: props.class, color: props.color, variant: props.variant, size: props.size }))
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(unref(getKbdKey)(__props.value)), 1)
          ])
        ]),
        _: 3
      }, 8, ["as", "class"]);
    };
  }
};
const _sfc_main$2 = {
  __name: "DropdownMenuContent",
  props: {
    items: { type: null, required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true },
    sub: { type: Boolean, required: false },
    labelKey: { type: null, required: true },
    checkedIcon: { type: String, required: false },
    loadingIcon: { type: String, required: false },
    externalIcon: { type: [Boolean, String], required: false },
    class: { type: null, required: false },
    ui: { type: null, required: true },
    uiOverride: { type: null, required: false },
    loop: { type: Boolean, required: false },
    side: { type: null, required: false },
    sideOffset: { type: Number, required: false },
    align: { type: null, required: false },
    alignOffset: { type: Number, required: false },
    avoidCollisions: { type: Boolean, required: false },
    collisionBoundary: { type: null, required: false },
    collisionPadding: { type: [Number, Object], required: false },
    arrowPadding: { type: Number, required: false },
    sticky: { type: String, required: false },
    hideWhenDetached: { type: Boolean, required: false },
    positionStrategy: { type: String, required: false },
    updatePositionStrategy: { type: String, required: false },
    disableUpdateOnLayoutShift: { type: Boolean, required: false },
    prioritizePosition: { type: Boolean, required: false },
    reference: { type: null, required: false }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const { dir } = useLocale();
    const appConfig = useAppConfig();
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = useForwardPropsEmits(reactiveOmit(props, "sub", "items", "portal", "labelKey", "checkedIcon", "loadingIcon", "externalIcon", "class", "ui", "uiOverride"), emits);
    const proxySlots = omit(slots, ["default"]);
    const [DefineItemTemplate, ReuseItemTemplate] = /* @__PURE__ */ createReusableTemplate();
    const childrenIcon = computed(() => dir.value === "rtl" ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight);
    const groups = computed(
      () => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(unref(DefineItemTemplate), null, {
          default: withCtx(({ item, active, index }) => [
            renderSlot(_ctx.$slots, item.slot || "item", {
              item,
              index
            }, () => [
              renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
                item,
                active,
                index
              }, () => [
                item.loading ? (openBlock(), createBlock(_sfc_main$n, {
                  key: 0,
                  name: __props.loadingIcon || unref(appConfig).ui.icons.loading,
                  class: normalizeClass(__props.ui.itemLeadingIcon({ class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, loading: true }))
                }, null, 8, ["name", "class"])) : item.icon ? (openBlock(), createBlock(_sfc_main$n, {
                  key: 1,
                  name: item.icon,
                  class: normalizeClass(__props.ui.itemLeadingIcon({ class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, active }))
                }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$o, mergeProps({
                  key: 2,
                  size: item.ui?.itemLeadingAvatarSize || props.uiOverride?.itemLeadingAvatarSize || __props.ui.itemLeadingAvatarSize()
                }, item.avatar, {
                  class: __props.ui.itemLeadingAvatar({ class: [__props.uiOverride?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active })
                }), null, 16, ["size", "class"])) : createCommentVNode("", true)
              ]),
              unref(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"] ? (openBlock(), createElementBlock("span", {
                key: 0,
                class: normalizeClass(__props.ui.itemLabel({ class: [__props.uiOverride?.itemLabel, item.ui?.itemLabel], active }))
              }, [
                renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
                  item,
                  active,
                  index
                }, () => [
                  createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                ]),
                item.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$n, {
                  key: 0,
                  name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
                  class: normalizeClass(__props.ui.itemLabelExternalIcon({ class: [__props.uiOverride?.itemLabelExternalIcon, item.ui?.itemLabelExternalIcon], color: item?.color, active }))
                }, null, 8, ["name", "class"])) : createCommentVNode("", true)
              ], 2)) : createCommentVNode("", true),
              createBaseVNode("span", {
                class: normalizeClass(__props.ui.itemTrailing({ class: [__props.uiOverride?.itemTrailing, item.ui?.itemTrailing] }))
              }, [
                renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
                  item,
                  active,
                  index
                }, () => [
                  item.children?.length ? (openBlock(), createBlock(_sfc_main$n, {
                    key: 0,
                    name: childrenIcon.value,
                    class: normalizeClass(__props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color, active }))
                  }, null, 8, ["name", "class"])) : item.kbds?.length ? (openBlock(), createElementBlock("span", {
                    key: 1,
                    class: normalizeClass(__props.ui.itemTrailingKbds({ class: [__props.uiOverride?.itemTrailingKbds, item.ui?.itemTrailingKbds] }))
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.kbds, (kbd, kbdIndex) => {
                      return openBlock(), createBlock(_sfc_main$3, mergeProps({
                        key: kbdIndex,
                        size: item.ui?.itemTrailingKbdsSize || props.uiOverride?.itemTrailingKbdsSize || __props.ui.itemTrailingKbdsSize()
                      }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
                    }), 128))
                  ], 2)) : createCommentVNode("", true)
                ]),
                createVNode(unref(DropdownMenu).ItemIndicator, { "as-child": "" }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$n, {
                      name: __props.checkedIcon || unref(appConfig).ui.icons.check,
                      class: normalizeClass(__props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color }))
                    }, null, 8, ["name", "class"])
                  ]),
                  _: 2
                }, 1024)
              ], 2)
            ])
          ]),
          _: 3
        }),
        createVNode(unref(DropdownMenu).Portal, normalizeProps(guardReactiveProps(unref(portalProps))), {
          default: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(__props.sub ? unref(DropdownMenu).SubContent : unref(DropdownMenu).Content), mergeProps({
              class: props.class
            }, unref(contentProps)), {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "content-top"),
                createBaseVNode("div", {
                  role: "presentation",
                  class: normalizeClass(__props.ui.viewport({ class: props.ui?.viewport }))
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
                    return openBlock(), createBlock(unref(DropdownMenu).Group, {
                      key: `group-${groupIndex}`,
                      class: normalizeClass(__props.ui.group({ class: __props.uiOverride?.group }))
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(group, (item, index) => {
                          return openBlock(), createElementBlock(Fragment, {
                            key: `group-${groupIndex}-${index}`
                          }, [
                            item.type === "label" ? (openBlock(), createBlock(unref(DropdownMenu).Label, {
                              key: 0,
                              class: normalizeClass(__props.ui.label({ class: [__props.uiOverride?.label, item.ui?.label, item.class] }))
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ReuseItemTemplate), {
                                  item,
                                  index
                                }, null, 8, ["item", "index"])
                              ]),
                              _: 2
                            }, 1032, ["class"])) : item.type === "separator" ? (openBlock(), createBlock(unref(DropdownMenu).Separator, {
                              key: 1,
                              class: normalizeClass(__props.ui.separator({ class: [__props.uiOverride?.separator, item.ui?.separator, item.class] }))
                            }, null, 8, ["class"])) : item?.children?.length ? (openBlock(), createBlock(unref(DropdownMenu).Sub, {
                              key: 2,
                              open: item.open,
                              "default-open": item.defaultOpen
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(DropdownMenu).SubTrigger, {
                                  as: "button",
                                  type: "button",
                                  disabled: item.disabled,
                                  "text-value": unref(get)(item, props.labelKey),
                                  class: normalizeClass(__props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color }))
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(ReuseItemTemplate), {
                                      item,
                                      index
                                    }, null, 8, ["item", "index"])
                                  ]),
                                  _: 2
                                }, 1032, ["disabled", "text-value", "class"]),
                                createVNode(_sfc_main$2, mergeProps({
                                  sub: "",
                                  class: props.class,
                                  ui: __props.ui,
                                  "ui-override": __props.uiOverride,
                                  portal: __props.portal,
                                  items: item.children,
                                  align: "start",
                                  "align-offset": -4,
                                  "side-offset": 3,
                                  "label-key": __props.labelKey,
                                  "checked-icon": __props.checkedIcon,
                                  "loading-icon": __props.loadingIcon,
                                  "external-icon": __props.externalIcon
                                }, { ref_for: true }, item.content), createSlots({ _: 2 }, [
                                  renderList(unref(proxySlots), (_, name) => {
                                    return {
                                      name,
                                      fn: withCtx((slotData) => [
                                        renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))
                                      ])
                                    };
                                  })
                                ]), 1040, ["class", "ui", "ui-override", "portal", "items", "label-key", "checked-icon", "loading-icon", "external-icon"])
                              ]),
                              _: 2
                            }, 1032, ["open", "default-open"])) : item.type === "checkbox" ? (openBlock(), createBlock(unref(DropdownMenu).CheckboxItem, {
                              key: 3,
                              "model-value": item.checked,
                              disabled: item.disabled,
                              "text-value": unref(get)(item, props.labelKey),
                              class: normalizeClass(__props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })),
                              "onUpdate:modelValue": item.onUpdateChecked,
                              onSelect: item.onSelect
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ReuseItemTemplate), {
                                  item,
                                  index
                                }, null, 8, ["item", "index"])
                              ]),
                              _: 2
                            }, 1032, ["model-value", "disabled", "text-value", "class", "onUpdate:modelValue", "onSelect"])) : (openBlock(), createBlock(unref(DropdownMenu).Item, {
                              key: 4,
                              "as-child": "",
                              disabled: item.disabled,
                              "text-value": unref(get)(item, props.labelKey),
                              onSelect: item.onSelect
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$p, mergeProps({ ref_for: true }, unref(pickLinkProps)(item), { custom: "" }), {
                                  default: withCtx(({ active, ...slotProps }) => [
                                    createVNode(_sfc_main$q, mergeProps({ ref_for: true }, slotProps, {
                                      class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                    }), {
                                      default: withCtx(() => [
                                        createVNode(unref(ReuseItemTemplate), {
                                          item,
                                          active,
                                          index
                                        }, null, 8, ["item", "active", "index"])
                                      ]),
                                      _: 2
                                    }, 1040, ["class"])
                                  ]),
                                  _: 2
                                }, 1040)
                              ]),
                              _: 2
                            }, 1032, ["disabled", "text-value", "onSelect"]))
                          ], 64);
                        }), 128))
                      ]),
                      _: 2
                    }, 1032, ["class"]);
                  }), 128))
                ], 2),
                renderSlot(_ctx.$slots, "default"),
                renderSlot(_ctx.$slots, "content-bottom")
              ]),
              _: 3
            }, 16, ["class"]))
          ]),
          _: 3
        }, 16)
      ], 64);
    };
  }
};
const theme = {
  "slots": {
    "content": "min-w-32 bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-dropdown-menu-content-transform-origin) flex flex-col",
    "viewport": "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
    "arrow": "fill-default",
    "group": "p-1 isolate",
    "label": "w-full flex items-center font-semibold text-highlighted",
    "separator": "-mx-1 my-1 h-px bg-border",
    "item": "group relative w-full flex items-center select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75",
    "itemLeadingIcon": "shrink-0",
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0",
    "itemTrailingKbds": "hidden lg:inline-flex items-center shrink-0",
    "itemTrailingKbdsSize": "",
    "itemLabel": "truncate",
    "itemLabelExternalIcon": "inline-block size-3 align-top text-dimmed"
  },
  "variants": {
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "active": {
      "true": {
        "item": "text-highlighted before:bg-elevated",
        "itemLeadingIcon": "text-default"
      },
      "false": {
        "item": [
          "text-default data-highlighted:text-highlighted data-[state=open]:text-highlighted data-highlighted:before:bg-elevated/50 data-[state=open]:before:bg-elevated/50",
          "transition-colors before:transition-colors"
        ],
        "itemLeadingIcon": [
          "text-dimmed group-data-highlighted:text-default group-data-[state=open]:text-default",
          "transition-colors"
        ]
      }
    },
    "loading": {
      "true": {
        "itemLeadingIcon": "animate-spin"
      }
    },
    "size": {
      "xs": {
        "label": "p-1 text-xs gap-1",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemTrailingIcon": "size-4",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "sm"
      },
      "sm": {
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemTrailingIcon": "size-4",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "sm"
      },
      "md": {
        "label": "p-1.5 text-sm gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemTrailingIcon": "size-5",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "md"
      },
      "lg": {
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemTrailingIcon": "size-5",
        "itemTrailingKbds": "gap-1",
        "itemTrailingKbdsSize": "md"
      },
      "xl": {
        "label": "p-2 text-base gap-2",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemTrailingIcon": "size-6",
        "itemTrailingKbds": "gap-1",
        "itemTrailingKbdsSize": "lg"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "active": false,
      "class": {
        "item": "text-primary data-highlighted:text-primary data-highlighted:before:bg-primary/10 data-[state=open]:before:bg-primary/10",
        "itemLeadingIcon": "text-primary/75 group-data-highlighted:text-primary group-data-[state=open]:text-primary"
      }
    },
    {
      "color": "secondary",
      "active": false,
      "class": {
        "item": "text-secondary data-highlighted:text-secondary data-highlighted:before:bg-secondary/10 data-[state=open]:before:bg-secondary/10",
        "itemLeadingIcon": "text-secondary/75 group-data-highlighted:text-secondary group-data-[state=open]:text-secondary"
      }
    },
    {
      "color": "success",
      "active": false,
      "class": {
        "item": "text-success data-highlighted:text-success data-highlighted:before:bg-success/10 data-[state=open]:before:bg-success/10",
        "itemLeadingIcon": "text-success/75 group-data-highlighted:text-success group-data-[state=open]:text-success"
      }
    },
    {
      "color": "info",
      "active": false,
      "class": {
        "item": "text-info data-highlighted:text-info data-highlighted:before:bg-info/10 data-[state=open]:before:bg-info/10",
        "itemLeadingIcon": "text-info/75 group-data-highlighted:text-info group-data-[state=open]:text-info"
      }
    },
    {
      "color": "warning",
      "active": false,
      "class": {
        "item": "text-warning data-highlighted:text-warning data-highlighted:before:bg-warning/10 data-[state=open]:before:bg-warning/10",
        "itemLeadingIcon": "text-warning/75 group-data-highlighted:text-warning group-data-[state=open]:text-warning"
      }
    },
    {
      "color": "error",
      "active": false,
      "class": {
        "item": "text-error data-highlighted:text-error data-highlighted:before:bg-error/10 data-[state=open]:before:bg-error/10",
        "itemLeadingIcon": "text-error/75 group-data-highlighted:text-error group-data-[state=open]:text-error"
      }
    },
    {
      "color": "primary",
      "active": true,
      "class": {
        "item": "text-primary before:bg-primary/10",
        "itemLeadingIcon": "text-primary"
      }
    },
    {
      "color": "secondary",
      "active": true,
      "class": {
        "item": "text-secondary before:bg-secondary/10",
        "itemLeadingIcon": "text-secondary"
      }
    },
    {
      "color": "success",
      "active": true,
      "class": {
        "item": "text-success before:bg-success/10",
        "itemLeadingIcon": "text-success"
      }
    },
    {
      "color": "info",
      "active": true,
      "class": {
        "item": "text-info before:bg-info/10",
        "itemLeadingIcon": "text-info"
      }
    },
    {
      "color": "warning",
      "active": true,
      "class": {
        "item": "text-warning before:bg-warning/10",
        "itemLeadingIcon": "text-warning"
      }
    },
    {
      "color": "error",
      "active": true,
      "class": {
        "item": "text-error before:bg-error/10",
        "itemLeadingIcon": "text-error"
      }
    }
  ],
  "defaultVariants": {
    "size": "md"
  }
};
const _sfc_main$1 = {
  __name: "DropdownMenu",
  props: {
    size: { type: null, required: false },
    items: { type: null, required: false },
    checkedIcon: { type: String, required: false },
    loadingIcon: { type: String, required: false },
    externalIcon: { type: [Boolean, String], required: false, default: true },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    labelKey: { type: null, required: false, default: "label" },
    disabled: { type: Boolean, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    defaultOpen: { type: Boolean, required: false },
    open: { type: Boolean, required: false },
    modal: { type: Boolean, required: false, default: true }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "defaultOpen", "open", "modal"), emits);
    const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8 }));
    const arrowProps = toRef(() => props.arrow);
    const proxySlots = omit(slots, ["default"]);
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.dropdownMenu || {} })({
      size: props.size
    }));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$t), normalizeProps(guardReactiveProps(unref(rootProps))), {
        default: withCtx(({ open }) => [
          !!slots.default ? (openBlock(), createBlock(unref(_sfc_main$r), {
            key: 0,
            "as-child": "",
            class: normalizeClass(props.class),
            disabled: __props.disabled
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", { open })
            ]),
            _: 2
          }, 1032, ["class", "disabled"])) : createCommentVNode("", true),
          createVNode(_sfc_main$2, mergeProps({
            class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] }),
            ui: ui.value,
            "ui-override": props.ui
          }, contentProps.value, {
            items: __props.items,
            portal: __props.portal,
            "label-key": __props.labelKey,
            "checked-icon": __props.checkedIcon,
            "loading-icon": __props.loadingIcon,
            "external-icon": __props.externalIcon
          }), createSlots({
            default: withCtx(() => [
              !!__props.arrow ? (openBlock(), createBlock(unref(_sfc_main$s), mergeProps({ key: 0 }, arrowProps.value, {
                class: ui.value.arrow({ class: props.ui?.arrow })
              }), null, 16, ["class"])) : createCommentVNode("", true)
            ]),
            _: 2
          }, [
            renderList(unref(proxySlots), (_, name) => {
              return {
                name,
                fn: withCtx((slotData) => [
                  renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps(slotData)))
                ])
              };
            })
          ]), 1040, ["class", "ui", "ui-override", "items", "portal", "label-key", "checked-icon", "loading-icon", "external-icon"])
        ]),
        _: 3
      }, 16);
    };
  }
};
const _hoisted_1 = { class: "border border-blue-500 p-4 bg-blue-100" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SharedButton.ce",
  setup(__props) {
    const open = ref(false);
    watch(open, (newValue) => {
      console.log("open mudou:", newValue);
    });
    const dropdownItems = ref([
      {
        label: "Profile",
        icon: "i-lucide-user"
      },
      {
        label: "Settings",
        icon: "i-lucide-cog"
      },
      {
        label: "Help",
        icon: "i-lucide-help-circle"
      }
    ]);
    const accordionItems = ref([
      {
        label: "Icons",
        icon: "i-lucide-smile",
        content: "You have nothing to do, @nuxt/icon will handle it automatically."
      },
      {
        label: "Colors",
        icon: "i-lucide-swatch-book",
        content: "Choose a primary and a neutral color from your Tailwind CSS theme."
      },
      {
        label: "Components",
        icon: "i-lucide-box",
        content: "You can customize components by using the `class` / `ui` props or in your app.config.ts."
      }
    ]);
    return (_ctx, _cache) => {
      const _component_UIcon = _sfc_main$n;
      const _component_UButton = _sfc_main$m;
      const _component_UDropdownMenu = _sfc_main$1;
      const _component_UAccordion = _sfc_main$v;
      const _component_TestModal = _sfc_main$4;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_UButton, {
          color: "success",
          variant: "solid",
          class: "font-bold",
          onClick: _cache[0] || (_cache[0] = ($event) => open.value = true)
        }, {
          default: withCtx(() => [
            createVNode(_component_UIcon, {
              name: "i-lucide-check-circle",
              class: "mr-2"
            }),
            createTextVNode(" Botão Atualizado - open = " + toDisplayString(open.value), 1)
          ]),
          _: 1
        }),
        _cache[2] || (_cache[2] = createBaseVNode("br", null, null, -1)),
        createVNode(_sfc_main$u, {
          name: "store",
          size: "xl",
          color: "black"
        }),
        _cache[3] || (_cache[3] = createTextVNode(" icon acima ", -1)),
        _cache[4] || (_cache[4] = createBaseVNode("br", null, null, -1)),
        createVNode(_component_UDropdownMenu, {
          items: dropdownItems.value,
          class: "mt-4"
        }, {
          default: withCtx(() => [
            createVNode(_component_UButton, {
              icon: "i-lucide-menu",
              color: "neutral",
              variant: "outline"
            })
          ]),
          _: 1
        }, 8, ["items"]),
        createVNode(_component_UAccordion, {
          items: accordionItems.value,
          class: "mt-4"
        }, null, 8, ["items"]),
        createVNode(_component_TestModal, {
          open: open.value,
          "onUpdate:open": _cache[1] || (_cache[1] = ($event) => open.value = $event)
        }, null, 8, ["open"])
      ]);
    };
  }
});
const SharedButtonElement = defineCustomElement(_sfc_main, {
  shadowRoot: true,
  styles: [tailwindStyles, meIconStyles]
});
if (!customElements.get("shared-button")) {
  customElements.define("shared-button", SharedButtonElement);
}
