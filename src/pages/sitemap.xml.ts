import { getCollection } from 'astro:content';
export async function GET({ site }: { site: URL }){
 const base=(site||new URL('https://example.com')).toString().replace(/\/$/,'');
 const [r,l,a,t]=await Promise.all([getCollection('resources'),getCollection('library'),getCollection('articles'),getCollection('topics')]);
 const paths=['/','/resources','/library','/articles','/tools','/about','/search',...r.map(x=>`/resources/${x.id}`),...l.map(x=>`/library/${x.id}`),...a.map(x=>`/articles/${x.id}`),...t.map(x=>`/topics/${x.id}`)];
 const body=`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(p=>`<url><loc>${base}${p}</loc></url>`).join('')}</urlset>`;
 return new Response(body,{headers:{'Content-Type':'application/xml'}});
}
