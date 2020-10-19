class NumberPad extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }

    // Props
    get value() {
        return +this.getAttribute("value")
    }
    set value(value) {
        this.setAttribute("value", value)
    }

    get minimum() {
        return +this.getAttribute("minimum")
    }
    set minimum(minimum) {
        this.setAttribute("minimum", minimum)
    }

    get maximum() {
        return +this.getAttribute("maximum")
    }
    set maximum(maximum) {
        this.setAttribute("maximum", maximum)
    }


    // Property Observer
    static get observedAttributes() {
        return ["value", "minimum", "maximum"]
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        // Refresh UI
        this.refresh()
    }

    // Render UI
    connectedCallback() {
        const template = document.createElement("template")
        template.innerHTML =/*html*/ `
            <style>
                :host {
                    display: block;
                    font-size: 26px;
                    background: #78909c;
                    width: 160px;
                }

                * {
                    box-sizing: border-box;
                }

                #frame {
                    display: block;
                    width: 100%;
                    font-size: 26px;
                    background: #78909c;
                    margin: 1px;
                    padding: 1rem;
                }

                span {
                    text-align: center;
                    background: white;
                    font-family: "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif;
                    display: table;
                    margin: auto;
                    width: 100%;
                }

                button {
                    font-size: 26px;
                    width: calc(50% - .5rem);
                    background: #263238;
                    border: 0;
                    color: white;
                    cursor: pointer;
                    padding: 0;
                    margin-top: 1rem;
                }
            </style>

            <div id="frame">
                <span>
                    <span>
                        <span id="label"></span>
                        <span>
                            <slot name="addition"></slot>
                        </span>
                    </span>
                </span>

                <button id="increment-button">+</button>
                <button id="decrement-button">-</button>
            </div>
        `

        const clone = document.importNode(template.content, true)
        this.shadowRoot.appendChild(clone)

        this.shadowRoot.querySelector("#increment-button").addEventListener("click", () => {
            if (this.value < this.maximum) {
                this.value += 1
            }
        })

        this.shadowRoot.querySelector("#decrement-button").addEventListener("click", () => {
            if (this.value > this.minimum) {
                this.value -= 1
            }
        })

        this.refresh()
    }

    refresh() {
        const label = this.shadowRoot.querySelector("#label")

        if (label !== null) {
            label.innerHTML = Math.min(Math.max(this.value, this.minimum), this.maximum)
        }
    }
}

// Register element
customElements.define("number-pad", NumberPad)