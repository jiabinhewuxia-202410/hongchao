import { getCollection } from 'astro:content';
export async function GET(){
  const r=await getCollection('resources'),l=await getCollection('library'),a=await getCollection('articles'),t=await getCollection('topics');
  const items=[
    ...r.map(x=>({type:'资源',title:x.data.title,summary:x.data.summary,tags:x.data.tags,href:`/resources/${x.id}`})),
    ...l.map(x=>({type:'资料',title:x.data.title,summary:x.data.summary,tags:x.data.tags,href:`/library/${x.id}`})),
    ...a.map(x=>({type:'文章',title:x.data.title,summary:x.data.summary,tags:x.data.tags,href:`/articles/${x.id}`})),
    ...t.map(x=>({type:'专题',title:x.data.title,summary:x.data.summary,tags:[],href:`/topics/${x.id}`})),
  ];
  return new Response(JSON.stringify(items),{headers:{'Content-Type':'application/json; charset=utf-8'}});
}
