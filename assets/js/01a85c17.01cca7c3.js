"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[13],{9785:(e,s,t)=>{t.d(s,{Z:()=>v});var a=t(959),i=t(5924),r=t(9763),l=t(5917),n=t(7964),c=t(5656),m=t(8903),o=t(6003);function d(e){const{pathname:s}=(0,m.TH)();return(0,a.useMemo)((()=>e.filter((e=>function(e,s){return!(e.unlisted&&!(0,o.Mg)(e.permalink,s))}(e,s)))),[e,s])}const b={sidebar:"sidebar_JQYR",sidebarItemTitle:"sidebarItemTitle_FhCn",sidebarItemList:"sidebarItemList_Biy7",sidebarItem:"sidebarItem_mt4L",sidebarItemLink:"sidebarItemLink_urMx",sidebarItemLinkActive:"sidebarItemLinkActive_Nvrs"};var h=t(1527);function u(e){let{sidebar:s}=e;const t=d(s.items);return(0,h.jsx)("aside",{className:"col col--3",children:(0,h.jsxs)("nav",{className:(0,i.Z)(b.sidebar,"thin-scrollbar"),"aria-label":(0,c.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"}),children:[(0,h.jsx)("div",{className:(0,i.Z)(b.sidebarItemTitle,"margin-bottom--md"),children:s.title}),(0,h.jsx)("ul",{className:(0,i.Z)(b.sidebarItemList,"clean-list"),children:t.map((e=>(0,h.jsx)("li",{className:b.sidebarItem,children:(0,h.jsx)(n.Z,{isNavLink:!0,to:e.permalink,className:b.sidebarItemLink,activeClassName:b.sidebarItemLinkActive,children:e.title})},e.permalink)))})]})})}var g=t(8223);function p(e){let{sidebar:s}=e;const t=d(s.items);return(0,h.jsx)("ul",{className:"menu__list",children:t.map((e=>(0,h.jsx)("li",{className:"menu__list-item",children:(0,h.jsx)(n.Z,{isNavLink:!0,to:e.permalink,className:"menu__link",activeClassName:"menu__link--active",children:e.title})},e.permalink)))})}function j(e){return(0,h.jsx)(g.Zo,{component:p,props:e})}function x(e){let{sidebar:s}=e;const t=(0,l.i)();return s?.items.length?"mobile"===t?(0,h.jsx)(j,{sidebar:s}):(0,h.jsx)(u,{sidebar:s}):null}function v(e){const{sidebar:s,toc:t,children:a,...l}=e,n=s&&s.items.length>0;return(0,h.jsx)(r.Z,{...l,children:(0,h.jsx)("div",{className:"container margin-vert--lg",children:(0,h.jsxs)("div",{className:"row",children:[(0,h.jsx)(x,{sidebar:s}),(0,h.jsx)("main",{className:(0,i.Z)("col",{"col--7":n,"col--9 col--offset-1":!n}),itemScope:!0,itemType:"https://schema.org/Blog",children:a}),t&&(0,h.jsx)("div",{className:"col col--2",children:t})]})})})}},3361:(e,s,t)=>{t.r(s),t.d(s,{default:()=>p});t(959);var a=t(5924),i=t(5656);const r=()=>(0,i.I)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"});var l=t(8024),n=t(7641),c=t(9785),m=t(1175),o=t(2116);const d={tag:"tag_QI8g"};var b=t(1527);function h(e){let{letterEntry:s}=e;return(0,b.jsxs)("article",{children:[(0,b.jsx)(o.Z,{as:"h2",id:s.letter,children:s.letter}),(0,b.jsx)("ul",{className:"padding--none",children:s.tags.map((e=>(0,b.jsx)("li",{className:d.tag,children:(0,b.jsx)(m.Z,{...e})},e.permalink)))}),(0,b.jsx)("hr",{})]})}function u(e){let{tags:s}=e;const t=function(e){const s={};return Object.values(e).forEach((e=>{const t=function(e){return e[0].toUpperCase()}(e.label);s[t]??=[],s[t].push(e)})),Object.entries(s).sort(((e,s)=>{let[t]=e,[a]=s;return t.localeCompare(a)})).map((e=>{let[s,t]=e;return{letter:s,tags:t.sort(((e,s)=>e.label.localeCompare(s.label)))}}))}(s);return(0,b.jsx)("section",{className:"margin-vert--lg",children:t.map((e=>(0,b.jsx)(h,{letterEntry:e},e.letter)))})}var g=t(6821);function p(e){let{tags:s,sidebar:t}=e;const i=r();return(0,b.jsxs)(l.FG,{className:(0,a.Z)(n.k.wrapper.blogPages,n.k.page.blogTagsListPage),children:[(0,b.jsx)(l.d,{title:i}),(0,b.jsx)(g.Z,{tag:"blog_tags_list"}),(0,b.jsxs)(c.Z,{sidebar:t,children:[(0,b.jsx)(o.Z,{as:"h1",children:i}),(0,b.jsx)(u,{tags:s})]})]})}}}]);