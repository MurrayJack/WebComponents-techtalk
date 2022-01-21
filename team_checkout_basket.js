(function () {
  const template = document.createElement("template");

  template.innerHTML = `
    <style>
      div {
        color: white;
        background: #888;
        display: inline-block;
        padding: 4px;
        border-radius: 4px;
        outline: 2px dashed blue; 
        outline-offset: 2px;
      }
    </style>
    <div>
      basket: <span>0</span> items
    </div>
  `;

  class Basket extends HTMLElement {
    static get observedAttributes() {
      return ["value"];
    }

    constructor() {
      super();

      this.addToCart = this.addToCart.bind(this);

      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.displayVal = this.shadowRoot.querySelector("span");
    }

    connectedCallback() {
      if (!this.hasAttribute("value")) {
        this.setAttribute("value", 0);
      }
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.displayVal.innerText = this.value;
    }

    get value() {
      return this.getAttribute("value");
    }

    set value(newValue) {
      this.setAttribute("value", newValue);
    }

    addToCart() {
      this.value++;
    }
  }

  customElements.define("basket-label", Basket);
})();
