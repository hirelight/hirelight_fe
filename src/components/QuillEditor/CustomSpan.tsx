import Quill, { Sources } from "quill";

const Inline = Quill.import("blots/inline");

export default class CustomSpan extends Inline {
    static blotName = "span";
    static tagName = "SPAN";
    static className = "complex";

    format(name: string, value: string | undefined): void {
        if (name === "span" && value) {
            this.domNode.classList.add("complex"); // Ensure the custom class is applied
            this.domNode.innerHTML = value;
        } else {
            super.format(name, value);
        }
    }

    static create(value: string): HTMLElement {
        const node = super.create();
        if (value) {
            node.classList.add("complex");
            node.innerHTML = value;
            node.contentEditable = false;
        }
        return node;
    }

    value(domNode: HTMLElement) {
        return domNode.innerHTML;
    }

    formats(): Record<string, any> {
        const formats = super.formats();
        if (this.domNode.classList.contains("complex")) {
            formats["span"] = this.domNode.innerHTML;
        }
        return formats;
    }
}
