/**
 * Defining a border that could be on a cell.
 * @experimental
 * @module Border
 * @category Models
 */
import type { Color } from "./Color.ts";

export type Border = {
	color: Color;
	style: BorderStyle;
	weight: BorderWeight;
};

export type BorderSide = "EdgeTop" | "EdgeBottom" | "EdgeLeft" | "EdgeRight" | "InsideVertical" | "InsideHorizontal" | "DiagonalDown" | "DiagonalUp";

export type BorderStyle = "None" | "Continuous" | "Dash" | "DashDot" | "DashDotDot" | "Dot" | "Double" | "SlantDashDot";

export type BorderWeight = "Hairline" | "Thin" | "Medium" | "Thick";
