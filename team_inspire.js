(function () {
  const template = document.createElement("template");

  template.innerHTML = `
    <style>
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        justify-content: center;
      }

      img {
        height: var(--related-image-size);
      }

      aside {
        outline: 2px dashed green;
        outline-offset: 2px;
        min-height: 320px;
      }

      h3 {
        text-align: center;
      }
    </style>
    <aside>
      <h3>Related Products</h3>
      <div>loading...</div>
    </aside>
  `;

  class InspireList extends HTMLElement {
    static get observedAttributes() {
      return ["amount"];
    }

    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.listContainer = this.shadowRoot.querySelector("div");
    }

    connectedCallback() {
      window.setTimeout(() => {
        window
          .fetch("./data/related.json")
          .then((e) => e.json())
          .then((e) => {
            const ul = document.createElement("ul");

            e.forEach((element) => {
              const li = document.createElement("ul");
              li.innerHTML = `<img src="${element.item}" />`;
              ul.appendChild(li);
            });

            this.listContainer.replaceWith(ul);
          });
      }, 1000);
    }
  }

  customElements.define("inspire-list", InspireList);
})();
