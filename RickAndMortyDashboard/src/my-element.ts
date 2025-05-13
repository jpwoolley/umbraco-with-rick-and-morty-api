import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('my-element')
export class MyElement extends LitElement {
    @state()
    private isLoading: boolean = false;

    render() {
        return html`
      <uui-box>
  <section aria-labelledby="dashboard-title">
    <header>
      <h2 id="dashboard-title" class="uui-h2">Welcome to the Rick and Morty Dashboard!</h2>
    </header>
    <p>
      On this page, you can use the two buttons below - <strong>Import</strong> and <strong>Delete</strong> - to
      programmatically manage the content of the Characters page.
    </p>
    <ul>
      <li>
        <strong>Import</strong>: Clicking this button will contact the <cite>Rick and Morty API</cite> and download character data. New characters will be created and existing characters will be updated.
      </li>
      <li>
        <strong>Delete</strong>: Clicking this button will remove all characters currently shown on the Characters page.
      </li>
    </ul>
  </section>

  <section class="dashboard-button-container" aria-label="Buttons which perform actions for managing character content">
    <uui-button
      @click=${this._handleImportCharacters}
      ?disabled=${this.isLoading}
      look="outline"
      label="Import"
      type="button"
      color="default"
    >
      Import
    </uui-button>
    <uui-button
      @click=${this._handleDeleteCharacters}
      ?disabled=${this.isLoading}
      look="outline"
      label="Delete"
      type="button"
      color="default"
    >
      Delete
    </uui-button>
</section>

  ${this.isLoading
            ? html`<section aria-label="Character import or delete in progress" role="status">
              <p>Performing selected action. This may take a couple of minutes to complete. Please stay on this page.</p>
            </section>`
                : null}
</uui-box>
`;
    }

    private async _handleImportCharacters() {
        this.isLoading = true;
        try {
            const response = await fetch('/umbraco/api/rickandmortycharacters', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            alert('Import successful');
        } catch (error) {
            console.error('Error importing characters:', error);
            alert('Failed to import characters');
        } finally {
            this.isLoading = false;
        }
    }

    private async _handleDeleteCharacters() {
        this.isLoading = true;
        try {
            const response = await fetch('/umbraco/api/rickandmortycharacters', {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            alert(`Delete successful`);
        } catch (error) {
            console.error('Error deleting characters:', error);
            alert('Failed to delete characters');
        } finally {
            this.isLoading = false;
        }
    }

    static styles = css`
    :host {
    display: block;
    padding: var(--uui-size-layout-1);
}

button[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
}

.dashboard-button-container {
    width: 100%;
    display: flex;
}

.dashboard-button-container uui-button:first-child {
    margin-right: 0.5em;
}
  `;
}

declare global {
    interface HTMLElementTagNameMap {
        'my-element': MyElement;
    }
}
