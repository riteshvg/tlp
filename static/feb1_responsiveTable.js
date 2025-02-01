customElements.define(
  'responsive-table',
  class extends HTMLElement {
    /**
     * Instantiate the Web Component
     */
    constructor() {
      // Get parent class properties
      super();

      // Add table headers & ARIA
      this.addTableHeaders();
      this.addARIA();
    }

    /**
     * Add mobile headers to the table
     */
    addTableHeaders() {
      // Add table ID if there isn't one
      if (!this.id) {
        this.id = `responsive-table-${crypto.randomUUID()}`;
      }

      // Get all of the headings
      let ths = Array.from(this.querySelectorAll('th')).map((th) => {
        return th.textContent;
      });

      // Create the style sheet
      let stylesheet = document.createElement('style');
      stylesheet.innerHTML = ths
        .map((th, index) => {
          return `
			 #${this.id} td:nth-child(${index + 1})::before {content:" ${th}: ";}`;
        })
        .join('');
      document.head.append(stylesheet);
    }

    /**
     * Add required ARIA roles for responsive UI
     */
    addARIA() {
      // [role="table"]
      this.querySelector('table').setAttribute('role', 'table');

      // [role="rowgroup"]
      for (let group of this.querySelectorAll('thead, tbody, tfoot')) {
        group.setAttribute('role', 'rowgroup');
      }

      // [role="row"]
      for (let row of this.querySelectorAll('tr')) {
        row.setAttribute('role', 'row');
      }

      // [role="cell"]
      for (let cell of this.querySelectorAll('td')) {
        cell.setAttribute('role', 'cell');
      }

      // [role="columnheader"]
      for (let th of this.querySelectorAll('th')) {
        th.setAttribute('role', 'columnheader');
      }

      // [role="rowheader"]
      for (let th of this.querySelectorAll('th[scope=row]')) {
        th.setAttribute('role', 'rowheader');
      }
    }
  }
);
