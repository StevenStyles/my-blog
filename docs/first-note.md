# 我的第一篇学习笔记
这是我搭建VitePress博客的记录。

## 学习内容
1. 安装Node.js  
这个部分简单，直接官网下载node.js一路默认安装就可以了  
[https://nodejs.org/en/](https://nodejs.org/en/)
2. 跑通VitePress本地博客  
这个部分稍微复杂一点，出了很多报错，在此感谢豆包豆师傅的支持。  
## VitePress 模板博客（推荐，你的最终方案，写 Markdown）

> 
> 不用手写 HTML，你只写 Markdown 笔记，自动生成完整博客网站，界面就是技术文档风格，程序员博客首选。
> 需要安装 Node.js（LTS 版本），只需要一次安装。

### 步骤 1：安装 Node.js

官网下载 LTS 长期支持版，一路默认安装。
装好后打开 VS Code 终端，输入：

```
node -v
npm -v
```

输出版本号，代表成功。  
  
<span style="background-color:#fff2cc;">这个部分就出问题了，两条报错都有出现，解决方案并不相同：  </span>
```
node : 无法将“node”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正确，然后再试一次。
所在位置 行:1 字符: 1
+ node -v
+ ~~~~
    + CategoryInfo          : ObjectNotFound: (node:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
 
npm : 无法将“npm”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正确，然后再试一次。
所在位置 行:2 字符: 1
+ npm -v
+ ~~~
    + CategoryInfo          : ObjectNotFound: (npm:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
```  
<span style="background-color:#fff2cc;">第一部分“node -v”，在安装完node.js之后需要重启vs成功排除问题。  
第二部分“npm -v”，是由于权限问题，系统禁止运行脚本，所以报错，故需要用管理员身份进入系统的powershell，去进行命令配置，代码如下：  
先输入Set-ExecutionPolicy RemoteSigned，点击Y。再使用Set-ExecutionPolicy RemoteSigned -Scope CurrentUser，依旧Y。排除报错，此时的双版本输出就都正常了  </span>


### 步骤 2：一键初始化 VitePress 项目（官方向导，自带完整模板）

```
# 新建博客文件夹，进入目录
mkdir my-blog
cd my-blog
# 官方初始化向导，自动生成全套博客模板
npx vitepress init
```

向导会问你几个问题，简单填：

- Where should VitePress initialize the config? `./docs`
- Site title：`我的技术博客`
- Site description：`个人学习笔记`
- Theme：Default Theme
- TS 配置选 No（初学不用 TS）

### 步骤 3：安装依赖，启动本地博客

```
npm install
npm run docs:dev
```
<span style="background-color:orange">此处也有报错：</span>  
```
PS D:\vscode\my-blog>  npm run docs:dev

> 
> docs:dev
> vitepress dev
> 'vitepress' 不是内部或外部命令，也不是可运行的程序
> 或批处理文件。
```
<span style="background-color:orange">此处是有坑啊，前面的npx vitepress init并没有自动安装vitepress，所以手动安装。在PS D:\vscode\my-blog>下执行npm install -D vitepress。此后告警消除。  </span>

终端会输出地址：`http://localhost:5173`，浏览器打开。
现在你已经有一个完整博客模板了！自带首页、侧边菜单、搜索、代码高亮。<span style="background-color:orange">（到了这里确实已经成功了）</span>

### 写文章

进入 `docs` 文件夹，新建 `.md` 文件，就是你的博客文章，markdown 语法，写完保存页面实时更新。  

<span style="background-color:orange">这里有问题，但我不知道是怎么导致的，根本没有docs文件夹啊就。为了解决这个问题呢，就自己先新建了一个docs文件夹，然后去cofig里面去改配置了。先建docs文件夹，然后把所有的md文件都移到里面去，然后修改package.json脚本：</span>
```
"scripts": {
  "docs:dev": "vitepress dev docs",
  "docs:build": "vitepress build docs"
}
```
<span style="background-color:orange">然后重启npm run docs:dev此时就已经成功标准化了。  
这个时候启动主页的话看不见我们的笔记，但这其实很正常，因为我们的笔记并不是index而是first-note这个文件呢。有一段对config.mjs的修改，但我不确定到底改了啥，总之先贴上来好了：</span>
```
export default {
  title: "my personal blog",
  description: "learning note",

  // 顶部导航栏
  nav: [
    { text: "首页", link: "/" },
    { text: "我的第一篇笔记", link: "/first-note" }
  ],

  // 左侧侧边栏
  sidebar: [
    {
      text: "学习笔记",
      items: [
        { text: "第一篇笔记", link: "/first-note" }
      ]
    }
  ]
}
```
:::warning
豆师傅说：
- 页面**顶部导航栏会出现【第一篇笔记】**，左侧侧边栏也会出现。
- 点击导航栏的「第一篇笔记」，就能打开你的 `first‑note.md`。  
实则根本没效果。这个我再看看吧。但是通过直接打开[第一篇笔记](/first-note)是达成了查看笔记的效果的。  
:::
<span style="background-color:orange">更新一下，这个部分我处理好了。  
没有顶部栏和侧边栏的原因是因为config.mjs的文件一直在外面，照理来说应该是在docs里面的vitepress里面的，所以在外面的话vitepress一直没有识别到这个脚本，所以不行啊，后续感觉还有很多需要优化的地方，慢慢加油吧</span>  
后面就是一些优化，放到打包之后再详细说说。
### 打包（后面部署服务器要用，本地阶段先了解）

```
npm run docs:build
```

生成 `docs/.vitepress/dist`，这就是完整静态网站文件。

> 
> VS Code 配套插件：Markdown All in One，写 md 很方便。


```javascript
// 示例代码块，博客会自动高亮
console.log("hello blog");  
  
```

小tips：  
1.终端被占用的时候用ctrl+c可以跳出  
2.md文件默认样式下想换行可以使用`<br>`或者两个空格之后再回车  
3.想显示`<br>`的话，就给内容加反引号，反引号是esc下面这个```