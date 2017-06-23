namespace Graphics {
    export class Controls {
        private element: Element;
        private count: number = 10000;

        constructor (private app: App) {
            this.show();
        }

        public show (): void {
            if (this.element) return;
            let html = `
                <div id="controls">
                    <span>${this.count}</span>
                    <input type="range" min="1" max="10000" value="${this.count}" />
                    <button>Restart</button>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', html);

            this.element = document.getElementById('controls');
            this.element.querySelector('button').addEventListener('click', () => {
                this.count = parseInt(this.element.querySelector('input').value);
                this.app.stop();
                this.app.reset();
                this.app.run();
            });
            this.element.querySelector('input').addEventListener('change', (e) => {
                this.element.querySelector('span').innerHTML = this.element.querySelector('input').value;
            });
        }

        public hide (): void {
            if (!this.element) return;

            this.element.parentNode.removeChild(this.element);
            this.element = null;
        }

        public getCount (): number {
            return this.count;
        }
    }
}
