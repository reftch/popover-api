class DialogElement extends HTMLElement {
  static get observedAttributes() {
    return ['target']
  }

  target = ''

  connectedCallback() {
    this.querySelectorAll('button[role="open"]')
      .forEach((el: Element) => el.addEventListener('click', this))
  }

  disconnectedCallback() {
    this.querySelectorAll('button[role="open"]')
      .forEach((el: Element) => el.removeEventListener('click', this))
  }

  attributeChangedCallback(name: string, _: string, newValue: string) {
    this[name] = newValue
  }

  handleEvent = (e: Event) => {
    const dialog = document.getElementById(this.target) as HTMLDialogElement
    const role = (e.target as HTMLElement).getAttribute('role')
    switch (role) {
      case 'open':
        dialog.showModal()
        dialog.querySelectorAll('button[role="close"]')
          .forEach((el: Element) => el.addEventListener('click', this))
        break;
      case 'close':
        dialog.querySelectorAll('button[role="close"]')
          .forEach((el: Element) => el.removeEventListener('click', this))
        dialog.close()
        break;
    }
  }
}

if (!customElements.get('dialog-element')) {
  customElements.define('dialog-element', DialogElement)
}
