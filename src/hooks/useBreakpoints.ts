/**
 * ブレイクポイントを判定するカスタムフック
 */

// src/hooks/useBreakpoint.ts
"use client";

import { useState, useEffect } from "react";

const breakpoints = {
	xs: 0,
	sm: 600,
	md: 960,
	lg: 1280,
	xl: 1920,
};

const useBreakpoint = () => {
	const [currentBreakpoint, setCurrentBreakpoint] = useState<keyof typeof breakpoints | null>(null);

	useEffect(() => {
		const getBreakpoint = () => {
			const width = window.innerWidth;
			if (width >= breakpoints.xl) return "xl";
			if (width >= breakpoints.lg) return "lg";
			if (width >= breakpoints.md) return "md";
			if (width >= breakpoints.sm) return "sm";
			return "xs";
		};

		setCurrentBreakpoint(getBreakpoint());

		const handleResize = () => setCurrentBreakpoint(getBreakpoint());
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return currentBreakpoint;
};

export default useBreakpoint;
