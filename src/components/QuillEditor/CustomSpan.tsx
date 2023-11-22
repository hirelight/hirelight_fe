import Quill, { Sources } from "quill";

const Embed = Quill.import("blots/embed");

export default class CustomSpan extends Embed {
    static create(value: string): HTMLElement {
        let node = super.create(value);
        node.setAttribute("class", "complex");
        node.setAttribute("id", value);

        let span = document.createElement("span");
        span.setAttribute("contenteditable", "false");
        span.textContent = value;

        node.appendChild(span);
        return node;
    }
}
