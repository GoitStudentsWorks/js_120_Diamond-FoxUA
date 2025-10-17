import{i as c,A as V,a as x,S as U,N as Y,P as F,K}from"./assets/vendor-Dq1_fzaD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}})();const E=new URL("/js_120_Diamond-FoxUA/assets/icons-m-iaAyZR.svg",import.meta.url).href,z="https://books-backend.p.goit.global",G="/books/",i={backdrop:document.querySelector(".js-book-modal-backdrop"),modal:document.querySelector(".js-book-modal"),closeBtn:document.querySelector(".js-book-modal-close-btn"),modalContent:document.querySelector(".js-book-modal-content")};let B=null;async function Z(e){if(!i.backdrop||!i.modal||!i.closeBtn||!i.modalContent){c.error({title:"Error",message:"Error loading modal window.",position:"topRight",timeout:4e3});return}try{const t=await J(e);B=t,Q(t);const o=i.modalContent.querySelector(".book-details-accordion-container");o&&new V(o,{showMultiple:!0}),i.backdrop.classList.add("is-open"),i.modal.classList.add("is-open"),document.body.classList.add("no-scroll"),i.closeBtn.addEventListener("click",v),i.backdrop.addEventListener("click",P),document.addEventListener("keydown",R)}catch{c.error({title:"Error",message:"Could not load book details. Please try again later.",position:"topRight",timeout:4e3})}}function v(){!i.backdrop||!i.modal||!i.closeBtn||!i.modalContent||(i.backdrop.classList.remove("is-open"),i.modal.classList.remove("is-open"),document.body.classList.remove("no-scroll"),i.closeBtn.removeEventListener("click",v),i.backdrop.removeEventListener("click",P),document.removeEventListener("keydown",R),i.modalContent.innerHTML="",B=null)}function P(e){e.target===i.backdrop&&v()}function R(e){e.key==="Escape"&&v()}async function W(e,t={}){try{const{data:o}=await x(e,t);return o}catch(o){throw c.error({title:"Error",titleColor:"#ffffff",message:`The request failed: <u>${o.message}</u>`,messageColor:"#ffffff",backgroundColor:"#ef4040",position:"topRight",timeout:4e3,animateInside:!0,progressBar:!1,close:!1,closeOnClick:!0}),o}}async function J(e){return await W(`${z}${G}${e}`)}function Q(e){const t=`
    <div class="book-modal-details-wrapper">
      <img class="book-modal-img" src="${e.book_image}" alt="${e.title}" loading="lazy"/>
      <div class="book-modal-info">
        <h2 class="book-modal-title">${e.title}</h2>
        <p class="book-modal-author">${e.author}</p>
       <p class="book-modal-price">$${e.price!==void 0&&e.price!==null?Number(e.price).toFixed(2):"The price is not specified."}</p>

        <form class="book-modal-order-form">
          <div class="quantity-selector">
            <button type="button" class="quantity-btn" data-action="decrement">-</button>
            <input type="number" class="quantity-input" value="1" min="1" max="99" aria-label="Number of books" disabled>
            <button type="button" class="quantity-btn" data-action="increment">+</button>
          </div>
          <div class="book-modal-buttons">
            <button type="button" class="add-to-cart-btn" data-book-id="${e._id}">Add To Cart</button>
            <button type="submit" class="buy-now-btn" data-book-id="${e._id}">Buy Now</button>
          </div>
        </form>
        <div class="book-details-accordion-container">
      <div class="ac">
        <h3 class="ac-header">
          <button type="button" class="ac-trigger">Details
             <svg class="books-arrow-icon" width="24" height="24">
               <use href="${E}#icon-arrow-dwn"></use>
             </svg>
          </button>
        </h3>
        <div class="ac-panel">
          <p class="ac-text">${e.description||"No additional information available.."}</p>
        </div>
      </div>

      <div class="ac">
        <h3 class="ac-header">
          <button type="button" class="ac-trigger">Shipping
            <svg class="books-arrow-icon" width="24" height="24">
               <use href="${E}#icon-arrow-dwn"></use>
             </svg>
          </button>
        </h3>
        <div class="ac-panel">
          <p class="ac-text">We ship across the United States within 2–5 business days. All orders are processed through USPS or a reliable courier service. Enjoy free standard shipping on orders over $50.</p>
        </div>
      </div>

      <div class="ac">
        <h3 class="ac-header">
          <button type="button" class="ac-trigger">Returns
            <svg class="books-arrow-icon" width="24" height="24">
               <use href="${E}#icon-arrow-dwn"></use>
             </svg>
          </button>
        </h3>
        <div class="ac-panel">
          <p class="ac-text">You can return an item within 14 days of receiving your order, provided it hasn’t been used and is in its original condition. To start a return, please contact our support team — we’ll guide you through the process quickly and hassle-free.</p>
        </div>
      </div>
    </div>

      </div>
       
   
    </div>
  `;i.modalContent.innerHTML=t;const o=i.modalContent.querySelector(".book-modal-order-form");o&&(o.addEventListener("click",X),o.addEventListener("submit",ee))}function X(e){const t=e.target,o=i.modalContent.querySelector(".quantity-input");if(!o)return;let s=parseInt(o.value);t.dataset.action==="decrement"?s=Math.max(1,s-1):t.dataset.action==="increment"&&(s=Math.min(99,s+1)),o.value=s,t.classList.contains("add-to-cart-btn")&&(t.disabled=!0,(async()=>{try{await new Promise(n=>setTimeout(n,4e3)),c.success({title:"Success!",message:`"${B.title}" (${s} pcs.) added to cart!`,position:"topRight",timeout:4e3})}catch{c.error({title:"Error",message:"Could not add to cart.",position:"topRight"})}finally{t.disabled=!1}})())}function ee(e){e.preventDefault(),c.success({message:"Thank you for your purchase!",position:"topRight",timeout:4e3}),v()}const $="https://books-backend.p.goit.global",te="/books/category-list",oe="/books/top-books",se="/books/category",ne=10,re=24,a={categoryToggleBtn:document.querySelector("[data-category-list-toggle]"),categoryMenuContainer:document.querySelector("[data-category-list]"),categoryListElement:document.querySelector(".books-categories-list"),booksContainer:document.querySelector(".js-books-list"),showMoreBtn:document.querySelector(".books-show-more-btn"),booksShowingCount:document.querySelector(".books-showing-count")};let y=[],u="All categories",g=[],f=0;function S(){return window.innerWidth<768?ne:re}async function q(e,t={}){try{const{data:o}=await x(e,t);return o}catch(o){throw c.error({title:"Error",titleColor:"#ffffff",message:`Request failed: <u>${o.message}</u>`,messageColor:"#ffffff",backgroundColor:"#ef4040",position:"topRight",timeout:4e3,animateInside:!0,progressBar:!1,close:!1,closeOnClick:!0}),o}}async function ae(){return(await q(`${$}${te}`)).map(t=>t.list_name)}async function ie(){return(await q(`${$}${oe}`)).flatMap(t=>t.books)}async function le(e){const t={category:e};return await q(`${$}${se}`,{params:t})}function ce(e){const t=`
    <li class="books-categories-item">
      <a href="#" class="books-categories-list-link ${u==="All categories"?"active":""}">All categories</a>
    </li>
  `,o=e.filter(s=>s!=="All categories"&&s&&s.trim()!=="").map(s=>`
        <li class="books-categories-item">
          <a href="#" class="books-categories-list-link ${s===u?"active":""}">${s}</a>
        </li>
      `).join("");return t+o}function de(e){return e.length===0?'<li class="no-books-message">No books found for this category.</li>':e.map(({book_image:t,title:o,author:s,price:n,_id:r})=>`
        <li class="books-card" data-book-id="${r}">
            <img class="books-card-img" src="${t}" alt="${o}"/>
            <div class="books-info">
                <div class="books-info-left">
                   <h4 class="books-h section-subtitle">${o}</h4>
                   <p class="books-text">${s}</p>
                   
                </div>
                <p class="books-price-text">$${n}</p>
            </div>
            <button class="learn-more-btn" type="button" data-book-modal-open data-book-id="${r}">Learn more</button>
        </li>
    `).join("")}function O(){a.categoryListElement.innerHTML=ce(y),a.categoryListElement.querySelectorAll(".books-categories-list-link").forEach(e=>{e.addEventListener("click",me)})}async function D(){a.booksContainer.innerHTML="",a.showMoreBtn.classList.add("show-more-hidden"),u==="All categories"?g=await ie():g=await le(u),f=0,M()}function M(e=S()){const t=f,o=Math.min(t+e,g.length),s=g.slice(t,o);a.booksContainer.insertAdjacentHTML("beforeend",de(s)),f=o,a.booksShowingCount.textContent=`Showing ${f} of ${g.length}`,f<g.length?a.showMoreBtn.classList.remove("show-more-hidden"):a.showMoreBtn.classList.add("show-more-hidden")}function ue(){const e=a.categoryMenuContainer.classList.toggle("is-open");a.categoryToggleBtn.classList.toggle("is-open"),e&&k()}async function me(e){e.preventDefault();const t=e.target.textContent;if(u===t){a.categoryMenuContainer.classList.remove("is-open"),a.categoryToggleBtn.classList.remove("is-open");return}u=t,O(),await D(),a.categoryToggleBtn.querySelector(".books-categories-btn-text").textContent=u,a.categoryMenuContainer.classList.remove("is-open"),a.categoryToggleBtn.classList.remove("is-open")}async function pe(e){const t=e.target.closest(".learn-more-btn");if(!t)return;const o=t.dataset.bookId;if(o)try{await Z(o)}catch(s){c.error({title:"Error",message:"Failed to load book details. Please try again later.",position:"topRight",timeout:2500}),console.error("Failed to open book modal:",s)}finally{t.disabled=!1}}async function ge(){a.showMoreBtn.disabled=!0;try{M(4)}catch(e){c.error({title:"Error",message:`Failed to load books: ${e.message}`,backgroundColor:"#ef4040",titleColor:"#fff",messageColor:"#fff",position:"topRight"})}finally{a.showMoreBtn.disabled=!1}}async function fe(){y=await ae(),y.includes("All categories")||(y=["All categories",...y]),O(),await D();let e=S();window.addEventListener("resize",()=>{const t=S();t!==e&&(e=t,a.booksContainer.innerHTML="",f=0,M(t))})}const h=a.categoryListElement,w=document.querySelector(".books-categories-scrollbar-thumb");function k(){const{scrollTop:e,scrollHeight:t,clientHeight:o}=h,s=o/t,n=Math.max(s*o,24),r=o-n,l=e/(t-o)*r||0;w.style.height=n+"px",w.style.top=l+"px"}h.addEventListener("scroll",k);window.addEventListener("resize",k);k();let T=!1,_=0,N=0;w.addEventListener("mousedown",e=>{T=!0,_=e.clientY,N=h.scrollTop,document.body.style.userSelect="none"});document.addEventListener("mousemove",e=>{if(!T)return;const{scrollHeight:t,clientHeight:o}=h,s=t-o,n=w.offsetHeight,r=o-n,b=(e.clientY-_)/r*s;h.scrollTop=N+b,k()});document.addEventListener("mouseup",()=>{T=!1,document.body.style.userSelect=""});a.categoryToggleBtn.addEventListener("click",ue);a.booksContainer.addEventListener("click",e=>{const t=e.target.closest(".learn-more-btn");t&&(t.blur(),pe(e))});a.showMoreBtn.addEventListener("click",ge);window.addEventListener("click",function(e){!a.categoryToggleBtn.contains(e.target)&&!a.categoryMenuContainer.contains(e.target)&&(a.categoryMenuContainer.classList.remove("is-open"),a.categoryToggleBtn.classList.remove("is-open"))});document.addEventListener("DOMContentLoaded",fe);document.addEventListener("DOMContentLoaded",()=>{const e=new Swiper("#feedbacks-slider",{slidesPerView:1,spaceBetween:24,grabCursor:!0,keyboard:{enabled:!0,onlyInViewport:!0},a11y:{enabled:!0},watchOverflow:!0,navigation:{nextEl:".btn-next",prevEl:".btn-prev",disabledClass:"is-disabled",lockClass:"is-locked"},pagination:{el:".slider-dots",clickable:!0,bulletClass:"dot",bulletActiveClass:"dot--active"},breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:3}}}),t=document.querySelector(".btn-prev"),o=document.querySelector(".btn-next");function s(){if(t){const r=t.classList.contains("is-disabled");t.toggleAttribute("disabled",r),t.setAttribute("aria-disabled",String(r))}if(o){const r=o.classList.contains("is-disabled");o.toggleAttribute("disabled",r),o.setAttribute("aria-disabled",String(r))}}e.on("init",s),e.on("slideChange",s),e.on("reachBeginning",s),e.on("reachEnd",s),e.on("fromEdge",s),s();function n(r){r.key==="ArrowLeft"&&(r.preventDefault(),t?.click()),r.key==="ArrowRight"&&(r.preventDefault(),o?.click())}t?.addEventListener("keydown",n),o?.addEventListener("keydown",n)});new Swiper(".hero-swiper",{loop:!0,autoplay:{delay:8e3},speed:400,slidesPerView:1,keyboard:{enabled:!0},wrapperClass:"hero-swiper-wrapper",slideClass:"hero-slide",navigation:{nextEl:".hero-right-btn",prevEl:".hero-left-btn"}});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".events-swiper");e&&new U(e,{modules:[Y,F,K],slidesPerView:1,spaceBetween:24,breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:3}},pagination:{el:".ev-pagination",clickable:!0,renderBullet:(t,o)=>`<li class="${o}" aria-label="Go to slide ${t+1}"></li>`,bulletClass:"ev-dot",bulletActiveClass:"ev-dot--active"},navigation:{nextEl:".events-swiper-btn-next",prevEl:".events-swiper-btn-prev"},keyboard:{enabled:!0},watchOverflow:!0})});const p=document.getElementById("modal-backdrop");function be(e){let t=document.querySelector(".modal");t?t.querySelector(".event-title").textContent=e:(t=document.createElement("div"),t.classList.add("modal"),t.innerHTML=`
            <button class="modal-close" aria-label="Close modal">&times;</button>
            <h2 class="modal-title">Register for Event</h2>
            <p class="event-title">${e}</p>
            <form class="modal-form">
                <label>
                    Name
                    <input type="text" placeholder="Your name" required>
                </label>
                <label>
                    Email
                    <input type="email" placeholder="Your email" required>
                </label>
                <button type="submit">Submit</button>
            </form>
        `,p.appendChild(t),t.querySelector(".modal-close").addEventListener("click",A)),p.classList.add("is-open"),document.body.classList.add("no-scroll"),p.addEventListener("click",function o(s){s.target===p&&A(),p.removeEventListener("click",o)})}function A(){p.classList.remove("is-open"),document.body.classList.remove("no-scroll")}const ye=document.querySelectorAll(".event-register-btn");ye.forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.event;be(t)})});(()=>{const e={menu:document.querySelector("[data-menu]"),openBtn:document.querySelector("[data-menu-open]"),closeBtn:document.querySelector("[data-menu-close]")},t=()=>{const o=e.menu.classList.toggle("is-open");document.body.style.overflow=o?"hidden":""};e.openBtn&&e.openBtn.addEventListener("click",t),e.closeBtn&&e.closeBtn.addEventListener("click",t),e.menu.addEventListener("click",o=>{o.target.closest("a")&&(e.menu.classList.remove("is-open"),document.body.style.overflow="")})})();(function(){const e=document.querySelector(".form");if(!e)return;const t=e.querySelector(".join-input"),o=e.querySelector(".join-btn");if(!t||!o)return;let s=t.closest(".input-wrap");s||(s=document.createElement("div"),s.className="input-wrap",t.parentNode.insertBefore(s,t),s.appendChild(t));let n=s.querySelector(".join-error");n||(n=document.createElement("p"),n.className="join-error",n.textContent="Error text",s.appendChild(n)),o.addEventListener("click",r=>{r.preventDefault(),s.classList.add("validated"),t.checkValidity()?(t.setAttribute("aria-invalid","false"),s.classList.remove("validated"),t.value="",t.blur(),o.blur(),console.log("Форма успішно відправлена!"),c.success({message:"Registration success"})):(t.setAttribute("aria-invalid","true"),t.reportValidity&&t.reportValidity(),t.focus())}),t.addEventListener("input",()=>{(t.value.trim()===""||t.checkValidity())&&(t.setAttribute("aria-invalid","false"),s.classList.remove("validated"))})})();const he=new URL("/js_120_Diamond-FoxUA/assets/icons-m-iaAyZR.svg",import.meta.url).href,ve=document.querySelectorAll(".event-btn"),d=document.querySelector("#modal-backdrop"),I=document.body;ve.forEach(e=>{e.addEventListener("click",()=>ke(e.dataset.event))});function ke(e){const t=`
    <div class="modal">
      <button type="button" class="modal-close" aria-label="Close modal">
        <svg width="32" height="32">
         <use href="${he}#icon-x"></use>
        </svg>
      </button>
      <h2 class="modal-title">Register</h2>
      <h3 class="event-title">${e}</h3>
      <form class="modal-form" id="register-form" novalidate>
        <label>
          Name*
          <input type="text" name="name" placeholder="Eva" required />
        </label>
        <label>
          Email*
          <input type="email" name="email" placeholder="hello@booksy.com" required />
        </label>
        <label>
          Message
          <textarea name="message" rows="4" placeholder="Type your message..."></textarea>
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  `;d.innerHTML=t,d.classList.add("is-open"),I.classList.add("no-scroll");const o=d.querySelector(".modal-close"),s=d.querySelector("#register-form");o.addEventListener("click",L),d.addEventListener("click",j),window.addEventListener("keydown",H),s.addEventListener("submit",we)}function L(){d.classList.remove("is-open"),I.classList.remove("no-scroll"),d.innerHTML="",window.removeEventListener("keydown",H),d.removeEventListener("click",j)}function j(e){e.target===d&&L()}function H(e){e.key==="Escape"&&L()}function we(e){e.preventDefault();const t=e.target,o=t.elements.name,s=t.elements.email,n=o.value.trim(),r=s.value.trim();t.querySelectorAll("input, textarea").forEach(b=>Le(b)),t.querySelectorAll(".error-text").forEach(b=>b.remove());let l=!1;n||(C(o,"Name is required"),l=!0),r?Ee(r)||(C(s,"Please enter a valid email"),l=!0):(C(s,"Email is required"),l=!0),!l&&(c.success({message:"Registration successful!",position:"topRight",timeout:2500}),setTimeout(()=>L(),2500))}function C(e,t){e.classList.add("error"),e.dataset.originalPlaceholder||(e.dataset.originalPlaceholder=e.placeholder);const o=document.createElement("p");o.classList.add("error-text"),o.textContent=t,e.insertAdjacentElement("afterend",o)}function Le(e){e.classList.remove("error"),e.dataset.originalPlaceholder&&(e.placeholder=e.dataset.originalPlaceholder)}function Ee(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}const Ce=new URL("/js_120_Diamond-FoxUA/assets/icons-m-iaAyZR.svg",import.meta.url).href,m=document.createElement("button");m.id="scrollUp";m.className="scroll-up";m.innerHTML=`
  <svg class="svg" width="30" height="30">
    <use href="${Ce}#icon-right-arrow-alt"></use>
  </svg>
`;document.body.appendChild(m);window.addEventListener("scroll",()=>{window.scrollY>300?m.classList.add("show"):m.classList.remove("show")});m.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});
//# sourceMappingURL=index.js.map
