import * as React from "react";
import Link from "next/link";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const mdxComponents = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href || "#";
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link
          href={href}
          className={cn(
            "text-white/85 underline underline-offset-4 decoration-white/30 hover:decoration-white/70 transition"
          )}
        >
          {props.children}
        </Link>
      );
    }
    return (
      <a
        {...props}
        target={props.target ?? "_blank"}
        rel={props.rel ?? "noreferrer noopener"}
        className={cn(
          "text-white/85 underline underline-offset-4 decoration-white/30 hover:decoration-white/70 transition"
        )}
      />
    );
  },
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 {...props} className="text-3xl md:text-5xl font-semibold tracking-tight text-white" />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="mt-10 text-2xl md:text-3xl font-semibold tracking-tight text-white" />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="mt-8 text-xl md:text-2xl font-semibold tracking-tight text-white" />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="mt-4 text-base leading-relaxed text-white/75" />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="mt-4 list-disc pl-6 text-white/75" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="mt-4 list-decimal pl-6 text-white/75" />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li {...props} className="mt-2" />,
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-white/75"
    />
  ),
  hr: () => <hr className="my-10 border-white/10" />,
};
