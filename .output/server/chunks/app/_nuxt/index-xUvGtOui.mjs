import __nuxt_component_0 from './InputField-ebNajqFe.mjs';
import __nuxt_component_1 from './PasswordField-7MR2Hvww.mjs';
import { g as getCurrentUser, _ as __nuxt_component_2 } from './NuxtLinkLocale-dKc6EW4s.mjs';
import { a as useI18n, d as useRoute, b as useLocalePath, n as navigateTo, u as useHead } from '../server.mjs';
import { useFirebaseAuth } from 'vuefire';
import { useSSRContext, defineComponent, ref, withAsyncContext, watch, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, openBlock, createElementBlock, createElementVNode } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-yVxbj29m.mjs';
import './BaseInput-7ev91uo2.mjs';
import 'vee-validate';
import './nuxt-link-an_5vACD.mjs';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'firebase/firestore';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'vuefire/server';
import 'firebase/app';
import 'consola/core';
import '@posva/lru-cache';
import 'firebase/auth';
import 'firebase-admin/auth';

function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    createElementVNode("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
    })
  ]);
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a;
    let __temp, __restore;
    const { t } = useI18n();
    const route = useRoute();
    const localePath = useLocalePath();
    useFirebaseAuth();
    const validation = {
      canSubmit() {
        return this.email && this.alphanumerical && this.special && this.uppercase && this.minLength && this.match;
      },
      email: false,
      alphanumerical: false,
      special: false,
      uppercase: false,
      minLength: false,
      match: false
    };
    const email = ref("");
    const password = ref("");
    const passwordRetype = ref("");
    const error = ref("");
    const user = ([__temp, __restore] = withAsyncContext(() => getCurrentUser()), __temp = await __temp, __restore(), __temp);
    if (user) {
      let redirectTo = localePath("/");
      if ((_a = route.query) == null ? void 0 : _a.redirect) {
        redirectTo = route.query.redirect.toString();
      }
      navigateTo(redirectTo);
    }
    watch(email, (e) => {
      validation.email = e.length > 0;
    });
    watch(password, (p) => {
      validation.special = /^.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~].*$/.test(p);
      validation.alphanumerical = /^.*[a-zA-Z].*$/.test(p);
      validation.uppercase = /^.*[A-Z].*$/.test(p);
      validation.minLength = p.length >= 8;
      validation.match = passwordRetype.value === p;
    });
    watch(passwordRetype, (p) => {
      validation.match = password.value === p;
    });
    useHead({
      title: t(`Sign up`) + " @ " + t(`APP_NAME`)
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InputField = __nuxt_component_0;
      const _component_PasswordField = __nuxt_component_1;
      const _component_nuxt_link_locale = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card bg-base-100 w-full" }, _attrs))} data-v-4a4c7a22><div class="card-body" data-v-4a4c7a22><h2 class="card-title" data-v-4a4c7a22>${ssrInterpolate(_ctx.$t("Sign up"))}</h2>`);
      if (unref(error)) {
        _push(`<p class="error" data-v-4a4c7a22>${unref(error)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form data-v-4a4c7a22>`);
      _push(ssrRenderComponent(_component_InputField, {
        modelValue: unref(email),
        "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
        label: _ctx.$t("Email")
      }, null, _parent));
      _push(ssrRenderComponent(_component_PasswordField, {
        modelValue: unref(password),
        "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
        label: _ctx.$t("Password")
      }, null, _parent));
      _push(`<div class="password-validation" data-v-4a4c7a22><div class="check" data-v-4a4c7a22>`);
      _push(ssrRenderComponent(unref(render), {
        class: ["icon", { "success": validation.alphanumerical }]
      }, null, _parent));
      _push(`<p class="${ssrRenderClass({ "success": validation.alphanumerical })}" data-v-4a4c7a22>${ssrInterpolate(_ctx.$t("Contains alphanumerical character"))}</p></div><div class="check" data-v-4a4c7a22>`);
      _push(ssrRenderComponent(unref(render), {
        class: ["icon", { "success": validation.special }]
      }, null, _parent));
      _push(`<p class="${ssrRenderClass({ "success": validation.special })}" data-v-4a4c7a22>${ssrInterpolate(_ctx.$t("Contains special character"))}</p></div><div class="check" data-v-4a4c7a22>`);
      _push(ssrRenderComponent(unref(render), {
        class: ["icon", { "success": validation.uppercase }]
      }, null, _parent));
      _push(`<p class="${ssrRenderClass({ "success": validation.uppercase })}" data-v-4a4c7a22>${ssrInterpolate(_ctx.$t("Contains uppercase character"))}</p></div><div class="check" data-v-4a4c7a22>`);
      _push(ssrRenderComponent(unref(render), {
        class: ["icon", { "success": validation.minLength }]
      }, null, _parent));
      _push(`<p class="${ssrRenderClass({ "success": validation.minLength })}" data-v-4a4c7a22>${ssrInterpolate(_ctx.$t("Is at least 8 characters long"))}</p></div></div>`);
      _push(ssrRenderComponent(_component_PasswordField, {
        modelValue: unref(passwordRetype),
        "onUpdate:modelValue": ($event) => isRef(passwordRetype) ? passwordRetype.value = $event : null,
        label: _ctx.$t("Retype Password")
      }, null, _parent));
      _push(`<div class="password-validation" data-v-4a4c7a22><div class="check" data-v-4a4c7a22>`);
      _push(ssrRenderComponent(unref(render), {
        class: ["icon", { "success": validation.match }]
      }, null, _parent));
      _push(`<p class="${ssrRenderClass({ "success": validation.match })}" data-v-4a4c7a22>${ssrInterpolate(_ctx.$t("Passwords must match"))}</p></div></div><button type="submit" class="btn btn-primary w-full mt-2"${ssrIncludeBooleanAttr(!validation.canSubmit()) ? " disabled" : ""} data-v-4a4c7a22>${ssrInterpolate(_ctx.$t("Sign up"))}</button></form><div class="separator mt-7 mb-7" data-v-4a4c7a22>${ssrInterpolate(_ctx.$t("Already have an account?"))}</div>`);
      _push(ssrRenderComponent(_component_nuxt_link_locale, { to: "/login" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="btn btn-secondary btn-outline text-secondary-content w-full" data-v-4a4c7a22${_scopeId}>${ssrInterpolate(_ctx.$t("Login"))}</button>`);
          } else {
            return [
              createVNode("button", { class: "btn btn-secondary btn-outline text-secondary-content w-full" }, toDisplayString(_ctx.$t("Login")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/signup/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4a4c7a22"]]);

export { index as default };
//# sourceMappingURL=index-xUvGtOui.mjs.map
