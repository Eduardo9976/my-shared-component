import { d as defineComponent, c as createBlock, o as openBlock, T as Teleport, O as createBaseVNode, r as renderSlot, h as createTextVNode, a3 as resolveComponent, s as createElementBlock, F as Fragment, S as renderList, w as withCtx, v as createVNode, y as withModifiers, Q as normalizeClass, i as toDisplayString, g as createCommentVNode, a4 as mergeModels, a5 as useModel, a6 as useTemplateRef, m as watch, a7 as onBeforeUnmount, b as ref, x as mergeProps, u as unref, E as normalizeStyle, k as computed, a8 as defineCustomElement, a9 as tailwindStyles } from "./main.js";
import { a as _sfc_main$8, b as _sfc_main$9, m as meIconStyles } from "./me-icon.min.js";
const _hoisted_1$7 = { class: "size-full fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.4)] z-10000" };
const _hoisted_2$5 = { class: "size-full" };
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "AppBackdrop",
  props: {
    teleportTo: { default: "body", type: String }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: _ctx.teleportTo }, [
        createBaseVNode("div", _hoisted_1$7, [
          createBaseVNode("div", _hoisted_2$5, [
            renderSlot(_ctx.$slots, "default", {}, () => [
              _cache[0] || (_cache[0] = createTextVNode(" slot content ", -1))
            ])
          ])
        ])
      ], 8, ["to"]);
    };
  }
});
const _hoisted_1$6 = { class: "cursor-pointer overflow-hidden rounded-bl-lg" };
const _hoisted_2$4 = ["href", "onClick"];
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "TheHeaderAvatarMenuItem",
  props: {
    profileItems: { type: Array },
    setVisibleToFalse: { type: Function },
    nested: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    function accordionItems(item) {
      const { icon, ...rest } = item;
      return [
        {
          ...rest,
          label: icon ? `${icon.class} ${item.label || ""}` : item.label || "",
          children: item.children || []
        }
      ];
    }
    function handleClick(item) {
      if (item.url) {
        const isExternal = /^https?:\/\//.test(item.url);
        if (isExternal) {
          window.open(item.url, "_self");
        } else {
          window.location.href = item.url;
        }
        return props.setVisibleToFalse();
      }
      if (item?.click) {
        item.click();
        props.setVisibleToFalse();
      }
    }
    return (_ctx, _cache) => {
      const _component_TheHeaderAvatarMenuItem = resolveComponent("TheHeaderAvatarMenuItem", true);
      const _component_UAccordion = _sfc_main$8;
      return openBlock(), createElementBlock("ul", _hoisted_1$6, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(props.profileItems, (item, index) => {
          return openBlock(), createElementBlock("li", { key: index }, [
            item.children ? (openBlock(), createBlock(_component_UAccordion, {
              key: 0,
              items: accordionItems(item),
              ui: {
                body: "p-0",
                trigger: `py-2 px-4 hover:bg-blue-100 hover:text-primary flex items-center gap-2 cursor-pointer font-normal ${item.active ? "text-primary" : ""}`
              }
            }, {
              body: withCtx(({ item: accordionItem }) => [
                createVNode(_component_TheHeaderAvatarMenuItem, {
                  "profile-items": accordionItem.children || [],
                  "set-visible-to-false": _ctx.setVisibleToFalse,
                  nested: ""
                }, null, 8, ["profile-items", "set-visible-to-false"])
              ]),
              _: 2
            }, 1032, ["items", "ui"])) : (openBlock(), createElementBlock("a", {
              key: 1,
              class: "py-2 px-4 hover:bg-blue-100 hover:text-primary flex items-center gap-2 cursor-pointer h-10 group",
              href: item.url || "#",
              onClick: withModifiers(() => handleClick(item), ["prevent"])
            }, [
              createBaseVNode("span", {
                class: normalizeClass(["group-hover:text-primary", {
                  "text-[var(--color-neutral-400)] font-semibold": props.nested && !item.active
                }])
              }, toDisplayString(item.label), 3),
              createBaseVNode("span", null, [
                item.icon ? (openBlock(), createBlock(_sfc_main$9, {
                  key: 0,
                  icon: item.icon.class,
                  "custom-size": 16,
                  color: item.icon.color,
                  class: "leading-none"
                }, null, 8, ["icon", "color"])) : createCommentVNode("", true)
              ])
            ], 8, _hoisted_2$4))
          ]);
        }), 128))
      ]);
    };
  }
});
const _hoisted_1$5 = { class: "flex select-none flex-col items-end" };
const _hoisted_2$3 = { class: "flex justify-between gap-4 px-4 py-2 align-center" };
const _hoisted_3 = { class: "grid w-[168px]" };
const _hoisted_4 = { class: "truncate" };
const _hoisted_5 = { class: "block truncate text-xs text-gray-500" };
const _hoisted_6 = { class: "text-2xl font-normal" };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "TheHeaderAvatarMenu",
  props: /* @__PURE__ */ mergeModels({
    user: { type: Object },
    profileItems: { type: Array }
  }, {
    "visible": { type: Boolean },
    "visibleModifiers": {}
  }),
  emits: ["update:visible"],
  setup(__props) {
    const props = __props;
    const visible = useModel(__props, "visible");
    const menuAvatar = useTemplateRef("menuAvatar");
    const avatar = useTemplateRef("avatar");
    watch(
      () => visible.value,
      (newValue) => newValue && window.addEventListener("click", handleClick)
    );
    function setVisibleToFalse() {
      visible.value = false;
      window.removeEventListener("click", handleClick);
    }
    function handleClick(event) {
      const clickedOutsideMenu = menuAvatar.value && !menuAvatar.value.contains(event.target);
      const clickedAvatar = avatar.value && avatar.value.contains(event.target);
      if (clickedOutsideMenu || clickedAvatar) {
        setVisibleToFalse();
      }
    }
    onBeforeUnmount(() => {
      setVisibleToFalse();
    });
    return (_ctx, _cache) => {
      return visible.value ? (openBlock(), createBlock(_sfc_main$7, { key: 0 }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$5, [
            createBaseVNode("div", {
              ref_key: "menuAvatar",
              ref: menuAvatar,
              class: "rounded-bl-lg bg-white text-sm"
            }, [
              createBaseVNode("div", _hoisted_2$3, [
                createBaseVNode("div", _hoisted_3, [
                  createBaseVNode("p", _hoisted_4, toDisplayString(props.user.name), 1),
                  createBaseVNode("small", _hoisted_5, toDisplayString(props.user.role || props.user.email || ""), 1)
                ]),
                createBaseVNode("div", {
                  ref_key: "avatar",
                  ref: avatar,
                  class: "flex items-center justify-center size-12 rounded-full bg-[rgba(0,0,0,0.4)] cursor-pointer text-white bg-primary"
                }, [
                  createBaseVNode("span", _hoisted_6, toDisplayString(props.user.acronym), 1)
                ], 512)
              ]),
              createVNode(_sfc_main$6, {
                profileItems: props.profileItems,
                "set-visible-to-false": setVisibleToFalse
              }, null, 8, ["profileItems"])
            ], 512)
          ])
        ]),
        _: 1
      })) : createCommentVNode("", true);
    };
  }
});
const _hoisted_1$4 = { class: "flex items-center justify-center size-12 rounded-full bg-[rgba(0,0,0,0.4)] mx-auto border-transparent border group-hover:border-white group-hover:border-2" };
const _hoisted_2$2 = { class: "text-2xl uppercase" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "TheHeaderAvatar",
  props: {
    user: { type: Object },
    profileItems: { type: Array }
  },
  setup(__props) {
    const props = __props;
    const visibleMenu = ref(false);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", {
          class: "group py-2 px-4 hover:bg-[rgba(0,0,0,0.1)] cursor-pointer",
          onClick: _cache[0] || (_cache[0] = withModifiers(($event) => visibleMenu.value = !visibleMenu.value, ["stop"]))
        }, [
          createBaseVNode("div", _hoisted_1$4, [
            createBaseVNode("span", _hoisted_2$2, toDisplayString(props.user.acronym), 1)
          ])
        ]),
        createVNode(_sfc_main$5, mergeProps({
          visible: visibleMenu.value,
          "onUpdate:visible": _cache[1] || (_cache[1] = ($event) => visibleMenu.value = $event)
        }, _ctx.$props), null, 16, ["visible"])
      ]);
    };
  }
});
function useSanitizeURL(url) {
  try {
    const parsed = new URL(url, window.location.origin);
    const isSafeProtocol = ["http:", "https:"].includes(parsed.protocol);
    if (!isSafeProtocol) {
      return "#";
    }
    return parsed.href;
  } catch {
    return "#";
  }
}
const _hoisted_1$3 = ["href", "target"];
const _hoisted_2$1 = ["src"];
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "TheHeaderBrand",
  props: {
    brand: { type: Object }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("a", {
        href: unref(useSanitizeURL)(_ctx.brand.link),
        target: _ctx.brand.newTab ? "_blank" : "_self",
        class: "px-4"
      }, [
        createBaseVNode("img", {
          src: _ctx.brand.logo,
          alt: "logo",
          class: "max-w-[75px] max-h-[32px]"
        }, null, 8, _hoisted_2$1)
      ], 8, _hoisted_1$3);
    };
  }
});
const _hoisted_1$2 = { class: "flex items-center justify-center" };
const _hoisted_2 = { class: "text-xs py-[6px] text-[var(--header-icon-color)]" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TheHeaderNavigationItem",
  props: {
    iconColor: { type: String },
    icon: { type: String },
    label: { type: String },
    active: { type: Boolean },
    click: { type: Function }
  },
  setup(__props) {
    const props = __props;
    function handleClick() {
      props.click?.(props);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "grid place-items-center gap-1 px-2 py-1 cursor-pointer relative transition-colors duration-200 hover:bg-[rgba(0,0,0,0.1)]",
          props.active && "after:content-[''] after:bg-[var(--header-icon-color)] after:h-1 after:rounded-full after:absolute after:block after:w-[80%] after:bottom-0 after:left-1/2 after:-translate-x-1/2"
        ]),
        style: normalizeStyle({ "--header-icon-color": _ctx.iconColor }),
        onClick: handleClick
      }, [
        createBaseVNode("div", _hoisted_1$2, [
          createVNode(_sfc_main$9, {
            icon: props.icon,
            "custom-size": 24,
            color: _ctx.iconColor
          }, null, 8, ["icon", "color"])
        ]),
        createBaseVNode("p", _hoisted_2, toDisplayString(_ctx.label), 1)
      ], 6);
    };
  }
});
const _hoisted_1$1 = { class: "flex justify-center gap-7 ml-auto" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TheHeaderNavigation",
  props: {
    iconColor: { type: String },
    items: { type: Array }
  },
  setup(__props) {
    function isSeparator(item) {
      return "separator" in item && item.separator === true;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.items, (item, index) => {
          return openBlock(), createElementBlock(Fragment, {
            key: isSeparator(item) ? `separator-${index}` : item.label
          }, [
            isSeparator(item) ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "border-l my-2",
              style: normalizeStyle({ borderColor: _ctx.iconColor })
            }, null, 4)) : (openBlock(), createBlock(_sfc_main$2, mergeProps({
              key: 1,
              ref_for: true
            }, { ...item, iconColor: _ctx.iconColor }), null, 16))
          ], 64);
        }), 128))
      ]);
    };
  }
});
const _hoisted_1 = { class: "flex justify-between items-center" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TheHeader.ce",
  setup(__props) {
    const brand = ref({
      logo: "https://eletrods.me.com.br/logo.svg",
      link: "https://me.com.br",
      newTab: true,
      background: {
        // primaryColor: '#343434',
        // secondaryColor: '#009900',
        // iconColor: 'peachPuff'
        // repeatImage: 'https://conteudo.imguol.com.br/c/home/46/2020/03/02/balaio-do-kotscho-150-1583157444753_100x100.jpg.webp',
        // mainImage: 'https://conteudo.imguol.com.br/c/noticias/90/2019/04/01/leonardo-sakamoto-1554157201028_v2_100x100.jpg.webp',
      }
    });
    const navigationItems = ref([
      {
        icon: "me-icon-l icon-objects-column",
        label: "Dashboard",
        click: (e) => console.log(e),
        active: true
      },
      {
        separator: true
      },
      {
        icon: "me-icon-l icon-store",
        label: "Fornecedores",
        click: (e) => console.log(e)
      }
    ]);
    const user = ref({
      name: "Renato Dias",
      role: "Developer",
      acronym: "RD",
      badge: {
        variant: "danger",
        icon: "me-icon-l icon-exclamation"
      }
    });
    const profileItems = ref([
      {
        label: "Profile",
        click: () => console.log("Profile"),
        icon: {
          class: "me-icon-l icon-user-alt",
          color: "var(--me-primary-1)"
        }
      },
      {
        label: "Change Password",
        url: "#",
        icon: {
          class: "me-icon-l icon-key",
          color: "var(--me-warning-2)"
        }
      },
      {
        label: "Português (pt-BR)",
        active: true,
        children: [
          { label: "Espanhol (es-MX)", url: "#" },
          { label: "Francês (fr-FR)", click: () => console.log("French") },
          { label: "Inglês (en-US)", url: "#" },
          { label: "Português (pt-PT)", url: "#" }
        ]
      },
      {
        label: "Logoff",
        url: "#"
      }
    ]);
    const headerClasses = computed(() => {
      const baseClasses = "shadow-lg";
      return `${baseClasses} text-white`;
    });
    const headerStyles = computed(() => {
      const styles = {};
      const bg = brand.value.background || {};
      const hasMainImage = Boolean(bg.mainImage);
      const hasRepeatImage = Boolean(bg.repeatImage);
      const hasPrimaryColor = Boolean(bg.primaryColor);
      const hasSecondaryColor = Boolean(bg.secondaryColor);
      if (hasMainImage && hasRepeatImage && bg.mainImage && bg.repeatImage) {
        styles.backgroundImage = `url(${bg.mainImage}), url(${bg.repeatImage})`;
        styles.backgroundSize = "cover, auto";
        styles.backgroundPosition = "center, center";
        styles.backgroundRepeat = "no-repeat, repeat";
      } else if (hasMainImage && hasPrimaryColor && bg.mainImage && bg.primaryColor) {
        styles.backgroundColor = bg.primaryColor;
        styles.backgroundImage = `url(${bg.mainImage})`;
        styles.backgroundSize = "contain";
        styles.backgroundPosition = "center";
        styles.backgroundRepeat = "no-repeat";
      } else if (hasRepeatImage && !hasMainImage && bg.repeatImage) {
        styles.backgroundImage = `url(${bg.repeatImage})`;
        styles.backgroundSize = "auto";
        styles.backgroundPosition = "center";
        styles.backgroundRepeat = "repeat";
      } else if (hasPrimaryColor && hasSecondaryColor && !hasMainImage && !hasRepeatImage && bg.primaryColor && bg.secondaryColor) {
        styles.background = `linear-gradient(135deg, ${bg.primaryColor} 0%, ${bg.secondaryColor} 100%)`;
      } else if (hasPrimaryColor && !hasSecondaryColor && !hasMainImage && !hasRepeatImage && bg.primaryColor) {
        styles.backgroundColor = bg.primaryColor;
      } else {
        styles.backgroundColor = "var(--ui-primary)";
      }
      return styles;
    });
    const iconColor = computed(() => {
      return brand.value.background?.iconColor || "white";
    });
    return (_ctx, _cache) => {
      const _component_TheHeaderAvatar = _sfc_main$4;
      return openBlock(), createElementBlock("header", {
        class: normalizeClass(headerClasses.value),
        style: normalizeStyle(headerStyles.value)
      }, [
        createBaseVNode("nav", _hoisted_1, [
          createVNode(_sfc_main$3, { brand: brand.value }, null, 8, ["brand"]),
          createVNode(_sfc_main$1, {
            "icon-color": iconColor.value,
            items: navigationItems.value
          }, null, 8, ["icon-color", "items"]),
          createVNode(_component_TheHeaderAvatar, {
            user: user.value,
            profileItems: profileItems.value
          }, null, 8, ["user", "profileItems"])
        ])
      ], 6);
    };
  }
});
const TheHeaderElement = defineCustomElement(_sfc_main, {
  shadowRoot: true,
  styles: [tailwindStyles, meIconStyles]
});
if (!customElements.get("the-header")) {
  customElements.define("the-header", TheHeaderElement);
}
