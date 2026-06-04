import type { CSSProperties, ReactNode } from "react";
import styles from "./HorizontalPage.module.css";

type HorizontalPageProps = {
  children: ReactNode;
  width?: string;
  tabletWidth?: string;
  mobileWidth?: string;
  smallMobileWidth?: string;
  landscapeWidth?: string;
  screen?: boolean;
  className?: string;
  ariaLabel?: string;
  /** When set, adds data-header-theme so HeaderThemeController can pick the right colour. */
  headerTheme?: "light" | "dark";
};

export function HorizontalPage({
  children,
  width = "auto",
  tabletWidth,
  mobileWidth,
  smallMobileWidth,
  landscapeWidth,
  screen = false,
  className,
  ariaLabel,
  headerTheme,
}: HorizontalPageProps): ReactNode {
  const pageClassName = [styles.page, screen ? styles.screen : "", className ?? ""].filter(Boolean).join(" ");
  const style = {
    "--horizontal-page-width": width,
    "--horizontal-page-tablet-width": tabletWidth ?? width,
    "--horizontal-page-mobile-width": mobileWidth ?? tabletWidth ?? width,
    "--horizontal-page-small-mobile-width": smallMobileWidth ?? mobileWidth ?? tabletWidth ?? width,
    "--horizontal-page-landscape-width": landscapeWidth ?? tabletWidth ?? width,
  } as CSSProperties;

  const dataAttrs = headerTheme ? { "data-header-theme": headerTheme } : undefined;

  return (
    <section className={pageClassName} style={style} aria-label={ariaLabel} {...dataAttrs}>
      {children}
    </section>
  );
}
