import{W as j,r as f,j as e,Y as E,a as b,B as d,y as v}from"./app-BoZTgQsX.js";import{P as C}from"./Page--3rH9CWd.js";import{W as _}from"./Webmaster-Bv87JR7w.js";import{G as m,C as q}from"./CustomTextarea-DEG0QHIv.js";import{C as n}from"./CustomTextInput-Z86LNiYJ.js";import{C as w}from"./CustomSelect-DoeCfrj0.js";import{h as y}from"./button-B2sf8A_v.js";import"./createLucideIcon-D7_ziMnv.js";import"./facebook-KEMOOEa1.js";import"./save-DI95csvW.js";import"./transition-DzzVVFzt.js";import"./render-CcWegbys.js";import"./disabled-CPkVuo-X.js";const I=({auth:l,groups:p,account:t,menu:h})=>{const r=j({name:t.name,description:t.description||"",accounts_group_id:t.accounts_group.id||0,username:t.username||"",password:t.password||""}),[o,c]=f.useState(!1),s=a=>{const{name:i,value:g}=a.target;r.setData(i,g),console.log(r.data)},x=async a=>{a.preventDefault(),c(!0),r.post(route("accounts.update",{account:t.id}),{headers:{"Content-Type":"multipart/form-data"},onSuccess:()=>{d.success("Account has been edited successfully"),v.get(route("accounts.index"))},onError:i=>{d.error("Error editing the account"),console.error("Error:",i)},onFinish:()=>{c(!1)}})},u=e.jsx(y,{className:"btn btn-primary mt-4",disabled:o,onClick:x,children:o?"Editing":"Edit"});return e.jsxs(e.Fragment,{children:[e.jsx(E,{title:"Edit a account"}),e.jsx(_,{user:l.user,menu:h,breadcrumb:e.jsxs(e.Fragment,{children:[e.jsx("li",{className:"breadcrumb-item","aria-current":"page",children:e.jsx(b,{href:route("accounts.index"),children:"Accounts"})}),e.jsx("li",{className:"breadcrumb-item","aria-current":"page",children:t.accounts_group.name}),e.jsx("li",{className:"breadcrumb-item","aria-current":"page",children:t.name}),e.jsx("li",{className:"breadcrumb-item active","aria-current":"page",children:"Edit"})]}),children:e.jsxs(C,{title:"Edit a account",header:e.jsx(e.Fragment,{}),children:[e.jsxs(m,{title:"Account's information",header:u,children:[e.jsx(n,{title:"Name",value:r.data.name,name:"name",description:"Enter the name of the account",required:!0,handleChange:s,instructions:"Minimum 5 caracters"}),e.jsx(q,{title:"Description",value:r.data.description,name:"description",description:"Enter the description of the account",required:!1,handleChange:s,instructions:"Not required"}),e.jsx(w,{title:"Accounts group",elements:p,value:r.data.accounts_group_id,name:"accounts_group_id",description:"Enter the group you want to assing the account to",required:!0,handleChange:s,instructions:"Required"})]}),e.jsxs(m,{title:"Account credentials",children:[e.jsx(n,{title:"Username",value:r.data.username,name:"username",description:"Enter the username of the account",required:!0,handleChange:s,instructions:"Minimum 5 caracters"}),e.jsx(n,{title:"Password",value:r.data.password,name:"password",description:"Enter the password of the account",required:!0,handleChange:s,instructions:"Minimum 5 caracters"}),u]})]})})]})};export{I as default};