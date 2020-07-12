# React Responsive Div

Responsive React container using breakpoints based on container (not viewport) width.

The core of https://github.com/philipwalton/responsive-components ported to React
using hooks to manage creation/cleanup of observers for each container instead of using a global observer.

### Default breakpoints:

{
  SM: 384,
  MD: 576,
  LG: 768,
  XL: 960,
}

## Usage:

```sh
npm install --save @walrusk/react-responsive-div
```

```javascript
import Div from '@walrusk/react-responsive-div';
```

```javascript
<Div>
  ...
  responsive content
  ...
</Div>
```

```javascript
const customBreakpoints = {
  SM: 384,
  MD: 576,
  LG: 768,
  XL: 960,
};
<Div breakpoints={customBreakpoints}>
  ...
  content
  ...
</Div>
```

## Output based on container size:
```html
<div class="SM">... content ...</div>
or
<div class="SM MD">... content ...</div>
or
<div class="SM MD LG">... content ...</div>
or
<div class="SM MD LG XL">... content ...</div>
```

## Notes:

Considered adjusting behaviour to only set class of current breakpoint e.g. medium being `MD` instead of `SM MD`. May add a prop for this in future but not sure yet if this is actually needed. In most cases in CSS you want to target both and you can target small only with this pattern using `.SM:not(.MD)`.
