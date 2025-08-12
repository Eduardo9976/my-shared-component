import { M as defineComponent, u as createElementBlock, aK as openBlock, v as createBaseVNode, bi as unref, I as createVNode, av as normalizeStyle, b9 as toDisplayString, F as Fragment, aV as renderList, s as createBlock, aS as ref, q as computed, at as normalizeClass, N as defineCustomElement, bO as tailwindStyles } from "./main.js";
import { M as MeIcon, m as meIconStyles } from "./me-icon.min.js";
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
const _hoisted_2 = ["src"];
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "TheHeaderBrand",
  props: {
    brand: { type: Object }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("a", {
          href: unref(useSanitizeURL)(_ctx.brand.link),
          target: _ctx.brand.newTab ? "_blank" : "_self"
        }, [
          createBaseVNode("img", {
            src: _ctx.brand.logo,
            alt: "logo"
          }, null, 8, _hoisted_2)
        ], 8, _hoisted_1$3)
      ]);
    };
  }
});
const _hoisted_1$2 = { class: "grid place-items-center gap-1" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TheHeaderNavigationItem",
  props: {
    iconName: { type: String },
    label: { type: String },
    iconColor: { type: String }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("div", null, [
          createVNode(MeIcon, {
            name: _ctx.iconName,
            size: "xl",
            color: _ctx.iconColor
          }, null, 8, ["name", "color"])
        ]),
        createBaseVNode("p", {
          class: "text-xs",
          style: normalizeStyle({ color: _ctx.iconColor })
        }, toDisplayString(_ctx.label), 5)
      ]);
    };
  }
});
const _hoisted_1$1 = { class: "flex justify-center gap-7" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TheHeaderNavigation",
  props: {
    iconColor: { type: String },
    items: { type: Array }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.items, (item) => {
          return openBlock(), createBlock(_sfc_main$2, {
            key: item.label,
            "icon-name": item.iconName,
            label: item.label,
            "icon-color": _ctx.iconColor
          }, null, 8, ["icon-name", "label", "icon-color"]);
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
        primaryColor: "#343434",
        secondaryColor: "#009900",
        iconColor: "peachPuff"
        // repeatImage: 'https://conteudo.imguol.com.br/c/home/46/2020/03/02/balaio-do-kotscho-150-1583157444753_100x100.jpg.webp',
        // mainImage: 'https://conteudo.imguol.com.br/c/noticias/90/2019/04/01/leonardo-sakamoto-1554157201028_v2_100x100.jpg.webp',
      }
    });
    const navigationItems = ref([
      {
        iconName: "objects-column",
        label: "Dashboard",
        route: "/dashboard"
      },
      {
        iconName: "store",
        label: "Fornecedores",
        route: "/fornecedores"
      }
    ]);
    const headerClasses = computed(() => {
      const baseClasses = "p-4 shadow-lg";
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
      return openBlock(), createElementBlock("header", {
        class: normalizeClass(headerClasses.value),
        style: normalizeStyle(headerStyles.value)
      }, [
        createBaseVNode("nav", _hoisted_1, [
          createVNode(_sfc_main$3, { brand: brand.value }, null, 8, ["brand"]),
          createVNode(_sfc_main$1, {
            "icon-color": iconColor.value,
            items: navigationItems.value
          }, null, 8, ["icon-color", "items"])
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
