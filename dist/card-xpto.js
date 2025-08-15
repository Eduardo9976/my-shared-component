import { N as useSlots, e as computed, S as tv, U as useAppConfig, c as createBlock, o as openBlock, w as withCtx, F as createElementBlock, p as createCommentVNode, W as normalizeClass, r as renderSlot, u as unref, P as Primitive, h as createVNode, a as createBaseVNode, B as createTextVNode, V as _sfc_main$3, Z as _sfc_main$5, C as toDisplayString, ar as defineCustomElement, as as tailwindStyles } from "./main.js";
import { b as _export_sfc, a as _sfc_main$2, _ as _sfc_main$4 } from "./_plugin-vue_export-helper.js";
const theme = {
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
const _sfc_main$1 = {
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
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.card || {} })({
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
const _style_0 = "\n.card-container[data-v-73c62aad] {\n  font-family: var(--ui-font);\n}\n";
const _sfc_main = {};
const _hoisted_1 = { class: "card-container" };
const _hoisted_2 = { class: "flex items-center gap-2" };
const _hoisted_3 = { class: "space-y-3" };
const _hoisted_4 = { class: "flex items-center gap-2" };
const _hoisted_5 = { class: "flex gap-2" };
const _hoisted_6 = { class: "flex items-center justify-between text-sm text-gray-500" };
function _sfc_render(_ctx, _cache) {
  const _component_UIcon = _sfc_main$3;
  const _component_UBadge = _sfc_main$2;
  const _component_UProgress = _sfc_main$4;
  const _component_UButton = _sfc_main$5;
  const _component_UCard = _sfc_main$1;
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
                  class: "h-3 w-3"
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
                  class: "h-3 w-3"
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
                  class: "h-4 w-4"
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
                  class: "h-4 w-4"
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
const CardXPTO = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]], ["__scopeId", "data-v-73c62aad"]]);
const CardXPTElement = defineCustomElement(CardXPTO, {
  shadowRoot: true,
  styles: [tailwindStyles]
});
if (!customElements.get("card-xpto")) {
  customElements.define("card-xpto", CardXPTElement);
}
