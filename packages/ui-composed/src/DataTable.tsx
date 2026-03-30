import React from 'react';
import {
	ColumnDef,
	RowData,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table';
import { Button, Card, Separator } from '@twyr/ui-kit';
import { Paragraph, ScrollView, XStack, YStack } from 'tamagui';

type Props<T extends RowData> = {
	title?: string;
	description?: string;
	columns: ColumnDef<T>[];
	data: T[];
};

export function DataTable<T extends RowData>({
	title,
	description,
	columns,
	data
}: Props<T>) {
	const headerTones = ['primary', 'secondary', 'accent', 'primary'] as const;
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const table = useReactTable({
		data,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel()
	});

	return (
		<Card title={title} description={description}>
			<ScrollView horizontal>
				<YStack minWidth={720}>
					<XStack
						backgroundColor="$backgroundSoft"
						padding="$3"
						gap="$3"
					>
						{table.getHeaderGroups().map((headerGroup) =>
							headerGroup.headers.map((header, index) => (
								<YStack key={header.id} minWidth={160} flex={1}>
									<Button
										tone={
											headerTones[
												index % headerTones.length
											]
										}
										onPress={() => {
											header.column.toggleSorting(
												header.column.getIsSorted() ===
													'asc'
											);
										}}
										width="100%"
										justifyContent="flex-start"
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.header,
													header.getContext()
												)}
									</Button>
								</YStack>
							))
						)}
					</XStack>
					<Separator />
					{table.getRowModel().rows.map((row) => (
						<React.Fragment key={row.id}>
							<XStack padding="$3" gap="$3">
								{row.getVisibleCells().map((cell) => (
									<YStack
										key={cell.id}
										minWidth={160}
										flex={1}
									>
										<Paragraph>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</Paragraph>
									</YStack>
								))}
							</XStack>
							<Separator />
						</React.Fragment>
					))}
				</YStack>
			</ScrollView>

			<XStack justifyContent="space-between" alignItems="center">
				<Paragraph color="$colorMuted">
					Page {table.getState().pagination.pageIndex + 1} of{' '}
					{table.getPageCount() || 1}
				</Paragraph>
				<XStack gap="$2">
					<Button
						tone="neutral"
						disabled={!table.getCanPreviousPage()}
						onPress={() => table.previousPage()}
					>
						Previous
					</Button>
					<Button
						tone="accent"
						disabled={!table.getCanNextPage()}
						onPress={() => table.nextPage()}
					>
						Next
					</Button>
				</XStack>
			</XStack>
		</Card>
	);
}
