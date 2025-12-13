# 学术个人主页

一个现代化的学术个人主页模板，包含完整的个人信息展示功能。

## 功能特点

- 📸 圆形个人照片展示
- 👤 基本信息（姓名、学校、年级、专业）
- 🔗 社交媒体链接（邮箱、GitHub、Google Scholar、LinkedIn、Twitter）
- 🔬 研究基本情况介绍
- 📰 最新动态（News）
- 📄 研究项目与论文展示
- 🏆 获奖情况
- 👥 社会任职
- 🌐 **中英双语切换**（支持一键切换，自动保存语言偏好）

## 使用方法

### 语言切换功能

页面右上角有语言切换按钮，支持中文和英文一键切换：
- 点击"中文"按钮切换到中文界面
- 点击"English"按钮切换到英文界面
- 语言选择会自动保存到浏览器本地存储，下次访问时会自动应用

### 编辑双语内容

所有需要显示的内容都支持双语，使用 `data-zh` 和 `data-en` 属性：

1. **添加个人照片**
   - 将您的照片命名为 `profile.jpg` 并放在项目根目录
   - 照片会自动显示为圆形
   - 如果没有照片，会显示占位符

2. **编辑个人信息（双语）**
   - 打开 `index.html` 文件
   - 修改相应的 ID 元素，同时设置中英文内容：
     ```html
     <h1 id="name" data-zh="您的姓名" data-en="Your Name">您的姓名</h1>
     <span id="school" data-zh="学校名称" data-en="University Name">学校名称</span>
     <span id="grade" data-zh="年级" data-en="Grade/Year">年级</span>
     <span id="major" data-zh="专业" data-en="Major">专业</span>
     ```
   - 修改社交媒体链接的 `href` 属性

3. **编辑研究内容（双语）**
   ```html
   <p id="researchText" data-zh="中文研究内容..." data-en="English research content...">中文研究内容...</p>
   ```

4. **添加新闻动态（双语）**
   - 在 `id="newsList"` 的 `<ul>` 中添加新的 `<li class="news-item">` 元素
   - 格式：
     ```html
     <li class="news-item">
         <span class="news-date">2024-01-15</span>
         <span class="news-content" data-zh="中文新闻内容" data-en="English news content">中文新闻内容</span>
     </li>
     ```

5. **添加论文（双语）**
   - 在 `id="publicationsList"` 的 `<div>` 中添加新的 `<div class="publication-item">` 元素
   - 格式：
     ```html
     <div class="publication-item">
         <div class="publication-title" data-zh="中文标题" data-en="English Title">中文标题</div>
         <div class="publication-authors" data-zh="作者列表" data-en="Author List">作者列表</div>
         <div class="publication-venue" data-zh="会议/期刊, 年份" data-en="Conference/Journal, Year">会议/期刊, 年份</div>
         <div class="publication-links">
             <a href="#" class="pub-link"><i class="fas fa-file-pdf"></i> <span data-zh="PDF" data-en="PDF">PDF</span></a>
         </div>
     </div>
     ```

6. **添加获奖情况（双语）**
   ```html
   <li class="award-item">
       <i class="fas fa-medal"></i>
       <div class="award-content">
           <div class="award-title" data-zh="奖项名称" data-en="Award Name">奖项名称</div>
           <div class="award-date" data-zh="年份" data-en="Year">年份</div>
       </div>
   </li>
   ```

7. **添加社会任职（双语）**
   ```html
   <li class="service-item">
       <i class="fas fa-briefcase"></i>
       <div class="service-content">
           <div class="service-title" data-zh="职位名称" data-en="Position Title">职位名称</div>
           <div class="service-org" data-zh="组织名称" data-en="Organization Name">组织名称</div>
           <div class="service-period" data-zh="时间段" data-en="Period">时间段</div>
       </div>
   </li>
   ```

## 自定义样式

所有样式都在 `styles.css` 文件中，您可以根据需要修改：
- 颜色主题（`:root` 变量）
- 字体大小和间距
- 布局和响应式断点

## 浏览器支持

- Chrome（推荐）
- Firefox
- Safari
- Edge

## 技术栈

- HTML5
- CSS3（使用 Flexbox 和 Grid）
- JavaScript（原生，支持语言切换和本地存储）
- Font Awesome 图标库
- LocalStorage（保存用户语言偏好）

## 响应式设计

页面完全响应式，支持：
- 桌面端（> 768px）
- 平板端（768px）
- 移动端（< 480px）

## 许可证

MIT License

