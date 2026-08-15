"use client";

import { useTranslations } from "next-intl";

import type { Currency, Locale } from "@acme/i18n";
import { currencies, localeLabels } from "@acme/i18n";
import { Button } from "@acme/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";

import { authClient } from "~/auth/client";
import { Link, usePathname, useRouter } from "~/i18n/navigation";
import { routing } from "~/i18n/routing";
import { RooMeLogo } from "./logo";

const CURRENCY_COOKIE = "roomme-currency";

const setCurrencyCookie = (currency: Currency): void => {
  document.cookie = `${CURRENCY_COOKIE}=${currency}; path=/; max-age=31536000`;
};

export function SiteHeader() {
  const t = useTranslations("header");
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const switchLocale = (locale: Locale) => {
    router.replace(pathname, { locale });
  };

  const switchCurrency = (currency: Currency) => {
    setCurrencyCookie(currency);
    router.refresh();
  };

  return (
    <header className="border-border/60 bg-background/90 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-brand flex items-center gap-2 font-semibold"
        >
          <RooMeLogo className="size-8" />
          <span className="text-foreground text-lg tracking-tight">RooMe</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                {t("language")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {routing.locales.map((locale) => (
                <DropdownMenuItem
                  key={locale}
                  onClick={() => switchLocale(locale)}
                >
                  {localeLabels[locale]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                MXN
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {currencies.map((currency) => (
                <DropdownMenuItem
                  key={currency}
                  onClick={() => switchCurrency(currency)}
                >
                  {currency}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {session?.user ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/settings">{t("settings")}</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/host">{t("listings")}</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/agent/calendar">{t("calendar")}</Link>
              </Button>
              <span className="text-muted-foreground hidden max-w-32 truncate text-sm sm:inline">
                {session.user.name}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => void authClient.signOut()}
              >
                {t("logout")}
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link href="/sign-in">{t("login")}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
