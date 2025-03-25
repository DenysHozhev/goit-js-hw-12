import{a as p,S as b,i}from"./assets/vendor-Dn3QujGD.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const f of o.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&a(f)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();p.defaults.baseURL="https://pixabay.com/api/";async function m(r,e={},s=1){const a={key:"49272449-54e018c7c1ace9d1b8dfc3596",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:s,...e};try{return(await p.get("",{params:a})).data}catch(t){throw console.error("Error fetching data from Pixabay API:",t),t}}const S=document.querySelector(".gallery");function v(r){S.innerHTML=r.map(e=>`
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
  </li>`).join("")}function $(){const r=document.querySelector(".gallery");r.innerHTML=""}const y=document.querySelector(".form"),c=document.querySelector(".loader"),g=document.querySelector(".gallery"),d=document.querySelector(".button");let u=0,n=0,l="",h=1;const L=new b(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,animationSpeed:350});y.addEventListener("submit",q);d.addEventListener("click",H);async function q(r){if(r.preventDefault(),l=r.currentTarget.elements["search-text"].value.trim(),!!l){c.classList.remove("hidden"),$(),y.reset(),n=0,h=1;try{const e=await m(l,{},h),s=e.hits;if(u=e.totalHits,n+=s.length,s.length===0){i.error({title:"Sorry",message:"No images found, please try another search.",position:"topRight"});return}w(s),L.refresh();const a=g.scrollHeight,t=g.scrollHeight;window.scrollBy({top:t-a,behavior:"smooth"}),n>=u?(i.show({title:"End of search",message:"You have reached the end of the collection.",position:"topRight"}),d.classList.add("hidden")):d.classList.remove("hidden")}catch(e){i.error({title:"Error",message:`Something went wrong: ${e.message}`,position:"topRight"})}finally{c.classList.add("hidden")}}}function w(r){g.insertAdjacentHTML("beforeend",v(r)),L.refresh()}async function H(){if(n<u){c.classList.remove("hidden"),h+=1;try{const e=(await m(l,{},h)).hits;n+=e.length,w(e),n>=u&&(i.show({title:"End of search",message:"You have reached the end of the collection.",position:"topRight"}),d.classList.add("hidden"))}catch(r){i.error({title:"Error",message:`Something went wrong: ${r.message}`,position:"topRight"})}finally{c.classList.add("hidden")}}}
//# sourceMappingURL=index.js.map
