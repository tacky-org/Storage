function o(n=null){let r=n;const t=new Set;return{getItem(){return r},setItem(e){r=e,t.forEach(u=>u())},subscribe(e){return t.add(e),()=>t.delete(e)}}}export{o as f};
