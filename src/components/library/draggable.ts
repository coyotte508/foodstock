import $ from 'jquery';
import {Component, Vue} from "vue-property-decorator";

@Component({
  created() {
    this.addMouseMoveListener();
  },
  destroyed() {
    if (this.draggingElement) {
      this.draggingElement.remove();
    }
    if (this.mouseMoveListener) {
      window.removeEventListener("mousemove", this.mouseMoveListener);
    }
  },
  watch: {
    drag(this: Draggable, newVal, oldVal) {
      if (newVal) {
        this.dragStart();
      } else {
        this.dragStop();
      }
    }
  }
})
export default class Draggable extends Vue {
  drag = false;
  draggingElement: JQuery<HTMLElement> = null;
  mouseMoveListener = null;
  mouseX = 0;
  mouseY = 0;

  dragStart() {
    console.log('drag start');

    if (this.draggingElement) {
      console.log('Already dragging elemnt');
      return;
    }

    this.addMouseMoveListener();

    const el: SVGGElement = this.$el as any;
    const bbox = el.getBBox({clipped: false, fill: true, markers: true, stroke: true});
    /* Firefox bug. Otherwise just el.getBoundingClientRect */
    const rect = (el.childNodes[0] as SVGGraphicsElement).getBoundingClientRect();
    const clone = $(this.$el).clone().removeClass('draggable').attr("transform", null);
    this.draggingElement = $(`<svg viewBox='${bbox.x - bbox.width * 0.05} ${bbox.y - bbox.height * 0.05} ${bbox.width * 1.1} ${bbox.height * 1.1}'>`).append(clone);
    this.draggingElement.css('position', 'absolute');
    this.draggingElement.attr("width", rect.width);
    this.draggingElement.attr("height", rect.height);
    this.updateDraggingElementPosition();

    $(".foodstock").append(this.draggingElement);
    this.drag = true;
    this.$emit("start");
  }

  dragStop() {
    if (!this.draggingElement) {
      return;
    }

    this.draggingElement.remove();
    this.draggingElement = null;

    this.drag = false;
    this.$emit("stop");
  }

  updateDraggingElementPosition() {
    if (this.draggingElement) {
      this.draggingElement.css('top', this.mouseY - +this.draggingElement.attr("height") / 2);
      this.draggingElement.css('left', this.mouseX - +this.draggingElement.attr("width") / 2);
    }
  }

  addMouseMoveListener() {
    if (this.mouseMoveListener) {
      return;
    }

    this.mouseMoveListener = (ev: MouseEvent) => {
      this.mouseX = ev.pageX;
      this.mouseY = ev.pageY;

      this.updateDraggingElementPosition();
    };

    window.addEventListener("mousemove", this.mouseMoveListener);
  }
}