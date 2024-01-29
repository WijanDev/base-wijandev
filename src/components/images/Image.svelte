<script lang="ts">
	import { BREAKPOINTS } from '../config';
	import { fade } from 'svelte/transition';
	import { lazyLoad } from '../utilities/lazy-load';
	export let src = '';
	export let alt = '';
	export let classes = '';
	export let width: number | undefined = undefined;
	export let height: number | undefined = undefined;
	export let w2xl: string = '100vw';
	export let wxl: string = '100vw';
	export let wlg: string = '100vw';
	export let wmd: string = '100vw';
	export let wsm: string = '100vw';
	let sizes = [];

	const getBreakpoint = (name: string) =>
		BREAKPOINTS.find((breakpoint) => breakpoint.name === name);
	if (wsm && getBreakpoint('sm')) sizes.push(`(min-width: ${getBreakpoint('sm')!.value}) ${wsm}`);
	if (wmd && getBreakpoint('md')) sizes.push(`(min-width: ${getBreakpoint('md')!.value}) ${wmd}`);
	if (wlg && getBreakpoint('lg')) sizes.push(`(min-width: ${getBreakpoint('lg')!.value}) ${wlg}`);
	if (wxl && getBreakpoint('xl')) sizes.push(`(min-width: ${getBreakpoint('xl')!.value}) ${wxl}`);
	if (w2xl && getBreakpoint('w2xl')) sizes.push(`(min-width: ${getBreakpoint('w2xl')!.value}) ${w2xl}`);

	let sizesAttr = sizes.join(', ');

	const mapSrc = (breakpointValue: number) => {
		let srcParts = src.split('/');
		let fileName = srcParts[srcParts.length - 1];
		const tr = `tr:w-${breakpointValue}`;
		srcParts = srcParts.slice(0, -1);
		srcParts.push(tr);
		srcParts.push(fileName);
		return srcParts.join('/');
	};
	let srcSet = BREAKPOINTS.map((breakpoint) => `${mapSrc(breakpoint.value)} ${breakpoint.value}w`);

	let srcSetAttr = srcSet.join(', ');
</script>

<img in:fade use:lazyLoad {src} {alt} srcset={srcSetAttr} sizes={sizesAttr} class={classes} {width} {height} />
