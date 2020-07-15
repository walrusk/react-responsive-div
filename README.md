# React Responsive Div

Responsive React container using breakpoints based on container (not viewport) width.

The core of https://github.com/philipwalton/responsive-components ported to React with slight behaviour modifications and
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
<div class="MD">... content ...</div>
or
<div class="LG">... content ...</div>
or
<div class="XL">... content ...</div>
```

## Apply CSS rules based on container size using classes instead of using media queries based on viewport size.   
```css
.SM .column { flex:0 0 100%; }
```
