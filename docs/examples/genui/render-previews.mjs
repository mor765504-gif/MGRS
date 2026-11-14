// 为 MGRS 文档中的 mimi-ui/1 示例生成静态 SVG 图例。
// 只针对这里的展示示例；不是 Mimi 的运行时渲染器或权限实现。
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.dirname(fileURLToPath(import.meta.url));
const examples = JSON.parse(fs.readFileSync(path.join(root, "examples.json"), "utf8"));
function renderPreview(ex) {
  const escape=(s)=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");
  const root={name:"root",a:{},children:[]},stack=[root];
  for(const tok of ex.markup.match(/<[^>]+>|[^<]+/g)||[]){
    if(tok.startsWith("</")){if(stack.length>1)stack.pop();continue}
    if(tok.startsWith("<")){
      const m=tok.match(/^<([A-Za-z][A-Za-z0-9]*)\b([\s\S]*?)\/?>$/);if(!m)throw Error("Bad tag "+tok);
      const a={};for(const p of m[2].matchAll(/([A-Za-z_]+)="([^"]*)"/g))a[p[1]]=p[2];
      if(/\bdone\b/.test(m[2])&&!Object.hasOwn(a,"done"))a.done="true";
      if(/\bhl\b/.test(m[2])&&!Object.hasOwn(a,"hl"))a.hl="true";
      const node={name:m[1],a,children:[]};stack[stack.length-1].children.push(node);
      if(!tok.endsWith("/>"))stack.push(node);
    }else if(tok.trim())stack[stack.length-1].children.push({name:"#text",value:tok.trim()});
  }
  if(stack.length!==1)throw Error("Unbalanced native markup: "+ex.id);
  const card=root.children.find(n=>n.name==="Card");if(!card)throw Error("Missing Card");
  const allowed=new Set(["Card","Row","Stat","Text","Table","Tr","Checklist","Item","Choice","Slider","Actions","Button","Bars","Bar","If","App","#text"]);
  function verify(node){if(!allowed.has(node.name))throw Error("Unsupported native tag "+node.name);for(const c of node.children||[])verify(c)}
  verify(root.children[0]);
  function value(node){return (node.children||[]).filter(n=>n.name==="#text").map(x=>x.value).join(" ").trim()}
  function fit(t,max=31){let s=String(t);return [...s].length>max?[...s].slice(0,max-1).join("")+"…":s;}
  const shapes=[];const add=s=>shapes.push(s);
  const text=(x,y,s,size=16,fill="#26334c",weight=400,anchor="start")=>add(`<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" font-family="system-ui,'PingFang SC','Noto Sans CJK SC',sans-serif">${escape(s)}</text>`);
  const rect=(x,y,w,h,color="#ffffff",stroke="none",rad=12)=>add(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rad}" fill="${color}" stroke="${stroke}"/>`);
  const line=(x,y,x2,y2)=>add(`<path d="M${x} ${y} L${x2} ${y2}" stroke="#e2e8f0" stroke-width="1"/>`);
  let y=166;const left=95,right=805,width=710;
  text(left,108,card.a.title||ex.title,27,"#17253d",650);text(left,134,card.a.sub||ex.subtitle,14,"#64748b");
  for(const node of card.children){
    if(node.name==="Row"){
      const stats=node.children.filter(x=>x.name==="Stat"); const gap=14,slot=(width-gap*(stats.length-1))/stats.length;
      for(const [i,s] of stats.entries()){
        let x=left+i*(slot+gap);rect(x,y,slot,82,"#f3f6fb","none",12);
        text(x+16,y+28,s.a.label||"",14,"#64748b",500);
        const fill=s.a.tone==="ok"?"#0b8064":s.a.tone==="warn"?"#b9791b":"#213457";
        text(x+16,y+61,s.a.value||"",25,fill,700);
      }y+=102;
    }else if(node.name==="Table"){
      const cols=String(node.a.cols||"").split("|"),rows=node.children.filter(x=>x.name==="Tr").map(x=>value(x).split("|"));
      const headerH=44,rowH=60,tableH=headerH+rows.length*rowH;
      rect(left,y,width,tableH,"#ffffff","#dbe3ef",11);rect(left+1,y+1,width-2,headerH-1,"#edf2fa","none",10);
      const colW=width/cols.length;
      cols.forEach((v,j)=>{text(left+14+j*colW,y+28,fit(v,13),14,"#3b5070",700);if(j)line(left+j*colW,y,left+j*colW,y+tableH)});
      rows.forEach((row,i)=>{const yy=y+headerH+i*rowH;line(left,yy,left+width,yy);row.forEach((v,j)=>{
        const clip=cols.length>2?13:24;let color=(v.includes("待确认")||v.includes("未找到")||v.includes("未执行"))?"#a4681e":"#26334c";
        text(left+14+j*colW,yy+36,fit(v,clip),15,color,400)
      })});
      y+=tableH+23;
    }else if(node.name==="Checklist"){
      const items=node.children.filter(x=>x.name==="Item");text(left,y+17,"核对清单",15,"#465d7b",650);y+=33;
      for(const item of items){
        const done=item.a.done==="true",tone=done?"#12916d":"#f8fafc";
        rect(left,y,22,22,done?"#e1f4ed":"#ffffff",done?"#12916d":"#becbd8",7);
        if(done)text(left+11,y+16,"✓",15,"#128869",750,"middle");
        text(left+36,y+17,value(item),16,"#28374c",500);
        if(item.a.sub){text(left+36,y+40,fit(item.a.sub,40),13,"#8190a5");y+=57}else y+=40;
      }
      y+=10;
    }else if(node.name==="Choice"){
      text(left,y+18,node.a.label||"选择",15,"#465d7b",650);y+=29;
      let x=left;for(const option of String(node.a.options||"").split("|")){
        const w=Math.max(100,[...option].length*17+26);
        const selected=option===node.a.value;
        rect(x,y,w,39,selected?"#eaf1ff":"#f4f6fa",selected?"#527ad1":"#dde5ef",10);
        text(x+w/2,y+25,option,14,selected?"#2f58a4":"#51617c",selected?650:450,"middle");
        x+=w+12;
      }
      y+=61;
    }else if(node.name==="Text"){
      const body=value(node);const chars=[...body],chunk=50;
      for(let i=0;i<chars.length;i+=chunk){text(left,y+18,chars.slice(i,i+chunk).join(""),14,node.a.muted==="true"?"#77869c":"#31435d");y+=24}
      y+=11;
    }else if(node.name==="Actions"){
      let x=left;
      for(const b of node.children.filter(x=>x.name==="Button")){
        const label=value(b)||"操作", bw=Math.max(150,[...label].length*18+30);
        rect(x,y,bw,44,b.a.turn?"#345bba":"#eef3fb",b.a.turn?"none":"#cedaf0",11);
        text(x+bw/2,y+28,label,15,b.a.turn?"#ffffff":"#365a9d",650,"middle");
        x+=bw+14;
      }
      y+=62;
    }else if(node.name==="Slider"){
      text(left,y+16,node.a.label||"调整",15,"#465d7b",650);y+=35;
      rect(left,y+15,width,6,"#e2e9f3","none",3);
      let min=+node.a.min||0,max=+node.a.max||10,v=+node.a.value||0;let px=left+Math.max(0,Math.min(1,(v-min)/(max-min||1)))*width;
      rect(left,y+15,px-left,6,"#466fcb","none",3);
      add(`<circle cx="${px}" cy="${y+18}" r="11" fill="#ffffff" stroke="#466fcb" stroke-width="3"/>`);
      y+=52;
    }
  }
  const height=Math.max(430,y+65); 
  return `<svg xmlns="http://www.w3.org/2000/svg" width="920" height="${height}" viewBox="0 0 920 ${height}" role="img" aria-label="${escape(ex.title)}：mimi-ui/1 代码示意预览"><rect width="920" height="${height}" fill="#f5f7fb"/><rect x="55" y="25" width="810" height="${height-50}" rx="20" fill="#ffffff" stroke="#e4eaf3"/><circle cx="92" cy="57" r="5" fill="#c9d3e5"/><circle cx="112" cy="57" r="5" fill="#c9d3e5"/><circle cx="132" cy="57" r="5" fill="#c9d3e5"/><text x="805" y="63" text-anchor="end" font-size="12" fill="#8694aa" font-family="system-ui,sans-serif">mimi-ui/1 · static example</text>${shapes.join("")}<text x="95" y="${height-38}" font-size="12" fill="#95a3b8" font-family="system-ui,'PingFang SC',sans-serif">由示例组件代码生成的静态示意图 · 并非真实业务回执或产品运行截图</text></svg>\n`;
}
for (const item of examples) {
  fs.writeFileSync(path.join(root, item.id + ".svg"), renderPreview(item), "utf8");
}
console.log("Generated "+examples.length+" static examples.");
