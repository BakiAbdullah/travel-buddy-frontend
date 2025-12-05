// next-env.d.ts or global.d.ts
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
