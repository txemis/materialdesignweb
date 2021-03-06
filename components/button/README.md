# Syntax


## Flat
```
.mdw-button
```

## Raised
```
.mdw-button(mdw-raised)
```

## Always Raised
```
.mdw-button(mdw-raised="always")
```

## Colored
```
.mdw-button(mdw-theme-color="primary")
```

## Colored (Custom Tone)
```
.mdw-button(mdw-theme-color="accent-A100")
```

## Filled
```
.mdw-button(mdw-theme-fill="primary")
```

## Filled (Custom Tone)
```
.mdw-button(mdw-theme-fill="accent-A400")
```

## Filled (Custom Tone)
```
.mdw-button(disabled)
```

## Icon Button
```
.mdw-button(mdw-icon).material-icons favorite
```

## Focus Ring
```
.mdw-button
  .mdw-button__focus-ring
```

# Javascript

```
  document.querySelectorAll(".mdw-button").forEach((element) => {
    new mdw.Button(element);
  });
```

# Notes

The click ripple aftereffect is centered when using keyboard or when using only CSS. Initializing the element with Javascript will ensure the ripple will spawn from the cursor position.

Use of `HTMLElementButton` or `HTMLAnchorElement` is supported, but note that using interactive content descendents violates the HTML specifications. Therefore, some browsers may not apply interactive elements such as ripples or focus rings.