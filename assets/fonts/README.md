# SF Pro

The design specifies **SF Pro** at three weights, which the Figma file records as
`Regular` (400), `Medium` (510) and `Light` (274). Fractional weights like 510
and 274 are named instances of the SF Pro **variable** font, so a single
variable `.woff2` covers all three exactly.

## What ships today

This folder is intentionally empty. `styles.css` declares:

```css
@font-face { font-family: "SF Pro"; src: url("../fonts/SF-Pro.woff2") ... }
```

and then the stack falls through:

```
"SF Pro", -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display",
"Helvetica Neue", Inter, Arial, sans-serif
```

So right now:

| Where | What renders |
|---|---|
| macOS / iOS / iPadOS | Real SF Pro, via `-apple-system`. Correct today, no files needed. |
| Windows / Android / Linux | `Helvetica Neue` or Arial. Close in tone, **wrong in metrics** — line wraps and widths drift from the Figma. |

## Making it exact everywhere

1. Download **SF Pro** from <https://developer.apple.com/fonts/>. You get a `.dmg`
   (macOS) or a `.pkg`; inside are `SF-Pro.ttf` (variable), `SF-Pro-Italic.ttf`,
   plus static cuts.
2. Convert the variable TTF to WOFF2. Any of these work:
   - `woff2_compress SF-Pro.ttf` (from Google's `woff2` tools)
   - `fonttools ttLib.woff2 compress SF-Pro.ttf` (`pip install fonttools brotli`)
   - <https://everythingfonts.com/ttf-to-woff2> for a one-off
3. Drop the results in here as **`SF-Pro.woff2`** and **`SF-Pro-Italic.woff2`**.
   Nothing else to change — the `@font-face` rules already point at those names.

Optional but worth it: subset to the characters you actually use. It takes the
variable font from roughly 1.5 MB to under 100 KB.

```bash
pyftsubset SF-Pro.ttf \
  --unicodes="U+0000-00FF,U+2018-201D,U+2026,U+2013,U+2014" \
  --layout-features="kern,liga,calt" \
  --flavor=woff2 --output-file=SF-Pro.woff2
```

## Licensing — read this before you deploy

Apple's SF font licence permits use in user interfaces and in mockups, and is
generally read as permitting apps for Apple platforms. It is **not** an open
web-font licence, and self-hosting SF Pro as a webfont on a public site is
outside what most people read the licence as granting. Apple's own web
properties do serve SF, but under their own rights.

Three honest options:

1. **Ship nothing here.** Apple devices get real SF for free via
   `-apple-system`; everyone else gets the fallback. Zero licence risk. This is
   what the site does out of the box.
2. **Self-host anyway**, having read
   <https://developer.apple.com/support/downloads/terms/apple-fonts/Apple-Fonts-and-Xcode-License-Terms-20230918-English.pdf>
   and decided it covers your use. Your call to make, not mine.
3. **Swap the fallback for a metrics-friendly open face.** `Inter` (with
   `font-optical-sizing`) is the usual substitute and is already next in the
   stack — self-host it and non-Apple platforms stop drifting. It is not SF, but
   it wraps predictably.

If you pick option 3, add Inter's `@font-face` blocks above the SF ones and
leave the stack as-is.
