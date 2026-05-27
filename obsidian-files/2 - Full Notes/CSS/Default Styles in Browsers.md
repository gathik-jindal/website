22nd Jan '25, 15:42pm

Status: #ProperNotes #Completed

Tags: [[Web Dev]] [[CSS]]

# Default Styles in Browsers

### Introduction

Browsers apply a set of default styles to every webpage. You may not have thought about this directly, but you have undoubtedly encountered it.

### What are default styles and where do they come from?

As you have worked on projects, you likely observed default styles applied to certain elements, such as larger and bolder headings on `h1` elements, and blue, underlined links on `a` elements. There is also a good chance you struggled with things like default margins and padding. These styles are part of the user-agent stylesheets, ensuring basic styling for webpages without CSS. Each browser has its own set of user-agent stylesheets so the default styles do vary slightly between browsers.

### What if I don’t like the defaults?

With very few exceptions you can simply write your own CSS rules. The rules you write in your stylesheet have higher precedence than the user-agents rules, and therefore overwrite the defaults. However, there is another option.

To address inconsistencies across browsers and establish a consistent starting point for styling, some developers started using CSS resets. These resets are stylesheets containing CSS rules aimed at altering or removing the defaults set by user-agent stylesheets. Using them can help achieve consistency, and can provide a clean slate for developers to apply their styles without interference.

While CSS resets are still commonly used, they are not mandatory. Some developers opt not to use them, while others create their own or utilize prebuilt resets. It’s important to understand that resets are subjective and opinionated, reflecting the preferences of the developer who created them. You can decide how you wish to do things yourself.

# The CSS Reset

### 1. Box-sizing model

Pop quiz! Measuring by the visible pink border, how wide is the `.box` element in the following scenario, assuming no other CSS has been applied?

```html
<style>
  .parent {
    width: 200px;
  }
  .box {
    width: 100%;
    border: 2px solid hotpink;
    padding: 20px;
  }
</style>

<div class="parent">
  <div class="box"></div>
</div>
```

Our `.box` element has `width: 100%`. Because its parent is 200px wide, that 100% will resolve to 200px.

But _where does it apply that 200px width?_ By default, it will apply that size to the _content box_.

If you're not familiar, the “content box” is the rectangle in the box model that actually holds the content, inside the border and the padding:

![a pink box with a green box inside. Pink represents the border, green represents padding. Inside, a black rectangle is labeled “content-box”|500](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fcustom-css-reset%2Fcontent-box.png&w=1200&q=75)

The `width: 100%` declaration will set the `.box`'s content-box to 200px. The padding will add an extra 40px (20px on each side). The border adds a final 4px (2px on each side). When we do the math, the visible pink rectangle will be 244px wide.

When we try and cram a 244px box into a 200px-wide parent, it overflows.

This behavior is weird, right? Fortunately, we can change it, by setting the following rule:

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

With this rule applied, percentages will resolve based on the _border-box_. In the example above, our pink box would be 200px, and the inner content-box would shrink down to 156px (200px - 40px - 4px).

> [!Info]
> **Inheriting box-sizing**
>I've seen some recommendations online to do this instead:
>```html
>html {
  box-sizing: border-box;
}
>
*, *:before, *:after {
  box-sizing: inherit;
}
>```
>This can be a helpful strategy if you're trying to migrate a large pre-existing project to use border-box. It isn't necessary if you're starting a brand new project from scratch. To keep things simple, I've omitted it from my CSS reset.

### 2. Remove default margin

```css
* {
  margin: 0;
}
```

Browsers make common-sense assumptions around margin. For example, an `h1` will include more margin by default than a paragraph.

These assumptions are reasonable within the context of a word-processing document, but they might not be accurate for a modern web application.

Margin is a [tricky devil](https://www.joshwcomeau.com/css/rules-of-margin-collapse/), and more often than not, I find myself wishing elements didn't have any by default. So I've decided to remove it all. 🔥

If/when I do want to add some margin to specific tags, I can do so in my custom project styles. The wildcard selector (`*`) has extremely low specificity, so it'll be easy to override this rule.

# References
https://www.theodinproject.com/lessons/node-path-intermediate-html-and-css-default-styles