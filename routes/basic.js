// express 的模板引擎有 ejs 和 jade 两种，它们的书写语法不同
// ejs 模板的标签：
// <% code %>   JavaScript代码
// <%= code %>  显示替换过的HTML特殊字符内容  解析文本
// <%- code %> 显示原始HTML内容，一般用于配置公共模板
//ajs公共模板的实现： 引入express-partials 实现定义  layout.ejs 