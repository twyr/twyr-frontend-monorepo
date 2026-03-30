'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
	tamaguiConfig,
	tailwindColors,
	themes,
	motion,
	radius,
	shadows,
	spacing,
	typography
} from '@twyr/design-system';
import {
	Accordion,
	ArrowRightIcon,
	Avatar,
	BoltIcon,
	Button,
	Card,
	Checkbox,
	ChevronDownIcon,
	DeviceDesktopIcon,
	Dialog,
	Input,
	LayoutDashboardIcon,
	MoonIcon,
	Popover,
	Progress,
	RadioGroup,
	Select,
	Separator,
	Sheet,
	ShieldCheckIcon,
	Slider,
	Spinner,
	SunIcon,
	Switch,
	Tabs,
	TextArea,
	ToastTrigger,
	ToastViewport,
	Tooltip
} from '@twyr/ui-kit';
import {
	Combobox,
	CommandPalette,
	DataTable,
	DatePicker,
	EmptyState,
	FileUpload,
	OTPInput,
	PageHeader,
	RichEditor,
	SectionHeader,
	StatCard
} from '@twyr/ui-composed';
import { Paragraph, XStack, YStack } from 'tamagui';

type ShowcasePlatform = 'web' | 'mobile';

type Props = {
	platform: ShowcasePlatform;
	themeControl?: ReactNode;
	showToastViewport?: boolean;
};

type ArtifactRow = {
	artifact: string;
	family: string;
	platform: string;
	preview: string;
};

const artifactRows: ArtifactRow[] = [
	{
		artifact: 'Accordion',
		family: 'ui-kit',
		platform: 'shared',
		preview: 'FAQ stacks and disclosure content'
	},
	{
		artifact: 'Avatar',
		family: 'ui-kit',
		platform: 'shared',
		preview: 'Initial fallback and image-ready identity'
	},
	{
		artifact: 'Button',
		family: 'ui-kit',
		platform: 'shared',
		preview: 'Primary, icon, and chromeless actions'
	},
	{
		artifact: 'Card',
		family: 'ui-kit',
		platform: 'shared',
		preview: 'Reusable container surface'
	},
	{
		artifact: 'Checkbox',
		family: 'ui-kit',
		platform: 'shared',
		preview: 'Boolean field control'
	},
	{
		artifact: 'Dialog',
		family: 'ui-kit',
		platform: 'shared',
		preview: 'Modal confirmation pattern'
	},
	{
		artifact: 'Input',
		family: 'ui-kit',
		platform: 'shared',
		preview: 'Single-line form field'
	},
	{
		artifact: 'Icons',
		family: 'ui-kit',
		platform: 'shared',
		preview: 'Tabler-backed platform icon set'
	},
	{
		artifact: 'MobileThemeToggle',
		family: 'ui-kit',
		platform: 'mobile',
		preview: 'Theme mode switcher for native shell'
	},
	{
		artifact: 'Popover',
		family: 'ui-kit',
		platform: 'shared',
		preview: 'Anchored helper surface'
	},
	{
		artifact: 'Progress',
		family: 'ui-kit',
		platform: 'shared',
		preview: 'Completion indicator'
	},
	{
		artifact: 'RadioGroup',
		family: 'ui-kit',
		platform: 'shared',
		preview: 'Single-choice option list'
	},
	{
		artifact: 'Select',
		family: 'ui-kit',
		platform: 'shared',
		preview: 'Dropdown selector'
	},
	{
		artifact: 'Separator',
		family: 'ui-kit',
		platform: 'shared',
		preview: 'Horizontal and vertical dividers'
	},
	{
		artifact: 'Sheet',
		family: 'ui-kit',
		platform: 'shared',
		preview: 'Slide-up overlay frame'
	},
	{
		artifact: 'Slider',
		family: 'ui-kit',
		platform: 'shared',
		preview: 'Single-thumb range control'
	},
	{
		artifact: 'Spinner',
		family: 'ui-kit',
		platform: 'shared',
		preview: 'Busy-state indicator'
	},
	{
		artifact: 'Switch',
		family: 'ui-kit',
		platform: 'shared',
		preview: 'Inline toggle control'
	},
	{
		artifact: 'Tabs',
		family: 'ui-kit',
		platform: 'shared',
		preview: 'Segmented content navigation'
	},
	{
		artifact: 'TextArea',
		family: 'ui-kit',
		platform: 'shared',
		preview: 'Multi-line input surface'
	},
	{
		artifact: 'ThemeToggle',
		family: 'ui-kit',
		platform: 'web',
		preview: 'Theme mode switcher for web shell'
	},
	{
		artifact: 'ToastTrigger',
		family: 'ui-kit',
		platform: 'shared',
		preview: 'Provider-backed transient feedback'
	},
	{
		artifact: 'ToastViewport',
		family: 'ui-kit',
		platform: 'web',
		preview: 'Toast portal viewport'
	},
	{
		artifact: 'Tooltip',
		family: 'ui-kit',
		platform: 'shared',
		preview: 'Hover and focus hinting'
	},
	{
		artifact: 'AppSidebar',
		family: 'ui-composed',
		platform: 'web',
		preview: 'Left rail shell navigation'
	},
	{
		artifact: 'Combobox',
		family: 'ui-composed',
		platform: 'shared',
		preview: 'Searchable option picker'
	},
	{
		artifact: 'CommandPalette',
		family: 'ui-composed',
		platform: 'shared',
		preview: 'Quick-action launcher'
	},
	{
		artifact: 'DataTable',
		family: 'ui-composed',
		platform: 'shared',
		preview: 'Sortable, paginated records grid'
	},
	{
		artifact: 'DatePicker',
		family: 'ui-composed',
		platform: 'shared',
		preview: 'Calendar-backed date selection'
	},
	{
		artifact: 'EmptyState',
		family: 'ui-composed',
		platform: 'shared',
		preview: 'Zero-data presentation'
	},
	{
		artifact: 'FileUpload',
		family: 'ui-composed',
		platform: 'shared',
		preview: 'Upload/picker scaffold'
	},
	{
		artifact: 'OtpInput',
		family: 'ui-composed',
		platform: 'shared',
		preview: 'Digit-by-digit verification field'
	},
	{
		artifact: 'PageHeader',
		family: 'ui-composed',
		platform: 'shared',
		preview: 'Top-of-page framing copy'
	},
	{
		artifact: 'RichEditor',
		family: 'ui-composed',
		platform: 'shared',
		preview: 'Markdown-style editor scaffold'
	},
	{
		artifact: 'SectionHeader',
		family: 'ui-composed',
		platform: 'shared',
		preview: 'In-page section framing copy'
	},
	{
		artifact: 'ShellFrame',
		family: 'ui-composed',
		platform: 'web',
		preview: 'App chrome composed from sidebar and top nav'
	},
	{
		artifact: 'StatCard',
		family: 'ui-composed',
		platform: 'shared',
		preview: 'Metric tile with semantic tone'
	},
	{
		artifact: 'TopNav',
		family: 'ui-composed',
		platform: 'web',
		preview: 'Top navigation bar with theme control'
	},
	{
		artifact: 'motion',
		family: 'design-system',
		platform: 'shared',
		preview: 'Shared timing and easing tokens'
	},
	{
		artifact: 'radius',
		family: 'design-system',
		platform: 'shared',
		preview: 'Corner radius scale'
	},
	{
		artifact: 'shadows',
		family: 'design-system',
		platform: 'shared',
		preview: 'Shadow presets across surfaces'
	},
	{
		artifact: 'spacing',
		family: 'design-system',
		platform: 'shared',
		preview: 'Shared space scale'
	},
	{
		artifact: 'tailwindColors',
		family: 'design-system',
		platform: 'shared',
		preview: 'Base palette source of truth'
	},
	{
		artifact: 'tamaguiConfig',
		family: 'design-system',
		platform: 'shared',
		preview: 'Provider config, default theme, and media'
	},
	{
		artifact: 'themes',
		family: 'design-system',
		platform: 'shared',
		preview: 'Semantic light and dark theme roles'
	},
	{
		artifact: 'tokens',
		family: 'design-system',
		platform: 'shared',
		preview: 'Color, size, space, radius, and z-index tokens'
	},
	{
		artifact: 'typography',
		family: 'design-system',
		platform: 'shared',
		preview: 'Type scale, weights, and rhythm'
	}
];

const artifactColumns = [
	{ accessorKey: 'artifact', header: 'Artifact' },
	{ accessorKey: 'family', header: 'Family' },
	{ accessorKey: 'platform', header: 'Platform' },
	{ accessorKey: 'preview', header: 'Preview' }
];

const paletteFamilies = [
	{ name: 'emerald', shades: tailwindColors.emerald },
	{ name: 'slate', shades: tailwindColors.slate },
	{ name: 'stone', shades: tailwindColors.stone },
	{ name: 'amber', shades: tailwindColors.amber },
	{ name: 'red', shades: tailwindColors.red }
];

const semanticThemeKeys = [
	'background',
	'backgroundSoft',
	'backgroundMuted',
	'color',
	'colorMuted',
	'primary',
	'primarySoft',
	'secondary',
	'accent',
	'accentSoft',
	'success',
	'warning',
	'danger'
] as const;

function PreviewColumn({ children }: { children: ReactNode }) {
	return (
		<YStack width={360} maxWidth="100%" flexGrow={1} flexShrink={1}>
			{children}
		</YStack>
	);
}

function Swatch({ label, value }: { label: string; value: string }) {
	return (
		<YStack width={104} gap="$2">
			<YStack
				height={64}
				borderRadius="$4"
				borderWidth={1}
				borderColor="$borderColor"
				backgroundColor={value}
			/>
			<Paragraph color="$color" fontWeight="700">
				{label}
			</Paragraph>
			<Paragraph color="$colorMuted" size="$2">
				{value}
			</Paragraph>
		</YStack>
	);
}

export function ArtifactShowcaseCatalog({
	platform,
	themeControl,
	showToastViewport = false
}: Props) {
	const [isMounted, setIsMounted] = useState(false);
	const [checked, setChecked] = useState(true);
	const [switchEnabled, setSwitchEnabled] = useState(false);
	const [selectedRole, setSelectedRole] = useState('operator');
	const [selectedSurface, setSelectedSurface] = useState('dashboard');
	const [selectedWorkspace, setSelectedWorkspace] = useState('users');
	const [sliderValue, setSliderValue] = useState([72]);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [sheetOpen, setSheetOpen] = useState(false);
	const [formValue, setFormValue] = useState('Design system audit');
	const [notesValue, setNotesValue] = useState(
		'Compose shared primitives into bounded, reusable product surfaces.'
	);
	const [verificationCode, setVerificationCode] = useState('420');
	const [chosenDate, setChosenDate] = useState('2026-03-30');
	const [editorValue, setEditorValue] = useState(
		'## Shell showcase\nA single place to inspect shared product surfaces.'
	);

	const platformLabel =
		platform === 'web' ? 'web shell frame' : 'mobile shell surface';
	const shellHighlights =
		platform === 'web'
			? 'This page is mounted inside the shared ShellFrame, so AppSidebar, TopNav, ThemeToggle, and the shell chrome are live on the canvas.'
			: 'This page is mounted inside the shared mobile shell surface, with the native theme toggle carried directly in the header actions.';

	const headerActions = (
		<>
			<Button
				tone="accent"
				iconAfter={ArrowRightIcon}
				onPress={() => setSheetOpen(true)}
			>
				Overlay tour
			</Button>
			{themeControl}
		</>
	);

	const progressValue = sliderValue[0] ?? 0;
	const configSummary = useMemo(() => {
		const configShape = tamaguiConfig as unknown as {
			defaultTheme?: string;
			media?: Record<string, unknown>;
		};

		return {
			defaultTheme: configShape.defaultTheme ?? 'light',
			mediaKeys: Object.keys(configShape.media ?? {})
		};
	}, []);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<YStack padding="$5" gap="$6">
			<PageHeader
				eyebrow="Shell apps"
				title="UI artifact showcase"
				description={`The ${platformLabel} now exposes the shared UI catalog: primitives, composed widgets, and design-system foundations. ${shellHighlights}`}
				actions={headerActions}
			/>

			<YStack id="overview" gap="$4">
				<SectionHeader
					title="Coverage"
					description="High-level status for the reusable artifacts shipped in this monorepo."
				/>
				<XStack gap="$4" flexWrap="wrap">
					<PreviewColumn>
						<StatCard
							label="Artifact families"
							value="3"
							hint="ui-kit, ui-composed, and design-system exports are all represented here."
							tone="primary"
						/>
					</PreviewColumn>
					<PreviewColumn>
						<StatCard
							label="Tracked exports"
							value={String(artifactRows.length)}
							hint="The inventory table below lists each artifact and where it belongs."
							tone="accent"
						/>
					</PreviewColumn>
					<PreviewColumn>
						<StatCard
							label="Interactive controls"
							value="14"
							hint="Form fields, overlays, feedback, and command surfaces are wired with live state."
							tone="neutral"
						/>
					</PreviewColumn>
				</XStack>
			</YStack>

			<YStack id="primitives" gap="$4">
				<SectionHeader
					title="Primitive surfaces"
					description="Core ui-kit controls with enough state to verify styling, interaction, and semantic tokens."
				/>
				<XStack gap="$4" flexWrap="wrap">
					<PreviewColumn>
						<Card
							title="Buttons and card"
							description="Primary, icon-bearing, and chromeless actions mounted on the shared card surface."
							footer={<Button chromeless>Secondary trail</Button>}
						>
							<XStack gap="$3" flexWrap="wrap">
								<Button>Primary action</Button>
								<Button
									tone="secondary"
									iconAfter={ArrowRightIcon}
								>
									Continue
								</Button>
								<Button tone="accent">Accent action</Button>
								<Button chromeless color="$color">
									Chromeless action
								</Button>
							</XStack>
						</Card>
					</PreviewColumn>
					<PreviewColumn>
						<Card
							title="Inputs"
							description="Single-line and multi-line fields using the shared semantic theme roles."
						>
							<YStack gap="$3">
								<Input
									value={formValue}
									onChangeText={setFormValue}
									placeholder="Artifact title"
								/>
								<TextArea
									value={notesValue}
									onChangeText={setNotesValue}
									minHeight={120}
								/>
							</YStack>
						</Card>
					</PreviewColumn>
					<PreviewColumn>
						<Card
							title="Selections"
							description="Checkbox, switch, and radio variants with live values."
						>
							<YStack gap="$3">
								<Checkbox
									id="artifact-checkbox"
									label="Show design-system diagnostics"
									checked={checked}
									onCheckedChange={setChecked}
								/>
								<Switch
									id="artifact-switch"
									label="Compact mode"
									checked={switchEnabled}
									onCheckedChange={setSwitchEnabled}
								/>
								<RadioGroup
									name="artifact-role"
									label="Default persona"
									value={selectedRole}
									onValueChange={setSelectedRole}
									options={[
										{
											label: 'Operator',
											value: 'operator'
										},
										{ label: 'Analyst', value: 'analyst' },
										{ label: 'Admin', value: 'admin' }
									]}
								/>
							</YStack>
						</Card>
					</PreviewColumn>
					<PreviewColumn>
						<Card
							title="Range and status"
							description="A slider drives progress so both feedback primitives stay visible together."
						>
							<YStack gap="$4">
								<Slider
									value={sliderValue}
									onValueChange={setSliderValue}
								/>
								{isMounted ? (
									<Progress value={progressValue} />
								) : (
									<YStack
										height={12}
										borderRadius="$pill"
										backgroundColor="$backgroundSoft"
										borderWidth={1}
										borderColor="$borderColor"
									/>
								)}
								<XStack
									alignItems="center"
									gap="$3"
									flexWrap="wrap"
								>
									<Spinner size="small" />
									<Spinner size="large" color="$accent" />
									<Paragraph color="$colorMuted">
										Completion {progressValue}%
									</Paragraph>
								</XStack>
							</YStack>
						</Card>
					</PreviewColumn>
					<PreviewColumn>
						<Card
							title="Identity and icons"
							description="Avatar fallback and the full shared icon set on a single surface."
						>
							<YStack gap="$4">
								<XStack gap="$3" alignItems="center">
									<Avatar name="Twyr Platform" size={40} />
									<Avatar name="Shell Showcase" size={56} />
									<Separator vertical />
									<Paragraph color="$colorMuted">
										Fallback initials derive from the
										provided name.
									</Paragraph>
								</XStack>
								<XStack gap="$3" flexWrap="wrap">
									<SunIcon color="$primary" size={18} />
									<MoonIcon color="$primary" size={18} />
									<DeviceDesktopIcon
										color="$primary"
										size={18}
									/>
									<ChevronDownIcon
										color="$primary"
										size={18}
									/>
									<ArrowRightIcon
										color="$primary"
										size={18}
									/>
									<BoltIcon color="$primary" size={18} />
									<LayoutDashboardIcon
										color="$primary"
										size={18}
									/>
									<ShieldCheckIcon
										color="$primary"
										size={18}
									/>
								</XStack>
							</YStack>
						</Card>
					</PreviewColumn>
					<PreviewColumn>
						<Card
							title="Navigation primitives"
							description="Select, tabs, and accordion patterns cover quick traversal and disclosure."
						>
							<YStack gap="$4">
								<Select
									value={selectedSurface}
									onValueChange={setSelectedSurface}
									options={[
										{
											label: 'Dashboard',
											value: 'dashboard'
										},
										{
											label: 'Review queue',
											value: 'review-queue'
										},
										{
											label: 'Audit trail',
											value: 'audit-trail'
										}
									]}
								/>
								<Tabs
									defaultValue="tokens"
									items={[
										{
											key: 'tokens',
											label: 'Tokens',
											content: (
												<Paragraph color="$colorMuted">
													Spacing, radius, shadow, and
													typography scales are
													covered in the design-system
													section.
												</Paragraph>
											)
										},
										{
											key: 'widgets',
											label: 'Widgets',
											content: (
												<Paragraph color="$colorMuted">
													Composed widgets sit below
													this section so primitives
													and assembled surfaces stay
													distinct.
												</Paragraph>
											)
										},
										{
											key: 'shell',
											label: 'Shell',
											content: (
												<Paragraph color="$colorMuted">
													The page chrome itself is
													part of the showcase for the
													current platform.
												</Paragraph>
											)
										}
									]}
								/>
								<Accordion
									items={[
										{
											id: 'coverage',
											title: 'What is covered?',
											content: (
												<Paragraph color="$colorMuted">
													Every export from ui-kit,
													ui-composed, and
													design-system is either
													rendered live, listed in the
													inventory table, or both.
												</Paragraph>
											)
										},
										{
											id: 'platform',
											title: 'What is platform-specific?',
											content: (
												<Paragraph color="$colorMuted">
													ShellFrame, AppSidebar,
													TopNav, and ThemeToggle are
													web-specific.
													MobileThemeToggle is shown
													on the mobile shell.
												</Paragraph>
											)
										}
									]}
								/>
							</YStack>
						</Card>
					</PreviewColumn>
					<PreviewColumn>
						<Card
							title="Overlays and feedback"
							description="Popover, tooltip, dialog, sheet, and toast are all wired from the same preview cluster."
						>
							<YStack gap="$3">
								<XStack gap="$3" flexWrap="wrap">
									<Popover
										trigger={
											<Button chromeless color="$color">
												Open popover
											</Button>
										}
									>
										<Paragraph color="$colorMuted">
											Anchored content inherits the same
											semantic border and background
											tokens.
										</Paragraph>
									</Popover>
									<Tooltip content="Tooltips are rendered through the shared ui-kit wrapper.">
										<Button chromeless color="$color">
											Hover hint
										</Button>
									</Tooltip>
									<Button
										tone="secondary"
										onPress={() => setDialogOpen(true)}
									>
										Open dialog
									</Button>
									<Button
										tone="accent"
										onPress={() => setSheetOpen(true)}
									>
										Open sheet
									</Button>
								</XStack>
								<ToastTrigger
									title="Showcase toast"
									message="Transient feedback is available through the shared provider layer."
								>
									Show toast
								</ToastTrigger>
							</YStack>
						</Card>

						{isMounted ? (
							<>
								<Dialog
									open={dialogOpen}
									onOpenChange={setDialogOpen}
									title="Promote preview"
									description="Dialog primitives are mounted in-place so teams can validate overlays without leaving the shell."
									confirmLabel="Looks good"
									onConfirm={() => setDialogOpen(false)}
								>
									<Paragraph color="$colorMuted">
										Use dialog for explicit confirmation
										gates and blocking actions.
									</Paragraph>
								</Dialog>

								<Sheet
									open={sheetOpen}
									onOpenChange={setSheetOpen}
								>
									<YStack gap="$3">
										<Paragraph
											color="$color"
											fontWeight="700"
										>
											Sheet preview
										</Paragraph>
										<Paragraph color="$colorMuted">
											Use the sheet wrapper for
											mobile-forward layered content and
											compact workflows.
										</Paragraph>
										<Button
											tone="neutral"
											onPress={() => setSheetOpen(false)}
										>
											Close sheet
										</Button>
									</YStack>
								</Sheet>
							</>
						) : null}
					</PreviewColumn>
				</XStack>
			</YStack>

			<YStack id="composed" gap="$4">
				<SectionHeader
					title="Composed workflows"
					description="Higher-level widgets assembled from the primitive layer and ready for bounded-context screens."
				/>
				<XStack gap="$4" flexWrap="wrap">
					<PreviewColumn>
						<Card
							title="Search and commands"
							description="Combobox and command palette variants for quick navigation and option discovery."
						>
							<YStack gap="$4">
								<Combobox
									label="Workspace"
									value={selectedWorkspace}
									onValueChange={setSelectedWorkspace}
									options={[
										{ label: 'Users', value: 'users' },
										{
											label: 'System administrators',
											value: 'system-administrators'
										},
										{
											label: 'Shared shell',
											value: 'shell'
										}
									]}
								/>
								<CommandPalette
									title="Quick actions"
									items={[
										{
											id: 'jump-primitives',
											label: 'Jump to primitive section',
											keywords: ['controls', 'forms']
										},
										{
											id: 'jump-composed',
											label: 'Jump to composed section',
											keywords: ['widgets', 'flows']
										},
										{
											id: 'jump-design',
											label: 'Jump to design-system section',
											keywords: ['tokens', 'palette']
										}
									]}
								/>
							</YStack>
						</Card>
					</PreviewColumn>
					<PreviewColumn>
						<Card
							title="Data and empty states"
							description="Inventory plus a neutral zero-state to verify read-heavy product surfaces."
						>
							<YStack gap="$4">
								<EmptyState
									title="No incidents routed"
									description="EmptyState stays compact and action-oriented when data has not arrived yet."
									action={<Button>Seed example data</Button>}
								/>
							</YStack>
						</Card>
					</PreviewColumn>
					<PreviewColumn>
						<Card
							title="Verification and content"
							description="OTP, date picker, upload scaffold, and editor scaffold cover common app flows."
						>
							<YStack gap="$4">
								<OTPInput
									value={verificationCode}
									onChange={setVerificationCode}
									length={6}
								/>
								<DatePicker
									value={chosenDate}
									onChange={setChosenDate}
									label="Review date"
								/>
								<FileUpload />
								<RichEditor
									value={editorValue}
									onChange={setEditorValue}
									label="Release note draft"
								/>
							</YStack>
						</Card>
					</PreviewColumn>
				</XStack>

				<DataTable
					title="Artifact inventory"
					description="A live DataTable instance doubles as a searchable inventory of the reusable surfaces shipped in this repository."
					columns={artifactColumns}
					data={artifactRows}
				/>
			</YStack>

			<YStack id="design-system" gap="$4">
				<SectionHeader
					title="Design-system variants"
					description="Semantic themes, palette families, spatial scales, typography, motion, and configuration details that underpin the UI catalog."
				/>
				<XStack gap="$4" flexWrap="wrap">
					<PreviewColumn>
						<Card
							title="Theme roles"
							description="Light and dark themes expose semantic roles instead of raw color names."
						>
							<YStack gap="$4">
								{(['light', 'dark'] as const).map(
									(themeName) => (
										<YStack key={themeName} gap="$3">
											<Paragraph
												color="$color"
												fontWeight="700"
											>
												{themeName} theme
											</Paragraph>
											<XStack gap="$3" flexWrap="wrap">
												{semanticThemeKeys.map(
													(key) => (
														<Swatch
															key={`${themeName}-${key}`}
															label={key}
															value={
																themes[
																	themeName
																][key]
															}
														/>
													)
												)}
											</XStack>
										</YStack>
									)
								)}
							</YStack>
						</Card>
					</PreviewColumn>
					<PreviewColumn>
						<Card
							title="Tailwind palette source"
							description="The design system derives semantic roles from a centralized Tailwind-aligned palette."
						>
							<YStack gap="$4">
								{paletteFamilies.map((family) => (
									<YStack key={family.name} gap="$3">
										<Paragraph
											color="$color"
											fontWeight="700"
										>
											{family.name}
										</Paragraph>
										<XStack gap="$2" flexWrap="wrap">
											{Object.entries(family.shades).map(
												([shade, value]) => (
													<Swatch
														key={`${family.name}-${shade}`}
														label={shade}
														value={value}
													/>
												)
											)}
										</XStack>
									</YStack>
								))}
							</YStack>
						</Card>
					</PreviewColumn>
					<PreviewColumn>
						<Card
							title="Spacing and radius"
							description="Spatial rhythm and corner treatment stay consistent across platforms through shared scales."
						>
							<YStack gap="$4">
								<YStack gap="$3">
									<Paragraph color="$color" fontWeight="700">
										Spacing scale
									</Paragraph>
									{Object.entries(spacing).map(
										([key, value]) => (
											<XStack
												key={key}
												alignItems="center"
												gap="$3"
											>
												<Paragraph
													color="$colorMuted"
													width={40}
												>
													{key}
												</Paragraph>
												<YStack
													height={12}
													width={Math.max(value, 12)}
													borderRadius="$pill"
													backgroundColor="$primary"
												/>
												<Paragraph color="$colorMuted">
													{value}px
												</Paragraph>
											</XStack>
										)
									)}
								</YStack>
								<Separator />
								<YStack gap="$3">
									<Paragraph color="$color" fontWeight="700">
										Radius scale
									</Paragraph>
									<XStack gap="$3" flexWrap="wrap">
										{Object.entries(radius).map(
											([key, value]) => (
												<YStack
													key={key}
													width={96}
													gap="$2"
													alignItems="center"
												>
													<YStack
														width={72}
														height={72}
														backgroundColor="$backgroundSoft"
														borderWidth={1}
														borderColor="$borderColor"
														borderRadius={value}
													/>
													<Paragraph color="$colorMuted">
														{key}: {value}
													</Paragraph>
												</YStack>
											)
										)}
									</XStack>
								</YStack>
							</YStack>
						</Card>
					</PreviewColumn>
					<PreviewColumn>
						<Card
							title="Typography, motion, and shadows"
							description="Visual rhythm is codified so product teams can reuse it instead of redefining it."
						>
							<YStack gap="$4">
								<YStack gap="$3">
									<Paragraph color="$color" fontWeight="700">
										Type scale
									</Paragraph>
									{Object.entries(typography.size).map(
										([key, value]) => (
											<Paragraph
												key={key}
												color="$color"
												fontSize={value}
												lineHeight={
													typography.lineHeight[
														key as keyof typeof typography.lineHeight
													]
												}
											>
												{key} ({value}px)
											</Paragraph>
										)
									)}
								</YStack>
								<Separator />
								<YStack gap="$3">
									<Paragraph color="$color" fontWeight="700">
										Motion presets
									</Paragraph>
									<Paragraph color="$colorMuted">
										Fast: {motion.fast}ms, Moderate:{' '}
										{motion.moderate}ms, Slow: {motion.slow}
										ms.
									</Paragraph>
									<Paragraph color="$colorMuted">
										Easing: {motion.easing.productive},{' '}
										{motion.easing.enter},{' '}
										{motion.easing.exit}.
									</Paragraph>
								</YStack>
								<Separator />
								<YStack gap="$3">
									<Paragraph color="$color" fontWeight="700">
										Shadow presets
									</Paragraph>
									<XStack gap="$3" flexWrap="wrap">
										{Object.entries(shadows).map(
											([key, value]) => (
												<YStack
													key={key}
													width={112}
													height={96}
													padding="$3"
													borderRadius="$4"
													backgroundColor="$backgroundSoft"
													justifyContent="flex-end"
													{...value}
												>
													<Paragraph color="$colorMuted">
														{key}
													</Paragraph>
												</YStack>
											)
										)}
									</XStack>
								</YStack>
							</YStack>
						</Card>
					</PreviewColumn>
					<PreviewColumn>
						<Card
							title="Tamagui config"
							description="The provider config centralizes the default theme and media breakpoints used across the shell apps."
						>
							<YStack gap="$3">
								<Paragraph color="$colorMuted">
									Default theme: {configSummary.defaultTheme}
								</Paragraph>
								<Paragraph color="$colorMuted">
									Media keys:{' '}
									{configSummary.mediaKeys.join(', ')}
								</Paragraph>
								<Paragraph color="$colorMuted">
									Tokens exposed: color, size, space, radius,
									and z-index.
								</Paragraph>
							</YStack>
						</Card>
					</PreviewColumn>
				</XStack>
			</YStack>

			{showToastViewport ? <ToastViewport /> : null}
		</YStack>
	);
}
