import Quill, { Sources } from "quill";

const Embed = Quill.import("blots/embed");

export default class CustomSpan extends Embed {
    static create(value: string): HTMLElement {
        let node = super.create();
        node.setAttribute("class", "complex");
        node.setAttribute("id", value.replaceAll(" ", "_").toLowerCase());

        let span = document.createElement("span");
        span.setAttribute("contenteditable", "false");
        span.textContent = value.replaceAll("_", " ").toUpperCase();

        node.appendChild(span);
        return node;
    }

    // static formats(domNode: HTMLElement) {
    //     console.log("Static format", domNode.getAttribute("id"));
    //     return domNode.getAttribute("id") || true;
    // }

    static value(domNode: HTMLElement) {
        return domNode.getAttribute("id");
    }

    // formats(): Record<string, any> {
    //     const formats = super.formats();

    //     // formats["complex"] = CustomSpan.formats(this.domNode);
    //     // formats["complex"] = CustomSpan.formats(this.domNode);
    //     console.log("Formats", formats);

    //     return formats;
    // }
}
