import Vue, { VNode } from "vue";

interface DraggableProps {
  enabled: boolean;
}

Vue.directive("draggable", {
  inserted: (el, binding, vnode: VNode, oldVnode: VNode) => {
  },
  bind: (el, binding, vnode: VNode, oldVnode) => {
    vnode.context.$data.draggable = {enabled: binding.value};
  },
  update: (el, binding, vnode: VNode, oldVnode: VNode) => {
    vnode.context.$data.draggable.enabled = binding.value;
  },
  componentUpdated: (el, binding, vnode, oldVnode: VNode) => {
    vnode.context.$data.draggable.enabled = binding.value;
  },
  unbind: (el, binding, vnode, oldVnode: VNode) => {
    delete vnode.context.$data.draggable;
  }
});
