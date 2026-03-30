import React from 'react';
import { Select as TamaguiSelect } from 'tamagui';
import { controlHeights, controlPadding } from './ControlStyles';

import { ChevronDownIcon } from './icons';

type Option = { label: string; value: string };

type Props = {
	value: string;
	onValueChange: (value: string) => void;
	options: Option[];
	placeholder?: string;
	width?: number | string;
};

export function Select({
	value,
	onValueChange,
	options,
	placeholder = 'Select an option',
	width = '100%'
}: Props) {
	return (
		<TamaguiSelect value={value} onValueChange={onValueChange}>
			<TamaguiSelect.Trigger
				width={width}
				minHeight={controlHeights.default}
				paddingHorizontal={controlPadding.horizontal}
				paddingVertical={controlPadding.vertical}
				iconAfter={ChevronDownIcon}
			>
				<TamaguiSelect.Value placeholder={placeholder} />
			</TamaguiSelect.Trigger>

			<TamaguiSelect.Content zIndex={200000}>
				<TamaguiSelect.Viewport>
					<TamaguiSelect.Group>
						{options.map((option, index) => (
							<TamaguiSelect.Item
								key={option.value}
								index={index}
								value={option.value}
								minHeight={controlHeights.default}
								paddingHorizontal={controlPadding.horizontal}
							>
								<TamaguiSelect.ItemText>
									{option.label}
								</TamaguiSelect.ItemText>
							</TamaguiSelect.Item>
						))}
					</TamaguiSelect.Group>
				</TamaguiSelect.Viewport>
			</TamaguiSelect.Content>
		</TamaguiSelect>
	);
}
