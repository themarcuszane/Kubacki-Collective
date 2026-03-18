const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)$/,
  options: {
    // You can add remark/rehype plugins later if you want.
  },
});

const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    unoptimized: true,
  },
};

module.exports = withMDX(nextConfig);
