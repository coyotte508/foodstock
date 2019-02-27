import Vue, { VNode } from "vue";
import $ from 'jquery';

interface DraggableProps {
  enabled: boolean;
  dragging?: JQuery<HTMLElement>;
  mouseX: number;
  mouseY: number;
  listener: any;
  vnode: VNode;
}

function handler(el: HTMLElement, binding, vnode: VNode, oldVnode?: VNode) {
  vnode.context.$data.draggable = vnode.context.$data.draggable || {};
  vnode.context.$data.draggable.enabled = binding.value;
  vnode.context.$data.draggable.vnode = vnode;
}

function updateDraggingElementPosition(data: DraggableProps) {
  if (data.dragging) {
    data.dragging.css('top', data.mouseY - +data.dragging.attr("height") / 2);
    data.dragging.css('left', data.mouseX - +data.dragging.attr("width") / 2);
  }
}

function addMouseMoveListener(data: DraggableProps) {
  if (data.listener) {
    return;
  }

  data.listener = (ev: MouseEvent) => {
    data.mouseX = ev.pageX;
    data.mouseY = ev.pageY;

    updateDraggingElementPosition(data);
  };

  window.addEventListener("mousemove", data.listener);
}

Vue.directive("draggable", {
  inserted: (el, binding, vnode: VNode) => {
    console.log("inserted");

    handler(el, binding, vnode);
    el.addEventListener("click", () => {
      console.log("drag start");

      const data: DraggableProps = vnode.context.$data.draggable;

      if (!data.enabled || data.dragging) {
        return;
      }

      const g: SVGGElement = el as any;
      const bbox = g.getBBox(/* {clipped: false, fill: true, markers: true, stroke: true} */);
      /* Firefox bug. Otherwise just el.getBoundingClientRect */
      const rect = (g.childNodes[0] as SVGGraphicsElement).getBoundingClientRect();
      const clone = $(g).clone().removeClass('draggable').attr("transform", null);
      data.dragging = $(`<svg viewBox='${bbox.x - bbox.width * 0.05} ${bbox.y - bbox.height * 0.05} ${bbox.width * 1.1} ${bbox.height * 1.1}'>`).append(clone);
      data.dragging.css('position', 'absolute');
      data.dragging.css('pointer-events', 'none');
      data.dragging.attr("width", rect.width);
      data.dragging.attr("height", rect.height);
      document.body.style.cursor = "pointer";

      updateDraggingElementPosition(data);

      $(".foodstock").append(data.dragging);

      console.log("emitting start event");
      data.vnode.context.$emit("dragStart");

      (window as any).dragged = vnode;
    });
  },
  bind: (el, binding, vnode: VNode) => {
    console.log("bind");
    handler(el, binding, vnode);

    const data: DraggableProps = vnode.context.$data.draggable;

    vnode.context.$watch("$dragged", (val, old) => {
      // Drag stop
      if (!val && data.dragging) {
        document.body.style.cursor = "default";

        data.dragging.remove();
        data.dragging = null;
        (window as any).dragged = null;

        data.vnode.context.$emit("dragStop");
      }
    });

    addMouseMoveListener(vnode.context.$data.draggable);
  },
  update: (el, binding, vnode: VNode, oldVnode: VNode) => {
    console.log("update");
    handler(el, binding, vnode);
  },
  componentUpdated: (el, binding, vnode, oldVnode: VNode) => {
    console.log("updated");
    handler(el, binding, vnode);
  },

  unbind: (el, binding, vnode, oldVnode: VNode) => {
    // Cleanup

    const data: DraggableProps = vnode.context.$data.draggable;
    delete vnode.context.$data.draggable;

    if (data.listener) {
      window.removeEventListener("mousemove", data.listener);
    }
    data.vnode = null;
  }
});
