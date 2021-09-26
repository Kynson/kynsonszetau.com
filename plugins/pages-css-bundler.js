const { createReadStream, createWriteStream } = require('fs');
const { unlink } = require('fs/promises');
const { pipeline } = require('stream');
const { join: joinPath } = require('path');

const { promisify } = require('util');

const MultiStream = require('multistream');
const { sync: globSync } = require('glob');

const pipelinePromise = promisify(pipeline);

/**
 * @typedef { { ignores: string[], target: string } } pagesCssBundlerOptions
 */

/**
 * Optimize css files in /pages by bundling to main.css
 * @param { import('snowpack').PluginOptimizeOptions }
 * @param { pagesCssBundlerOptions }
 */
async function bundleCss(
    { buildDirectory },
    { ignores, target }
  ) {
    if (!target) {
      console.warn('[pages-css-bundler] Target is not supplied for pages-css-bundler, skipping this plugin');
      return;
    }

    let pathToPages = joinPath(buildDirectory, 'pages');
    // Resolve all ignored files (root is the /pages folder)
    let ignoresAbsolutePath = ignores
      ?.map((ignoredPath) => {
        return joinPath(pathToPages, ignoredPath);
      });

    // Get all css files
    let cssFilePaths = globSync(`${pathToPages}/**/*.css`)
      .filter((filePath) => {
        return !ignoresAbsolutePath?.includes(filePath);
      });
    
    let cssFileReadStreams = new MultiStream(
        cssFilePaths
          .map((path) => {
            return createReadStream(path)
          })
      );
    // Create a write stream in append mode
    let targetWriteStream = createWriteStream(
      joinPath(buildDirectory, target),
      {
        flags: 'a'
      }
    );
    
    try {
      await pipelinePromise(cssFileReadStreams, targetWriteStream);
    } catch (error) {
      console.warn(`[pages-css-bundler] Error while bundling: ${error}`);
      return;
    }

    // Clean all bundled files
    for (const path of cssFilePaths) {
      try {
        await unlink(path);
      } catch (error) {
        console.warn(`[pages-css-bundler] Error while cleaning file ${path}: ${error}`);
        break;
      }
    }
}


/**
 * 
 * @param { import('snowpack').SnowpackConfig } _snowpackConfig 
 * @param { pagesCssBundlerOptions } pluginOptions 
 * @returns 
 */
function pagesCssBundler(_snowpackConfig, pluginOptions) {
  /** @type { import('snowpack').SnowpackPlugin } */
  const pluginDefination = {
    name: 'pages-css-bundler',
    async optimize(pluginOptimizeOptions) {
      await bundleCss(pluginOptimizeOptions, pluginOptions)
    }
  }

  return pluginDefination;
}

module.exports = pagesCssBundler;