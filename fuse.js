const { FuseBox } = require("fuse-box");
const { tsc, task, context, src, watch } = require("fuse-box/sparky");


context({
  getConfig() {
    return FuseBox.init({
      homeDir: 'src',
      output: "dist/$name.js",
      target: "server",
      plugins: [],
    })
  }
})

task("clean", async () => {
  await src('./dist')
  .clean('dist/')
  .exec();
})

task("default", ["clean"], async context => {
  tsc('src', {
    target: "es5",
    module: "umd",
    charset: "utf8",
    declaration: true,
    inlineSourceMap: true,
    outDir: 'dist'
  });
});

task('test', async context => {
  fuse = context.getConfig();
  fuse
    .bundle("chroma-tests")
    .test("[**/**.test.ts]");
})