import esbuild from 'esbuild'
import copyPluginPkg from '@sprout2000/esbuild-copy-plugin'

const { copyPlugin } = copyPluginPkg

const options = {
    entryPoints: ['./src/index.ts'],
    bundle: true,
    outdir: 'lib',
    minify: true,
    platform: 'node',
    plugins: [
        copyPlugin({
            src: './src/assets',
            dest: './lib/assets',
        }),
    ],
}

await esbuild.build(options)