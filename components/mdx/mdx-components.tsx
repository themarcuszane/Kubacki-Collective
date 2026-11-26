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
            "text-[#d7c19c] underline underline-offset-4 decoration-[#c2a77a]/40 hover:decoration-[#c2a77a] transition-colors"
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
          "text-[#d7c19c] underline underline-offset-4 decoration-[#c2a77a]/40 hover:decoration-[#c2a77a] transition-colors"
        )}
      />
    );
  },
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 {...props} className="display-serif text-3xl md:text-5xl leading-tight text-[#f2eee6]" />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="display-serif mt-10 text-2xl md:text-3xl leading-tight text-[#f2eee6]" />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="display-serif mt-8 text-xl md:text-2xl leading-tight text-[#f2eee6]" />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="mt-4 text-base leading-8 text-white/70" />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="mt-4 list-disc pl-6 text-white/70 marker:text-[#c2a77a]" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="mt-4 list-decimal pl-6 text-white/70 marker:text-[#c2a77a]" />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li {...props} className="mt-2" />,
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="display-serif mt-8 border-l border-[#c2a77a] pl-5 text-xl leading-relaxed text-[#d7c19c]"
    />
  ),
  hr: () => <hr className="my-10 border-white/10" />,
};
