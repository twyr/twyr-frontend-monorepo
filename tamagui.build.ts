import type { TamaguiBuildOptions } from '@tamagui/core'

const config: TamaguiBuildOptions = {
  components: ['tamagui', '@twyr/ui-kit', '@twyr/ui-composed'],
  config: './packages/design-system/src/tamagui.config.ts',
  outputCSS: './apps/web-shell/app/tamagui.css'
}

export default config
