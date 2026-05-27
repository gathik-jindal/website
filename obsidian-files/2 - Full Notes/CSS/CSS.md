14th May '26, 09:26pm (Incorrect)

Status: #Completed #ProperNotes

Tags: [[GUI]] [[Web Dev]] [[Programming languages]]

## CSS Anatomy
The diagram below shows two different methods, or _syntaxes_, for writing CSS code. The first syntax shows CSS applied as a _ruleset_, while the second shows it written as an _inline style_. Two different methods of writing CSS may seem a bit intimidating at first, but it’s not as bad as it looks!
![[CSS_Anatomy.svg|700]]
Both methods contain common features in their [anatomy](https://www.codecademy.com/resources/docs/css/anatomy?page_req=catalog). Notice how both syntaxes contain a _declaration_. Declarations are the core of CSS. They apply a style to the selected element. Here, the [`<p>`](https://www.codecademy.com/resources/docs/html/paragraphs?page_req=catalog) element has been selected in both syntaxes and will be styled to display the text in blue.

There is another way to style in HTML called, internal style sheet, it works by using the `<style></style>` tags.

The best way to style in HTML is via an external `.css` file. This file will hold all the styles that are to be used. It is linked in the head of the HTML file, `<link>`, It is a self-closing tag and requires the following attributes:
1. `href` — like the anchor element, the value of this attribute must be the address, or path, to the CSS file.
2. `rel` — this attribute describes the relationship between the HTML file and the CSS file. Because you are linking to a stylesheet, the value should be set to `stylesheet`.

When linking an HTML file and a CSS file together, the `<link>` element will look like the following:

```html
<link href='https://www.codecademy.com/stylesheets/style.css' rel='stylesheet'>
```

## CSS Units

### Absolute units

Absolute units are those that are always the same in any context. `px` is an absolute unit because the size of a pixel doesn’t change relative to anything else on the page. In fact, `px` is the only absolute unit you should be using for web projects. The rest of them make more sense in a print setting because they are related to physical units such as `in` (inch) and `cm` (centimeter).

### Relative units

Relative units are units that can change based on their context. There are several of them that you are likely to encounter and want to use.

#### em and rem

`em` and `rem` both refer to a font size, though they are often used to define other sizes in CSS. You’ll see both of them often so we’re going to explain both, but as a rule-of-thumb, prefer `rem`.

Using a relative size like `rem` to define font sizes across your website _is_ recommended. Many browsers allow users to change the base font-size to increase readability. If at all possible, it is advisable to respect a user’s wishes regarding font size. You’ll learn more about this from the reading assignments.

#### Viewport units

The units `vh` and `vw` relate to the size of the viewport. Specifically, `1vh` is equal to `1%` of the viewport height and `1vw` is equal to `1%` of the viewport width. These can be useful any time you want something to be sized relative to the viewport, examples including full-height heroes, full-screen app-like interfaces.

## Custom Properties

Its easier to define properties using variables that can be mentioned multiple times in multiple places. This allows us to have consistent value across by just changing one value and also enables us to have themes in our website.

Custom properties are defined just like normal properties but by convention they start with a double hyphen. Their scope is all their child elements. Its preferable to define global variables in the `:root` class since all other classes are derived from this and this is the highest of them all.

To use these variables we just write `var(--variable-name)` in place of the value we want.



## Selectors
### Type
Remember that _declarations_ are a fundamental part of CSS because they apply a style to a selected element. But how do you decide which elements will get the style? With a _selector_.

A selector is used to target the specific HTML element(s) to be styled by the declaration. One selector you may already be familiar with is the _type_ selector. Just like its name suggests, the type selector matches the _type_ of the element in the HTML document.

In the previous lesson, you changed the color of a paragraph element.

```css
p {
	color: green;
}
```

This is an instance of using the type selector! The element type is `p`, which comes from the HTML `<p>` element.

Some important notes on the type selector:
- The type selector does not include the angle brackets.
- Since element types are often referred to by their opening tag name, the type selector is sometimes referred to as the _tag name_ or _element_ selector.

### Universal
You learned how the _type selector_ selects all elements of a given type. Well, the _universal selector_ selects all elements of _any_ type.

Targeting all of the elements on the page has a few specific use cases, such as resetting default browser styling or selecting all children of a parent element. Don’t worry if you don’t understand the use cases right now; we will get to them later on in our Learn CSS journey.

The universal selector uses the `*` character in the same place where you specified the type selector in a ruleset, like so:

```css
* {
	font-family: Verdana;
}
```

In the code above, every text element on the page will have its font changed to `Verdana`.

### Class
CSS is not limited to selecting elements by their type. As you know, HTML elements can also have attributes. When working with HTML and CSS a _class_ attribute is one of the most common ways to select an element.

For example, consider the following HTML:

```html
<p class='brand'>Sole Shoe Company</p>
```

The paragraph element in the example above has a `class` attribute within the opening tag of the`<p>` element. The `class` attribute is set to `'brand'`. To select this element using CSS, we can create a ruleset with a class selector of `.brand`.

```css
.brand {}
```

To select an HTML element by its class using CSS, a period (`.`) must be prepended to the class’s name. In the example above, the class is `brand`, so the CSS selector for it is `.brand`.

### Multiple Classes
We can use CSS to select an HTML element’s `class` attribute by name. And so far, we’ve selected elements using only one class name per element. If every HTML element had a single class, all the style information for each element would require a new class.

Luckily, it’s possible to add more than one class name to an HTML element’s `class` attribute.

For instance, perhaps there’s a heading element that needs to be green and bold. You could write two CSS rulesets like so:

```css
.green {
	color: green;
}

.bold {
	font-weight: bold;
}
```

Then, you could include both of these classes on one HTML element like this:

```html
<h1 class='green bold'> ... </h1>
```

We can add multiple classes to an HTML element’s `class` attribute by separating them with a space. This enables us to mix and match CSS classes to create many unique styles without writing a custom class for every style combination needed.

### ID
Oftentimes it’s important to select a single element with CSS to give it its own unique style. If an HTML element needs to be styled uniquely, we can give it an ID using the `id` attribute.

```html
<h1 id='large-title'> ... </h1>
```

In contrast to `class` which accepts multiple values, and can be used broadly throughout an HTML document, an element’s `id` can only have a single value, and only be used once per page.

To select an element’s ID with CSS, we prepend the `id` name with a number sign (`#`). For instance, if we wanted to select the HTML element in the example above, it would look like this:

```css
#large-title {}
```

The `id` name is `large-title`, therefore the CSS selector for it is `#large-title`.

### Attribute
You may remember that some HTML elements use attributes to add extra detail or functionality to the element. Some familiar attributes may be `href` and `src`, but there are [many more](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes)—including `class` and `id`!

The _attribute selector_ can be used to target HTML elements that already contain attributes. Elements of the same type can be targeted differently by their attribute or attribute value. This alleviates the need to add new code, like the `class` or `id` attributes.

Attributes can be selected similarly to types, classes, and IDs.

```css
[href] {
	color: magenta;
}
```

The most basic syntax is an attribute surrounded by square brackets. In the above example: `[href]` would target all elements with an `href` attribute and set the color to `magenta`.

And it can get [more granular](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors#syntax) from there by adding type and/or attribute values. One way is by using `type[attribute*=value]`. In short, this code selects an element where the attribute contains any instance of the specified value. Let’s take a look at an example.

```html
<img src='/images/seasons/cold/winter.jpg'><img src='/images/seasons/warm/summer.jpg'>
```

The HTML code above renders two `<img>` elements, each containing a `src` attribute with a value equaling a link to an image file.

```css
img[src*='winter'] {
	height: 50px;
}

img[src*='summer'] {
	height: 100px;
}
```

Now take a look at the above CSS code. The _attribute selector_ is used to target each image individually.

- The first ruleset looks for an `img` element with an attribute of `src` that contains the string `'winter'`, and sets the `height` to `50px`.
- The second ruleset looks for an `img` element with an attribute of `src` that contains the string `'summer'`, and sets the `height` to `100px`.

Notice how no new HTML markup (like a class or id) needed to be added, and we were still able to modify the styles of each image independently. This is one advantage to using the attribute selector!

### Pseudo-class
You may have observed how the appearance of certain elements can change, or be in a different state, after certain user interactions. For instance:

- When you click on an `<input>` element, and a blue border is added showing that it is in _focus_.
- When you click on a blue `<a>` link to _visit_ to another page, but when you return the link’s text is purple.
- When you’re filling out a form and the submit button is grayed out and _disabled_. But when all of the fields have been filled out, the button has color showing that it’s _active_.

These are all examples of pseudo-class selectors in action! In fact, `:focus`, `:visited`, `:disabled`, and `:active` are all pseudo-classes. Factors such as user interaction, site navigation, and position in the document tree can all give elements a different state with pseudo-class.

A pseudo-class can be attached to any selector. It is always written as a colon `:` followed by a name. For example `p:hover`.

```css
p:hover {
	background-color: lime;
}
```

In the above code, whenever the mouse hovers over a paragraph element, that paragraph will have a lime-colored background.

### Classes and IDs

CSS can select HTML elements by their type, class, and ID. CSS classes and IDs have different purposes, which can affect which one you use to style HTML elements.

CSS classes are meant to be reused over many elements. By writing CSS classes, you can style elements in a variety of ways by mixing classes. For instance, imagine a page with two headlines. One headline needs to be bold and blue, and the other needs to be bold and green. Instead of writing separate CSS rules for each headline that repeat each other’s code, it’s better to write a `.bold` CSS rule, a `.green` CSS rule, and a `.blue` CSS rule. Then you can give one headline the `bold green` classes, and the other the `bold blue` classes.

While classes are meant to be used many times, an ID is meant to style only one element. As you’ll learn in the next exercise, IDs override the styles of types and classes. Since IDs override these styles, they should be used sparingly and only on elements that need to always appear the same.

### Specificity

Specificity is the order by which the browser decides which CSS styles will be displayed. A best practice in CSS is to style elements while using the lowest degree of specificity so that if an element needs a new style, it is easy to override.

IDs are the most specific selector in CSS, followed by classes, and finally, type. For example, consider the following HTML and CSS:

```html
<h1 class='headline'>Breaking News</h1>
```

```css
h1 {
	color: red;
}

.headline {
	color: firebrick;
}
```

In the example code above, the color of the heading would be set to `firebrick`, as the class selector is more specific than the type selector. If an ID attribute (and selector) were added to the code above, the styles within the ID selector’s body would override all other styles for the heading.

Over time, as files grow with code, many elements may have IDs, which can make CSS difficult to edit since a new, more specific style must be created to change the style of an element.

To make styles easy to edit, it’s best to style with a type selector, if possible. If not, add a class selector. If that is not specific enough, then consider using an ID selector.

### Chaining

When writing CSS rules, it’s possible to require an HTML element to have two or more CSS selectors at the same time.

This is done by combining multiple selectors, which we will refer to as chaining. For instance, if there was a `special` class for `<h1>` elements, the CSS would look like below:

```css
h1.special {

}
```

The code above would select only the `<h1>` elements with a class of `special`. If a `<p>` element also had a class of `special`, the rule in the example would not style the paragraph.

### Descendant Combinator

In addition to chaining selectors to select elements, CSS also supports selecting elements that are nested within other HTML elements, also known as _descendants_. For instance, consider the following HTML:

```html
<ul class='main-list'>  <li> ... </li>  <li> ... </li>  <li> ... </li></ul>
```

The nested `<li>` elements are descendants of the `<ul>` element and can be selected with the _descendant combinator_ like so:

```css
.main-list li {

}
```

In the example above, `.main-list` selects the element with the`.main-list` class (the `<ul>` element). The descendant `<li>`‘s are selected by adding `li` to the selector, separated by a space. This results in `.main-list li` as the final selector.

### Chaining and Specificity

In the last exercise, instead of selecting all `<h5>` elements, you selected only the `<h5>` elements nested inside the `.description` elements. This CSS selector was more specific than writing only `h5`. Adding more than one tag, class, or ID to a CSS selector increases the specificity of the CSS selector.

For instance, consider the following CSS:

```css
p {
	color: blue;
}

.main p {
	color: red;
}
```

Both of these CSS rules define what a `<p>` element should look like. Since `.main p` has a class and a `p` type as its selector, only the `<p>` elements inside the `.main` element will appear `red`. This occurs despite there being another more general rule that states `<p>` elements should be `blue`.

### Multiple Selectors

In order to make CSS more concise, it’s possible to add CSS styles to multiple CSS selectors all at once. This prevents writing repetitive code.

For instance, the following code has repetitive style attributes:

```css
h1 {
	font-family: Georgia;
}

.menu {
	font-family: Georgia;
}
```

Instead of writing `font-family: Georgia` twice for two selectors, we can separate the selectors by a comma to apply the same style to both, like this:

```css
h1, .menu {
	font-family: Georgia;
}
```

By separating the CSS selectors with a comma, both the `<h1>` elements and the elements with the `menu` class will receive the `font-family: Georgia` styling.

## Visual Rules
### Font Size

Changing the typeface isn’t the only way to customize the text. Oftentimes, different sections of a web page are highlighted by modifying the _font size_.

To change the size of text on your web page, you can use the [`font-size`](https://www.codecademy.com/resources/docs/css/typography/font-size) property.

```css
p {
	font-size: 18px;
}
```

In the example above, the `font-size` of all paragraphs was set to `18px`. `px` means pixels, which is one way to measure font size.

### Font Weight

In CSS, the [`font-weight`](https://www.codecademy.com/resources/docs/css/typography/font-weight) property controls how bold or thin text appears.

```css
p {
	font-weight: bold;
}
```

In the example above, all paragraphs on the web page would appear bolded.

The `font-weight` property has another value: `normal`. Why does it exist?

If we wanted _all_ text on a web page to appear bolded, we could select all text elements and change their font weight to `bold`. If a certain section of text was required to appear normal, however, we could set the font weight of that particular element to `normal`, essentially shutting off bold for that element.

### Color and Background Color

Before discussing the specifics of color, it’s important to make two distinctions about color. Color can affect the following design aspects:

- Foreground color
- Background color

Foreground color is the color that an element appears in. For example, when a heading is styled to appear green, the _foreground color_ of the heading has been styled. Conversely, when a heading is styled so that its background appears yellow, the _background color_ of the heading has been styled.

In CSS, these two design aspects can be styled with the following two properties:

- [`color`](https://www.codecademy.com/resources/docs/css/colors/color): this property styles an element’s foreground color
- [`background-color`](https://www.codecademy.com/resources/docs/css/background/background-color): this property styles an element’s background color

```css
h1 {
	color: red;
	background-color: blue;
}
```

In the example above, the text of the heading will appear in red, and the background of the heading will appear blue.

### Opacity

Opacity is the measure of how transparent an element is. It’s measured from 0 to 1, with 1 representing 100%, or fully visible and opaque, and 0 representing 0%, or fully invisible.

Opacity can be used to make elements fade into others for a nice overlay effect. To adjust the [opacity](https://www.codecademy.com/resources/docs/css/colors/opacity) of an element, the syntax looks like this:

```css
.overlay {
	opacity: 0.5;
}
```

In the example above, the `.overlay` element would be 50% visible, letting whatever is positioned behind it show through.

### Background Image

CSS has the ability to change the background of an element. One option is to make the background of an element an image. This is done through the CSS property [`background-image`](https://www.codecademy.com/resources/docs/css/background/background-image). Its syntax looks like this:

```css
.main-banner {
	background-image: url('https://www.example.com/image.jpg');
}
```

1. The `background-image` property will set the element’s background to display an image.
2. The value provided to `background-image` is a `url`. The `url` should be a URL to an image. The `url` can be a file within your project, or it can be a link to an external site. To link to an image inside an existing project, you must provide a [relative file path](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Dealing_with_files). If there was an image folder in the project, with an image named `mountains.jpg`, the relative file path would look like below:

```css
.main-banner {
	background-image: url('images/mountains.jpg');
}
```

### Additional

- `height`
- `opacity`
- `border` in the format `width color style`
- `border-radius`: this takes in either percentage or `px`.
- `padding`: this can take all four (below) spaced.
- `padding-top`
- `padding-right`
- `padding-bottom`
- `padding-left`
- `margin`: same as padding syntaxally.
- `min-height`
- `min-width`
- `max-height`
- `max-width`
- `overflow`
- `overflow-x`
- `overflow-y`
- 

### Important

`!important` can be applied to specific declarations, instead of full rules. It will override _any_ style no matter how specific it is. As a result, it should almost never be used. Once `!important` is used, it is very hard to override.

The syntax of `!important` in CSS looks like this:

```css
p {
	color: blue !important;
}

.main p {
	color: red;
}
```

Since `!important` is used on the `p` selector’s [`color`](https://www.codecademy.com/resources/docs/css/colors/color) attribute, all `p` elements will appear `blue`, even though there is a more specific `.main p` selector that sets the `color` attribute to `red`.

One justification for using `!important` is when working with multiple stylesheets. For example, if we are using the [Bootstrap](https://getbootstrap.com/) CSS framework and want to override the styles for one specific HTML element, we can use the `!important` property.

## The Box Model
### Introduction to the Box Model

Browsers load HTML elements with default position values. This often leads to an unexpected and unwanted user experience while limiting the views you can create. In this lesson, you will learn about the _box model_, an important concept to understand how elements are positioned and displayed on a website.

If you have used HTML and CSS, you have unknowingly seen aspects of the [box model](https://www.codecademy.com/resources/docs/css/box-model). For example, if you have set the background color of an element, you may have noticed that the color was applied not only to the area directly behind the element but also to the area to the right of the element. Also, if you have aligned text, you know it is aligned relative to something. What is that something?

All elements on a web page are interpreted by the browser as “living” inside of a box. This is what is meant by the box model.

# Changing the Box Model
### Why Change the Box Model?

The box model has an awkward limitation regarding box dimensions. This limitation is best illustrated with an example.

```html
<h1>Hello World</h1>
```

```css
h1 {
	border: 1px solid black;
	height: 200px;
	width: 300px;
	padding: 10px;
}
```

In the example above, a heading element’s box has solid, black, 1 pixel thick borders. The height of the box is 200 pixels, while the width of the box is 300 pixels. A padding of 10 pixels has also been set on all four sides of the box’s content.

Unfortunately, under the current box model, the border thickness and the padding will affect the dimensions of the box.

The 10 pixels of padding increases the height of the box to 220 pixels and the width to 320 pixels. Next, the 1-pixel thick border increases the height to 222 pixels and the width to 322 pixels.

Under this box model, the border thickness and padding are added to the overall dimensions of the box. This makes it difficult to accurately size a box. Over time, this can also make all of a web page’s content difficult to position and manage.

### Box Model: Content-Box

Many properties in CSS have a default value and don’t have to be explicitly set in the stylesheet.

The same can be said about the box model that browsers assume. In CSS, the `box-sizing` property controls the type of box model the browser should use when interpreting a web page.

The default value of this property is `content-box`. This is the same box model that is affected by border thickness and padding.
![[htmlcssdiagram_contentbox.svg|750]]

### Box Model: Border-Box

Fortunately, we can reset the entire box model and specify a new one: `border-box`.

```css
* {  
	box-sizing: border-box;
}
```

The code in the example above resets the box model to `border-box` for all HTML elements. This new box model avoids the dimensional issues that exist in the former box model you learned about.

In this box model, the height and width of the box will remain fixed. The border thickness and padding will be included inside of the box, which means the overall dimensions of the box do not change.

```html
<h1>Hello World</h1>
```

```css
* {
	box-sizing: border-box;
}
h1 {
	border: 1px dashed #4f768e;
	height: 150px;
	width: 200px;
	padding: 20px;
}
```

In the example above, the height of the box would remain at 150 pixels and the width would remain at 200 pixels. The border thickness and padding would remain entirely _inside_ of the box.

![[htmlcss1-diagram__borderbox.svg|750]]

# Display and Positioning

### Position

Take a look at the _block-level_ elements in the image below:

![[htmlcssPosition-updated.webp|500]]

Block-level elements like these boxes create a _block_ the full width of their parent elements, and they prevent other elements from appearing in the same horizontal space.

Notice the block-level elements in the image above take up their own line of space and therefore don’t overlap each other. In the browser to the right, you can see block-level elements also consistently appear on the left side of the browser. This is the default _position_ for block-level elements.

The default position of an element can be changed by setting its `position` property. The `position` property can take one of five values:

- `static` - the default value (it does not need to be specified)
- `relative`
- `absolute`
- `fixed`
- `sticky`

### Position: Static

This is the default position of the element. Top, left, right, bottom do not affect the position of the element. Children of the element with display static that have display absolute ignore this parent for positioning.

### Position: Relative

One way to modify the default position of an element is by setting its `position`  property to `relative`.

This value allows you to position an element _relative_ to its default static position on the web page.

```css
.green-box {
	background-color: green;
	position: relative;
}
```

Although the code in the example above instructs the browser to expect a relative positioning of the `.green-box` element, it does not specify where the `.green-box` element should be positioned on the page. This is done by accompanying the `position` declaration with one or more of the following _offset properties_ that will move the element away from its default static position:

- `top` - moves the element down from the top.
- `bottom` - moves the element up from the bottom.
- `left` - moves the element away from the left side (to the right).
- `right` - moves the element away from the right side (to the left).

You can specify values in pixels, ems, or percentages, among others, to dial in exactly how far you need the element to move. It’s also important to note that offset properties will not work if the element’s `position` property is the default `static`.

```css
.green-box {
	background-color: green;
	position: relative;
	top: 50px;
	left: 120px;
}
```

In the example above, the element of `green-box` class will be moved down 50 pixels, and to the right 120 pixels, from its default static position. The image below displays the new position of the box.

![Diagram of an element with relative position|500](https://static-assets.codecademy.com/Courses/Learn-CSS/Display-Position/Relative.png)

Offsetting the relative element will not affect the positioning of other elements.

### Position: Absolute

When an element is set to static, it's top, left, right, bottom are all going to be measured with respect to the parent that has either relative, sticky, absolute or fixed display positioning. Or else child ignores the parent's positioning.

### Position: Fixed

When an element’s position is set to `absolute`, as in the last exercise, the element will scroll with the rest of the document when a user scrolls.

We can _fix_ an element to a specific position on the page (regardless of user scrolling) by setting its position to `fixed`, and accompanying it with the familiar offset properties `top`, `bottom`, `left`, and `right`.

```css
.title {
	position: fixed;
	top: 0px;
	left: 0px;
}
```

In the example above, the `.title` element will remain fixed to its position no matter where the user scrolls on the page, like in the image below:

![Diagram of position fixed|500](https://static-assets.codecademy.com/Courses/Learn-CSS/Display-Position/Fixed.gif)

This technique is often used for navigation bars on a web page.

### Z-Index

When boxes on a web page have a combination of different positions, the boxes (and therefore, their content) can overlap with each other, making the content difficult to read or consume.

```css
.blue-box {
	background-color: blue;
}

.green-box {
	background-color: green;
	position: relative;
	top: -170px;
	left: 170px;
}
```

In the example above, the `.green-box` element overlaps on top of the `.blue-box` element.

The `z-index` property controls how far back or how far forward an element should appear on the web page when elements overlap. This can be thought of as the _depth_ of elements, with deeper elements appearing behind shallower elements.

The `z-index` property accepts integer values. Depending on their values, the integers instruct the browser on the order in which elements should be layered on the web page.

```css
.blue-box {
	background-color: blue;
	position: relative;
	z-index: 1;
}

.green-box {
	background-color: green;
	position: relative;
	top: -170px;
	left: 170px;
}
```

In the example above, we set the `.blue-box` position to `relative` and the z-index to 1. We changed position to `relative`, because the `z-index` property does _not_ work on static elements. The z-index of `1` moves the `.blue-box` element forward, because the `z-index` value has not been explicitly specified for the `.green-box` element, which means it has a default `z-index` value of 0. Take a look at the example image below:

![Diagram of z-index|500](https://static-assets.codecademy.com/Courses/Learn-CSS/Display-Position/Z-index.png)

### Display: Inline-Block

The third value for the `display` property is `inline-block`. Inline-block display combines features of both inline and block elements. Inline-block elements can appear next to each other and we can specify their dimensions using the `width` and `height` properties. Images are the best example of default inline-block elements.

For example, the `<div>`s below will be displayed on the same line and with the specified dimensions:

![inline block example|500](https://static-assets.codecademy.com/Courses/Learn-CSS/Display-Position/display-inline-block.png)

Let’s take a look at the code:

```html
<div class="rectangle">
	<p>I’m a rectangle!</p>
</div>
<div class="rectangle">
	<p>So am I!</p>
</div>
<div class="rectangle">
	<p>Me three!</p>
</div>
```

```css
.rectangle {
	display: inline-block;
	width: 200px;
	height: 300px;
}
```

There are three rectangular divs that each contain a paragraph of text. The `.rectangle` `<div>`s will all appear inline (provided there is enough space from left to right) with a width of 200 pixels and height of 300 pixels, even though the text inside of them may not require 200 pixels by 300 pixels of space.

### Float

So far, you’ve learned how to specify the exact position of an element using offset properties. If you’re simply interested in moving an element as far left or as far right as possible in the container, you can use the [`float`](https://www.codecademy.com/resources/docs/css/display/float) property.

The `float` property is commonly used for wrapping text around an image. Note, however, that moving elements left or right for layout purposes is better suited for tools like CSS [grid](https://www.codecademy.com/resources/docs/css/grids/grid) and [flexbox](https://www.codecademy.com/resources/docs/css/flexbox), which you’ll learn about later on.

The `float` property is often set using one of the values below:

- [`left`](https://www.codecademy.com/resources/docs/css/position/left) - moves, or floats, elements as far left as possible.
- [`right`](https://www.codecademy.com/resources/docs/css/position/right) - moves elements as far right as possible.

```css
.green-section {
	width: 50%;
	height: 150px;
}

.orange-section {
	background-color: orange;
	width: 50%;
	float: right;
}
```

In the example above, we float the `.orange-section` element to the `right`. This works for static and relative positioned elements. See the result of the code below:

![Diagrm of an element floating on the right|750](https://static-assets.codecademy.com/Courses/Learn-CSS/Display-Position/Float.png)

Floated elements must have a [width](https://www.codecademy.com/resources/docs/css/sizing/width) specified, as in the example above. Otherwise, the element will assume the full width of its containing element, and changing the float value will not yield any visible results.

### Clear

The `float` property can also be used to float multiple elements at once. However, when multiple floated elements have different heights, it can affect their layout on the page. Specifically, elements can “bump” into each other and not allow other elements to properly move to the left or right.

The `clear` property specifies how elements should behave when they bump into each other on the page. It can take on one of the following values:

- `left`—the left side of the element will not touch any other element within the same containing element.
- `right`—the right side of the element will not touch any other element within the same containing element.
- `both`—neither side of the element will touch any other element within the same containing element.
- `none`—the element can touch either side.

```css
div {
	width: 200px;
	float: left;
}

div.special {
	clear: left;
}
```

In the example above, all `<div>`s on the page are floated to the left side. The element with class `special` did not move all the way to the left because a taller `<div>` blocked its positioning. By setting its `clear` property to `left`, the `special` `<div>` will be moved all the way to the left side of the page.

# Flex Box

While display and positioning has got a lot of features in css, its not enough. Designers wanted more flexibility and computing power to design their websites. 
So came the rise of flex-box, I won't go over the details, but I'll provide a website ([here](https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/)) that is very interactive and aesthetic I must say. Its a good inspiration as well as learning experience.

All the best learning!