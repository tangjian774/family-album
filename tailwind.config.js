/** @type {import('tailwindcss').Config} */
module.exports = {
  // 告诉 Tailwind 要扫描哪些文件生成样式
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}