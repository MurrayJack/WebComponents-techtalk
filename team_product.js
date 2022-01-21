(function () {
  const template = document.createElement("template");

  template.innerHTML = `
    <style>
      article {
        outline: 2px dashed red;
        padding: 10px;
        display: grid;
        grid-template-areas:
          "title basket related"
          "product product related"
          "buy buy related";
        grid-template-columns: 1fr 1fr 200px;
        grid-template-rows: auto 1fr auto;
        gap: 10px;
      }
            
      .title {
        grid-area: title;
      }

      .related {
        grid-area: related
      }

      .buy {
        grid-area: buy;
        display: grid;
        justify-items: end;
      }

      .product {
        grid-area: product
      }

      .basket {
        grid-area: basket;
        display: grid;
        justify-items: end;
      }

      img {
        width: 25%;
      }
    </style>
    <article>  
      <h2 class="title">The Model Store</h2>
    
      <div class="product">
        <img src="./images/product-red.png" />
      
        <p><b>Tractor</b> Porsche-Diesel Master 419</p>
      </div>

      <div class="related">
        <slot name="inspire"></slot>
      </div>

      <div class="buy">
        <slot name="add-to-cart"></slot>
      </div>

      <div class="basket">
        <slot name="basket-label"></slot>
      </div>
      
    </article>
  `;

  class Product extends HTMLElement {
    static get observedAttributes() {
      return ["amount"];
    }

    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.listContainer = this.shadowRoot.querySelector("div");
    }
  }

  customElements.define("product-item", Product);
})();
