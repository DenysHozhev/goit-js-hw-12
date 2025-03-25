import{a as c,S as d,i}from"./assets/vendor-Dn3QujGD.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(r){if(r.ep)return;r.ep=!0;const t=s(r);fetch(r.href,t)}})();c.defaults.baseURL="https://pixabay.com/api/";function f(o,e={}){const s={key:"49272449-54e018c7c1ace9d1b8dfc3596",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,...e};return c.get("",{params:s}).then(a=>a.data).catch(a=>{throw a})}const m=document.querySelector(".gallery");function p(o){m.innerHTML=o.map(e=>`
  <li class="gallery-item">
    <a class="gallery-link" href="${e.largeImageURL}">
      <img
        class="gallery-image"
        src="${e.webformatURL}"
        data-source="${e.largeImageURL}"
        alt="${e.tags}"
      />
    </a>
    <p>Likes: ${e.likes}</p>
    <p>Views: ${e.views}</p>
    <p>Comments: ${e.comments}</p>
    <p>Downloads:  ${e.downloads}</p>
  </li>`).join("")}function y(){const o=document.querySelector(".gallery");o.innerHTML=""}const u=document.querySelector(".form"),l=document.querySelector(".loader");document.querySelector(".gallery");const g=new d(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,animationSpeed:350});u.addEventListener("submit",h);function h(o){o.preventDefault();const e=o.currentTarget.elements["search-text"].value.trim();e&&(l.classList.remove("hidden"),y(),u.reset(),f(e).then(s=>{const a=s.hits;if(a.length===0){console.error("No images found for this search query"),i.error({title:"Sorry",message:`Sorry, there are no images matching your search query. Please try again!
`,position:"topRight"});return}p(a),g.refresh()}).catch(s=>{i.error({title:"Sorry",message:`Sorry, there are no images matching your search query. Please try again!
`,position:"topRight"})}).finally(()=>{l.classList.add("hidden")}))}
//# sourceMappingURL=index.js.map
