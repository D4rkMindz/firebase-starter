import { p as publicAssetsURL } from '../../handlers/renderer.mjs';
import __nuxt_component_0 from './InputField-ebNajqFe.mjs';
import __nuxt_component_1 from './PasswordField-7MR2Hvww.mjs';
import { g as getCurrentUser, _ as __nuxt_component_2 } from './NuxtLinkLocale-dKc6EW4s.mjs';
import { a as useI18n, b as useLocalePath, d as useRoute, n as navigateTo, u as useHead } from '../server.mjs';
import { useFirebaseAuth } from 'vuefire';
import { useSSRContext, defineComponent, withAsyncContext, ref, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-yVxbj29m.mjs';
import 'vue-bundle-renderer/runtime';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import './BaseInput-7ev91uo2.mjs';
import 'vee-validate';
import './nuxt-link-an_5vACD.mjs';
import 'firebase/firestore';
import 'vue-router';
import 'vuefire/server';
import 'firebase/app';
import 'consola/core';
import '@posva/lru-cache';
import 'firebase/auth';
import 'firebase-admin/auth';

const _imports_0 = "" + publicAssetsURL("img/logos/google.svg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a;
    let __temp, __restore;
    const { t } = useI18n();
    useFirebaseAuth();
    const localePath = useLocalePath();
    const route = useRoute();
    const user = ([__temp, __restore] = withAsyncContext(() => getCurrentUser()), __temp = await __temp, __restore(), __temp);
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const loading = {
      google: ref(false),
      password: ref(false)
    };
    if (user) {
      let redirectTo = localePath("/");
      if ((_a = route.query) == null ? void 0 : _a.redirect) {
        redirectTo = route.query.redirect.toString();
      }
      navigateTo(redirectTo);
    }
    useHead({
      title: t("Login")
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InputField = __nuxt_component_0;
      const _component_PasswordField = __nuxt_component_1;
      const _component_nuxt_link_locale = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card bg-base-100 w-full" }, _attrs))} data-v-b032c10a><div class="card-body" data-v-b032c10a><h2 class="card-title" data-v-b032c10a>${ssrInterpolate(_ctx.$t("Please Login"))}</h2><button class="btn"${ssrIncludeBooleanAttr(loading.google.value) ? " disabled" : ""} data-v-b032c10a><img${ssrRenderAttr("src", _imports_0)} alt="G" class="h-6 w-6 mr-2" loading="eager" data-v-b032c10a> Google </button><div class="separator" data-v-b032c10a>${ssrInterpolate(_ctx.$t("Or continue with"))}</div>`);
      if (unref(error)) {
        _push(`<p class="error" data-v-b032c10a>${unref(error)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form data-v-b032c10a>`);
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
      _push(`<button type="submit" class="btn btn-primary w-full mt-2"${ssrIncludeBooleanAttr(loading.password.value) ? " disabled" : ""} data-v-b032c10a>${ssrInterpolate(_ctx.$t("Login"))}</button></form><div class="separator mt-7 mb-7" data-v-b032c10a>${ssrInterpolate(_ctx.$t("Not yet signed up?"))}</div>`);
      _push(ssrRenderComponent(_component_nuxt_link_locale, { to: "/signup" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="btn btn-secondary w-full" data-v-b032c10a${_scopeId}>${ssrInterpolate(_ctx.$t("Sign Up"))}</button>`);
          } else {
            return [
              createVNode("button", { class: "btn btn-secondary w-full" }, toDisplayString(_ctx.$t("Sign Up")), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b032c10a"]]);

export { index as default };
//# sourceMappingURL=index-Tu1euiTG.mjs.map
