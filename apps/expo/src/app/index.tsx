import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { LegendList } from "@legendapp/list";
import { useQuery } from "@tanstack/react-query";

import type { RouterOutputs } from "~/utils/api";
import { trpc } from "~/utils/api";
import { authClient } from "~/utils/auth";
import { t } from "~/utils/i18n";

function ListingCard(props: {
  listing: RouterOutputs["listing"]["list"][number];
}) {
  return (
    <View className="bg-muted rounded-lg p-4">
      <Text className="text-primary text-xl font-semibold">
        {props.listing.title}
      </Text>
      <Text className="text-foreground mt-1">
        {props.listing.complex.neighborhood}
      </Text>
      <Text className="text-foreground mt-2">
        ${(props.listing.rentPriceCents / 100).toLocaleString()}{" "}
        {props.listing.currency}
        {t("rooms.perMonth")}
      </Text>
      <Text className="text-muted-foreground mt-1">
        {t("rooms.roomies", { count: props.listing.capacity })}
      </Text>
    </View>
  );
}

function MobileAuth() {
  const { data: session } = authClient.useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (session?.user) {
    return (
      <View className="gap-2">
        <Text className="text-foreground pb-2 text-center text-xl font-semibold">
          {session.user.name}
        </Text>
        <Pressable
          onPress={() => void authClient.signOut()}
          className="bg-primary flex items-center rounded-sm p-2"
        >
          <Text className="text-primary-foreground">{t("header.logout")}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="gap-2">
      {mode === "signup" ? (
        <TextInput
          className="border-input bg-background text-foreground rounded-md border px-3 py-2"
          value={name}
          onChangeText={setName}
          placeholder={t("auth.name")}
        />
      ) : null}
      <TextInput
        className="border-input bg-background text-foreground rounded-md border px-3 py-2"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder={t("auth.email")}
      />
      <TextInput
        className="border-input bg-background text-foreground rounded-md border px-3 py-2"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        placeholder={t("auth.password")}
      />
      {mode === "signup" ? (
        <TextInput
          className="border-input bg-background text-foreground rounded-md border px-3 py-2"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
          placeholder={t("auth.confirmPassword")}
        />
      ) : null}
      <Pressable onPress={() => setShowPassword((current) => !current)}>
        <Text className="text-muted-foreground text-sm">
          {showPassword ? t("auth.hidePassword") : t("auth.showPassword")}
        </Text>
      </Pressable>
      {error ? <Text className="text-destructive text-sm">{error}</Text> : null}
      <Pressable
        className="bg-primary flex items-center rounded-sm p-2"
        onPress={() => {
          if (mode === "signup") {
            if (password !== confirmPassword) {
              setError(t("auth.passwordMismatch"));
              return;
            }
            setError(null);
            void authClient.signUp.email({ name, email, password });
            return;
          }
          setError(null);
          void authClient.signIn.email({ email, password });
        }}
      >
        <Text className="text-primary-foreground">
          {mode === "signup" ? t("auth.submitSignUp") : t("auth.submitSignIn")}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setMode(mode === "signin" ? "signup" : "signin")}
      >
        <Text className="text-muted-foreground text-center text-sm">
          {mode === "signin" ? t("auth.noAccount") : t("auth.hasAccount")}
        </Text>
      </Pressable>
    </View>
  );
}

export default function Index() {
  const listingQuery = useQuery(trpc.listing.list.queryOptions({ limit: 20 }));

  return (
    <SafeAreaView className="bg-background">
      <Stack.Screen options={{ title: "RoomMe" }} />
      <View className="bg-background h-full w-full p-4">
        <Text className="text-foreground pb-2 text-center text-5xl font-bold">
          RoomMe
        </Text>
        <Text className="text-muted-foreground mb-4 text-center">
          {t("hero.subtitle")}
        </Text>

        <MobileAuth />

        <View className="py-4">
          <Text className="text-primary font-semibold">
            {t("featured.title")}
          </Text>
        </View>

        <LegendList
          data={listingQuery.data ?? []}
          estimatedItemSize={20}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={(p) => <ListingCard listing={p.item} />}
        />
      </View>
    </SafeAreaView>
  );
}
