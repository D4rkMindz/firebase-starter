import { B as BaseInput } from './BaseInput-7ev91uo2.mjs';
import { useSSRContext, resolveComponent, mergeProps } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-yVxbj29m.mjs';
import 'vee-validate';

const _sfc_main = {
  name: "InputField",
  components: {
    BaseInput
  },
  props: {
    id: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    modelValue: {
      type: [String, Number],
      default: ""
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_BaseInput = resolveComponent("BaseInput");
  _push(ssrRenderComponent(_component_BaseInput, mergeProps({
    id: $props.id,
    label: $props.label,
    type: "password",
    value: $props.modelValue,
    "onUpdate:modelValue": (e) => _ctx.$emit("update:modelValue", e)
  }, _ctx.$attrs, _attrs), null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/PasswordField.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_1 as default };
//# sourceMappingURL=PasswordField-7MR2Hvww.mjs.map
