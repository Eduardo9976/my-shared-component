import { k as defineComponent, C as useForwardExpose, Q as useVModel, D as watch, W as nextTick, f as computed, co as isNullish, s as createContext, l as createBlock, m as openBlock, n as withCtx, p as renderSlot, q as unref, P as Primitive, J as mergeProps, X as useSlots, Y as useLocale, Z as useForwardPropsEmits, _ as reactivePick, $ as tv, j as useAppConfig, H as createElementBlock, z as createCommentVNode, I as createVNode, S as normalizeStyle, a3 as normalizeClass, A as createTextVNode, B as toDisplayString, L as Fragment, a5 as renderList, cK as useButtonGroup, cL as useComponentIcons, a2 as _sfc_main$6, a1 as _sfc_main$7, a0 as createBaseVNode, a6 as _sfc_main$8, aO as defineCustomElement, cJ as tailwindStyles } from "./main.js";
const DEFAULT_MAX = 100;
const [injectProgressRootContext, provideProgressRootContext] = createContext("ProgressRoot");
const isNumber = (v) => typeof v === "number";
function validateValue(value, max) {
  const isValidValueError = isNullish(value) || isNumber(value) && !Number.isNaN(value) && value <= max && value >= 0;
  if (isValidValueError)
    return value;
  console.error(`Invalid prop \`value\` of value \`${value}\` supplied to \`ProgressRoot\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\`  or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`);
  return null;
}
function validateMax(max) {
  const isValidMaxError = isNumber(max) && !Number.isNaN(max) && max > 0;
  if (isValidMaxError)
    return max;
  console.error(
    `Invalid prop \`max\` of value \`${max}\` supplied to \`ProgressRoot\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`
  );
  return DEFAULT_MAX;
}
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ProgressRoot",
  props: {
    modelValue: {},
    max: { default: DEFAULT_MAX },
    getValueLabel: { type: Function, default: (value, max) => isNumber(value) ? `${Math.round(value / max * DEFAULT_MAX)}%` : void 0 },
    getValueText: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue", "update:max"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    useForwardExpose();
    const modelValue = useVModel(props, "modelValue", emit, {
      passive: props.modelValue === void 0
    });
    const max = useVModel(props, "max", emit, {
      passive: props.max === void 0
    });
    watch(
      () => modelValue.value,
      async (value) => {
        const correctedValue = validateValue(value, props.max);
        if (correctedValue !== value) {
          await nextTick();
          modelValue.value = correctedValue;
        }
      },
      { immediate: true }
    );
    watch(
      () => props.max,
      (newMax) => {
        const correctedMax = validateMax(props.max);
        if (correctedMax !== newMax)
          max.value = correctedMax;
      },
      { immediate: true }
    );
    const progressState = computed(() => {
      if (isNullish(modelValue.value))
        return "indeterminate";
      if (modelValue.value === max.value)
        return "complete";
      return "loading";
    });
    provideProgressRootContext({
      modelValue,
      max,
      progressState
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        "as-child": _ctx.asChild,
        as: _ctx.as,
        "aria-valuemax": unref(max),
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(unref(modelValue)) ? unref(modelValue) : void 0,
        "aria-valuetext": _ctx.getValueText?.(unref(modelValue), unref(max)),
        "aria-label": _ctx.getValueLabel(unref(modelValue), unref(max)),
        role: "progressbar",
        "data-state": progressState.value,
        "data-value": unref(modelValue) ?? void 0,
        "data-max": unref(max)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })
        ]),
        _: 3
      }, 8, ["as-child", "as", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-label", "data-state", "data-value", "data-max"]);
    };
  }
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ProgressIndicator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectProgressRootContext();
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        "data-state": unref(rootContext).progressState.value,
        "data-value": unref(rootContext).modelValue?.value ?? void 0,
        "data-max": unref(rootContext).max.value
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["data-state", "data-value", "data-max"]);
    };
  }
});
const theme$2 = {
  "slots": {
    "root": "gap-2",
    "base": "relative overflow-hidden rounded-full bg-accented",
    "indicator": "rounded-full size-full transition-transform duration-200 ease-out",
    "status": "flex justify-end text-dimmed transition-[width] duration-200",
    "steps": "grid items-end",
    "step": "truncate text-end row-start-1 col-start-1 transition-opacity"
  },
  "variants": {
    "animation": {
      "carousel": "",
      "carousel-inverse": "",
      "swing": "",
      "elastic": ""
    },
    "color": {
      "primary": {
        "indicator": "bg-primary",
        "steps": "text-primary"
      },
      "secondary": {
        "indicator": "bg-secondary",
        "steps": "text-secondary"
      },
      "success": {
        "indicator": "bg-success",
        "steps": "text-success"
      },
      "info": {
        "indicator": "bg-info",
        "steps": "text-info"
      },
      "warning": {
        "indicator": "bg-warning",
        "steps": "text-warning"
      },
      "error": {
        "indicator": "bg-error",
        "steps": "text-error"
      },
      "neutral": {
        "indicator": "bg-inverted",
        "steps": "text-inverted"
      }
    },
    "size": {
      "2xs": {
        "status": "text-xs",
        "steps": "text-xs"
      },
      "xs": {
        "status": "text-xs",
        "steps": "text-xs"
      },
      "sm": {
        "status": "text-sm",
        "steps": "text-sm"
      },
      "md": {
        "status": "text-sm",
        "steps": "text-sm"
      },
      "lg": {
        "status": "text-sm",
        "steps": "text-sm"
      },
      "xl": {
        "status": "text-base",
        "steps": "text-base"
      },
      "2xl": {
        "status": "text-base",
        "steps": "text-base"
      }
    },
    "step": {
      "active": {
        "step": "opacity-100"
      },
      "first": {
        "step": "opacity-100 text-muted"
      },
      "other": {
        "step": "opacity-0"
      },
      "last": {
        "step": ""
      }
    },
    "orientation": {
      "horizontal": {
        "root": "w-full flex flex-col",
        "base": "w-full",
        "status": "flex-row"
      },
      "vertical": {
        "root": "h-full flex flex-row-reverse",
        "base": "h-full",
        "status": "flex-col"
      }
    },
    "inverted": {
      "true": {
        "status": "self-end"
      }
    }
  },
  "compoundVariants": [
    {
      "inverted": true,
      "orientation": "horizontal",
      "class": {
        "step": "text-start",
        "status": "flex-row-reverse"
      }
    },
    {
      "inverted": true,
      "orientation": "vertical",
      "class": {
        "steps": "items-start",
        "status": "flex-col-reverse"
      }
    },
    {
      "orientation": "horizontal",
      "size": "2xs",
      "class": "h-px"
    },
    {
      "orientation": "horizontal",
      "size": "xs",
      "class": "h-0.5"
    },
    {
      "orientation": "horizontal",
      "size": "sm",
      "class": "h-1"
    },
    {
      "orientation": "horizontal",
      "size": "md",
      "class": "h-2"
    },
    {
      "orientation": "horizontal",
      "size": "lg",
      "class": "h-3"
    },
    {
      "orientation": "horizontal",
      "size": "xl",
      "class": "h-4"
    },
    {
      "orientation": "horizontal",
      "size": "2xl",
      "class": "h-5"
    },
    {
      "orientation": "vertical",
      "size": "2xs",
      "class": "w-px"
    },
    {
      "orientation": "vertical",
      "size": "xs",
      "class": "w-0.5"
    },
    {
      "orientation": "vertical",
      "size": "sm",
      "class": "w-1"
    },
    {
      "orientation": "vertical",
      "size": "md",
      "class": "w-2"
    },
    {
      "orientation": "vertical",
      "size": "lg",
      "class": "w-3"
    },
    {
      "orientation": "vertical",
      "size": "xl",
      "class": "w-4"
    },
    {
      "orientation": "vertical",
      "size": "2xl",
      "class": "w-5"
    },
    {
      "orientation": "horizontal",
      "animation": "carousel",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[carousel_2s_ease-in-out_infinite] data-[state=indeterminate]:rtl:animate-[carousel-rtl_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "carousel",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[carousel-vertical_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "horizontal",
      "animation": "carousel-inverse",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[carousel-inverse_2s_ease-in-out_infinite] data-[state=indeterminate]:rtl:animate-[carousel-inverse-rtl_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "carousel-inverse",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[carousel-inverse-vertical_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "horizontal",
      "animation": "swing",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[swing_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "swing",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[swing-vertical_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "horizontal",
      "animation": "elastic",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[elastic_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "elastic",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[elastic-vertical_2s_ease-in-out_infinite]"
      }
    }
  ],
  "defaultVariants": {
    "animation": "carousel",
    "color": "primary",
    "size": "md"
  }
};
const _sfc_main$3 = {
  __name: "Progress",
  props: {
    as: { type: null, required: false },
    max: { type: [Number, Array], required: false },
    status: { type: Boolean, required: false },
    inverted: { type: Boolean, required: false, default: false },
    size: { type: null, required: false },
    color: { type: null, required: false },
    orientation: { type: null, required: false, default: "horizontal" },
    animation: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    getValueLabel: { type: Function, required: false },
    getValueText: { type: Function, required: false },
    modelValue: { type: [Number, null], required: false, default: null }
  },
  emits: ["update:modelValue", "update:max"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const { dir } = useLocale();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "getValueLabel", "getValueText", "modelValue"), emits);
    const isIndeterminate = computed(() => rootProps.value.modelValue === null);
    const hasSteps = computed(() => Array.isArray(props.max));
    const realMax = computed(() => {
      if (isIndeterminate.value || !props.max) {
        return void 0;
      }
      if (Array.isArray(props.max)) {
        return props.max.length - 1;
      }
      return Number(props.max);
    });
    const percent = computed(() => {
      if (isIndeterminate.value) {
        return void 0;
      }
      switch (true) {
        case rootProps.value.modelValue < 0:
          return 0;
        case rootProps.value.modelValue > (realMax.value ?? 100):
          return 100;
        default:
          return Math.round(rootProps.value.modelValue / (realMax.value ?? 100) * 100);
      }
    });
    const indicatorStyle = computed(() => {
      if (percent.value === void 0) {
        return;
      }
      if (props.orientation === "vertical") {
        return {
          transform: `translateY(${props.inverted ? "" : "-"}${100 - percent.value}%)`
        };
      } else {
        if (dir.value === "rtl") {
          return {
            transform: `translateX(${props.inverted ? "-" : ""}${100 - percent.value}%)`
          };
        } else {
          return {
            transform: `translateX(${props.inverted ? "" : "-"}${100 - percent.value}%)`
          };
        }
      }
    });
    const statusStyle = computed(() => {
      return {
        [props.orientation === "vertical" ? "height" : "width"]: percent.value ? `${percent.value}%` : "fit-content"
      };
    });
    function isActive(index) {
      return index === Number(props.modelValue);
    }
    function isFirst(index) {
      return index === 0;
    }
    function isLast(index) {
      return index === realMax.value;
    }
    function stepVariant(index) {
      index = Number(index);
      if (isActive(index) && !isFirst(index)) {
        return "active";
      }
      if (isFirst(index) && isActive(index)) {
        return "first";
      }
      if (isLast(index) && isActive(index)) {
        return "last";
      }
      return "other";
    }
    const ui = computed(() => tv({ extend: tv(theme$2), ...appConfig.ui?.progress || {} })({
      animation: props.animation,
      size: props.size,
      color: props.color,
      orientation: props.orientation,
      inverted: props.inverted
    }));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        as: __props.as,
        class: normalizeClass(ui.value.root({ class: [props.ui?.root, props.class] }))
      }, {
        default: withCtx(() => [
          !isIndeterminate.value && (__props.status || !!slots.status) ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(ui.value.status({ class: props.ui?.status })),
            style: normalizeStyle(statusStyle.value)
          }, [
            renderSlot(_ctx.$slots, "status", { percent: percent.value }, () => [
              createTextVNode(toDisplayString(percent.value) + "% ", 1)
            ])
          ], 6)) : createCommentVNode("", true),
          createVNode(unref(_sfc_main$5), mergeProps(unref(rootProps), {
            max: realMax.value,
            class: ui.value.base({ class: props.ui?.base }),
            style: { "transform": "translateZ(0)" }
          }), {
            default: withCtx(() => [
              createVNode(unref(_sfc_main$4), {
                class: normalizeClass(ui.value.indicator({ class: props.ui?.indicator })),
                style: normalizeStyle(indicatorStyle.value)
              }, null, 8, ["class", "style"])
            ]),
            _: 1
          }, 16, ["max", "class"]),
          hasSteps.value ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(ui.value.steps({ class: props.ui?.steps }))
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.max, (step, index) => {
              return openBlock(), createElementBlock("div", {
                key: index,
                class: normalizeClass(ui.value.step({ class: props.ui?.step, step: stepVariant(index) }))
              }, [
                renderSlot(_ctx.$slots, `step-${index}`, { step }, () => [
                  createTextVNode(toDisplayString(step), 1)
                ])
              ], 2);
            }), 128))
          ], 2)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["as", "class"]);
    };
  }
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const theme$1 = {
  "slots": {
    "root": "rounded-lg overflow-hidden",
    "header": "p-4 sm:px-6",
    "body": "p-4 sm:p-6",
    "footer": "p-4 sm:px-6"
  },
  "variants": {
    "variant": {
      "solid": {
        "root": "bg-inverted text-inverted"
      },
      "outline": {
        "root": "bg-default ring ring-default divide-y divide-default"
      },
      "soft": {
        "root": "bg-elevated/50 divide-y divide-default"
      },
      "subtle": {
        "root": "bg-elevated/50 ring ring-default divide-y divide-default"
      }
    }
  },
  "defaultVariants": {
    "variant": "outline"
  }
};
const _sfc_main$2 = {
  __name: "Card",
  props: {
    as: { type: null, required: false },
    variant: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.card || {} })({
      variant: props.variant
    }));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        as: __props.as,
        class: normalizeClass(ui.value.root({ class: [props.ui?.root, props.class] }))
      }, {
        default: withCtx(() => [
          !!slots.header ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(ui.value.header({ class: props.ui?.header }))
          }, [
            renderSlot(_ctx.$slots, "header")
          ], 2)) : createCommentVNode("", true),
          !!slots.default ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(ui.value.body({ class: props.ui?.body }))
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 2)) : createCommentVNode("", true),
          !!slots.footer ? (openBlock(), createElementBlock("div", {
            key: 2,
            class: normalizeClass(ui.value.footer({ class: props.ui?.footer }))
          }, [
            renderSlot(_ctx.$slots, "footer")
          ], 2)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["as", "class"]);
    };
  }
};
const theme = {
  "slots": {
    "base": "font-medium inline-flex items-center",
    "label": "truncate",
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailingIcon": "shrink-0"
  },
  "variants": {
    "buttonGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
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
      "xs": {
        "base": "text-[8px]/3 px-1 py-0.5 gap-1 rounded-sm",
        "leadingIcon": "size-3",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-3"
      },
      "sm": {
        "base": "text-[10px]/3 px-1.5 py-1 gap-1 rounded-sm",
        "leadingIcon": "size-3",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-3"
      },
      "md": {
        "base": "text-xs px-2 py-1 gap-1 rounded-md",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "lg": {
        "base": "text-sm px-2 py-1 gap-1.5 rounded-md",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "text-base px-2.5 py-1 gap-1.5 rounded-md",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-6"
      }
    },
    "square": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": "bg-primary text-inverted"
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": "bg-secondary text-inverted"
    },
    {
      "color": "success",
      "variant": "solid",
      "class": "bg-success text-inverted"
    },
    {
      "color": "info",
      "variant": "solid",
      "class": "bg-info text-inverted"
    },
    {
      "color": "warning",
      "variant": "solid",
      "class": "bg-warning text-inverted"
    },
    {
      "color": "error",
      "variant": "solid",
      "class": "bg-error text-inverted"
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": "text-primary ring ring-inset ring-primary/50"
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": "text-secondary ring ring-inset ring-secondary/50"
    },
    {
      "color": "success",
      "variant": "outline",
      "class": "text-success ring ring-inset ring-success/50"
    },
    {
      "color": "info",
      "variant": "outline",
      "class": "text-info ring ring-inset ring-info/50"
    },
    {
      "color": "warning",
      "variant": "outline",
      "class": "text-warning ring ring-inset ring-warning/50"
    },
    {
      "color": "error",
      "variant": "outline",
      "class": "text-error ring ring-inset ring-error/50"
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": "bg-primary/10 text-primary"
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": "bg-secondary/10 text-secondary"
    },
    {
      "color": "success",
      "variant": "soft",
      "class": "bg-success/10 text-success"
    },
    {
      "color": "info",
      "variant": "soft",
      "class": "bg-info/10 text-info"
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": "bg-warning/10 text-warning"
    },
    {
      "color": "error",
      "variant": "soft",
      "class": "bg-error/10 text-error"
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": "bg-primary/10 text-primary ring ring-inset ring-primary/25"
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": "bg-secondary/10 text-secondary ring ring-inset ring-secondary/25"
    },
    {
      "color": "success",
      "variant": "subtle",
      "class": "bg-success/10 text-success ring ring-inset ring-success/25"
    },
    {
      "color": "info",
      "variant": "subtle",
      "class": "bg-info/10 text-info ring ring-inset ring-info/25"
    },
    {
      "color": "warning",
      "variant": "subtle",
      "class": "bg-warning/10 text-warning ring ring-inset ring-warning/25"
    },
    {
      "color": "error",
      "variant": "subtle",
      "class": "bg-error/10 text-error ring ring-inset ring-error/25"
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
    },
    {
      "size": "xs",
      "square": true,
      "class": "p-0.5"
    },
    {
      "size": "sm",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "md",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "lg",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "xl",
      "square": true,
      "class": "p-1"
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "solid",
    "size": "md"
  }
};
const _sfc_main$1 = {
  __name: "Badge",
  props: {
    as: { type: null, required: false, default: "span" },
    label: { type: [String, Number], required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    square: { type: Boolean, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    icon: { type: String, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: String, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: String, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const { orientation, size: buttonGroupSize } = useButtonGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.badge || {} })({
      color: props.color,
      variant: props.variant,
      size: buttonGroupSize.value || props.size,
      square: props.square || !slots.default && !props.label,
      buttonGroup: orientation.value
    }));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        as: __props.as,
        class: normalizeClass(ui.value.base({ class: [props.ui?.base, props.class] }))
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "leading", {}, () => [
            unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$6, {
              key: 0,
              name: unref(leadingIconName),
              class: normalizeClass(ui.value.leadingIcon({ class: props.ui?.leadingIcon }))
            }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$7, mergeProps({
              key: 1,
              size: props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
            }, __props.avatar, {
              class: ui.value.leadingAvatar({ class: props.ui?.leadingAvatar })
            }), null, 16, ["size", "class"])) : createCommentVNode("", true)
          ]),
          renderSlot(_ctx.$slots, "default", {}, () => [
            __props.label !== void 0 && __props.label !== null ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass(ui.value.label({ class: props.ui?.label }))
            }, toDisplayString(__props.label), 3)) : createCommentVNode("", true)
          ]),
          renderSlot(_ctx.$slots, "trailing", {}, () => [
            unref(isTrailing) && unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$6, {
              key: 0,
              name: unref(trailingIconName),
              class: normalizeClass(ui.value.trailingIcon({ class: props.ui?.trailingIcon }))
            }, null, 8, ["name", "class"])) : createCommentVNode("", true)
          ])
        ]),
        _: 3
      }, 8, ["as", "class"]);
    };
  }
};
const _style_0 = "\n.card-container[data-v-8255ea0b] {\r\n    font-family: var(--ui-font);\n}\r\n";
const _sfc_main = {};
const _hoisted_1 = { class: "card-container" };
const _hoisted_2 = { class: "flex items-center gap-2" };
const _hoisted_3 = { class: "space-y-3" };
const _hoisted_4 = { class: "flex items-center gap-2" };
const _hoisted_5 = { class: "flex gap-2" };
const _hoisted_6 = { class: "flex justify-between items-center text-sm text-gray-500" };
function _sfc_render(_ctx, _cache) {
  const _component_UIcon = _sfc_main$6;
  const _component_UBadge = _sfc_main$1;
  const _component_UProgress = _sfc_main$3;
  const _component_UButton = _sfc_main$8;
  const _component_UCard = _sfc_main$2;
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_UCard, { class: "w-full max-w-sm" }, {
      header: withCtx(() => [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_component_UIcon, {
            name: "i-lucide-star",
            class: "text-yellow-500"
          }),
          _cache[0] || (_cache[0] = createBaseVNode("h3", { class: "text-lg font-semibold" }, "Card XPTO", -1))
        ])
      ]),
      footer: withCtx(() => [
        createBaseVNode("div", _hoisted_6, [
          createBaseVNode("span", null, "Criado em " + toDisplayString((/* @__PURE__ */ new Date()).toLocaleDateString()), 1),
          createVNode(_component_UButton, {
            color: "primary",
            variant: "ghost",
            size: "xs"
          }, {
            default: withCtx(() => [
              createVNode(_component_UIcon, { name: "i-lucide-more-horizontal" })
            ]),
            _: 1
          })
        ])
      ]),
      default: withCtx(() => [
        createBaseVNode("div", _hoisted_3, [
          _cache[5] || (_cache[5] = createBaseVNode("p", { class: "text-gray-600" }, " Card do Edu usando UCard no Nuxt UI web component ", -1)),
          createBaseVNode("div", _hoisted_4, [
            createVNode(_component_UBadge, {
              color: "success",
              variant: "soft"
            }, {
              default: withCtx(() => [
                createVNode(_component_UIcon, {
                  name: "i-lucide-check",
                  class: "w-3 h-3"
                }),
                _cache[1] || (_cache[1] = createTextVNode(" Funcionando ", -1))
              ]),
              _: 1,
              __: [1]
            }),
            createVNode(_component_UBadge, {
              color: "warning",
              variant: "soft"
            }, {
              default: withCtx(() => [
                createVNode(_component_UIcon, {
                  name: "i-lucide-alert-triangle",
                  class: "w-3 h-3"
                }),
                _cache[2] || (_cache[2] = createTextVNode(" Atenção ", -1))
              ]),
              _: 1,
              __: [2]
            })
          ]),
          createVNode(_component_UProgress, {
            value: 75,
            color: "primary"
          }),
          createBaseVNode("div", _hoisted_5, [
            createVNode(_component_UButton, {
              color: "primary",
              variant: "solid",
              size: "sm"
            }, {
              default: withCtx(() => [
                createVNode(_component_UIcon, {
                  name: "i-lucide-heart",
                  class: "w-4 h-4"
                }),
                _cache[3] || (_cache[3] = createTextVNode(" Curtir ", -1))
              ]),
              _: 1,
              __: [3]
            }),
            createVNode(_component_UButton, {
              color: "primary",
              variant: "outline",
              size: "sm"
            }, {
              default: withCtx(() => [
                createVNode(_component_UIcon, {
                  name: "i-lucide-share",
                  class: "w-4 h-4"
                }),
                _cache[4] || (_cache[4] = createTextVNode(" Compartilhar ", -1))
              ]),
              _: 1,
              __: [4]
            })
          ])
        ])
      ]),
      _: 1
    })
  ]);
}
const CardXPTO = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]], ["__scopeId", "data-v-8255ea0b"]]);
const CardXPTElement = defineCustomElement(CardXPTO, {
  shadowRoot: true,
  styles: [tailwindStyles]
});
if (!customElements.get("card-xpto")) {
  customElements.define("card-xpto", CardXPTElement);
}
export {
  _sfc_main$3 as _,
  _export_sfc as a
};
