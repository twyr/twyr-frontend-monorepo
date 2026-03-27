# Tamagui Configuration

This document provides an overview of the Tamagui configuration for this project.

## Configuration Settings

**IMPORTANT:** These settings affect how you write Tamagui code in this project.

### Default Font: `body`

All text components will use the "body" font family by default.

### Theme Class Name on Root: `true`

Theme classes are applied to the root HTML element.

### Web Container Type: `inline-size`

Enables web-specific container query optimizations.

## Shorthand Properties

These shorthand properties are available for styling:

- `ac` → `alignContent`
- `ai` → `alignItems`
- `als` → `alignSelf`
- `b` → `bottom`
- `bbc` → `borderBottomColor`
- `bblr` → `borderBottomLeftRadius`
- `bbrr` → `borderBottomRightRadius`
- `bbs` → `borderBottomStyle`
- `bbw` → `borderBottomWidth`
- `bc` → `borderColor`
- `bg` → `backgroundColor`
- `blc` → `borderLeftColor`
- `bls` → `borderLeftStyle`
- `blw` → `borderLeftWidth`
- `br` → `borderRadius`
- `brc` → `borderRightColor`
- `brs` → `borderRightStyle`
- `brw` → `borderRightWidth`
- `bs` → `borderStyle`
- `btc` → `borderTopColor`
- `btlr` → `borderTopLeftRadius`
- `btrr` → `borderTopRightRadius`
- `bts` → `borderTopStyle`
- `btw` → `borderTopWidth`
- `bw` → `borderWidth`
- `bxs` → `boxSizing`
- `bxsh` → `boxShadow`
- `col` → `color`
- `cur` → `cursor`
- `dsp` → `display`
- `f` → `flex`
- `fb` → `flexBasis`
- `fd` → `flexDirection`
- `ff` → `fontFamily`
- `fg` → `flexGrow`
- `fos` → `fontSize`
- `fost` → `fontStyle`
- `fow` → `fontWeight`
- `fs` → `flexShrink`
- `fst` → `fontStyle`
- `fw` → `flexWrap`
- `fwr` → `flexWrap`
- `h` → `height`
- `jc` → `justifyContent`
- `l` → `left`
- `lh` → `lineHeight`
- `ls` → `letterSpacing`
- `m` → `margin`
- `mah` → `maxHeight`
- `maw` → `maxWidth`
- `mb` → `marginBottom`
- `mih` → `minHeight`
- `miw` → `minWidth`
- `ml` → `marginLeft`
- `mr` → `marginRight`
- `mt` → `marginTop`
- `mx` → `marginHorizontal`
- `my` → `marginVertical`
- `o` → `opacity`
- `ov` → `overflow`
- `ox` → `overflowX`
- `oy` → `overflowY`
- `p` → `padding`
- `pb` → `paddingBottom`
- `pe` → `pointerEvents`
- `pl` → `paddingLeft`
- `pos` → `position`
- `pr` → `paddingRight`
- `pt` → `paddingTop`
- `px` → `paddingHorizontal`
- `py` → `paddingVertical`
- `r` → `right`
- `shac` → `shadowColor`
- `shar` → `shadowRadius`
- `shof` → `shadowOffset`
- `shop` → `shadowOpacity`
- `t` → `top`
- `ta` → `textAlign`
- `td` → `textDecorationLine`
- `tr` → `transform`
- `tt` → `textTransform`
- `ussel` → `userSelect`
- `va` → `verticalAlign`
- `w` → `width`
- `wb` → `wordBreak`
- `ws` → `whiteSpace`
- `ww` → `wordWrap`
- `zi` → `zIndex`

## Themes

Themes are organized hierarchically and can be combined:

**Level 1 (Base):**

- dark
- light

### Theme Usage

Themes are combined hierarchically. For example, `light_blue_alt1_Button` combines:
- Base: `light`
- Color: `blue`
- Variant: `alt1`
- Component: `Button`

**Basic usage:**

```tsx
// Apply a theme to components
export default () => (
  <Theme name="dark">
    <Button>I'm a dark button</Button>
  </Theme>
)

// Themes nest and combine automatically
export default () => (
  <Theme name="dark">
    <Theme name="blue">
      <Button>Uses dark_blue theme</Button>
    </Theme>
  </Theme>
)
```

**Accessing theme values:**

Components can access theme values using `$` token syntax:

```tsx
<Stack backgroundColor="$background" color="$color" />
```

**Special props:**

- `inverse`: Automatically swaps light ↔ dark themes
- `reset`: Reverts to grandparent theme

## Tokens

Tokens are design system values that can be referenced using the `$` prefix.

### Space Tokens

- `0`: 0
- `1`: 4
- `2`: 8
- `3`: 12
- `4`: 16
- `5`: 20
- `6`: 24
- `7`: 28
- `8`: 32
- `9`: 40
- `10`: 48
- `11`: 56
- `12`: 64
- `true`: 16

### Size Tokens

- `0`: 0
- `1`: 4
- `2`: 8
- `3`: 12
- `4`: 16
- `5`: 20
- `6`: 24
- `7`: 28
- `8`: 32
- `9`: 40
- `10`: 48
- `11`: 56
- `12`: 64
- `true`: 16

### Radius Tokens

- `0`: 0
- `1`: 6
- `2`: 10
- `3`: 14
- `4`: 18
- `5`: 24
- `6`: 32

### Z-Index Tokens

- `0`: 0
- `1`: 100
- `2`: 200
- `3`: 300
- `4`: 400
- `5`: 500
- `6`: 1000

### Color Tokens

- `amber100`: #fef3c7
- `amber200`: #fde68a
- `amber300`: #fcd34d
- `amber400`: #fbbf24
- `amber50`: #fffbeb
- `amber500`: #f59e0b
- `amber600`: #d97706
- `amber700`: #b45309
- `amber800`: #92400e
- `amber900`: #78350f
- `amber950`: #451a03
- `black`: #000000
- `emerald100`: #d1fae5
- `emerald200`: #a7f3d0
- `emerald300`: #6ee7b7
- `emerald400`: #34d399
- `emerald50`: #ecfdf5
- `emerald500`: #10b981
- `emerald600`: #059669
- `emerald700`: #047857
- `emerald800`: #065f46
- `emerald900`: #064e3b
- `emerald950`: #022c22
- `red100`: #fee2e2
- `red200`: #fecaca
- `red300`: #fca5a5
- `red400`: #f87171
- `red50`: #fef2f2
- `red500`: #ef4444
- `red600`: #dc2626
- `red700`: #b91c1c
- `red800`: #991b1b
- `red900`: #7f1d1d
- `red950`: #450a0a
- `slate100`: #f1f5f9
- `slate200`: #e2e8f0
- `slate300`: #cbd5e1
- `slate400`: #94a3b8
- `slate50`: #f8fafc
- `slate500`: #64748b
- `slate600`: #475569
- `slate700`: #334155
- `slate800`: #1e293b
- `slate900`: #0f172a
- `slate950`: #020617
- `stone100`: #f5f5f4
- `stone200`: #e7e5e4
- `stone300`: #d6d3d1
- `stone400`: #a8a29e
- `stone50`: #fafaf9
- `stone500`: #78716c
- `stone600`: #57534e
- `stone700`: #44403c
- `stone800`: #292524
- `stone900`: #1c1917
- `stone950`: #0c0a09
- `white`: #ffffff
- `zinc100`: #f4f4f5
- `zinc200`: #e4e4e7
- `zinc300`: #d4d4d8
- `zinc400`: #a1a1aa
- `zinc50`: #fafafa
- `zinc500`: #71717a
- `zinc600`: #52525b
- `zinc700`: #3f3f46
- `zinc800`: #27272a
- `zinc900`: #18181b
- `zinc950`: #09090b

### Token Usage

Tokens can be used in component props with the `$` prefix:

```tsx
// Space tokens - for margin, padding, gap
<Stack padding="$4" gap="$2" margin="$3" />

// Size tokens - for width, height, dimensions
<Stack width="$10" height="$6" />

// Color tokens - for colors and backgrounds
<Stack backgroundColor="$blue5" color="$gray12" />

// Radius tokens - for border-radius
<Stack borderRadius="$4" />
```

## Media Queries

Available responsive breakpoints:

- **hoverNone**: {"hover":"none"}
- **lg**: {"maxWidth":1280}
- **md**: {"maxWidth":1020}
- **pointerCoarse**: {"pointer":"coarse"}
- **short**: {"maxHeight":820}
- **sm**: {"maxWidth":800}
- **xl**: {"maxWidth":1420}
- **xs**: {"maxWidth":660}

### Media Query Usage

Media queries can be used as style props or with the `useMedia` hook:

```tsx
// As style props (prefix with $)
<Stack width="100%" $hoverNone={{ width: "50%" }} />

// Using the useMedia hook
const media = useMedia()
if (media.hoverNone) {
  // Render for this breakpoint
}
```

## Fonts

Available font families:

- body
- heading
- mono
- silkscreen

## Animations

Available animation presets:

- 100ms
- 200ms
- 75ms
- bouncy
- lazy
- medium
- quick
- quicker
- quickest
- slow
- superBouncy
- tooltip

## Components

The following components are available:

- AlertDialogAction
- AlertDialogCancel
- AlertDialogDescription
- AlertDialogOverlay
- AlertDialogTitle
- AlertDialogTrigger
- Anchor
- Article
- Aside
- AvatarFallback
  - AvatarFallback.Frame
- AvatarFrame
- Button
  - Button.Frame
  - Button.Text
- Card
  - Card.Background
  - Card.Footer
  - Card.Frame
  - Card.Header
- Checkbox
  - Checkbox.Frame
  - Checkbox.IndicatorFrame
- Circle
- DialogClose
- DialogContent
- DialogDescription
- DialogOverlay
  - DialogOverlay.Frame
- DialogPortalFrame
- DialogTitle
- DialogTrigger
- EnsureFlexed
- Fieldset
- Footer
- Form
  - Form.Frame
  - Form.Trigger
- Frame
- Group
  - Group.Frame
- H1
- H2
- H3
- H4
- H5
- H6
- Handle
- Header
- Heading
- Image
- Input
  - Input.Frame
- Label
  - Label.Frame
- ListItem
  - ListItem.Frame
  - ListItem.Subtitle
  - ListItem.Text
  - ListItem.Title
- Main
- Nav
- Overlay
- Paragraph
- PopoverArrow
- PopoverContent
- PopperAnchor
- PopperArrowFrame
- PopperContentFrame
- Progress
  - Progress.Frame
  - Progress.Indicator
  - Progress.IndicatorFrame
- RadioGroup
  - RadioGroup.Frame
  - RadioGroup.IndicatorFrame
  - RadioGroup.ItemFrame
- ScrollView
- Section
- SelectGroupFrame
- SelectIcon
- SelectSeparator
- Separator
- SheetHandleFrame
- SheetOverlayFrame
- SizableStack
- SizableText
- SliderFrame
- SliderThumb
  - SliderThumb.Frame
- SliderTrackActiveFrame
- SliderTrackFrame
- Spacer
- Spacer
- Spinner
- Square
- Stack
- Stack
- Switch
  - Switch.Frame
  - Switch.Thumb
- Tabs
- Text
  - Text.Area
  - Text.AreaFrame
- ThemeableStack
- Thumb
- View
- View
- VisuallyHidden
- XGroup
- XStack
- YGroup
- YStack
- ZStack

