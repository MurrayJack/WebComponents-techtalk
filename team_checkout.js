(function () {
  const template = document.createElement("template");

  template.innerHTML = `
    <style>
      div { 
        display: inline-block;
        outline: 2px dashed blue; 
        outline-offset: 2px;
      }
    </style>
    <div>
      <button>
        buy for <span></span>
      </button>
    </div>
  `;

  class CheckoutButton extends HTMLElement {
    static get observedAttributes() {
      return ["amount"];
    }

    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.buyEvent = new CustomEvent("buy", {
        bubbles: false,
        cancelable: false
      });

      this.displayVal = this.shadowRoot.querySelector("span");

      this.shadowRoot.querySelector("button").addEventListener("click", () => {
        this.dispatchEvent(this.buyEvent);
      });
    }

    connectedCallback() {
      if (!this.hasAttribute("amount")) {
        this.setAttribute("amount", 0);
      }
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.displayVal.innerText = this.amount;
    }

    get amount() {
      return this.getAttribute("amount");
    }

    set amount(newValue) {
      this.setAttribute("amount", newValue);
    }
  }

  customElements.define("checkout-button", CheckoutButton);
})();
