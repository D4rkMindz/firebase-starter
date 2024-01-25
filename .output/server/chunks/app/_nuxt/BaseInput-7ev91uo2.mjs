import { Field, ErrorMessage } from 'vee-validate';
import { resolveComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-yVxbj29m.mjs';

const _sfc_main = {
  name: "BaseInput",
  components: {
    Field,
    ErrorMessage
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
    },
    type: {
      type: String,
      default: "text"
    }
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Field = resolveComponent("Field");
  const _component_ErrorMessage = resolveComponent("ErrorMessage");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "form-control w-full mb-2" }, _attrs))}>`);
  if ($props.label) {
    _push(`<label class="label"${ssrRenderAttr("for", $props.id)}><span class="label-text">${ssrInterpolate($props.label)}</span></label>`);
  } else {
    _push(`<!---->`);
  }
  _push(ssrRenderComponent(_component_Field, mergeProps({
    name: $props.id,
    type: $props.type,
    class: "input input-bordered w-full",
    value: $props.modelValue,
    onInput: $options.updateInput
  }, _ctx.$attrs), null, _parent));
  _push(ssrRenderComponent(_component_ErrorMessage, {
    name: $props.id,
    class: "text-error text-xs mt-2 mb-2"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Form/BaseInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BaseInput = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { BaseInput as B };
//# sourceMappingURL=BaseInput-7ev91uo2.mjs.map
