"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";

import type { Currency, Locale } from "@acme/i18n";
import { canManageComplexes, hasRole } from "@acme/auth/roles";
import { currencies, localeLabels } from "@acme/i18n";
import { Button } from "@acme/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

function AccountMenuItems({
  isAgent,
  isAdmin,
  onSignOut,
}: {
  isAgent: boolean;
  isAdmin: boolean;
  onSignOut: () => void;
}): JSX.Element {
  const t = useTranslations("header");

  return (
    <>
      <DropdownMenuItem asChild>
        <Link href="/settings">{t("profile")}</Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/host">{t("listings")}</Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/tours">{t("myTours")}</Link>
      </DropdownMenuItem>
      {isAgent ? (
        <DropdownMenuItem asChild>
          <Link href="/agent/calendar">{t("calendar")}</Link>
        </DropdownMenuItem>
      ) : null}
      {isAdmin ? (
        <DropdownMenuItem asChild>
          <Link href="/admin">{t("admin")}</Link>
        </DropdownMenuItem>
      ) : null}
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive" onClick={onSignOut}>
        {t("logout")}
      </DropdownMenuItem>
    </>
  );
}

export function SiteHeader(): JSX.Element {
  const t = useTranslations("header");
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const isAgent = canManageComplexes(session?.user.role);
  const isAdmin = hasRole(session?.user.role, "admin");

  const switchLocale = (locale: Locale): void => {
    router.replace(pathname, { locale });
  };

  const switchCurrency = (currency: Currency): void => {
    setCurrencyCookie(currency);
    router.refresh();
  };

  const signOut = (): void => {
    void authClient.signOut();
  };

  return (
    <header className="border-border/60 bg-background/90 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link
          href="/"
          className="text-brand flex min-w-0 items-center gap-2 font-semibold"
        >
          <RooMeLogo className="size-8 shrink-0" />
          <span className="text-foreground text-lg tracking-tight">RooMe</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="max-w-40">
                  <span className="truncate">
                    {session.user.name.length > 0
                      ? session.user.name
                      : t("account")}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-48">
                <DropdownMenuLabel className="font-normal">
                  <p className="truncate text-sm font-medium">
                    {session.user.name}
                  </p>
                  {session.user.email ? (
                    <p className="text-muted-foreground truncate text-xs">
                      {session.user.email}
                    </p>
                  ) : null}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <AccountMenuItems
                  isAgent={isAgent}
                  isAdmin={isAdmin}
                  onSignOut={signOut}
                />
              </DropdownMenuContent>
            </DropdownMenu>
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
