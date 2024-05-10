import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useStateWithHistory } from '.';

describe('useStateWithHistory() hook', () => {
	const initialTodo = {
		id: 1,
		title: 'Todo 1'
	};

	it('should be defined', () => {
		expect(useStateWithHistory).toBeDefined();
	});

	it('yields the initial value on render', () => {
		const { result } = renderHook(({ initialValue }) => useStateWithHistory(initialValue), {
			initialProps: {
				initialValue: initialTodo
			}
		});

		expect(result.current[0]).toEqual(initialTodo);
	});

	describe('SET action', () => {
		it('yields new value correctly', () => {
			const { result } = renderHook(({ initialValue }) => useStateWithHistory(initialValue), {
				initialProps: {
					initialValue: initialTodo
				}
			});

			const newTodo = {
				id: 2,
				title: 'Todo 2'
			};

			act(() => {
				result.current[1].set(newTodo);
			});

			expect(result.current[0]).toEqual(newTodo);
		});

		it('updates the past state correctly', () => {
			const { result } = renderHook(({ initialValue }) => useStateWithHistory(initialValue), {
				initialProps: {
					initialValue: initialTodo
				}
			});

			const newTodo = {
				id: 2,
				title: 'Todo 2'
			};

			act(() => {
				result.current[1].set(newTodo);
			});

			// should update past list with previous present state
			expect(result.current[1]._past).toEqual([initialTodo]);
		});

		it('updates the future state correctly', () => {
			const { result } = renderHook(({ initialValue }) => useStateWithHistory(initialValue), {
				initialProps: {
					initialValue: initialTodo
				}
			});

			const newTodo = {
				id: 2,
				title: 'Todo 2'
			};

			act(() => {
				result.current[1].set(newTodo);
			});

			// set should reset the future state
			expect(result.current[1]._future).toEqual([]);
		});
	});

	describe('UNDO action', () => {
		it('yields new value correctly', () => {
			const { result } = renderHook(({ initialValue }) => useStateWithHistory(initialValue), {
				initialProps: {
					initialValue: initialTodo
				}
			});

			const newTodo = {
				id: 2,
				title: 'Todo 2'
			};

			act(() => {
				result.current[1].set(newTodo);
				result.current[1].undo();
			});

			expect(result.current[0]).toEqual(initialTodo);
		});

		it('updates the past state correctly', () => {
			const { result } = renderHook(({ initialValue }) => useStateWithHistory(initialValue), {
				initialProps: {
					initialValue: initialTodo
				}
			});

			const newTodo = {
				id: 2,
				title: 'Todo 2'
			};

			act(() => {
				result.current[1].set(newTodo);
				result.current[1].undo();
			});

			expect(result.current[1]._past).toEqual([]);
		});

		it('updates the future state correctly', () => {
			const { result } = renderHook(({ initialValue }) => useStateWithHistory(initialValue), {
				initialProps: {
					initialValue: initialTodo
				}
			});

			const newTodo = {
				id: 2,
				title: 'Todo 2'
			};

			act(() => {
				result.current[1].set(newTodo);
				result.current[1].undo();
			});

			// undo puts the last added state to future list
			expect(result.current[1]._future).toEqual([newTodo]);
		});
	});

	describe('REDO action', () => {
		it('yields new value correctly', () => {
			const { result } = renderHook(({ initialValue }) => useStateWithHistory(initialValue), {
				initialProps: {
					initialValue: initialTodo
				}
			});

			const newTodo = {
				id: 2,
				title: 'Todo 2'
			};

			act(() => {
				result.current[1].set(newTodo);
				result.current[1].undo();
				result.current[1].redo();
			});

			expect(result.current[0]).toEqual(newTodo);
		});

		it('updates the past state correctly', () => {
			const { result } = renderHook(({ initialValue }) => useStateWithHistory(initialValue), {
				initialProps: {
					initialValue: initialTodo
				}
			});

			const newTodo = {
				id: 2,
				title: 'Todo 2'
			};

			act(() => {
				result.current[1].set(newTodo);
				result.current[1].undo();
				result.current[1].redo();
			});

			expect(result.current[1]._past).toEqual([initialTodo]);
		});

		it('updates the future state correctly', () => {
			const { result } = renderHook(({ initialValue }) => useStateWithHistory(initialValue), {
				initialProps: {
					initialValue: initialTodo
				}
			});

			const newTodo = {
				id: 2,
				title: 'Todo 2'
			};

			act(() => {
				result.current[1].set(newTodo);
				result.current[1].undo();
				result.current[1].redo();
			});

			// it should empty out the future state
			expect(result.current[1]._future).toEqual([]);
		});
	});
});
