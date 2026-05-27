21st Dec '24, 17:42pm

Status: #Completed #ProperNotes 

Tags: [[Programming languages]] [[JavaScript]] [[Web Dev]]

# Event listeners in Javascript

## Introduction to JavaScript Events

An event is an action that the web browser can detect and respond to, like a mouse click or a page load.

For example, you might want to display an alert when a user clicks a button.

An event may have an event handler, a function that runs when the event occurs. An event handler, also known as an event listener, listens for the event and
executes when it happens.

This is very useful since we might want to run something  depending on events, like when a user clicks on a button we use the `click` event or the `mousedown`
event.

## Event flow

Assuming that you have the following HTML document:

```html
<!DOCTYPE html>
<html>
<head>
	<title>JS Event Demo</title>
</head>

<body>
	<div id="container">
		<button id='btn'>Click Me!</button>
	</div>
</body>
```

When you click the button, the click event occurs not only on the button but also on the button’s container, the `div`, and the whole webpage.

Event flow explains the order in which events are received on the page from the element where the event occurs and propagated through the DOM tree.

There are two main event models:

- Event bubbling
- Event capturing
### Event bubbling

In the event bubbling model, an event starts at the most specific element and then flows upward toward the least specific element (the `document` or even [window](https://www.javascripttutorial.net/javascript-bom/javascript-window/)).

When you click the button, the `click` event occurs in the following order:

1. button
2. div with the id container
3. body
4. html
5. document

The `click` event first occurs on the button which is the element that was clicked. Then the `click` event goes up the DOM tree, firing on each node along its way until it reaches the `document` object.

The following picture illustrates the event bubbling effect when users click the button:

[![JavaScript event bubbling](https://www.javascripttutorial.net/wp-content/uploads/2020/02/JavaScript-event-bubbling.png)](https://www.javascripttutorial.net/wp-content/uploads/2020/02/JavaScript-event-bubbling.png)

Note that modern web browsers bubble the event up to the `window` object.

### Event capturing

In the event-capturing model, an event starts at the least specific element and flows downward toward the most specific element.

When you click the button, the `click` event occurs in the following order:

1. document
2. html
3. body
4. div with the id container
5. button

The following picture illustrates the event-capturing effect:

[![JavaScript event capturing](https://www.javascripttutorial.net/wp-content/uploads/2020/02/JavaScript-event-capturing.png)](https://www.javascripttutorial.net/wp-content/uploads/2020/02/JavaScript-event-capturing.png)

### DOM Level 2 Event flow

DOM level 2 events specify that event flow has three phases:

- First, event capturing occurs, which provides the opportunity to intercept the event.
- Then, the actual target receives the event.
- Finally, event bubbling occurs, which allows a final response to the event.

The following picture illustrates the DOM Level 2 event model when users click the button:

[![JavaScript DOM Level 2 Event](https://www.javascripttutorial.net/wp-content/uploads/2020/02/JavaScript-DOM-Level-2-Event.png)](https://www.javascripttutorial.net/wp-content/uploads/2020/02/JavaScript-DOM-Level-2-Event.png)

## Event object

When the event occurs, the web browser passes an `Event` object to the event handler:

```js
let btn = document.querySelector('#btn');
btn.addEventListener('click', function(event) {
	console.log(event.type);
});
```

Output:

`'click'`

The following table shows the most commonly used properties and methods of the `event` object:

| Property / Method | Description                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| bubbles           | true if the event bubbles                                                                                       |
| cancelable        | true if the default behavior of the event can be canceled                                                       |
| currentTarget     | the current element on which the event is firing                                                                |
| defaultPrevented  | return true if the preventDefault() has been called.                                                            |
| detail            | more information about the event                                                                                |
| eventPhase        | 1 for capturing phase, 2 for target, 3 for bubbling                                                             |
| preventDefault()  | cancel the default behavior for the event. This method is only effective if the `cancelable` property is true   |
| stopPropagation() | cancel any further event capturing or bubbling. This method only can be used if the `bubbles` property is true. |
| target            | the target element of the event                                                                                 |
| type              | the type of event that was fired                                                                                |

# References
https://www.javascripttutorial.net/javascript-dom/javascript-events/