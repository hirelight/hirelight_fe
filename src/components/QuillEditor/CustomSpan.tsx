import Quill, { Sources } from "quill";

const Embed = Quill.import("blots/embed");

export default class CustomSpan extends Embed {
    // static blotName = "span";
    // static tagName = "SPAN";
    // static className = "complex";

    static create(value: string): HTMLElement {
        // const node = super.create();
        // if (value) {
        //     node.classList.add("complex");
        //     node.id = value;
        //     node.innerHTML = value;
        //     node.contentEditable = false;
        //     console.log("create", node);
        // }
        // return node;
        let node = super.create(value);
        node.setAttribute("class", "complex");
        node.setAttribute("id", value);

        let span = document.createElement("span");
        span.setAttribute("contenteditable", "false");
        span.textContent = value;

        node.appendChild(span);
        return node;
    }

    // format(name: string, value: string | undefined): void {
    //     console.log("format", this.domNode.innerHTML);
    //     if (name === "span" && value) {
    //         this.domNode.classList.add("complex"); // Ensure the custom class is applied
    //         this.domNode.innerHTML = value;
    //     } else {
    //         super.format(name, value);
    //     }
    // }

    // value(domNode: HTMLElement) {
    //     console.log("value", domNode.innerHTML);
    //     return domNode.innerHTML;
    // }

    // formats(): Record<string, any> {
    //     const formats = super.formats();
    //     console.log("formats", this.domNode, formats);
    //     if (this.domNode.classList.contains("complex")) {
    //         formats["span"] = this.domNode.innerHTML;
    //     }
    //     return formats;
    // }
}
