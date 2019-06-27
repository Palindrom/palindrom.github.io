// palindrom-bunny v3.0.0 | MIT License
let tmpl = document.createElement('template');
tmpl.innerHTML = `
    <style>
        #stage {
            width: 100%;
            animation: stage 20s step-end;
            animation-iteration-count: infinite;
        }

        @keyframes stage {
            0%  { transform: translateZ(0) translateX(0); }
            10% { transform: translateZ(0) translateX(20%); }
            20% { transform: translateZ(0) translateX(40%); }
            30% { transform: translateZ(0) translateX(60%); }
            40% { transform: translateZ(0) translateX(80%); }
            50% { transform: translateZ(0) translateX(0)    rotateY(180deg); }
            60% { transform: translateZ(0) translateX(-20%) rotateY(180deg); }
            70% { transform: translateZ(0) translateX(-40%) rotateY(180deg); }
            80% { transform: translateZ(0) translateX(-60%) rotateY(180deg); }
            90% { transform: translateZ(0) translateX(-80%) rotateY(180deg); }
        }

        #jump {
            width: 20%;
            animation: jump 2s;
            animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1);
            animation-iteration-count: infinite;
        }

        @keyframes jump {
            0%   { transform: translateZ(0) translateX(0); }
            10%  { transform: translateZ(0) translateX(0); }
            50%  { transform: translateZ(0) translateX(100%); }
            100% { transform: translateZ(0) translateX(100%); }
        }

        #bunny {
            display: inline-block;
            animation: bunny 2s;
            animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1);
            animation-iteration-count: infinite;
            transform-origin: center left;
        }

        @keyframes bunny {
            0%   { transform: translateZ(0) scale(1,1)      translateY(0)      ; }
            10%  { transform: translateZ(0) scale(1.1,.9)   translateY(0)      ; }
            30%  { transform: translateZ(0) scale(.9,1.1)   translateY(-100px) ; }
            50%  { transform: translateZ(0) scale(1.05,.95) translateY(0)      ; }
            57%  { transform: translateZ(0) scale(1,1)      translateY(-7px)   ; }
            64%  { transform: translateZ(0) scale(1,1)      translateY(0)      ; }
            100% { transform: translateZ(0) scale(1,1)      translateY(0)      ; }
        }
    </style>
    <div id="stage">
        <div id="rotate">
            <div id="jump">
                <div id="bunny">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>`;
    
    let usedShadyCss  = false;
    
    if (window.ShadyCSS) {
        usedShadyCss = true;
        ShadyCSS.prepareTemplate(tmpl, 'palindrom-bunny');
    }
        
    class PalindromBunnyElement extends HTMLElement {
        constructor(self) {
            self = super(self);
            if (usedShadyCss) {
                ShadyCSS.styleElement(self);
            }
            const shadowRoot = self.attachShadow({ mode: 'open' });
            const clone = document.importNode(tmpl.content, true);
            shadowRoot.appendChild(clone);
            return self;
        }
    }

    window.customElements.define('palindrom-bunny', PalindromBunnyElement);